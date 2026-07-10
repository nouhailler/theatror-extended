import { useState } from 'react';
import { useAI, humanError } from '../../lib/useAI';
import AiText from '../../components/AiText';
import { fieldStyle } from './parts';

export default function Analyse() {
  const { run, busy } = useAI();
  const [texte, setTexte] = useState('');
  const [out, setOut] = useState('');

  const analyser = async () => {
    if (!texte.trim()) return;
    setOut('');
    const prompt = `Analyse ce texte de théâtre. Structure ta réponse avec des titres : **Thèmes**, **Personnages**, **Structure**, **Conflits**, **Symboles**, **Évolution dramatique**. Sois concret et concis.\n\n---\n${texte.trim()}`;
    try {
      await run(
        [
          { role: 'system', content: "Tu es un analyste dramaturgique. Tu produis des analyses claires, structurées, en français." },
          { role: 'user', content: prompt },
        ],
        (full) => setOut(full),
        0.4,
      );
    } catch (e) {
      setOut(`⚠️ ${humanError(e)}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 14.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
        Collez une scène, une tirade ou un extrait — l'IA en dégage thèmes, structure, conflits et symboles.
      </div>
      <textarea
        style={{ ...fieldStyle, minHeight: 150, resize: 'vertical' }}
        placeholder="Collez ici le texte à analyser…"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
      />
      <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: busy || !texte.trim() ? 0.6 : 1 }} disabled={busy || !texte.trim()} onClick={analyser}>
        {busy ? 'Analyse…' : 'Analyser'}
      </button>
      {out && (
        <div className="card card-16" style={{ padding: 16 }}>
          <AiText text={out} />
        </div>
      )}
    </div>
  );
}
