import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { PIECES } from '../data/pieces';
import { CITATIONS, FRISE } from '../data/content';
import { PERSONNAGES } from '../data/characters';
import { DRAMATURGES } from '../data/dramaturges';
import type { Piece } from '../data/types';

interface Question {
  prompt: string;
  sous?: string;
  options: string[];
  answer: string;
  categorie: string;
}

type Niveau = 'Facile' | 'Moyen' | 'Difficile';
const NIVEAUX: { id: Niveau; sous: string; count: number }[] = [
  { id: 'Facile', sous: 'Grands classiques et auteurs célèbres', count: 6 },
  { id: 'Moyen', sous: 'Répertoire élargi : genres, personnages, dates', count: 8 },
  { id: 'Difficile', sous: 'Tout le catalogue, citations et raretés', count: 10 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistinct(pool: string[], answer: string, n: number): string[] {
  const others = shuffle(Array.from(new Set(pool)).filter((x) => x !== answer)).slice(0, n);
  return shuffle([answer, ...others]);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function siecle(y: number): string {
  const s = Math.floor((Math.abs(y) - 1) / 100) + 1;
  return y < 0 ? `${s}ᵉ s. av. J.-C.` : `${s}ᵉ siècle`;
}

// Pièces « célèbres » = celles référencées par les personnages, citations et la frise.
const FAMOUS = new Set<string>([
  ...PERSONNAGES.map((c) => c.pieceId).filter(Boolean) as string[],
  ...CITATIONS.map((c) => c.pieceId).filter(Boolean) as string[],
  ...FRISE.map((f) => f.pieceId).filter(Boolean) as string[],
]);
const TITRE_BY_ID = new Map(PIECES.map((p) => [p.id, p.titre]));

function buildQuestions(niveau: Niveau): Question[] {
  const cfg = NIVEAUX.find((n) => n.id === niveau)!;
  // Pool de pièces selon le niveau
  const famous = PIECES.filter((p) => FAMOUS.has(p.id));
  const pool: Piece[] =
    niveau === 'Facile' ? famous :
    niveau === 'Moyen' ? PIECES.filter((p) => FAMOUS.has(p.id) || p.difficulte <= 2) :
    PIECES;

  const auteurs = Array.from(new Set(pool.map((p) => p.auteur)));
  const titres = pool.map((p) => p.titre);
  const genres = Array.from(new Set(PIECES.map((p) => cap(p.genre))));
  const gen: (() => Question)[] = [];

  // ── Générateurs communs à tous les niveaux ──
  const addAuteurPiece = () => { const p = shuffle(pool)[0]; return { categorie: 'Auteur', prompt: `Qui a écrit « ${p.titre} » ?`, options: pickDistinct(auteurs, p.auteur, 3), answer: p.auteur }; };
  const addCitationAuteur = () => { const c = shuffle(CITATIONS)[0]; return { categorie: 'Citation', prompt: 'De qui est cette réplique ?', sous: c.txt, options: pickDistinct(CITATIONS.map((x) => x.auteur), c.auteur, 3), answer: c.auteur }; };
  const addPersoPiece = () => { const c = shuffle(PERSONNAGES)[0]; return { categorie: 'Personnage', prompt: `Dans quelle pièce apparaît ${c.nom} ?`, options: pickDistinct(PERSONNAGES.map((x) => x.piece), c.piece, 3), answer: c.piece }; };
  gen.push(addAuteurPiece, addCitationAuteur, addPersoPiece);

  // ── Moyen et + ──
  if (niveau !== 'Facile') {
    const addGenre = () => { const p = shuffle(pool.filter((x) => x.genre))[0]; return { categorie: 'Genre', prompt: `À quel genre appartient « ${p.titre} » ?`, options: pickDistinct(genres, cap(p.genre), 3), answer: cap(p.genre) }; };
    const addPersoEmploi = () => { const c = shuffle(PERSONNAGES.filter((x) => x.emploi))[0]; return { categorie: 'Personnage', prompt: `Quel personnage correspond à ce rôle : « ${c.emploi} » ?`, options: pickDistinct(PERSONNAGES.map((x) => x.nom), c.nom, 3), answer: c.nom }; };
    const addDramaturge = () => { const d = shuffle(DRAMATURGES.filter((x) => Number.isFinite(x.naissance)))[0]; return { categorie: 'Dramaturge', prompt: `À quel siècle appartient ${d.nom} ?`, options: pickDistinct(DRAMATURGES.map((x) => siecle(x.naissance)), siecle(d.naissance), 3), answer: siecle(d.naissance) }; };
    gen.push(addGenre, addPersoEmploi, addDramaturge);
  }

  // ── Difficile ──
  if (niveau === 'Difficile') {
    const citAvecPiece = CITATIONS.filter((c) => c.pieceId && TITRE_BY_ID.has(c.pieceId));
    const addCitationPiece = () => { const c = shuffle(citAvecPiece)[0]; const t = TITRE_BY_ID.get(c.pieceId!)!; return { categorie: 'Citation', prompt: 'De quelle pièce est extraite cette réplique ?', sous: c.txt, options: pickDistinct(titres, t, 3), answer: t }; };
    const addPersoAuteur = () => { const c = shuffle(PERSONNAGES)[0]; return { categorie: 'Personnage', prompt: `Quel auteur a créé le personnage de ${c.nom} ?`, options: pickDistinct(PERSONNAGES.map((x) => x.auteur), c.auteur, 3), answer: c.auteur }; };
    const addChrono = () => { const f = shuffle(FRISE)[0]; return { categorie: 'Chronologie', prompt: `En quelle année : ${f.titre} ?`, options: pickDistinct(FRISE.map((x) => x.an), f.an, 3), answer: f.an }; };
    gen.push(addCitationPiece, addPersoAuteur, addChrono, addChrono);
  }

  // Tire `count` questions en variant les types, sans doublon de prompt
  const qs: Question[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (qs.length < cfg.count && guard < 400) {
    guard++;
    const q = shuffle(gen)[0]();
    const key = `${q.prompt}|${q.sous ?? ''}|${q.answer}`;
    if (seen.has(key)) continue;
    seen.add(key);
    qs.push(q);
  }
  return qs;
}

export default function Quiz() {
  const [niveau, setNiveau] = useState<Niveau | null>(null);
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => (niveau ? buildQuestions(niveau) : []), [niveau, seed]);
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const restart = (n: Niveau | null) => { setNiveau(n); setIdx(0); setChoice(null); setScore(0); setDone(false); };

  // ── Écran de choix du niveau ──
  if (!niveau) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Quiz — niveau">
        <BackHeader to="/explorer" title="Quiz" sub="Testez vos connaissances du théâtre" />
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Choisissez un niveau</div>
        {NIVEAUX.map((n) => (
          <div key={n.id} onClick={() => restart(n.id)} className="card card-16 card-tap" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 600 }}>{n.id}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 3 }}>{n.sous}</div>
              <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 4 }}>{n.count} questions</div>
            </div>
            <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
          </div>
        ))}
      </div>
    );
  }

  const q = questions[idx];

  const answer = (opt: string) => {
    if (choice !== null) return;
    setChoice(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) setDone(true);
    else { setIdx((i) => i + 1); setChoice(null); }
  };

  const replay = () => { setSeed((s) => s + 1); setIdx(0); setChoice(null); setScore(0); setDone(false); };

  // ── Écran résultat ──
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const mot = pct >= 80 ? 'Bravo, vous connaissez votre théâtre !' : pct >= 50 ? 'Bien joué — encore un peu de révisions.' : 'À retravailler : explorez l’encyclopédie !';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Quiz — résultat">
        <BackHeader to="/explorer" title="Quiz" />
        <div className="card card-16" style={{ padding: '28px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Niveau {niveau} · votre score</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 44, fontWeight: 700, color: 'var(--gold)' }}>{score} / {questions.length}</div>
          <div style={{ fontSize: 15, color: 'var(--text-2b)' }}>{mot}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <button className="gold-btn" style={{ padding: '11px 26px', fontSize: 15 }} onClick={replay}>Rejouer</button>
          <button onClick={() => restart(null)} style={{ padding: '11px 22px', fontSize: 15, borderRadius: 999, background: 'transparent', border: '1px solid var(--b-rest2)', color: 'var(--text)', cursor: 'pointer' }}>Changer de niveau</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Quiz">
      <BackHeader to="/explorer" title="Quiz" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{niveau} · {q.categorie} · {idx + 1} / {questions.length}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Score : {score}</div>
      </div>

      <div style={{ height: 4, borderRadius: 999, background: 'var(--bg-field)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(idx / questions.length) * 100}%`, background: 'var(--gold)', transition: 'width .2s ease' }} />
      </div>

      <div style={{ fontFamily: 'var(--font-title)', fontSize: 21, fontWeight: 600, lineHeight: 1.25 }}>{q.prompt}</div>
      {q.sous && <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 16, color: 'var(--text-2b)', lineHeight: 1.45, borderLeft: '2px solid var(--gold)', paddingLeft: 12 }}>{q.sous}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map((opt) => {
          const revealed = choice !== null;
          const isAnswer = opt === q.answer;
          const isChoice = opt === choice;
          let border = 'var(--b-rest2)';
          let bg = 'var(--bg-card)';
          if (revealed && isAnswer) { border = 'var(--gold)'; bg = 'rgba(212,169,78,.12)'; }
          else if (revealed && isChoice) { border = 'var(--red-chip-border)'; bg = 'rgba(158,43,58,.15)'; }
          return (
            <button key={opt} onClick={() => answer(opt)} disabled={revealed}
              style={{ textAlign: 'left', padding: '13px 16px', borderRadius: 12, border: `1px solid ${border}`, background: bg, color: 'var(--text)', fontSize: 15.5, fontFamily: 'var(--font-body)', cursor: revealed ? 'default' : 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <span>{opt}</span>
              {revealed && isAnswer && <span style={{ color: 'var(--gold)' }}>✓</span>}
              {revealed && isChoice && !isAnswer && <span style={{ color: 'var(--red-chip-text)' }}>✕</span>}
            </button>
          );
        })}
      </div>

      {choice !== null && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="gold-btn" style={{ padding: '10px 24px', fontSize: 15 }} onClick={next}>
            {idx + 1 >= questions.length ? 'Voir le score' : 'Suivant →'}
          </button>
        </div>
      )}
    </div>
  );
}
