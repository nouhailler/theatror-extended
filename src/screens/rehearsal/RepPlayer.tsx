import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRehearsalStore } from '../../lib/rehearsalStore';
import { useRehearsalEngine } from '../../lib/rehearsalEngine';
import { useRecorder } from '../../lib/useRecorder';
import { DEFAULT_CONFIG } from '../../data/rehearsal';

export default function RepPlayer() {
  const { id } = useParams();
  const nav = useNavigate();
  const { loaded, load, get, setPosition } = useRehearsalStore();

  useEffect(() => { void load(); }, [load]);

  const play = id ? get(id) : undefined;

  // Redirige vers la config si elle manque (une fois le store chargé).
  useEffect(() => {
    if (loaded && play && !play.config) nav(`/repetition/${play.id}/config`, { replace: true });
  }, [loaded, play, nav]);

  if (loaded && !play) {
    return <div style={{ padding: 18, color: 'var(--text-muted)' }}>Pièce introuvable. <button onClick={() => nav('/repetition')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>Retour</button></div>;
  }
  if (!play || !play.config) {
    return <div style={{ padding: 18, color: 'var(--text-muted)' }}>Chargement…</div>;
  }
  return <Player key={play.id} playId={play.id} onPosition={(i) => setPosition(play.id, i)} />;
}

// Sous-composant monté uniquement quand la pièce + config sont prêtes,
// pour que le hook moteur reçoive des données stables.
function Player({ playId, onPosition }: { playId: string; onPosition: (i: number) => void }) {
  const nav = useNavigate();
  const play = useRehearsalStore((s) => s.get(playId))!;
  const config = play.config ?? { myRole: '', ...DEFAULT_CONFIG };
  const items = play.script.items;
  const scrollRef = useRef<HTMLDivElement>(null);

  const { machine, controls, speechSupported } = useRehearsalEngine(items, config, {
    startIndex: play.position,
    onIndexChange: onPosition,
  });

  // Enregistrement vocal de ses propres répliques (pour se réécouter).
  const rec = useRecorder();
  const [clips, setClips] = useState<Record<number, string>>({});
  const recIndexRef = useRef<number | null>(null);
  const recordingRef = useRef(rec.recording);
  recordingRef.current = rec.recording;
  const clipsRef = useRef(clips);
  clipsRef.current = clips;

  const stopRec = useCallback(async () => {
    const idx = recIndexRef.current;
    const url = await rec.stop();
    if (url && idx != null) {
      setClips((c) => { if (c[idx]) URL.revokeObjectURL(c[idx]); return { ...c, [idx]: url }; });
    }
  }, [rec]);

  const toggleRec = () => {
    if (rec.recording) void stopRec();
    else { recIndexRef.current = machine.index; void rec.start(); }
  };
  const playClip = (url: string) => { const a = new Audio(url); void a.play(); };

  // Coupe l'enregistrement en cours si on change de réplique ; libère à la sortie.
  useEffect(() => { if (recordingRef.current) void stopRec(); }, [machine.index, stopRec]);
  useEffect(() => () => { Object.values(clipsRef.current).forEach(URL.revokeObjectURL); }, []);

  const label = (k?: string) => play.script.characters.find((c) => c.key === k)?.label ?? k ?? '';

  // Auto-centre la réplique en cours.
  useEffect(() => {
    if (machine.status === 'idle') return;
    document.getElementById(`rep-${machine.index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [machine.index, machine.status]);

  const isMine = (i: number) => { const it = items[i]; return it?.kind === 'line' && it.speaker === config.myRole; };
  const waiting = machine.status === 'waitingForActor';
  const masked = waiting && config.myLineMode === 'hidden' && !machine.revealed;

  const onLineTap = (i: number) => {
    if (waiting) controls.actorDone(); // « appuyez n'importe où pour continuer »
    else controls.seek(i);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }} data-screen-label="Répétition — lecture">
      {/* En-tête */}
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--b-rest)' }}>
        <button onClick={() => { controls.stop(); nav('/repetition'); }} aria-label="Quitter"
          style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 20, cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 15.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{play.titre}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Mon rôle : {label(config.myRole)}</div>
        </div>
      </div>

      {/* Texte défilant */}
      <div ref={scrollRef} style={{ flex: 1, minWidth: 0, overflow: 'auto', padding: '14px 16px 8px' }}>
        {items.map((it, i) => {
          const current = i === machine.index && machine.status !== 'idle' && machine.status !== 'finished';
          const mine = isMine(i);
          if (it.kind === 'didascalie') {
            return (
              <div key={it.id} id={`rep-${i}`} onClick={() => onLineTap(i)}
                style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 13.5, textAlign: 'center', padding: '8px 6px', margin: '4px 0', borderRadius: 8, cursor: 'pointer', background: current ? 'rgba(212,169,78,.12)' : 'transparent', opacity: config.didascalieMode === 'ignore' ? 0.5 : 1 }}>
                {it.text}
              </div>
            );
          }
          return (
            <div key={it.id} id={`rep-${i}`} onClick={() => onLineTap(i)}
              style={{ padding: '9px 12px', margin: '6px 0', borderRadius: 10, cursor: 'pointer',
                background: current ? 'rgba(212,169,78,.16)' : mine ? 'rgba(212,169,78,.05)' : 'transparent',
                border: current ? '1px solid rgba(212,169,78,.5)' : '1px solid transparent' }}>
              <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: mine ? 'var(--gold)' : 'var(--text-muted)', marginBottom: 3 }}>
                {label(it.speaker)}{mine ? ' · vous' : ''}
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--text)',
                filter: current && masked ? 'blur(7px)' : undefined, userSelect: current && masked ? 'none' : undefined, transition: 'filter .15s' }}>
                {it.text}
              </div>
            </div>
          );
        })}
        <div style={{ height: 12 }} />
      </div>

      {/* Barre d'action (pinned) */}
      <div style={{ flex: 'none', position: 'sticky', bottom: 0, background: 'var(--bg-bar)', borderTop: '1px solid var(--b-rest)', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {machine.status === 'idle' && (
          <button className="gold-btn" style={{ padding: '13px', fontSize: 16 }} onClick={controls.start}>
            ▶ Démarrer la lecture
          </button>
        )}

        {machine.status === 'finished' && (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, fontSize: 14, color: 'var(--gold-chip-text)', alignSelf: 'center' }}>Scène terminée 🎭</div>
            <button className="gold-btn" style={{ padding: '10px 16px', fontSize: 14 }} onClick={controls.restart}>Recommencer</button>
          </div>
        )}

        {waiting && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {masked && (
                <button onClick={controls.reveal}
                  style={{ flex: 'none', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '12px 14px', color: 'var(--gold-chip-text)', fontSize: 14, cursor: 'pointer' }}>
                  Révéler
                </button>
              )}
              <button className="gold-btn" style={{ flex: 1, padding: '13px', fontSize: 15.5 }} onClick={controls.actorDone}>
                {config.myLineMode === 'timed' ? 'Passer →' : 'J\'ai dit ma réplique →'}
              </button>
            </div>
            {rec.supported && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={toggleRec}
                  style={{ flex: 1, background: rec.recording ? '#9e2b3a' : 'var(--bg-field)', border: `1px solid ${rec.recording ? '#9e2b3a' : 'var(--b-input)'}`, borderRadius: 10, padding: '10px', color: rec.recording ? '#fff' : 'var(--gold-chip-text)', fontSize: 13.5, cursor: 'pointer' }}>
                  {rec.recording ? '⏹ Arrêter l\'enregistrement' : '● M\'enregistrer'}
                </button>
                {clips[machine.index] && !rec.recording && (
                  <button onClick={() => playClip(clips[machine.index])}
                    style={{ flex: 'none', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 14px', color: 'var(--gold-chip-text)', fontSize: 13.5, cursor: 'pointer' }}>
                    ▶ Réécouter
                  </button>
                )}
              </div>
            )}
            {rec.error === 'denied' && (
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Micro indisponible — autorisez l'accès au micro pour vous enregistrer.
              </div>
            )}
          </div>
        )}

        {/* Transport */}
        {machine.status !== 'idle' && machine.status !== 'finished' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <button onClick={controls.prev} aria-label="Réplique précédente" style={ctrlBtn}>⏮</button>
            {machine.status === 'paused'
              ? <button onClick={controls.resume} aria-label="Reprendre" style={ctrlBtnMain}>▶</button>
              : <button onClick={controls.pause} aria-label="Pause" style={ctrlBtnMain}>⏸</button>}
            <button onClick={controls.next} aria-label="Réplique suivante" style={ctrlBtn}>⏭</button>
            <button onClick={controls.restart} aria-label="Recommencer" style={ctrlBtn}>↺</button>
          </div>
        )}

        {!speechSupported && (
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
            Synthèse vocale indisponible sur ce navigateur : les répliques défilent au rythme estimé.
          </div>
        )}
      </div>
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  flex: 1, background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 0', color: 'var(--text)', fontSize: 18, cursor: 'pointer',
};
const ctrlBtnMain: React.CSSProperties = {
  flex: 1.4, background: 'var(--gold)', border: 'none', borderRadius: 10, padding: '10px 0', color: 'var(--on-gold)', fontSize: 18, cursor: 'pointer', fontWeight: 700,
};
