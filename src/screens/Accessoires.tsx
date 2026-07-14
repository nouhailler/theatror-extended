import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import Credit from '../components/Credit';
import { ACCESSOIRES, ACCESSOIRE_COULEUR, type AccessoireCategorie } from '../data/accessoires';

const CATEGORIES: AccessoireCategorie[] = ['Armes', 'Mobilier', 'Objets anciens'];

export default function Accessoires() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => params.get('q') ?? '');
  const [cat, setCat] = useState<AccessoireCategorie | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Ouverture directe d'un accessoire (lien depuis la recherche globale : /accessoires?focus=id).
  useEffect(() => {
    const f = params.get('focus');
    if (f && ACCESSOIRES.some((a) => a.id === f)) setOpenId(f);
  }, [params]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ACCESSOIRES.filter((a) =>
      (!cat || a.categorie === cat) &&
      (!needle || `${a.nom} ${a.description} ${a.pieces ?? ''} ${a.epoque ?? ''}`.toLowerCase().includes(needle)),
    );
  }, [q, cat]);

  const open = openId ? ACCESSOIRES.find((a) => a.id === openId) ?? null : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Accessoires">
      <BackHeader to="/explorer" title="Accessoires" sub="Catalogue : armes, mobilier, objets anciens" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (objet, pièce, époque…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{ACCESSOIRES.filter((a) => a.categorie === c).length}</span></button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} accessoire{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((a) => {
          const col = ACCESSOIRE_COULEUR[a.categorie];
          return (
            <div key={a.id} className="card card-tap" onClick={() => setOpenId(a.id)} style={{ display: 'flex', gap: 14, padding: 14, cursor: 'pointer' }}>
              <WikiImage file={a.img} initial={a.initiale} initialSize={24} objectPosition="center"
                fallbackBg={`linear-gradient(150deg, ${col}, rgba(0,0,0,.4))`}
                style={{ width: 56, height: 56, borderRadius: 10, flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{a.nom}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{a.categorie}{a.epoque ? ` · ${a.epoque}` : ''}</span>
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{a.description}</div>
                <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 8 }}>Voir l'accessoire en détail →</div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun accessoire pour ces critères.</div>
        )}
      </div>

      {/* Détail d'un accessoire : grande image + explication approfondie */}
      {open && (
        <div onClick={() => setOpenId(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 520, maxHeight: '90%', overflow: 'auto', background: 'var(--bg-app)', border: '1px solid var(--b-input)', borderRadius: 14, boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
            <div style={{ position: 'relative' }}>
              <WikiImage file={open.img} initial={open.initiale} initialSize={72}
                fallbackBg={`linear-gradient(150deg, ${ACCESSOIRE_COULEUR[open.categorie]}, rgba(0,0,0,.4))`}
                width={900} objectPosition="center" style={{ height: 280, borderRadius: '14px 14px 0 0' }} />
              <button onClick={() => setOpenId(null)} aria-label="Fermer"
                style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 999, background: 'rgba(19,13,18,.6)', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 22, fontWeight: 700 }}>{open.nom}</div>
                <span style={{ fontSize: 11.5, padding: '2px 10px', borderRadius: 999, border: `1px solid ${ACCESSOIRE_COULEUR[open.categorie]}`, color: ACCESSOIRE_COULEUR[open.categorie], whiteSpace: 'nowrap' }}>{open.categorie}{open.epoque ? ` · ${open.epoque}` : ''}</span>
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-2b)', lineHeight: 1.55 }}>{open.description}</div>
              {open.detail && <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{open.detail}</div>}
              {open.pieces && (
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--gold)' }}>À la scène :</span> {open.pieces}
                </div>
              )}
              <Credit file={open.img} />
            </div>
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5, borderTop: '1px solid var(--b-rest)', paddingTop: 10 }}>
        Vignettes : objets de musée et œuvres via Wikimedia Commons (domaine public, CC0 &amp; CC BY).
      </div>
    </div>
  );
}
