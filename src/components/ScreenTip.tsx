import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { helpForPath } from '../data/help';

// Astuce affichée la première fois que l'on arrive sur un écran :
// « voilà ce que vous pouvez faire ». Discrète, au-dessus de la barre du bas,
// vue une seule fois par section (mémorisée). Désactivable dans les Réglages.
export default function ScreenTip() {
  const { pathname } = useLocation();
  const tipsEnabled = useStore((s) => s.settings.tipsEnabled);
  const tipsSeen = useStore((s) => s.tipsSeen);
  const markTip = useStore((s) => s.markTip);
  const openHelp = useStore((s) => s.openHelp);
  const menuOpen = useStore((s) => s.menuOpen);
  const helpOpen = useStore((s) => s.helpOpen);
  const tourStep = useStore((s) => s.tourStep);
  const onbStep = useStore((s) => s.onbStep);

  // Astuce active pour la visite courante (indépendante de tipsSeen, qu'on
  // marque aussitôt pour ne plus l'afficher les fois suivantes).
  const [tipId, setTipId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // On n'affiche (ni ne « consomme ») une astuce que si aucun autre volet
    // n'est ouvert — sinon l'intro ou la démo la marqueraient vue à vide.
    if (menuOpen || helpOpen || tourStep !== null || onbStep !== null) return undefined;
    const entry = helpForPath(pathname);
    if (tipsEnabled && entry && !tipsSeen[entry.id]) {
      setTipId(entry.id);
      markTip(entry.id); // vue une seule fois
      const t = setTimeout(() => setVisible(true), 450);
      return () => clearTimeout(t);
    }
    setTipId(null);
    setVisible(false);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuOpen, helpOpen, tourStep, onbStep, tipsEnabled]);

  if (!tipId || !visible) return null;
  if (menuOpen || helpOpen || tourStep !== null || onbStep !== null) return null;

  const entry = helpForPath(pathname);
  if (!entry || entry.id !== tipId) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 66,
        zIndex: 45,
        background: 'var(--bg-demo)',
        border: '1px solid rgba(212,169,78,.5)',
        borderRadius: 13,
        padding: '11px 12px 12px 14px',
        boxShadow: 'var(--sh-demo)',
        display: 'flex',
        gap: 11,
        alignItems: 'flex-start',
      }}
    >
      <span style={{ fontSize: 17, lineHeight: 1.2, flex: 'none' }}>💡</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gold)' }}>
          Astuce · {entry.title}
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.45, marginTop: 3 }}>{entry.resume}</div>
        <button
          onClick={openHelp}
          style={{ marginTop: 7, background: 'none', border: 'none', padding: 0, color: 'var(--gold-chip-text)', fontSize: 13, fontFamily: 'var(--font-body)', cursor: 'pointer' }}
        >
          En savoir plus →
        </button>
      </div>
      <button onClick={() => setVisible(false)} aria-label="Fermer l'astuce"
        style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: 18, lineHeight: 1, background: 'none', border: 'none', flex: 'none' }}>×</button>
    </div>
  );
}
