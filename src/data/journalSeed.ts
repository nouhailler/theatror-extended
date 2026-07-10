import type { JournalEntry } from '../store';

// Entrées d'exemple, insérées au premier lancement uniquement.
export const JOURNAL_SEED: JournalEntry[] = [
  {
    id: 'seed-1', titre: 'Répétition — Tartuffe, acte III', date: '2026-07-09', type: 'Répétition',
    minutes: 120,
    txt: "Scène 3 avec Elmire : mieux tenir le silence avant « Je vous parle un peu franc ». Revoir le placement côté jardin.",
  },
  {
    id: 'seed-2', titre: 'Diction : les « r » roulés', date: '2026-07-06', type: 'Progrès',
    minutes: 15,
    txt: "Virelangues 15 min. Net progrès sur « Trois tortues trottaient ». À refaire chaque matin.",
  },
  {
    id: 'seed-3', titre: 'Idée de mise en scène', date: '2026-07-02', type: 'Idée',
    txt: "Jouer l'aparté d'Orgon face public, lumière resserrée — effet confession.",
  },
];
