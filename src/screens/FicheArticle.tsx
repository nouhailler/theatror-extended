import { useParams, useNavigate } from 'react-router-dom';
import WikiImage from '../components/WikiImage';
import Credit from '../components/Credit';
import { useBack } from '../components/ui';
import { articleById } from '../data/encyclopedie';

export default function FicheArticle() {
  const { id } = useParams();
  const nav = useNavigate();
  const a = id ? articleById(id) : undefined;
  const goBack = useBack(`/explorer/encyclopedie?cat=${encodeURIComponent(a?.categorie ?? 'Histoire')}`);

  if (!a) {
    return (
      <div style={{ padding: 18 }}>
        <button onClick={() => nav('/explorer/encyclopedie')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Fiche introuvable.</p>
      </div>
    );
  }

  const Over = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{children}</div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} data-screen-label={`Fiche ${a.titre}`}>
      {/* Bandeau image (repli initiale) */}
      <div style={{ position: 'relative', height: 150, overflow: 'hidden' }}>
        <WikiImage file={a.img} initial={a.initiale} initialSize={84} alt={a.titre} style={{ position: 'absolute', inset: 0 }} objectPosition="center" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,16,21,.15) 0%,rgba(23,16,21,0) 30%,rgba(23,16,21,.92) 100%)' }} />
        <button onClick={goBack} aria-label="Retour"
          style={{ position: 'absolute', top: 12, left: 14, cursor: 'pointer', color: 'var(--text)', fontSize: 20, background: 'rgba(23,16,21,.55)', borderRadius: 999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>←</button>
        <div style={{ position: 'absolute', left: 18, bottom: 12, right: 18 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{a.categorie}</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 25, fontWeight: 700, lineHeight: 1.15 }}>{a.titre}</div>
          {a.soustitre && <div style={{ fontSize: 13.5, color: 'var(--text-2)', fontStyle: 'italic' }}>{a.soustitre}</div>}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '18px 18px 28px' }}>
        <div style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-2b)' }}>{a.intro}</div>

        {a.points && a.points.length > 0 && (
          <div>
            <Over>Points clés</Over>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {a.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 13 }}>▸</span>
                  <span style={{ fontSize: 14.5, color: 'var(--text-2b)', lineHeight: 1.45 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {a.sections?.map((s, i) => (
          <div key={i}>
            <Over>{s.titre}</Over>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-2b)' }}>{s.texte}</div>
          </div>
        ))}

        {a.chrono && a.chrono.length > 0 && (
          <div>
            <Over>Chronologie</Over>
            <div>
              {a.chrono.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '7px 0', borderBottom: '1px solid rgba(212,169,78,.1)' }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 15, fontWeight: 600, color: 'var(--gold)', width: 52, flex: 'none' }}>{c.an}</div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2b)' }}>{c.txt}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {a.citation && (
          <div style={{ borderLeft: '2px solid var(--gold)', padding: '2px 0 2px 14px' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.45 }}>{a.citation.txt}</div>
            {a.citation.src && <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 5 }}>{a.citation.src}</div>}
          </div>
        )}

        {a.anecdote && (
          <div className="card card-16" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Le saviez-vous ?</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-2b)', marginTop: 5 }}>{a.anecdote}</div>
          </div>
        )}

        <Credit file={a.img} />
      </div>
    </div>
  );
}
