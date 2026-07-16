import { useState } from 'react';
import { CONTACT_ROLES, type Contact, type ContactRole } from '../store';

export interface ContactDraft {
  nom: string;
  role: ContactRole;
  organisation: string;
  email: string;
  tel: string;
  url: string;
  anniversaire: string;
  notes: string;
}

export function draftFrom(c?: Contact): ContactDraft {
  return {
    nom: c?.nom ?? '',
    role: c?.role ?? 'Metteur en scène',
    organisation: c?.organisation ?? '',
    email: c?.email ?? '',
    tel: c?.tel ?? '',
    url: c?.url ?? '',
    anniversaire: c?.anniversaire ?? '',
    notes: c?.notes ?? '',
  };
}

/** Nettoie un brouillon en champs de Contact (chaînes vides → undefined). */
export function cleanDraft(d: ContactDraft): Omit<Contact, 'id' | 'createdAt'> {
  const t = (s: string) => (s.trim() ? s.trim() : undefined);
  return {
    nom: d.nom.trim() || 'Sans nom',
    role: d.role,
    organisation: t(d.organisation),
    email: t(d.email),
    tel: t(d.tel),
    url: t(d.url),
    anniversaire: d.anniversaire || undefined,
    notes: t(d.notes),
  };
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  );
}

export default function ContactFormModal({
  initial,
  edit = false,
  onSave,
  onClose,
  onDelete,
}: {
  initial: ContactDraft;
  edit?: boolean;
  onSave: (d: ContactDraft) => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const [d, setD] = useState<ContactDraft>(initial);
  const set = (patch: Partial<ContactDraft>) => setD({ ...d, ...patch });

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, margin: '0 auto', background: 'var(--bg-drawer)', borderTop: '1px solid var(--b-chip)', borderRadius: '18px 18px 0 0', padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '92%', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 20, fontWeight: 700 }}>{edit ? 'Modifier le contact' : 'Nouveau contact'}</div>
          <button onClick={onClose} aria-label="Fermer" style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        <Field label="Nom">
          <input style={inputStyle} placeholder="Ex. Camille Dupont" value={d.nom} onChange={(e) => set({ nom: e.target.value })} />
        </Field>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Field label="Rôle">
              <select style={inputStyle} value={d.role} onChange={(e) => set({ role: e.target.value as ContactRole })}>
                {CONTACT_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="Anniversaire">
              <input style={inputStyle} type="date" value={d.anniversaire} onChange={(e) => set({ anniversaire: e.target.value })} />
            </Field>
          </div>
        </div>

        <Field label="Structure / théâtre / compagnie">
          <input style={inputStyle} placeholder="Ex. Théâtre des Amandiers" value={d.organisation} onChange={(e) => set({ organisation: e.target.value })} />
        </Field>

        <Field label="Site / profil professionnel (URL)">
          <input style={inputStyle} inputMode="url" placeholder="https://…" value={d.url} onChange={(e) => set({ url: e.target.value })} />
        </Field>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Field label="Email">
              <input style={inputStyle} inputMode="email" placeholder="…@…" value={d.email} onChange={(e) => set({ email: e.target.value })} />
            </Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="Téléphone">
              <input style={inputStyle} inputMode="tel" placeholder="06…" value={d.tel} onChange={(e) => set({ tel: e.target.value })} />
            </Field>
          </div>
        </div>

        <Field label="Notes">
          <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} placeholder="Rencontré à…, à recontacter pour…" value={d.notes} onChange={(e) => set({ notes: e.target.value })} />
        </Field>

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          {onDelete && (
            <button onClick={onDelete} style={{ padding: '11px 18px', fontSize: 15, borderRadius: 999, border: '1px solid var(--red-chip-border)', background: 'none', color: 'var(--red-chip-text)', cursor: 'pointer' }}>Supprimer</button>
          )}
          <button className="gold-btn" style={{ flex: 1, padding: '11px 18px', fontSize: 15 }} onClick={() => onSave(d)}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
