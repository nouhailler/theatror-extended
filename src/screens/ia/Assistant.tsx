import { useRef, useState } from 'react';
import { useAI, humanError, type ChatMessage } from '../../lib/useAI';
import { assistantSystemPrompt } from '../../lib/aiContext';
import AiText from '../../components/AiText';
import { fieldStyle } from './parts';

const SUGGESTIONS = [
  'Trouve-moi une comédie à 5 personnages, courte.',
  'Compare Molière et Shakespeare.',
  'Explique Le Misanthrope en quelques lignes.',
  'Un monologue de femme pour une audition ?',
];

export default function Assistant() {
  const { run, busy, hasKey } = useAI();
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput('');
    const history = [...msgs, { role: 'user' as const, content: q }];
    setMsgs([...history, { role: 'assistant', content: '' }]);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    const messages: ChatMessage[] = [{ role: 'system', content: assistantSystemPrompt() }, ...history];
    try {
      await run(messages, (full) => {
        setMsgs((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: full };
          return next;
        });
      });
    } catch (e) {
      setMsgs((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'assistant', content: `⚠️ ${humanError(e)}` };
        return next;
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {msgs.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 14.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Posez une question sur le théâtre, ou demandez une recommandation :
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)} style={{ whiteSpace: 'normal', textAlign: 'left' }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {msgs.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
          <div style={{
            maxWidth: '88%',
            padding: '11px 14px',
            borderRadius: 14,
            background: m.role === 'user' ? 'var(--gold)' : 'var(--bg-card)',
            border: m.role === 'user' ? 'none' : '1px solid var(--b-rest2)',
            color: m.role === 'user' ? 'var(--on-gold)' : 'var(--text-2b)',
          }}>
            {m.role === 'user'
              ? <span style={{ fontSize: 15 }}>{m.content}</span>
              : (m.content ? <AiText text={m.content} /> : <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>…</span>)}
          </div>
        </div>
      ))}
      <div ref={endRef} />

      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          placeholder={hasKey ? 'Votre question…' : 'Ajoutez une clé dans Réglages…'}
          rows={2}
          style={{ ...fieldStyle, resize: 'none', flex: 1 }}
        />
        <button className="gold-btn" disabled={busy || !input.trim()} onClick={() => send(input)}
          style={{ padding: '11px 18px', fontSize: 15, opacity: busy || !input.trim() ? 0.5 : 1 }}>
          {busy ? '…' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
}
