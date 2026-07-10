import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

// Épingle colorée : or = théâtres, rouge = festivals.
function pinIcon(type: Lieu['type']) {
  const color = type === 'festival' ? '#9e2b3a' : type === 'theatre' ? '#d4a94e' : '#c98b4e';
  const glow = type === 'festival' ? 'rgba(158,43,58,.3)' : 'rgba(212,169,78,.25)';
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:12px;height:12px;border-radius:999px;background:${color};box-shadow:0 0 0 5px ${glow}"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
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

      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--b-input)', height: 220 }}>
        <MapContainer center={[46, 6]} zoom={4} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false} attributionControl>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
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
        <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 500, fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(19,13,18,.75)', padding: '3px 8px', borderRadius: 6, pointerEvents: 'none' }}>
          <span style={{ color: '#d4a94e' }}>●</span> théâtres · <span style={{ color: '#9e2b3a' }}>●</span> festivals
        </div>
      </div>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {FILTRES.map((f) => (
          <button key={f.label} className={`chip${active === f.type ? ' active' : ''}`}
            onClick={() => setActive(active === f.type ? null : (f.type as Lieu['type']))}>
            {f.label}
          </button>
        ))}
      </div>

      {lieux.map((l) => (
        <div key={l.id} className="card card-tap" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px' }}>
          <WikiImage file={l.img} initial={l.initiale} initialSize={24} style={{ width: 64, height: 64, borderRadius: 10, flex: 'none' }} objectPosition="center" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{l.nom}</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{l.lieu}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{l.txt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
