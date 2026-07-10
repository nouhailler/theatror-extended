import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { PERSONNAGES } from '../data/characters';

export default function Personnages() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Personnages">
      <BackHeader to="/explorer" title="Personnages célèbres" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {PERSONNAGES.map((c) => (
          <div key={c.id} onClick={() => nav(`/explorer/personnage/${c.id}`)} className="card card-tap" style={{ overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 120, background: 'var(--fallback-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: 52, color: 'rgba(212,169,78,.3)' }}>{c.initiale}</span>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{c.nom}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 1 }}>{c.piece}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
