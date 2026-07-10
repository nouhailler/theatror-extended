# Génération des textes intégraux (Wikisource → `src/data/texts/`)

Outils pour ajouter le texte intégral d'une pièce du domaine public.

## Prérequis
- Python 3 + `beautifulsoup4` + `lxml` (`pip install beautifulsoup4 lxml`)

## Étapes pour ajouter des pièces (lot suivant)
1. **Trouver l'édition Wikisource** avec sous-pages `/Acte …` :
   ```bash
   python3 - <<'PY'
   import urllib.parse,urllib.request,json
   UA={"User-Agent":"Theathror/1.0 (educational; patrick.nouhailler@gmail.com)"}
   def api(**p):
       p.setdefault("format","json")
       u="https://fr.wikisource.org/w/api.php?"+urllib.parse.urlencode(p)
       return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
   for q in ["Le Mariage de Figaro","Hamlet"]:
       r=api(action="query",list="prefixsearch",pssearch=q,pslimit=8)
       print("###",q); [print("  ",x['title']) for x in r['query']['prefixsearch']]
   PY
   ```
   On cherche une base du type `Titre/Édition …` qui possède `…/Acte I`, `…/Acte II`, etc.
2. **Déclarer la pièce** dans `gen.py` → dict `PLAYS` : `id (= id dans src/data/pieces.ts) : (base, nb_actes, source)`.
3. **Générer** : `python3 scripts/wikisource/gen.py <id> [<id> …]` (sans argument = régénère tout).
   Vérifier la sortie stderr : chaque acte doit rapporter des blocs (`acte`/`scene`/`perso`/`ligne`).
4. **Enregistrer le loader** dans `src/data/pieceTextes.ts` → `TEXTE_LOADERS['<id>'] = () => import('./texts/<id>')`.
5. `npm run build` puis vérifier le rendu dans le lecteur (`/pieces/<id>/texte`).

## Notes
- Wikisource **exige un vrai User-Agent** (403 sinon) — déjà géré dans `ws_fetch.py`.
- Le parseur cible le HTML `action=parse` : classes `personnage` / `didascalie`, `div.poem`,
  titres `<h2>` (acte) / `<h3>` (scène). Prose et vers sont gérés.
- Défaut connu : si une édition compose le **1er locuteur d'une scène en ligne** avec sa
  didascalie, ce locuteur peut manquer (vu dans Cyrano). Vérifier visuellement les ouvertures.
- Pièces **étrangères** (Shakespeare, Tchekhov, Ibsen, Wilde, tragiques grecs) : chercher une
  **traduction française du domaine public** sur fr.wikisource (souvent une seule page « Texte
  entier » plutôt que des sous-pages /Acte — le parseur peut alors demander un ajustement).
