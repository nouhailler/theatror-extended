import { get, set, del } from 'idb-keyval';

// Clés de persistance (README / PROMPT).
export const KEYS = {
  favs: 'theathror-favs',
  journal: 'theathror-journal',
  settings: 'theathror-settings',
  seeded: 'theathror-seeded', // journal d'exemple inséré une fois
  onb: 'theathror-onb', // flag onboarding vu (localStorage, lecture synchrone au boot)
  tips: 'theathror-tips', // astuces d'écran déjà vues (localStorage, lecture synchrone)
  miseEnScene: 'theathror-miseenscene', // plateau de mise en scène virtuelle
  flux: 'theathror-flux', // cache des nouveautés RSS (podcasts/vidéos)
  fluxUser: 'theathror-flux-user', // sources RSS ajoutées par l'utilisateur
  rehearsal: 'theathror-rehearsal', // pièces du mode répétition
  repJournal: 'theathror-rep-journal', // journal de répétition (par pièce)
  contacts: 'theathror-contacts', // carnet d'adresses (professionnels du spectacle)
  reminders: 'theathror-reminders', // rappels de suivi des interactions
  castingSources: 'theathror-casting-sources', // sources de veille casting (RSS / pages)
  castings: 'theathror-castings', // annonces de casting collectées (locales)
  castingProfile: 'theathror-casting-profile', // profil comédien pour le score de compatibilité
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

// ─── localStorage : astuces d'écran déjà vues (lecture synchrone) ───
export function seenTips(): Record<string, true> {
  try {
    return JSON.parse(localStorage.getItem(KEYS.tips) ?? '{}') as Record<string, true>;
  } catch {
    return {};
  }
}

export function markTipSeen(id: string): void {
  try {
    const map = seenTips();
    map[id] = true;
    localStorage.setItem(KEYS.tips, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function clearTips(): void {
  try {
    localStorage.removeItem(KEYS.tips);
  } catch {
    /* ignore */
  }
}
