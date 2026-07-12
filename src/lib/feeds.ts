// Agrégation des flux RSS/Atom (onglet Nouveautés). Passe par le proxy Netlify
// (même origine → pas de CORS). Parse RSS (<item>) et Atom (<entry>, YouTube),
// extrait vignette + résumé, fusionne les flux curés ET les sources ajoutées
// par l'utilisateur, trie par date, et met en cache dans IndexedDB (TTL + repli
// hors-ligne).

import { FLUX, type FluxSource } from '../data/flux';
import { KEYS, idbGet, idbSet } from './storage';

const PROXY = '/.netlify/functions/feed?url=';
const TTL_MS = 30 * 60 * 1000; // 30 min
const PAR_SOURCE = 20;
const MAX_TOTAL = 200;

export interface FeedItem {
  key: string;
  titre: string;
  source: string;
  programme: string;
  type: 'podcast' | 'video' | 'article';
  lien: string;
  image?: string;
  resume?: string;
  dateNum: number;
  dateLabel: string;
}

export interface UserSource { id: string; url: string; titre: string }
interface FluxCache { at: number; items: FeedItem[] }

const txt = (el: Element | null | undefined) => el?.textContent?.trim() ?? '';
function firstTag(parent: Element | Document, tag: string): Element | null {
  const els = parent.getElementsByTagName(tag);
  return els.length ? els[0] : null;
}
function attrOf(parent: Element | Document, tag: string, attr: string): string {
  const el = firstTag(parent, tag);
  return el?.getAttribute(attr)?.trim() ?? '';
}

// Retire le HTML d'un résumé et tronque.
function extraitTexte(html: string, max = 180): string {
  if (!html) return '';
  const plain = new DOMParser().parseFromString(html, 'text/html').body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  return plain.length > max ? plain.slice(0, max).replace(/\s+\S*$/, '') + '…' : plain;
}

function imageItem(el: Element): string {
  return attrOf(el, 'itunes:image', 'href')
    || attrOf(el, 'media:thumbnail', 'url')
    || attrOf(el, 'media:content', 'url')
    // enclosure image (podcasts)
    || (() => {
      for (const enc of Array.from(el.getElementsByTagName('enclosure'))) {
        if ((enc.getAttribute('type') || '').startsWith('image')) return enc.getAttribute('url') || '';
      }
      return '';
    })();
}

function parse(xml: string, src: FluxSource): FeedItem[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) return [];
  const out: FeedItem[] = [];

  // Vignette de repli au niveau du flux (artwork de l'émission / chaîne).
  const channel = firstTag(doc, 'channel') || doc.documentElement;
  const fallbackImg = attrOf(channel, 'itunes:image', 'href') || txt(firstTag(channel, 'url'));

  const push = (titre: string, lien: string, dRaw: string, image: string, resumeHtml: string) => {
    if (!titre) return;
    const parsed = dRaw ? Date.parse(dRaw) : NaN;
    const dateNum = Number.isNaN(parsed) ? 0 : parsed;
    out.push({
      key: `${src.id}|${out.length}`,
      titre, source: src.source, programme: src.titre, type: src.type, lien,
      image: image || fallbackImg || undefined,
      resume: extraitTexte(resumeHtml) || undefined,
      dateNum,
      dateLabel: dateNum ? new Date(dateNum).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
    });
  };

  const items = Array.from(doc.getElementsByTagName('item')); // RSS
  if (items.length) {
    for (const it of items) {
      const resume = txt(firstTag(it, 'description')) || txt(firstTag(it, 'itunes:summary')) || txt(firstTag(it, 'content:encoded'));
      push(txt(firstTag(it, 'title')), txt(firstTag(it, 'link')), txt(firstTag(it, 'pubDate')), imageItem(it), resume);
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
    const resume = txt(firstTag(en, 'media:description'));
    push(txt(firstTag(en, 'title')), lien, date, attrOf(en, 'media:thumbnail', 'url'), resume);
  }
  return out;
}

// ─── Sources ajoutées par l'utilisateur ───
export async function listerSources(): Promise<UserSource[]> {
  return idbGet<UserSource[]>(KEYS.fluxUser, []);
}
export async function ajouterSource(urlBrut: string): Promise<{ ok: boolean; error?: string }> {
  const url = urlBrut.trim();
  let host: string;
  try { host = new URL(url).hostname; } catch { return { ok: false, error: 'URL invalide' }; }
  const liste = await listerSources();
  if (liste.some((s) => s.url === url)) return { ok: false, error: 'Source déjà ajoutée' };
  liste.push({ id: `${Date.now()}`, url, titre: host.replace(/^www\./, '') });
  await idbSet(KEYS.fluxUser, liste);
  return { ok: true };
}
export async function retirerSource(id: string): Promise<void> {
  await idbSet(KEYS.fluxUser, (await listerSources()).filter((s) => s.id !== id));
}

function toFluxSources(user: UserSource[]): FluxSource[] {
  return user.map((u) => ({ id: `u-${u.id}`, titre: u.titre, source: 'Mes sources', type: 'podcast' as const, url: u.url }));
}

export interface Nouveautes { items: FeedItem[]; from: 'live' | 'cache' | 'empty' }

export async function chargerNouveautes(force = false): Promise<Nouveautes> {
  const cached = await idbGet<FluxCache | null>(KEYS.flux, null);
  if (!force && cached && Date.now() - cached.at < TTL_MS) {
    return { items: cached.items, from: 'cache' };
  }

  const sources = [...FLUX, ...toFluxSources(await listerSources())];
  const results = await Promise.allSettled(
    sources.map(async (src) => {
      const res = await fetch(PROXY + encodeURIComponent(src.url));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return parse(await res.text(), src).slice(0, PAR_SOURCE);
    }),
  );
  const items = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

  if (items.length) {
    items.sort((a, b) => b.dateNum - a.dateNum);
    const top = items.slice(0, MAX_TOTAL);
    await idbSet<FluxCache>(KEYS.flux, { at: Date.now(), items: top });
    return { items: top, from: 'live' };
  }
  if (cached) return { items: cached.items, from: 'cache' };
  return { items: [], from: 'empty' };
}
