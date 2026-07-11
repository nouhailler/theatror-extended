# CONTEXT — travail en cours

_Dernière mise à jour : 2026-07-11._

## 🔔 À rappeler au démarrage de la prochaine session
**RÉPERTOIRE ÉLARGI texteslibres.fr — FAIT (2026-07-11)** : les **319 pièces** de
`texteslibres.fr/categorie/theatre` sont intégrées. Catalogue passé de 34 à **317 pièces**,
315 avec texte intégral. Restent sans texte : `medee` (Euripide) et `importance-etre-constant`.
8 pièces du site écartées (2 liens 404, 3 gaps source : serments-indiscrets, pamela-giraud,
eventail ; 3 sketches quasi-vides). Duplicatas retirés (Dom Juan, Barbier, Tartuffe déjà présents).

### Fiches auto-générées (`scripts/wikisource/tl_fiches.py`) — AFFINÉES (2026-07-11)
titre/auteur/année/actes EXACTS ; **genres corrigés** via `GENRE_OVERRIDE` (comédies de
Corneille/Th. Corneille, Plaideurs de Racine, Annibal de Marivaux = tragédie, drames de
Tchekhov/Ibsen/Beaumarchais, farces des one-acts…) ; **138 résumés** rédigés (`RESUMES`) pour
les pièces canoniques ; **durée** estimée (nb répliques + plancher `actes*22`).
**Distribution F/H** — améliorée : `gender()` avec grand lexique `KNOWN_F` (prénoms féminins
classiques/XIXe/russes/scandinaves) + titres FR/M étendus, et `FH_OVERRIDE` (distributions exactes
pour ~30 pièces majeures). Résultat plausible partout (Illusion comique 2F·8H, Colonie 7F·9H…).
Résiduel : quelques comptes gonflés par les rôles de foule/mineurs, et prénoms rares mis en H par
défaut. **Résumés** : 168/268 rédigés — canon + one-acts célèbres (main) + 13 reformulés depuis les
notices fr.wikipedia (`scripts/wikisource/wiki_resumes.py` récupère les sections « Résumé/Argument »).
Les **100 restants** sont des one-acts très obscurs SANS article Wikipédia dédié (Labiche/Feydeau/
Courteline mineurs) → laissés vides **volontairement** (pas de source fiable ; ne pas inventer ;
les « fiches de lecture » du site sont sous copyright). Total catalogue ≈ 217/317 avec résumé.

### Rappel des 15 pilotes (fiches soignées à la main, à garder comme référence)
amphitryon, fourberies-scapin, medecin-malgre-lui, fausses-confidences, double-inconstance,
cinna, polyeucte, berenice, bajazet, caprices-marianne, lorenzaccio, fil-a-la-patte, le-dindon,
boubouroche, perrichon.

### Où on en est sur ce chantier
- **Pipeline auto** prêt : `scripts/wikisource/texteslibres_gen.py` (dict `PLAYS` id→(slug,auteur,titre,année))
  + `ws_fetch.discover_texteslibres(landing_url)` qui auto-découvre les sous-pages (une par
  scène/acte), gère ordinaux FR (deuxieme…), prologue/épilogue, saute personnages/couverture,
  nettoie emoji/@ parasites. Cache HTML brut dans le scratchpad (`tl_cache/`) → reprenable, throttle 0.35s.
- **Fiches** : titre/auteur/année/actes/époque exacts ; genre + distribution F/H + résumé + durée
  écrits à la main (connaissance + distribution réelle extraite du texte). `auteurId` = slug auteur
  (moliere, corneille, racine, marivaux, musset, feydeau, courteline, labiche…) même si le
  dramaturge n'a pas encore de fiche encyclo (rendu gracieux : pas de carte auteur, cf. FichePiece).
- **PWA** : ⚠️ changement clé — les textes ne sont PLUS précachés. `vite.config.ts` route les chunks
  `src/data/texts/*` vers `dist/assets/texts/` ; `workbox.globIgnores` les exclut du précache +
  `runtimeCaching` CacheFirst « play-texts » → cache à la 1re ouverture. Précache tombé de 70 (6,2 Mo)
  à **38 entrées (1,1 Mo)**. Indispensable à cette échelle.
- **Lot pilote (15, commité)** : amphitryon, fourberies-scapin, medecin-malgre-lui (Molière) ·
  fausses-confidences, double-inconstance (Marivaux) · cinna, polyeucte (Corneille) · berenice,
  bajazet (Racine) · caprices-marianne, lorenzaccio (Musset) · fil-a-la-patte, le-dindon (Feydeau) ·
  boubouroche (Courteline) · perrichon (Labiche). → **49 pièces au catalogue**.

### Reste à faire (chantier)
- Faire **valider le pilote** par l'utilisateur (qualité fiches + rendu).
- **Générer les ~280 autres** : étendre `PLAYS` dans `texteslibres_gen.py` (titre/auteur/année depuis
  les cartes de la page catégorie — parsées dans `scratchpad/theatre_cards.json`), générer par lots,
  écrire les fiches, enregistrer les loaders. ⚠️ **Valider chaque pièce** : certaines pages sont
  incomplètes (ex. Turcaret : actes III-V absents) ou ont des slugs incohérents (ex. Chapeau de paille
  d'Italie : titres d'actes intégrés) → à repérer (trous dans la numérotation, très peu de pages) et
  écarter/corriger au cas par cas.
- Anecdote : quelques pages « ouverture d'acte » (décor) sont vides sur le site → didascalie de décor
  parfois absente (mineur).

---

## Fait (session du 2026-07-10)
- **Section « Auteurs contemporains »** dans l'Encyclopédie (11 fiches, 8 avec portrait
  Wikimedia + crédit ; Koltès / Mouawad / Copi sans portrait libre → initiale dorée).
- **Lecteur de texte intégral** des pièces :
  - Route `/pieces/:id/texte` (`src/screens/LecturePiece.tsx`), bouton doré
    « 📖 Lire le texte intégral » sur la fiche (visible si `hasTexte(id)`).
  - Textes = un module lazy-load par pièce dans `src/data/texts/<id>.ts`, registre
    `src/data/pieceTextes.ts`. Code-splitté + précaché PWA → **hors-ligne**.
  - Barre collante (retour, titre, A−/A+), nav par actes, crédit source en pied.
  - **Lot 1 (8 pièces)** : le-misanthrope, tartuffe, lavare, phedre, andromaque,
    le-cid, britannicus, cyrano.
  - Outillage réutilisable : `scripts/wikisource/` (`ws_fetch.py`, `gen.py`, `README.md`).
- **Lot 2 — Molière (3 pièces, 2026-07-11)** : malade-imaginaire, bourgeois-gentilhomme,
  dom-juan (édition Louandre 1910). ⚠️ `dom-juan` : base Wikisource = « **Don** Juan… »
  (« Dom Juan » redirige). **Correctif parseur** `ws_fetch.py` (`is_cue`) : comparaison
  désormais insensible aux espaces → le 1er locuteur d'une scène (didascalie collée au nom,
  « Sganarelle, tenant… ») n'est plus perdu. Ancien défaut connu = résolu.
- **Lot 2 — Corneille + Beaumarchais (3 pièces, 2026-07-11)** : horace, mariage-figaro,
  barbier-seville. ⚠️ `horace` n'a **pas** de sous-pages `/Acte` → page unique (édition
  Courbé). Nouveau support dans `gen.py` : **nb actes = 0** ⇒ on fetch `base` en une seule
  page et `parse_act` repère actes (h2)/scènes (h3) d'un seul tenant. Réutilisable pour le
  Lot 3 (pièces étrangères souvent en « Texte entier »).
- **Lot 2 — Hugo + Musset + Marivaux + Jarry + Sand (7 pièces, 2026-07-11) → LOT 2 TERMINÉ** :
  hernani, ruy-blas, on-ne-badine-pas, le-jeu-amour-hasard, ubu-roi, marquis-villemer,
  francois-champi. Sand = versions **(Théâtre)** en page unique (`nact=0`). Deux améliorations
  parseur : (a) chiffres **arabes** pour les pages d'acte (`gen.py`, 4e champ `"Acte {n}"` —
  ruy-blas, ubu-roi) ; (b) un h3 avant le 1er acte n'ouvre plus la capture (préface/« NOTE DES
  ÉDITEURS » du Marquis ignorée) ; (c) liste des personnages embarquée en tête d'acte (marqueur
  « PERSONNAGES », Ruy Blas) désormais sautée.
  **Total pièces avec texte : 21.**
- **Lot 3 — Shakespeare (×3) + Ibsen (4 pièces, 2026-07-11)** : hamlet, macbeth,
  songe-nuit-ete (trad. Guizot 1862-64, sous-pages /Acte), maison-poupee (Ibsen, trad.
  Savine 1906). Extensions parseur : (a) un **h2 « SCÈNE… »** compte comme scène (Guizot
  compose les scènes en h2) ; (b) **`sc_cue`** : locuteur en `<span class="sc">nom</span>. —`
  (petites capitales Guizot) reconnu en tête de `<p>`. **Total pièces avec texte : 25.**
- **Lot 3 — tragiques grecs (3 pièces, 2026-07-11)** : antigone-sophocle, oedipe-roi (trad.
  Artaud, `Tragédies de Sophocle (Artaud)/…`), les-grenouilles (trad. Talbot). Nouveau **mode
  « sans actes »** dans le pipeline : `gen.py` `nact = -1` ⇒ page unique + `parse_act(no_act=True)`
  (démarre la capture au **1er locuteur**, ce qui saute tout le front-matter titre/notice/cast) +
  un bloc `acte` synthétique (titre, 4e champ) prépendu. Lecteur : la barre de nav des actes est
  **masquée quand il n'y a qu'un bloc** (`actes.length > 1`). Éditions Artaud/Talbot = `span.personnage`
  standalone → `is_cue` fonctionne. **Total pièces avec texte : 28.**
- **Lot 3 — Roméo et Juliette (1 pièce, 2026-07-11)** : trad. **F.-V. Hugo 1868** (`Roméo et
  Juliette (trad. Hugo)`), édition in-quarto = **24 scènes continues, sans actes**. Nouveau
  **`sc_mode`** (`gen.py` `nact = -2`) : en-têtes acte/scène en `<div>` texte (pas de h2/h3),
  locuteur = `<div>` ne contenant qu'un `<span class="sc">` **EN GRAS** (les noms cités dans les
  didascalies sont en sc non-gras → non confondus), répliques = `<p>`, reste = didascalie ; titre
  synthétique prépendu. (La trad. Montégut, elle, a des locuteurs non balisés → écartée.)
  **Total pièces avec texte : 29.**
- **Lot 3 — La Mouette (1 pièce, 2026-07-11)** : trad. FR du domaine public via **texteslibres.fr**
  (1re source hors Wikisource). Nouveau chemin `gen.py` : dict `EXTERNAL` (une URL par acte) +
  `ws.get_texteslibres(url)` (isole `.texte`, retire le bruit boutons-commentaires/icônes) +
  `parse_act(force_started=True)`. texteslibres.fr utilise **les mêmes classes** `span.personnage`
  / `span.didascalie` que Wikisource → `emit_lines` fonctionne tel quel. 4 actes.
  **Total pièces avec texte : 30.**
- **NOUVELLE PIÈCE — Médée de Corneille (`medee-corneille`, 2026-07-11)** : le lien texteslibres
  fourni pour « Médée » était en fait celui de **Corneille (1635)**, pas d'Euripide → ajoutée comme
  **pièce distincte** dans `src/data/pieces.ts` (Corneille, 5 actes, classique) ; la Médée d'Euripide
  (`medee`) reste au catalogue sans texte. `gen.py` : `gen_external` gère désormais un **découpage
  par scène** (une page/scène, regroupées par acte : Corneille = 26 scènes / 5 actes). Écriture .ts
  factorisée dans `write_ts`. **Total pièces avec texte : 31.**
- **Lot 3 — Oncle Vania (1 pièce, 2026-07-11)** : Tchekhov, via **texteslibres.fr** (4 actes,
  chemin `EXTERNAL` par acte). Page auteur du site = `/auteur/anton-tchekhov.html` (liste toutes
  les pièces). **Total pièces avec texte : 32.**

## À faire — 2 pièces restantes (aucune source FR libre trouvée)

- `medee` (Euripide) : pas de traduction FR libre exploitable (Artaud n'a pas traduit Médée ;
  Leconte de Lisle « Mèdéia » a son djvu manquant). NB : la Médée de **Corneille** est, elle, dispo
  (`medee-corneille`).
- `importance-etre-constant` (Wilde) : pas de traduction FR du domaine public trouvée. Vérifié :
  texteslibres.fr n'a que *Le Fantôme de Canterville* et *Le Portrait de Dorian Gray* pour Wilde,
  pas cette pièce. (Piste : la trad. FR historique est celle de Mme Toussaint du Wast — à chercher.)

## Priorité 2 (base de données) — personnages structurés FAITS (2026-07-11)
Index `src/data/personnages.ts` (Record<id, string[]>, 314 pièces / 4359 rôles, 68 Ko) généré par
`scripts/wikisource/gen_personnages.py` (extrait les locuteurs uniques des textes intégraux, filtre
foule/composés, title-case FR). FichePiece affiche la **distribution** (fallback si pas de fiche
curée `PIECE_DETAILS`), et la **recherche Pièces** couvre désormais les personnages (« Scapin » →
Fourberies, « Sganarelle » → 5 pièces).
**Thèmes + extraits célèbres** : `PIECE_DETAILS` étendu à **62 pièces** (33 avec extrait vérifié)
couvrant tout le répertoire canonique (Molière, Corneille, Racine, Marivaux, Musset, Hugo,
Beaumarchais, Tchekhov, Ibsen, Shakespeare, grecs…). Reste priorité 2 : **style, costumes,
distribution flexible** (champs non implémentés) + thèmes/extraits pour les pièces non canoniques.

## Priorité 3 (dramaturges) — FAITE (2026-07-11)
Type `Dramaturge` étendu : `style`, `manuscrits`, `adaptations`, `citations` (pluriel). FicheDramaturge
affiche désormais bio + chronologie + citation(s) + œuvres + **style + influence + adaptations +
manuscrits**. DRAMATURGES passé de 20 à **40 fiches** : +20 auteurs majeurs du catalogue (Marivaux,
Musset, Voltaire, Feydeau, Labiche, Courteline, Ibsen, Rostand, Dumas, Jarry, Balzac, Goldoni,
Lesage, Diderot, Maupassant, Augier, La Fontaine, Aristophane, Euripide, Wilde) → les fiches-pièces
de ces auteurs ont enfin leur **carte auteur** cliquable. Les 9 classiques existants (Molière, Racine,
Corneille, Hugo, Shakespeare, Tchekhov, Beaumarchais, Sophocle, Sand) enrichis de style/adaptations/
manuscrits. Nouveaux auteurs sans portrait (`img:''` → initiale dorée) : ajoutables via Wikimedia.

## Autres pistes (backlog, non prioritaire)
- Défaut mineur du parseur : 1er locuteur d'une scène parfois manquant si composé en ligne
  avec la didascalie (vu dans Cyrano). Améliorer la détection si on veut du 100 %.
- Portraits manquants (Koltès, Mouawad, Copi) : pas d'image libre trouvée — à revoir si
  une photo CC apparaît sur Commons.
- Roadmap déjà notée : Mode IA (OpenRouter), **lecture interactive Web Speech** (désormais
  possible puisqu'on a les textes), quiz, exercices voix, agenda festivals.

## Commandes utiles
- Build : `npm run build` — Dev : `npm run dev` — Preview : `npm run preview`
- Vérif visuelle : Playwright local (mettre `localStorage['theathror-onb']='1'` pour sauter
  l'onboarding avant de naviguer).
