import { useStore } from '../store';
import { demoSteps } from '../data/help';
import type { DemoMode } from '../data/help';

interface Choix {
  mode: DemoMode;
  titre: string;
  txt: string;
}

const CHOIX: Choix[] = [
  {
    mode: 'forts',
    titre: 'Les temps forts',
    txt: "L'essentiel de l'app : les pièces, le mode répétition, l'atelier, l'encyclopédie et votre carnet de bord.",
  },
  {
    mode: 'complet',
    titre: 'La visite complète',
    txt: 'Toutes les sections, une par une, sans en sauter aucune.',
  },
];

// Choix de la visite, affiché quand on lance le mode démo (menu ☰, aide « ? »,
// réglages ou fin de l'introduction).
export default function TourPicker() {
  const pick = useStore((s) => s.pickTour);
  const cancel = useStore((s) => s.cancelTourPick);

  return (
    <div
      onClick={cancel}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 58,
        background: 'rgba(0,0,0,.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 360,
          background: 'var(--bg-demo)',
          border: '1px solid rgba(212,169,78,.55)',
          borderRadius: 16,
          padding: '18px 18px 16px',
          boxShadow: 'var(--sh-demo)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Mode démo</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 21, fontWeight: 700, marginTop: 3 }}>
            Quelle visite ?
          </div>
        </div>

        {CHOIX.map((c) => (
          <div
            key={c.mode}
            onClick={() => pick(c.mode)}
            className="card-tap"
            style={{
              cursor: 'pointer',
              border: '1px solid rgba(212,169,78,.35)',
              borderRadius: 12,
              padding: '12px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600 }}>{c.titre}</span>
              <span style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--text-drawer-note)', whiteSpace: 'nowrap' }}>
                {demoSteps(c.mode).length} étapes
              </span>
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.45, marginTop: 3 }}>{c.txt}</div>
          </div>
        ))}

        <button
          onClick={cancel}
          style={{
            cursor: 'pointer',
            alignSelf: 'center',
            fontSize: 14,
            color: 'var(--text-muted)',
            padding: '4px 8px',
            background: 'none',
            border: 'none',
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
