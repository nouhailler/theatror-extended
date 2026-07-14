// Helpers Web Speech — purs et indépendants de React.
// La synthèse elle-même (avec jeton de génération) est pilotée par le moteur.

export const speechSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Récupère les voix, en attendant l'événement voiceschanged si besoin. */
export function loadVoices(timeoutMs = 2000): Promise<SpeechSynthesisVoice[]> {
  if (!speechSupported) return Promise.resolve([]);
  const synth = window.speechSynthesis;
  const now = synth.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      synth.removeEventListener?.('voiceschanged', finish);
      resolve(synth.getVoices());
    };
    synth.addEventListener?.('voiceschanged', finish);
    setTimeout(finish, timeoutMs); // repli si l'événement ne se déclenche jamais
  });
}

/** Voix françaises disponibles. */
export function frenchVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices.filter((v) => v.lang?.toLowerCase().startsWith('fr'));
}

/** Voix par défaut : la voix demandée, sinon une voix FR, sinon indéfini. */
export function pickVoice(
  voices: SpeechSynthesisVoice[],
  voiceURI?: string,
): SpeechSynthesisVoice | undefined {
  if (voiceURI) {
    const found = voices.find((v) => v.voiceURI === voiceURI);
    if (found) return found;
  }
  return frenchVoices(voices)[0];
}

// Découpe un texte en phrases pour éviter les coupures des utterances longues
// (Chrome Android). Garde la ponctuation.
export function splitSentences(text: string): string[] {
  const parts = text
    .replace(/\s+/g, ' ')
    .trim()
    .match(/[^.!?…]+[.!?…]*(?:\s|$)/g);
  const out = (parts ?? [text]).map((s) => s.trim()).filter(Boolean);
  // Fusionne les fragments trop courts avec le suivant, et re-découpe > 200 car.
  const merged: string[] = [];
  for (const s of out) {
    if (merged.length && (merged[merged.length - 1].length < 12)) {
      merged[merged.length - 1] += ' ' + s;
    } else {
      merged.push(s);
    }
  }
  const final: string[] = [];
  for (const s of merged) {
    if (s.length <= 200) { final.push(s); continue; }
    // Coupe sur les virgules si trop long.
    let buf = '';
    for (const chunk of s.split(/,\s*/)) {
      if ((buf + ', ' + chunk).length > 200 && buf) { final.push(buf); buf = chunk; }
      else buf = buf ? `${buf}, ${chunk}` : chunk;
    }
    if (buf) final.push(buf);
  }
  return final.length ? final : [text.trim()];
}
