import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import Credit from '../components/Credit';
import { DECORS, DECOR_COULEUR, type DecorCategorie } from '../data/decors';

const CATEGORIES: DecorCategorie[] = ['Antique', 'Palais & cour', 'Ville & rue', 'Nature', 'Intérieur', 'Populaire', 'Symbolique'];

export default function Decors() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => params.get('q') ?? '');
  const [cat, setCat] = useState<DecorCategorie | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Ouverture directe d'un décor (lien depuis la recherche globale : /decors?focus=id).
  useEffect(() => {
    const f = params.get('focus');
    if (f && DECORS.some((d) => d.id === f)) setOpenId(f);
  }, [params]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DECORS.filter((d) =>
      (!cat || d.categorie === cat) &&
      (!needle || `${d.nom} ${d.description} ${d.pieces ?? ''} ${d.elements.join(' ')}`.toLowerCase().includes(needle)),
    );
  }, [q, cat]);

  const open = openId ? DECORS.find((d) => d.id === openId) ?? null : null;

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
            <div key={d.id} className="card card-tap" onClick={() => setOpenId(d.id)} style={{ overflow: 'hidden', cursor: 'pointer' }}>
              {/* Vignette : photo/tableau du décor (repli : dégradé) */}
              <WikiImage file={d.img} initial={d.initiale} initialSize={40} fallbackBg={d.bg} objectPosition="center" style={{ height: 120, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.1) 40%,rgba(0,0,0,.72) 100%)' }} />
                <div style={{ position: 'absolute', left: 14, bottom: 10, right: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 700, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.9)' }}>{d.nom}</div>
                  <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: 'rgba(19,13,18,.72)', color: col, whiteSpace: 'nowrap' }}>{d.categorie}</span>
                </div>
              </WikiImage>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.45 }}>{d.description}</div>
                <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 8 }}>Voir le décor en grand →</div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun décor pour ces critères.</div>
        )}
      </div>

      {/* Détail d'un décor : grande image + description complète */}
      {open && (
        <div onClick={() => setOpenId(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 520, maxHeight: '90%', overflow: 'auto', background: 'var(--bg-app)', border: '1px solid var(--b-input)', borderRadius: 14, boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
            <div style={{ position: 'relative' }}>
              <WikiImage file={open.img} initial={open.initiale} initialSize={72} fallbackBg={open.bg} width={900} objectPosition="center" style={{ height: 240, borderRadius: '14px 14px 0 0' }} />
              <button onClick={() => setOpenId(null)} aria-label="Fermer"
                style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 999, background: 'rgba(19,13,18,.6)', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 22, fontWeight: 700 }}>{open.nom}</div>
                <span style={{ fontSize: 11.5, padding: '2px 10px', borderRadius: 999, border: `1px solid ${DECOR_COULEUR[open.categorie]}`, color: DECOR_COULEUR[open.categorie], whiteSpace: 'nowrap' }}>{open.categorie}</span>
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-2b)', lineHeight: 1.55 }}>{open.description}</div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Éléments</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {open.elements.map((el) => (
                    <span key={el} style={{ fontSize: 12.5, padding: '3px 10px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{el}</span>
                  ))}
                </div>
              </div>
              {open.pieces && <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Pièces : {open.pieces}</div>}
              <Credit file={open.img} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
