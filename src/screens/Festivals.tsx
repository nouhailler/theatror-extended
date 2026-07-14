import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import Credit from '../components/Credit';
import Star from '../components/Star';
import { FESTIVALS, moisCourt, saisonCouleur, type Region } from '../data/festivals';

const REGIONS: Region[] = ['Europe', 'Amériques', 'Océanie'];
const regionCourt = (r: Region) => (r === 'Europe' ? 'EUR' : r === 'Amériques' ? 'AMÉR' : 'OCÉAN');

export default function Festivals() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => params.get('q') ?? '');
  const [region, setRegion] = useState<Region | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Ouverture directe d'un festival (lien depuis la recherche globale : /festivals?focus=id).
  useEffect(() => {
    const f = params.get('focus');
    if (f && FESTIVALS.some((x) => x.id === f)) setOpenId(f);
  }, [params]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return FESTIVALS
      .filter((f) =>
        (!region || f.region === region) &&
        (!needle || `${f.nom} ${f.ville} ${f.pays} ${f.description} ${f.genre ?? ''}`.toLowerCase().includes(needle)),
      )
      .sort((a, b) => a.moisNum - b.moisNum || a.nom.localeCompare(b.nom, 'fr'));
  }, [q, region]);

  const open = openId ? FESTIVALS.find((f) => f.id === openId) ?? null : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Festivals">
      <BackHeader to="/explorer" title="Festivals" sub="Agenda mondial du théâtre" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (ville, pays, genre…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {REGIONS.map((r) => (
          <button key={r} className={`chip${region === r ? ' active' : ''}`} onClick={() => setRegion(region === r ? null : r)}>{r} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{FESTIVALS.filter((f) => f.region === r).length}</span></button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} festival{list.length > 1 ? 's' : ''} · classés par saison</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((f) => {
          const col = saisonCouleur(f.moisNum);
          return (
            <div key={f.id} className="card card-tap" onClick={() => setOpenId(f.id)} style={{ display: 'flex', gap: 14, padding: 14, cursor: 'pointer' }}>
              <WikiImage file={f.img} initial={moisCourt(f.moisNum)} initialSize={14} objectPosition="center" alt={`${f.nom} — ${f.ville}`}
                fallbackBg={`linear-gradient(150deg, ${col}, rgba(0,0,0,.4))`}
                style={{ width: 58, height: 58, borderRadius: 10, flex: 'none' }}>
                {/* Pastille calendrier (mois + région) par-dessus l'image */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.15) 30%,rgba(0,0,0,.72) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 5, color: 'rgba(255,255,255,.95)' }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 13, fontWeight: 700, lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,.9)' }}>{moisCourt(f.moisNum)}</div>
                  <div style={{ fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.85, marginTop: 2, textShadow: '0 1px 4px rgba(0,0,0,.9)' }}>{regionCourt(f.region)}</div>
                </div>
              </WikiImage>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{f.nom}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{f.periode}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{f.ville} · {f.pays}{f.depuis ? ` · depuis ${f.depuis}` : ''}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{f.description}</div>
                <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 8 }}>Voir le festival en détail →</div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun festival pour ces critères.</div>
        )}
      </div>

      {/* Détail d'un festival : grande image + présentation approfondie */}
      {open && (
        <div onClick={() => setOpenId(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 520, maxHeight: '90%', overflow: 'auto', background: 'var(--bg-app)', border: '1px solid var(--b-input)', borderRadius: 14, boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
            <div style={{ position: 'relative' }}>
              <WikiImage file={open.img} initial={moisCourt(open.moisNum)} initialSize={40} alt={`${open.nom} — ${open.ville}, ${open.pays}`}
                fallbackBg={`linear-gradient(150deg, ${saisonCouleur(open.moisNum)}, rgba(0,0,0,.4))`}
                width={900} objectPosition="center" style={{ height: 240, borderRadius: '14px 14px 0 0' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.05) 45%,rgba(0,0,0,.62) 100%)' }} />
                <div style={{ position: 'absolute', left: 16, bottom: 12, right: 16 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 22, fontWeight: 700, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.9)' }}>{open.nom}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.85)', textShadow: '0 1px 5px rgba(0,0,0,.9)' }}>{open.ville} · {open.pays}</div>
                </div>
              </WikiImage>
              <button onClick={() => setOpenId(null)} aria-label="Fermer"
                style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 999, background: 'rgba(19,13,18,.6)', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 11.5, padding: '2px 10px', borderRadius: 999, border: `1px solid ${saisonCouleur(open.moisNum)}`, color: saisonCouleur(open.moisNum) }}>{open.periode}</span>
                  {open.depuis && <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>depuis {open.depuis}</span>}
                </div>
                <Star cat="festivals" id={open.id} size={20} />
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-2b)', lineHeight: 1.55 }}>{open.description}</div>
              {open.detail && <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{open.detail}</div>}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'baseline' }}>
                {open.genre && <span style={{ fontSize: 11.5, padding: '2px 10px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{open.genre}</span>}
                {open.site && <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{open.site}</span>}
              </div>
              <Credit file={open.img} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
