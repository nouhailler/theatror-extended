import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { PIECES } from '../data/pieces';
import { CITATIONS, FRISE } from '../data/content';
import { PERSONNAGES } from '../data/characters';

interface Question {
  prompt: string;
  sous?: string;
  options: string[];
  answer: string;
  categorie: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistinct(pool: string[], answer: string, n: number): string[] {
  const others = shuffle(pool.filter((x) => x !== answer)).slice(0, n);
  return shuffle([answer, ...others]);
}

function buildQuestions(): Question[] {
  const auteurs = Array.from(new Set(PIECES.map((p) => p.auteur)));
  const qs: Question[] = [];

  // Auteur d'une pièce
  shuffle(PIECES).slice(0, 3).forEach((p) => {
    qs.push({
      categorie: 'Auteur',
      prompt: `Qui a écrit « ${p.titre} » ?`,
      options: pickDistinct(auteurs, p.auteur, 3),
      answer: p.auteur,
    });
  });

  // Citation → auteur (nom avant le tiret dans src)
  shuffle(CITATIONS).slice(0, 2).forEach((c) => {
    const nom = c.src.split('—')[0].trim();
    const noms = Array.from(new Set(CITATIONS.map((x) => x.src.split('—')[0].trim())));
    qs.push({
      categorie: 'Citation',
      prompt: 'De qui est cette réplique ?',
      sous: c.txt,
      options: pickDistinct(noms, nom, 3),
      answer: nom,
    });
  });

  // Chronologie
  shuffle(FRISE).slice(0, 2).forEach((f) => {
    const ans = Array.from(new Set(FRISE.map((x) => x.an)));
    qs.push({
      categorie: 'Chronologie',
      prompt: `En quelle année : ${f.titre} ?`,
      options: pickDistinct(ans, f.an, 3),
      answer: f.an,
    });
  });

  // Personnage → pièce
  shuffle(PERSONNAGES).slice(0, 2).forEach((c) => {
    const pieces = Array.from(new Set(PERSONNAGES.map((x) => x.piece)));
    qs.push({
      categorie: 'Personnage',
      prompt: `Dans quelle pièce apparaît ${c.nom} ?`,
      options: pickDistinct(pieces, c.piece, 3),
      answer: c.piece,
    });
  });

  return shuffle(qs);
}

export default function Quiz() {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => buildQuestions(), [seed]);
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const answer = (opt: string) => {
    if (choice !== null) return;
    setChoice(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setChoice(null);
    }
  };

  const replay = () => {
    setSeed((s) => s + 1);
    setIdx(0);
    setChoice(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const mot = pct >= 80 ? 'Bravo, vous connaissez votre théâtre !' : pct >= 50 ? 'Bien joué — encore un peu de révisions.' : 'À retravailler : explorez l’encyclopédie !';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Quiz — résultat">
        <BackHeader to="/explorer" title="Quiz" />
        <div className="card card-16" style={{ padding: '28px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Votre score</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 44, fontWeight: 700, color: 'var(--gold)' }}>{score} / {questions.length}</div>
          <div style={{ fontSize: 15, color: 'var(--text-2b)' }}>{mot}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="gold-btn" style={{ padding: '11px 26px', fontSize: 15 }} onClick={replay}>Rejouer</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Quiz">
      <BackHeader to="/explorer" title="Quiz" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{q.categorie} · {idx + 1} / {questions.length}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Score : {score}</div>
      </div>

      {/* Barre de progression */}
      <div style={{ height: 4, borderRadius: 999, background: 'var(--bg-field)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((idx) / questions.length) * 100}%`, background: 'var(--gold)', transition: 'width .2s ease' }} />
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
