import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Overline } from '../components/ui';
import WikiImage from '../components/WikiImage';
import RappelsBanner from '../components/RappelsBanner';
import { LIEUX, CITATIONS } from '../data/content';
import { PIECES } from '../data/pieces';
import { searchAll } from '../lib/search';
import { HOME_SHORTCUTS_BY_ID } from '../data/homeShortcuts';

// Rotation quotidienne déterministe.
function jourDeLAnnee(): number {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}
function pick<T>(list: T[]): T {
  return list[jourDeLAnnee() % list.length];
}

const chipStyle: React.CSSProperties = {
  fontSize: 12.5,
  padding: '3px 10px',
  borderRadius: 999,
  border: '1px solid rgba(212,169,78,.35)',
  color: 'var(--gold-chip-text)',
};

const quickStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--b-rest2)',
  borderRadius: 12,
  padding: '13px 14px',
  cursor: 'pointer',
};

export default function Accueil() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const query = q.trim();
  const searching = query.length >= 2;
  const hits = useMemo(() => (query.length >= 2 ? searchAll(query, 40) : []), [query]);
  const favCount = useStore((s) => s.favCount());
  const favLabel = favCount === 0
    ? 'Encore vide — touchez ☆ pour ajouter des favoris'
    : `${favCount} favori${favCount > 1 ? 's' : ''}`;

  const theatre = pick(LIEUX.filter((l) => l.img));
  const citation = pick(CITATIONS);
  const piece = pick(PIECES);

  // Accès rapides personnalisables (choisis dans Réglages), dans l'ordre stocké.
  const homeShortcuts = useStore((s) => s.settings.homeShortcuts);
  const quick = homeShortcuts.map((id) => HOME_SHORTCUTS_BY_ID[id]).filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '18px 18px 28px' }} data-screen-label="Accueil">
      <Overline size={13}>Le compagnon du comédien</Overline>

      {/* Recherche globale sur toute l'application */}
      <div style={{ position: 'relative' }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher dans toute l'application…"
          style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '11px 38px 11px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />
        {q && (
          <button onClick={() => setQ('')} aria-label="Effacer la recherche"
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--gold)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
        )}
      </div>

      {searching ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{hits.length} résultat{hits.length > 1 ? 's' : ''}</div>
          {hits.map((h, i) => (
            <div key={`${h.route}-${i}`} onClick={() => nav(h.route)} className="card-tap"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'var(--bg-card)', border: '1px solid var(--b-rest2)', borderRadius: 10, cursor: 'pointer' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 15.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.label}</div>
                {h.sub && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.sub}</div>}
              </div>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)', flex: 'none', whiteSpace: 'nowrap' }}>{h.type}</span>
              <span style={{ color: 'var(--gold)', fontSize: 16, flex: 'none' }}>→</span>
            </div>
          ))}
          {hits.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5, padding: '10px 2px' }}>Aucun résultat pour «&nbsp;{query}&nbsp;».</div>
          )}
        </div>
      ) : (
      <>
      {/* Rappels de suivi (contacts à relancer) */}
      <RappelsBanner compact />

      {/* Hero théâtre du jour */}
      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(212,169,78,.25)', background: 'var(--hero-red)' }}>
        <WikiImage
          file={theatre.img}
          initial={theatre.initiale}
          initialSize={64}
          width={800}
          objectPosition="center"
          style={{ height: 170, position: 'relative' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,16,21,0) 40%,rgba(23,16,21,.92) 100%)' }} />
          <div style={{ position: 'absolute', left: 14, bottom: 10, right: 14 }}>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Théâtre du jour</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 20, fontWeight: 600 }}>{theatre.nom}</div>
          </div>
        </WikiImage>
      </div>

      {/* Citation du jour */}
      <div style={{ borderLeft: '2px solid var(--gold)', padding: '2px 0 2px 14px' }}>
        <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.45 }}>{citation.txt}</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6, letterSpacing: 1 }}>{citation.src}</div>
      </div>

      {/* Pièce du jour */}
      <div
        onClick={() => nav(`/pieces/${piece.id}`)}
        className="card-tap"
        style={{ background: 'var(--bg-piece-jour)', border: '1px solid var(--b-rest2)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Pièce du jour</div>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 21, fontWeight: 600 }}>{piece.titre}</div>
        <div style={{ fontSize: 14.5, color: 'var(--text-2)', fontStyle: 'italic' }}>{piece.auteur} · {piece.genre} · {piece.annee}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={chipStyle}>{piece.actes}</span>
          <span style={chipStyle}>{piece.duree}</span>
          <span style={chipStyle}>{piece.femmes} F · {piece.hommes} H</span>
          {piece.domainePublic && <span style={chipStyle}>domaine public</span>}
        </div>
      </div>

      {/* Accès rapides — personnalisables depuis Réglages */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Accès rapides</div>
          <button onClick={() => nav('/reglages')} style={{ background: 'none', border: 'none', color: 'var(--gold-chip-text)', fontSize: 12.5, cursor: 'pointer', fontFamily: 'var(--font-body)', padding: 0 }}>Personnaliser →</button>
        </div>
        {quick.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {quick.map((q) => (
              <div key={q.id} onClick={() => nav(q.to)} className="card-tap" style={quickStyle}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{q.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{q.sub}</div>
              </div>
            ))}
          </div>
        ) : (
          <div onClick={() => nav('/reglages')} className="card-tap" style={{ ...quickStyle, textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 13.5 }}>
            Aucun accès rapide — touchez pour en choisir dans Réglages.
          </div>
        )}
      </div>

      {/* Ma collection */}
      <div
        onClick={() => nav('/collection')}
        className="card-tap"
        style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-card)', border: '1px solid var(--b-chip)', borderRadius: 12, padding: '13px 16px' }}
      >
        <div style={{ fontSize: 21, color: 'var(--gold)', lineHeight: 1 }}>★</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600 }}>Ma collection</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{favLabel}</div>
        </div>
        <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
      </div>

      {/* Collection en vedette */}
      <div
        onClick={() => nav('/explorer/collections/absurde')}
        style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'linear-gradient(120deg,#3a1520,#241019)', border: '1px solid rgba(158,43,58,.4)', borderRadius: 12, padding: '13px 16px', cursor: 'pointer' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Collection</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600, marginTop: 2 }}>Le théâtre de l'absurde</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 2, fontStyle: 'italic' }}>Ionesco, Beckett, Adamov — 12 pièces</div>
        </div>
        <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
      </div>
      </>
      )}
    </div>
  );
}
