// Persistance du journal de répétition (IndexedDB via idb-keyval).
// Toutes les entrées, toutes pièces confondues, dans une seule clé ; on filtre
// par pieceId à la lecture. Chargé à la demande — hors-ligne après 1re visite.
import { create } from 'zustand';
import { KEYS, idbGet, idbSet } from './storage';
import type { RepJournalEntry } from '../data/repJournal';

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

interface RepJournalState {
  entries: RepJournalEntry[];
  loaded: boolean;
  load: () => Promise<void>;
  forPiece: (pieceId: string) => RepJournalEntry[];
  save: (entry: RepJournalEntry) => RepJournalEntry; // crée ou met à jour
  remove: (id: string) => void;
}

export const useRepJournalStore = create<RepJournalState>((set, get) => {
  const persist = (entries: RepJournalEntry[]) => { void idbSet(KEYS.repJournal, entries); };

  return {
    entries: [],
    loaded: false,

    load: async () => {
      if (get().loaded) return;
      const entries = await idbGet<RepJournalEntry[]>(KEYS.repJournal, []);
      set({ entries, loaded: true });
    },

    forPiece: (pieceId) =>
      get().entries
        .filter((e) => e.pieceId === pieceId)
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.createdAt - a.createdAt)),

    save: (entry) => {
      const now = Date.now();
      let saved: RepJournalEntry;
      let entries: RepJournalEntry[];
      if (entry.id) {
        saved = { ...entry, updatedAt: now };
        entries = get().entries.map((e) => (e.id === entry.id ? saved : e));
      } else {
        saved = { ...entry, id: uid(), createdAt: now, updatedAt: now };
        entries = [saved, ...get().entries];
      }
      set({ entries });
      persist(entries);
      return saved;
    },

    remove: (id) => {
      const entries = get().entries.filter((e) => e.id !== id);
      set({ entries });
      persist(entries);
    },
  };
});
