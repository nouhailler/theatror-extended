import { describe, it, expect } from 'vitest';
import { rehearsalReducer, type Machine, type Ctx } from './rehearsalEngine';
import { DEFAULT_CONFIG, type RepItem, type RepConfig } from '../data/rehearsal';

// Script : autre(0) · moi(1) · didascalie(2) · autre(3)
const items: RepItem[] = [
  { id: 0, kind: 'line', speaker: 'CLEANTE', text: 'Bonjour.' },
  { id: 1, kind: 'line', speaker: 'ARGAN', text: 'Ah, te voilà.' },
  { id: 2, kind: 'didascalie', text: '(il se lève)' },
  { id: 3, kind: 'line', speaker: 'CLEANTE', text: 'Comment allez-vous ?' },
];

function ctx(over: Partial<RepConfig> = {}): Ctx {
  return { items, config: { myRole: 'ARGAN', ...DEFAULT_CONFIG, ...over } };
}
const idle: Machine = { status: 'idle', index: 0, revealed: false };

describe('rehearsalReducer', () => {
  it('START entre sur une réplique d’un autre → speaking', () => {
    const m = rehearsalReducer(idle, { type: 'START' }, ctx());
    expect(m.status).toBe('speaking');
    expect(m.index).toBe(0);
  });

  it('SPEECH_END sur ma réplique → waitingForActor', () => {
    let m = rehearsalReducer(idle, { type: 'START' }, ctx());
    m = rehearsalReducer(m, { type: 'SPEECH_END' }, ctx());
    expect(m.status).toBe('waitingForActor');
    expect(m.index).toBe(1);
  });

  it('ACTOR_DONE avance et lit la didascalie (mode show) → speaking', () => {
    let m: Machine = { status: 'waitingForActor', index: 1, revealed: false };
    m = rehearsalReducer(m, { type: 'ACTOR_DONE' }, ctx({ didascalieMode: 'show' }));
    expect(m.status).toBe('speaking');
    expect(m.index).toBe(2);
  });

  it('didascalie ignorée (mode ignore) est sautée', () => {
    let m: Machine = { status: 'waitingForActor', index: 1, revealed: false };
    m = rehearsalReducer(m, { type: 'ACTOR_DONE' }, ctx({ didascalieMode: 'ignore' }));
    expect(m.index).toBe(3); // saute l'item 2
    expect(m.status).toBe('speaking');
  });

  it('PAUSE puis RESUME reprend la même réplique', () => {
    let m: Machine = { status: 'speaking', index: 3, revealed: false };
    m = rehearsalReducer(m, { type: 'PAUSE' }, ctx());
    expect(m.status).toBe('paused');
    m = rehearsalReducer(m, { type: 'RESUME' }, ctx());
    expect(m.status).toBe('speaking');
    expect(m.index).toBe(3);
  });

  it('atteint finished en fin de scène', () => {
    let m: Machine = { status: 'speaking', index: 3, revealed: false };
    m = rehearsalReducer(m, { type: 'SPEECH_END' }, ctx());
    expect(m.status).toBe('finished');
    expect(m.index).toBe(items.length);
  });

  it('SEEK saute à un index et ré-évalue le rôle', () => {
    const m = rehearsalReducer(idle, { type: 'SEEK', index: 1 }, ctx());
    expect(m.status).toBe('waitingForActor'); // item 1 = ma réplique
    expect(m.index).toBe(1);
  });

  it('REVEAL ne change pas l’index et ne marche qu’en attente d’acteur', () => {
    const waiting: Machine = { status: 'waitingForActor', index: 1, revealed: false };
    expect(rehearsalReducer(waiting, { type: 'REVEAL' }, ctx()).revealed).toBe(true);
    const speaking: Machine = { status: 'speaking', index: 0, revealed: false };
    expect(rehearsalReducer(speaking, { type: 'REVEAL' }, ctx()).revealed).toBe(false);
  });

  it('PREV recule, borné à 0', () => {
    const m = rehearsalReducer({ status: 'speaking', index: 0, revealed: false }, { type: 'PREV' }, ctx());
    expect(m.index).toBe(0);
  });

  it('STOP revient à idle', () => {
    const m = rehearsalReducer({ status: 'speaking', index: 2, revealed: false }, { type: 'STOP' }, ctx());
    expect(m.status).toBe('idle');
  });

  it('SPEECH_END ignoré hors de speaking (garde d’état)', () => {
    const waiting: Machine = { status: 'waitingForActor', index: 1, revealed: false };
    const m = rehearsalReducer(waiting, { type: 'SPEECH_END' }, ctx());
    expect(m).toEqual(waiting);
  });
});
