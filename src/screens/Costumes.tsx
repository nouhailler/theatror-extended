import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import Credit from '../components/Credit';
import { COSTUMES, COSTUME_COULEUR, type CostumeEpoque } from '../data/costumes';

const EPOQUES: CostumeEpoque[] = ['Antiquité', 'Moyen Âge', 'Renaissance', 'Grand Siècle', 'Lumières', 'Romantique', 'Moderne'];
const GENRES = ['Homme', 'Femme', 'Mixte'] as const;

export default function Costumes() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => params.get('q') ?? '');
  const [epoque, setEpoque] = useState<CostumeEpoque | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Ouverture directe d'un costume (lien depuis la recherche globale : /costumes?focus=id).
  useEffect(() => {
    const f = params.get('focus');
    if (f && COSTUMES.some((c) => c.id === f)) setOpenId(f);
  }, [params]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COSTUMES.filter((c) =>
      (!epoque || c.epoque === epoque) &&
      (!genre || c.genre === genre) &&
      (!needle || `${c.nom} ${c.pays} ${c.description} ${c.personnages ?? ''} ${c.elements.join(' ')}`.toLowerCase().includes(needle)),
    );
  }, [q, epoque, genre]);

  const open = openId ? COSTUMES.find((c) => c.id === openId) ?? null : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Costumes">
      <BackHeader to="/explorer" title="Costumes" sub="Galerie historique du costume de théâtre" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (pays, style, personnage…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Époque</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {EPOQUES.map((e) => (
            <button key={e} className={`chip${epoque === e ? ' active' : ''}`} onClick={() => setEpoque(epoque === e ? null : e)}>{e} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{COSTUMES.filter((c) => c.epoque === e).length}</span></button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Genre</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {GENRES.map((g) => (
            <button key={g} className={`chip${genre === g ? ' active' : ''}`} onClick={() => setGenre(genre === g ? null : g)}>{g} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{COSTUMES.filter((c) => c.genre === g).length}</span></button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} costume{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((c) => {
          const col = COSTUME_COULEUR[c.epoque];
          return (
            <div key={c.id} className="card card-tap" onClick={() => setOpenId(c.id)} style={{ display: 'flex', gap: 14, padding: 14, cursor: 'pointer' }}>
              <WikiImage file={c.img} initial={c.initiale} initialSize={26} objectPosition="center"
                fallbackBg={`linear-gradient(150deg, ${col}, rgba(0,0,0,.35))`}
                style={{ width: 60, height: 60, borderRadius: 10, flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{c.nom}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{c.epoque}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{c.pays} · {c.genre}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{c.description}</div>
                <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 8 }}>Voir le costume en détail →</div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun costume pour ces critères.</div>
        )}
      </div>

      {/* Détail d'un costume : grande image + explication approfondie */}
      {open && (
        <div onClick={() => setOpenId(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 520, maxHeight: '90%', overflow: 'auto', background: 'var(--bg-app)', border: '1px solid var(--b-input)', borderRadius: 14, boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
            <div style={{ position: 'relative' }}>
              <WikiImage file={open.img} initial={open.initiale} initialSize={72}
                fallbackBg={`linear-gradient(150deg, ${COSTUME_COULEUR[open.epoque]}, rgba(0,0,0,.35))`}
                width={900} objectPosition="center top" style={{ height: 300, borderRadius: '14px 14px 0 0' }} />
              <button onClick={() => setOpenId(null)} aria-label="Fermer"
                style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 999, background: 'rgba(19,13,18,.6)', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 22, fontWeight: 700 }}>{open.nom}</div>
                  <span style={{ fontSize: 11.5, padding: '2px 10px', borderRadius: 999, border: `1px solid ${COSTUME_COULEUR[open.epoque]}`, color: COSTUME_COULEUR[open.epoque], whiteSpace: 'nowrap' }}>{open.epoque}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 2 }}>{open.pays} · {open.genre}</div>
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-2b)', lineHeight: 1.55 }}>{open.description}</div>
              {open.detail && <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{open.detail}</div>}
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Éléments du costume</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {open.elements.map((el) => (
                    <span key={el} style={{ fontSize: 12.5, padding: '3px 10px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{el}</span>
                  ))}
                </div>
              </div>
              {open.personnages && <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Rôles / emplois : {open.personnages}</div>}
              <Credit file={open.img} />
            </div>
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5, borderTop: '1px solid var(--b-rest)', paddingTop: 10 }}>
        Vignettes : œuvres et pièces de musée via Wikimedia Commons (domaine public, CC0 &amp; CC BY).
      </div>
    </div>
  );
}
