import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/ui';
import { PARCOURS } from '../data/parcours';

export default function Parcours() {
  const nav = useNavigate();
  const [sel, setSel] = useState<string | null>(null);
  const parcours = PARCOURS.find((p) => p.id === sel) ?? null;

  // ── Choix du profil ──
  if (!parcours) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Parcours d'apprentissage">
        <BackHeader to="/explorer" title="Parcours d'apprentissage" sub="Un chemin adapté à votre profil" />
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Choisissez votre profil</div>
        {PARCOURS.map((p) => (
          <div key={p.id} onClick={() => setSel(p.id)} className="card card-16 card-tap" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
            <div style={{ fontSize: 30, flex: 'none', width: 46, height: 46, borderRadius: 12, background: 'var(--fallback-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 600 }}>{p.profil}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 2 }}>{p.sous}</div>
              <div style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 4 }}>{p.etapes.length} étapes</div>
            </div>
            <div style={{ fontSize: 20, color: 'var(--gold)' }}>→</div>
          </div>
        ))}
      </div>
    );
  }

  // ── Parcours sélectionné ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label={`Parcours ${parcours.profil}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setSel(null)} aria-label="Retour aux profils"
          style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: 20, lineHeight: 1, background: 'none', border: 'none', padding: 0 }}>←</button>
        <div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700 }}>{parcours.emoji} {parcours.profil}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{parcours.sous}</div>
        </div>
      </div>

      <div style={{ fontSize: 14.5, color: 'var(--text-2b)', lineHeight: 1.5 }}>{parcours.description}</div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {parcours.etapes.map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 14 }}>
            {/* colonne numéro + fil */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30, flex: 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--gold)', color: 'var(--on-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 14, flex: 'none' }}>{i + 1}</div>
              {i < parcours.etapes.length - 1 && <div style={{ width: 2, flex: 1, background: 'rgba(212,169,78,.25)', minHeight: 14 }} />}
            </div>
            {/* carte étape cliquable */}
            <div onClick={() => nav(e.to)} className="card card-tap" style={{ flex: 1, padding: '12px 14px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: 16, fontWeight: 600 }}>{e.titre}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{e.txt}</div>
              </div>
              <div style={{ fontSize: 18, color: 'var(--gold)', flex: 'none' }}>→</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setSel(null)} style={{ alignSelf: 'flex-start', padding: '9px 18px', fontSize: 14, borderRadius: 999, background: 'transparent', border: '1px solid var(--b-rest2)', color: 'var(--text)', cursor: 'pointer' }}>
        ← Changer de profil
      </button>
    </div>
  );
}
