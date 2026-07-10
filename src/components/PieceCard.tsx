import { useNavigate } from 'react-router-dom';
import type { Piece } from '../data/types';
import { difficulteLabel } from './ui';
import Star from './Star';

/** Carte de pièce réutilisable (liste Pièces, collections…). */
export default function PieceCard({ p }: { p: Piece }) {
  const nav = useNavigate();
  return (
    <div onClick={() => nav(`/pieces/${p.id}`)} className="card card-tap" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 18.5, fontWeight: 600 }}>{p.titre}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 13, color: 'var(--gold)' }}>{p.duree}</span>
          <Star cat="pieces" id={p.id} />
        </div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{p.auteur} · {p.annee}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, background: 'var(--red-chip-bg)', border: '1px solid var(--red-chip-border)', color: 'var(--red-chip-text)' }}>{p.genre}</span>
        <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{p.actes}</span>
        <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{p.femmes} F · {p.hommes} H</span>
        <span style={{ fontSize: 12.5, color: 'var(--text-muted)', marginLeft: 'auto', fontStyle: 'italic' }}>{difficulteLabel(p.difficulte)}</span>
      </div>
    </div>
  );
}
