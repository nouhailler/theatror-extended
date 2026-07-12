import { useMemo, useState } from 'react';
import { useAI, humanError } from '../../lib/useAI';
import { useStore } from '../../store';
import { todayISO } from '../../lib/date';
import { PIECES } from '../../data/pieces';
import { PERSONNAGES as DISTRIBUTION } from '../../data/personnages';
import AiText from '../../components/AiText';
import { fieldStyle, Label } from './parts';

const CONSIGNE = 'Structure ta réponse avec des titres : **Thèmes**, **Personnages**, **Structure**, **Conflits**, **Symboles**, **Évolution dramatique**. Sois concret et concis.';
const PIECES_TRIEES = [...PIECES].sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));

type Mode = 'texte' | 'piece';

export default function Analyse() {
  const { run, busy } = useAI();
  const addEntry = useStore((s) => s.addEntry);
  const [mode, setMode] = useState<Mode>('texte');
  const [texte, setTexte] = useState('');
  const [pieceId, setPieceId] = useState('');
  const [out, setOut] = useState('');
  const [saved, setSaved] = useState(false);

  const piece = useMemo(() => PIECES.find((p) => p.id === pieceId), [pieceId]);
  const peutAnalyser = mode === 'texte' ? !!texte.trim() : !!piece;

  const buildPrompt = (): string => {
    if (mode === 'texte') {
      return `Analyse ce texte de théâtre. ${CONSIGNE}\n\n---\n${texte.trim()}`;
    }
    if (!piece) return '';
    const dist = DISTRIBUTION[piece.id];
    const infos = [
      `« ${piece.titre} » de ${piece.auteur} (${piece.annee}, ${piece.genre}).`,
      `Distribution : ${piece.femmes} femmes / ${piece.hommes} hommes.`,
      piece.resume ? `Résumé : ${piece.resume}` : '',
      dist && dist.length ? `Personnages : ${dist.slice(0, 25).join(', ')}.` : '',
    ].filter(Boolean).join('\n');
    return `Analyse la pièce de théâtre suivante en t'appuyant sur ta connaissance de l'œuvre et sur ces informations :\n\n${infos}\n\n${CONSIGNE}`;
  };

  const analyser = async () => {
    if (!peutAnalyser) return;
    setOut('');
    setSaved(false);
    try {
      await run(
        [
          { role: 'system', content: "Tu es un analyste dramaturgique. Tu produis des analyses claires, structurées et fidèles à l'œuvre, en français." },
          { role: 'user', content: buildPrompt() },
        ],
        (full) => setOut(full),
        0.4,
      );
    } catch (e) {
      setOut(`⚠️ ${humanError(e)}`);
    }
  };

  const copier = () => { void navigator.clipboard?.writeText(out); };
  const versJournal = () => {
    const titre = mode === 'piece' && piece ? `Analyse — ${piece.titre}` : 'Analyse de texte';
    addEntry({ titre, type: 'Idée', date: todayISO(), txt: out });
    setSaved(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Choix de la source */}
      <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
        {([['texte', 'Coller un texte'], ['piece', 'Une pièce du catalogue']] as [Mode, string][]).map(([k, label]) => (
          <button key={k} onClick={() => { setMode(k); setOut(''); }}
            style={{ flex: 1, textAlign: 'center', padding: '7px 8px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer', border: 'none', fontWeight: 600, background: mode === k ? 'var(--gold)' : 'transparent', color: mode === k ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
            {label}
          </button>
        ))}
      </div>

      {mode === 'texte' ? (
        <>
          <div style={{ fontSize: 14.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Collez une scène, une tirade ou un extrait — l'IA en dégage thèmes, structure, conflits et symboles.
          </div>
          <textarea style={{ ...fieldStyle, minHeight: 150, resize: 'vertical' }} placeholder="Collez ici le texte à analyser…" value={texte} onChange={(e) => setTexte(e.target.value)} />
        </>
      ) : (
        <div>
          <Label>Pièce à analyser</Label>
          <select style={fieldStyle} value={pieceId} onChange={(e) => { setPieceId(e.target.value); setOut(''); }}>
            <option value="">— choisir une pièce —</option>
            {PIECES_TRIEES.map((p) => <option key={p.id} value={p.id}>{p.titre} — {p.auteur}</option>)}
          </select>
          {piece && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
              {piece.annee} · {piece.genre} · {piece.femmes}F/{piece.hommes}H{piece.resume ? '' : ' · (pas de résumé — analyse fondée sur la connaissance de l\'œuvre)'}
            </div>
          )}
        </div>
      )}

      <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: busy || !peutAnalyser ? 0.6 : 1 }} disabled={busy || !peutAnalyser} onClick={analyser}>
        {busy ? 'Analyse…' : 'Analyser'}
      </button>

      {out && (
        <div className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AiText text={out} />
          {!busy && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={analyser} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer', padding: '8px 14px', fontSize: 13.5 }}>↻ Régénérer</button>
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
