import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { REFERENCES, REF_THEMES } from '../data/themes';
import { themeCounts } from '../data/themeIndex';
import { norm } from '../lib/search';

export default function Themes() {
  const nav = useNavigate();
  const [q, setQ] = useState('');

  // Les thèmes les mieux fournis d'abord : la page s'ouvre sur ce qui a de la matière.
  const list = useMemo(() => {
    const n = norm(q.trim());
    return REF_THEMES.filter((t) => !n || norm(t).includes(n)).sort(
      (a, b) => themeCounts[b] - themeCounts[a] || a.localeCompare(b, 'fr'),
    );
  }, [q]);

  const max = themeCounts[list[0]] ?? 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Thèmes">
      <BackHeader to="/explorer" title="Thèmes" sub={`${REFERENCES.length} pièces indexées, ${REF_THEMES.length} thèmes`} />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Chercher un thème…" aria-label="Chercher un thème"
        style={{ background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', fontSize: 15, color: 'var(--text)', outline: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {list.map((t) => (
          <div key={t} onClick={() => nav(`/explorer/themes/${encodeURIComponent(t)}`)} className="card card-tap"
            style={{ padding: '13px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{t}</div>
            {/* Jauge : donne à voir d'un coup d'œil le poids du thème dans le répertoire. */}
            <div style={{ height: 3, borderRadius: 999, background: 'var(--b-chip)', overflow: 'hidden' }}>
              <div style={{ width: `${(themeCounts[t] / max) * 100}%`, height: '100%', background: 'var(--gold)' }} />
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--gold-chip-text)', fontStyle: 'italic' }}>
              {themeCounts[t]} pièce{themeCounts[t] > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Aucun thème ne correspond à « {q} ».
        </div>
      )}
    </div>
  );
}
