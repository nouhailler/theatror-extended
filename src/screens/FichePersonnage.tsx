import { useParams, useNavigate } from 'react-router-dom';
import { PERSONNAGES } from '../data/characters';
import { MONOLOGUES } from '../data/content';

export default function FichePersonnage() {
  const { id } = useParams();
  const nav = useNavigate();
  const c = PERSONNAGES.find((x) => x.id === id);
  const mono = c?.monologueId ? MONOLOGUES.find((m) => m.id === c.monologueId) : undefined;

  if (!c) {
    return (
      <div style={{ padding: 18 }}>
        <button onClick={() => nav('/explorer/personnages')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Personnage introuvable.</p>
      </div>
    );
  }

  const Section = ({ titre, children }: { titre: string; children: React.ReactNode }) => (
    <div>
      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{titre}</div>
      {children}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} data-screen-label={`Personnage ${c.nom}`}>
      <div style={{ position: 'relative', height: 168, background: 'var(--fallback-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--font-title)', fontSize: 92, color: 'rgba(212,169,78,.22)', lineHeight: 1 }}>{c.initiale}</span>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,16,21,.15) 0%,rgba(23,16,21,0) 30%,rgba(23,16,21,.92) 100%)' }} />
        <button onClick={() => nav('/explorer/personnages')} aria-label="Retour"
          style={{ position: 'absolute', top: 12, left: 14, cursor: 'pointer', color: 'var(--text)', fontSize: 20, background: 'rgba(23,16,21,.55)', borderRadius: 999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>←</button>
        <div style={{ position: 'absolute', left: 18, bottom: 12, right: 18 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{c.emploi}</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 28, fontWeight: 700 }}>{c.nom}</div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{c.piece} · {c.auteur}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '18px 18px 28px' }}>
        {c.citation && (
          <div style={{ borderLeft: '2px solid var(--gold)', padding: '2px 0 2px 14px' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.45 }}>{c.citation}</div>
          </div>
        )}

        <Section titre="Psychologie">
          <div style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-2b)' }}>{c.psychologie}</div>
        </Section>

        <Section titre="Évolution dramatique">
          <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-2b)' }}>{c.evolution}</div>
        </Section>

        <Section titre="Scènes importantes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {c.scenes.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--gold)', fontSize: 13 }}>▸</span>
                <span style={{ fontSize: 14.5, color: 'var(--text-2b)' }}>{s}</span>
              </div>
            ))}
          </div>
        </Section>

        {c.adaptations && c.adaptations.length > 0 && (
          <Section titre="Adaptations & mises en scène">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.adaptations.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 13 }}>▸</span>
                  <span style={{ fontSize: 14.5, color: 'var(--text-2b)' }}>{a}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {c.pieceId && (
            <div onClick={() => nav(`/pieces/${c.pieceId}`)} className="card card-16 card-tap" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>La pièce</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600, marginTop: 2 }}>{c.piece}</div>
              </div>
              <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
            </div>
          )}
          {mono && (
            <div onClick={() => nav(`/scene?seg=mono&focus=${mono.id}`)} className="card card-16 card-tap" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Monologue lié</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600, marginTop: 2 }}>{mono.titre}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 1 }}>{mono.duree} · à travailler en Scène</div>
              </div>
              <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
