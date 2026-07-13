import { useParams, useNavigate } from 'react-router-dom';
import { DRAMATURGES } from '../data/dramaturges';
import { wiki } from '../lib/wikimedia';
import { useBack } from '../components/ui';
import Star from '../components/Star';
import Credit from '../components/Credit';

export default function FicheDramaturge() {
  const { id } = useParams();
  const nav = useNavigate();
  const d = DRAMATURGES.find((x) => x.id === id);
  const goBack = useBack(`/explorer/encyclopedie?cat=${encodeURIComponent(d?.categorie ?? 'Dramaturges')}`);

  if (!d) {
    return (
      <div style={{ padding: '18px' }}>
        <button onClick={() => nav('/explorer/encyclopedie')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Fiche introuvable.</p>
      </div>
    );
  }

  const src = d.img ? wiki(d.img, 800) : '';
  const kind = d.categorie === 'Auteurs contemporains' ? 'Auteur contemporain' : 'Dramaturge';

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} data-screen-label={`Fiche ${d.nom}`}>
      {/* Héro portrait */}
      <div style={{ position: 'relative', height: 230, background: 'var(--fallback-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--font-title)', fontSize: 70, color: 'rgba(212,169,78,.25)' }}>{d.initiale}</span>
        {src && (
          <img src={src} alt={d.nom} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,16,21,.25) 0%,rgba(23,16,21,0) 35%,rgba(23,16,21,.95) 100%)' }} />
        <button onClick={goBack} aria-label="Retour"
          style={{ position: 'absolute', top: 12, left: 14, cursor: 'pointer', color: 'var(--text)', fontSize: 20, background: 'rgba(23,16,21,.55)', borderRadius: 999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>←</button>
        <div style={{ position: 'absolute', top: 14, right: 16 }}>
          <Star cat="auteurs" id={d.id} size={22} shadow />
        </div>
        <div style={{ position: 'absolute', left: 18, bottom: 12 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{kind}</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 28, fontWeight: 700 }}>{d.nom}</div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{d.nomComplet && `${d.nomComplet} · `}{d.dates}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '18px 18px 28px' }}>
        <div style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-2b)' }}>{d.bio}</div>

        {/* Chronologie */}
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Chronologie</div>
          <div>
            {d.chrono.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '7px 0', borderBottom: '1px solid rgba(212,169,78,.1)' }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 15, fontWeight: 600, color: 'var(--gold)', width: 44, flex: 'none' }}>{c.an}</div>
                <div style={{ fontSize: 14.5, color: 'var(--text-2b)' }}>{c.txt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Citations */}
        {(d.citations ?? (d.citation ? [d.citation] : [])).map((c, i) => (
          <div key={i} style={{ borderLeft: '2px solid var(--gold)', padding: '2px 0 2px 14px' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.45 }}>{c.txt}</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 5 }}>{c.src}</div>
          </div>
        ))}

        {/* Œuvres majeures */}
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Œuvres majeures</div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {d.oeuvres.map((o) => (
              <span key={o} style={{ fontSize: 13.5, padding: '5px 12px', borderRadius: 999, border: '1px solid var(--b-chip2)', color: 'var(--gold-chip-text)', fontStyle: 'italic' }}>{o}</span>
            ))}
          </div>
        </div>

        {/* Thèmes */}
        {d.themes && d.themes.length > 0 && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Thèmes</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {d.themes.map((t) => (
                <span key={t} style={{ fontSize: 13, padding: '5px 12px', borderRadius: 999, background: 'var(--bg-field)', border: '1px solid var(--b-chip)', color: 'var(--text-2b)' }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Récompenses */}
        {d.recompenses && d.recompenses.length > 0 && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Récompenses</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.recompenses.map((r) => (
                <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 13, flex: 'none' }}>🏆</span>
                  <span style={{ fontSize: 14.5, color: 'var(--text-2b)', lineHeight: 1.45 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Style */}
        {d.style && (
          <div className="card card-16" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Style</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-2b)', marginTop: 5 }}>{d.style}</div>
          </div>
        )}

        {/* Influence */}
        {d.influence && (
          <div className="card card-16" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Influence</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-2b)', marginTop: 5 }}>{d.influence}</div>
          </div>
        )}

        {/* Adaptations */}
        {d.adaptations && d.adaptations.length > 0 && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Adaptations</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {d.adaptations.map((a) => (
                <div key={a} style={{ fontSize: 14, color: 'var(--text-2b)', paddingLeft: 12, borderLeft: '2px solid rgba(212,169,78,.3)' }}>{a}</div>
              ))}
            </div>
          </div>
        )}

        {/* Manuscrits */}
        {d.manuscrits && (
          <div className="card card-16" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Manuscrits</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-2b)', marginTop: 5 }}>{d.manuscrits}</div>
          </div>
        )}

        <Credit file={d.img} />
      </div>
    </div>
  );
}
