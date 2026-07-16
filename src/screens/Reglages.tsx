import { useState } from 'react';
import { useStore } from '../store';
import { BackHeader } from '../components/ui';
import { fetchFreeModels, type OpenRouterModel } from '../lib/openrouter';
import { HOME_SHORTCUTS } from '../data/homeShortcuts';

// Modèles OpenRouter courants (repli si la liste en ligne n'est pas chargée).
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
  const startTour = useStore((s) => s.startTour);
  const onbReplay = useStore((s) => s.onbReplay);
  const resetTips = useStore((s) => s.resetTips);
  const [key, setKey] = useState(settings.openRouterKey);
  const [reveal, setReveal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tipsReset, setTipsReset] = useState(false);

  // Modèles gratuits d'OpenRouter (chargés à la demande).
  const [freeModels, setFreeModels] = useState<OpenRouterModel[] | null>(null);
  const [loadingModels, setLoadingModels] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [onlyFree, setOnlyFree] = useState(false);

  const loadFreeModels = async () => {
    setLoadingModels(true);
    setModelsError(null);
    try {
      const list = await fetchFreeModels();
      setFreeModels(list);
      setOnlyFree(true);
      if (list.length === 0) setModelsError("Aucun modèle gratuit trouvé pour l'instant.");
    } catch {
      setModelsError('Impossible de charger la liste (réseau ?).');
    } finally {
      setLoadingModels(false);
    }
  };

  const save = () => {
    setSettings({ openRouterKey: key.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  // Active/désactive un accès rapide de l'accueil (ajout en fin de liste).
  const toggleShortcut = (id: string) => {
    const cur = settings.homeShortcuts;
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    setSettings({ homeShortcuts: next });
  };

  // Options du sélecteur : modèles gratuits si chargés, sinon la liste par défaut.
  // On garde toujours le modèle courant sélectionnable, même absent de la liste.
  const baseOptions = onlyFree && freeModels ? freeModels.map((m) => m.id) : MODELES;
  const options = baseOptions.includes(settings.openRouterModel)
    ? baseOptions
    : [settings.openRouterModel, ...baseOptions];
  const labelFor = (id: string) => freeModels?.find((m) => m.id === id)?.name ?? id;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '18px 18px 28px' }} data-screen-label="Réglages">
      <BackHeader to="/" title="Réglages" />

      <section className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Accueil</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 600, marginTop: 2 }}>Accès rapides</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
            Choisissez les raccourcis affichés sur votre page d'accueil — Mode répétition si vous répétez,
            Exercices ou Voix &amp; diction pour vous entraîner, Carnet &amp; contacts pour un casting…
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {HOME_SHORTCUTS.map((sc) => (
            <label key={sc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer', padding: '9px 0', borderTop: '1px solid var(--b-chip)' }}>
              <span style={{ minWidth: 0 }}>
                <span style={{ fontSize: 14.5, color: 'var(--text-2b)' }}>{sc.label}</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginLeft: 8 }}>{sc.sub}</span>
              </span>
              <input
                type="checkbox"
                checked={settings.homeShortcuts.includes(sc.id)}
                onChange={() => toggleShortcut(sc.id)}
                style={{ width: 18, height: 18, flex: 'none' }}
              />
            </label>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
          {settings.homeShortcuts.length} affiché{settings.homeShortcuts.length > 1 ? 's' : ''} sur l'accueil
        </div>
      </section>

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
            {options.map((m) => <option key={m} value={m}>{labelFor(m)}</option>)}
          </select>
        </label>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={loadFreeModels}
            disabled={loadingModels}
            style={{ background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: '7px 14px', color: 'var(--gold-chip-text)', fontSize: 13, fontFamily: 'var(--font-body)', cursor: loadingModels ? 'default' : 'pointer', opacity: loadingModels ? 0.6 : 1 }}
          >
            {loadingModels ? 'Chargement…' : freeModels ? 'Actualiser les modèles gratuits' : 'Charger les modèles gratuits (OpenRouter)'}
          </button>
          {freeModels && freeModels.length > 0 && (
            <label style={{ fontSize: 12.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
              Gratuits seulement ({freeModels.length})
            </label>
          )}
        </div>
        {modelsError && <div style={{ fontSize: 12.5, color: 'var(--danger, #c0563a)' }}>{modelsError}</div>}
        {onlyFree && freeModels && freeModels.length > 0 && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
            Liste des modèles gratuits d'OpenRouter (tarif à 0). Ces modèles peuvent avoir des limites d'usage ou évoluer.
          </div>
        )}

        <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15 }} onClick={save}>
          {saved ? 'Enregistré ✓' : 'Enregistrer la clé'}
        </button>
      </section>

      <section className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Aide & découverte</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
            Le mode démo traverse chaque section. Le bouton « ? » en haut ouvre l'aide de l'écran courant, et les astuces s'affichent une fois par section.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="gold-btn" style={{ padding: '10px 18px', fontSize: 14.5 }} onClick={startTour}>
            Lancer le mode démo
          </button>
          <button onClick={onbReplay}
            style={{ background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: '10px 16px', color: 'var(--gold-chip-text)', fontSize: 13.5, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
            Revoir l'introduction
          </button>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer' }}>
          <span style={{ fontSize: 14.5, color: 'var(--text-2b)' }}>Astuces au fil de la navigation</span>
          <input
            type="checkbox"
            checked={settings.tipsEnabled}
            onChange={(e) => setSettings({ tipsEnabled: e.target.checked })}
            style={{ width: 18, height: 18, flex: 'none' }}
          />
        </label>

        <button
          onClick={() => { resetTips(); setTipsReset(true); setTimeout(() => setTipsReset(false), 1800); }}
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0, color: 'var(--gold-chip-text)', fontSize: 13.5, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
          {tipsReset ? 'Astuces réinitialisées ✓' : 'Réafficher toutes les astuces'}
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
