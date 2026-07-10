import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScreenTitle } from '../components/ui';
import Star from '../components/Star';
import { MONOLOGUES, CITATIONS, GLOSSAIRE } from '../data/content';
import type { Monologue } from '../data/types';

type Seg = 'mono' | 'cit' | 'glos';

function Segmented({ value, onChange }: { value: Seg; onChange: (s: Seg) => void }) {
  const items: { k: Seg; label: string }[] = [
    { k: 'mono', label: 'Monologues' },
    { k: 'cit', label: 'Citations' },
    { k: 'glos', label: 'Glossaire' },
  ];
  return (
    <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
      {items.map((i) => {
        const active = i.k === value;
        return (
          <button key={i.k} onClick={() => onChange(i.k)}
            style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 999, fontSize: 14, cursor: 'pointer', border: 'none', fontWeight: 600, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
            {i.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Monologues ───
interface MonoFilter { label: string; group: string; test: (m: Monologue) => boolean; }
const MONO_FILTERS: MonoFilter[] = [
  { label: 'Femme', group: 'pour', test: (m) => m.pour === 'Femme' },
  { label: 'Homme', group: 'pour', test: (m) => m.pour === 'Homme' },
  { label: 'Moins de 2 min', group: 'duree', test: (m) => m.dureeMin <= 2 },
  { label: 'Classique', group: 'epoque', test: (m) => m.epoque === 'Classique' },
  { label: 'Contemporain', group: 'epoque', test: (m) => m.epoque === 'Contemporain' },
  { label: 'Difficile', group: 'niveau', test: (m) => m.niveau === 'Difficile' },
];

function Monologues() {
  const [active, setActive] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setActive((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const list = useMemo(() => {
    const byGroup = new Map<string, MonoFilter[]>();
    active.forEach((i) => { const f = MONO_FILTERS[i]; const a = byGroup.get(f.group) ?? []; a.push(f); byGroup.set(f.group, a); });
    return MONOLOGUES.filter((m) => { for (const g of byGroup.values()) if (!g.some((f) => f.test(m))) return false; return true; });
  }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {MONO_FILTERS.map((f, i) => (
          <button key={f.label} className={`chip${active.has(i) ? ' active' : ''}`} onClick={() => toggle(i)}>{f.label}</button>
        ))}
      </div>
      {list.map((m) => (
        <div key={m.id} className="card card-tap" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 17.5, fontWeight: 600 }}>{m.titre}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: 13, color: 'var(--gold)' }}>{m.duree}</span>
              <Star cat="monologues" id={m.id} />
            </div>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>{m.source}</div>
          <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 14.5, color: 'var(--text-2b)', lineHeight: 1.45 }}>{m.extrait}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{m.pour}</span>
            <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', color: 'var(--gold-chip-text)' }}>{m.emotion}</span>
            <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 999, background: 'var(--red-chip-bg)', border: '1px solid var(--red-chip-border)', color: 'var(--red-chip-text)' }}>{m.niveau}</span>
          </div>
        </div>
      ))}
      {list.length === 0 && <Empty>Aucun monologue pour ces filtres.</Empty>}
    </div>
  );
}

// ─── Citations ───
const THEMES = ['Amour', 'Pouvoir', 'Destin', 'Le théâtre', 'Mort'] as const;
function CitationsSeg() {
  const [theme, setTheme] = useState<string | null>(null);
  const list = theme ? CITATIONS.filter((c) => c.theme === theme) : CITATIONS;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {THEMES.map((t) => (
          <button key={t} className={`chip${theme === t ? ' active' : ''}`} onClick={() => setTheme(theme === t ? null : t)}>{t}</button>
        ))}
      </div>
      {list.map((q) => (
        <div key={q.id} className="card card-tap" style={{ padding: 16 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.45 }}>{q.txt}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', letterSpacing: 0.5 }}>{q.src}</div>
            <Star cat="citations" id={q.id} />
          </div>
        </div>
      ))}
      {list.length === 0 && <Empty>Aucune citation pour ce thème.</Empty>}
    </div>
  );
}

// ─── Glossaire ───
function Glossaire() {
  const lettres = useMemo(() => Array.from(new Set(GLOSSAIRE.map((g) => g.lettre))).sort(), []);
  const [lettre, setLettre] = useState<string | null>(null);
  const list = lettre ? GLOSSAIRE.filter((g) => g.lettre === lettre) : GLOSSAIRE;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {lettres.map((L) => {
          const active = lettre === L;
          return (
            <button key={L} onClick={() => setLettre(active ? null : L)}
              style={{ padding: '3px 8px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', fontWeight: active ? 600 : 400, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--on-gold)' : 'var(--text-muted)' }}>
              {L}
            </button>
          );
        })}
      </div>
      {list.map((g) => (
        <div key={g.id} style={{ borderBottom: '1px solid rgba(212,169,78,.12)', padding: '10px 2px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{g.terme}</div>
            <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>{g.cat}</div>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 4 }}>{g.def}</div>
        </div>
      ))}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>{children}</div>
  );
}

export default function Scene() {
  const [params, setParams] = useSearchParams();
  const seg = (params.get('seg') as Seg) || 'mono';
  const setSeg = (s: Seg) => setParams({ seg: s }, { replace: true });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Scène">
      <ScreenTitle over="L'atelier du comédien">Scène</ScreenTitle>
      <Segmented value={seg} onChange={setSeg} />
      {seg === 'mono' && <Monologues />}
      {seg === 'cit' && <CitationsSeg />}
      {seg === 'glos' && <Glossaire />}
    </div>
  );
}
