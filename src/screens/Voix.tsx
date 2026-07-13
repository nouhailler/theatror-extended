import { useMemo, useState, type ReactNode } from 'react';
import { BackHeader } from '../components/ui';
import { EXERCICES_VOCAUX, type CategorieVocale } from '../data/voix';

// Petit dessin (line-art) illustrant chaque catégorie d'entraînement vocal.
function VoixIcon({ cat }: { cat: CategorieVocale }) {
  const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<CategorieVocale, ReactNode> = {
    // soleil (mise en chauffe)
    'Échauffement': <><circle {...P} cx="12" cy="12" r="4" /><path {...P} d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7 16.6l-1.8 1.8" /></>,
    // tête + ondes de résonance
    'Résonateurs': <><circle {...P} cx="9" cy="12" r="5" /><circle cx="8" cy="11" r="0.9" fill="currentColor" /><path {...P} d="M16 9a4.5 4.5 0 0 1 0 6M18.5 7.5a8 8 0 0 1 0 9" /></>,
    // porte-voix
    Projection: <><path {...P} d="M3 10h4l8-4v12l-8-4H3z" /><path {...P} d="M17.5 9.5a4 4 0 0 1 0 5M20 8a7 7 0 0 1 0 8" /></>,
    // langue qui se tord (virelangue)
    Virelangues: <><path {...P} d="M3 13q3-6 6-2t6-2 5.5-1.5" /><path {...P} d="M7 18q2.5-3 5 0t5 0" /></>,
    // note de musique (justesse)
    Justesse: <><path {...P} d="M13 16.5V6c2.6.6 3.6 2 3.6 4.2" /><ellipse cx="10.6" cy="16.5" rx="2.6" ry="1.9" fill="currentColor" /></>,
    // souffle (lignes d'air)
    Souffle: <><path {...P} d="M3 8h10a3 3 0 1 0 -3 -3" /><path {...P} d="M3 12h14a3 3 0 1 1 -3 3" /><path {...P} d="M3 16h7" /></>,
  };
  return (
    <div style={{ width: 40, height: 40, flex: 'none', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', background: 'var(--bg-field)', border: '1px solid var(--b-chip)' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>{paths[cat]}</svg>
    </div>
  );
}

const CAT_ORDER: CategorieVocale[] = [
  'Échauffement', 'Résonateurs', 'Projection', 'Virelangues', 'Justesse', 'Souffle',
];

const NIVEAU_COLOR: Record<string, string> = {
  Débutant: '#8e9e5a',
  Intermédiaire: '#d4a94e',
  Avancé: '#9e2b3a',
};

export default function Voix() {
  const [cat, setCat] = useState<CategorieVocale | null>(null);
  const [ouvert, setOuvert] = useState<string | null>(null);

  const cats = useMemo(
    () => CAT_ORDER.filter((c) => EXERCICES_VOCAUX.some((e) => e.categorie === c)),
    [],
  );
  const list = useMemo(
    () => (cat ? EXERCICES_VOCAUX.filter((e) => e.categorie === cat) : EXERCICES_VOCAUX),
    [cat],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Entraînement vocal">
      <BackHeader to="/explorer" title="Entraînement vocal" sub="Échauffer, placer et projeter la voix" />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {cats.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{EXERCICES_VOCAUX.filter((e) => e.categorie === c).length}</span></button>
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
                <VoixIcon cat={e.categorie} />
                <div style={{ flex: 1, fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600 }}>{e.titre}</div>
                <span style={{ fontSize: 18, color: 'var(--gold)', flex: 'none', transition: 'transform .15s', transform: open ? 'rotate(90deg)' : 'none' }}>›</span>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{e.categorie}</span>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{e.duree}</span>
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
