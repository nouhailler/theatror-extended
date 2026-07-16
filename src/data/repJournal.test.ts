import { describe, it, expect } from 'vitest';
import { actsScenes, emptyEntry, isEmptyEntry } from './repJournal';
import type { TexteBloc } from './pieceTextes';

describe('actsScenes', () => {
  it('regroupe les scènes sous leur acte', () => {
    const blocs: TexteBloc[] = [
      { k: 'acte', t: 'ACTE I' },
      { k: 'scene', t: 'Scène première' },
      { k: 'perso', t: 'ALCESTE' }, { k: 'ligne', t: '…' },
      { k: 'scene', t: 'Scène 2' },
      { k: 'acte', t: 'ACTE II' },
      { k: 'scene', t: 'Scène 1' },
    ];
    const r = actsScenes(blocs);
    expect(r.map((a) => a.acte)).toEqual(['ACTE I', 'ACTE II']);
    expect(r[0].scenes).toEqual(['Scène première', 'Scène 2']);
    expect(r[1].scenes).toEqual(['Scène 1']);
  });

  it('crée un « Acte unique » si des scènes précèdent tout acte', () => {
    const r = actsScenes([{ k: 'scene', t: 'Scène 1' }, { k: 'scene', t: 'Scène 2' }]);
    expect(r).toHaveLength(1);
    expect(r[0].acte).toBe('Acte unique');
    expect(r[0].scenes).toEqual(['Scène 1', 'Scène 2']);
  });

  it('ignore les doublons de libellé de scène', () => {
    const r = actsScenes([{ k: 'acte', t: 'ACTE I' }, { k: 'scene', t: 'Scène 1' }, { k: 'scene', t: 'Scène 1' }]);
    expect(r[0].scenes).toEqual(['Scène 1']);
  });
});

describe('isEmptyEntry', () => {
  const base = () => emptyEntry('le-misanthrope', 'Le Misanthrope', '2026-07-16');

  it('est vide juste après création', () => {
    expect(isEmptyEntry(base())).toBe(true);
  });

  it('n’est pas vide dès qu’un champ est rempli', () => {
    expect(isEmptyEntry({ ...base(), energie: 5 })).toBe(false);
    expect(isEmptyEntry({ ...base(), presMES: true })).toBe(false);
    expect(isEmptyEntry({ ...base(), scenes: ['Scène 1'] })).toBe(false);
    expect(isEmptyEntry({ ...base(), reculDevoirs: 'Revoir la scène 3' })).toBe(false);
    expect(isEmptyEntry({ ...base(), audio: 'data:audio/webm;base64,AA' })).toBe(false);
  });

  it('reste vide si seuls des espaces sont saisis', () => {
    expect(isEmptyEntry({ ...base(), interpRates: '   ' })).toBe(true);
  });
});
