import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

interface Step {
  path: string;
  titre: string;
  txt: string;
}

// 10 étapes qui naviguent réellement l'app.
const STEPS: Step[] = [
  { path: '/', titre: 'Accueil', txt: 'Chaque jour : un théâtre, une citation et une pièce à découvrir, plus des accès rapides vers vos outils.' },
  { path: '/pieces', titre: 'Pièces & filtres', txt: 'Trouvez la pièce idéale : durée, distribution hommes/femmes, genre, décor, domaine public… Touchez ☆ pour la garder en favori.' },
  { path: '/explorer', titre: 'Explorer', txt: 'Le hub de découverte : encyclopédie, frise chronologique, carte du monde et collections thématiques.' },
  { path: '/explorer/encyclopedie', titre: 'Encyclopédie', txt: 'Dramaturges, histoire, mouvements, genres, métiers… Touchez un portrait pour ouvrir sa fiche complète.' },
  { path: '/explorer/dramaturge/moliere', titre: 'Fiche dramaturge', txt: 'Biographie, chronologie, citation, œuvres majeures et influence — ici, Molière.' },
  { path: '/explorer/frise', titre: 'Frise chronologique', txt: '2 500 ans de théâtre : de Thespis à Beckett, ères colorées et événements clés.' },
  { path: '/explorer/carte', titre: 'Carte du monde', txt: "Grands théâtres, festivals, traditions et écoles — d'Épidaure à Avignon." },
  { path: '/scene?seg=mono', titre: "Scène — l'atelier", txt: 'Monologues filtrés pour vos auditions, citations classées par thème et glossaire des termes du théâtre.' },
  { path: '/journal', titre: 'Journal du comédien', txt: 'Votre carnet de bord : répétitions, progrès, difficultés et idées de mise en scène.' },
  { path: '/collection', titre: 'Ma collection', txt: 'Tous vos favoris — pièces, auteurs, citations, monologues — réunis au même endroit. Bonne visite !' },
];

export default function GuidedTour() {
  const step = useStore((s) => s.tourStep);
  const setStep = useStore((s) => s.setTourStep);
  const nav = useNavigate();

  // Synchronise la route avec l'étape courante.
  useEffect(() => {
    if (step !== null && STEPS[step]) nav(STEPS[step].path);
  }, [step, nav]);

  if (step === null) return null;
  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const end = () => setStep(null);
  const prev = () => { if (step > 0) setStep(step - 1); };
  const next = () => {
    if (!isLast) setStep(step + 1);
    else { setStep(null); nav('/'); }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 66,
        zIndex: 55,
        background: 'var(--bg-demo)',
        border: '1px solid rgba(212,169,78,.55)',
        borderRadius: 14,
        padding: '13px 16px 14px',
        boxShadow: 'var(--sh-demo)',
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>
          Visite guidée · {step + 1} / {STEPS.length}
        </div>
        <button onClick={end} aria-label="Quitter la visite"
          style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: 19, lineHeight: 1, background: 'none', border: 'none' }}>
          ×
        </button>
      </div>
      <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600 }}>{s.titre}</div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>{s.txt}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <button onClick={prev} disabled={step === 0}
          style={{
            cursor: step === 0 ? 'default' : 'pointer',
            fontSize: 14,
            color: step === 0 ? '#5a4c44' : 'var(--gold-chip-text)',
            padding: '6px 4px',
            background: 'none',
            border: 'none',
          }}>
          ← Précédent
        </button>
        <button onClick={next} className="gold-btn" style={{ padding: '8px 20px', fontSize: 14 }}>
          {isLast ? 'Terminer' : 'Suivant →'}
        </button>
      </div>
    </div>
  );
}
