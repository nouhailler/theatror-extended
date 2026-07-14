import { describe, it, expect } from 'vitest';
import {
  parseScript,
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
