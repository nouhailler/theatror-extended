// Analyse IA d'un candidat casting (OpenRouter, clé de l'utilisateur) : détection
// + extraction structurée + score de compatibilité, en une seule requête JSON.

import type { ChatMessage } from './openrouter';
import type { Candidate } from './castingScan';
import { sha256 } from './castingScan';
import type { Casting, CastingProfile } from './castingStore';

interface AIResult {
  estCasting?: boolean;
  titre?: string;
  compagnie?: string;
  ville?: string;
  pays?: string;
  datePublication?: string;
  dateLimite?: string;
  type?: string;
  profils?: string[];
  remunere?: boolean | null;
  intermittence?: boolean | null;
  cvRequis?: boolean | null;
  videoRequise?: boolean | null;
  contact?: string;
  email?: string;
  telephone?: string;
  resume?: string;
  score?: number;
  raisons?: string[];
}

function profilTexte(p: CastingProfile): string {
  const l = [
    p.genre ? `Genre : ${p.genre}` : '',
    p.age ? `Âge : ${p.age}` : '',
    p.styles ? `Styles : ${p.styles}` : '',
    p.regions ? `Régions acceptées : ${p.regions}` : '',
    p.remunereUniquement ? 'Cherche uniquement des annonces rémunérées.' : '',
    p.notes ? `Autres : ${p.notes}` : '',
  ].filter(Boolean);
  return l.length ? l.join('\n') : '(profil non renseigné — score générique)';
}

const SCHEMA = `{
  "estCasting": true/false,       // true seulement si c'est un appel à candidature / audition / casting de spectacle
  "titre": "…",
  "compagnie": "…",               // structure qui recrute (ou "")
  "ville": "…", "pays": "…",
  "datePublication": "AAAA-MM-JJ",// "" si inconnue
  "dateLimite": "AAAA-MM-JJ",     // date limite de candidature, "" si inconnue
  "type": "Audition|Casting|Résidence|Stage|Emploi|Autre",
  "profils": ["Comédien","Comédienne","Figurant", …],
  "remunere": true/false/null,
  "intermittence": true/false/null,
  "cvRequis": true/false/null,
  "videoRequise": true/false/null,
  "contact": "…", "email": "…", "telephone": "…",
  "resume": "2 phrases max",
  "score": 0-100,                 // compatibilité avec le profil ci-dessus
  "raisons": ["✔ …","✘ …"]       // 3-5 puces justifiant le score
}`;

export function messagesFor(cand: Candidate, profile: CastingProfile): ChatMessage[] {
  return [
    { role: 'system', content:
      "Tu es un assistant qui trie des annonces pour un comédien. Tu détermines si un texte est un véritable appel à candidature / audition / casting de spectacle vivant, et si oui tu en extrais les informations et évalues la compatibilité avec le profil fourni. Tu n'inventes jamais une information absente (mets \"\" ou null). Tu réponds UNIQUEMENT par un objet JSON valide, sans texte autour." },
    { role: 'user', content:
      `PROFIL DU COMÉDIEN :\n${profilTexte(profile)}\n\n` +
      `ANNONCE À ANALYSER (source : ${cand.url}) :\n${cand.texte}\n\n` +
      `Renvoie exactement ce JSON (rien d'autre) :\n${SCHEMA}\n\n` +
      `Si ce n'est pas un casting/audition, renvoie {"estCasting": false}. Le score reflète l'adéquation profil↔annonce.` },
  ];
}

// Extrait l'objet JSON englobant de la réponse (tolère du texte ou des ```json
// autour). N'utilise PAS extractJson partagé, qui vise un tableau et se trompe
// quand l'objet contient des tableaux internes (profils, raisons).
function parseObject(text: string): AIResult | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const src = fenced ? fenced[1] : text;
  const a = src.indexOf('{');
  const b = src.lastIndexOf('}');
  if (a < 0 || b < 0 || b < a) return null;
  try { return JSON.parse(src.slice(a, b + 1)) as AIResult; } catch { return null; }
}

/** Transforme la réponse IA en Casting (ou null si ce n'est pas un casting / JSON illisible). */
export async function toCasting(cand: Candidate, raw: string, now = new Date().toISOString()): Promise<Casting | null> {
  const r = parseObject(raw);
  if (!r || r.estCasting === false) return null;
  const clean = (s?: string) => (s && s.trim() ? s.trim() : undefined);
  const id = await sha256(cand.url);
  return {
    id,
    sourceId: cand.sourceId,
    url: cand.url,
    titre: clean(r.titre) || cand.titre || 'Annonce',
    compagnie: clean(r.compagnie),
    ville: clean(r.ville),
    pays: clean(r.pays),
    datePublication: clean(r.datePublication) || (cand.date ? new Date(cand.date).toISOString().slice(0, 10) : undefined),
    dateLimite: clean(r.dateLimite),
    type: clean(r.type),
    profils: Array.isArray(r.profils) ? r.profils.filter(Boolean).slice(0, 8) : undefined,
    remunere: typeof r.remunere === 'boolean' ? r.remunere : null,
    intermittence: typeof r.intermittence === 'boolean' ? r.intermittence : null,
    cvRequis: typeof r.cvRequis === 'boolean' ? r.cvRequis : null,
    videoRequise: typeof r.videoRequise === 'boolean' ? r.videoRequise : null,
    contact: clean(r.contact),
    email: clean(r.email),
    telephone: clean(r.telephone),
    resume: clean(r.resume),
    score: typeof r.score === 'number' ? Math.max(0, Math.min(100, Math.round(r.score))) : undefined,
    raisons: Array.isArray(r.raisons) ? r.raisons.filter(Boolean).slice(0, 6) : undefined,
    foundAt: now,
  };
}
