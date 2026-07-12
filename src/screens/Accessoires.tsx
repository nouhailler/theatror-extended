import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { ACCESSOIRES, ACCESSOIRE_COULEUR, type AccessoireCategorie } from '../data/accessoires';

const CATEGORIES: AccessoireCategorie[] = ['Armes', 'Mobilier', 'Objets anciens'];

export default function Accessoires() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<AccessoireCategorie | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ACCESSOIRES.filter((a) =>
      (!cat || a.categorie === cat) &&
      (!needle || `${a.nom} ${a.description} ${a.pieces ?? ''} ${a.epoque ?? ''}`.toLowerCase().includes(needle)),
    );
  }, [q, cat]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Accessoires">
      <BackHeader to="/explorer" title="Accessoires" sub="Catalogue : armes, mobilier, objets anciens" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (objet, pièce, époque…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c}</button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} accessoire{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((a) => {
          const col = ACCESSOIRE_COULEUR[a.categorie];
          return (
            <div key={a.id} className="card" style={{ display: 'flex', gap: 14, padding: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, flex: 'none', background: `linear-gradient(150deg, ${col}, rgba(0,0,0,.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,.85)' }}>
                {a.initiale}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{a.nom}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{a.categorie}{a.epoque ? ` · ${a.epoque}` : ''}</span>
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{a.description}</div>
                {a.pieces && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6 }}>Pièces : {a.pieces}</div>}
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun accessoire pour ces critères.</div>
        )}
      </div>
    </div>
  );
}
