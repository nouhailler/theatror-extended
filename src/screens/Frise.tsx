import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { FRISE } from '../data/content';
import { DRAMATURGES } from '../data/dramaturges';
import type { FriseItem, FriseType } from '../data/types';

// Couleur par catégorie (prime sur la couleur d'ère pour la lisibilité des filtres)
const TYPE_COLOR: Record<FriseType, string> = {
  auteur: '#7fa6c9',
  oeuvre: '#d4a94e',
  evenement: '#a85a72',
  style: '#8e9e5a',
};

const FILTRES: { k: FriseType | 'tout'; label: string }[] = [
  { k: 'tout', label: 'Tout' },
  { k: 'auteur', label: 'Auteurs' },
  { k: 'oeuvre', label: 'Œuvres' },
  { k: 'evenement', label: 'Événements' },
  { k: 'style', label: 'Styles' },
];

// Naissances des dramaturges → éléments de frise (cliquables vers la fiche auteur)
function naissancesAuteurs(): FriseItem[] {
  return DRAMATURGES.filter((d) => Number.isFinite(d.naissance)).map((d) => ({
    id: `naissance-${d.id}`,
    ere: 'Naissance',
    couleur: TYPE_COLOR.auteur,
    an: d.naissance < 0 ? `${-d.naissance} av. J.-C.` : String(d.naissance),
    anNum: d.naissance,
    titre: `Naissance de ${d.nom}`,
    txt: d.dates,
    type: 'auteur',
    auteurId: d.id,
  }));
}

export default function Frise() {
  const nav = useNavigate();
  const [filtre, setFiltre] = useState<FriseType | 'tout'>('tout');

  const items = useMemo(() => {
    const tous = [...FRISE.map((f) => ({ ...f, type: f.type ?? 'evenement' as FriseType })), ...naissancesAuteurs()];
    tous.sort((a, b) => a.anNum - b.anNum);
    return filtre === 'tout' ? tous : tous.filter((f) => f.type === filtre);
  }, [filtre]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Frise chronologique">
      <BackHeader to="/explorer" title="Frise chronologique" />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {FILTRES.map((f) => (
          <button key={f.k} className={`chip${filtre === f.k ? ' active' : ''}`} onClick={() => setFiltre(f.k)}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((f, i) => {
          const couleur = f.type ? TYPE_COLOR[f.type] : f.couleur;
          const dest = f.pieceId ? `/pieces/${f.pieceId}` : f.auteurId ? `/explorer/dramaturge/${f.auteurId}` : undefined;
          return (
            <div key={f.id} style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flex: 'none' }}>
                <div style={{ width: 11, height: 11, borderRadius: 999, background: couleur, flex: 'none', marginTop: 5 }} />
                {i < items.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(212,169,78,.2)' }} />}
              </div>
              <div
                onClick={dest ? () => nav(dest) : undefined}
                className={dest ? 'card-tap' : undefined}
                style={{ paddingBottom: 22, flex: 1, cursor: dest ? 'pointer' : 'default' }}
              >
                <div style={{ fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: couleur }}>{f.ere}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600, marginTop: 2 }}>
                    {f.titre}{dest && <span style={{ color: 'var(--gold)', fontSize: 13, marginLeft: 6 }}>→</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 15, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{f.an}</div>
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.45 }}>{f.txt}</div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun élément pour ce filtre.</div>
        )}
      </div>
    </div>
  );
}
