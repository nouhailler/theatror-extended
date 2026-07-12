import { useState } from 'react';
import { useAI, humanError } from '../../lib/useAI';
import { useStore } from '../../store';
import { todayISO } from '../../lib/date';
import { DRAMATURGES } from '../../data/dramaturges';
import AiText from '../../components/AiText';
import { fieldStyle, Label } from './parts';

// article = « un »/« une » pour une phrase correcte (« un dialogue », « une scène comique »).
const TYPES = [
  { v: 'scène comique', label: 'Scène comique', art: 'une' },
  { v: 'dialogue', label: 'Dialogue', art: 'un' },
  { v: 'scène tragique', label: 'Scène tragique', art: 'une' },
  { v: 'monologue', label: 'Monologue', art: 'un' },
  { v: "exercice d'improvisation", label: "Exercice d'impro", art: 'un' },
];
const TONS = ['libre', 'classique (vers)', 'contemporain', 'absurde', 'poétique'];
const LONGUEURS = [
  { v: 'courte', label: 'Court', hint: 'une demi-page environ' },
  { v: 'moyenne', label: 'Moyen', hint: 'une page environ' },
  { v: 'longue', label: 'Long', hint: 'deux pages environ' },
];
const AUTEURS = [...DRAMATURGES].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

export default function Generateur() {
  const { run, busy } = useAI();
  const addEntry = useStore((s) => s.addEntry);
  const [type, setType] = useState(TYPES[0]);
  const [ton, setTon] = useState(TONS[0]);
  const [longueur, setLongueur] = useState(LONGUEURS[1]);
  const [maniere, setManiere] = useState(''); // id dramaturge ou ''
  const [persos, setPersos] = useState('');
  const [consigne, setConsigne] = useState('');
  const [out, setOut] = useState('');
  const [saved, setSaved] = useState(false);

  const generer = async () => {
    setOut('');
    setSaved(false);
    const dram = maniere ? DRAMATURGES.find((d) => d.id === maniere) : undefined;
    const prompt = [
      `Écris ${type.art} ${type.v} pour le théâtre, en français.`,
      persos.trim() ? `Personnages : ${persos.trim()}.` : 'Invente les personnages.',
      `Ton / style : ${ton}.`,
      dram ? `À la manière de ${dram.nom}${dram.style ? ` — ${dram.style.replace(/\.$/, '')}` : ''}.` : '',
      consigne.trim() ? `Consigne : ${consigne.trim()}.` : '',
      `Longueur : ${longueur.hint}.`,
      'Format scène : noms de personnages en MAJUSCULES en début de réplique, didascalies entre parenthèses. Le texte doit être vivant et jouable.',
    ].filter(Boolean).join(' ');
    try {
      await run(
        [
          { role: 'system', content: "Tu es un dramaturge francophone. Tu écris des textes de théâtre vivants, jouables et bien construits, au style soigné. Respecte le format scénique, le ton et les personnages demandés." },
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
    addEntry({ titre: `Texte généré — ${type.v}`, type: 'Idée', date: todayISO(), txt: out });
    setSaved(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>Type</Label>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {TYPES.map((t) => (
            <button key={t.v} className={`chip${type.v === t.v ? ' active' : ''}`} onClick={() => setType(t)}>{t.label}</button>
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
        <div style={{ flex: 1 }}>
          <Label>Longueur</Label>
          <select style={fieldStyle} value={longueur.v} onChange={(e) => setLongueur(LONGUEURS.find((l) => l.v === e.target.value)!)}>
            {LONGUEURS.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <Label>À la manière de (optionnel)</Label>
        <select style={fieldStyle} value={maniere} onChange={(e) => setManiere(e.target.value)}>
          <option value="">— libre —</option>
          {AUTEURS.map((d) => <option key={d.id} value={d.id}>{d.nom}</option>)}
        </select>
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
              <button onClick={generer} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer', padding: '8px 14px', fontSize: 13.5 }}>↻ Régénérer</button>
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
