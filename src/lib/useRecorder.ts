// Enregistrement audio de sa propre voix (MediaRecorder) pour se réécouter.
// Le flux micro est ouvert à la demande et réutilisé ; repli silencieux si non
// supporté ou refusé.
import { useCallback, useEffect, useRef, useState } from 'react';

export const recorderSupported =
  typeof navigator !== 'undefined' &&
  !!navigator.mediaDevices?.getUserMedia &&
  typeof window !== 'undefined' &&
  'MediaRecorder' in window;

export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const ensureStream = useCallback(async () => {
    if (streamRef.current) return streamRef.current;
    const s = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = s;
    return s;
  }, []);

  const start = useCallback(async () => {
    setError(null);
    if (!recorderSupported) { setError('unsupported'); return; }
    try {
      const s = await ensureStream();
      chunksRef.current = [];
      const mr = new MediaRecorder(s);
      mr.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      recRef.current = mr;
      mr.start();
      setRecording(true);
    } catch {
      setError('denied'); // micro indisponible / refusé
    }
  }, [ensureStream]);

  // Arrête l'enregistrement et renvoie une URL objet (ou null).
  const stop = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      const mr = recRef.current;
      if (!mr || mr.state === 'inactive') { setRecording(false); resolve(null); return; }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        resolve(blob.size ? URL.createObjectURL(blob) : null);
      };
      try { mr.stop(); } catch { resolve(null); }
      setRecording(false);
    });
  }, []);

  // Libère le micro au démontage.
  useEffect(() => () => {
    try { if (recRef.current && recRef.current.state !== 'inactive') recRef.current.stop(); } catch { /* ignore */ }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  return { supported: recorderSupported, recording, error, start, stop };
}
