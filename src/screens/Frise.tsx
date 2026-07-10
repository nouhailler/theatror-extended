import { BackHeader } from '../components/ui';
import { FRISE } from '../data/content';

export default function Frise() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Frise chronologique">
      <BackHeader to="/explorer" title="Frise chronologique" />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {FRISE.map((f, i) => (
          <div key={f.id} style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flex: 'none' }}>
              <div style={{ width: 11, height: 11, borderRadius: 999, background: f.couleur, flex: 'none', marginTop: 5 }} />
              {i < FRISE.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(212,169,78,.2)' }} />}
            </div>
            <div style={{ paddingBottom: 22, flex: 1 }}>
              <div style={{ fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: f.couleur }}>{f.ere}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600, marginTop: 2 }}>{f.titre}</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 15, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{f.an}</div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.45 }}>{f.txt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
