import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, type ContactRole } from '../store';
import { ScreenTitle } from '../components/ui';
import ContactFormModal, { cleanDraft, draftFrom, type ContactDraft } from '../components/ContactFormModal';
import { countEnRetard } from '../lib/reminders';
import RappelsBanner from '../components/RappelsBanner';

const chip = (active: boolean): React.CSSProperties => ({
  fontSize: 13,
  padding: '5px 13px',
  borderRadius: 999,
  border: '1px solid var(--b-chip)',
  background: active ? 'var(--gold)' : 'transparent',
  color: active ? 'var(--on-gold)' : 'var(--gold-chip-text)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontWeight: active ? 600 : 400,
});

export default function Carnet() {
  const contacts = useStore((s) => s.contacts);
  const reminders = useStore((s) => s.reminders);
  const addContact = useStore((s) => s.addContact);
  const nav = useNavigate();

  const [filtre, setFiltre] = useState<ContactRole | 'Tous'>('Tous');
  const [creer, setCreer] = useState(false);

  // Rôles réellement présents (pour ne pas afficher de filtres vides).
  const roles = useMemo(() => {
    const set = new Set<ContactRole>();
    contacts.forEach((c) => set.add(c.role));
    return Array.from(set);
  }, [contacts]);

  const liste = useMemo(() => {
    const l = filtre === 'Tous' ? contacts : contacts.filter((c) => c.role === filtre);
    return [...l].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  }, [contacts, filtre]);

  const enRetardParContact = useMemo(() => {
    const m = new Map<string, number>();
    const today = new Date().toISOString().slice(0, 10);
    reminders.forEach((r) => {
      if (!r.done && r.due <= today) m.set(r.contactId, (m.get(r.contactId) ?? 0) + 1);
    });
    return m;
  }, [reminders]);

  const save = (d: ContactDraft) => {
    const id = addContact(cleanDraft(d));
    setCreer(false);
    nav(`/carnet/${id}`);
  };

  const totalRetard = countEnRetard(contacts, reminders);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Carnet">
      <ScreenTitle over="Professionnels du spectacle">Carnet & contacts</ScreenTitle>

      <RappelsBanner />

      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '26px 18px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5, lineHeight: 1.5 }}>
          Votre carnet est vide.<br />
          Ajoutez metteurs en scène, directeurs de casting, régisseurs, compagnies…<br />
          Collez l'URL d'un site ou d'un profil : l'IA en prépare une fiche pour votre candidature.
        </div>
      ) : (
        <>
          {/* Filtres par rôle */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            <span style={chip(filtre === 'Tous')} onClick={() => setFiltre('Tous')}>Tous · {contacts.length}</span>
            {roles.map((r) => (
              <span key={r} style={chip(filtre === r)} onClick={() => setFiltre(r)}>
                {r} · {contacts.filter((c) => c.role === r).length}
              </span>
            ))}
          </div>

          {liste.map((c) => {
            const retard = enRetardParContact.get(c.id) ?? 0;
            return (
              <div key={c.id} onClick={() => nav(`/carnet/${c.id}`)} className="card card-tap" style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600 }}>{c.nom}</div>
                  {retard > 0 && (
                    <span style={{ fontSize: 11.5, padding: '2px 8px', borderRadius: 999, background: 'var(--red-chip-bg, rgba(158,43,58,.25))', border: '1px solid var(--red-chip-border)', color: 'var(--red-chip-text)', whiteSpace: 'nowrap' }}>
                      {retard} à relancer
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginTop: 2 }}>{c.role}</div>
                {c.organisation && <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>{c.organisation}</div>}
                {c.fiche && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 4 }}>✦ fiche de préparation générée</div>}
              </div>
            );
          })}
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <button className="gold-btn" style={{ padding: '11px 26px', fontSize: 15 }} onClick={() => setCreer(true)}>+ Nouveau contact</button>
      </div>

      {totalRetard > 0 && (
        <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-muted)' }}>
          {totalRetard} rappel{totalRetard > 1 ? 's' : ''} en attente
        </div>
      )}

      {creer && (
        <ContactFormModal
          initial={draftFrom()}
          onSave={save}
          onClose={() => setCreer(false)}
        />
      )}
    </div>
  );
}
