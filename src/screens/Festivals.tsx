import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { FESTIVALS, moisCourt, saisonCouleur, type Region } from '../data/festivals';

const REGIONS: Region[] = ['Europe', 'Amériques', 'Océanie'];

export default function Festivals() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => params.get('q') ?? '');
  const [region, setRegion] = useState<Region | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return FESTIVALS
      .filter((f) =>
        (!region || f.region === region) &&
        (!needle || `${f.nom} ${f.ville} ${f.pays} ${f.description} ${f.genre ?? ''}`.toLowerCase().includes(needle)),
      )
      .sort((a, b) => a.moisNum - b.moisNum || a.nom.localeCompare(b.nom, 'fr'));
  }, [q, region]);

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
            <div key={f.id} className="card" style={{ display: 'flex', gap: 14, padding: 14 }}>
              <div style={{ width: 58, height: 58, borderRadius: 10, flex: 'none', background: `linear-gradient(150deg, ${col}, rgba(0,0,0,.4))`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.9)' }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 14, fontWeight: 700, lineHeight: 1 }}>{moisCourt(f.moisNum)}</div>
                <div style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8, marginTop: 2 }}>{f.region === 'Europe' ? 'EUR' : f.region === 'Amériques' ? 'AMÉR' : 'OCÉAN'}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{f.nom}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{f.periode}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{f.ville} · {f.pays}{f.depuis ? ` · depuis ${f.depuis}` : ''}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{f.description}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6, alignItems: 'baseline' }}>
                  {f.genre && <span style={{ fontSize: 11.5, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{f.genre}</span>}
                  {f.site && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.site}</span>}
                </div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun festival pour ces critères.</div>
        )}
      </div>
    </div>
  );
}
