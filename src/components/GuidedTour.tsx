import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { DEMO_STEPS, helpById } from '../data/help';

// Mode démo : parcours qui traverse réellement l'application, section par
// section. Le texte de chaque étape vient de l'aide contextuelle (help.ts),
// pour une seule source de vérité.
export default function GuidedTour() {
  const step = useStore((s) => s.tourStep);
  const setStep = useStore((s) => s.setTourStep);
  const nav = useNavigate();

  // Synchronise la route avec l'étape courante.
  useEffect(() => {
    if (step !== null && DEMO_STEPS[step]) nav(DEMO_STEPS[step].path);
  }, [step, nav]);

  if (step === null) return null;
  const demo = DEMO_STEPS[step];
  const entry = helpById(demo.helpId);
  if (!entry) return null;
  const isLast = step === DEMO_STEPS.length - 1;

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
          Mode démo · {step + 1} / {DEMO_STEPS.length}
        </div>
        <button onClick={end} aria-label="Quitter la démo"
          style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: 19, lineHeight: 1, background: 'none', border: 'none' }}>
          ×
        </button>
      </div>
      <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600 }}>{entry.title}</div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>{entry.resume}</div>
      {entry.tips[0] && (
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.45, display: 'flex', gap: 7 }}>
          <span style={{ color: 'var(--gold)', flex: 'none' }}>›</span>
          <span>{entry.tips[0]}</span>
        </div>
      )}
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
