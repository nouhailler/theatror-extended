// Proxy serverless pour flux RSS/Atom — basé sur la fonction de rssor
// (github.com/nouhailler/rssor), spécialisée pour Theathror :
//   • ALLOWLIST des hôtes de flux (anti-SSRF : pas un proxy ouvert)
//   • CACHE mémoire à TTL (moins d'appels amont sur instance chaude)
//   • repli sur le cache périmé si l'amont échoue
//
// But : fetch le flux côté serveur pour que le navigateur évite le CORS, sur
// NOTRE propre domaine. Pass-through — rien n'est stocké durablement ni loggé.
// Endpoint : /.netlify/functions/feed?url=<feed-url>

const ALLOW_HOSTS = new Set([
  'radiofrance-podcast.net',
  'www.youtube.com',
  'feeds.audiomeans.fr',
  'rss.audiomeans.fr',
  'feeds.acast.com',
  'radiofrance.fr',
]);

const TTL_MS = 30 * 60 * 1000; // 30 min
const cache = new Map(); // url -> { at, body, contentType } (mémoire d'instance chaude)

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
  // Allowlist : n'ouvre pas un proxy générique.
  if (!ALLOW_HOSTS.has(parsed.hostname)) {
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
    const contentType = res.headers.get('content-type') || 'application/xml; charset=utf-8';
    if (res.ok) cache.set(target, { at: now, body, contentType });
    return {
      statusCode: res.ok ? 200 : 502,
      headers: Object.assign({ 'Content-Type': contentType, 'Cache-Control': 'public, max-age=1800' }, cors),
      body,
    };
  } catch (e) {
    // Repli sur le cache périmé si disponible.
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
