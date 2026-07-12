import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { BackHeader } from '../components/ui';
import WikiImage from '../components/WikiImage';
import { LIEUX } from '../data/content';
import type { Lieu } from '../data/types';

const FILTRES: { label: string; type: Lieu['type'] | 'all' }[] = [
  { label: 'Grands théâtres', type: 'theatre' },
  { label: 'Festivals', type: 'festival' },
  { label: 'Traditions', type: 'tradition' },
  { label: 'Écoles', type: 'ecole' },
];

// Couleur par catégorie (théâtres, festivals, traditions, écoles).
const TYPE_COLOR: Record<Lieu['type'], string> = {
  theatre: '#d4a94e',
  festival: '#9e2b3a',
  tradition: '#5f8ea8',
  ecole: '#8e9e5a',
};
const TYPE_GLOW: Record<Lieu['type'], string> = {
  theatre: 'rgba(212,169,78,.25)',
  festival: 'rgba(158,43,58,.3)',
  tradition: 'rgba(95,142,168,.3)',
  ecole: 'rgba(142,158,90,.3)',
};

function pinIcon(type: Lieu['type']) {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:12px;height:12px;border-radius:999px;background:${TYPE_COLOR[type]};box-shadow:0 0 0 5px ${TYPE_GLOW[type]}"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

// Ajuste le cadrage de la carte aux lieux affichés (recadre aussi au filtrage).
function FitBounds({ lieux }: { lieux: Lieu[] }) {
  const map = useMap();
  useEffect(() => {
    if (!lieux.length) return;
    const bounds = L.latLngBounds(lieux.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 5, animate: true });
  }, [lieux, map]);
  return null;
}

export default function Carte() {
  const [active, setActive] = useState<Lieu['type'] | null>(null);

  const lieux = useMemo(
    () => (active ? LIEUX.filter((l) => l.type === active) : LIEUX),
    [active],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Carte du monde">
      <BackHeader to="/explorer" title="Carte du monde" />

      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--b-input)', height: 260 }}>
        <MapContainer center={[30, 18]} zoom={2} minZoom={2} worldCopyJump style={{ height: '100%', width: '100%' }} scrollWheelZoom={false} attributionControl>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <FitBounds lieux={lieux} />
          {lieux.map((l) => (
            <Marker key={l.id} position={[l.lat, l.lng]} icon={pinIcon(l.type)}>
              <Popup>
                <strong style={{ fontFamily: 'var(--font-title)' }}>{l.nom}</strong>
                <br />
                <span style={{ color: 'var(--text-muted)' }}>{l.lieu}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 500, fontSize: 11, color: 'var(--text-muted)', background: 'rgba(19,13,18,.78)', padding: '4px 8px', borderRadius: 6, pointerEvents: 'none', lineHeight: 1.5 }}>
          <span style={{ color: TYPE_COLOR.theatre }}>●</span> théâtres · <span style={{ color: TYPE_COLOR.festival }}>●</span> festivals<br />
          <span style={{ color: TYPE_COLOR.tradition }}>●</span> traditions · <span style={{ color: TYPE_COLOR.ecole }}>●</span> écoles
        </div>
      </div>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {FILTRES.map((f) => (
          <button key={f.label} className={`chip${active === f.type ? ' active' : ''}`}
            onClick={() => setActive(active === f.type ? null : (f.type as Lieu['type']))}>
            {f.label} <span style={{ opacity: 0.55, fontSize: '0.85em' }}>{LIEUX.filter((l) => l.type === f.type).length}</span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{lieux.length} lieu{lieux.length > 1 ? 'x' : ''}</div>

      {lieux.map((l) => (
        <div key={l.id} className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px' }}>
          <WikiImage file={l.img} initial={l.initiale} initialSize={24} style={{ width: 64, height: 64, borderRadius: 10, flex: 'none' }} objectPosition="center" />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600, flex: 1 }}>{l.nom}</div>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: TYPE_COLOR[l.type], flex: 'none' }} />
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{l.lieu}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{l.txt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
