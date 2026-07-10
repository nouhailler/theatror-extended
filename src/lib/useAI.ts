import { useRef, useState, useCallback } from 'react';
import { useStore } from '../store';
import { streamChat, OpenRouterError, type ChatMessage } from './openrouter';

export function humanError(e: unknown): string {
  if (e instanceof OpenRouterError) {
    if (e.code === 'no-key') return 'Ajoutez votre clé OpenRouter dans Réglages pour activer le Mode IA.';
    if (e.code === 'network') return 'Connexion impossible. Vérifiez votre réseau.';
    return e.message;
  }
  return 'Une erreur est survenue.';
}

/** Hook central : lance un flux OpenRouter avec la clé/modèle des Réglages. */
export function useAI() {
  const settings = useStore((s) => s.settings);
  const [busy, setBusy] = useState(false);
  const acRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    acRef.current?.abort();
    setBusy(false);
  }, []);

  const run = useCallback(
    async (
      messages: ChatMessage[],
      onToken?: (full: string, delta: string) => void,
      temperature?: number,
    ): Promise<string> => {
      acRef.current?.abort();
      const ac = new AbortController();
      acRef.current = ac;
      setBusy(true);
      let full = '';
      try {
        for await (const tok of streamChat({
          apiKey: settings.openRouterKey,
          model: settings.openRouterModel,
          messages,
          signal: ac.signal,
          temperature,
        })) {
          full += tok;
          onToken?.(full, tok);
        }
        return full;
      } finally {
        if (acRef.current === ac) {
          setBusy(false);
          acRef.current = null;
        }
      }
    },
    [settings.openRouterKey, settings.openRouterModel],
  );

  return { run, stop, busy, hasKey: !!settings.openRouterKey, model: settings.openRouterModel };
}

export type { ChatMessage };
