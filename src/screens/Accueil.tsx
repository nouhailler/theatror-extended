import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Overline } from '../components/ui';
import WikiImage from '../components/WikiImage';
import { LIEUX, CITATIONS } from '../data/content';
import { PIECES } from '../data/pieces';

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
  const favCount = useStore((s) => s.favCount());
  const favLabel = favCount === 0
    ? 'Encore vide — touchez ☆ pour ajouter des favoris'
    : `${favCount} favori${favCount > 1 ? 's' : ''}`;

  const theatre = pick(LIEUX.filter((l) => l.img));
  const citation = pick(CITATIONS);
  const piece = pick(PIECES);

  const quick = [
    { titre: 'Monologues', sub: 'Pour vos auditions', to: '/scene?seg=mono' },
    { titre: 'Frise du théâtre', sub: "2 500 ans d'histoire", to: '/explorer/frise' },
    { titre: 'Trouver une pièce', sub: 'Filtres par distribution', to: '/pieces' },
    { titre: 'Journal', sub: 'Notes de répétition', to: '/journal' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '18px 18px 28px' }} data-screen-label="Accueil">
      <Overline size={13}>Le compagnon du comédien</Overline>

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
        onClick={() => nav('/pieces')}
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

      {/* Accès rapides */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {quick.map((q) => (
          <div key={q.titre} onClick={() => nav(q.to)} className="card-tap" style={quickStyle}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{q.titre}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{q.sub}</div>
          </div>
        ))}
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
        onClick={() => nav('/explorer/collections')}
        style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'linear-gradient(120deg,#3a1520,#241019)', border: '1px solid rgba(158,43,58,.4)', borderRadius: 12, padding: '13px 16px', cursor: 'pointer' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Collection</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600, marginTop: 2 }}>Le théâtre de l'absurde</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 2, fontStyle: 'italic' }}>Ionesco, Beckett, Adamov — 12 pièces</div>
        </div>
        <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
      </div>
    </div>
  );
}
