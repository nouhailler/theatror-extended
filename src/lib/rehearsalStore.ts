// Persistance des pièces du mode répétition (IndexedDB via idb-keyval).
// Store zustand dédié, chargé à la demande — hors-ligne après 1re visite.
import { create } from 'zustand';
import { KEYS, idbGet, idbSet } from './storage';
import { parseScript, guessTitle, type RepPlay, type RepScript, type RepConfig } from '../data/rehearsal';

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

interface RehearsalState {
  plays: RepPlay[];
  loaded: boolean;
  load: () => Promise<void>;
  create: (raw: string, titre?: string) => RepPlay;
  importFromPiece: (sourceId: string, titre: string, script: RepScript) => RepPlay;
  get: (id: string) => RepPlay | undefined;
  update: (id: string, patch: Partial<RepPlay>) => void;
  setScript: (id: string, script: RepScript) => void;
  setConfig: (id: string, config: RepConfig) => void;
  setPosition: (id: string, position: number) => void;
  remove: (id: string) => void;
}

export const useRehearsalStore = create<RehearsalState>((set, get) => {
  const persist = (plays: RepPlay[]) => { void idbSet(KEYS.rehearsal, plays); };

  const patch = (id: string, patch: Partial<RepPlay>) => {
    const plays = get().plays.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p));
    set({ plays });
    persist(plays);
  };

  return {
    plays: [],
    loaded: false,

    load: async () => {
      if (get().loaded) return;
      const plays = await idbGet<RepPlay[]>(KEYS.rehearsal, []);
      set({ plays, loaded: true });
    },

    create: (raw, titre) => {
      const now = Date.now();
      const play: RepPlay = {
        id: uid(),
        titre: (titre?.trim() || guessTitle(raw)),
        raw,
        script: parseScript(raw),
        position: 0,
        createdAt: now,
        updatedAt: now,
      };
      const plays = [play, ...get().plays];
      set({ plays });
      persist(plays);
      return play;
    },

    // Import depuis le catalogue : réutilise la pièce déjà importée (sourceId)
    // pour ne pas créer de doublon à chaque clic.
    importFromPiece: (sourceId, titre, script) => {
      const existing = get().plays.find((p) => p.sourceId === sourceId);
      if (existing) return existing;
      const now = Date.now();
      const play: RepPlay = {
        id: uid(), sourceId, titre, raw: '', script, position: 0, createdAt: now, updatedAt: now,
      };
      const plays = [play, ...get().plays];
      set({ plays });
      persist(plays);
      return play;
    },

    get: (id) => get().plays.find((p) => p.id === id),
    update: (id, p) => patch(id, p),
    setScript: (id, script) => patch(id, { script }),
    setConfig: (id, config) => patch(id, { config }),
    setPosition: (id, position) => patch(id, { position }),

    remove: (id) => {
      const plays = get().plays.filter((p) => p.id !== id);
      set({ plays });
      persist(plays);
    },
  };
});
