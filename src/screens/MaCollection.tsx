import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { BackHeader } from '../components/ui';
import Star from '../components/Star';
import WikiImage from '../components/WikiImage';
import { PIECES } from '../data/pieces';
import { DRAMATURGES } from '../data/dramaturges';
import { MONOLOGUES, CITATIONS } from '../data/content';
import { COSTUMES, COSTUME_COULEUR } from '../data/costumes';
import { DECORS } from '../data/decors';
import { ACCESSOIRES, ACCESSOIRE_COULEUR } from '../data/accessoires';
import { FESTIVALS, moisCourt, saisonCouleur } from '../data/festivals';
import type { FavCategory } from '../store';

type Seg = 'p' | 'a' | 'c' | 'm' | 'v';
const SEGS: { k: Seg; label: string }[] = [
  { k: 'p', label: 'Pièces' },
  { k: 'a', label: 'Auteurs' },
  { k: 'c', label: 'Citations' },
  { k: 'm', label: 'Monologues' },
  { k: 'v', label: 'Spectacle' },
];

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
      {children}
    </div>
  );
}

export default function MaCollection() {
  const nav = useNavigate();
  const favs = useStore((s) => s.favs);
  const favCount = useStore((s) => s.favCount());
  const [seg, setSeg] = useState<Seg>('p');

  const isFav = (cat: string, id: string) => !!favs[`${cat}::${id}`];
  const pieces = PIECES.filter((p) => isFav('pieces', p.id));
  const auteurs = DRAMATURGES.filter((d) => isFav('auteurs', d.id));
  const citations = CITATIONS.filter((c) => isFav('citations', c.id));
  const monologues = MONOLOGUES.filter((m) => isFav('monologues', m.id));

  // Favoris « Spectacle » : costumes, décors, accessoires, festivals réunis.
  interface Visuel { cat: FavCategory; id: string; nom: string; img?: string; initiale: string; bg: string; typeLabel: string; sub: string; route: string; }
  const spectacle: Visuel[] = [
    ...COSTUMES.filter((c) => isFav('costumes', c.id)).map((c): Visuel => ({ cat: 'costumes', id: c.id, nom: c.nom, img: c.img, initiale: c.initiale, bg: `linear-gradient(150deg, ${COSTUME_COULEUR[c.epoque]}, rgba(0,0,0,.4))`, typeLabel: 'Costume', sub: c.epoque, route: `/costumes?focus=${c.id}` })),
    ...DECORS.filter((d) => isFav('decors', d.id)).map((d): Visuel => ({ cat: 'decors', id: d.id, nom: d.nom, img: d.img, initiale: d.initiale, bg: d.bg, typeLabel: 'Décor', sub: d.categorie, route: `/decors?focus=${d.id}` })),
    ...ACCESSOIRES.filter((a) => isFav('accessoires', a.id)).map((a): Visuel => ({ cat: 'accessoires', id: a.id, nom: a.nom, img: a.img, initiale: a.initiale, bg: `linear-gradient(150deg, ${ACCESSOIRE_COULEUR[a.categorie]}, rgba(0,0,0,.4))`, typeLabel: 'Accessoire', sub: a.categorie, route: `/accessoires?focus=${a.id}` })),
    ...FESTIVALS.filter((f) => isFav('festivals', f.id)).map((f): Visuel => ({ cat: 'festivals', id: f.id, nom: f.nom, img: f.img, initiale: moisCourt(f.moisNum), bg: `linear-gradient(150deg, ${saisonCouleur(f.moisNum)}, rgba(0,0,0,.4))`, typeLabel: 'Festival', sub: f.ville, route: `/festivals?focus=${f.id}` })),
  ];

  const favLabel = favCount === 0
    ? 'Encore vide — touchez ☆ pour ajouter des favoris'
    : `${favCount} favori${favCount > 1 ? 's' : ''}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Ma collection">
      <BackHeader to="/" title="Ma collection" sub={favLabel} />

      <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
        {SEGS.map((s) => {
          const active = s.k === seg;
          return (
            <button key={s.k} onClick={() => setSeg(s.k)}
              style={{ flex: 1, textAlign: 'center', padding: '7px 2px', borderRadius: 999, fontSize: 11.5, cursor: 'pointer', border: 'none', fontWeight: 600, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
              {s.label}
            </button>
          );
        })}
      </div>

      {seg === 'p' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pieces.length === 0 && <Empty>Aucun favori pour l'instant.<br />Touchez ☆ sur une pièce pour l'ajouter ici.</Empty>}
          {pieces.map((p) => (
            <div key={p.id} onClick={() => nav(`/pieces/${p.id}`)} className="card card-tap" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 600 }}>{p.titre}</div>
                <Star cat="pieces" id={p.id} />
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{p.auteur} · {p.annee} · {p.genre}</div>
            </div>
          ))}
        </div>
      )}

      {seg === 'a' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {auteurs.length === 0 && <Empty>Aucun favori pour l'instant.<br />Touchez ☆ sur un dramaturge pour l'ajouter ici.</Empty>}
          {auteurs.map((d) => (
            <div key={d.id} onClick={() => nav(`/explorer/dramaturge/${d.id}`)} className="card card-tap" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px' }}>
              <WikiImage file={d.img} initial={d.initiale} initialSize={20} alt={d.nom} style={{ width: 52, height: 52, borderRadius: 999, flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{d.nom}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{d.dates}</div>
              </div>
              <Star cat="auteurs" id={d.id} />
            </div>
          ))}
        </div>
      )}

      {seg === 'c' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {citations.length === 0 && <Empty>Aucun favori pour l'instant.<br />Touchez ☆ sous une citation pour l'ajouter ici.</Empty>}
          {citations.map((q) => (
            <div key={q.id} className="card" style={{ padding: 16 }}>
              <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 16.5, lineHeight: 1.45 }}>{q.txt}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)', letterSpacing: 0.5 }}>{q.src}</div>
                <Star cat="citations" id={q.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {seg === 'm' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {monologues.length === 0 && <Empty>Aucun favori pour l'instant.<br />Touchez ☆ sur un monologue pour l'ajouter ici.</Empty>}
          {monologues.map((m) => (
            <div key={m.id} className="card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{m.titre}</div>
                <Star cat="monologues" id={m.id} />
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{m.source}</div>
            </div>
          ))}
        </div>
      )}

      {seg === 'v' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {spectacle.length === 0 && <Empty>Aucun favori pour l'instant.<br />Touchez ☆ sur un costume, un décor, un accessoire ou un festival.</Empty>}
          {spectacle.map((it) => (
            <div key={`${it.cat}:${it.id}`} onClick={() => nav(it.route)} className="card card-tap" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px' }}>
              <WikiImage file={it.img} initial={it.initiale} initialSize={18} objectPosition="center" fallbackBg={it.bg} alt={`${it.typeLabel} : ${it.nom}`}
                style={{ width: 52, height: 52, borderRadius: 10, flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{it.nom}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{it.typeLabel} · {it.sub}</div>
              </div>
              <Star cat={it.cat} id={it.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
