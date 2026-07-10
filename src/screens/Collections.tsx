import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { COLLECTIONS } from '../data/content';
import { wiki } from '../lib/wikimedia';

export default function Collections() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Collections">
      <BackHeader to="/explorer" title="Collections" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {COLLECTIONS.map((c) => (
          <div key={c.id} onClick={() => nav(`/explorer/collections/${c.id}`)} className="card card-tap" style={{ overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 110, background: c.fond, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: 38, color: 'rgba(242,233,220,.3)' }}>{c.initiale}</span>
              {c.img && (
                <img src={wiki(c.img, 500)} alt="" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.85 }} />
              )}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 15.5, fontWeight: 600, lineHeight: 1.25 }}>{c.titre}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 3 }}>{c.nb}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
