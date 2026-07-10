const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** « 10 juillet » — date du jour, format court français. */
export function dateCourte(d = new Date()): string {
  return `${d.getDate()} ${MOIS[d.getMonth()]}`;
}

/** « 10 juillet 2026 » — date longue. */
export function dateLongue(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
