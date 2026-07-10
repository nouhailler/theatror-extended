import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import Star from '../components/Star';
import { DRAMATURGES } from '../data/dramaturges';
import type { EncycloCategorie } from '../data/types';

const CATEGORIES: EncycloCategorie[] = [
  'Dramaturges', 'Histoire', 'Mouvements', 'Genres', 'Métiers', 'Théâtres', 'Festivals',
];

export default function Encyclopedie() {
  const nav = useNavigate();
  const [cat, setCat] = useState<EncycloCategorie>('Dramaturges');

  const items = DRAMATURGES.filter((d) => d.categorie === cat);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Encyclopédie">
      <BackHeader to="/explorer" title="Encyclopédie" />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${c === cat ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {items.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {items.map((d) => (
            <div key={d.id} onClick={() => nav(`/explorer/dramaturge/${d.id}`)} className="card card-tap" style={{ overflow: 'hidden' }}>
              <WikiImage file={d.img} initial={d.initiale} initialSize={44} style={{ height: 150, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 6, right: 8 }}>
                  <Star cat="auteurs" id={d.id} shadow />
                </div>
              </WikiImage>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 16, fontWeight: 600 }}>{d.nom}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 1 }}>{d.dates}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Cette catégorie s'enrichit bientôt.<br />En attendant, explorez les dramaturges.
        </div>
      )}
    </div>
  );
}
