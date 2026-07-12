import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { DECORS, DECOR_COULEUR, type DecorCategorie } from '../data/decors';

const CATEGORIES: DecorCategorie[] = ['Antique', 'Palais & cour', 'Ville & rue', 'Nature', 'Intérieur', 'Populaire', 'Symbolique'];

export default function Decors() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<DecorCategorie | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DECORS.filter((d) =>
      (!cat || d.categorie === cat) &&
      (!needle || `${d.nom} ${d.description} ${d.pieces ?? ''} ${d.elements.join(' ')}`.toLowerCase().includes(needle)),
    );
  }, [q, cat]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Décors">
      <BackHeader to="/explorer" title="Décors" sub="Bibliothèque des décors de théâtre" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (lieu, pièce, élément…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{DECORS.filter((d) => d.categorie === c).length}</span></button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} décor{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {list.map((d) => {
          const col = DECOR_COULEUR[d.categorie];
          return (
            <div key={d.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Aperçu : le dégradé du décor */}
              <div style={{ position: 'relative', height: 96, background: d.bg }}>
                <div style={{ position: 'absolute', left: 14, bottom: 10, right: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 700, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.85)' }}>{d.nom}</div>
                  <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: 'rgba(19,13,18,.7)', color: col, whiteSpace: 'nowrap' }}>{d.categorie}</span>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.45 }}>{d.description}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {d.elements.map((el) => (
                    <span key={el} style={{ fontSize: 11.5, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{el}</span>
                  ))}
                </div>
                {d.pieces && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6 }}>Pièces : {d.pieces}</div>}
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun décor pour ces critères.</div>
        )}
      </div>
    </div>
  );
}
