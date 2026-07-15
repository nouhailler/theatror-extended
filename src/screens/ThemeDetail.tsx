import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { REF_THEMES } from '../data/themes';
import { oeuvresForTheme, noteFor } from '../data/themeIndex';

export default function ThemeDetail() {
  const { theme: raw } = useParams();
  const nav = useNavigate();
  const theme = raw ? decodeURIComponent(raw) : '';
  const [catOnly, setCatOnly] = useState(false);

  const connu = REF_THEMES.includes(theme);
  const toutes = useMemo(() => (connu ? oeuvresForTheme(theme) : []), [theme, connu]);
  const auCatalogue = toutes.filter((o) => o.pieceId).length;
  const list = catOnly ? toutes.filter((o) => o.pieceId) : toutes;

  if (!connu) {
    return (
      <div style={{ padding: 18 }}>
        <button onClick={() => nav('/explorer/themes')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Thème introuvable.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '18px 18px 28px' }} data-screen-label={`Thème ${theme}`}>
      <BackHeader to="/explorer/themes" title={theme} sub={`${toutes.length} pièce${toutes.length > 1 ? 's' : ''} · ${auCatalogue} au catalogue`} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        <button className={`chip${catOnly ? ' active' : ''}`} onClick={() => setCatOnly(!catOnly)}>
          Au catalogue <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{auCatalogue}</span>
        </button>
      </div>

      {list.map((o) => {
        const lie = !!o.pieceId;
        return (
          <div key={o.id} className={`card${lie ? ' card-tap' : ''}`}
            onClick={lie ? () => nav(`/pieces/${o.pieceId}`) : undefined}
            style={{ padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 5, cursor: lie ? 'pointer' : 'default' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600, lineHeight: 1.25 }}>
              {o.piece}
              {lie && <span style={{ color: 'var(--gold)', marginLeft: 6 }}>→</span>}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)', fontStyle: 'italic' }}>{o.auteur}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2b)', lineHeight: 1.45 }}>{noteFor(o, theme)}</div>
            {/* Les autres thèmes de l'œuvre : rebond d'un thème à l'autre. */}
            {o.notes.length > 1 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
                {o.notes.filter((n) => n.theme !== theme).map((n) => (
                  <button key={n.theme} onClick={(e) => { e.stopPropagation(); nav(`/explorer/themes/${encodeURIComponent(n.theme)}`); }}
                    style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)', background: 'none', cursor: 'pointer' }}>
                    {n.theme}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {list.length === 0 && (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Aucune pièce de ce thème n'est au catalogue.
        </div>
      )}
    </div>
  );
}
