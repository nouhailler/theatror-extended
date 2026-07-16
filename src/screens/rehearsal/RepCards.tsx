import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackHeader } from '../../components/ui';
import { useRehearsalStore } from '../../lib/rehearsalStore';
import type { CardMemo } from '../../data/rehearsal';
import { buildCards, clozeTokens, maskedWords, type Card } from '../../lib/rehearsalCards';

type Mode = 'ping' | 'cloze' | 'indice';
const MODES: { k: Mode; label: string }[] = [
  { k: 'ping', label: 'Ping-Pong' },
  { k: 'cloze', label: 'Trous' },
  { k: 'indice', label: 'Indice' },
];
const DIFF: { r: number; label: string }[] = [
  { r: 0.3, label: 'Facile' },
  { r: 0.45, label: 'Moyen' },
  { r: 0.6, label: 'Difficile' },
];
const EMPTY: CardMemo = { box: 0, seen: 0, ok: 0 };

function Seg<T>({ value, options, onChange }: { value: T; options: { label: string; v: T }[]; onChange: (v: T) => void }) {
  return (
    <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
      {options.map((o, i) => {
        const active = o.v === value;
        return (
          <button key={i} onClick={() => onChange(o.v)}
            style={{ flex: 1, textAlign: 'center', padding: '7px 4px', borderRadius: 999, fontSize: 13, cursor: 'pointer', border: 'none', fontWeight: 600, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function RepCards() {
  const { id } = useParams();
  const load = useRehearsalStore((s) => s.load);
  const loaded = useRehearsalStore((s) => s.loaded);
  const plays = useRehearsalStore((s) => s.plays);
  const update = useRehearsalStore((s) => s.update);
  useEffect(() => { void load(); }, [load]);

  const play = id ? plays.find((p) => p.id === id) : undefined;

  const [role, setRole] = useState('');
  const [mode, setMode] = useState<Mode>('ping');
  const [ratio, setRatio] = useState(0.45);
  const [queue, setQueue] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => { if (play && !role) setRole(play.config?.myRole || play.script.characters[0]?.key || ''); }, [play, role]);

  const labelOf = useMemo(() => {
    const m = new Map((play?.script.characters ?? []).map((c) => [c.key, c.label]));
    return (k: string) => m.get(k) ?? k;
  }, [play]);
  const cards: Card[] = useMemo(() => (play && role ? buildCards(play.script, role, labelOf) : []), [play, role, labelOf]);
  const memoOf = (cid: number): CardMemo => play?.memo?.[role]?.[cid] ?? EMPTY;

  // (Re)construit la file quand le rôle/les cartes changent : les répliques
  // les moins sues d'abord.
  useEffect(() => {
    const q = [...cards].sort((a, b) => memoOf(a.id).box - memoOf(b.id).box).map((c) => c.id);
    setQueue(q); setPos(0); setRevealed(false); setShowFull(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, role]);

  const current = cards.find((c) => c.id === queue[pos]);
  const done = queue.length > 0 && pos >= queue.length;
  const sued = cards.filter((c) => memoOf(c.id).box === 2).length;

  const tokens = useMemo(
    () => (current && mode === 'cloze' ? clozeTokens(current.line, ratio, memoOf(current.id).miss ?? []) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current?.id, mode, ratio, play],
  );

  const rate = (level: number) => {
    if (!current || !play) return;
    const prev = memoOf(current.id);
    const miss = mode === 'cloze' && level < 2
      ? Array.from(new Set([...(prev.miss ?? []), ...maskedWords(tokens)])).slice(0, 16)
      : prev.miss;
    const nc: CardMemo = { box: level, seen: prev.seen + 1, ok: prev.ok + (level === 2 ? 1 : 0), miss };
    update(play.id, { memo: { ...(play.memo ?? {}), [role]: { ...(play.memo?.[role] ?? {}), [current.id]: nc } } });
    setRevealed(false); setShowFull(false);
    if (level === 0) setQueue((q) => [...q, current.id]); // « à revoir » → revient plus tard
    setPos((p) => p + 1);
  };

  const restart = () => {
    const q = [...cards].sort((a, b) => memoOf(a.id).box - memoOf(b.id).box).map((c) => c.id);
    setQueue(q); setPos(0); setRevealed(false); setShowFull(false);
  };

  if (loaded && !play) {
    return <div style={{ padding: 18 }}><BackHeader to="/repetition" title="Mémorisation" /><p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Pièce introuvable.</p></div>;
  }
  if (!play) return <div style={{ padding: 18, color: 'var(--text-muted)' }}>Chargement…</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '18px 18px 28px' }} data-screen-label="Répétition — cartes">
      <BackHeader to={`/repetition/${play.id}/config`} title="Mémoriser mon rôle" sub={play.titre} />

      {/* Rôle */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {play.script.characters.map((c) => (
          <button key={c.key} className={`chip${role === c.key ? ' active' : ''}`} onClick={() => setRole(c.key)}>{c.label}</button>
        ))}
      </div>

      <Seg value={mode} options={MODES.map((m) => ({ label: m.label, v: m.k }))} onChange={setMode} />
      {mode === 'cloze' && <Seg value={ratio} options={DIFF.map((d) => ({ label: d.label, v: d.r }))} onChange={setRatio} />}

      {cards.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>{sued}/{cards.length} sues</span>
          {!done && queue.length > 0 && <span>carte {Math.min(pos + 1, queue.length)}/{queue.length}</span>}
        </div>
      )}

      {cards.length === 0 && (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14 }}>
          Ce rôle n'a pas de réplique à mémoriser. Choisissez un autre rôle.
        </div>
      )}

      {done && cards.length > 0 && (
        <div className="card card-16" style={{ padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 20, fontWeight: 700 }}>Session terminée</div>
          <div style={{ fontSize: 14.5, color: 'var(--text-2)' }}>{sued} réplique{sued > 1 ? 's' : ''} sur {cards.length} maîtrisée{sued > 1 ? 's' : ''}.</div>
          <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15 }} onClick={restart}>↻ Recommencer</button>
        </div>
      )}

      {current && !done && (
        <>
          {/* Recto */}
          <div className="card card-16" style={{ padding: 18, minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
            {mode === 'ping' && (
              <>
                {current.partner && <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>{current.partner}</div>}
                <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.5, color: 'var(--text-2b)' }}>« … {current.pingCue} »</div>
              </>
            )}
            {mode === 'indice' && (
              <>
                <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Mise en scène</div>
                <div style={{ fontSize: 16.5, lineHeight: 1.5, color: 'var(--text-2b)' }}>{current.contextCue}</div>
              </>
            )}
            {mode === 'cloze' && (
              <div style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2b)' }}>
                {tokens.map((t, i) => t.masked
                  ? <span key={i} style={{ color: revealed ? 'var(--gold)' : 'transparent', borderBottom: '1.5px solid var(--gold)', fontWeight: revealed ? 600 : 400 }}>{revealed ? t.text : ' '.repeat(Math.max(3, t.text.length))}</span>
                  : <span key={i}>{t.text}</span>)}
              </div>
            )}

            {/* Verso (ping / indice) */}
            {revealed && mode === 'ping' && (
              <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid var(--b-chip)', fontFamily: 'var(--font-title)', fontSize: 18, lineHeight: 1.55 }}>{current.line}</div>
            )}
            {revealed && mode === 'indice' && (
              <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid var(--b-chip)' }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, lineHeight: 1.55 }}>{showFull ? current.line : `${current.amorce}${current.amorce.endsWith('…') ? '' : ' …'}`}</div>
                {!showFull && current.line !== current.amorce && (
                  <button onClick={() => setShowFull(true)} style={{ marginTop: 8, background: 'none', border: 'none', padding: 0, color: 'var(--gold-chip-text)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Voir toute la réplique →</button>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {!revealed ? (
            <button className="gold-btn" style={{ padding: '13px 18px', fontSize: 16 }} onClick={() => setRevealed(true)}>Révéler</button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => rate(0)} style={rateBtn('var(--red-chip-border)', 'var(--red-chip-text)')}>À revoir</button>
              <button onClick={() => rate(1)} style={rateBtn('var(--b-input)', 'var(--text)')}>Presque</button>
              <button onClick={() => rate(2)} style={rateBtn('rgba(126,194,126,.5)', '#7ec27e')}>Su</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function rateBtn(border: string, color: string): React.CSSProperties {
  return { flex: 1, padding: '11px 8px', fontSize: 14.5, borderRadius: 12, border: `1px solid ${border}`, background: 'var(--bg-field)', color, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 };
}
