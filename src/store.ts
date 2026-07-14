import { create } from 'zustand';
import {
  KEYS,
  idbGet,
  idbSet,
  onbSeen,
  markOnbSeen,
  clearOnbSeen,
  seenTips,
  markTipSeen,
  clearTips,
} from './lib/storage';
import { JOURNAL_SEED } from './data/journalSeed';

// ─── Types ───
export type FavCategory =
  | 'pieces' | 'auteurs' | 'citations' | 'monologues'
  | 'costumes' | 'decors' | 'accessoires' | 'festivals';
export type FavMap = Record<string, true>; // clé « categorie::id »

export type JournalType = 'Répétition' | 'Progrès' | 'Idée' | 'Note' | 'Audition';

export interface JournalEntry {
  id: string;
  titre: string;
  type: JournalType;
  date: string; // ISO (YYYY-MM-DD)
  txt: string;
  minutes?: number; // temps de travail en scène (stats)
}

export interface Settings {
  openRouterKey: string;
  openRouterModel: string;
  tipsEnabled: boolean; // astuces contextuelles au fil de la navigation
}

interface State {
  hydrated: boolean;

  // Favoris
  favs: FavMap;
  toggleFav: (cat: FavCategory, id: string) => void;
  isFav: (cat: FavCategory, id: string) => boolean;
  favCount: () => number;

  // Journal
  journal: JournalEntry[];
  addEntry: (e: Omit<JournalEntry, 'id'>) => void;
  updateEntry: (id: string, patch: Partial<Omit<JournalEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;

  // Préférences
  settings: Settings;
  setSettings: (patch: Partial<Settings>) => void;

  // UI éphémère
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  // Aide contextuelle (fiche d'aide de l'écran)
  helpOpen: boolean;
  openHelp: () => void;
  closeHelp: () => void;

  // Astuces d'écran (déjà vues)
  tipsSeen: Record<string, true>;
  markTip: (id: string) => void;
  resetTips: () => void;

  // Onboarding (0–2 | null)
  onbStep: number | null;
  onbNext: () => void;
  onbFinish: () => void;
  onbReplay: () => void;

  // Visite guidée (0–9 | null)
  tourStep: number | null;
  startTour: () => void;
  setTourStep: (i: number | null) => void;

  hydrate: () => Promise<void>;
}

const favKey = (cat: FavCategory, id: string) => `${cat}::${id}`;

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const DEFAULT_SETTINGS: Settings = {
  openRouterKey: '',
  openRouterModel: 'anthropic/claude-3.5-sonnet',
  tipsEnabled: true,
};

export const useStore = create<State>((set, getState) => ({
  hydrated: false,

  favs: {},
  toggleFav: (cat, id) => {
    const favs = { ...getState().favs };
    const k = favKey(cat, id);
    if (favs[k]) delete favs[k];
    else favs[k] = true;
    set({ favs });
    void idbSet(KEYS.favs, favs);
  },
  isFav: (cat, id) => !!getState().favs[favKey(cat, id)],
  favCount: () => Object.keys(getState().favs).length,

  journal: [],
  addEntry: (e) => {
    const journal = [{ ...e, id: uid() }, ...getState().journal];
    set({ journal });
    void idbSet(KEYS.journal, journal);
  },
  updateEntry: (id, patch) => {
    const journal = getState().journal.map((j) =>
      j.id === id ? { ...j, ...patch } : j,
    );
    set({ journal });
    void idbSet(KEYS.journal, journal);
  },
  deleteEntry: (id) => {
    const journal = getState().journal.filter((j) => j.id !== id);
    set({ journal });
    void idbSet(KEYS.journal, journal);
  },

  settings: DEFAULT_SETTINGS,
  setSettings: (patch) => {
    const settings = { ...getState().settings, ...patch };
    set({ settings });
    void idbSet(KEYS.settings, settings);
  },

  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),

  helpOpen: false,
  openHelp: () => set({ helpOpen: true, menuOpen: false }),
  closeHelp: () => set({ helpOpen: false }),

  tipsSeen: seenTips(),
  markTip: (id) => {
    markTipSeen(id);
    set({ tipsSeen: { ...getState().tipsSeen, [id]: true } });
  },
  resetTips: () => {
    clearTips();
    set({ tipsSeen: {} });
  },

  onbStep: onbSeen() ? null : 0,
  onbNext: () => set({ onbStep: Math.min(2, (getState().onbStep ?? 0) + 1) }),
  onbFinish: () => {
    markOnbSeen();
    set({ onbStep: null });
  },
  onbReplay: () => {
    clearOnbSeen();
    set({ onbStep: 0, menuOpen: false });
  },

  tourStep: null,
  startTour: () => {
    markOnbSeen();
    set({ tourStep: 0, onbStep: null, menuOpen: false });
  },
  setTourStep: (i) => set({ tourStep: i }),

  hydrate: async () => {
    const [favs, storedJournal, settings, seeded] = await Promise.all([
      idbGet<FavMap>(KEYS.favs, {}),
      idbGet<JournalEntry[]>(KEYS.journal, []),
      idbGet<Settings>(KEYS.settings, DEFAULT_SETTINGS),
      idbGet<boolean>(KEYS.seeded, false),
    ]);
    let journal = storedJournal;
    if (!seeded && storedJournal.length === 0) {
      journal = JOURNAL_SEED;
      void idbSet(KEYS.journal, journal);
      void idbSet(KEYS.seeded, true);
    }
    set({
      favs,
      journal,
      settings: { ...DEFAULT_SETTINGS, ...settings },
      hydrated: true,
    });
  },
}));
