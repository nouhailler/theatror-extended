// Note vocale persistable : enregistre le micro et renvoie un dataURL base64
// (stockable en IndexedDB, contrairement à une URL objet éphémère). Pensé pour
// une dictée courte « à chaud » après la répétition. Repli silencieux si non
// supporté ou refusé.
import { useCallback, useEffect, useRef, useState } from 'react';

export const voiceMemoSupported =
  typeof navigator !== 'undefined' &&
  !!navigator.mediaDevices?.getUserMedia &&
  typeof window !== 'undefined' &&
  'MediaRecorder' in window;

const MAX_MS = 60000; // garde-fou : coupe à 60 s

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

export function useVoiceMemo() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const t0Ref = useRef(0);
  const tickRef = useRef<number | null>(null);
  const autoRef = useRef<number | null>(null);

  const cleanupTimers = () => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
    if (autoRef.current) { clearTimeout(autoRef.current); autoRef.current = null; }
  };

  const start = useCallback(async () => {
    setError(null);
    if (!voiceMemoSupported) { setError('unsupported'); return; }
    try {
      const s = streamRef.current ?? (await navigator.mediaDevices.getUserMedia({ audio: true }));
      streamRef.current = s;
      chunksRef.current = [];
      const mr = new MediaRecorder(s);
      mr.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      recRef.current = mr;
      mr.start();
      t0Ref.current = Date.now();
      setSeconds(0);
      setRecording(true);
      tickRef.current = window.setInterval(() => setSeconds(Math.floor((Date.now() - t0Ref.current) / 1000)), 250);
      autoRef.current = window.setTimeout(() => { void stop(); }, MAX_MS);
    } catch {
      setError('denied');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback((): Promise<{ dataUrl: string; ms: number } | null> => {
    cleanupTimers();
    return new Promise((resolve) => {
      const mr = recRef.current;
      if (!mr || mr.state === 'inactive') { setRecording(false); resolve(null); return; }
      const ms = Date.now() - t0Ref.current;
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        if (!blob.size) { resolve(null); return; }
        try { resolve({ dataUrl: await blobToDataUrl(blob), ms }); }
        catch { resolve(null); }
      };
      try { mr.stop(); } catch { resolve(null); }
      setRecording(false);
    });
  }, []);

  // Libère le micro au démontage.
  useEffect(() => () => {
    cleanupTimers();
    try { if (recRef.current && recRef.current.state !== 'inactive') recRef.current.stop(); } catch { /* ignore */ }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  return { supported: voiceMemoSupported, recording, seconds, error, start, stop };
}
