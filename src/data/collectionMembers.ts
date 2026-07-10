import { PIECES } from './pieces';
import type { Piece } from './types';

// Appartenance d'une pièce à une collection (par prédicat sur le catalogue actuel).
const MEMBERS: Record<string, (p: Piece) => boolean> = {
  incontournables: () => true, // les incontournables : tout le catalogue pour l'instant
  'tragedies-grecques': (p) => p.epoque === 'antique' && p.genre === 'tragédie',
  moliere: (p) => p.auteurId === 'moliere',
  shakespeare: (p) => p.auteurId === 'shakespeare',
  femmes: (p) => p.auteurId === 'sand',
  absurde: (p) => p.genre === 'absurde' || p.genre === 'farce',
};

export function piecesForCollection(id: string): Piece[] {
  const test = MEMBERS[id];
  if (!test) return [];
  return PIECES.filter(test);
}
