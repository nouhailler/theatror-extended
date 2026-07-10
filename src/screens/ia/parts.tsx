import { useNavigate } from 'react-router-dom';

/** Bandeau affiché quand aucune clé OpenRouter n'est configurée. */
export function NoKeyBanner() {
  const nav = useNavigate();
  return (
    <div style={{ background: 'linear-gradient(120deg,#3a1520,#241019)', border: '1px solid rgba(158,43,58,.4)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Clé requise</div>
      <div style={{ fontSize: 14.5, color: 'var(--text-2b)', lineHeight: 1.5 }}>
        Le Mode IA utilise <strong>OpenRouter</strong> avec votre propre clé — elle reste sur cet appareil.
        Vous pouvez essayer les formulaires ci-dessous, mais l'envoi nécessite une clé.
      </div>
      <button className="gold-btn" style={{ padding: '10px 18px', fontSize: 14.5, alignSelf: 'flex-start' }} onClick={() => nav('/reglages')}>
        Configurer dans Réglages
      </button>
    </div>
  );
}

export const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-field)',
  border: '1px solid var(--b-input)',
  borderRadius: 10,
  padding: '10px 12px',
  color: 'var(--text)',
  fontSize: 15,
  fontFamily: 'var(--font-body)',
  outline: 'none',
};

export function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{children}</div>;
}
