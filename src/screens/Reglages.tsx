import { useState } from 'react';
import { useStore } from '../store';
import { BackHeader } from '../components/ui';

// Modèles OpenRouter courants (préparation du « Mode IA » — étape suivante).
const MODELES = [
  'anthropic/claude-3.5-sonnet',
  'anthropic/claude-3-haiku',
  'openai/gpt-4o-mini',
  'google/gemini-flash-1.5',
  'meta-llama/llama-3.1-70b-instruct',
];

export default function Reglages() {
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);
  const [key, setKey] = useState(settings.openRouterKey);
  const [reveal, setReveal] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSettings({ openRouterKey: key.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '18px 18px 28px' }} data-screen-label="Réglages">
      <BackHeader to="/" title="Réglages" />

      <section className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Mode IA · OpenRouter</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 600, marginTop: 2 }}>Clé API</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
            Recherche en langage naturel, explication de pièces et générateur de scènes (bientôt).
            Votre clé reste sur cet appareil — elle n'est jamais transmise à Theathror.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '4px 10px' }}>
          <input
            type={reveal ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-or-v1-…"
            autoComplete="off"
            spellCheck={false}
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', padding: '8px 0' }}
          />
          <button onClick={() => setReveal((r) => !r)} style={{ background: 'none', border: 'none', color: 'var(--gold-chip-text)', cursor: 'pointer', fontSize: 13 }}>
            {reveal ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          Modèle par défaut
          <select
            value={settings.openRouterModel}
            onChange={(e) => setSettings({ openRouterModel: e.target.value })}
            style={{ background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }}
          >
            {MODELES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>

        <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15 }} onClick={save}>
          {saved ? 'Enregistré ✓' : 'Enregistrer la clé'}
        </button>
      </section>

      <section className="card card-16" style={{ padding: 16 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>À propos</div>
        <div style={{ fontSize: 14, color: 'var(--text-2b)', marginTop: 6, lineHeight: 1.5 }}>
          Theathror — le compagnon du comédien. Application hors-ligne (PWA).
          Portraits et lieux : Wikimedia Commons, sous licences respectives.
        </div>
      </section>
    </div>
  );
}
