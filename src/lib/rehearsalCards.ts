// Cartes de mémorisation (type Anki) pour le mode Répétition. Construit, à partir
// du script déjà parsé et du rôle joué, une carte par réplique du comédien avec :
//  • l'amorce du partenaire (dernière phrase avant) — mode Ping-Pong,
//  • l'indice de mise en scène (didascalie + acte/scène) — mode Indice,
//  • le texte à trous (mots porteurs masqués, adaptatif) — mode Trous.
// Aucune dépendance UI : entièrement pur / testable.

import type { RepScript } from '../data/rehearsal';

export interface Card {
  id: number; // id de l'item (stable dans le script)
  line: string; // réplique complète (verso Ping-Pong / Trous)
  partner?: string; // libellé du partenaire qui précède
  pingCue: string; // dernière phrase du partenaire (recto Ping-Pong)
  contextCue: string; // indice de mise en scène (recto Indice)
  amorce: string; // début de la réplique (verso Indice)
}

const strip = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function lastSentence(text: string): string {
  const parts = text.split(/(?<=[.?!…»])\s+/).map((s) => s.trim()).filter(Boolean);
  let s = parts[parts.length - 1] ?? text;
  if (parts.length >= 2 && s.split(/\s+/).length < 3) s = `${parts[parts.length - 2]} ${s}`;
  const w = s.split(/\s+/);
  return w.length > 14 ? `… ${w.slice(-12).join(' ')}` : s;
}

function amorce(text: string): string {
  const first = text.split(/(?<=[.?!…])\s/)[0]?.trim() ?? text;
  if (first && first.split(/\s+/).length <= 12) return first;
  return `${text.split(/\s+/).slice(0, 9).join(' ')}…`;
}

/** Une carte par réplique du rôle, dans l'ordre de la pièce. */
export function buildCards(script: RepScript, roleKey: string, labelOf: (k: string) => string): Card[] {
  const items = script.items;
  const cards: Card[] = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it.kind !== 'line' || it.speaker !== roleKey || !it.text.trim()) continue;

    // Ping-Pong : dernière phrase de la réplique adverse la plus proche.
    let pingCue = '';
    let partner: string | undefined;
    for (let j = i - 1; j >= 0; j--) {
      const p = items[j];
      if (p.kind === 'line' && p.speaker === roleKey) break; // ma réplique ouvre l'échange
      if (p.kind === 'line' && p.speaker && p.speaker !== roleKey) { pingCue = lastSentence(p.text); partner = labelOf(p.speaker); break; }
    }

    // Indice : didascalie immédiate + acte/scène courants.
    let dida = '';
    for (let j = i - 1; j >= 0; j--) {
      const p = items[j];
      if (p.kind === 'didascalie') { dida = p.text.trim(); break; }
      if (p.kind === 'line') break;
    }
    let actScene = '';
    for (let j = i - 1; j >= 0; j--) {
      const p = items[j];
      if (p.kind === 'didascalie' && /\bacte\b|\bsc[eè]ne\b/i.test(p.text)) { actScene = p.text.trim(); break; }
    }
    const contextCue = [actScene, dida && dida !== actScene ? dida : ''].filter(Boolean).join(' · ') || 'Ouverture de la pièce';

    cards.push({ id: it.id, line: it.text, partner, pingCue: pingCue || "(à toi d'ouvrir)", contextCue, amorce: amorce(it.text) });
  }
  return cards;
}

// ─── Texte à trous ───
const STOP = new Set([
  'dans', 'pour', 'avec', 'vous', 'nous', 'elle', 'mais', 'plus', 'tout', 'tous',
  'cette', 'leur', 'leurs', 'vos', 'mes', 'ses', 'les', 'des', 'une', 'que', 'qui',
  'quoi', 'donc', 'sans', 'sous', 'tres', 'bien', 'fait', 'faire', 'avez', 'etes',
  'sont', 'cela', 'ceci', 'ainsi', 'alors', 'mon', 'ton', 'son', 'nos', 'ils',
  'est', 'pas', 'ne', 'de', 'le', 'la', 'et', 'un', 'en', 'au', 'du', 'ce', 'se',
]);

export interface ClozeToken { text: string; masked: boolean }

/**
 * Découpe la réplique en jetons, masquant une proportion `ratio` des mots
 * porteurs. Les mots de `prefer` (déjà ratés) sont masqués en priorité →
 * adaptatif. Sélection déterministe (stable pour une même réplique/densité).
 */
export function clozeTokens(line: string, ratio: number, prefer: string[] = []): ClozeToken[] {
  const raw = line.split(/(\s+)/); // conserve les espaces
  // Candidat = jeton dont le noyau alphabétique fait ≥ 4 lettres et n'est pas un
  // mot-outil (on tolère la ponctuation collée : « cacher. », « dis-je, »).
  const core = (t: string) => strip(t).replace(/[^a-z]/g, '');
  const candIdx = raw
    .map((t, i) => ({ t, i }))
    .filter(({ t }) => !/^\s*$/.test(t) && core(t).length >= 4 && !STOP.has(core(t)));
  if (candIdx.length === 0) return raw.map((text) => ({ text, masked: false }));

  const wanted = new Set(prefer.map((w) => strip(w)));
  const nMask = Math.max(1, Math.round(candIdx.length * ratio));
  const chosen = new Set<number>();
  // priorité aux mots déjà ratés
  for (const c of candIdx) { if (chosen.size >= nMask) break; if (wanted.has(strip(c.t))) chosen.add(c.i); }
  // complète en répartissant régulièrement
  const rest = candIdx.filter((c) => !chosen.has(c.i));
  const need = nMask - chosen.size;
  if (need > 0) { const step = Math.max(1, Math.floor(rest.length / need)); for (let k = 0; k < rest.length && chosen.size < nMask; k += step) chosen.add(rest[k].i); }

  return raw.map((text, i) => ({ text, masked: chosen.has(i) }));
}

/** Mots effectivement masqués (pour mémoriser ce que le comédien a raté). */
export function maskedWords(tokens: ClozeToken[]): string[] {
  return tokens.filter((t) => t.masked).map((t) => t.text);
}
