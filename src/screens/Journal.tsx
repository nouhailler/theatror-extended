import { useMemo, useState } from 'react';
import { useStore, type JournalEntry, type JournalType } from '../store';
import { ScreenTitle } from '../components/ui';
import { dateLongue, todayISO } from '../lib/date';

const TYPES: JournalType[] = ['Répétition', 'Progrès', 'Idée', 'Note', 'Audition'];

interface DraftState {
  id?: string;
  titre: string;
  type: JournalType;
  date: string;
  minutes: string;
  txt: string;
}

const emptyDraft = (): DraftState => ({ titre: '', type: 'Répétition', date: todayISO(), minutes: '', txt: '' });

export default function Journal() {
  const journal = useStore((s) => s.journal);
  const favCountMono = useStore((s) => Object.keys(s.favs).filter((k) => k.startsWith('monologues::')).length);
  const addEntry = useStore((s) => s.addEntry);
  const updateEntry = useStore((s) => s.updateEntry);
  const deleteEntry = useStore((s) => s.deleteEntry);

  const [draft, setDraft] = useState<DraftState | null>(null);

  const stats = useMemo(() => {
    const now = new Date();
    const moisCourant = journal.filter((j) => {
      const d = new Date(j.date + 'T00:00:00');
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const minutes = journal.reduce((s, j) => s + (j.minutes ?? 0), 0);
    const heures = Math.round(minutes / 60);
    return { moisCourant, heures, monologues: favCountMono };
  }, [journal, favCountMono]);

  const save = () => {
    if (!draft) return;
    const titre = draft.titre.trim() || 'Sans titre';
    const payload = {
      titre,
      type: draft.type,
      date: draft.date || todayISO(),
      txt: draft.txt.trim(),
      minutes: draft.minutes ? Math.max(0, parseInt(draft.minutes, 10) || 0) : undefined,
    };
    if (draft.id) updateEntry(draft.id, payload);
    else addEntry(payload);
    setDraft(null);
  };

  const edit = (j: JournalEntry) =>
    setDraft({ id: j.id, titre: j.titre, type: j.type, date: j.date, minutes: j.minutes ? String(j.minutes) : '', txt: j.txt });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px', position: 'relative' }} data-screen-label="Journal">
      <ScreenTitle over="Carnet de bord">Journal du comédien</ScreenTitle>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <Stat n={stats.moisCourant} label={<>entrées<br />ce mois</>} />
        <Stat n={`${stats.heures} h`} label={<>de travail<br />en scène</>} />
        <Stat n={stats.monologues} label={<>monologues<br />en favori</>} />
      </div>

      {journal.length === 0 && (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>
          Votre carnet est vide.<br />Touchez « + Nouvelle entrée » pour commencer.
        </div>
      )}

      {journal.map((j) => (
        <div key={j.id} onClick={() => edit(j)} className="card card-tap" style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{j.titre}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', whiteSpace: 'nowrap' }}>{dateLongue(j.date)}</div>
          </div>
          <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginTop: 2 }}>{j.type}{j.minutes ? ` · ${j.minutes} min` : ''}</div>
          {j.txt && <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 6 }}>{j.txt}</div>}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <button className="gold-btn" style={{ padding: '11px 26px', fontSize: 15 }} onClick={() => setDraft(emptyDraft())}>+ Nouvelle entrée</button>
      </div>

      {draft && (
        <Modal
          draft={draft}
          setDraft={setDraft}
          onSave={save}
          onClose={() => setDraft(null)}
          onDelete={draft.id ? () => { deleteEntry(draft.id!); setDraft(null); } : undefined}
        />
      )}
    </div>
  );
}

function Stat({ n, label }: { n: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="card card-16" style={{ padding: 12, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-field)',
  border: '1px solid var(--b-input)',
  borderRadius: 10,
  padding: '10px 12px',
  color: 'var(--text)',
  fontSize: 15,
  fontFamily: 'var(--font-body)',
  outline: 'none',
};

function Modal({ draft, setDraft, onSave, onClose, onDelete }: {
  draft: DraftState;
  setDraft: (d: DraftState) => void;
  onSave: () => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: 'var(--bg-drawer)', borderTop: '1px solid var(--b-chip)', borderRadius: '18px 18px 0 0', padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '90%', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 20, fontWeight: 700 }}>{draft.id ? 'Modifier' : 'Nouvelle entrée'}</div>
          <button onClick={onClose} aria-label="Fermer" style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        <input style={inputStyle} placeholder="Titre" value={draft.titre} onChange={(e) => setDraft({ ...draft, titre: e.target.value })} />

        <div style={{ display: 'flex', gap: 10 }}>
          <select style={{ ...inputStyle, flex: 1 }} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as JournalType })}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input style={{ ...inputStyle, flex: 1 }} type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        </div>

        <input style={inputStyle} type="number" min={0} placeholder="Minutes de travail (optionnel)" value={draft.minutes} onChange={(e) => setDraft({ ...draft, minutes: e.target.value })} />

        <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} placeholder="Notes…" value={draft.txt} onChange={(e) => setDraft({ ...draft, txt: e.target.value })} />

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          {onDelete && (
            <button onClick={onDelete} style={{ padding: '11px 18px', fontSize: 15, borderRadius: 999, border: '1px solid var(--red-chip-border)', background: 'none', color: 'var(--red-chip-text)', cursor: 'pointer' }}>Supprimer</button>
          )}
          <button className="gold-btn" style={{ flex: 1, padding: '11px 18px', fontSize: 15 }} onClick={onSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
