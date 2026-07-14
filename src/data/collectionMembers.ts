import { PIECES } from './pieces';
import type { Piece } from './types';

// Appartenance d'une pièce à une collection (prédicat sur le catalogue réel).
// Les prédicats sont pensés pour refléter fidèlement le catalogue actuel.
const MEMBERS: Record<string, (p: Piece) => boolean> = {
  moliere: (p) => p.auteurId === 'moliere',
  'tragedie-classique': (p) => (p.auteurId === 'corneille' || p.auteurId === 'racine') && (p.genre === 'tragédie' || p.genre === 'tragi-comédie'),
  'tragedies-grecques': (p) => p.epoque === 'antique' && p.genre === 'tragédie',
  rire: (p) => ['labiche', 'feydeau', 'courteline'].includes(p.auteurId ?? '') && (p.genre === 'vaudeville' || p.genre === 'comédie' || p.genre === 'farce'),
  marivaux: (p) => p.auteurId === 'marivaux',
  shakespeare: (p) => p.auteurId === 'shakespeare',
  courtes: (p) => p.dureeMin > 0 && p.dureeMin <= 60,
  'petite-distribution': (p) => {
    const total = (p.hommes ?? 0) + (p.femmes ?? 0);
    return total >= 1 && total <= 4;
  },
  'jeune-public': (p) => p.pourEnfants === true,
};

// Ordre d'affichage dans une collection : chronologique (repères).
function ordre(a: Piece, b: Piece): number {
  return (a.anneeNum ?? 0) - (b.anneeNum ?? 0) || a.titre.localeCompare(b.titre, 'fr');
}

export function piecesForCollection(id: string): Piece[] {
  const test = MEMBERS[id];
  if (!test) return [];
  return PIECES.filter(test).sort(ordre);
}

/** Nombre de pièces d'une collection (pour l'affichage). */
export function collectionCount(id: string): number {
  const test = MEMBERS[id];
  if (!test) return 0;
  return PIECES.filter(test).length;
}
