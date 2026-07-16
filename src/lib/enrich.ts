// Enrichissement d'un contact à partir de son site / profil professionnel.
// Récupère la page via le proxy Netlify (même mécanisme que les flux RSS —
// contourne le CORS, garde anti-SSRF côté serveur), la réduit en texte, puis
// laisse l'appelant l'envoyer à OpenRouter (clé des Réglages, via useAI).

import type { Contact } from '../store';
import type { ChatMessage } from './openrouter';

const PROXY = '/.netlify/functions/feed?url=';

// En deçà de ce volume de texte utile, on considère la page « peu lisible »
// (SPA rendue en JS, mur anti-bot…) et on bascule sur le repli connaissance.
const SEUIL_MAIGRE = 350;
const MAX_TEXTE = 12000; // on ne noie pas le modèle

export interface PageExtrait {
  texte: string;
  maigre: boolean; // true → contenu insuffisant, prévoir le repli
}

/** Retire scripts/styles/balises d'un HTML et renvoie un texte compact. */
function htmlVersTexte(html: string): string {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<[^>]+>/g, ' ');
  // Entités courantes
  s = s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => {
      try { return String.fromCodePoint(Number(n)); } catch { return ' '; }
    });
  s = s.replace(/[ \t ]+/g, ' ').replace(/\s*\n\s*/g, '\n').replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

/** Récupère et nettoie la page d'un contact. Lève en cas d'échec réseau/HTTP. */
export async function fetchPageText(url: string, signal?: AbortSignal): Promise<PageExtrait> {
  const res = await fetch(PROXY + encodeURIComponent(url), { signal });
  if (!res.ok) throw new Error(`La page a répondu ${res.status}.`);
  const ct = res.headers.get('content-type') || '';
  const body = await res.text();
  // On ne traite que du HTML/texte ; un PDF ou binaire n'est pas exploitable ici.
  const texte = /html|xml|text/i.test(ct) || body.includes('<') ? htmlVersTexte(body) : body.trim();
  const coupe = texte.slice(0, MAX_TEXTE);
  return { texte: coupe, maigre: coupe.length < SEUIL_MAIGRE };
}

const SYSTEME =
  "Tu prépares un comédien à un entretien ou à un envoi de candidature. Tu produis une fiche " +
  'de préparation claire, concise et honnête, en français. Tu ne inventes jamais de faits : si une ' +
  "information n'est pas disponible, tu l'indiques explicitement plutôt que de la supposer.";

const CONSIGNE_STRUCT =
  'Structure la fiche avec ces titres en gras :\n' +
  '**En bref** — qui c\'est, en une phrase.\n' +
  '**Dernières mises en scène / créations** — les productions récentes repérables.\n' +
  '**Esthétique & ligne artistique** — style, thèmes de prédilection, ton.\n' +
  '**Contacts publics** — email, formulaire, réseaux, adresse mentionnés.\n' +
  '**Angle pour ma candidature** — 2 ou 3 pistes concrètes pour accrocher cette personne/structure.\n' +
  'Sois bref (listes à puces), ne remplis pas une rubrique sans matière : écris « non trouvé sur la page ».';

function entete(c: Contact): string {
  return [
    `Contact : ${c.nom}`,
    `Rôle : ${c.role}`,
    c.organisation ? `Structure : ${c.organisation}` : '',
    c.url ? `Adresse : ${c.url}` : '',
  ].filter(Boolean).join('\n');
}

/** Prompt fondé sur le contenu réellement extrait de la page. */
export function messagesDepuisPage(c: Contact, pageTexte: string): ChatMessage[] {
  return [
    { role: 'system', content: SYSTEME },
    {
      role: 'user',
      content:
        `${entete(c)}\n\nVoici le texte extrait de sa page. Fonde-toi d'abord sur ce contenu.\n\n` +
        `${CONSIGNE_STRUCT}\n\n--- PAGE ---\n${pageTexte}`,
    },
  ];
}

/** Repli : la page n'a rien donné → on s'appuie sur le nom/l'URL et la connaissance du modèle. */
export function messagesRepliModele(c: Contact): ChatMessage[] {
  return [
    { role: 'system', content: SYSTEME },
    {
      role: 'user',
      content:
        `${entete(c)}\n\nLa page n'a pas pu être lue (site dynamique ou protégé). ` +
        "Rédige la fiche à partir de ce que tu sais éventuellement de cette personne ou structure " +
        "d'après son nom et son adresse. Commence par une ligne d'avertissement en italique indiquant " +
        'que la fiche ne provient pas de la page mais de connaissances générales, à vérifier. ' +
        `Si tu ne connais pas ce contact, dis-le franchement.\n\n${CONSIGNE_STRUCT}`,
    },
  ];
}
