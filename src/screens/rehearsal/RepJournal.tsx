import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackHeader } from '../../components/ui';
import { PIECES } from '../../data/pieces';
import { loadTexte, hasTexte } from '../../data/pieceTextes';
import { dateLongue, todayISO } from '../../lib/date';
import { useRepJournalStore } from '../../lib/repJournalStore';
import { useVoiceMemo } from '../../lib/useVoiceMemo';
import {
  ENERGIE, energieOf, actsScenes, emptyEntry, isEmptyEntry,
  type ActeScenes, type RepJournalEntry,
} from '../../data/repJournal';

// Champs textuels regroupés par zone : la même liste sert au formulaire (label +
// aide) et à l'affichage d'une entrée passée.
type FieldKey = keyof RepJournalEntry;
const MES_FIELDS: { k: FieldKey; label: string; hint: string }[] = [
  { k: 'mesDeplacements', label: 'Déplacements (blocking)', hint: 'Où et quand bouger : « Entrer par jardin », « ne pas croiser X avant d’avoir fini ma phrase ».' },
  { k: 'mesRythme', label: 'Rythme et tempo', hint: 'La musique de la scène : « accélérer le début », « marquer un silence de 3 s après la réplique de Y ».' },
  { k: 'mesIntentions', label: 'Intentions demandées', hint: 'La couleur de jeu voulue : « jouer cette réplique avec ironie, pas avec colère ».' },
];
const INTERP_FIELDS: { k: FieldKey; label: string; hint: string }[] = [
  { k: 'interpDecouvertes', label: 'Découvertes / « Aha ! »', hint: 'Ce que vous avez trouvé aujourd’hui : « la bonne intention sur le mot “jamais” ».' },
  { k: 'interpRates', label: 'Ce qui n’a pas marché', hint: 'À retravailler : « je perds le fil page 12, ma transition est trop brutale ».' },
  { k: 'interpPhysique', label: 'Ressenti physique / voix', hint: 'Le corps et la voix : « tension dans la mâchoire sur les cris », « bonne projection aujourd’hui ».' },
  { k: 'interpPartenaires', label: 'Relation aux partenaires', hint: 'L’écoute : « bien écouté X, la réplique est venue naturellement ».' },
];
const REGIE_FIELDS: { k: FieldKey; label: string; hint: string }[] = [
  { k: 'regieAccessoires', label: 'Accessoires (props)', hint: '« La lettre doit être pliée en 4 », « le verre est en plastique : ne pas le jouer lourd ».' },
  { k: 'regieCostumes', label: 'Costumes', hint: '« La veste gêne le mouvement de bras à ce moment. »' },
  { k: 'regieLumSon', label: 'Lumière / son', hint: '« Mon top lumière est un peu tardif », « le bruit de fond couvre ma première réplique ».' },
];
const RECUL_FIELDS: { k: FieldKey; label: string; hint: string }[] = [
  { k: 'reculRetourMES', label: 'Le retour du metteur en scène', hint: 'Ses retours précis, positifs comme négatifs, pour ne pas refaire les mêmes erreurs à la séance suivante.' },
  { k: 'reculRessenti', label: 'Le ressenti personnel', hint: 'Vos frustrations, vos moments de fluidité (le fameux « état de grâce ») et ce qui a bloqué.' },
  { k: 'reculDevoirs', label: 'Les devoirs pour la prochaine fois', hint: 'Répliques à revoir, un point d’Histoire à creuser, un accessoire à trouver pour fluidifier le jeu…' },
];
const ALL_TEXT = [...MES_FIELDS, ...INTERP_FIELDS, ...REGIE_FIELDS, ...RECUL_FIELDS];

const gold = 'var(--gold)';
const overline: React.CSSProperties = { fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: gold };
const field: React.CSSProperties = {
  width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10,
  padding: '9px 11px', color: 'var(--text)', fontSize: 14.5, fontFamily: 'var(--font-body)', outline: 'none',
};

function Fieldset({ tag, titre, sub, children }: { tag: string; titre: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div style={overline}>{tag}</div>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 700, marginTop: 1 }}>{titre}</div>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 }}>{sub}</div>}
      </div>
      {children}
    </section>
  );
}

function TA({ label, hint, value, onChange }: { label: string; hint: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2b)' }}>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
        style={{ ...field, resize: 'vertical', lineHeight: 1.45 }} />
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>{hint}</span>
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`chip${active ? ' active' : ''}`} style={{ cursor: 'pointer' }}>{children}</button>
  );
}

// Documentation dépliable en tête d'écran.
function Doc() {
  const [open, setOpen] = useState(false);
  return (
    <section className="card card-16" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: open ? 10 : 0 }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold-chip-text)', fontSize: 14.5, fontFamily: 'var(--font-body)', textAlign: 'left', padding: 0 }}>
        <span>📖 Comment remplir votre journal de répétition</span>
        <span style={{ flex: 'none' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-2b)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>Après chaque séance, prenez cinq minutes. Le but n’est pas de tout remplir, mais de garder une <strong>trace utile</strong> pour la fois suivante. Deux repères d’abord :</div>
          <div>▸ <strong>La scène travaillée</strong> (acte / scène) situe la note <em>dans la pièce</em> — indispensable pour retrouver « ce qu’on a dit sur la scène 3 ».</div>
          <div>▸ <strong>L’énergie du jour</strong> et <strong>les présences</strong> situent la note <em>dans le temps</em> : plus tard vous pourrez relire vos notes « quand vous étiez en forme » ou « quand le metteur en scène était là ».</div>
          <div>Ensuite, séparez bien :</div>
          <div>▸ <strong>Mise en scène (objectif)</strong> = les directives <em>reçues</em>, factuelles et actionnables.</div>
          <div>▸ <strong>Interprétation (subjectif)</strong> = votre réflexion sur <em>votre</em> jeu.</div>
          <div>▸ <strong>Régie</strong> = la logistique (accessoires, costumes, lumière, son).</div>
          <div>▸ <strong>Le recul</strong> = le bilan à froid et vos devoirs pour la prochaine fois.</div>
          <div>Enfin, la <strong>note vocale</strong> capture à chaud une émotion ou une idée que l’écrit laisserait échapper.</div>
        </div>
      )}
    </section>
  );
}

export default function RepJournal() {
  const { id = '' } = useParams();
  const piece = PIECES.find((p) => p.id === id);
  // On sélectionne le tableau d'entrées de façon réactive (le re-render suit les
  // ajouts) puis on filtre par pièce — pas via une méthode du store, dont la
  // référence stable ne déclencherait pas de recalcul.
  const allEntries = useRepJournalStore((s) => s.entries);
  const load = useRepJournalStore((s) => s.load);
  const save = useRepJournalStore((s) => s.save);
  const remove = useRepJournalStore((s) => s.remove);
  const [acts, setActs] = useState<ActeScenes[]>([]);
  const [draft, setDraft] = useState<RepJournalEntry | null>(null);
  const [filter, setFilter] = useState<'all' | 'forme' | 'fatigue'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const memo = useVoiceMemo();

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    let alive = true;
    if (hasTexte(id)) void loadTexte(id).then((t) => { if (alive && t) setActs(actsScenes(t.blocs)); });
    return () => { alive = false; };
  }, [id]);

  const titre = piece?.titre ?? 'Cette pièce';
  const entries = useMemo(() =>
    allEntries
      .filter((e) => e.pieceId === id)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.createdAt - a.createdAt)),
    [allEntries, id]);
  const shown = useMemo(() => entries.filter((e) =>
    filter === 'all' ? true : filter === 'forme' ? e.energie >= 4 : e.energie > 0 && e.energie <= 2,
  ), [entries, filter]);

  if (!piece) {
    return (
      <div style={{ padding: 18 }}>
        <BackHeader to="/pieces" title="Journal de répétition" />
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Pièce introuvable.</p>
      </div>
    );
  }

  const set = (patch: Partial<RepJournalEntry>) => setDraft((d) => (d ? { ...d, ...patch } : d));
  const startNew = () => setDraft(emptyEntry(id, titre, todayISO()));
  const edit = (e: RepJournalEntry) => setDraft({ ...e });
  const cancel = () => setDraft(null);
  const submit = () => {
    if (!draft) return;
    if (isEmptyEntry(draft)) { setDraft(null); return; } // rien à sauvegarder
    save(draft);
    setDraft(null);
  };

  const actScenes = acts.find((a) => a.acte === draft?.acte)?.scenes ?? [];
  const toggleScene = (s: string) => set({ scenes: draft?.scenes.includes(s) ? draft.scenes.filter((x) => x !== s) : [...(draft?.scenes ?? []), s] });

  const recStop = async () => {
    const r = await memo.stop();
    if (r) set({ audio: r.dataUrl, audioMs: r.ms });
  };

  // ─────────────────────────────── Formulaire ───────────────────────────────
  if (draft) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 32px' }} data-screen-label="Journal — saisie">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={cancel} aria-label="Retour"
            style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: 20, lineHeight: 1, background: 'none', border: 'none', padding: 0 }}>←</button>
          <div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700 }}>{draft.id ? 'Modifier l’entrée' : 'Nouvelle séance'}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{titre}</div>
          </div>
        </div>

        <Fieldset tag="Quand" titre="Date de la séance">
          <input type="date" value={draft.date} onChange={(e) => set({ date: e.target.value })} style={field} />
        </Fieldset>

        <Fieldset tag="Où dans la pièce" titre="Scène travaillée" sub="Pour situer la note dans la pièce et la retrouver plus tard.">
          {acts.length > 0 ? (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {acts.map((a) => (
                  <Chip key={a.acte} active={draft.acte === a.acte} onClick={() => set({ acte: draft.acte === a.acte ? '' : a.acte, scenes: [] })}>{a.acte}</Chip>
                ))}
              </div>
              {draft.acte && actScenes.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {actScenes.map((s) => (
                    <Chip key={s} active={draft.scenes.includes(s)} onClick={() => toggleScene(s)}>{s}</Chip>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Pas de découpage acte/scène pour cette pièce — décrivez le moment travaillé ci-dessous.
            </div>
          )}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13.5, color: 'var(--text-2b)' }}>Moment travaillé (texte libre)</span>
            <input value={draft.sceneLibre} onChange={(e) => set({ sceneLibre: e.target.value })} placeholder="ex. la dispute Alceste / Célimène, fin d’acte" style={field} />
          </label>
        </Fieldset>

        <Fieldset tag="État du jour" titre="Niveau d’énergie / météo intérieure" sub="Pour filtrer plus tard : vos notes « en forme » vs « fatigué ».">
          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
            {ENERGIE.map((e) => (
              <button key={e.v} onClick={() => set({ energie: draft.energie === e.v ? 0 : e.v })}
                title={e.label}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 2px', borderRadius: 10, cursor: 'pointer',
                  border: `1px solid ${draft.energie === e.v ? gold : 'var(--b-input)'}`,
                  background: draft.energie === e.v ? 'rgba(212,169,78,.14)' : 'var(--bg-field)' }}>
                <span style={{ fontSize: 22, filter: draft.energie === e.v ? 'none' : 'grayscale(.4) opacity(.85)' }}>{e.emoji}</span>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{e.label}</span>
              </button>
            ))}
          </div>
        </Fieldset>

        <Fieldset tag="Qui était là" titre="Présences" sub="La présence du metteur en scène ou l’absence d’un partenaire change la dynamique.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {([['presMES', 'Metteur en scène'], ['presRegie', 'Régisseur']] as const).map(([k, lbl]) => (
              <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: 'var(--text-2b)', cursor: 'pointer' }}>
                <input type="checkbox" checked={draft[k]} onChange={(e) => set({ [k]: e.target.checked })} style={{ width: 18, height: 18 }} />
                {lbl}
              </label>
            ))}
          </div>
          <TA label="Autres (partenaires présents / absents)" hint="ex. « Sans Philinte aujourd’hui — répétition à trois »." value={draft.presAutres} onChange={(v) => set({ presAutres: v })} />
        </Fieldset>

        <Fieldset tag="Objectif" titre="Notes de mise en scène" sub="Les directives factuelles du metteur en scène — claires et actionnables.">
          {MES_FIELDS.map((f) => <TA key={f.k} label={f.label} hint={f.hint} value={String(draft[f.k] ?? '')} onChange={(v) => set({ [f.k]: v })} />)}
        </Fieldset>

        <Fieldset tag="Subjectif & personnel" titre="Travail d’interprétation" sub="Votre espace de réflexion sur votre propre jeu.">
          {INTERP_FIELDS.map((f) => <TA key={f.k} label={f.label} hint={f.hint} value={String(draft[f.k] ?? '')} onChange={(v) => set({ [f.k]: v })} />)}
        </Fieldset>

        <Fieldset tag="Logistique scénique" titre="Régie" sub="Ce qui touche aux accessoires, costumes, lumière et son.">
          {REGIE_FIELDS.map((f) => <TA key={f.k} label={f.label} hint={f.hint} value={String(draft[f.k] ?? '')} onChange={(v) => set({ [f.k]: v })} />)}
        </Fieldset>

        <Fieldset tag="Bilan & après-répétition" titre="Le recul" sub="À froid : ce qu’on retient et ce qu’on prépare pour la prochaine fois.">
          {RECUL_FIELDS.map((f) => <TA key={f.k} label={f.label} hint={f.hint} value={String(draft[f.k] ?? '')} onChange={(v) => set({ [f.k]: v })} />)}
        </Fieldset>

        <Fieldset tag="À chaud" titre="Note vocale rapide" sub="≈ 30 s de dictée juste après la répétition, pour capturer l’émotion à chaud.">
          {!memo.supported ? (
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>Micro non disponible sur cet appareil.</div>
          ) : draft.audio ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <audio controls src={draft.audio} style={{ width: '100%' }} />
              <button onClick={() => set({ audio: undefined, audioMs: undefined })}
                style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--red-chip-text)', fontSize: 13, cursor: 'pointer' }}>Supprimer la note vocale</button>
            </div>
          ) : memo.recording ? (
            <button onClick={recStop}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 10, cursor: 'pointer', border: '1px solid var(--red-chip-border, rgba(200,80,80,.5))', background: 'rgba(200,80,80,.12)', color: 'var(--text)', fontSize: 15 }}>
              ⏹ Arrêter ({memo.seconds}s)
            </button>
          ) : (
            <button onClick={memo.start}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 10, cursor: 'pointer', border: `1px solid ${gold}`, background: 'var(--bg-field)', color: 'var(--gold-chip-text)', fontSize: 15 }}>
              🎙️ Enregistrer une note vocale
            </button>
          )}
          {memo.error === 'denied' && <div style={{ fontSize: 12, color: 'var(--red-chip-text)' }}>Accès au micro refusé.</div>}
        </Fieldset>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="gold-btn" style={{ flex: 1, padding: '13px 16px', fontSize: 16 }} onClick={submit}>Enregistrer</button>
          <button onClick={cancel} style={{ padding: '13px 18px', fontSize: 15, borderRadius: 10, cursor: 'pointer', background: 'none', border: '1px solid var(--b-input)', color: 'var(--text-muted)' }}>Annuler</button>
        </div>
        {draft.id && (
          <button onClick={() => { remove(draft.id); setDraft(null); }}
            style={{ alignSelf: 'center', background: 'none', border: 'none', color: 'var(--red-chip-text)', fontSize: 13.5, cursor: 'pointer' }}>Supprimer cette entrée</button>
        )}
      </div>
    );
  }

  // ───────────────────────────────── Liste ─────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 32px' }} data-screen-label="Journal de répétition">
      <BackHeader to={`/pieces/${id}`} title="Journal de répétition" sub={titre} />

      <Doc />

      <button className="gold-btn" style={{ padding: '13px 16px', fontSize: 16 }} onClick={startNew}>+ Nouvelle séance</button>

      {entries.length > 0 && (
        <div style={{ display: 'flex', gap: 7 }}>
          {([['all', 'Toutes'], ['forme', '🙂 En forme'], ['fatigue', '😕 Fatigué']] as const).map(([k, lbl]) => (
            <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>{lbl}</Chip>
          ))}
        </div>
      )}

      {entries.length === 0 ? (
        <div style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center', padding: '10px 0' }}>
          Aucune séance notée pour « {titre} ».<br />Après votre prochaine répétition, tapez « + Nouvelle séance ».
        </div>
      ) : shown.length === 0 ? (
        <div style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>Aucune séance pour ce filtre.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {shown.map((e) => {
            const en = energieOf(e.energie);
            const isOpen = expanded === e.id;
            const filled = ALL_TEXT.filter((f) => String(e[f.k] ?? '').trim());
            return (
              <div key={e.id} className="card card-16" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: isOpen ? 10 : 6 }}>
                <button onClick={() => setExpanded(isOpen ? null : e.id)}
                  style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, color: 'var(--text)' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-title)', fontSize: 15.5, fontWeight: 600 }}>
                      {en && <span style={{ marginRight: 6 }}>{en.emoji}</span>}{dateLongue(e.date)}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>
                      {[e.acte, e.scenes.join(', '), e.sceneLibre].filter(Boolean).join(' · ') || 'Séance'}
                    </div>
                  </div>
                  <span style={{ flex: 'none', color: gold }}>{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-2b)' }}>
                    {(e.presMES || e.presRegie || e.presAutres) && (
                      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                        Présents : {[e.presMES && 'metteur en scène', e.presRegie && 'régisseur', e.presAutres].filter(Boolean).join(', ')}
                      </div>
                    )}
                    {filled.map((f) => (
                      <div key={f.k}>
                        <span style={{ fontWeight: 600, color: 'var(--gold-chip-text)' }}>{f.label} : </span>
                        <span style={{ whiteSpace: 'pre-wrap' }}>{String(e[f.k])}</span>
                      </div>
                    ))}
                    {e.audio && <audio controls src={e.audio} style={{ width: '100%' }} />}
                    <button onClick={() => edit(e)} style={{ alignSelf: 'flex-start', marginTop: 2, background: 'none', border: `1px solid ${gold}`, borderRadius: 999, padding: '5px 14px', color: 'var(--gold-chip-text)', fontSize: 13, cursor: 'pointer' }}>Modifier</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
