import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { EXERCICES_VOCAUX, type CategorieVocale } from '../data/voix';

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
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c}</button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} exercice{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((e) => {
          const open = ouvert === e.id;
          return (
            <div key={e.id} className="card card-tap" onClick={() => setOuvert(open ? null : e.id)}
              style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600 }}>{e.titre}</div>
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
