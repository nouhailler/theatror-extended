import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import { PERSONNAGES } from '../data/characters';

export default function Personnages() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Personnages">
      <BackHeader to="/explorer" title="Personnages célèbres" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {PERSONNAGES.map((c) => (
          <div key={c.id} onClick={() => nav(`/explorer/personnage/${c.id}`)} className="card card-tap" style={{ overflow: 'hidden' }}>
            <WikiImage file={c.img} initial={c.initiale} initialSize={52} alt={c.nom} style={{ height: 120 }} />
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
