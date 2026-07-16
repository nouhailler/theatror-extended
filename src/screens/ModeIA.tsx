import { useSearchParams, useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { useAI } from '../lib/useAI';
import { NoKeyBanner } from './ia/parts';
import Assistant from './ia/Assistant';
import Generateur from './ia/Generateur';
import Distribution from './ia/Distribution';
import Analyse from './ia/Analyse';
import AnalyseRole from './ia/AnalyseRole';

type Tool = 'assistant' | 'generer' | 'distribution' | 'analyse' | 'role';
const TOOLS: { k: Tool; label: string }[] = [
  { k: 'assistant', label: 'Assistant' },
  { k: 'role', label: 'Mon rôle' },
  { k: 'generer', label: 'Générer' },
  { k: 'distribution', label: 'Distribution' },
  { k: 'analyse', label: 'Analyse' },
];

export default function ModeIA() {
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const tool = (params.get('outil') as Tool) || 'assistant';
  const setTool = (t: Tool) => setParams({ outil: t }, { replace: true });
  const { hasKey, model } = useAI();

  const linkPill: React.CSSProperties = {
    flex: 1, textAlign: 'center', background: 'var(--bg-field)', border: '1px solid var(--b-input)',
    borderRadius: 999, padding: '9px 12px', color: 'var(--gold-chip-text)', fontSize: 13.5,
    fontFamily: 'var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Mode IA">
      <BackHeader to="/explorer" title="Mode IA" sub={hasKey ? model : 'clé OpenRouter non configurée'} />

      {/* Prise en main : documentation + clé (toujours accessibles) */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => nav('/ia/aide')} style={linkPill}>📖 Lire la documentation pour commencer</button>
        <button onClick={() => nav('/reglages')} style={{ ...linkPill, flex: 'none' }}>⚙️ Clé IA</button>
      </div>

      {!hasKey && <NoKeyBanner />}

      {/* Sélecteur d'outil (défilement horizontal si nécessaire) */}
      <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4, overflowX: 'auto' }}>
        {TOOLS.map((t) => {
          const active = t.k === tool;
          return (
            <button key={t.k} onClick={() => setTool(t.k)}
              style={{ flex: 1, whiteSpace: 'nowrap', textAlign: 'center', padding: '7px 12px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer', border: 'none', fontWeight: 600, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
              {t.label}
            </button>
          );
        })}
      </div>

      {tool === 'assistant' && <Assistant />}
      {tool === 'role' && <AnalyseRole />}
      {tool === 'generer' && <Generateur />}
      {tool === 'distribution' && <Distribution />}
      {tool === 'analyse' && <Analyse />}
    </div>
  );
}
