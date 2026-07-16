import { useEffect, useMemo, useState } from 'react';
import { ScreenTitle } from '../components/ui';
import { useAI } from '../lib/useAI';
import { NoKeyBanner, fieldStyle, Label } from './ia/parts';
import {
  getSources, addSource, removeSource, patchSource,
  getCastings, addCastings, patchCasting, removeCasting,
  getProfile, setProfile,
  type CastingSource, type Casting, type CastingProfile,
} from '../lib/castingStore';
import { scanSource, sha256 } from '../lib/castingScan';
import { messagesFor, toCasting } from '../lib/castingAI';
import { joursDepuisAujourdhui, delaiRelatif, dateLongue } from '../lib/date';

const MAX_AI = 15; // plafond d'analyses IA par « vérification » (maîtrise du coût)

const chip = (bg = 'transparent', color = 'var(--gold-chip-text)'): React.CSSProperties => ({
  fontSize: 11.5, padding: '2px 9px', borderRadius: 999, border: '1px solid var(--b-chip)', background: bg, color, whiteSpace: 'nowrap',
});

function scoreColor(s?: number) {
  if (s == null) return 'var(--text-muted)';
  if (s >= 80) return '#7ec27e';
  if (s >= 55) return 'var(--gold)';
  return 'var(--text-2)';
}

export default function Casting() {
  const { run, hasKey } = useAI();

  const [sources, setSources] = useState<CastingSource[]>([]);
  const [castings, setCastings] = useState<Casting[]>([]);
  const [profile, setProfileState] = useState<CastingProfile>({});
  const [newUrl, setNewUrl] = useState('');
  const [srcErr, setSrcErr] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [sel, setSel] = useState<Casting | null>(null);
  const [q, setQ] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [remOnly, setRemOnly] = useState(false);

  const refresh = async () => { setSources(await getSources()); setCastings(await getCastings()); };
  useEffect(() => { void refresh(); void getProfile().then(setProfileState); }, []);

  const addSrc = async () => {
    setSrcErr('');
    const r = await addSource(newUrl);
    if (!r.ok) { setSrcErr(r.error || 'Erreur'); return; }
    setNewUrl('');
    setSources(await getSources());
  };
  const rmSrc = async (id: string) => { await removeSource(id); setSources(await getSources()); };
  const saveProfile = async (p: CastingProfile) => { setProfileState(p); await setProfile(p); };

  const checkNow = async () => {
    if (!hasKey || scanning) return;
    setScanning(true);
    setProgress('Lecture des sources…');
    const known = new Set((await getCastings()).map((c) => c.id));
    const srcs = await getSources();
    const collected: Casting[] = [];
    let ai = 0;
    outer: for (const src of srcs) {
      setProgress(`Source « ${src.label} »…`);
      const scan = await scanSource(src);
      await patchSource(src.id, { lastCheck: new Date().toISOString(), lastHash: scan.hash, lastError: scan.error });
      if (scan.error) continue;
      for (const cand of scan.candidates) {
        const id = await sha256(cand.url);
        if (known.has(id)) continue;
        if (ai >= MAX_AI) break outer;
        ai++;
        setProgress(`Analyse IA ${ai}/${MAX_AI}…`);
        try {
          const raw = await run(messagesFor(cand, profile), undefined, 0.2);
          const c = await toCasting(cand, raw);
          if (c) { collected.push(c); known.add(id); }
        } catch { /* une annonce en échec n'arrête pas le scan */ }
      }
    }
    const added = await addCastings(collected);
    setSources(await getSources());
    setCastings(await getCastings());
    setProgress(added ? `✓ ${added} nouvelle${added > 1 ? 's' : ''} annonce${added > 1 ? 's' : ''}.` : (ai ? 'Rien de nouveau à analyser.' : 'Aucun candidat (ajoutez des sources ?).'));
    setScanning(false);
  };

  const openDetail = (c: Casting) => { setSel(c); if (!c.seen) void patchCasting(c.id, { seen: true }).then(refresh); };
  const archive = async (id: string) => { await patchCasting(id, { archived: true }); setSel(null); await refresh(); };
  const del = async (id: string) => { await removeCasting(id); setSel(null); await refresh(); };

  const active = useMemo(() => castings.filter((c) => !c.archived), [castings]);
  const today = new Date().toISOString().slice(0, 10);
  const soon = (c: Casting) => c.dateLimite != null && joursDepuisAujourdhui(c.dateLimite) >= 0 && joursDepuisAujourdhui(c.dateLimite) <= 7;
  const stats = useMemo(() => ({
    nouveaux: active.filter((c) => c.foundAt.slice(0, 10) === today).length,
    expirent: active.filter(soon).length,
    compat: active.filter((c) => (c.score ?? 0) >= 80).length,
    cv: active.filter((c) => c.cvRequis).length,
    video: active.filter((c) => c.videoRequise).length,
  }), [active, today]);

  const list = useMemo(() => {
    const nq = q.trim().toLowerCase();
    return active
      .filter((c) => (c.score ?? 0) >= minScore)
      .filter((c) => !remOnly || c.remunere === true)
      .filter((c) => !nq || `${c.titre} ${c.compagnie ?? ''} ${c.ville ?? ''}`.toLowerCase().includes(nq))
      .sort((a, b) => (b.score ?? -1) - (a.score ?? -1) || (a.foundAt < b.foundAt ? 1 : -1));
  }, [active, q, minScore, remOnly]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Casting">
      <ScreenTitle over="Veille & candidatures">Castings</ScreenTitle>

      {!hasKey && <NoKeyBanner />}

      {/* Tableau de bord */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <Stat n={stats.nouveaux} label={<>nouveaux<br />aujourd'hui</>} />
        <Stat n={stats.expirent} label={<>expirent<br />sous 7 j</>} />
        <Stat n={stats.compat} label={<>très<br />compatibles</>} accent />
      </div>
      {(stats.cv > 0 || stats.video > 0) && (
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
          {stats.cv > 0 && <>📄 {stats.cv} demandent un CV{stats.video > 0 ? ' · ' : ''}</>}
          {stats.video > 0 && <>🎥 {stats.video} demandent une vidéo</>}
        </div>
      )}

      {/* Vérifier */}
      <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: !hasKey || scanning || sources.length === 0 ? 0.6 : 1 }}
        disabled={!hasKey || scanning || sources.length === 0} onClick={checkNow}>
        {scanning ? 'Vérification…' : '⟳ Vérifier maintenant'}
      </button>
      {progress && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center', marginTop: -8 }}>{progress}</div>}

      {/* Profil (pour le score) */}
      <Collapsible open={profileOpen} onToggle={() => setProfileOpen((v) => !v)}
        title={`Mon profil${profile.genre || profile.age ? ` · ${[profile.genre, profile.age].filter(Boolean).join(', ')}` : ' (à renseigner pour le score)'}`}>
        <ProfileEditor profile={profile} onChange={saveProfile} />
      </Collapsible>

      {/* Sources */}
      <Collapsible open={false} defaultOpen title={`Mes sources (${sources.length})`}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 8 }}>
          Ajoutez l'URL d'un <strong>flux RSS</strong> ou d'une <strong>page d'appels à candidatures</strong> (compagnie, théâtre, festival).
          La page est lue à la demande, une seule fois, quand vous vérifiez.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ ...fieldStyle, flex: 1 }} inputMode="url" placeholder="https://…" value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') void addSrc(); }} />
          <button className="gold-btn" style={{ padding: '10px 16px', fontSize: 14 }} onClick={addSrc}>Ajouter</button>
        </div>
        {srcErr && <div style={{ fontSize: 12.5, color: 'var(--red-chip-text)', marginTop: 4 }}>{srcErr}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
          {sources.map((s) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: s.lastError ? 'var(--red-chip-text)' : 'var(--text-muted)' }}>
                  {s.lastError ? `⚠️ ${s.lastError}` : s.lastCheck ? `vérifié ${delaiRelatif(s.lastCheck.slice(0, 10))}` : 'jamais vérifié'}
                </div>
              </div>
              <button onClick={() => rmSrc(s.id)} aria-label="Retirer" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
          ))}
          {sources.length === 0 && <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucune source pour l'instant.</div>}
        </div>
      </Collapsible>

      {/* Filtres */}
      {active.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input style={fieldStyle} placeholder="Filtrer (titre, compagnie, ville)…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[[0, 'Tous'], [55, '≥ 55 %'], [80, 'Très compatibles']].map(([v, l]) => (
              <span key={v} onClick={() => setMinScore(v as number)} style={{ ...chip(minScore === v ? 'var(--gold)' : 'transparent', minScore === v ? 'var(--on-gold)' : 'var(--gold-chip-text)'), cursor: 'pointer', fontSize: 12.5, padding: '4px 11px' }}>{l}</span>
            ))}
            <span onClick={() => setRemOnly((v) => !v)} style={{ ...chip(remOnly ? 'var(--gold)' : 'transparent', remOnly ? 'var(--on-gold)' : 'var(--gold-chip-text)'), cursor: 'pointer', fontSize: 12.5, padding: '4px 11px' }}>Rémunéré</span>
          </div>
        </div>
      )}

      {/* Liste */}
      {list.map((c) => (
        <div key={c.id} onClick={() => openDetail(c)} className="card card-tap" style={{ padding: '13px 15px', display: 'flex', gap: 12, opacity: c.seen ? 0.82 : 1 }}>
          <div style={{ flex: 'none', width: 46, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 700, color: scoreColor(c.score) }}>{c.score != null ? `${c.score}` : '—'}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.score != null ? '%' : ''}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>{c.titre}</div>
              {!c.seen && <span style={{ flex: 'none', fontSize: 10.5, color: 'var(--gold)', letterSpacing: 1 }}>NOUVEAU</span>}
            </div>
            {(c.compagnie || c.ville) && <div style={{ fontSize: 13, color: 'var(--text-2)', fontStyle: 'italic', marginTop: 1 }}>{[c.compagnie, c.ville].filter(Boolean).join(' · ')}</div>}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6, alignItems: 'center' }}>
              {c.type && <span style={chip('var(--red-chip-bg, rgba(158,43,58,.15))', 'var(--red-chip-text)')}>{c.type}</span>}
              {(c.profils ?? []).slice(0, 3).map((p) => <span key={p} style={chip()}>{p}</span>)}
              {c.remunere === true && <span style={chip()}>€ rémunéré</span>}
              {c.cvRequis && <span style={chip()}>CV</span>}
              {c.videoRequise && <span style={chip()}>vidéo</span>}
              {c.dateLimite && <span style={{ ...chip('transparent', soon(c) ? 'var(--red-chip-text)' : 'var(--text-muted)'), border: 'none', fontStyle: 'italic' }}>limite {delaiRelatif(c.dateLimite)}</span>}
            </div>
          </div>
        </div>
      ))}
      {active.length > 0 && list.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14 }}>Aucune annonce ne correspond au filtre.</div>
      )}
      {active.length === 0 && (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.5 }}>
          Aucune annonce pour l'instant.<br />Ajoutez des sources ci-dessus, puis touchez « Vérifier maintenant ».
        </div>
      )}

      {sel && <Detail c={sel} onClose={() => setSel(null)} onArchive={() => archive(sel.id)} onDelete={() => del(sel.id)} soon={soon(sel)} />}
    </div>
  );
}

function Stat({ n, label, accent }: { n: number; label: React.ReactNode; accent?: boolean }) {
  return (
    <div className="card card-16" style={{ padding: 10, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700, color: accent ? '#7ec27e' : 'var(--gold)' }}>{n}</div>
      <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.2 }}>{label}</div>
    </div>
  );
}

function Collapsible({ title, open, defaultOpen, onToggle, children }: { title: string; open?: boolean; defaultOpen?: boolean; onToggle?: () => void; children: React.ReactNode }) {
  const [localOpen, setLocalOpen] = useState(defaultOpen ?? false);
  const isOpen = onToggle ? open : localOpen;
  const toggle = onToggle ?? (() => setLocalOpen((v) => !v));
  return (
    <div className="card card-16" style={{ padding: 0, overflow: 'hidden' }}>
      <button onClick={toggle} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '13px 16px', color: 'var(--text)', fontSize: 14.5, fontFamily: 'var(--font-body)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        <span style={{ color: 'var(--gold)', flex: 'none' }}>{isOpen ? '▾' : '▸'}</span>
      </button>
      {isOpen && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
    </div>
  );
}

function ProfileEditor({ profile, onChange }: { profile: CastingProfile; onChange: (p: CastingProfile) => void }) {
  const set = (patch: Partial<CastingProfile>) => onChange({ ...profile, ...patch });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}><Label>Genre</Label><input style={fieldStyle} placeholder="Homme / Femme…" value={profile.genre ?? ''} onChange={(e) => set({ genre: e.target.value })} /></div>
        <div style={{ flex: 1 }}><Label>Âge</Label><input style={fieldStyle} placeholder="ex. 38" value={profile.age ?? ''} onChange={(e) => set({ age: e.target.value })} /></div>
      </div>
      <div><Label>Styles</Label><input style={fieldStyle} placeholder="contemporain, classique…" value={profile.styles ?? ''} onChange={(e) => set({ styles: e.target.value })} /></div>
      <div><Label>Régions acceptées</Label><input style={fieldStyle} placeholder="Île-de-France, Suisse romande…" value={profile.regions ?? ''} onChange={(e) => set({ regions: e.target.value })} /></div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-2b)', cursor: 'pointer' }}>
        <input type="checkbox" checked={!!profile.remunereUniquement} onChange={(e) => set({ remunereUniquement: e.target.checked })} />
        Ne me proposer que des annonces rémunérées
      </label>
      <div><Label>Notes (facultatif)</Label><textarea style={{ ...fieldStyle, minHeight: 56, resize: 'vertical' }} placeholder="disponibilités, langues, permis, compétences…" value={profile.notes ?? ''} onChange={(e) => set({ notes: e.target.value })} /></div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 14 }}>
      <span style={{ flex: 'none', width: 96, color: 'var(--text-muted)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', paddingTop: 2 }}>{label}</span>
      <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
    </div>
  );
}

function Detail({ c, soon, onClose, onArchive, onDelete }: { c: Casting; soon: boolean; onClose: () => void; onArchive: () => void; onDelete: () => void }) {
  const lien: React.CSSProperties = { color: 'var(--gold-chip-text)', wordBreak: 'break-all' };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, margin: '0 auto', background: 'var(--bg-drawer)', borderTop: '1px solid var(--b-chip)', borderRadius: '18px 18px 0 0', padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '92%', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>{c.type || 'Annonce'}{c.score != null ? ` · compatibilité ${c.score} %` : ''}</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 20, fontWeight: 700, marginTop: 2 }}>{c.titre}</div>
          </div>
          <button onClick={onClose} aria-label="Fermer" style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 22, cursor: 'pointer', flex: 'none' }}>×</button>
        </div>

        {c.raisons && c.raisons.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, background: 'var(--bg-card)', border: '1px solid var(--b-rest2)', borderRadius: 10, padding: '10px 12px' }}>
            {c.raisons.map((r, i) => <div key={i} style={{ fontSize: 13.5, color: 'var(--text-2b)' }}>{r}</div>)}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Row label="Compagnie">{c.compagnie}</Row>
          <Row label="Lieu">{[c.ville, c.pays].filter(Boolean).join(', ') || null}</Row>
          <Row label="Profils">{c.profils?.length ? c.profils.join(', ') : null}</Row>
          <Row label="Rémunéré">{c.remunere == null ? null : (c.remunere ? 'Oui' : 'Non')}{c.intermittence ? ' · intermittence' : ''}</Row>
          <Row label="Publié">{c.datePublication ? dateLongue(c.datePublication) : null}</Row>
          <Row label="Limite">{c.dateLimite ? <span style={{ color: soon ? 'var(--red-chip-text)' : 'var(--text)' }}>{dateLongue(c.dateLimite)} ({delaiRelatif(c.dateLimite)})</span> : null}</Row>
          <Row label="Demandé">{[c.cvRequis ? 'CV' : '', c.videoRequise ? 'vidéo' : ''].filter(Boolean).join(' · ') || null}</Row>
          <Row label="Contact">{c.contact}</Row>
          <Row label="Email">{c.email ? <a href={`mailto:${c.email}`} style={lien}>{c.email}</a> : null}</Row>
          <Row label="Tél">{c.telephone ? <a href={`tel:${c.telephone}`} style={lien}>{c.telephone}</a> : null}</Row>
        </div>

        {c.resume && <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{c.resume}</div>}

        <a href={c.url} target="_blank" rel="noopener noreferrer" className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, textAlign: 'center', textDecoration: 'none' }}>Ouvrir l'annonce ↗</a>

        <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
          <button onClick={onArchive} style={{ flex: 1, padding: '9px 14px', fontSize: 13.5, borderRadius: 999, border: '1px solid var(--b-input)', background: 'var(--bg-field)', color: 'var(--text)', cursor: 'pointer' }}>Archiver</button>
          <button onClick={onDelete} style={{ padding: '9px 16px', fontSize: 13.5, borderRadius: 999, border: '1px solid var(--red-chip-border)', background: 'none', color: 'var(--red-chip-text)', cursor: 'pointer' }}>Supprimer</button>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
          Infos extraites automatiquement — vérifiez toujours sur l'annonce d'origine avant de candidater.
        </div>
      </div>
    </div>
  );
}
