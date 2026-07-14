import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../../components/ui';
import { useRehearsalStore } from '../../lib/rehearsalStore';

export default function Repetition() {
  const nav = useNavigate();
  const { plays, loaded, load, remove } = useRehearsalStore();

  useEffect(() => { void load(); }, [load]);

  const openPlay = (id: string, hasConfig: boolean) =>
    nav(hasConfig ? `/repetition/${id}/jouer` : `/repetition/${id}/config`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Répétition">
      <BackHeader to="/explorer" title="Mode répétition" sub="Répétez votre rôle : l'app lit les autres, vous répondez" />

      <button className="gold-btn" style={{ padding: '12px 18px', fontSize: 15.5 }} onClick={() => nav('/repetition/nouveau')}>
        ＋ Nouvelle pièce
      </button>

      {loaded && plays.length === 0 && (
        <div style={{ textAlign: 'center', padding: '30px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5, lineHeight: 1.6 }}>
          Aucune pièce enregistrée.<br />Collez le texte d'une scène pour commencer à répéter.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plays.map((p) => {
          const nbPerso = p.script.characters.length;
          const nbLignes = p.script.items.filter((i) => i.kind === 'line').length;
          const started = p.position > 0;
          return (
            <div key={p.id} className="card card-tap" onClick={() => openPlay(p.id, !!p.config)} style={{ padding: 14, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600, lineHeight: 1.2 }}>{p.titre}</div>
                <button
                  onClick={(e) => { e.stopPropagation(); if (confirm(`Supprimer « ${p.titre} » ?`)) remove(p.id); }}
                  aria-label="Supprimer"
                  style={{ flex: 'none', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>×</button>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 4 }}>
                {nbPerso} personnage{nbPerso > 1 ? 's' : ''} · {nbLignes} réplique{nbLignes > 1 ? 's' : ''}
                {p.config?.myRole && ` · rôle : ${p.script.characters.find((c) => c.key === p.config?.myRole)?.label ?? p.config.myRole}`}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 8 }}>
                {!p.config ? 'Configurer la session →' : started ? `Reprendre — réplique ${Math.min(p.position + 1, nbLignes)} →` : 'Commencer la lecture →'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
