import { useState } from 'react';
import { useAI, humanError } from '../../lib/useAI';
import { useStore } from '../../store';
import { todayISO } from '../../lib/date';
import AiText from '../../components/AiText';
import { fieldStyle, Label } from './parts';

const TYPES = [
  { v: 'scène comique', label: 'Scène comique' },
  { v: 'dialogue', label: 'Dialogue' },
  { v: 'scène tragique', label: 'Scène tragique' },
  { v: 'monologue', label: 'Monologue' },
  { v: "exercice d'improvisation", label: "Exercice d'impro" },
];
const TONS = ['libre', 'classique (vers)', 'contemporain', 'absurde', 'poétique'];

export default function Generateur() {
  const { run, busy } = useAI();
  const addEntry = useStore((s) => s.addEntry);
  const [type, setType] = useState(TYPES[0].v);
  const [ton, setTon] = useState(TONS[0]);
  const [persos, setPersos] = useState('');
  const [consigne, setConsigne] = useState('');
  const [out, setOut] = useState('');
  const [saved, setSaved] = useState(false);

  const generer = async () => {
    setOut('');
    setSaved(false);
    const prompt = [
      `Écris ${type === "exercice d'improvisation" ? 'un' : 'une'} ${type} pour le théâtre, en français.`,
      persos.trim() ? `Personnages : ${persos.trim()}.` : 'Invente les personnages.',
      `Ton / style : ${ton}.`,
      consigne.trim() ? `Consigne : ${consigne.trim()}.` : '',
      'Format scène : noms de personnages en majuscules, répliques, et didascalies entre parenthèses. Longueur : une page environ.',
    ].filter(Boolean).join(' ');
    try {
      await run(
        [
          { role: 'system', content: "Tu es un dramaturge francophone. Tu écris des textes de théâtre vivants, jouables, au style soigné." },
          { role: 'user', content: prompt },
        ],
        (full) => setOut(full),
        0.9,
      );
    } catch (e) {
      setOut(`⚠️ ${humanError(e)}`);
    }
  };

  const copier = () => { void navigator.clipboard?.writeText(out); };
  const versJournal = () => {
    addEntry({ titre: `Texte généré — ${type}`, type: 'Idée', date: todayISO(), txt: out });
    setSaved(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>Type</Label>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {TYPES.map((t) => (
            <button key={t.v} className={`chip${type === t.v ? ' active' : ''}`} onClick={() => setType(t.v)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Label>Ton</Label>
          <select style={fieldStyle} value={ton} onChange={(e) => setTon(e.target.value)}>
            {TONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <Label>Personnages (optionnel)</Label>
        <input style={fieldStyle} placeholder="ex. une reine, un fou du roi" value={persos} onChange={(e) => setPersos(e.target.value)} />
      </div>

      <div>
        <Label>Consigne / thème (optionnel)</Label>
        <textarea style={{ ...fieldStyle, minHeight: 70, resize: 'vertical' }} placeholder="ex. une dispute sur un héritage qui tourne au comique" value={consigne} onChange={(e) => setConsigne(e.target.value)} />
      </div>

      <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={generer}>
        {busy ? 'Génération…' : 'Générer le texte'}
      </button>

      {out && (
        <div className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AiText text={out} />
          {!busy && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={copier} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer', padding: '8px 14px', fontSize: 13.5 }}>Copier</button>
              <button onClick={versJournal} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer', padding: '8px 14px', fontSize: 13.5, color: saved ? 'var(--gold)' : 'var(--text)' }}>
                {saved ? 'Ajouté au Journal ✓' : 'Ajouter au Journal'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
