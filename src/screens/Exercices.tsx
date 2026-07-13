import { useMemo, useState, type ReactNode } from 'react';
import { BackHeader } from '../components/ui';
import { EXERCICES, type ExerciceCategorie } from '../data/exercices';

// Petit dessin (line-art) illustrant chaque catégorie d'exercice.
function CatIcon({ cat }: { cat: ExerciceCategorie }) {
  const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const dots = (cx: number) => <circle cx={cx} cy="10" r="1" fill="currentColor" />;
  const paths: Record<ExerciceCategorie, ReactNode> = {
    Respiration: <><path {...P} d="M3 8h10a3 3 0 1 0 -3 -3" /><path {...P} d="M3 12h14a3 3 0 1 1 -3 3" /><path {...P} d="M3 16h7" /></>,
    Diction: <><path {...P} d="M4 5h16v10h-9l-4 3v-3H4z" />{dots(9)}{dots(12)}{dots(15)}</>,
    Articulation: <><path {...P} d="M4 12q8 -6 16 0" /><path {...P} d="M4 12q8 6 16 0" /><path {...P} d="M8 10.2v1.8M12 9.4v3M16 10.2v1.8" /></>,
    Concentration: <><circle {...P} cx="12" cy="12" r="8.5" /><circle {...P} cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></>,
    Improvisation: <><path {...P} d="M9 15.5a5 5 0 1 1 6 0c-.9.7-1 1.3-1 2.5h-4c0-1.2-.1-1.8-1-2.5z" /><path {...P} d="M10 20h4M10.6 22h2.8" /></>,
    'Émotions': <><circle {...P} cx="12" cy="12" r="8.5" /><path {...P} d="M8.6 9.8h.01M15.4 9.8h.01" /><path {...P} d="M8 15q2 2 4 0" /><path {...P} d="M12 15q2 -2 4 0" /></>,
    Regard: <><path {...P} d="M2 12q10 -7 20 0q-10 7 -20 0z" /><circle {...P} cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
    Posture: <><circle {...P} cx="12" cy="4.5" r="2" /><path {...P} d="M12 6.5v7.5M12 9l-4 3M12 9l4 3M12 14l-3 6M12 14l3 6" /></>,
    'Mémoire': <><circle {...P} cx="12" cy="12" r="8.5" /><path {...P} d="M12 8.2a3.8 3.8 0 1 1 -3.4 5.7a2.3 2.3 0 1 1 2.6 -3.3a1 1 0 1 1 -.8 1.4" /></>,
    'Écoute': <><path {...P} d="M8 8.5a4 4 0 1 1 6.5 3.1c-1.3 1-1.6 1.6-1.6 3a2 2 0 1 1 -3.6 -1.2" /><path {...P} d="M9.3 9.2a1.6 1.6 0 0 1 2.7 1" /></>,
  };
  return (
    <div style={{ width: 40, height: 40, flex: 'none', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', background: 'var(--bg-field)', border: '1px solid var(--b-chip)' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>{paths[cat]}</svg>
    </div>
  );
}

const CAT_ORDER: ExerciceCategorie[] = [
  'Respiration', 'Diction', 'Articulation', 'Concentration', 'Improvisation',
  'Émotions', 'Regard', 'Posture', 'Mémoire', 'Écoute',
];

const NIVEAU_COLOR: Record<string, string> = {
  Débutant: '#8e9e5a',
  Intermédiaire: '#d4a94e',
  Avancé: '#9e2b3a',
};

export default function Exercices() {
  const [cat, setCat] = useState<ExerciceCategorie | null>(null);
  const [ouvert, setOuvert] = useState<string | null>(null);

  const cats = useMemo(
    () => CAT_ORDER.filter((c) => EXERCICES.some((e) => e.categorie === c)),
    [],
  );
  const list = useMemo(
    () => (cat ? EXERCICES.filter((e) => e.categorie === cat) : EXERCICES),
    [cat],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Exercices d'acteur">
      <BackHeader to="/explorer" title="Exercices d'acteur" sub="L'entraînement du comédien, catégorie par catégorie" />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {cats.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{EXERCICES.filter((e) => e.categorie === c).length}</span></button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} exercice{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((e) => {
          const open = ouvert === e.id;
          return (
            <div key={e.id} className="card card-tap" onClick={() => setOuvert(open ? null : e.id)}
              style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CatIcon cat={e.categorie} />
                <div style={{ flex: 1, fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600 }}>{e.titre}</div>
                <span style={{ fontSize: 18, color: 'var(--gold)', flex: 'none', transition: 'transform .15s', transform: open ? 'rotate(90deg)' : 'none' }}>›</span>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{e.categorie}</span>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{e.duree}</span>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{e.solo ? 'Seul' : 'En groupe'}</span>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, background: 'var(--red-chip-bg)', border: `1px solid ${NIVEAU_COLOR[e.niveau]}`, color: 'var(--red-chip-text)' }}>{e.niveau}</span>
              </div>

              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>{e.objectif}</div>

              {open && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Déroulé</div>
                  <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {e.etapes.map((s, i) => (
                      <li key={i} style={{ fontSize: 14.5, color: 'var(--text-2b)', lineHeight: 1.5 }}>{s}</li>
                    ))}
                  </ol>
                  {e.conseil && (
                    <div style={{ borderLeft: '2px solid var(--gold)', padding: '2px 0 2px 12px', fontSize: 14, fontStyle: 'italic', color: 'var(--text-2)' }}>
                      <span style={{ color: 'var(--gold)', fontStyle: 'normal', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginRight: 6 }}>Conseil</span>
                      {e.conseil}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
