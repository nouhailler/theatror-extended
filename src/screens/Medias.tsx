import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { MEDIAS, MEDIA_COULEUR, type MediaCategorie } from '../data/medias';

const CATEGORIES: MediaCategorie[] = ['Podcast', 'Captation', 'Conférence', 'Interview', 'Analyse', 'Lecture'];

function domaine(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
}

export default function Medias() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<MediaCategorie | null>(null);
  const [gratuit, setGratuit] = useState(false);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MEDIAS.filter((m) =>
      (!cat || m.categorie === cat) &&
      (!gratuit || m.acces === 'Gratuit') &&
      (!needle || `${m.titre} ${m.source} ${m.description}`.toLowerCase().includes(needle)),
    );
  }, [q, cat, gratuit]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Podcasts et vidéos">
      <BackHeader to="/explorer" title="Podcasts & vidéos" sub="Ressources gratuites autour du théâtre" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (source, sujet…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c}</button>
        ))}
        <button className={`chip${gratuit ? ' active' : ''}`} onClick={() => setGratuit((g) => !g)}>Gratuit</button>
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} ressource{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((m) => {
          const col = MEDIA_COULEUR[m.categorie];
          return (
            <a key={m.id} href={m.url} target="_blank" rel="noreferrer noopener" className="card card-tap"
              style={{ display: 'flex', gap: 14, padding: 14, textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, flex: 'none', background: `linear-gradient(150deg, ${col}, rgba(0,0,0,.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {icon(m.categorie)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{m.titre}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{m.categorie}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{m.source}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{m.description}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--b-chip)', color: m.acces === 'Gratuit' ? 'var(--gold-chip-text)' : 'var(--text-muted)' }}>{m.acces}</span>
                  <span style={{ fontSize: 12, color: 'var(--gold)' }}>{domaine(m.url)} ↗</span>
                </div>
              </div>
            </a>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucune ressource pour ces critères.</div>
        )}
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
        Annuaire indicatif — les liens ouvrent le site de l'institution. Disponibilité et accès (gratuit / abonnement / replay) susceptibles d'évoluer.
      </div>
    </div>
  );
}

function icon(c: MediaCategorie): string {
  switch (c) {
    case 'Podcast': return '🎙️';
    case 'Captation': return '🎬';
    case 'Conférence': return '🎓';
    case 'Interview': return '💬';
    case 'Analyse': return '📖';
    case 'Lecture': return '🎧';
  }
}
