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
import { todayISO } from './lib/date';

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

// ─── Carnet d'adresses (professionnels du spectacle) ───
export type ContactRole =
  | 'Metteur en scène' | 'Directeur de casting' | 'Régisseur'
  | 'Comédien' | 'Compagnie' | 'Agent' | 'Autre';

export const CONTACT_ROLES: ContactRole[] = [
  'Metteur en scène', 'Directeur de casting', 'Régisseur',
  'Comédien', 'Compagnie', 'Agent', 'Autre',
];

export interface Contact {
  id: string;
  nom: string;
  role: ContactRole;
  organisation?: string; // théâtre, compagnie
  email?: string;
  tel?: string;
  url?: string;          // site compagnie / profil professionnel
  anniversaire?: string; // ISO (l'année est ignorée pour le rappel annuel)
  notes?: string;
  fiche?: string;        // résumé IA extrait de l'URL (markdown)
  ficheAt?: string;      // ISO — date de génération du résumé
  ficheSource?: 'page' | 'modele'; // extraction réelle de la page, ou repli connaissance
  createdAt: string;
}

// ─── Suivi des interactions (rappels contextuels) ───
export type ReminderKind = 'relance' | 'anniversaire' | 'felicitation' | 'autre';

export interface Reminder {
  id: string;
  contactId: string;
  label: string;
  due: string; // ISO (YYYY-MM-DD)
  kind: ReminderKind;
  note?: string;
  done: boolean;
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

  // Carnet d'adresses
  contacts: Contact[];
  addContact: (c: Omit<Contact, 'id' | 'createdAt'>) => string;
  updateContact: (id: string, patch: Partial<Omit<Contact, 'id' | 'createdAt'>>) => void;
  deleteContact: (id: string) => void;

  // Rappels de suivi
  reminders: Reminder[];
  addReminder: (r: Omit<Reminder, 'id' | 'done'>) => void;
  updateReminder: (id: string, patch: Partial<Omit<Reminder, 'id'>>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;

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

  contacts: [],
  addContact: (c) => {
    const id = uid();
    const contacts = [{ ...c, id, createdAt: todayISO() }, ...getState().contacts];
    set({ contacts });
    void idbSet(KEYS.contacts, contacts);
    return id;
  },
  updateContact: (id, patch) => {
    const contacts = getState().contacts.map((c) => (c.id === id ? { ...c, ...patch } : c));
    set({ contacts });
    void idbSet(KEYS.contacts, contacts);
  },
  deleteContact: (id) => {
    const contacts = getState().contacts.filter((c) => c.id !== id);
    const reminders = getState().reminders.filter((r) => r.contactId !== id);
    set({ contacts, reminders });
    void idbSet(KEYS.contacts, contacts);
    void idbSet(KEYS.reminders, reminders);
  },

  reminders: [],
  addReminder: (r) => {
    const reminders = [...getState().reminders, { ...r, id: uid(), done: false }];
    set({ reminders });
    void idbSet(KEYS.reminders, reminders);
  },
  updateReminder: (id, patch) => {
    const reminders = getState().reminders.map((r) => (r.id === id ? { ...r, ...patch } : r));
    set({ reminders });
    void idbSet(KEYS.reminders, reminders);
  },
  toggleReminder: (id) => {
    const reminders = getState().reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r));
    set({ reminders });
    void idbSet(KEYS.reminders, reminders);
  },
  deleteReminder: (id) => {
    const reminders = getState().reminders.filter((r) => r.id !== id);
    set({ reminders });
    void idbSet(KEYS.reminders, reminders);
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
    const [favs, storedJournal, settings, seeded, contacts, reminders] = await Promise.all([
      idbGet<FavMap>(KEYS.favs, {}),
      idbGet<JournalEntry[]>(KEYS.journal, []),
      idbGet<Settings>(KEYS.settings, DEFAULT_SETTINGS),
      idbGet<boolean>(KEYS.seeded, false),
      idbGet<Contact[]>(KEYS.contacts, []),
      idbGet<Reminder[]>(KEYS.reminders, []),
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
      contacts,
      reminders,
      settings: { ...DEFAULT_SETTINGS, ...settings },
      hydrated: true,
    });
  },
}));
