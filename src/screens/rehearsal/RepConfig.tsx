import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackHeader } from '../../components/ui';
import { useRehearsalStore } from '../../lib/rehearsalStore';
import { DEFAULT_CONFIG, type RepConfig, type DidascalieMode, type MyLineMode } from '../../data/rehearsal';
import { loadVoices, frenchVoices, speechSupported } from '../../lib/speech';

const DIDA: { k: DidascalieMode; label: string }[] = [
  { k: 'read', label: 'Lire' },
  { k: 'show', label: 'Afficher' },
  { k: 'ignore', label: 'Ignorer' },
];
const MODES: { k: MyLineMode; label: string; help: string }[] = [
  { k: 'manual', label: 'Pause manuelle', help: 'L\'app attend que vous touchiez l\'écran après votre réplique. Le plus fiable.' },
  { k: 'timed', label: 'Chronométré', help: 'Pause estimée d\'après la longueur de la réplique ; bouton pour passer avant la fin.' },
  { k: 'hidden', label: 'Masqué', help: 'Votre réplique est cachée pendant la pause, pour tester votre mémoire (bouton « révéler »).' },
];

function Seg<T extends string>({ value, options, onChange }: { value: T; options: { k: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
      {options.map((o) => {
        const active = o.k === value;
        return (
          <button key={o.k} onClick={() => onChange(o.k)}
            style={{ flex: 1, textAlign: 'center', padding: '7px 4px', borderRadius: 999, fontSize: 12.5, cursor: 'pointer', border: 'none', fontWeight: 600, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function RepConfig() {
  const { id } = useParams();
  const nav = useNavigate();
  const { loaded, load, get, setConfig } = useRehearsalStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    let alive = true;
    void loadVoices().then((v) => { if (alive) setVoices(v); });
    const onVC = () => setVoices(window.speechSynthesis.getVoices());
    if (speechSupported) window.speechSynthesis.addEventListener?.('voiceschanged', onVC);
    return () => { alive = false; if (speechSupported) window.speechSynthesis.removeEventListener?.('voiceschanged', onVC); };
  }, []);

  const play = id ? get(id) : undefined;
  const frVoices = useMemo(() => frenchVoices(voices), [voices]);

  const [cfg, setCfg] = useState<RepConfig | null>(null);
  useEffect(() => {
    if (play && !cfg) {
      setCfg(play.config ?? { myRole: play.script.characters[0]?.key ?? '', ...DEFAULT_CONFIG });
    }
  }, [play, cfg]);

  if (loaded && !play) {
    return (
      <div style={{ padding: 18 }}>
        <BackHeader to="/repetition" title="Configuration" />
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Pièce introuvable.</p>
      </div>
    );
  }
  if (!play || !cfg) {
    return <div style={{ padding: 18, color: 'var(--text-muted)' }}>Chargement…</div>;
  }

  const chars = play.script.characters;
  const others = chars.filter((c) => c.key !== cfg.myRole);

  const commencer = () => {
    setConfig(play.id, cfg);
    nav(`/repetition/${play.id}/jouer`);
  };
  const memoriser = () => {
    setConfig(play.id, cfg);
    nav(`/repetition/${play.id}/cartes`);
  };

  const modeHelp = MODES.find((m) => m.k === cfg.myLineMode)?.help;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '18px 18px 28px' }} data-screen-label="Répétition — configuration">
      <BackHeader to="/repetition" title="Configuration" sub={play.titre} />

      {/* Mon rôle */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Mon rôle</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {chars.map((c) => (
            <button key={c.key} className={`chip${cfg.myRole === c.key ? ' active' : ''}`}
              onClick={() => setCfg({ ...cfg, myRole: c.key })}>{c.label}</button>
          ))}
        </div>
      </section>

      {/* Voix par personnage */}
      {speechSupported && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Voix des autres personnages</div>
          {frVoices.length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5, background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px' }}>
              Aucune voix française détectée sur cet appareil. La lecture utilisera la voix par défaut. Pour une voix française, installez-en une dans les réglages système de votre téléphone (Accessibilité › Synthèse vocale).
            </div>
          )}
          {others.map((c) => (
            <label key={c.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, fontSize: 14 }}>
              <span style={{ color: 'var(--text-2b)' }}>{c.label}</span>
              <select
                value={cfg.voiceByChar[c.key] ?? ''}
                onChange={(e) => setCfg({ ...cfg, voiceByChar: { ...cfg.voiceByChar, [c.key]: e.target.value } })}
                style={{ maxWidth: '58%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 8, padding: '7px 8px', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
                <option value="">Voix par défaut</option>
                {frVoices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}
              </select>
            </label>
          ))}
        </section>
      )}

      {/* Vitesse & volume */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Lecture</div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13.5, color: 'var(--text-2b)' }}>
          Vitesse : {cfg.rate.toFixed(1)}×
          <input type="range" min={0.5} max={1.5} step={0.1} value={cfg.rate} onChange={(e) => setCfg({ ...cfg, rate: Number(e.target.value) })} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13.5, color: 'var(--text-2b)' }}>
          Volume : {Math.round(cfg.volume * 100)} %
          <input type="range" min={0} max={1} step={0.1} value={cfg.volume} onChange={(e) => setCfg({ ...cfg, volume: Number(e.target.value) })} />
        </label>
      </section>

      {/* Didascalies */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Didascalies</div>
        <Seg value={cfg.didascalieMode} options={DIDA} onChange={(v) => setCfg({ ...cfg, didascalieMode: v })} />
      </section>

      {/* Mode de mes répliques */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Mes répliques</div>
        <Seg value={cfg.myLineMode} options={MODES} onChange={(v) => setCfg({ ...cfg, myLineMode: v })} />
        {modeHelp && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.45 }}>{modeHelp}</div>}
      </section>

      <button className="gold-btn" style={{ padding: '13px 18px', fontSize: 16 }} onClick={commencer}>
        Commencer la lecture →
      </button>
      <button onClick={memoriser}
        style={{ padding: '12px 18px', fontSize: 15, marginTop: -8, borderRadius: 12, cursor: 'pointer', background: 'none', border: '1px solid rgba(212,169,78,.45)', color: 'var(--gold-chip-text)', fontFamily: 'var(--font-title)', fontWeight: 600 }}>
        🎴 Mémoriser mon rôle (cartes)
      </button>
    </div>
  );
}
