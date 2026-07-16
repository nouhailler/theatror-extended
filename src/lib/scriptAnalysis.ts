// Analyse du rôle — extraction et découpage du texte pour l'IA.
// Contrainte : les comédiens utilisent des modèles gratuits d'OpenRouter (8k–32k
// de contexte). On n'envoie donc JAMAIS la pièce entière : on isole les répliques
// du personnage joué, on les groupe par acte, et on redécoupe un acte trop long
// en morceaux ≤ maxChars. Chaque morceau = une requête IA autonome et légère.
//
// Astuce clé : une requête comme « où mon personnage parle-t-il de son père ? »
// se répond à partir de ses SEULES répliques — pas besoin du reste de la scène.

import type { TexteBloc } from '../data/pieceTextes';
import { normKey, titleCase } from '../data/rehearsal';

export interface RoleChar {
  key: string; // nom normalisé (majuscules) — identité stable
  label: string; // libellé lisible
  count: number; // nombre de répliques
}

/** Personnages présents dans le texte, triés par nombre de répliques. */
export function rolesOf(blocs: TexteBloc[]): RoleChar[] {
  const map = new Map<string, RoleChar>();
  let speaker: string | null = null;
  let label = '';
  for (const b of blocs) {
    if (b.k === 'perso') {
      speaker = normKey(b.t);
      label = titleCase(b.t.trim().replace(/[.:—–-]+\s*$/, ''));
    } else if (b.k === 'ligne' && speaker) {
      const t = (b.t ?? '').trim();
      if (!t) continue;
      const ex = map.get(speaker);
      if (ex) ex.count++;
      else map.set(speaker, { key: speaker, label: label || titleCase(speaker), count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'fr'));
}

export interface SceneLignes {
  scene: string;
  lignes: string[];
}

export interface ActeRole {
  acteLabel: string;
  acteIndex: number; // 1-based
  scenes: SceneLignes[];
  chars: number;
  lineCount: number;
}

/** Répliques du personnage regroupées par acte puis par scène (actes où il parle). */
export function actesForRole(blocs: TexteBloc[], charKey: string): ActeRole[] {
  const actes: ActeRole[] = [];
  let cur: ActeRole | null = null;
  let sceneLabel = '';
  let speaker: string | null = null;

  const ensureActe = (): ActeRole => {
    if (!cur) {
      cur = { acteLabel: 'Acte unique', acteIndex: actes.length + 1, scenes: [], chars: 0, lineCount: 0 };
      actes.push(cur);
    }
    return cur;
  };
  const ensureScene = (a: ActeRole): SceneLignes => {
    const label = sceneLabel || 'Scène 1';
    const last = a.scenes[a.scenes.length - 1];
    if (last && last.scene === label) return last;
    const s = { scene: label, lignes: [] as string[] };
    a.scenes.push(s);
    return s;
  };

  for (const b of blocs) {
    if (b.k === 'acte') {
      cur = { acteLabel: b.t.trim() || `Acte ${actes.length + 1}`, acteIndex: actes.length + 1, scenes: [], chars: 0, lineCount: 0 };
      actes.push(cur);
      sceneLabel = '';
      speaker = null;
    } else if (b.k === 'scene') {
      sceneLabel = b.t.trim();
      speaker = null;
    } else if (b.k === 'perso') {
      speaker = normKey(b.t);
    } else if (b.k === 'ligne' && speaker === charKey) {
      const t = (b.t ?? '').trim();
      if (!t) continue;
      const a = ensureActe();
      const s = ensureScene(a);
      s.lignes.push(t);
      a.chars += t.length + 1;
      a.lineCount++;
    }
  }
  return actes.filter((a) => a.lineCount > 0);
}

export interface Chunk {
  acteLabel: string;
  acteIndex: number;
  part: number; // 1-based, morceau au sein de l'acte
  parts: number; // nombre total de morceaux pour cet acte
  scenes: SceneLignes[];
  chars: number;
}

const scenesChars = (scenes: SceneLignes[]) =>
  scenes.reduce((n, s) => n + s.lignes.join('\n').length, 0);

/** Découpe un acte en morceaux dont la charge (caractères) ≤ maxChars. */
function chunkActe(a: ActeRole, maxChars: number): Chunk[] {
  const groups: SceneLignes[][] = [];
  let cur: SceneLignes[] = [];

  const flush = () => { if (cur.length) { groups.push(cur); cur = []; } };

  for (const s of a.scenes) {
    const sChars = s.lignes.join('\n').length;
    if (sChars > maxChars) {
      // Une seule scène dépasse le budget : on scinde ses répliques.
      flush();
      let sub: string[] = [];
      let subChars = 0;
      let piece = 0;
      for (const ln of s.lignes) {
        if (subChars + ln.length > maxChars && sub.length) {
          groups.push([{ scene: piece ? `${s.scene} (suite ${piece})` : s.scene, lignes: sub }]);
          piece++;
          sub = [];
          subChars = 0;
        }
        sub.push(ln);
        subChars += ln.length + 1;
      }
      if (sub.length) groups.push([{ scene: piece ? `${s.scene} (suite ${piece})` : s.scene, lignes: sub }]);
      continue;
    }
    if (scenesChars(cur) + sChars > maxChars && cur.length) flush();
    cur.push(s);
  }
  flush();

  // Fusionne les groupes adjacents tant qu'ils tiennent dans le budget : évite
  // les micro-requêtes laissées par le découpage d'une longue scène.
  const merged: SceneLignes[][] = [];
  for (const g of groups) {
    const last = merged[merged.length - 1];
    if (last && scenesChars(last) + scenesChars(g) <= maxChars) merged[merged.length - 1] = [...last, ...g];
    else merged.push(g);
  }

  return merged.map((scenes, i) => ({
    acteLabel: a.acteLabel,
    acteIndex: a.acteIndex,
    part: i + 1,
    parts: merged.length,
    scenes,
    chars: scenesChars(scenes),
  }));
}

/** Plan des requêtes IA (un Chunk = une requête légère). `acteIndex` filtre un acte. */
export function chunksForRole(
  blocs: TexteBloc[],
  charKey: string,
  opts: { maxChars?: number; acteIndex?: number | 'all' } = {},
): Chunk[] {
  const maxChars = opts.maxChars ?? 4500;
  let actes = actesForRole(blocs, charKey);
  if (opts.acteIndex && opts.acteIndex !== 'all') actes = actes.filter((a) => a.acteIndex === opts.acteIndex);
  return actes.flatMap((a) => chunkActe(a, maxChars));
}

/** Rend les répliques d'un morceau en texte pour le prompt (scène par scène). */
export function chunkText(c: Chunk): string {
  return c.scenes
    .map((s) => `${s.scene} :\n${s.lignes.map((l) => `- ${l}`).join('\n')}`)
    .join('\n\n');
}

/** En-tête lisible d'un morceau (« Acte II » ou « Acte II — partie 2/3 »). */
export function chunkHeader(c: Chunk): string {
  return c.parts > 1 ? `${c.acteLabel} — partie ${c.part}/${c.parts}` : c.acteLabel;
}
