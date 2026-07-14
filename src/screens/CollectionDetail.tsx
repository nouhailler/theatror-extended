import { useParams, useNavigate } from 'react-router-dom';
import { COLLECTIONS } from '../data/content';
import { piecesForCollection } from '../data/collectionMembers';
import { wiki } from '../lib/wikimedia';
import PieceCard from '../components/PieceCard';

export default function CollectionDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const col = COLLECTIONS.find((c) => c.id === id);

  if (!col) {
    return (
      <div style={{ padding: 18 }}>
        <button onClick={() => nav('/explorer/collections')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>← Retour</button>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Collection introuvable.</p>
      </div>
    );
  }

  const pieces = piecesForCollection(col.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} data-screen-label={`Collection ${col.titre}`}>
      {/* Bandeau */}
      <div style={{ position: 'relative', height: 150, background: col.fond, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--font-title)', fontSize: 60, color: 'rgba(242,233,220,.25)' }}>{col.initiale}</span>
        {col.img && (
          <img src={wiki(col.img, 800)} alt={col.titre} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.7 }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,16,21,.2) 0%,rgba(23,16,21,0) 30%,rgba(23,16,21,.92) 100%)' }} />
        <button onClick={() => nav('/explorer/collections')} aria-label="Retour"
          style={{ position: 'absolute', top: 12, left: 14, cursor: 'pointer', color: 'var(--text)', fontSize: 20, background: 'rgba(23,16,21,.55)', borderRadius: 999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>←</button>
        <div style={{ position: 'absolute', left: 18, bottom: 12, right: 18 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Collection</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 23, fontWeight: 700, lineHeight: 1.15 }}>{col.titre}</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-2)', fontStyle: 'italic' }}>{col.desc}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 18px 28px' }}>
        <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {pieces.length} pièce{pieces.length > 1 ? 's' : ''} du catalogue dans cette collection
        </div>
        {pieces.map((p) => <PieceCard key={p.id} p={p} />)}
        {pieces.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
            Aucune pièce dans cette collection pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}
