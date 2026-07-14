import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { helpForPath } from '../data/help';

// Fiche d'aide de l'écran courant : à quoi sert la section, ce qu'on peut y
// faire, où elle se trouve et ses liens avec les autres menus.
export default function HelpSheet() {
  const open = useStore((s) => s.helpOpen);
  const close = useStore((s) => s.closeHelp);
  const startTour = useStore((s) => s.startTour);
  const { pathname } = useLocation();
  const nav = useNavigate();

  if (!open) return null;
  const entry = helpForPath(pathname);

  const goto = (path: string) => {
    close();
    nav(path);
  };

  return (
    <div onClick={close}
      style={{ position: 'absolute', inset: 0, zIndex: 58, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 560, maxHeight: '86%', overflow: 'auto', background: 'var(--bg-app)', border: '1px solid rgba(212,169,78,.45)', borderRadius: '16px 16px 0 0', boxShadow: '0 -20px 60px rgba(0,0,0,.6)', padding: '16px 18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Aide de l'écran</div>
          <button onClick={close} aria-label="Fermer l'aide"
            style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: 21, lineHeight: 1, background: 'none', border: 'none' }}>×</button>
        </div>

        {!entry ? (
          <div style={{ marginTop: 12, fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
            Pas d'aide spécifique pour cet écran. Touchez le titre THEATHROR ou le menu ☰ pour revenir aux grandes sections, ou lancez le mode démo.
            <div style={{ marginTop: 14 }}>
              <button className="gold-btn" style={{ padding: '9px 18px', fontSize: 14 }} onClick={() => { close(); startTour(); }}>Lancer le mode démo</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 22, fontWeight: 700 }}>{entry.title}</div>
              <div style={{ fontSize: 15, color: 'var(--text-2b)', lineHeight: 1.55, marginTop: 5 }}>{entry.resume}</div>
            </div>

            <div>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Ce que vous pouvez faire</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {entry.tips.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 14, lineHeight: 1.5, flex: 'none' }}>›</span>
                    <span style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px' }}>
              <span style={{ fontSize: 12.5, color: 'var(--gold-chip-text)' }}>Où le trouver : </span>
              <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>{entry.situe}</span>
            </div>

            {entry.relations.length > 0 && (
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>En lien avec</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {entry.relations.map((r) => (
                    <button key={r.path} onClick={() => goto(r.path)}
                      style={{ background: 'var(--bg-field)', border: '1px solid var(--b-chip)', borderRadius: 999, padding: '6px 13px', color: 'var(--gold-chip-text)', fontSize: 13, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                      {r.label} →
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => { close(); startTour(); }}
              style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid rgba(212,169,78,.45)', color: 'var(--gold-chip-text)', borderRadius: 999, padding: '9px 18px', fontSize: 13.5, cursor: 'pointer' }}>
              Voir le mode démo complet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
