import { useParams, useNavigate } from 'react-router-dom';
import { PIECES } from '../data/pieces';
import { PIECE_DETAILS } from '../data/pieceDetails';
import { hasTexte } from '../data/pieceTextes';
import { DRAMATURGES } from '../data/dramaturges';
import { difficulteLabel } from '../components/ui';
import Star from '../components/Star';

const chip: React.CSSProperties = {
  fontSize: 12.5, padding: '4px 11px', borderRadius: 999,
  border: '1px solid var(--b-chip2)', color: 'var(--gold-chip-text)',
};

export default function FichePiece() {
  const { id } = useParams();
  const nav = useNavigate();
  const p = PIECES.find((x) => x.id === id);

  if (!p) {
    return (
      <div style={{ padding: 18 }}>
        <button onClick={() => nav('/pieces')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Pièce introuvable.</p>
      </div>
    );
  }

  const d = PIECE_DETAILS[p.id] ?? {};
  const auteur = p.auteurId ? DRAMATURGES.find((x) => x.id === p.auteurId) : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} data-screen-label={`Fiche ${p.titre}`}>
      {/* Héro */}
      <div style={{ position: 'relative', height: 168, background: 'var(--hero-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--font-title)', fontSize: 84, color: 'rgba(242,233,220,.14)', lineHeight: 1 }}>{p.titre.charAt(0)}</span>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,16,21,.15) 0%,rgba(23,16,21,0) 30%,rgba(23,16,21,.92) 100%)' }} />
        <button onClick={() => nav('/pieces')} aria-label="Retour"
          style={{ position: 'absolute', top: 12, left: 14, cursor: 'pointer', color: 'var(--text)', fontSize: 20, background: 'rgba(23,16,21,.55)', borderRadius: 999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>←</button>
        <div style={{ position: 'absolute', top: 14, right: 16 }}>
          <Star cat="pieces" id={p.id} size={22} shadow />
        </div>
        <div style={{ position: 'absolute', left: 18, bottom: 12, right: 18 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{p.genre}</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 26, fontWeight: 700, lineHeight: 1.1 }}>{p.titre}</div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{p.auteur} · {p.annee}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '18px 18px 28px' }}>
        {/* Métadonnées */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={chip}>{p.actes}</span>
          <span style={chip}>{p.duree}</span>
          <span style={chip}>{p.femmes} F · {p.hommes} H</span>
          <span style={chip}>{p.decor}</span>
          {p.domainePublic && <span style={chip}>domaine public</span>}
          {p.pourEnfants && <span style={chip}>pour enfants</span>}
          <span style={{ ...chip, border: 'none', color: 'var(--text-muted)', fontStyle: 'italic' }}>{difficulteLabel(p.difficulte)}</span>
        </div>

        {/* Lecture du texte intégral */}
        {hasTexte(p.id) && (
          <button onClick={() => nav(`/pieces/${p.id}/texte`)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '13px 16px', cursor: 'pointer',
              background: 'var(--gold)', color: 'var(--on-gold)', border: 'none',
              borderRadius: 10, fontFamily: 'var(--font-title)', fontSize: 16, fontWeight: 600,
              boxShadow: 'var(--sh-btn)',
            }}>
            📖 Lire le texte intégral
          </button>
        )}

        {/* Résumé */}
        {p.resume && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Résumé</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-2b)' }}>{p.resume}</div>
          </div>
        )}

        {/* Extrait */}
        {d.extrait && (
          <div style={{ borderLeft: '2px solid var(--gold)', padding: '2px 0 2px 14px' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.45 }}>{d.extrait.texte}</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 5 }}>{d.extrait.source}</div>
          </div>
        )}

        {/* Personnages */}
        {d.personnages && d.personnages.length > 0 && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Personnages principaux</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {d.personnages.map((n) => (
                <span key={n} style={{ fontSize: 13.5, padding: '5px 12px', borderRadius: 999, background: 'var(--bg-card)', border: '1px solid var(--b-rest2)', color: 'var(--text-2b)' }}>{n}</span>
              ))}
            </div>
          </div>
        )}

        {/* Thèmes */}
        {d.themes && d.themes.length > 0 && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Thèmes</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {d.themes.map((t) => (
                <span key={t} style={{ fontSize: 13, padding: '4px 11px', borderRadius: 999, background: 'var(--red-chip-bg)', border: '1px solid var(--red-chip-border)', color: 'var(--red-chip-text)' }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Lien auteur */}
        {auteur && (
          <div onClick={() => nav(`/explorer/dramaturge/${auteur.id}`)} className="card card-16 card-tap" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>L'auteur</div>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600, marginTop: 2 }}>{auteur.nom}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{auteur.dates}</div>
            </div>
            <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
          </div>
        )}
      </div>
    </div>
  );
}
