import { useMemo, useState } from 'react';
import { PIECES } from '../data/pieces';
import type { Piece } from '../data/types';
import { ScreenTitle } from '../components/ui';
import PieceCard from '../components/PieceCard';

interface FilterDef {
  label: string;
  group: string; // même groupe → OR ; groupes différents → AND
  test: (p: Piece) => boolean;
}

// Filtres combinables (genre, durée, distribution, décor, âge, époque, difficulté, domaine public).
// Chaque genre du catalogue est rattaché à un chip (sinon un tiers des pièces — les vaudevilles —
// serait infiltrable par genre).
const FILTERS: FilterDef[] = [
  // Genre — « humour » = Comédie ∪ Vaudeville ∪ Farce (même groupe → OR)
  { label: 'Comédie', group: 'genre', test: (p) => p.genre === 'comédie' || p.genre === 'comédie-ballet' || p.genre === 'héroï-comédie' },
  { label: 'Vaudeville', group: 'genre', test: (p) => p.genre === 'vaudeville' },
  { label: 'Farce / absurde', group: 'genre', test: (p) => p.genre === 'farce' || p.genre === 'absurde' },
  { label: 'Tragédie', group: 'genre', test: (p) => p.genre === 'tragédie' },
  { label: 'Drame', group: 'genre', test: (p) => p.genre === 'drame' || p.genre === 'tragi-comédie' },
  // Durée
  { label: 'Moins de 30 min', group: 'duree', test: (p) => p.dureeMin <= 30 },
  { label: "Moins d'1 h 30", group: 'duree', test: (p) => p.dureeMin <= 90 },
  { label: 'Moins de 2 h', group: 'duree', test: (p) => p.dureeMin <= 120 },
  // Distribution
  { label: '2 personnages', group: 'dist', test: (p) => p.femmes + p.hommes === 2 },
  { label: 'Petite distribution (≤ 6)', group: 'dist', test: (p) => p.femmes + p.hommes <= 6 },
  // Décor / âge / époque / difficulté / droits
  { label: 'Sans décor', group: 'decor', test: (p) => p.decor === 'sans décor' },
  { label: 'Pour enfants', group: 'age', test: (p) => p.pourEnfants },
  { label: 'Contemporain', group: 'epoque', test: (p) => p.epoque === 'contemporain' },
  { label: 'Classique', group: 'epoque', test: (p) => p.epoque === 'classique' },
  { label: 'Antique', group: 'epoque', test: (p) => p.epoque === 'antique' },
  { label: 'Accessible (facile)', group: 'diff', test: (p) => p.difficulte <= 2 },
  { label: 'Domaine public', group: 'dp', test: (p) => p.domainePublic },
];

export default function Pieces() {
  const [q, setQ] = useState('');
  const [active, setActive] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    // Regrouper les filtres actifs par groupe.
    const byGroup = new Map<string, FilterDef[]>();
    active.forEach((i) => {
      const f = FILTERS[i];
      const arr = byGroup.get(f.group) ?? [];
      arr.push(f);
      byGroup.set(f.group, arr);
    });
    return PIECES.filter((p) => {
      if (query && !(`${p.titre} ${p.auteur}`.toLowerCase().includes(query))) return false;
      for (const group of byGroup.values()) {
        if (!group.some((f) => f.test(p))) return false; // OR intra-groupe, AND inter-groupes
      }
      return true;
    });
  }, [q, active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Pièces">
      <ScreenTitle over="Bibliothèque">Les pièces</ScreenTitle>

      {/* Recherche */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: '10px 16px' }}>
        <span style={{ color: 'var(--gold)' }}>⌕</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Titre, auteur, personnage…"
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 15, fontStyle: q ? 'normal' : 'italic', fontFamily: 'var(--font-body)' }}
        />
        {q && (
          <button onClick={() => setQ('')} aria-label="Effacer"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>×</button>
        )}
      </div>

      {/* Chips de filtres */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {FILTERS.map((f, i) => (
          <button key={f.label} className={`chip${active.has(i) ? ' active' : ''}`} onClick={() => toggle(i)}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
        {results.length} pièce{results.length > 1 ? 's' : ''} correspond{results.length > 1 ? 'ent' : ''}
      </div>

      {results.map((p) => <PieceCard key={p.id} p={p} />)}

      {results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Aucune pièce ne correspond à ces critères.
        </div>
      )}
    </div>
  );
}
