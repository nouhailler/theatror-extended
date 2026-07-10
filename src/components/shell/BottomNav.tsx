import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { key: 'accueil', label: 'Accueil', path: '/', match: (p: string) => p === '/' || p.startsWith('/collection') },
  { key: 'pieces', label: 'Pièces', path: '/pieces', match: (p: string) => p.startsWith('/pieces') },
  { key: 'explorer', label: 'Explorer', path: '/explorer', match: (p: string) => p.startsWith('/explorer') },
  { key: 'scene', label: 'Scène', path: '/scene', match: (p: string) => p.startsWith('/scene') },
  { key: 'journal', label: 'Journal', path: '/journal', match: (p: string) => p.startsWith('/journal') },
];

export default function BottomNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        flex: 'none',
        display: 'flex',
        borderTop: '1px solid rgba(212,169,78,.2)',
        background: 'var(--bg-bar)',
        padding: '9px 6px 7px',
      }}
    >
      {TABS.map((t) => {
        const active = t.match(pathname);
        return (
          <button
            key={t.key}
            onClick={() => nav(t.path)}
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: 'var(--gold)',
                opacity: active ? 1 : 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                letterSpacing: 0.5,
                color: active ? 'var(--gold)' : 'var(--nav-inactive)',
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
