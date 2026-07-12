// Proxy serverless pour flux RSS/Atom — basé sur la fonction de rssor
// (github.com/nouhailler/rssor), spécialisée pour Theathror :
//   • GARDE ANTI-SSRF (refuse localhost / IP privées / lien-local / métadonnées
//     cloud) au lieu d'une allowlist fixe → permet les sources ajoutées par
//     l'utilisateur tout en fermant l'usage détourné.
//   • CACHE mémoire à TTL + repli sur le cache périmé si l'amont échoue.
//   • Plafond de taille de réponse.
//
// Fetch le flux côté serveur pour que le navigateur évite le CORS, sur NOTRE
// domaine. Pass-through — rien n'est stocké durablement ni loggé.
// Endpoint : /.netlify/functions/feed?url=<feed-url>

const TTL_MS = 30 * 60 * 1000; // 30 min
const MAX_BYTES = 5 * 1024 * 1024; // 5 Mo
const cache = new Map(); // url -> { at, body, contentType }

// Hôtes/adresses internes à ne jamais joindre (anti-SSRF).
function hostBloque(hostname) {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') || h.endsWith('.localhost')) return true;
  if (h === '::1' || h === '[::1]') return true;
  if (h.startsWith('fe80') || h.startsWith('fc') || h.startsWith('fd')) return true; // IPv6 lien-local / ULA
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = +m[1], b = +m[2];
    if (a === 0 || a === 127 || a === 10) return true;       // this / loopback / privé
    if (a === 169 && b === 254) return true;                  // lien-local + métadonnées cloud
    if (a === 172 && b >= 16 && b <= 31) return true;         // privé
    if (a === 192 && b === 168) return true;                  // privé
    if (a === 100 && b >= 64 && b <= 127) return true;        // CGNAT
  }
  return false;
}

export async function handler(event) {
  const target = event.queryStringParameters && event.queryStringParameters.url;
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };
  if (!target) return { statusCode: 400, headers: cors, body: 'Missing ?url=' };

  let parsed;
  try { parsed = new URL(target); } catch (e) { return { statusCode: 400, headers: cors, body: 'Bad url' }; }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { statusCode: 400, headers: cors, body: 'Only http(s)' };
  }
  if (hostBloque(parsed.hostname)) {
    return { statusCode: 403, headers: cors, body: 'Host not allowed' };
  }

  const now = Date.now();
  const hit = cache.get(target);
  if (hit && now - hit.at < TTL_MS) {
    return {
      statusCode: 200,
      headers: Object.assign({ 'Content-Type': hit.contentType, 'Cache-Control': 'public, max-age=1800', 'X-Cache': 'HIT' }, cors),
      body: hit.body,
    };
  }

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(target, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Theathror/1.0; +PWA)',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8',
      },
    });
    clearTimeout(t);
    const body = await res.text();
    if (body.length > MAX_BYTES) {
      return { statusCode: 413, headers: cors, body: 'Feed too large' };
    }
    const contentType = res.headers.get('content-type') || 'application/xml; charset=utf-8';
    if (res.ok) cache.set(target, { at: now, body, contentType });
    return {
      statusCode: res.ok ? 200 : 502,
      headers: Object.assign({ 'Content-Type': contentType, 'Cache-Control': 'public, max-age=1800' }, cors),
      body,
    };
  } catch (e) {
    if (hit) {
      return {
        statusCode: 200,
        headers: Object.assign({ 'Content-Type': hit.contentType, 'Cache-Control': 'public, max-age=300', 'X-Cache': 'STALE' }, cors),
        body: hit.body,
      };
    }
    return { statusCode: 502, headers: cors, body: 'Fetch failed: ' + String((e && e.message) || e) };
  }
}
