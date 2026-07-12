import { useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { COSTUMES, COSTUME_COULEUR, type CostumeEpoque } from '../data/costumes';

const EPOQUES: CostumeEpoque[] = ['Antiquité', 'Moyen Âge', 'Renaissance', 'Grand Siècle', 'Lumières', 'Romantique', 'Moderne'];
const GENRES = ['Homme', 'Femme', 'Mixte'] as const;

export default function Costumes() {
  const [q, setQ] = useState('');
  const [epoque, setEpoque] = useState<CostumeEpoque | null>(null);
  const [genre, setGenre] = useState<string | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COSTUMES.filter((c) =>
      (!epoque || c.epoque === epoque) &&
      (!genre || c.genre === genre) &&
      (!needle || `${c.nom} ${c.pays} ${c.description} ${c.personnages ?? ''} ${c.elements.join(' ')}`.toLowerCase().includes(needle)),
    );
  }, [q, epoque, genre]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Costumes">
      <BackHeader to="/explorer" title="Costumes" sub="Galerie historique du costume de théâtre" />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (pays, style, personnage…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Époque</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {EPOQUES.map((e) => (
            <button key={e} className={`chip${epoque === e ? ' active' : ''}`} onClick={() => setEpoque(epoque === e ? null : e)}>{e} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{COSTUMES.filter((c) => c.epoque === e).length}</span></button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Genre</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {GENRES.map((g) => (
            <button key={g} className={`chip${genre === g ? ' active' : ''}`} onClick={() => setGenre(genre === g ? null : g)}>{g} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{COSTUMES.filter((c) => c.genre === g).length}</span></button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} costume{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((c) => {
          const col = COSTUME_COULEUR[c.epoque];
          return (
            <div key={c.id} className="card" style={{ display: 'flex', gap: 14, padding: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, flex: 'none', background: `linear-gradient(150deg, ${col}, rgba(0,0,0,.35))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-title)', fontSize: 26, fontWeight: 700, color: 'rgba(0,0,0,.55)' }}>
                {c.initiale}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{c.nom}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{c.epoque}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{c.pays} · {c.genre}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{c.description}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {c.elements.map((el) => (
                    <span key={el} style={{ fontSize: 11.5, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{el}</span>
                  ))}
                </div>
                {c.personnages && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6 }}>Rôles : {c.personnages}</div>}
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucun costume pour ces critères.</div>
        )}
      </div>
    </div>
  );
}
