import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../../components/ui';
import { useRehearsalStore } from '../../lib/rehearsalStore';
import { parseScript, mergeCharacters, renameCharacter, guessTitle, type RepScript } from '../../data/rehearsal';

const EXEMPLE = `ARGAN : Il y a longtemps que je n'ai vu ma fille.
TOINETTE. Vous m'avez appelée, monsieur ?
ARGAN : Oui. Approche.
TOINETTE : Me voici.`;

export default function RepImport() {
  const nav = useNavigate();
  const create = useRehearsalStore((s) => s.create);
  const setScript = useRehearsalStore((s) => s.setScript);
  const fileRef = useRef<HTMLInputElement>(null);

  const [raw, setRaw] = useState('');
  const [titre, setTitre] = useState('');
  const [parsed, setParsed] = useState(false);
  const [script, setScriptState] = useState<RepScript>({ items: [], characters: [] });
  const [mergeFrom, setMergeFrom] = useState<string | null>(null);

  const nbLignes = useMemo(() => script.items.filter((i) => i.kind === 'line').length, [script]);

  const doParse = (text: string) => {
    setScriptState(parseScript(text));
    setParsed(true);
    if (!titre.trim()) setTitre(guessTitle(text));
  };

  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { const t = String(reader.result ?? ''); setRaw(t); doParse(t); };
    reader.readAsText(f);
  };

  const rename = (key: string) => {
    const current = script.characters.find((c) => c.key === key);
    const label = prompt('Nouveau nom du personnage :', current?.label ?? '');
    if (label && label.trim()) setScriptState((s) => renameCharacter(s, key, label.trim()));
  };

  const onCharTap = (key: string) => {
    if (!mergeFrom) { setMergeFrom(key); return; }
    if (mergeFrom === key) { setMergeFrom(null); return; }
    // Fusionne mergeFrom → key (le second choisi devient la cible conservée).
    setScriptState((s) => mergeCharacters(s, mergeFrom, key));
    setMergeFrom(null);
  };

  const valider = () => {
    const play = create(raw, titre);
    // Sauvegarde le script éventuellement corrigé (fusions/renommages).
    setScript(play.id, script);
    nav(`/repetition/${play.id}/config`);
  };

  const field: React.CSSProperties = {
    width: '100%', background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10,
    padding: '10px 12px', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Répétition — import">
      <BackHeader to="/repetition" title="Nouvelle pièce" sub="Collez le texte, ou importez un fichier .txt" />

      <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5, background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 10, padding: '10px 12px' }}>
        Le plus simple : <strong>collez votre texte</strong> dans la zone ci-dessous, puis « Analyser ».
        Le bouton « Importer un .txt » n'est utile que si votre texte est déjà dans un fichier .txt.
      </div>

      <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre (ex. Le Malade imaginaire — I, 5)" style={field} />

      <textarea
        value={raw}
        onChange={(e) => { setRaw(e.target.value); setParsed(false); }}
        placeholder={`Format : NOM : réplique\n\n${EXEMPLE}`}
        style={{ ...field, minHeight: 180, resize: 'vertical', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}
      />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="gold-btn" style={{ padding: '10px 18px', fontSize: 14.5 }} disabled={!raw.trim()} onClick={() => doParse(raw)}>
          Analyser le texte
        </button>
        <button onClick={() => fileRef.current?.click()}
          style={{ background: 'var(--bg-field)', border: '1px solid var(--b-input)', borderRadius: 999, padding: '10px 16px', color: 'var(--gold-chip-text)', fontSize: 13.5, cursor: 'pointer' }}>
          Importer un .txt
        </button>
        {!raw.trim() && (
          <button onClick={() => { setRaw(EXEMPLE); doParse(EXEMPLE); }}
            style={{ background: 'none', border: 'none', color: 'var(--gold-chip-text)', fontSize: 13.5, cursor: 'pointer' }}>
            Charger un exemple
          </button>
        )}
        <input ref={fileRef} type="file" accept=".txt,text/plain" onChange={onImportFile} style={{ display: 'none' }} />
      </div>

      {parsed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>
            Personnages détectés ({script.characters.length})
          </div>
          {script.characters.length === 0 ? (
            <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
              Aucun personnage détecté. Vérifiez le format : chaque réplique doit commencer par un nom en majuscules suivi de « : », « . » ou « — ».
            </div>
          ) : (
            <>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                {mergeFrom
                  ? `Fusion : touchez le personnage qui absorbera « ${script.characters.find((c) => c.key === mergeFrom)?.label} ». (Touchez-le à nouveau pour annuler.)`
                  : 'Touchez un personnage pour commencer une fusion, ou « ✎ » pour le renommer.'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {script.characters.map((c) => (
                  <div key={c.key}
                    onClick={() => onCharTap(c.key)}
                    className="card-tap"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                      border: `1px solid ${mergeFrom === c.key ? 'var(--gold)' : 'var(--b-input)'}`, background: 'var(--bg-field)' }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-title)', fontSize: 15.5, fontWeight: 600 }}>{c.label}</span>
                      <span style={{ fontSize: 12.5, color: 'var(--text-muted)', marginLeft: 8 }}>{c.count} réplique{c.count > 1 ? 's' : ''}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); rename(c.key); }} aria-label="Renommer"
                      style={{ flex: 'none', background: 'none', border: 'none', color: 'var(--gold-chip-text)', fontSize: 15, cursor: 'pointer' }}>✎</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {parsed && script.characters.length > 0 && (
        <button className="gold-btn" style={{ padding: '12px 18px', fontSize: 15.5 }} onClick={valider}>
          Continuer ({nbLignes} répliques) →
        </button>
      )}

      {/* Sortie toujours accessible : annuler l'import et revenir à la liste. */}
      <button onClick={() => nav('/repetition')}
        style={{ padding: '11px 18px', fontSize: 14.5, borderRadius: 999, cursor: 'pointer', background: 'none', border: '1px solid var(--b-input)', color: 'var(--text-muted)', alignSelf: 'center', marginTop: 4 }}>
        ← Annuler et revenir
      </button>
    </div>
  );
}
