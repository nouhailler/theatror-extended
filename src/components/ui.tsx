import type { CSSProperties, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Retour « intelligent » pour les fiches de détail : revient à la page précédente
 * (donc à la Frise, la Carte, une autre fiche… d'où l'on vient), et retombe sur
 * `fallback` seulement en cas d'accès direct sans historique interne (lien partagé,
 * rechargement de la PWA sur cette route).
 */
export function useBack(fallback: string): () => void {
  const nav = useNavigate();
  const loc = useLocation();
  return () => {
    if (loc.key && loc.key !== 'default') nav(-1);
    else nav(fallback);
  };
}

/** Surtitre or en capitales. */
export function Overline({ children, size = 12 }: { children: ReactNode; size?: number }) {
  return (
    <div style={{ fontSize: size, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--gold)' }}>
      {children}
    </div>
  );
}

/** Titre d'écran (Playfair 26/700), avec surtitre optionnel. */
export function ScreenTitle({ over, children }: { over?: string; children: ReactNode }) {
  return (
    <div>
      {over && <Overline>{over}</Overline>}
      <div style={{ fontFamily: 'var(--font-title)', fontSize: 26, fontWeight: 700 }}>{children}</div>
    </div>
  );
}

/** En-tête avec flèche de retour + titre (sous-écrans). */
export function BackHeader({ to, title, sub }: { to: string; title: string; sub?: string }) {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={() => nav(to)} aria-label="Retour"
        style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: 20, lineHeight: 1, background: 'none', border: 'none', padding: 0 }}>
        ←
      </button>
      <div>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700 }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{sub}</div>}
      </div>
    </div>
  );
}

/** Conteneur d'écran vertical standard. */
export function Screen({ children, style, label }: { children: ReactNode; style?: CSSProperties; label?: string }) {
  return (
    <div
      data-screen-label={label}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px', ...style }}
    >
      {children}
    </div>
  );
}

/** Puce de difficulté ●●●○ */
export function difficulteLabel(n: number): string {
  return 'difficulté ' + '●'.repeat(n) + '○'.repeat(4 - n);
}
