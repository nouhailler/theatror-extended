import { describe, it, expect } from 'vitest';
import {
  parseScript,
  scriptFromBlocs,
  mergeCharacters,
  renameCharacter,
  speakableText,
  estimateMs,
  normKey,
} from './rehearsal';

const SAMPLE = `ACTE PREMIER

ARGAN : Il y a longtemps que je n'ai vu ma fille.
(seul, comptant des jetons)

TOINETTE. Vous m'avez appelée ?
Me voici, monsieur.

LE MALADE — Approche.

Toinette range la chambre.

ARGAN : Toinette !`;

describe('parseScript', () => {
  const s = parseScript(SAMPLE);

  it('détecte les personnages avec les 3 séparateurs (: . —)', () => {
    const keys = s.characters.map((c) => c.key).sort();
    expect(keys).toContain('ARGAN');
    expect(keys).toContain('TOINETTE');
    expect(keys).toContain('LE MALADE');
  });

  it('compte les répliques par personnage', () => {
    const argan = s.characters.find((c) => c.key === 'ARGAN');
    expect(argan?.count).toBe(2);
  });

  it('rattache les lignes suivantes à la réplique en cours (multi-lignes)', () => {
    const toinette = s.items.find((i) => i.speaker === 'TOINETTE');
    expect(toinette?.text).toBe('Vous m\'avez appelée ? Me voici, monsieur.');
  });

  it('classe les parenthèses pleines en didascalie', () => {
    const did = s.items.find((i) => i.kind === 'didascalie' && i.text.startsWith('(seul'));
    expect(did).toBeTruthy();
  });

  it('ne prend pas une phrase minuscule pour une amorce', () => {
    const t = parseScript('Il fait beau. Le vent souffle.');
    expect(t.characters.length).toBe(0);
  });

  it('libellé lisible mais clé en majuscules', () => {
    const malade = s.characters.find((c) => c.key === 'LE MALADE');
    expect(malade?.label).toBe('Le Malade');
  });
});

describe('normKey', () => {
  it('normalise ponctuation et casse', () => {
    expect(normKey('Le Comte. ')).toBe('LE COMTE');
    expect(normKey('TOINETTE :')).toBe('TOINETTE');
  });
});

describe('mergeCharacters / renameCharacter', () => {
  it('fusionne deux personnages et recompte', () => {
    const s = parseScript('DON JUAN : Bonjour.\nDOM JUAN : Adieu.');
    expect(s.characters.length).toBe(2);
    const merged = mergeCharacters(s, 'DOM JUAN', 'DON JUAN');
    expect(merged.characters.length).toBe(1);
    expect(merged.characters[0].count).toBe(2);
    expect(merged.items.every((i) => i.speaker !== 'DOM JUAN')).toBe(true);
  });

  it('renomme le libellé sans changer la clé', () => {
    const s = parseScript('ARGAN : Bonjour.');
    const r = renameCharacter(s, 'ARGAN', 'Le malade imaginaire');
    expect(r.characters[0].key).toBe('ARGAN');
    expect(r.characters[0].label).toBe('Le malade imaginaire');
  });
});

describe('scriptFromBlocs (import catalogue)', () => {
  const blocs = [
    { k: 'acte', t: 'ACTE I' },
    { k: 'scene', t: 'Scène première' },
    { k: 'didascalie', t: 'Chimène, Elvire' },
    { k: 'perso', t: 'Chimène' },
    { k: 'ligne', t: 'Elvire, m’as-tu fait un rapport bien sincère ?' },
    { k: 'ligne', t: 'Ne déguises-tu rien ?' },
    { k: 'perso', t: 'Elvire' },
    { k: 'ligne', t: 'Tous mes sens sont charmés.' },
  ];
  const s = scriptFromBlocs(blocs);

  it('convertit perso+ligne en répliques et regroupe les vers', () => {
    const chimene = s.items.find((i) => i.speaker === 'CHIMÈNE');
    expect(chimene?.text).toBe('Elvire, m’as-tu fait un rapport bien sincère ? Ne déguises-tu rien ?');
  });

  it('détecte les personnages avec libellé lisible', () => {
    expect(s.characters.map((c) => c.key).sort()).toEqual(['CHIMÈNE', 'ELVIRE']);
    expect(s.characters.find((c) => c.key === 'CHIMÈNE')?.label).toBe('Chimène');
  });

  it('conserve acte/scène/didascalie comme didascalies', () => {
    expect(s.items.filter((i) => i.kind === 'didascalie').length).toBe(3);
  });

  it('conserve le personnage malgré une didascalie intercalée (« ALCESTE, assis. »)', () => {
    const s2 = scriptFromBlocs([
      { k: 'perso', t: 'Alceste' },
      { k: 'didascalie', t: ', assis.' },
      { k: 'ligne', t: 'Laissez-moi, je vous prie.' },
    ]);
    const line = s2.items.find((i) => i.kind === 'line');
    expect(line?.speaker).toBe('ALCESTE');
    expect(line?.text).toBe('Laissez-moi, je vous prie.');
    // l'ordre reste juste : la didascalie précède la réplique
    expect(s2.items[0].kind).toBe('didascalie');
    expect(s2.items[1].kind).toBe('line');
  });

  it('découpe une réplique coupée par une didascalie en deux répliques attribuées', () => {
    const s3 = scriptFromBlocs([
      { k: 'perso', t: 'Alceste' },
      { k: 'ligne', t: 'Bonjour.' },
      { k: 'didascalie', t: '(Il se lève.)' },
      { k: 'ligne', t: 'Adieu.' },
    ]);
    const lines = s3.items.filter((i) => i.kind === 'line');
    expect(lines.map((l) => l.speaker)).toEqual(['ALCESTE', 'ALCESTE']);
    expect(lines.map((l) => l.text)).toEqual(['Bonjour.', 'Adieu.']);
  });
});

describe('speakableText & estimateMs', () => {
  it('retire les didascalies inline entre parenthèses', () => {
    expect(speakableText('Bonjour (à part) monsieur')).toBe('Bonjour monsieur');
  });

  it('estime une durée bornée et croissante avec la longueur', () => {
    const court = estimateMs('Oui.');
    const long = estimateMs(Array(60).fill('mot').join(' '));
    expect(court).toBeGreaterThanOrEqual(1400);
    expect(long).toBeGreaterThan(court);
    expect(long).toBeLessThanOrEqual(30000);
  });
});
