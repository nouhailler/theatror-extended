// Journal de répétition — modèle de données (par pièce du catalogue).
// Une entrée = une séance de répétition, avec la scène travaillée, l'état du
// comédien, les notes de mise en scène, le travail personnel, la régie et le
// bilan. Aucune dépendance UI : facilement testable.

import type { TexteBloc } from './pieceTextes';

export interface RepJournalEntry {
  id: string;
  pieceId: string; // pièce du catalogue
  pieceTitre: string;
  date: string; // ISO yyyy-mm-dd
  createdAt: number;
  updatedAt: number;

  // Scène travaillée (situer la note dans la pièce)
  acte: string; // libellé de l'acte, '' si non renseigné
  scenes: string[]; // libellés des scènes travaillées
  sceneLibre: string; // moment travaillé en texte libre (pièces sans structure)

  // 1) Niveau d'énergie / météo intérieure (1..5)
  energie: number; // 0 = non renseigné, 1..5

  // 2) Présences
  presMES: boolean; // metteur en scène présent
  presRegie: boolean; // régisseur présent
  presAutres: string; // partenaires présents / absents (texte libre)

  // 3) Notes de mise en scène (objectif — directives du metteur en scène)
  mesDeplacements: string;
  mesRythme: string;
  mesIntentions: string;

  // 4) Travail d'interprétation (subjectif & personnel)
  interpDecouvertes: string;
  interpRates: string;
  interpPhysique: string;
  interpPartenaires: string;

  // 5) Régie (logistique scénique)
  regieAccessoires: string;
  regieCostumes: string;
  regieLumSon: string;

  // 6) Le recul (bilan et après-répétition)
  reculRetourMES: string;
  reculRessenti: string;
  reculDevoirs: string;

  // 7) Note vocale rapide (dictée à chaud, persistée en base64)
  audio?: string; // dataURL audio
  audioMs?: number; // durée approximative en ms
}

// Échelle d'énergie : emoji + libellé.
export const ENERGIE: { v: number; emoji: string; label: string }[] = [
  { v: 1, emoji: '😴', label: 'Épuisé' },
  { v: 2, emoji: '😕', label: 'Fatigué' },
  { v: 3, emoji: '😐', label: 'Neutre' },
  { v: 4, emoji: '🙂', label: 'En forme' },
  { v: 5, emoji: '🤩', label: 'Au top' },
];

export function energieOf(v: number): { emoji: string; label: string } | undefined {
  return ENERGIE.find((e) => e.v === v);
}

export interface ActeScenes {
  acte: string;
  scenes: string[];
}

// Extrait la structure actes → scènes depuis les blocs du texte intégral.
// Tolérant : un texte sans « acte » explicite mais avec des « scène » crée un
// « Acte unique » ; un doublon de libellé de scène est ignoré.
export function actsScenes(blocs: TexteBloc[]): ActeScenes[] {
  const out: ActeScenes[] = [];
  let cur: ActeScenes | null = null;
  for (const b of blocs) {
    const t = (b.t ?? '').trim();
    if (b.k === 'acte') {
      cur = { acte: t || `Acte ${out.length + 1}`, scenes: [] };
      out.push(cur);
    } else if (b.k === 'scene') {
      if (!cur) {
        cur = { acte: 'Acte unique', scenes: [] };
        out.push(cur);
      }
      if (t && !cur.scenes.includes(t)) cur.scenes.push(t);
    }
  }
  return out;
}

export function emptyEntry(pieceId: string, pieceTitre: string, date: string): RepJournalEntry {
  return {
    id: '',
    pieceId,
    pieceTitre,
    date,
    createdAt: 0,
    updatedAt: 0,
    acte: '',
    scenes: [],
    sceneLibre: '',
    energie: 0,
    presMES: false,
    presRegie: false,
    presAutres: '',
    mesDeplacements: '',
    mesRythme: '',
    mesIntentions: '',
    interpDecouvertes: '',
    interpRates: '',
    interpPhysique: '',
    interpPartenaires: '',
    regieAccessoires: '',
    regieCostumes: '',
    regieLumSon: '',
    reculRetourMES: '',
    reculRessenti: '',
    reculDevoirs: '',
  };
}

// Une entrée a-t-elle un contenu digne d'être affiché dans un récap ?
const TEXT_FIELDS: (keyof RepJournalEntry)[] = [
  'presAutres', 'mesDeplacements', 'mesRythme', 'mesIntentions',
  'interpDecouvertes', 'interpRates', 'interpPhysique', 'interpPartenaires',
  'regieAccessoires', 'regieCostumes', 'regieLumSon',
  'reculRetourMES', 'reculRessenti', 'reculDevoirs', 'sceneLibre',
];

export function isEmptyEntry(e: RepJournalEntry): boolean {
  if (e.energie || e.presMES || e.presRegie || e.audio) return false;
  if (e.scenes.length || e.acte) return false;
  return TEXT_FIELDS.every((f) => !String(e[f] ?? '').trim());
}
