import { useState } from 'react';
import { useAI, humanError } from '../../lib/useAI';
import { completeChat, extractJson } from '../../lib/openrouter';
import { useStore } from '../../store';
import { PIECES } from '../../data/pieces';
import type { Piece } from '../../data/types';
import PieceCard from '../../components/PieceCard';
import { fieldStyle, Label } from './parts';

interface Reco { id: string; raison: string; }

const NIVEAUX = [
  { v: 0, label: 'Tous niveaux' },
  { v: 2, label: 'Accessible (≤ ●●○○)' },
  { v: 3, label: 'Intermédiaire (≤ ●●●○)' },
  { v: 4, label: 'Tous, y compris exigeant' },
];
const DUREES = [
  { v: 999, label: 'Peu importe' },
  { v: 90, label: "≤ 1 h 30" },
  { v: 120, label: '≤ 2 h' },
];

export default function Distribution() {
  const { hasKey, busy } = useAI();
  const settings = useStore((s) => s.settings);
  const [femmes, setFemmes] = useState('4');
  const [hommes, setHommes] = useState('6');
  const [niveau, setNiveau] = useState(0);
  const [duree, setDuree] = useState(999);
  const [recos, setRecos] = useState<Reco[] | null>(null);
  const [candidats, setCandidats] = useState<Piece[]>([]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const proposer = async () => {
    const f = parseInt(femmes, 10) || 0;
    const h = parseInt(hommes, 10) || 0;
    setLoading(true);
    setSearched(true);
    setRecos(null);
    setNote('');
    // Pré-filtre local : la pièce doit être jouable avec la troupe disponible.
    const cands = PIECES.filter(
      (p) => p.femmes <= f && p.hommes <= h && (niveau === 0 || p.difficulte <= niveau) && p.dureeMin <= duree,
    );
    setCandidats(cands);

    if (cands.length === 0) { setLoading(false); return; }
    if (!hasKey) { setLoading(false); return; } // repli : liste locale seule

    const liste = cands.map((p) => `id:${p.id} | ${p.titre} (${p.auteur}, ${p.genre}, ${p.femmes}F/${p.hommes}H, ${p.duree}, diff ${p.difficulte}/4)`).join('\n');
    const prompt = `Une troupe dispose de ${f} comédiennes et ${h} comédiens. Parmi ces pièces jouables, choisis les 3 plus adaptées et justifie en une phrase chacune. Réponds UNIQUEMENT en JSON : [{"id":"...","raison":"..."}].\n\n${liste}`;
    try {
      const txt = await completeChat({
        apiKey: settings.openRouterKey,
        model: settings.openRouterModel,
        temperature: 0.3,
        messages: [
          { role: 'system', content: "Tu es un metteur en scène qui conseille des distributions. Tu réponds en JSON strict." },
          { role: 'user', content: prompt },
        ],
      });
      const parsed = extractJson<Reco[]>(txt);
      if (parsed && Array.isArray(parsed)) {
        setRecos(parsed.filter((r) => cands.some((c) => c.id === r.id)).slice(0, 3));
      } else {
        setNote("La sélection IA n'a pu être lue — voici toutes les pièces jouables.");
      }
    } catch (e) {
      setNote(humanError(e) + ' — voici les pièces jouables ci-dessous.');
    } finally {
      setLoading(false);
    }
  };

  const byId = (id: string) => PIECES.find((p) => p.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 14.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
        Indiquez votre troupe : l'app filtre les pièces jouables, puis l'IA sélectionne les meilleures.
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Label>Comédiennes</Label>
          <input style={fieldStyle} type="number" min={0} value={femmes} onChange={(e) => setFemmes(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Comédiens</Label>
          <input style={fieldStyle} type="number" min={0} value={hommes} onChange={(e) => setHommes(e.target.value)} />
        </div>
      </div>

      <div>
        <Label>Niveau</Label>
        <select style={fieldStyle} value={niveau} onChange={(e) => setNiveau(Number(e.target.value))}>
          {NIVEAUX.map((n) => <option key={n.v} value={n.v}>{n.label}</option>)}
        </select>
      </div>
      <div>
        <Label>Durée</Label>
        <select style={fieldStyle} value={duree} onChange={(e) => setDuree(Number(e.target.value))}>
          {DUREES.map((d) => <option key={d.v} value={d.v}>{d.label}</option>)}
        </select>
      </div>

      <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: loading || busy ? 0.6 : 1 }} disabled={loading || busy} onClick={proposer}>
        {loading ? 'Recherche…' : 'Proposer des pièces'}
      </button>

      {note && <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{note}</div>}

      {/* Sélection IA */}
      {recos && recos.map((r) => {
        const p = byId(r.id);
        if (!p) return null;
        return (
          <div key={r.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <PieceCard p={p} />
            <div style={{ fontSize: 13.5, color: 'var(--gold-chip-text)', fontStyle: 'italic', padding: '0 4px' }}>★ {r.raison}</div>
          </div>
        );
      })}

      {/* Repli / candidats locaux */}
      {!recos && candidats.length > 0 && (
        <>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{candidats.length} pièce{candidats.length > 1 ? 's' : ''} jouable{candidats.length > 1 ? 's' : ''} :</div>
          {candidats.slice(0, 8).map((p) => <PieceCard key={p.id} p={p} />)}
        </>
      )}
      {!loading && !searched && (
        <div style={{ textAlign: 'center', padding: '22px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Lancez une recherche pour voir les pièces adaptées à votre troupe.
        </div>
      )}
      {!loading && searched && candidats.length === 0 && (
        <div style={{ textAlign: 'center', padding: '22px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Aucune pièce du catalogue n'est jouable avec cette troupe.<br />Augmentez le nombre de comédiens ou élargissez les critères.
        </div>
      )}
    </div>
  );
}
