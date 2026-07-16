import { useEffect, useMemo, useRef, useState } from 'react';
import { useAI, humanError } from '../../lib/useAI';
import { PIECES } from '../../data/pieces';
import { hasTexte, loadTexte, type PieceTexte } from '../../data/pieceTextes';
import {
  rolesOf, actesForRole, chunksForRole, chunkText, chunkHeader,
  type RoleChar, type Chunk,
} from '../../lib/scriptAnalysis';
import AiText from '../../components/AiText';
import { fieldStyle, Label } from './parts';

type Mode = 'mentions' | 'emotions';

const PIECES_TEXTE = PIECES.filter((p) => hasTexte(p.id)).sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));

interface Res { header: string; text: string; done: boolean; }

export default function AnalyseRole() {
  const { run, stop } = useAI();
  const [running, setRunning] = useState(false);

  const [pieceId, setPieceId] = useState('');
  const [texte, setTexte] = useState<PieceTexte | null>(null);
  const [loading, setLoading] = useState(false);
  const [charKey, setCharKey] = useState('');
  const [mode, setMode] = useState<Mode>('mentions');
  const [sujet, setSujet] = useState('');
  const [acteSel, setActeSel] = useState<number | 'all'>('all');
  const [results, setResults] = useState<Res[]>([]);
  const [ran, setRan] = useState(false);
  const cancel = useRef(false);

  const piece = useMemo(() => PIECES.find((p) => p.id === pieceId), [pieceId]);

  // Charge le texte intégral (déjà hors-ligne) à la sélection de la pièce.
  useEffect(() => {
    if (!pieceId) { setTexte(null); return; }
    let alive = true;
    setLoading(true);
    setTexte(null);
    setCharKey('');
    loadTexte(pieceId).then((t) => { if (alive) { setTexte(t); setLoading(false); } });
    return () => { alive = false; };
  }, [pieceId]);

  const roles: RoleChar[] = useMemo(() => (texte ? rolesOf(texte.blocs) : []), [texte]);
  const actes = useMemo(
    () => (texte && charKey ? actesForRole(texte.blocs, charKey) : []),
    [texte, charKey],
  );
  const chunks: Chunk[] = useMemo(
    () => (texte && charKey ? chunksForRole(texte.blocs, charKey, { acteIndex: acteSel }) : []),
    [texte, charKey, acteSel],
  );
  const roleLabel = roles.find((r) => r.key === charKey)?.label ?? '';

  // Réinitialise l'acte si le personnage change et que l'acte n'existe plus pour lui.
  useEffect(() => { setActeSel('all'); setResults([]); setRan(false); }, [charKey, pieceId]);

  const canRun = !!piece && !!charKey && chunks.length > 0 && (mode !== 'mentions' || !!sujet.trim());

  const messagesFor = (c: Chunk) => {
    const head = chunkHeader(c);
    const corpus = `Répliques de ${roleLabel} :\n\n${chunkText(c)}`;
    if (mode === 'mentions') {
      return [
        { role: 'system' as const, content: "Tu es un assistant dramaturgique rigoureux. On te donne UNIQUEMENT les répliques d'un personnage, extraites d'un acte. Tu repères où il évoque le sujet demandé, y compris de façon implicite (allusion, périphrase, pronom). Tu ne cites que des répliques présentes dans l'extrait — jamais inventées. Français, markdown bref." },
        { role: 'user' as const, content:
          `Pièce « ${piece!.titre} ». Personnage : ${roleLabel}. ${head}.\n\n` +
          `Repère chaque passage où ${roleLabel} évoque « ${sujet.trim()} » (mention directe OU implicite). ` +
          `Pour chacun : **la scène**, puis une **citation exacte** de la réplique (recopiée telle quelle) et une courte glose (1 phrase).\n` +
          `S'il n'y a rien, réponds exactement : « Aucune mention de « ${sujet.trim()} » dans ${head}. »\n\n${corpus}` },
      ];
    }
    return [
      { role: 'system' as const, content: "Tu es un analyste dramaturgique. On te donne UNIQUEMENT les répliques d'un personnage dans un acte. Tu décris son évolution émotionnelle en t'appuyant sur des citations exactes de ses répliques (jamais inventées). Français, markdown bref." },
      { role: 'user' as const, content:
        `Pièce « ${piece!.titre} ». Personnage : ${roleLabel}. ${head}.\n\n` +
        `Décris l'évolution émotionnelle de ${roleLabel} au fil de cet acte, scène par scène (état → bascule → point culminant). ` +
        `Appuie chaque affirmation sur une **citation courte** de ses répliques. Termine par une phrase de synthèse sur l'arc de l'acte.\n` +
        `Remarque : tu ne vois que ses répliques (pas celles des autres) — reste prudent sur les causes.\n\n${corpus}` },
    ];
  };

  const runAll = async () => {
    if (!canRun) return;
    cancel.current = false;
    setRan(true);
    setRunning(true);
    const init = chunks.map((c) => ({ header: chunkHeader(c), text: '', done: false }));
    setResults(init);
    for (let i = 0; i < chunks.length; i++) {
      if (cancel.current) break;
      try {
        await run(messagesFor(chunks[i]), (full) => {
          setResults((prev) => prev.map((r, j) => (j === i ? { ...r, text: full } : r)));
        }, mode === 'mentions' ? 0.2 : 0.5);
      } catch (e) {
        setResults((prev) => prev.map((r, j) => (j === i ? { ...r, text: `⚠️ ${humanError(e)}` } : r)));
      }
      setResults((prev) => prev.map((r, j) => (j === i ? { ...r, done: true } : r)));
    }
    setRunning(false);
  };
  const stopAll = () => { cancel.current = true; stop(); setRunning(false); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
        Interroge le texte intégral de votre rôle. Pour tenir dans les modèles gratuits, l'analyse se fait
        <strong> acte par acte</strong> (une petite requête par acte) — choisissez un acte pour un coût minimal.
      </div>

      <div>
        <Label>Pièce (au texte intégral)</Label>
        <select style={fieldStyle} value={pieceId} onChange={(e) => setPieceId(e.target.value)}>
          <option value="">— choisir une pièce —</option>
          {PIECES_TEXTE.map((p) => <option key={p.id} value={p.id}>{p.titre} — {p.auteur}</option>)}
        </select>
      </div>

      {loading && <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Chargement du texte…</div>}

      {texte && roles.length > 0 && (
        <div>
          <Label>Votre personnage</Label>
          <select style={fieldStyle} value={charKey} onChange={(e) => setCharKey(e.target.value)}>
            <option value="">— choisir un rôle —</option>
            {roles.map((r) => <option key={r.key} value={r.key}>{r.label} — {r.count} répliques</option>)}
          </select>
        </div>
      )}

      {charKey && (
        <>
          {/* Type d'analyse */}
          <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
            {([['mentions', 'Repérer un sujet'], ['emotions', 'Évolution émotionnelle']] as [Mode, string][]).map(([k, label]) => (
              <button key={k} onClick={() => { setMode(k); setResults([]); setRan(false); }}
                style={{ flex: 1, textAlign: 'center', padding: '7px 8px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer', border: 'none', fontWeight: 600, background: mode === k ? 'var(--gold)' : 'transparent', color: mode === k ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
                {label}
              </button>
            ))}
          </div>

          {mode === 'mentions' && (
            <div>
              <Label>Sujet à repérer</Label>
              <input style={fieldStyle} placeholder="ex. son père · la mort · l'argent · l'honneur…" value={sujet} onChange={(e) => setSujet(e.target.value)} />
            </div>
          )}

          <div>
            <Label>Portée</Label>
            <select style={fieldStyle} value={String(acteSel)} onChange={(e) => { setActeSel(e.target.value === 'all' ? 'all' : Number(e.target.value)); setResults([]); setRan(false); }}>
              <option value="all">Toute la pièce (acte par acte — lourd sur modèle gratuit)</option>
              {actes.map((a) => <option key={a.acteIndex} value={a.acteIndex}>{a.acteLabel} — {a.lineCount} répliques</option>)}
            </select>
          </div>

          {chunks.length > 0 && (
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
              ≈ {chunks.length} requête{chunks.length > 1 ? 's' : ''} IA envoyée{chunks.length > 1 ? 's' : ''} à la suite.
            </div>
          )}

          {acteSel === 'all' && chunks.length > 1 && (
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--red-chip-text)', background: 'var(--red-chip-bg, rgba(158,43,58,.15))', border: '1px solid var(--red-chip-border)', borderRadius: 10, padding: '10px 12px' }}>
              ⚠️ « Toute la pièce » enchaîne <strong>{chunks.length} requêtes</strong>. Sur un <strong>modèle gratuit</strong> d'OpenRouter (quota et contexte limités), l'analyse peut être lente, se faire <strong>bloquer</strong> en cours de route (erreurs de limite) ou rester incomplète. Pour un résultat fiable, choisissez plutôt <strong>un acte à la fois</strong>.
            </div>
          )}
        </>
      )}

      {!running ? (
        <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: canRun ? 1 : 0.6 }} disabled={!canRun} onClick={runAll}>
          {ran ? '↻ Relancer' : 'Analyser mon rôle'}
        </button>
      ) : (
        <button onClick={stopAll} style={{ ...fieldStyle, cursor: 'pointer', padding: '11px 18px', fontSize: 15, textAlign: 'center' }}>
          ■ Arrêter
        </button>
      )}

      {results.map((r, i) => (
        <div key={i} className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{r.header}</div>
          {r.text ? <AiText text={r.text} /> : <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{running ? 'En attente…' : '—'}</div>}
        </div>
      ))}

      {ran && !running && results.length > 0 && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
          Les citations sont vérifiables dans le texte intégral (« Lire le texte » sur la fiche de la pièce).
          L'IA peut se tromper — recoupez toujours avec le texte.
        </div>
      )}
    </div>
  );
}
