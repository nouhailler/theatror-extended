// Client OpenRouter (appels côté navigateur avec la clé de l'utilisateur).
// La clé n'est jamais codée en dur : elle vient des Réglages (store.settings).

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenRouterError extends Error {
  code: 'no-key' | 'http' | 'network';
  constructor(message: string, code: OpenRouterError['code']) {
    super(message);
    this.code = code;
    this.name = 'OpenRouterError';
  }
}

interface RunOpts {
  apiKey: string;
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  signal?: AbortSignal;
}

/** Flux de jetons (streaming SSE). Lève OpenRouterError('no-key') si la clé manque. */
export async function* streamChat(opts: RunOpts): AsyncGenerator<string> {
  if (!opts.apiKey) throw new OpenRouterError('Clé API manquante', 'no-key');

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${opts.apiKey}`,
        'HTTP-Referer': typeof location !== 'undefined' ? location.origin : 'https://theathror.app',
        'X-Title': 'Theathror',
      },
      body: JSON.stringify({
        model: opts.model,
        messages: opts.messages,
        stream: true,
        temperature: opts.temperature ?? 0.7,
      }),
      signal: opts.signal,
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') return;
    throw new OpenRouterError('Réseau indisponible', 'network');
  }

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '');
    throw new OpenRouterError(`Erreur ${res.status} — ${detail.slice(0, 240)}`, 'http');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    let chunk;
    try {
      chunk = await reader.read();
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      throw new OpenRouterError('Flux interrompu', 'network');
    }
    if (chunk.done) break;
    buffer += decoder.decode(chunk.value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const raw of lines) {
      const line = raw.trim();
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') return;
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) yield delta as string;
      } catch {
        /* ligne partielle — ignorée */
      }
    }
  }
}

/** Réponse complète (accumule le flux). Pratique pour les sorties structurées. */
export async function completeChat(opts: RunOpts): Promise<string> {
  let out = '';
  for await (const token of streamChat(opts)) out += token;
  return out;
}

/** Extrait un bloc JSON d'une réponse (tolère le texte autour / les ```json). */
export function extractJson<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('[') >= 0 ? candidate.indexOf('[') : candidate.indexOf('{');
  const endArr = candidate.lastIndexOf(']');
  const endObj = candidate.lastIndexOf('}');
  const end = Math.max(endArr, endObj);
  if (start < 0 || end < 0) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}
