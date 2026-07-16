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

/** Nombre de jours entiers entre aujourd'hui et une date ISO (négatif = passé). */
export function joursDepuisAujourdhui(iso: string): number {
  const cible = new Date(iso + 'T00:00:00');
  if (isNaN(cible.getTime())) return NaN;
  const now = new Date();
  const auj = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((cible.getTime() - auj.getTime()) / 86400000);
}

/** « aujourd'hui », « demain », « dans 3 jours », « il y a 2 jours ». */
export function delaiRelatif(iso: string): string {
  const j = joursDepuisAujourdhui(iso);
  if (isNaN(j)) return iso;
  if (j === 0) return "aujourd'hui";
  if (j === 1) return 'demain';
  if (j === -1) return 'hier';
  if (j > 1) return `dans ${j} jours`;
  return `il y a ${-j} jours`;
}

/** Décale une date ISO de n mois (utile pour « relancer +3 mois »). */
export function ajouteMois(iso: string, mois: number): string {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  d.setMonth(d.getMonth() + mois);
  return d.toISOString().slice(0, 10);
}

/** Décale la date du jour de n jours (ISO). */
export function dansNJours(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
