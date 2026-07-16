import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore, type ReminderKind } from '../store';
import { BackHeader, useBack } from '../components/ui';
import AiText from '../components/AiText';
import ContactFormModal, { cleanDraft, draftFrom, type ContactDraft } from '../components/ContactFormModal';
import { NoKeyBanner } from './ia/parts';
import { useAI, humanError } from '../lib/useAI';
import { fetchPageText, messagesDepuisPage, messagesRepliModele } from '../lib/enrich';
import { kindLabel } from '../lib/reminders';
import { todayISO, dateLongue, delaiRelatif, ajouteMois, dansNJours, joursDepuisAujourdhui } from '../lib/date';

const btnSecond: React.CSSProperties = {
  background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10,
  padding: '8px 14px', fontSize: 13.5, color: 'var(--text)', cursor: 'pointer', fontFamily: 'var(--font-body)',
};

interface Modele { label: string; kind: ReminderKind; due: (anniv?: string) => string; }
const MODELES: Modele[] = [
  { label: 'Relancer après audition (+3 mois)', kind: 'relance', due: () => ajouteMois(todayISO(), 3) },
  { label: 'Relancer (+2 semaines)', kind: 'relance', due: () => dansNJours(14) },
  { label: 'Féliciter pour une création', kind: 'felicitation', due: () => dansNJours(2) },
  {
    label: "Souhaiter l'anniversaire", kind: 'anniversaire',
    due: (anniv) => {
      if (!anniv) return dansNJours(1);
      const d = new Date(anniv + 'T00:00:00');
      const now = new Date();
      let occ = new Date(now.getFullYear(), d.getMonth(), d.getDate());
      if (occ.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime())
        occ = new Date(now.getFullYear() + 1, d.getMonth(), d.getDate());
      return occ.toISOString().slice(0, 10);
    },
  },
];

export default function FicheContact() {
  const { id = '' } = useParams();
  const back = useBack('/carnet');
  const contact = useStore((s) => s.contacts.find((c) => c.id === id));
  const reminders = useStore((s) => s.reminders);
  const updateContact = useStore((s) => s.updateContact);
  const deleteContact = useStore((s) => s.deleteContact);
  const addReminder = useStore((s) => s.addReminder);
  const toggleReminder = useStore((s) => s.toggleReminder);
  const deleteReminder = useStore((s) => s.deleteReminder);

  const { run, busy, hasKey } = useAI();
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');
  const [editing, setEditing] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customDate, setCustomDate] = useState(dansNJours(7));
  const [customKind, setCustomKind] = useState<ReminderKind>('relance');

  const mesRappels = useMemo(
    () => reminders.filter((r) => r.contactId === id).sort((a, b) => (a.due < b.due ? -1 : 1)),
    [reminders, id],
  );

  if (!contact) {
    return (
      <div style={{ padding: 18 }} data-screen-label="Contact">
        <BackHeader to="/carnet" title="Contact introuvable" />
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>Ce contact a peut-être été supprimé.</p>
      </div>
    );
  }

  const fiche = out || contact.fiche || '';

  const analyser = async () => {
    if (!contact.url) return;
    setErr('');
    setOut('');
    let extrait: { texte: string; maigre: boolean };
    try {
      extrait = await fetchPageText(contact.url);
    } catch {
      extrait = { texte: '', maigre: true }; // réseau/HTTP KO → repli connaissance
    }
    const source: 'page' | 'modele' = extrait.maigre ? 'modele' : 'page';
    const messages = extrait.maigre ? messagesRepliModele(contact) : messagesDepuisPage(contact, extrait.texte);
    try {
      const full = await run(messages, (f) => setOut(f), 0.4);
      updateContact(contact.id, { fiche: full, ficheAt: todayISO(), ficheSource: source });
    } catch (e) {
      setErr(humanError(e));
    }
  };

  const saveEdit = (d: ContactDraft) => {
    updateContact(contact.id, cleanDraft(d));
    setEditing(false);
  };

  const ajouterModele = (m: Modele) => {
    addReminder({ contactId: contact.id, label: m.label, due: m.due(contact.anniversaire), kind: m.kind });
  };

  const ajouterCustom = () => {
    if (!customLabel.trim()) return;
    addReminder({ contactId: contact.id, label: customLabel.trim(), due: customDate || todayISO(), kind: customKind });
    setCustomLabel('');
    setCustomOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '18px 18px 28px' }} data-screen-label="Contact">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <button onClick={back} aria-label="Retour" style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: 20, background: 'none', border: 'none', padding: '4px 4px 0 0' }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>{contact.role}</div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 700 }}>{contact.nom}</div>
          {contact.organisation && <div style={{ fontSize: 15, color: 'var(--text-2)', fontStyle: 'italic', marginTop: 2 }}>{contact.organisation}</div>}
        </div>
        <button onClick={() => setEditing(true)} style={{ ...btnSecond, padding: '6px 12px' }}>Modifier</button>
      </div>

      {/* Coordonnées */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {contact.email && <Coord label="Email"><a href={`mailto:${contact.email}`} style={lien}>{contact.email}</a></Coord>}
        {contact.tel && <Coord label="Tél"><a href={`tel:${contact.tel}`} style={lien}>{contact.tel}</a></Coord>}
        {contact.url && <Coord label="Site"><a href={contact.url} target="_blank" rel="noopener noreferrer" style={lien}>{contact.url}</a></Coord>}
        {contact.anniversaire && <Coord label="Anniversaire">{dateLongue(contact.anniversaire).replace(/ \d{4}$/, '')}</Coord>}
        {contact.notes && <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 4 }}>{contact.notes}</div>}
      </div>

      {/* ── Fiche de préparation (analyse d'URL) ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Fiche de préparation</div>

        {!hasKey && <NoKeyBanner />}

        {!contact.url ? (
          <div style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
            Ajoutez l'URL d'un site de compagnie ou d'un profil professionnel (« Modifier »), puis lancez l'analyse :
            l'IA en résume les dernières mises en scène, l'esthétique et les contacts publics pour préparer votre candidature.
          </div>
        ) : (
          <>
            <button className="gold-btn" style={{ padding: '11px 18px', fontSize: 15, opacity: busy ? 0.6 : 1, alignSelf: 'flex-start' }} disabled={busy} onClick={analyser}>
              {busy ? 'Analyse en cours…' : contact.fiche ? '↻ Réanalyser le site' : '✦ Analyser le site / le profil'}
            </button>
            {err && <div style={{ fontSize: 14, color: 'var(--red-chip-text)' }}>⚠️ {err}</div>}

            {fiche && (
              <div className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {!busy && contact.ficheSource === 'modele' && (
                  <div style={{ fontSize: 12.5, color: 'var(--red-chip-text)', fontStyle: 'italic', lineHeight: 1.45 }}>
                    ⚠️ Page peu lisible : fiche fondée sur le nom et l'URL (connaissance générale du modèle), à vérifier.
                  </div>
                )}
                <AiText text={fiche} />
                {!busy && contact.ficheAt && (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--b-chip)', paddingTop: 10 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Générée le {dateLongue(contact.ficheAt)}</span>
                    <button onClick={() => navigator.clipboard?.writeText(fiche)} style={btnSecond}>Copier</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Suivi des interactions (rappels) ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Suivi & rappels</div>

        {mesRappels.length === 0 && !customOpen && (
          <div style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucun rappel. Ajoutez-en un ci-dessous.</div>
        )}

        {mesRappels.map((r) => {
          const j = joursDepuisAujourdhui(r.due);
          const retard = !r.done && j < 0;
          return (
            <div key={r.id} className="card" style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, opacity: r.done ? 0.55 : 1 }}>
              <button onClick={() => toggleReminder(r.id)} aria-label={r.done ? 'Rouvrir' : 'Marquer fait'}
                style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, border: '1px solid var(--b-chip)', background: r.done ? 'var(--gold)' : 'none', color: r.done ? 'var(--on-gold)' : 'var(--gold)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>
                {r.done ? '✓' : ''}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, textDecoration: r.done ? 'line-through' : 'none' }}>{r.label}</div>
                <div style={{ fontSize: 12.5, fontStyle: 'italic', color: retard ? 'var(--red-chip-text)' : 'var(--text-muted)' }}>
                  {kindLabel(r.kind)} · {dateLongue(r.due)} · {r.done ? 'fait' : delaiRelatif(r.due)}
                </div>
              </div>
              <button onClick={() => deleteReminder(r.id)} aria-label="Supprimer le rappel" style={{ flex: 'none', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
          );
        })}

        {/* Modèles contextuels en un tap */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {MODELES.map((m) => (
            <button key={m.label} onClick={() => ajouterModele(m)} style={btnSecond}>+ {m.label}</button>
          ))}
          <button onClick={() => setCustomOpen((v) => !v)} style={{ ...btnSecond, color: 'var(--gold)' }}>+ Personnalisé…</button>
        </div>

        {customOpen && (
          <div className="card card-16" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input style={{ ...btnSecond, width: '100%', cursor: 'text', fontSize: 15 }} placeholder="Intitulé du rappel" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} />
            <div style={{ display: 'flex', gap: 10 }}>
              <input type="date" style={{ ...btnSecond, flex: 1, cursor: 'text', fontSize: 15 }} value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
              <select style={{ ...btnSecond, flex: 1, fontSize: 15 }} value={customKind} onChange={(e) => setCustomKind(e.target.value as ReminderKind)}>
                <option value="relance">Relance</option>
                <option value="felicitation">Félicitations</option>
                <option value="anniversaire">Anniversaire</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <button className="gold-btn" style={{ padding: '10px 18px', fontSize: 14.5 }} onClick={ajouterCustom}>Ajouter le rappel</button>
          </div>
        )}
      </section>

      <button onClick={() => { if (confirm('Supprimer ce contact et ses rappels ?')) { deleteContact(contact.id); back(); } }}
        style={{ alignSelf: 'flex-start', padding: '9px 16px', fontSize: 13.5, borderRadius: 999, border: '1px solid var(--red-chip-border)', background: 'none', color: 'var(--red-chip-text)', cursor: 'pointer' }}>
        Supprimer le contact
      </button>

      {editing && (
        <ContactFormModal
          initial={draftFrom(contact)}
          edit
          onSave={saveEdit}
          onClose={() => setEditing(false)}
          onDelete={() => { deleteContact(contact.id); setEditing(false); back(); }}
        />
      )}
    </div>
  );
}

const lien: React.CSSProperties = { color: 'var(--gold-chip-text)', textDecoration: 'none', wordBreak: 'break-all' };

function Coord({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 14.5 }}>
      <span style={{ flex: 'none', width: 92, color: 'var(--text-muted)', fontSize: 12.5, letterSpacing: 1, textTransform: 'uppercase', paddingTop: 1 }}>{label}</span>
      <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
    </div>
  );
}
