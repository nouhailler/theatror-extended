// Mode répétition — modèle de données et parser tolérant du texte théâtral.
// Aucune dépendance UI/navigateur : entièrement testable.

export type MyLineMode = 'manual' | 'timed' | 'hidden';
export type DidascalieMode = 'read' | 'show' | 'ignore';

export interface RepItem {
  id: number;
  kind: 'line' | 'didascalie';
  speaker?: string; // clé du personnage (nom normalisé) pour kind='line'
  text: string;
}

export interface RepChar {
  key: string; // NOM normalisé (majuscules, espaces simples) — identité stable
  label: string; // libellé affiché, éditable
  count: number; // nombre de répliques
}

export interface RepScript {
  items: RepItem[];
  characters: RepChar[];
}

export interface RepConfig {
  myRole: string; // clé du personnage joué
  voiceByChar: Record<string, string>; // clé perso → voiceURI
  rate: number; // 0.5–1.5
  volume: number; // 0–1
  didascalieMode: DidascalieMode;
  myLineMode: MyLineMode;
}

// Mémorisation par cartes (type Anki). box : 0 = à revoir, 1 = presque, 2 = su.
export interface CardMemo {
  box: number;
  seen: number;
  ok: number;
  miss?: string[]; // mots ratés en mode « texte à trous » (re-masqués en priorité)
}

export interface RepPlay {
  id: string;
  titre: string;
  raw: string;
  script: RepScript;
  config?: RepConfig;
  position: number; // dernier index de lecture
  createdAt: number;
  updatedAt: number;
  sourceId?: string; // id de la pièce du catalogue (import « Répéter cette pièce »)
  // Mémorisation par cartes : mémo[rôle][idCarte]. Séparé par rôle (une même
  // pièce peut se réviser pour des rôles différents).
  memo?: Record<string, Record<number, CardMemo>>;
}

export const DEFAULT_CONFIG: Omit<RepConfig, 'myRole'> = {
  voiceByChar: {},
  rate: 1,
  volume: 1,
  didascalieMode: 'show',
  myLineMode: 'manual',
};

// Normalise un nom de personnage en clé : majuscules, espaces simples, sans
// ponctuation de fin. « Le Comte. » → « LE COMTE ».
export function normKey(name: string): string {
  return name
    .replace(/[.:—–-]+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

// Un nom de personnage est-il « tout en capitales » ? (lettres majuscules,
// espaces, apostrophes, chiffres, points d'abréviation ; pas de minuscule).
function isAllCaps(s: string): boolean {
  if (!/\p{Lu}/u.test(s)) return false; // au moins une majuscule
  return !/\p{Ll}/u.test(s); // aucune minuscule
}

// Détecte une amorce de réplique « NOM : … », « NOM — … » ou « NOM. … ».
// Renvoie { name, rest } ou null.
function matchCue(line: string): { name: string; rest: string } | null {
  const m = line.match(/^\s*([^\s].{0,48}?)\s*([:—–])\s*(.*)$/u);
  if (m) {
    const name = m[1].trim();
    if (name.split(/\s+/).length <= 6 && /\p{L}/u.test(name)) {
      return { name, rest: m[3].trim() };
    }
  }
  // Séparateur « . » : uniquement si le nom est entièrement en capitales
  // (« ARGAN. » = amorce, « Il. » = phrase).
  const d = line.match(/^\s*([\p{Lu}][\p{Lu}\s'’.\d-]*?)\.\s+(.*)$/u);
  if (d) {
    const name = d[1].trim();
    if (name.length >= 2 && isAllCaps(name) && name.split(/\s+/).length <= 6) {
      return { name, rest: d[2].trim() };
    }
  }
  // « NOM. » seul sur la ligne (réplique aux lignes suivantes).
  const d2 = line.match(/^\s*([\p{Lu}][\p{Lu}\s'’.\d-]*?)\.\s*$/u);
  if (d2) {
    const name = d2[1].trim();
    if (name.length >= 2 && isAllCaps(name) && name.split(/\s+/).length <= 6) {
      return { name, rest: '' };
    }
  }
  return null;
}

// Parse un texte théâtral en liste d'items + personnages détectés.
export function parseScript(raw: string): RepScript {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const items: RepItem[] = [];
  let id = 0;
  let current: RepItem | null = null; // réplique en cours (pour multi-lignes)

  const push = (it: Omit<RepItem, 'id'>): RepItem => {
    const full = { ...it, id: id++ };
    items.push(full);
    return full;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { current = null; continue; } // ligne vide = fin de continuation

    // Didascalie : ligne entièrement entre parenthèses.
    if (/^\(.*\)$/.test(line)) {
      push({ kind: 'didascalie', text: line });
      current = null;
      continue;
    }

    const cue = matchCue(line);
    if (cue) {
      const key = normKey(cue.name);
      current = push({ kind: 'line', speaker: key, text: cue.rest });
      continue;
    }

    // Suite d'une réplique en cours, sinon didascalie/narration hors dialogue.
    if (current && current.kind === 'line') {
      current.text = current.text ? `${current.text} ${line}` : line;
    } else {
      push({ kind: 'didascalie', text: line });
    }
  }

  // Nettoie les répliques vides restées sans texte.
  const clean = items.filter((it) => it.kind === 'didascalie' || it.text.trim().length > 0);
  return { items: reindex(clean), characters: buildChars(clean) };
}

function reindex(items: RepItem[]): RepItem[] {
  return items.map((it, i) => ({ ...it, id: i }));
}

function buildChars(items: RepItem[]): RepChar[] {
  const map = new Map<string, RepChar>();
  for (const it of items) {
    if (it.kind !== 'line' || !it.speaker) continue;
    const ex = map.get(it.speaker);
    if (ex) ex.count++;
    else map.set(it.speaker, { key: it.speaker, label: titleCase(it.speaker), count: 1 });
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'fr'));
}

// « LE COMTE » → « Le Comte » (libellé lisible ; la clé reste en majuscules).
export function titleCase(s: string): string {
  return s.toLowerCase().replace(/(^|[\s'’-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());
}

// Renomme le libellé d'un personnage (la clé, identité stable, ne change pas).
export function renameCharacter(script: RepScript, key: string, label: string): RepScript {
  return {
    items: script.items,
    characters: script.characters.map((c) => (c.key === key ? { ...c, label } : c)),
  };
}

// Fusionne un personnage dans un autre (réaffecte ses répliques).
export function mergeCharacters(script: RepScript, fromKey: string, intoKey: string): RepScript {
  if (fromKey === intoKey) return script;
  const items = script.items.map((it) =>
    it.kind === 'line' && it.speaker === fromKey ? { ...it, speaker: intoKey } : it,
  );
  return { items, characters: buildChars(items) };
}

// Texte destiné à la synthèse : retire les didascalies inline entre parenthèses.
export function speakableText(text: string): string {
  return text.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
}

// Durée estimée d'une réplique (~150 mots/min), en ms, bornée.
export function estimateMs(text: string, rate = 1): number {
  const words = speakableText(text).split(/\s+/).filter(Boolean).length;
  const ms = (words / 150) * 60000 / Math.max(0.5, rate);
  return Math.min(30000, Math.max(1400, Math.round(ms)));
}

// Convertit les blocs du lecteur intégral (pieceTextes : perso/ligne/didascalie/
// acte/scene) en script de répétition. Sans dépendance sur pieceTextes (type
// minimal) pour éviter tout couplage.
export function scriptFromBlocs(blocs: { k: string; t: string }[]): RepScript {
  const items: RepItem[] = [];
  let id = 0;
  let current: RepItem | null = null;
  for (const b of blocs) {
    const t = (b.t ?? '').trim();
    if (!t) continue;
    if (b.k === 'perso') {
      current = { id: id++, kind: 'line', speaker: normKey(t), text: '' };
      items.push(current);
    } else if (b.k === 'ligne') {
      if (current && current.kind === 'line') current.text = current.text ? `${current.text} ${t}` : t;
      else { current = { id: id++, kind: 'line', text: t }; items.push(current); }
    } else {
      // didascalie / acte / scene → didascalie affichable
      items.push({ id: id++, kind: 'didascalie', text: t });
      current = null;
    }
  }
  const clean = items.filter((it) => it.kind === 'didascalie' || it.text.trim().length > 0);
  return { items: reindex(clean), characters: buildChars(clean) };
}

// Titre proposé à partir du texte (1re ligne non vide, tronquée).
export function guessTitle(raw: string): string {
  const first = raw.split('\n').map((l) => l.trim()).find(Boolean) ?? 'Ma pièce';
  return first.length > 60 ? `${first.slice(0, 57)}…` : first;
}
