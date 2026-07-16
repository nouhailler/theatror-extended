// Persistance locale (idb) de la veille casting — sources, annonces, profil.
// Auto-contenu (comme feeds.ts) : rien dans le store zustand central, tout en
// IndexedDB, chargé à l'ouverture de l'écran Casting. Aucune donnée ne quitte
// l'appareil (les coordonnées extraites restent locales — RGPD).

import { KEYS, idbGet, idbSet } from './storage';

export type SourceKind = 'auto' | 'rss' | 'page';

export interface CastingSource {
  id: string;
  url: string;
  label: string;
  kind: SourceKind;
  createdAt: string;
  lastCheck?: string; // ISO
  lastHash?: string; // SHA-256 du contenu récupéré (détection de changement)
  lastError?: string;
}

export interface Casting {
  id: string; // SHA-256 de l'URL de l'annonce (dédup)
  sourceId?: string;
  url: string;
  titre: string;
  compagnie?: string;
  ville?: string;
  pays?: string;
  datePublication?: string;
  dateLimite?: string; // ISO si détectable
  type?: string; // Audition / Casting / Résidence…
  profils?: string[];
  remunere?: boolean | null;
  intermittence?: boolean | null;
  cvRequis?: boolean | null;
  videoRequise?: boolean | null;
  contact?: string;
  email?: string;
  telephone?: string;
  resume?: string;
  score?: number; // 0–100 (compatibilité)
  raisons?: string[];
  foundAt: string; // ISO — première détection
  seen?: boolean;
  archived?: boolean;
}

export interface CastingProfile {
  genre?: string; // ex. Homme / Femme / Non précisé
  age?: string; // ex. « 38 » ou « 30-45 »
  styles?: string; // ex. « contemporain, classique »
  regions?: string; // ex. « Île-de-France, Suisse romande »
  remunereUniquement?: boolean;
  notes?: string; // tout complément utile au score
}

// ─── Sources ───
export const getSources = () => idbGet<CastingSource[]>(KEYS.castingSources, []);
export async function saveSources(list: CastingSource[]) { await idbSet(KEYS.castingSources, list); }

export async function addSource(url: string, kind: SourceKind = 'auto'): Promise<{ ok: boolean; error?: string }> {
  const u = url.trim();
  let host: string;
  try { host = new URL(u).hostname; } catch { return { ok: false, error: 'URL invalide' }; }
  if (!/^https?:$/.test(new URL(u).protocol)) return { ok: false, error: 'URL http(s) requise' };
  const list = await getSources();
  if (list.some((s) => s.url === u)) return { ok: false, error: 'Source déjà ajoutée' };
  list.push({ id: uid(), url: u, label: host.replace(/^www\./, ''), kind, createdAt: new Date().toISOString() });
  await saveSources(list);
  return { ok: true };
}
export async function removeSource(id: string) {
  await saveSources((await getSources()).filter((s) => s.id !== id));
}
export async function patchSource(id: string, patch: Partial<CastingSource>) {
  await saveSources((await getSources()).map((s) => (s.id === id ? { ...s, ...patch } : s)));
}

// ─── Annonces ───
export const getCastings = () => idbGet<Casting[]>(KEYS.castings, []);
export async function saveCastings(list: Casting[]) { await idbSet(KEYS.castings, list); }

/** Insère les nouvelles annonces (par id), garde les existantes. Renvoie le nb ajouté. */
export async function addCastings(found: Casting[]): Promise<number> {
  const list = await getCastings();
  const known = new Set(list.map((c) => c.id));
  const fresh = found.filter((c) => !known.has(c.id));
  if (fresh.length) await saveCastings([...fresh, ...list]);
  return fresh.length;
}
export async function patchCasting(id: string, patch: Partial<Casting>) {
  await saveCastings((await getCastings()).map((c) => (c.id === id ? { ...c, ...patch } : c)));
}
export async function removeCasting(id: string) {
  await saveCastings((await getCastings()).filter((c) => c.id !== id));
}

// ─── Profil ───
export const getProfile = () => idbGet<CastingProfile>(KEYS.castingProfile, {});
export async function setProfile(p: CastingProfile) { await idbSet(KEYS.castingProfile, p); }

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
