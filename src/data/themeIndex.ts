import { REFERENCES, REF_THEMES } from './themes';
import type { RefOeuvre, RefTheme } from './types';

/** Œuvres abordant un thème, classées par auteur puis titre. */
export function oeuvresForTheme(theme: RefTheme): RefOeuvre[] {
  return REFERENCES.filter((o) => o.notes.some((n) => n.theme === theme)).sort(
    (a, b) => a.auteur.localeCompare(b.auteur, 'fr') || a.piece.localeCompare(b.piece, 'fr'),
  );
}

/** Note (résumé) d'une œuvre pour un thème donné. */
export function noteFor(o: RefOeuvre, theme: RefTheme): string | undefined {
  return o.notes.find((n) => n.theme === theme)?.txt;
}

/** Nombre d'œuvres par thème, calculé une fois. */
export const themeCounts: Record<RefTheme, number> = Object.fromEntries(
  REF_THEMES.map((t) => [t, REFERENCES.filter((o) => o.notes.some((n) => n.theme === t)).length]),
);
