import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { dueItems } from '../lib/reminders';
import { delaiRelatif } from '../lib/date';

const KIND_ICON: Record<string, string> = {
  relance: '↻',
  anniversaire: '🎂',
  felicitation: '✦',
  autre: '⏰',
};

/**
 * Encart « À relancer » : échéances de contacts (relances, anniversaires…).
 * `compact` (accueil) limite à 3 lignes et masque tout s'il n'y a rien.
 */
export default function RappelsBanner({ compact = false }: { compact?: boolean }) {
  const contacts = useStore((s) => s.contacts);
  const reminders = useStore((s) => s.reminders);
  const toggleReminder = useStore((s) => s.toggleReminder);
  const nav = useNavigate();

  const items = useMemo(() => dueItems(contacts, reminders), [contacts, reminders]);
  if (items.length === 0) return null;

  const shown = compact ? items.slice(0, 3) : items;
  const reste = items.length - shown.length;

  return (
    <div style={{ background: 'linear-gradient(120deg,#3a1520,#241019)', border: '1px solid rgba(158,43,58,.4)', borderRadius: 12, padding: '13px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>
          ⏰ À relancer
        </div>
        <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{items.length}</span>
      </div>

      {shown.map((it) => (
        <div key={it.id} className="card-tap"
          onClick={() => nav(`/carnet/${it.contactId}`)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <span style={{ fontSize: 15, flex: 'none', width: 20, textAlign: 'center' }}>{KIND_ICON[it.kind] ?? '⏰'}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {it.label}
            </div>
            <div style={{ fontSize: 12.5, fontStyle: 'italic', color: it.enRetard ? 'var(--red-chip-text)' : 'var(--text-muted)' }}>
              {it.contactNom} · {it.enRetard ? `en retard (${delaiRelatif(it.due)})` : delaiRelatif(it.due)}
            </div>
          </div>
          {it.reminderId && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleReminder(it.reminderId!); }}
              aria-label="Marquer comme fait"
              style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, border: '1px solid rgba(212,169,78,.4)', background: 'none', color: 'var(--gold)', fontSize: 15, cursor: 'pointer', lineHeight: 1 }}>
              ✓
            </button>
          )}
        </div>
      ))}

      {reste > 0 && (
        <div onClick={() => nav('/carnet')} style={{ fontSize: 13, color: 'var(--gold-chip-text)', cursor: 'pointer', paddingTop: 2 }}>
          + {reste} autre{reste > 1 ? 's' : ''} dans le Carnet →
        </div>
      )}
    </div>
  );
}
