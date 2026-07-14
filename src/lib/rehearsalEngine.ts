// Moteur du mode répétition : machine à états PURE (rehearsalReducer, testable
// sans UI ni Web Speech) + hook useRehearsalEngine qui isole les effets de bord
// (synthèse, timers, Wake Lock, scroll).
import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { RepItem, RepConfig } from '../data/rehearsal';
import { speakableText, estimateMs } from '../data/rehearsal';
import { speechSupported, loadVoices, pickVoice, splitSentences } from './speech';

export type EngineStatus = 'idle' | 'speaking' | 'waitingForActor' | 'paused' | 'finished';

export interface Machine {
  status: EngineStatus;
  index: number;
  revealed: boolean; // mode masqué : la réplique est-elle révélée ?
}

export type RepEvent =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SPEECH_END' }
  | { type: 'ACTOR_DONE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SEEK'; index: number }
  | { type: 'REVEAL' }
  | { type: 'RESTART' }
  | { type: 'STOP' };

export interface Ctx {
  items: RepItem[];
  config: RepConfig;
}

// Entre sur l'item `i` : saute les didascalies ignorées, choisit l'état.
function enter(i: number, ctx: Ctx): Machine {
  const { items, config } = ctx;
  let idx = Math.max(0, i);
  while (idx < items.length && items[idx].kind === 'didascalie' && config.didascalieMode === 'ignore') {
    idx++;
  }
  if (idx >= items.length) return { status: 'finished', index: items.length, revealed: false };
  const it = items[idx];
  const mine = it.kind === 'line' && it.speaker === config.myRole;
  return { status: mine ? 'waitingForActor' : 'speaking', index: idx, revealed: false };
}

// Reducer PUR : (machine, événement, contexte) → machine.
export function rehearsalReducer(m: Machine, ev: RepEvent, ctx: Ctx): Machine {
  switch (ev.type) {
    case 'START':
      return enter(m.status === 'finished' ? 0 : m.index, ctx);
    case 'RESUME':
      return m.status === 'paused' ? enter(m.index, ctx) : m;
    case 'PAUSE':
      return m.status === 'speaking' || m.status === 'waitingForActor'
        ? { ...m, status: 'paused' }
        : m;
    case 'SPEECH_END':
      return m.status === 'speaking' ? enter(m.index + 1, ctx) : m;
    case 'ACTOR_DONE':
      return m.status === 'waitingForActor' ? enter(m.index + 1, ctx) : m;
    case 'NEXT':
      return enter(m.index + 1, ctx);
    case 'PREV':
      return enter(Math.max(0, m.index - 1), ctx);
    case 'SEEK':
      return enter(ev.index, ctx);
    case 'REVEAL':
      return m.status === 'waitingForActor' ? { ...m, revealed: true } : m;
    case 'RESTART':
      return enter(0, ctx);
    case 'STOP':
      return { status: 'idle', index: m.index, revealed: false };
    default:
      return m;
  }
}

// ─── Hook : reducer + effets de bord ───

interface Options {
  startIndex?: number;
  onIndexChange?: (index: number) => void; // pour scroll/highlight + persistance
}

export function useRehearsalEngine(items: RepItem[], config: RepConfig, opts: Options = {}) {
  // Contexte à jour, lu par le reducer (garde le reducer pur & testable).
  const ctxRef = useRef<Ctx>({ items, config });
  ctxRef.current = { items, config };

  const [machine, dispatch] = useReducer(
    (m: Machine, ev: RepEvent) => rehearsalReducer(m, ev, ctxRef.current),
    { status: 'idle', index: opts.startIndex ?? 0, revealed: false },
  );

  // Jeton de génération : invalide les callbacks onend après cancel().
  const genRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const wakeRef = useRef<any>(null);
  const onIndexChange = opts.onIndexChange;

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const cancelSpeech = useCallback(() => {
    genRef.current++;
    if (speechSupported) window.speechSynthesis.cancel();
  }, []);

  // Charge les voix (voiceschanged géré dans loadVoices).
  useEffect(() => {
    let alive = true;
    void loadVoices().then((v) => { if (alive) voicesRef.current = v; });
    return () => { alive = false; };
  }, []);

  // Wake Lock : empêche la mise en veille pendant une session active.
  const acquireWake = useCallback(async () => {
    try {
      const nav = navigator as any;
      if (nav.wakeLock?.request && !wakeRef.current) {
        wakeRef.current = await nav.wakeLock.request('screen');
      }
    } catch { /* non supporté / refusé — repli silencieux */ }
  }, []);
  const releaseWake = useCallback(() => {
    try { wakeRef.current?.release?.(); } catch { /* ignore */ }
    wakeRef.current = null;
  }, []);

  // Ré-acquiert le Wake Lock au retour de l'onglet (les navigateurs le libèrent).
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'visible' &&
          (machine.status === 'speaking' || machine.status === 'waitingForActor')) {
        void acquireWake();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [machine.status, acquireWake]);

  // Effet principal : réagit à (status, index).
  useEffect(() => {
    onIndexChange?.(machine.index);

    if (machine.status === 'idle' || machine.status === 'finished' || machine.status === 'paused') {
      cancelSpeech();
      clearTimer();
      releaseWake();
      return;
    }

    void acquireWake();
    const it = items[machine.index];
    if (!it) return;

    if (machine.status === 'waitingForActor') {
      // Mes répliques : pause manuelle (attente d'un tap), sauf mode chronométré.
      clearTimer();
      if (config.myLineMode === 'timed') {
        timerRef.current = setTimeout(
          () => dispatch({ type: 'ACTOR_DONE' }),
          estimateMs(it.text, config.rate),
        );
      }
      return;
    }

    // status === 'speaking' : autre personnage ou didascalie lue/affichée.
    if (it.kind === 'didascalie' && config.didascalieMode === 'show') {
      // Affichée sans voix : brève pause de lecture puis enchaînement.
      clearTimer();
      timerRef.current = setTimeout(
        () => dispatch({ type: 'SPEECH_END' }),
        Math.min(6000, estimateMs(it.text, config.rate)),
      );
      return;
    }

    // Synthèse vocale (autre personnage, ou didascalie en mode 'read').
    if (!speechSupported) {
      // Pas de synthèse : on enchaîne au rythme estimé.
      clearTimer();
      timerRef.current = setTimeout(() => dispatch({ type: 'SPEECH_END' }), estimateMs(it.text, config.rate));
      return;
    }

    const gen = ++genRef.current;
    const synth = window.speechSynthesis;
    synth.cancel();
    const voiceURI = it.kind === 'line' && it.speaker ? config.voiceByChar[it.speaker] : undefined;
    const voice = pickVoice(voicesRef.current, voiceURI);
    const sentences = splitSentences(speakableText(it.text) || it.text);
    let s = 0;
    const speakNext = () => {
      if (gen !== genRef.current) return;
      if (s >= sentences.length) { dispatch({ type: 'SPEECH_END' }); return; }
      const u = new SpeechSynthesisUtterance(sentences[s]);
      u.lang = 'fr-FR';
      if (voice) u.voice = voice;
      u.rate = config.rate;
      u.volume = config.volume;
      u.onend = () => { if (gen === genRef.current) { s++; speakNext(); } };
      u.onerror = () => { if (gen === genRef.current) { s++; speakNext(); } };
      synth.speak(u);
    };
    speakNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machine.status, machine.index]);

  // Nettoyage au démontage.
  useEffect(() => () => { cancelSpeech(); clearTimer(); releaseWake(); }, [cancelSpeech, clearTimer, releaseWake]);

  const controls = {
    start: () => dispatch({ type: 'START' }),
    pause: () => { cancelSpeech(); clearTimer(); dispatch({ type: 'PAUSE' }); },
    resume: () => dispatch({ type: 'RESUME' }),
    next: () => { cancelSpeech(); clearTimer(); dispatch({ type: 'NEXT' }); },
    prev: () => { cancelSpeech(); clearTimer(); dispatch({ type: 'PREV' }); },
    seek: (i: number) => { cancelSpeech(); clearTimer(); dispatch({ type: 'SEEK', index: i }); },
    actorDone: () => { clearTimer(); dispatch({ type: 'ACTOR_DONE' }); },
    reveal: () => dispatch({ type: 'REVEAL' }),
    restart: () => { cancelSpeech(); clearTimer(); dispatch({ type: 'RESTART' }); },
    stop: () => { cancelSpeech(); clearTimer(); releaseWake(); dispatch({ type: 'STOP' }); },
  };

  return { machine, controls, speechSupported };
}
