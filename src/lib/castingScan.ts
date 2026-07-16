// Collecte des candidats casting depuis une source (RSS ou page), via le proxy
// Netlify (même origine, anti-SSRF). Pré-filtre local par mots-clés pour ne
// soumettre à l'IA que les annonces plausibles (économie de requêtes). Détection
// de changement par hash SHA-256. AUCUN contournement : une page à la fois, à la
// demande, à travers le proxy existant.

import type { CastingSource } from './castingStore';

const PROXY = '/.netlify/functions/feed?url=';
const MAX_PAGE = 9000; // on ne noie pas le modèle

export interface Candidate {
  sourceId: string;
  url: string; // lien de l'annonce
  titre: string;
  texte: string; // texte à analyser
  date?: string; // date de publication si connue (RSS)
}

// Mots-clés surveillés (normalisés, sans accent) — pré-filtre RSS.
const KEYWORDS = [
  'audition', 'casting', 'recrut', 'appel a candidat', 'appel a projet',
  'recherche comedien', 'recherche comedienne', 'distribution', 'figurant',
  'residence', 'creation', 'laboratoire', 'stage', 'comedien', 'comedienne',
  'emploi', 'candidature',
];
const strip = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export function looksLikeCasting(text: string): boolean {
  const t = strip(text);
  return KEYWORDS.some((k) => t.includes(k));
}

export async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const txt = (el: Element | null) => el?.textContent?.trim() ?? '';
const firstTag = (p: Element | Document, tag: string) => { const e = p.getElementsByTagName(tag); return e.length ? e[0] : null; };

function htmlToText(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script,style,noscript,nav,footer,header').forEach((n) => n.remove());
    return (doc.body?.textContent ?? '').replace(/[ \t ]+/g, ' ').replace(/\s*\n\s*/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  } catch { return ''; }
}

function isFeed(body: string, contentType: string): boolean {
  if (/xml|rss|atom/i.test(contentType)) return true;
  const head = body.slice(0, 600).toLowerCase();
  return head.includes('<rss') || head.includes('<feed') || head.includes('<?xml');
}

function parseFeed(xml: string, src: CastingSource): Candidate[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) return [];
  const out: Candidate[] = [];
  const items = Array.from(doc.getElementsByTagName('item'));
  const push = (titre: string, url: string, desc: string, date?: string) => {
    if (!titre || !url) return;
    const texte = `${titre}\n${htmlToText(desc)}`.trim();
    if (looksLikeCasting(texte)) out.push({ sourceId: src.id, url, titre, texte, date });
  };
  if (items.length) {
    for (const it of items) {
      push(txt(firstTag(it, 'title')), txt(firstTag(it, 'link')),
        txt(firstTag(it, 'description')) || txt(firstTag(it, 'content:encoded')),
        txt(firstTag(it, 'pubDate')) || undefined);
    }
    return out;
  }
  for (const en of Array.from(doc.getElementsByTagName('entry'))) { // Atom
    let url = '';
    for (const l of Array.from(en.getElementsByTagName('link'))) {
      const rel = l.getAttribute('rel');
      if (!rel || rel === 'alternate') { url = l.getAttribute('href') || ''; break; }
    }
    push(txt(firstTag(en, 'title')), url, txt(firstTag(en, 'summary')) || txt(firstTag(en, 'content')),
      txt(firstTag(en, 'published')) || txt(firstTag(en, 'updated')) || undefined);
  }
  return out;
}

export interface ScanResult {
  hash: string;
  changed: boolean;
  candidates: Candidate[];
  error?: string;
}

/**
 * Récupère une source et renvoie les candidats (déjà pré-filtrés). Une page
 * ajoutée volontairement est toujours candidate ; un flux RSS est filtré par
 * mots-clés. `changed` = le contenu a changé depuis le dernier passage.
 */
export async function scanSource(src: CastingSource): Promise<ScanResult> {
  let res: Response;
  try {
    res = await fetch(PROXY + encodeURIComponent(src.url));
  } catch {
    return { hash: src.lastHash ?? '', changed: false, candidates: [], error: 'Réseau indisponible' };
  }
  if (!res.ok) return { hash: src.lastHash ?? '', changed: false, candidates: [], error: `HTTP ${res.status}` };
  const body = await res.text();
  const ct = res.headers.get('content-type') || '';
  const hash = await sha256(body);
  const changed = hash !== src.lastHash;

  const feed = src.kind === 'rss' || (src.kind === 'auto' && isFeed(body, ct));
  let candidates: Candidate[];
  if (feed) {
    candidates = parseFeed(body, src);
  } else {
    // Page unique ajoutée par l'utilisateur → candidate telle quelle.
    const text = htmlToText(body).slice(0, MAX_PAGE);
    candidates = text ? [{ sourceId: src.id, url: src.url, titre: src.label, texte: text }] : [];
  }
  return { hash, changed, candidates };
}
