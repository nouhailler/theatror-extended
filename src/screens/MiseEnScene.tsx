import { useEffect, useRef, useState } from 'react';
import { BackHeader } from '../components/ui';
import Credit from '../components/Credit';
import { wiki } from '../lib/wikimedia';
import { KEYS, idbGet, idbSet } from '../lib/storage';

interface Acteur { id: string; nom: string; x: number; y: number; couleur: string }
interface Plateau { acteurs: Acteur[]; decor: string; lumiere: string }

// Chaque décor : dégradé de repli + photo/tableau réaliste (Wikimedia) en fond de scène.
const DECORS = [
  { id: 'grec', nom: 'Théâtre grec', bg: 'radial-gradient(circle at 50% 30%, #6b5d47, #3d3527)', img: 'Epidaurus Theater.jpg' },
  { id: 'palais', nom: 'Palais', bg: 'linear-gradient(160deg, #4a1f28, #2a1018)', img: 'Chateau Versailles Galerie des Glaces.jpg' },
  { id: 'rue', nom: 'Rue', bg: 'linear-gradient(160deg, #3a3d42, #26282c)', img: 'Rothenburg BW 4.JPG' },
  { id: 'foret', nom: 'Forêt', bg: 'linear-gradient(160deg, #26402a, #16261a)', img: 'Fairmead Road at High Beach, Epping Forest, Essex England.jpg' },
  { id: 'interieur', nom: 'Intérieur bourgeois', bg: 'linear-gradient(160deg, #4a3826, #2c2015)', img: "Autour d'une partition - Charles Baude after Albert Aublet.jpg" },
  { id: 'taverne', nom: 'Taverne', bg: 'linear-gradient(160deg, #3d2c1a, #241810)', img: 'Teniers le Jeune, Intérieur de cabaret.jpg' },
  { id: 'jardin', nom: 'Jardin', bg: 'linear-gradient(160deg, #2f4a33, #1c3021)', img: '0 Château de Vaux-le-Vicomte - Jardins (5).JPG' },
  { id: 'mer', nom: 'Bord de mer', bg: 'linear-gradient(160deg, #23485c, #142d3c)', img: "Vue d'Étretat.jpg" },
];

// Petite figurine de comédien (silhouette en robe), teintée par la couleur du rôle.
function Figurine({ couleur, selected }: { couleur: string; selected: boolean }) {
  return (
    <svg width={30} height={46} viewBox="0 0 24 46" style={{
      display: 'block',
      filter: selected
        ? 'drop-shadow(0 0 3px #fff) drop-shadow(0 2px 3px rgba(0,0,0,.55))'
        : 'drop-shadow(0 2px 3px rgba(0,0,0,.55))',
    }}>
      <ellipse cx="12" cy="44" rx="8" ry="2.2" fill="rgba(0,0,0,.4)" />
      <g fill={couleur} stroke="rgba(0,0,0,.4)" strokeWidth="0.8">
        <circle cx="12" cy="7" r="5" />
        <path d="M12 12 C8 12 6 15 6 19 L3.5 40 C3.4 41 4 41.6 5 41.6 L19 41.6 C20 41.6 20.6 41 20.5 40 L18 19 C18 15 16 12 12 12 Z" />
      </g>
    </svg>
  );
}

const LUMIERES = [
  { id: 'plein-feu', nom: 'Plein feu', overlay: 'radial-gradient(circle at 50% 38%, rgba(255,244,214,.14), rgba(0,0,0,.06))' },
  { id: 'clair-obscur', nom: 'Clair-obscur', overlay: 'radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 28%, rgba(0,0,0,.78) 100%)' },
  { id: 'nuit', nom: 'Nuit', overlay: 'linear-gradient(rgba(24,34,78,.5), rgba(10,15,40,.66))' },
  { id: 'coucher', nom: 'Coucher de soleil', overlay: 'linear-gradient(rgba(255,140,60,.26), rgba(178,48,90,.30))' },
  { id: 'projecteur', nom: 'Projecteur', overlay: 'radial-gradient(circle at 50% 40%, rgba(255,250,230,.4) 0%, rgba(255,250,230,0) 20%, rgba(0,0,0,.74) 62%)' },
  { id: 'rouge', nom: 'Ambiance rouge', overlay: 'linear-gradient(rgba(160,22,32,.34), rgba(90,10,20,.46))' },
];

const PALETTE = ['#d4a94e', '#5f8ea8', '#9e2b3a', '#8e9e5a', '#a85a72', '#c98b4e', '#7a6fae', '#4aa38a'];

const DEFAUT: Plateau = { acteurs: [], decor: 'palais', lumiere: 'plein-feu' };
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function MiseEnScene() {
  const [plateau, setPlateau] = useState<Plateau>(DEFAUT);
  const [selected, setSelected] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<string | null>(null);

  // Chargement de la sauvegarde
  useEffect(() => {
    idbGet<Plateau>(KEYS.miseEnScene, DEFAUT).then((p) => { setPlateau(p); setLoaded(true); });
  }, []);

  // Sauvegarde à chaque changement (après le chargement initial)
  useEffect(() => { if (loaded) void idbSet(KEYS.miseEnScene, plateau); }, [plateau, loaded]);

  const decor = DECORS.find((d) => d.id === plateau.decor) ?? DECORS[0];
  const lumiere = LUMIERES.find((l) => l.id === plateau.lumiere) ?? LUMIERES[0];
  const acteur = plateau.acteurs.find((a) => a.id === selected) ?? null;

  const setActeurs = (fn: (a: Acteur[]) => Acteur[]) => setPlateau((p) => ({ ...p, acteurs: fn(p.acteurs) }));

  const ajouter = () => {
    const n = plateau.acteurs.length;
    const id = `a${Date.now()}`;
    const nouv: Acteur = {
      id, nom: `Acteur ${n + 1}`,
      x: clamp(35 + (n % 5) * 8, 8, 92), y: clamp(45 + (n % 3) * 10, 10, 90),
      couleur: PALETTE[n % PALETTE.length],
    };
    setActeurs((a) => [...a, nouv]);
    setSelected(id);
  };

  const supprimer = (id: string) => { setActeurs((a) => a.filter((x) => x.id !== id)); if (selected === id) setSelected(null); };
  const renommer = (id: string, nom: string) => setActeurs((a) => a.map((x) => x.id === id ? { ...x, nom } : x));
  const recolorer = (id: string, couleur: string) => setActeurs((a) => a.map((x) => x.id === id ? { ...x, couleur } : x));

  // Déplacement des pastilles (pointer events, tactile + souris)
  const onPinDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    setSelected(id);
    dragRef.current = id;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPinMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 5, 95);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 6, 94);
    setActeurs((a) => a.map((x2) => x2.id === dragRef.current ? { ...x2, x, y } : x2));
  };
  const onPinUp = () => { dragRef.current = null; };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Mise en scène virtuelle">
      <BackHeader to="/explorer" title="Mise en scène" sub="Placez vos acteurs sur le plateau" />

      {/* Plateau vu de dessus */}
      <div ref={stageRef} onPointerDown={() => setSelected(null)}
        style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--b-input)', background: decor.bg, touchAction: 'none', userSelect: 'none' }}>
        {/* Décor réaliste en fond de scène (Wikimedia) */}
        {decor.img && (
          <img key={decor.img} src={wiki(decor.img, 800)} alt="" aria-hidden
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
        )}
        {/* Fond de scène / avant-scène (repères d'orientation) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, background: 'linear-gradient(rgba(0,0,0,.35), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Fond de scène</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 22, background: 'linear-gradient(transparent, rgba(0,0,0,.4))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Public</div>

        {/* Couche lumière */}
        <div style={{ position: 'absolute', inset: 0, background: lumiere.overlay, pointerEvents: 'none' }} />

        {/* Pastilles d'acteurs */}
        {plateau.acteurs.map((a) => (
          <div key={a.id}
            onPointerDown={(e) => onPinDown(e, a.id)} onPointerMove={onPinMove} onPointerUp={onPinUp}
            style={{ position: 'absolute', left: `${a.x}%`, top: `${a.y}%`, transform: `translate(-50%, -80%) scale(${selected === a.id ? 1.12 : 1})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, cursor: 'grab', touchAction: 'none' }}>
            <Figurine couleur={a.couleur} selected={selected === a.id} />
            <div style={{ fontSize: 10.5, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,.9)', whiteSpace: 'nowrap', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.nom}</div>
          </div>
        ))}

        {plateau.acteurs.length === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.6)', fontStyle: 'italic', fontSize: 14, pointerEvents: 'none' }}>
            Ajoutez un acteur puis glissez-le
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="gold-btn" style={{ padding: '10px 16px', fontSize: 14.5, flex: 1 }} onClick={ajouter}>+ Acteur</button>
        {plateau.acteurs.length > 0 && (
          <button onClick={() => { setPlateau((p) => ({ ...p, acteurs: [] })); setSelected(null); }}
            style={{ padding: '10px 16px', fontSize: 14.5, borderRadius: 999, background: 'transparent', border: '1px solid var(--b-rest2)', color: 'var(--text)', cursor: 'pointer' }}>
            Vider le plateau
          </button>
        )}
      </div>

      {/* Éditeur de l'acteur sélectionné */}
      {acteur && (
        <div className="card card-16" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input value={acteur.nom} onChange={(e) => renommer(acteur.id, e.target.value)} placeholder="Nom du rôle"
            style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '9px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {PALETTE.map((c) => (
              <button key={c} onClick={() => recolorer(acteur.id, c)} aria-label="Couleur"
                style={{ width: 24, height: 24, borderRadius: 999, background: c, border: acteur.couleur === c ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer' }} />
            ))}
            <button onClick={() => supprimer(acteur.id)} style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: 13, borderRadius: 999, background: 'var(--red-chip-bg)', border: '1px solid var(--red-chip-border)', color: 'var(--red-chip-text)', cursor: 'pointer' }}>Supprimer</button>
          </div>
        </div>
      )}

      {/* Décor */}
      <div>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Décor</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {DECORS.map((d) => (
            <button key={d.id} className={`chip${plateau.decor === d.id ? ' active' : ''}`} onClick={() => setPlateau((p) => ({ ...p, decor: d.id }))}>{d.nom}</button>
          ))}
        </div>
        <div style={{ marginTop: 8 }}><Credit file={decor.img} /></div>
      </div>

      {/* Lumière */}
      <div>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Ambiance lumineuse</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {LUMIERES.map((l) => (
            <button key={l.id} className={`chip${plateau.lumiere === l.id ? ' active' : ''}`} onClick={() => setPlateau((p) => ({ ...p, lumiere: l.id }))}>{l.nom}</button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>Votre plateau est enregistré automatiquement sur cet appareil.</div>
    </div>
  );
}
