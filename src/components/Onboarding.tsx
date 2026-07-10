import { useStore } from '../store';

const gold = '#d4a94e';
const dim = 'rgba(212,169,78,.25)';

interface Ligne {
  titre: string;
  txt: string;
}

const DECOUVRIR: Ligne[] = [
  { titre: 'Pièces & filtres', txt: 'Par durée, distribution, genre, décor, domaine public…' },
  { titre: 'Encyclopédie & fiches', txt: 'Dramaturges, mouvements, genres, métiers — avec portraits.' },
  { titre: 'Frise chronologique', txt: 'De Thespis à Beckett, ère par ère.' },
  { titre: 'Carte & collections', txt: 'Grands théâtres, festivals, sélections thématiques.' },
];

const TRAVAILLER: Ligne[] = [
  { titre: "Monologues d'audition", txt: 'Filtrés par durée, émotion, homme/femme, niveau.' },
  { titre: 'Citations & glossaire', txt: 'Des milliers de répliques et tous les termes du théâtre.' },
  { titre: 'Favoris ☆ → Ma collection', txt: "Touchez l'étoile sur une pièce, un auteur, une citation." },
  { titre: 'Journal du comédien', txt: 'Répétitions, progrès, idées de mise en scène.' },
];

function Barres({ lignes, couleur }: { lignes: Ligne[]; couleur: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {lignes.map((l) => (
        <div key={l.titre} style={{ display: 'flex', gap: 13 }}>
          <div style={{ width: 5, borderRadius: 3, background: couleur, flex: 'none' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{l.titre}</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.45 }}>{l.txt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Onboarding() {
  const step = useStore((s) => s.onbStep);
  const next = useStore((s) => s.onbNext);
  const finish = useStore((s) => s.onbFinish);
  const startTour = useStore((s) => s.startTour);

  if (step === null) return null;
  const isLast = step === 2;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 60,
        background: 'radial-gradient(620px 420px at 50% 12%,#2e1922 0%,#150d12 72%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 26px 28px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 'none' }}>
        <button onClick={finish}
          style={{ cursor: 'pointer', fontSize: 14, fontStyle: 'italic', color: 'var(--text-muted)', padding: '4px 6px', background: 'none', border: 'none' }}>
          Passer
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
            <div style={{ width: 88, height: 88, borderRadius: 999, border: '1px solid rgba(212,169,78,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: 44, fontWeight: 700, color: gold }}>T</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 30, fontWeight: 700, letterSpacing: 3 }}>THEATHROR</div>
              <div style={{ fontSize: 12.5, letterSpacing: 2.5, textTransform: 'uppercase', color: gold, marginTop: 5 }}>Le compagnon du comédien</div>
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 290 }}>
              Encyclopédie du théâtre, bibliothèque de pièces, atelier du comédien et carnet de bord — tout en un.
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: gold }}>1 · Découvrir</div>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 26, fontWeight: 700, marginTop: 4 }}>2 500 ans de théâtre</div>
            </div>
            <Barres lignes={DECOUVRIR} couleur={gold} />
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: gold }}>2 · Travailler</div>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 26, fontWeight: 700, marginTop: 4 }}>Votre atelier</div>
            </div>
            <Barres lignes={TRAVAILLER} couleur="#9e2b3a" />
          </div>
        )}
      </div>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, paddingTop: 18 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: step === i ? gold : dim }} />
          ))}
        </div>
        {!isLast ? (
          <button onClick={next} className="gold-btn" style={{ padding: '12px 44px', fontSize: 15.5 }}>Continuer</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center' }}>
            <button onClick={startTour} className="gold-btn" style={{ padding: '12px 34px', fontSize: 15.5 }}>Lancer la visite guidée</button>
            <button onClick={finish}
              style={{ cursor: 'pointer', border: '1px solid rgba(212,169,78,.45)', color: 'var(--gold-chip-text)', borderRadius: 999, padding: '11px 34px', fontSize: 15, background: 'none' }}>
              Explorer par moi-même
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
