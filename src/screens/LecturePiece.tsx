import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PIECES } from '../data/pieces';
import { loadTexte, type PieceTexte, type TexteBloc } from '../data/pieceTextes';

const SIZES = [15, 16.5, 18.5, 21]; // échelle de lecture
const SIZE_KEY = 'theathror-reader-size';

export default function LecturePiece() {
  const { id } = useParams();
  const nav = useNavigate();
  const p = PIECES.find((x) => x.id === id);

  const [texte, setTexte] = useState<PieceTexte | null>(null);
  const [state, setState] = useState<'load' | 'ok' | 'err'>('load');
  const [sizeIdx, setSizeIdx] = useState<number>(() => {
    const v = Number(localStorage.getItem(SIZE_KEY));
    return Number.isInteger(v) && v >= 0 && v < SIZES.length ? v : 1;
  });

  useEffect(() => {
    let alive = true;
    if (!id) return;
    setState('load');
    loadTexte(id)
      .then((t) => { if (alive) { setTexte(t); setState(t ? 'ok' : 'err'); } })
      .catch(() => { if (alive) setState('err'); });
    return () => { alive = false; };
  }, [id]);

  useEffect(() => { localStorage.setItem(SIZE_KEY, String(sizeIdx)); }, [sizeIdx]);

  // Index des actes pour la navigation rapide.
  const actes = useMemo(
    () => (texte?.blocs ?? []).map((b, i) => ({ b, i })).filter((x) => x.b.k === 'acte'),
    [texte],
  );

  const base = SIZES[sizeIdx];

  const goActe = (i: number) => {
    document.getElementById(`bloc-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!p) {
    return (
      <div style={{ padding: 18 }}>
        <button onClick={() => nav('/pieces')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Pièce introuvable.</p>
      </div>
    );
  }

  return (
    <div data-screen-label={`Texte ${p.titre}`} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Barre de lecture (collante) */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5, background: 'var(--bg-bar)',
        borderBottom: '1px solid var(--b-rest)', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={() => nav(`/pieces/${p.id}`)} aria-label="Retour à la fiche"
          style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: 20, background: 'none', border: 'none', padding: 0, lineHeight: 1 }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.titre}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{p.auteur}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button onClick={() => setSizeIdx((i) => Math.max(0, i - 1))} aria-label="Réduire le texte" disabled={sizeIdx === 0}
            style={sizeBtn(sizeIdx === 0)}>A−</button>
          <button onClick={() => setSizeIdx((i) => Math.min(SIZES.length - 1, i + 1))} aria-label="Agrandir le texte" disabled={sizeIdx === SIZES.length - 1}
            style={sizeBtn(sizeIdx === SIZES.length - 1)}>A+</button>
        </div>
      </div>

      {/* Navigation actes */}
      {actes.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '10px 14px 0' }}>
          {actes.map((a, n) => (
            <button key={a.i} onClick={() => goActe(a.i)} className="chip" style={{ fontSize: 12.5 }}>
              Acte {roman(n + 1)}
            </button>
          ))}
        </div>
      )}

      <div style={{ padding: '8px 20px 40px', maxWidth: 680, margin: '0 auto', width: '100%' }}>
        {state === 'load' && <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 24 }}>Chargement du texte…</p>}
        {state === 'err' && <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 24 }}>Texte indisponible pour cette pièce.</p>}

        {state === 'ok' && texte && texte.blocs.map((b, i) => (
          <Bloc key={i} b={b} i={i} base={base} prev={texte.blocs[i - 1]} />
        ))}

        {state === 'ok' && texte && (
          <div style={{ marginTop: 34, paddingTop: 14, borderTop: '1px solid var(--b-rest)', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {texte.source}
          </div>
        )}
      </div>
    </div>
  );
}

function Bloc({ b, i, base, prev }: { b: TexteBloc; i: number; base: number; prev?: TexteBloc }) {
  switch (b.k) {
    case 'acte':
      return (
        <div id={`bloc-${i}`} style={{
          marginTop: i === 0 ? 12 : 40, marginBottom: 6, paddingTop: i === 0 ? 0 : 22,
          borderTop: i === 0 ? 'none' : '1px solid var(--b-rest)',
          textAlign: 'center', fontFamily: 'var(--font-title)', fontWeight: 700,
          fontSize: base + 5, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)',
        }}>{b.t}</div>
      );
    case 'scene':
      return (
        <div id={`bloc-${i}`} style={{
          marginTop: 30, marginBottom: 4, textAlign: 'center',
          fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: base - 1, color: 'var(--text-muted)',
        }}>{b.t}</div>
      );
    case 'didascalie': {
      const centered = prev?.k === 'scene' || prev?.k === 'acte';
      return (
        <div style={{
          fontStyle: 'italic', color: 'var(--text-muted)', fontSize: base - 2.5,
          lineHeight: 1.5, margin: '5px 0', textAlign: centered ? 'center' : 'left',
        }}>{b.t}</div>
      );
    }
    case 'perso':
      return (
        <div style={{
          marginTop: 15, fontFamily: 'var(--font-title)', fontWeight: 600,
          fontVariant: 'small-caps', letterSpacing: 0.5, color: 'var(--gold-chip-text)', fontSize: base - 1.5,
        }}>{b.t}</div>
      );
    default:
      return (
        <div style={{ fontFamily: 'var(--font-body)', fontSize: base, lineHeight: 1.62, color: 'var(--text-2b)' }}>{b.t}</div>
      );
  }
}

function sizeBtn(disabled: boolean): React.CSSProperties {
  return {
    cursor: disabled ? 'default' : 'pointer', background: 'var(--bg-field)',
    border: '1px solid var(--b-chip)', color: disabled ? 'var(--text-disabled)' : 'var(--gold)',
    borderRadius: 8, padding: '5px 9px', fontSize: 13, fontFamily: 'var(--font-title)',
  };
}

function roman(n: number): string {
  return ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n] ?? String(n);
}
