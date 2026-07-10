import { creditFor } from '../lib/wikimedia';

/** Pied de fiche : crédit + licence de l'image Wikimedia. */
export default function Credit({ file }: { file?: string }) {
  const c = creditFor(file);
  if (!c) return null;
  return (
    <div
      style={{
        fontSize: 12,
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        lineHeight: 1.5,
        borderTop: '1px solid var(--b-rest)',
        paddingTop: 10,
      }}
    >
      Image : {c.auteur} — {c.licence}, via Wikimedia Commons.
    </div>
  );
}
