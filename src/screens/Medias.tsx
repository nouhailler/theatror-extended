import { useEffect, useMemo, useState } from 'react';
import { BackHeader } from '../components/ui';
import { MEDIAS, MEDIA_COULEUR, type MediaCategorie } from '../data/medias';
import { chargerNouveautes, listerSources, ajouterSource, retirerSource, type FeedItem, type UserSource } from '../lib/feeds';

const CATEGORIES: MediaCategorie[] = ['Podcast', 'Captation', 'Conférence', 'Interview', 'Analyse', 'Lecture'];

function domaine(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
}

type Onglet = 'nouveautes' | 'annuaire';

export default function Medias() {
  const [onglet, setOnglet] = useState<Onglet>('nouveautes');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Podcasts et vidéos">
      <BackHeader to="/explorer" title="Podcasts & vidéos" sub="Ressources gratuites autour du théâtre" />

      <div style={{ display: 'flex', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: 4, gap: 4 }}>
        {([['nouveautes', 'Nouveautés'], ['annuaire', 'Annuaire']] as [Onglet, string][]).map(([k, label]) => (
          <button key={k} onClick={() => setOnglet(k)}
            style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 999, fontSize: 14, cursor: 'pointer', border: 'none', fontWeight: 600, background: onglet === k ? 'var(--gold)' : 'transparent', color: onglet === k ? 'var(--on-gold)' : 'var(--nav-inactive)' }}>
            {label}
          </button>
        ))}
      </div>

      {onglet === 'nouveautes' ? <Nouveautes /> : <Annuaire />}
    </div>
  );
}

// ─── Nouveautés (flux RSS/Atom en direct via le proxy Netlify) ───
function Nouveautes() {
  const [state, setState] = useState<'load' | 'ok' | 'empty'>('load');
  const [items, setItems] = useState<FeedItem[]>([]);
  const [from, setFrom] = useState<'live' | 'cache' | 'empty'>('empty');
  const [source, setSource] = useState<string | null>(null);
  const [gestion, setGestion] = useState(false);

  const load = (force = false) => {
    setState('load');
    chargerNouveautes(force).then((r) => {
      setItems(r.items); setFrom(r.from);
      setState(r.items.length ? 'ok' : 'empty');
    }).catch(() => setState('empty'));
  };
  useEffect(() => { load(false); }, []);

  const sources = useMemo(() => Array.from(new Set(items.map((i) => i.source))).sort(), [items]);
  const list = useMemo(() => (source ? items.filter((i) => i.source === source) : items), [items, source]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
          {state === 'ok' ? `${list.length} épisode${list.length > 1 ? 's' : ''}${from === 'cache' ? ' · en cache' : ''}` : state === 'load' ? 'Chargement…' : ''}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setGestion((g) => !g)} style={{ fontSize: 13, padding: '5px 12px', borderRadius: 999, background: gestion ? 'var(--gold)' : 'transparent', border: '1px solid var(--b-chip)', color: gestion ? 'var(--on-gold)' : 'var(--gold)', cursor: 'pointer' }}>+ Source</button>
          <button onClick={() => load(true)} style={{ fontSize: 13, padding: '5px 12px', borderRadius: 999, background: 'transparent', border: '1px solid var(--b-chip)', color: 'var(--gold)', cursor: 'pointer' }}>↻</button>
        </div>
      </div>

      {gestion && <GestionSources onChange={() => load(true)} />}

      {state === 'ok' && sources.length > 1 && (
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {sources.map((s) => (
            <button key={s} className={`chip${source === s ? ' active' : ''}`} onClick={() => setSource(source === s ? null : s)}>{s}</button>
          ))}
        </div>
      )}

      {state === 'load' && <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14, padding: '10px 2px' }}>Récupération des flux…</div>}

      {state === 'empty' && (
        <div style={{ textAlign: 'center', padding: '24px 16px', border: '1px dashed var(--b-chip)', borderRadius: 12, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5 }}>
          Les nouveautés s'affichent une fois l'application <strong>déployée</strong> (le proxy <code>/.netlify/functions/feed</code> tourne alors).<br />
          En local (dev), les flux ne sont pas disponibles — consultez l'<strong>Annuaire</strong>.
        </div>
      )}

      {state === 'ok' && list.map((it) => (
        <a key={it.key} href={it.lien} target="_blank" rel="noreferrer noopener" className="card card-tap"
          style={{ display: 'flex', gap: 12, padding: 12, textDecoration: 'none', color: 'inherit', alignItems: 'flex-start' }}>
          <Vignette item={it} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{it.titre}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {it.programme}{it.dateLabel ? ` · ${it.dateLabel}` : ''} <span style={{ color: 'var(--gold)' }}>↗</span>
            </div>
            {it.resume && <div style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 5, lineHeight: 1.4 }}>{it.resume}</div>}
          </div>
        </a>
      ))}
    </div>
  );
}

function Vignette({ item }: { item: FeedItem }) {
  const [broken, setBroken] = useState(false);
  if (item.image && !broken) {
    return <img src={item.image} alt="" loading="lazy" onError={() => setBroken(true)}
      style={{ width: 56, height: 56, borderRadius: 10, flex: 'none', objectFit: 'cover', background: 'var(--bg-field)' }} />;
  }
  return (
    <div style={{ fontSize: 22, flex: 'none', width: 56, height: 56, borderRadius: 10, background: 'var(--fallback-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {item.type === 'video' ? '🎬' : '🎙️'}
    </div>
  );
}

function GestionSources({ onChange }: { onChange: () => void }) {
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [liste, setListe] = useState<UserSource[]>([]);

  const refresh = () => { void listerSources().then(setListe); };
  useEffect(() => { refresh(); }, []);

  const add = async () => {
    const r = await ajouterSource(url);
    if (r.ok) { setUrl(''); setMsg('Source ajoutée ✓'); refresh(); onChange(); }
    else setMsg(r.error ?? 'Erreur');
  };
  const remove = async (id: string) => { await retirerSource(id); refresh(); onChange(); };

  return (
    <div className="card card-16" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Ajouter un flux RSS</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={url} onChange={(e) => { setUrl(e.target.value); setMsg(''); }} placeholder="https://…/rss.xml"
          style={{ flex: 1, background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '9px 12px', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />
        <button className="gold-btn" style={{ padding: '9px 16px', fontSize: 14, opacity: url.trim() ? 1 : 0.5 }} disabled={!url.trim()} onClick={add}>Ajouter</button>
      </div>
      {msg && <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{msg}</div>}
      {liste.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {liste.map((s) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-2)' }}>{s.titre}</span>
              <button onClick={() => remove(s.id)} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 999, background: 'var(--red-chip-bg)', border: '1px solid var(--red-chip-border)', color: 'var(--red-chip-text)', cursor: 'pointer' }}>Retirer</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
        Collez l'URL d'un flux RSS/Atom (podcast, chaîne YouTube via channel_id…). Enregistré sur cet appareil.
      </div>
    </div>
  );
}

// ─── Annuaire curé (offline) ───
function Annuaire() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<MediaCategorie | null>(null);
  const [gratuit, setGratuit] = useState(false);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MEDIAS.filter((m) =>
      (!cat || m.categorie === cat) &&
      (!gratuit || m.acces === 'Gratuit') &&
      (!needle || `${m.titre} ${m.source} ${m.description}`.toLowerCase().includes(needle)),
    );
  }, [q, cat, gratuit]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (source, sujet…)"
        style={{ width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(cat === c ? null : c)}>{c}</button>
        ))}
        <button className={`chip${gratuit ? ' active' : ''}`} onClick={() => setGratuit((g) => !g)}>Gratuit</button>
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{list.length} ressource{list.length > 1 ? 's' : ''}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((m) => {
          const col = MEDIA_COULEUR[m.categorie];
          return (
            <a key={m.id} href={m.url} target="_blank" rel="noreferrer noopener" className="card card-tap"
              style={{ display: 'flex', gap: 14, padding: 14, textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, flex: 'none', background: `linear-gradient(150deg, ${col}, rgba(0,0,0,.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {icon(m.categorie)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: 16.5, fontWeight: 600 }}>{m.titre}</div>
                  <span style={{ fontSize: 11, color: col, whiteSpace: 'nowrap' }}>{m.categorie}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>{m.source}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.45 }}>{m.description}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--b-chip)', color: m.acces === 'Gratuit' ? 'var(--gold-chip-text)' : 'var(--text-muted)' }}>{m.acces}</span>
                  <span style={{ fontSize: 12, color: 'var(--gold)' }}>{domaine(m.url)} ↗</span>
                </div>
              </div>
            </a>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '26px 18px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14.5 }}>Aucune ressource pour ces critères.</div>
        )}
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
        Annuaire indicatif — les liens ouvrent le site de l'institution. Disponibilité et accès susceptibles d'évoluer.
      </div>
    </div>
  );
}

function icon(c: MediaCategorie): string {
  switch (c) {
    case 'Podcast': return '🎙️';
    case 'Captation': return '🎬';
    case 'Conférence': return '🎓';
    case 'Interview': return '💬';
    case 'Analyse': return '📖';
    case 'Lecture': return '🎧';
  }
}
