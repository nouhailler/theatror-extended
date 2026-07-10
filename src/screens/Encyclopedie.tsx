import { useNavigate, useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import Star from '../components/Star';
import { DRAMATURGES } from '../data/dramaturges';
import { articlesFor } from '../data/encyclopedie';
import { LIEUX } from '../data/content';
import type { EncycloCategorie } from '../data/types';

const CATEGORIES: EncycloCategorie[] = [
  'Dramaturges', 'Auteurs contemporains', 'Histoire', 'Mouvements', 'Genres', 'Métiers', 'Théâtres', 'Festivals',
];

export default function Encyclopedie() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const cat = (params.get('cat') as EncycloCategorie) || 'Dramaturges';
  const setCat = (c: EncycloCategorie) => setParams({ cat: c }, { replace: true });

  const dramaturges = (cat === 'Dramaturges' || cat === 'Auteurs contemporains')
    ? DRAMATURGES.filter((d) => d.categorie === cat)
    : [];
  const articles = articlesFor(cat);
  const lieux = cat === 'Théâtres' ? LIEUX.filter((l) => l.type === 'theatre')
    : cat === 'Festivals' ? LIEUX.filter((l) => l.type === 'festival')
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Encyclopédie">
      <BackHeader to="/explorer" title="Encyclopédie" />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${c === cat ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {/* Dramaturges & auteurs contemporains : portraits → fiche dramaturge */}
      {dramaturges.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {dramaturges.map((d) => (
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
      )}

      {/* Histoire / Mouvements / Genres / Métiers : fiches article */}
      {articles.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {articles.map((a) => (
            <div key={a.id} onClick={() => nav(`/explorer/article/${a.id}`)} className="card card-tap" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ width: 54, height: 54, borderRadius: 10, flex: 'none', background: 'var(--fallback-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-title)', fontSize: 26, color: 'rgba(212,169,78,.4)' }}>{a.initiale}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{a.titre}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{a.soustitre ?? a.intro.slice(0, 60) + '…'}</div>
              </div>
              <div style={{ fontSize: 18, color: 'var(--gold)' }}>→</div>
            </div>
          ))}
        </div>
      )}

      {/* Théâtres / Festivals : lieux → carte */}
      {lieux.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lieux.map((l) => (
            <div key={l.id} onClick={() => nav('/explorer/carte')} className="card card-tap" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px' }}>
              <WikiImage file={l.img} initial={l.initiale} initialSize={24} style={{ width: 64, height: 64, borderRadius: 10, flex: 'none' }} objectPosition="center" />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{l.nom}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{l.lieu}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{l.txt}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
