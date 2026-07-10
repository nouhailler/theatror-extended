import { Fragment } from 'react';

// Rendu léger : gras **…**, titres ###, listes « - » / « • », sauts de ligne.
function inline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`} style={{ color: 'var(--text)' }}>{p.slice(2, -2)}</strong>;
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{p}</Fragment>;
  });
}

export default function AiText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-2b)' }}>
      {lines.map((line, i) => {
        const t = line.trim();
        if (t === '') return <div key={i} style={{ height: 8 }} />;
        if (/^#{1,4}\s/.test(t)) {
          return <div key={i} style={{ fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 600, color: 'var(--text)', margin: '6px 0 2px' }}>{t.replace(/^#{1,4}\s/, '')}</div>;
        }
        if (/^[-•*]\s/.test(t)) {
          return (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline', margin: '2px 0' }}>
              <span style={{ color: 'var(--gold)', fontSize: 13 }}>▸</span>
              <span>{inline(t.replace(/^[-•*]\s/, ''), `l${i}`)}</span>
            </div>
          );
        }
        return <div key={i} style={{ margin: '2px 0' }}>{inline(line, `l${i}`)}</div>;
      })}
    </div>
  );
}
