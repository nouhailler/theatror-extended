// Agrégation des flux RSS/Atom (onglet Nouveautés). Passe par le proxy Netlify
// (même origine → pas de CORS). Parse RSS (<item>) et Atom (<entry>, YouTube),
// fusionne, trie par date, et met en cache dans IndexedDB avec un TTL (repli
// hors-ligne sur le dernier résultat connu).

import { FLUX, type FluxSource } from '../data/flux';
import { KEYS, idbGet, idbSet } from './storage';

const PROXY = '/.netlify/functions/feed?url=';
const TTL_MS = 30 * 60 * 1000; // 30 min

export interface FeedItem {
  key: string;
  titre: string;
  source: string;
  type: 'podcast' | 'video';
  lien: string;
  dateNum: number;
  dateLabel: string;
}

interface FluxCache { at: number; items: FeedItem[] }

const txt = (el: Element | null | undefined) => el?.textContent?.trim() ?? '';
function firstTag(parent: Element | Document, tag: string): Element | null {
  const els = parent.getElementsByTagName(tag);
  return els.length ? els[0] : null;
}

function pushItem(out: FeedItem[], src: FluxSource, titre: string, lien: string, dRaw: string) {
  if (!titre) return;
  const parsed = dRaw ? Date.parse(dRaw) : NaN;
  const dateNum = Number.isNaN(parsed) ? 0 : parsed;
  out.push({
    key: `${src.id}|${lien || titre}`,
    titre, source: src.source, type: src.type, lien,
    dateNum,
    dateLabel: dateNum ? new Date(dateNum).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
  });
}

function parse(xml: string, src: FluxSource): FeedItem[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) return [];
  const out: FeedItem[] = [];

  const items = Array.from(doc.getElementsByTagName('item')); // RSS
  if (items.length) {
    for (const it of items) {
      pushItem(out, src, txt(firstTag(it, 'title')), txt(firstTag(it, 'link')), txt(firstTag(it, 'pubDate')));
    }
    return out;
  }

  const entries = Array.from(doc.getElementsByTagName('entry')); // Atom (YouTube)
  for (const en of entries) {
    let lien = '';
    for (const l of Array.from(en.getElementsByTagName('link'))) {
      const rel = l.getAttribute('rel');
      if (!rel || rel === 'alternate') { lien = l.getAttribute('href') || ''; break; }
    }
    const date = txt(firstTag(en, 'published')) || txt(firstTag(en, 'updated'));
    pushItem(out, src, txt(firstTag(en, 'title')), lien, date);
  }
  return out;
}

export interface Nouveautes { items: FeedItem[]; from: 'live' | 'cache' | 'empty' }

export async function chargerNouveautes(force = false): Promise<Nouveautes> {
  const cached = await idbGet<FluxCache | null>(KEYS.flux, null);
  if (!force && cached && Date.now() - cached.at < TTL_MS) {
    return { items: cached.items, from: 'cache' };
  }

  const results = await Promise.allSettled(
    FLUX.map(async (src) => {
      const res = await fetch(PROXY + encodeURIComponent(src.url));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return parse(await res.text(), src);
    }),
  );
  const items = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

  if (items.length) {
    items.sort((a, b) => b.dateNum - a.dateNum);
    const top = items.slice(0, 50);
    await idbSet<FluxCache>(KEYS.flux, { at: Date.now(), items: top });
    return { items: top, from: 'live' };
  }
  if (cached) return { items: cached.items, from: 'cache' }; // repli hors-ligne
  return { items: [], from: 'empty' };
}
