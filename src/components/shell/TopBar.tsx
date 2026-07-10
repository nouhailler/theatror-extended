import { useStore } from '../../store';
import { dateCourte } from '../../lib/date';

export default function TopBar() {
  const openMenu = useStore((s) => s.openMenu);

  return (
    <header
      style={{
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 14px',
        borderBottom: '1px solid rgba(212,169,78,.15)',
        background: 'var(--bg-bar)',
      }}
    >
      <button
        onClick={openMenu}
        aria-label="Ouvrir le menu"
        style={{
          cursor: 'pointer',
          width: 32,
          height: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 5,
          padding: '0 3px',
          background: 'none',
          border: 'none',
        }}
      >
        <span style={{ height: 1.5, background: 'var(--gold)', borderRadius: 2 }} />
        <span style={{ height: 1.5, background: 'var(--gold)', borderRadius: 2 }} />
        <span style={{ height: 1.5, background: 'var(--gold)', borderRadius: 2 }} />
      </button>
      <div
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 2.5,
        }}
      >
        THEATHROR
      </div>
      <div
        style={{
          marginLeft: 'auto',
          fontSize: 13,
          fontStyle: 'italic',
          color: 'var(--text-muted)',
        }}
      >
        {dateCourte()}
      </div>
    </header>
  );
}
