import { useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { useAI } from '../lib/useAI';
import { NoKeyBanner } from './ia/parts';
import Assistant from './ia/Assistant';
import Generateur from './ia/Generateur';
import Distribution from './ia/Distribution';
import Analyse from './ia/Analyse';

type Tool = 'assistant' | 'generer' | 'distribution' | 'analyse';
const TOOLS: { k: Tool; label: string }[] = [
  { k: 'assistant', label: 'Assistant' },
  { k: 'generer', label: 'Générer' },
  { k: 'distribution', label: 'Distribution' },
  { k: 'analyse', label: 'Analyse' },
];

export default function ModeIA() {
  const [params, setParams] = useSearchParams();
  const tool = (params.get('outil') as Tool) || 'assistant';
  const setTool = (t: Tool) => setParams({ outil: t }, { replace: true });
  const { hasKey, model } = useAI();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Mode IA">
      <BackHeader to="/explorer" title="Mode IA" sub={hasKey ? model : 'clé OpenRouter non configurée'} />

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
      {tool === 'generer' && <Generateur />}
      {tool === 'distribution' && <Distribution />}
      {tool === 'analyse' && <Analyse />}
    </div>
  );
}
