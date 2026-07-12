import { get, set, del } from 'idb-keyval';

// Clés de persistance (README / PROMPT).
export const KEYS = {
  favs: 'theathror-favs',
  journal: 'theathror-journal',
  settings: 'theathror-settings',
  seeded: 'theathror-seeded', // journal d'exemple inséré une fois
  onb: 'theathror-onb', // flag onboarding vu (localStorage, lecture synchrone au boot)
  miseEnScene: 'theathror-miseenscene', // plateau de mise en scène virtuelle
} as const;

// ─── IndexedDB (idb-keyval) : favoris, journal, préférences ───
export async function idbGet<T>(key: string, fallback: T): Promise<T> {
  try {
    const v = await get<T>(key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    await set(key, value);
  } catch {
    /* stockage indisponible — on ignore */
  }
}

export async function idbDel(key: string): Promise<void> {
  try {
    await del(key);
  } catch {
    /* ignore */
  }
}

// ─── localStorage : flag onboarding (lecture synchrone) ───
export function onbSeen(): boolean {
  try {
    return !!localStorage.getItem(KEYS.onb);
  } catch {
    return false;
  }
}

export function markOnbSeen(): void {
  try {
    localStorage.setItem(KEYS.onb, '1');
  } catch {
    /* ignore */
  }
}

export function clearOnbSeen(): void {
  try {
    localStorage.removeItem(KEYS.onb);
  } catch {
    /* ignore */
  }
}
