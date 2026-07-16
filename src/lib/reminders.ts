// Calcul des échéances du suivi des interactions.
// Fusionne les rappels explicites (relance, félicitation…) et les anniversaires
// dérivés des contacts (occurrence annuelle), pour l'encart « À relancer ».

import type { Contact, Reminder, ReminderKind } from '../store';
import { joursDepuisAujourdhui, todayISO } from './date';

export interface DueItem {
  id: string; // id du rappel, ou `bday:<contactId>` pour un anniversaire dérivé
  reminderId?: string; // présent seulement pour un vrai rappel (permet « fait »)
  contactId: string;
  contactNom: string;
  label: string;
  due: string; // ISO
  kind: ReminderKind;
  jours: number; // jours avant échéance (négatif = en retard)
  enRetard: boolean;
  virtuel: boolean; // anniversaire dérivé — ne peut pas être marqué « fait »
}

/** Prochaine occurrence annuelle d'un jour/mois (ISO), à partir d'aujourd'hui. */
function prochainAnniversaire(iso: string): string | null {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  const auj = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let occ = new Date(auj.getFullYear(), d.getMonth(), d.getDate());
  if (occ.getTime() < auj.getTime()) occ = new Date(auj.getFullYear() + 1, d.getMonth(), d.getDate());
  return occ.toISOString().slice(0, 10);
}

const KIND_LABEL: Record<ReminderKind, string> = {
  relance: 'Relance',
  anniversaire: 'Anniversaire',
  felicitation: 'Félicitations',
  autre: 'Rappel',
};

export function kindLabel(k: ReminderKind): string {
  return KIND_LABEL[k];
}

/**
 * Rappels à afficher : rappels non faits dont l'échéance tombe dans `horizon`
 * jours (en retard inclus), plus les anniversaires proches (≤ `horizonAnniv`).
 * Triés par échéance croissante (les retards d'abord).
 */
export function dueItems(
  contacts: Contact[],
  reminders: Reminder[],
  opts: { horizon?: number; horizonAnniv?: number } = {},
): DueItem[] {
  const horizon = opts.horizon ?? 30;
  const horizonAnniv = opts.horizonAnniv ?? 14;
  const nomDe = new Map(contacts.map((c) => [c.id, c.nom]));
  const items: DueItem[] = [];

  for (const r of reminders) {
    if (r.done) continue;
    if (!nomDe.has(r.contactId)) continue; // contact supprimé
    const jours = joursDepuisAujourdhui(r.due);
    if (isNaN(jours) || jours > horizon) continue;
    items.push({
      id: r.id,
      reminderId: r.id,
      contactId: r.contactId,
      contactNom: nomDe.get(r.contactId) ?? '',
      label: r.label,
      due: r.due,
      kind: r.kind,
      jours,
      enRetard: jours < 0,
      virtuel: false,
    });
  }

  // Anniversaires dérivés — seulement à l'approche, jamais « en retard ».
  const dejaRappel = new Set(
    reminders.filter((r) => !r.done && r.kind === 'anniversaire').map((r) => r.contactId),
  );
  for (const c of contacts) {
    if (!c.anniversaire || dejaRappel.has(c.id)) continue;
    const due = prochainAnniversaire(c.anniversaire);
    if (!due) continue;
    const jours = joursDepuisAujourdhui(due);
    if (jours < 0 || jours > horizonAnniv) continue;
    items.push({
      id: `bday:${c.id}`,
      contactId: c.id,
      contactNom: c.nom,
      label: `Anniversaire de ${c.nom}`,
      due,
      kind: 'anniversaire',
      jours,
      enRetard: false,
      virtuel: true,
    });
  }

  return items.sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0));
}

/** Nombre de rappels non faits déjà échus (pour une pastille). */
export function countEnRetard(contacts: Contact[], reminders: Reminder[]): number {
  const ids = new Set(contacts.map((c) => c.id));
  const t = todayISO();
  return reminders.filter((r) => !r.done && ids.has(r.contactId) && r.due <= t).length;
}
