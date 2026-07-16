# CONTEXT — état du projet

_Dernière mise à jour : 2026-07-16._

## Fait (session du 2026-07-16)
- **Carnet d'adresses enrichi + suivi des interactions** — deux fonctionnalités bâties autour d'un
  même noyau `Contact`/`Reminder` (slice zustand dans `src/store.ts`, persistance idb
  `theathror-contacts` / `theathror-reminders`, hydratés au boot). Pattern CRUD calqué sur le Journal.
- **Écrans** : `Carnet.tsx` (`/carnet`) — liste filtrable par rôle, encart rappels, création via
  `components/ContactFormModal.tsx` (formulaire réutilisé en création et édition) ; `FicheContact.tsx`
  (`/carnet/:id`) — coordonnées (liens mailto/tel), fiche de préparation IA, rappels. Branché dans
  `App.tsx`, le Drawer (groupe *Personnel*) et `help.ts` (2 entrées, fiche avant liste).
- **Analyse d'URL** (`src/lib/enrich.ts`) : `fetchPageText` passe par le proxy Netlify existant
  (`/.netlify/functions/feed?url=` — déjà générique + anti-SSRF, accepte `text/html`), nettoie le HTML
  en texte (≤ 12 k), puis `messagesDepuisPage` / `messagesRepliModele` construisent le prompt envoyé
  via `useAI().run`. **Choix produit validé** : si le texte extrait est < 350 car. (SPA/anti-bot), on
  bascule sur le repli connaissance du modèle, avec avertissement « à vérifier » (`ficheSource`).
  Le résumé est persisté sur le contact (`fiche`, `ficheAt`, `ficheSource`).
- **Rappels** (`src/lib/reminders.ts`) : `dueItems` fusionne rappels non faits (échéance ≤ 30 j,
  retards inclus) et anniversaires dérivés (prochaine occurrence ≤ 14 j, non cochables). Encart
  `components/RappelsBanner.tsx` partagé — `compact` sur l'Accueil (3 lignes max), complet dans le
  Carnet. Modèles contextuels en un tap sur la fiche. Helpers de date ajoutés à `src/lib/date.ts`
  (`joursDepuisAujourdhui`, `delaiRelatif`, `ajouteMois`, `dansNJours`).
- **Vérifié** : `tsc` + `npm run build` propres ; smoke test Playwright (viewport 412×915) piloté sur
  le build de preview — création de contact, ajout de rappels (modèle + personnalisé échu), badges du
  Carnet et encart « À relancer » de l'Accueil, **9/9 assertions vertes, zéro erreur console**. DA
  cohérente (carte rouge dégradée comme les autres encarts, or/Playfair). Nouveaux écrans reçoivent
  aussi leur astuce contextuelle (`ScreenTip`) automatiquement.
- **Limite connue** : l'analyse d'URL dépend de la clé OpenRouter (comme tout le Mode IA) et de la
  lisibilité de la page côté serveur — les sites rendus intégralement en JS retombent sur le repli.

## Fait (session du 2026-07-15)
- **Écran Thèmes** (`/explorer/themes`, `src/screens/Themes.tsx` + `ThemeDetail.tsx`) : le répertoire
  indexé par sujet — **592 pièces, 47 thèmes**. Entrée par thème → pièces qui l'abordent, résumé en
  sous-titre, chips de rebond vers les autres thèmes de l'œuvre. Branché dans Explorer et le Drawer.
- **Pourquoi cet écran et pas un filtre sur `/pieces`** : sur les 592 pièces de la base, **102
  seulement sont au catalogue**. Un filtre « Thème » sur le catalogue serait vide sur **179 des 281
  pièces** (64 %), et les trous ne sont pas aléatoires — Labiche (43), Feydeau (24), Corneille (21),
  Courteline (16), Marivaux (13), c'est-à-dire toute la masse importée de texteslibres.fr. Un écran
  séparé évite ce filtre à moitié vide, et rend trouvables les **490 pièces hors catalogue**.
- **Valeur de la base** : 154 auteurs absents du catalogue (Anouilh 11 pièces, Pinter 10, Beckett 9,
  Brecht 8, Ionesco 8, Pirandello 8, Genet, Stoppard, Mamet, Churchill, Kane, Koltès, Pommerat…).
  Le catalogue est borné au domaine public (31 auteurs, de Sophocle à Feydeau) ; cette base couvre
  précisément l'angle mort du XXe–XXIe, qui n'a pas de texte libre.
- **Génération** (`scripts/themes/`, versionné) : `source.md` (tableau de 1000 lignes) + `vocab.py`
  (207 thèmes → 47, corrections) + `gen.py` → `src/data/themes.ts`. Idempotent, sans dépendance.
  1000 lignes → 592 pièces : 9 écartées (romans de Beckett, *Poétique* d'Aristote, un film
  d'Almodóvar), attributions corrigées (*Meurtre dans la cathédrale* = T.S. Eliot et non Jean Vilar
  qui l'a montée ; *Le Mahabharata* = Jean-Claude Carrière et non Peter Brook), dé-duplication sur
  (auteur, titre) — *Dialogues des Carmélites* revenait 10×, l'*Antigone* d'Anouilh 9×.
- **Correctif** : la recherche de thèmes ignorait les accents. `norm` de `src/lib/search.ts` est
  désormais exporté et réutilisé plutôt que dupliqué.

### ⚠️ Dette assumée sur l'écran Thèmes
1. **139 résumés perdus** (852 conservés sur 991, 14 %). Quand deux thèmes bruts d'une même pièce
   retombent sur le même thème canonique (`Tyrannie` et `Pouvoir` → `Pouvoir`), seule la première
   note survit — et ces notes ne sont **pas** des doublons : sur *Caligula*, « La cruauté devient un
   instrument philosophique » a disparu. Correction : autoriser plusieurs notes par thème et garder
   le thème brut comme nuance (`sujet`). Détail dans `scripts/themes/README.md`, liste via
   `python3 scripts/themes/gen.py --perdus`.
2. **Deux vocabulaires de thèmes concurrents.** La fiche pièce affiche déjà une section « Thèmes »
   alimentée par `src/data/pieceDetails.ts` : 62 pièces, **151 termes en texte libre** (« Barbon
   ridicule », « Fausse dévotion »). L'index en utilise 47, contrôlés. Une même pièce peut donc être
   étiquetée différemment selon l'écran. `help.ts:66` promet déjà « thèmes » sur la fiche pièce :
   c'est le point de jonction naturel.
3. **`Themes.tsx` trie par volume** : `Colonisation` (2) et `Féminisme` (4) finissent en bas de liste
   alors que ce sont de bonnes portes d'entrée. Un tri alphabétique optionnel serait peu coûteux.

## 🔭 À REPRENDRE — audit fonctionnel & design (2026-07-15)

Constats issus d'un parcours de l'app **en la pilotant** (Playwright, viewport 412×915), pas d'une
lecture du code. Chiffres mesurés, reproductibles. Classés par impact.

### P1 — Le stock de monologues s'effondre sur la requête la plus courante
**C'est le chantier prioritaire, et c'est du contenu, pas du code.** L'app se vend sur « Monologues —
pour vos auditions ». Croisement réel des 45 monologues de `MONOLOGUES` (`src/data/content.ts`) :

| | Classique | Contemporain |
|---|---|---|
| Femme | 11 | **2** |
| Homme | 19 | 9 |
| Mixte | 4 | 0 |

Une comédienne cherchant un monologue **contemporain a 2 choix** (un homme : 9). Avec « Facile » en
plus : **0**. Global : 28 masculins / 13 féminins, 34 classiques / 11 contemporains. Or les auditions
demandent massivement du contemporain. Les filtres de l'écran Scène ne sont pas en cause — ils sont
bons, ils rendent juste le trou visible. Cible : ~30 monologues féminins contemporains.
⚠️ Contrainte : le contemporain n'est pas dans le domaine public — vérifier les droits (extraits
courts, ou auteurs sous licence libre) avant d'intégrer.

### P2 — Accessibilité : les cartes ne sont pas atteignables au clavier
Systémique. Mesuré sur `/pieces` : **0 titre** (`h1`–`h4`), **0 lien** (`<a>`), **331 divs
cliquables** sans `role`, sans `tabindex`, sans label. **60 pressions sur Tab n'atteignent aucune
fiche de pièce.** Un utilisateur au clavier ou au lecteur d'écran ne peut pas naviguer la
bibliothèque.
Détail révélateur : les 332 `aria-label` de la page sont à 330 sur les **pastilles de difficulté**
(`difficulté ●●●○`) et 2 sur des boutons — l'effort a porté sur la décoration, pas sur les cibles.
Correctif concentré : `src/components/PieceCard.tsx` et les `.card-tap` des écrans → `<button>` ou
`<a>` au lieu de `<div onClick>`. Bonus gratuit : clic-milieu et « ouvrir dans un nouvel onglet »,
qui ne marchent pas aujourd'hui.

### P3 — Bug : « Théâtre du jour » n'est pas un théâtre 2 fois sur 3
`src/screens/Accueil.tsx:47` → `pick(LIEUX.filter((l) => l.img))` ne filtre pas le type, alors que
`LIEUX` mélange **16 théâtres, 13 festivals, 11 traditions, 11 écoles** (51). Soit **31 %** de chances
d'afficher un vrai théâtre ; le 15/07 l'accueil affichait « THÉÂTRE DU JOUR — Festival d'Automne ».
`src/screens/Carte.tsx:68` filtre correctement, lui.
Fix : `.filter((l) => l.img && l.type === 'theatre')`, ou renommer le bloc « Lieu du jour » si l'on
veut garder la variété des 51. **Une ligne.**

### P4 — Le plateau de mise en scène ne permet pas de faire du placement
`/mise-en-scene` pose des pastilles sur une **photo en perspective** (galerie des Glaces). Or on place
les acteurs en **vue de dessus** : cour, jardin, face, lointain — vocabulaire déjà présent dans le
glossaire. Sur une perspective, « aller à jardin » n'a pas de sens géométrique.
Piste : plan de scène schématique (rectangle, avant-scène en bas, coulisses sur les côtés) — plus
juste *et* plus simple que les photos. Les photos gardent leur rôle de référence d'ambiance.

### P5 — Design, points fins
- **Bandeaux « Astuce »** : s'empilent au-dessus de la nav sur *tous* les écrans à la première visite
  et masquent le contenu. Sur `/collection` (état vide), l'astuce est plus grande que l'écran qu'elle
  explique. Piste : une seule astuce par session, ou placement en haut.
- **Contraste** : sur le plateau, « Ajoutez un acteur pour glisser » est illisible sur la photo. Un
  voile sombre suffirait — c'est déjà bien fait sur les bandeaux de `CollectionDetail`.
- **États vides** minces (`/collection`).
- **Onboarding** : l'overlay intercepte tous les clics au premier lancement, sans échappatoire autre
  que « Passer ». Bloque tout pilotage automatisé — prévoir un flag ou un `localStorage` pré-rempli
  si l'on veut des tests E2E.

### Ce qui marche (pour ne pas casser en refactorant)
DA cohérente et tenue partout (Playfair + or sur prune, surtitres en capitales) ; **compteurs sur
chaque chip**, qui rendent la profondeur du catalogue lisible d'un coup ; mode répétition avec lecture
vocale, proposition qu'aucune app de théâtre grand public n'offre ; 320 textes intégraux hors-ligne.

### Ordre conseillé
**P1** (le plus de valeur, le plus de travail) → **P2** (systémique, coûtera plus cher plus tard) →
**P3** (une ligne, à faire tout de suite) → P4 → P5.

## Fait (session du 2026-07-14)
- **Mode répétition** (`/repetition`, `src/screens/rehearsal/`) : import d'une pièce du catalogue ou
  saisie libre, choix du rôle, lecture des autres répliques à voix haute (Web Speech via
  `rehearsalEngine`), masquage/révélation de ses propres répliques, et **enregistrement vocal** de sa
  voix pour se réécouter (`src/lib/useRecorder.ts`, MediaRecorder — nécessite HTTPS + autorisation micro).
- **Correctif enregistrement vocal** (`RepPlayer.tsx`) : l'effet « couper l'enregistrement au changement
  de réplique » se redéclenchait à chaque rendu (dépendance `stopRec` instable) et arrêtait
  l'enregistrement dès son démarrage. Garde ajoutée sur un **vrai** changement d'index (`prevIndexRef`).
- **Glossaire enrichi** : `GLOSSAIRE` (`src/data/content.ts`) passé de 10 à **309 termes**, triés
  alphabétiquement, doublons fusionnés. Déjà branché à l'écran Scène (nav par lettre) et à la recherche.
- Autres améliorations poussées le même jour : **recherche globale** sur l'accueil (`src/lib/search.ts`),
  aide/mode démo contextuels, sélection d'un modèle gratuit OpenRouter dans les Réglages, vignettes
  illustrées + fiches détail pour costumes / décors / accessoires / festivals, collections curées,
  favoris étendus, images offline et améliorations d'accessibilité.

## 🎉 Roadmap complète (26/26) + agrégation RSS
Toute la roadmap fournie par l'utilisateur (priorités 1 → 26) est **livrée**, testée et poussée sur
`origin/main`, ainsi que l'**agrégation RSS en direct** (au-delà de la roadmap). La roadmap initiale
est donc close — mais « roadmap complète » ne veut pas dire « rien à faire » : l'audit du 2026-07-15
ci-dessous a sorti des priorités nettes, dont un trou de contenu au cœur de la promesse de l'app.

### État actuel (résumé)
- **330 pièces** au catalogue, **320 avec texte intégral** hors-ligne (fr.wikisource + texteslibres.fr).
  Restent sans texte : quelques ajouts récents (répertoire antique/farces en métadonnées) et 2 pièces
  sans source FR libre (`medee` Euripide, `importance-etre-constant` Wilde).
- **57 fiches de personnages** (`src/data/characters.ts`) interconnectées : chips cliquables des
  fiches-pièces → fiche perso (`ficheFor`), cartes Auteur/Pièce/Monologue lié.
- **Contenu** : 45 monologues, 41 citations, encyclopédie (Histoire/Mouvements/Genres/Métiers = 10
  articles chacun), 51 lieux (théâtres/festivals/traditions/écoles), 31 costumes, 31 décors, 42
  accessoires, 20 festivals (agenda), 24 ressources (annuaire médias) + 8 flux RSS.
- **Base de références thématiques** (`src/data/themes.ts`, généré) : **592 pièces / 47 thèmes**, dont
  102 reliées au catalogue. Distincte du catalogue : elle couvre le répertoire moderne et
  contemporain, sans texte. Voir la dette assumée en tête de fichier.
- **Compteurs** : chaque chip de filtre de l'app affiche son nombre d'enregistrements.
- **Mode IA** (OpenRouter, clé locale jamais hardcodée) : Assistant ancré sur le catalogue +
  personnages + monologues ; Générateur « à la manière de » ; Analyse (texte collé ou pièce du
  catalogue) ; Distribution.
- **Agrégation RSS** : `netlify/functions/feed.js` (proxy CORS, garde anti-SSRF, cache) + `src/lib/feeds.ts`
  (parse RSS/Atom, vignettes/résumés, cache idb) + onglet « Nouveautés » des Médias, sources
  personnalisables. `netlify.toml` déclare le dossier des fonctions.
- **PWA** : textes en cache à la demande (install léger). Build : `NODE_OPTIONS=--max-old-space-size=6144`
  (dans `package.json`).

## 🗺️ ROADMAP COMPLÈTE DES PRIORITÉS (fournie par l'utilisateur, 2026-07-11)
**Les 26 priorités sont FAITES ✅** (routes dans `src/App.tsx`, écrans dans `src/screens/`).

- **1. Coquille / onboarding / lecteur** ✅
- **2. Base de données des pièces** ✅ (330 pièces, filtres, recherche)
- **3. Dramaturges** ✅ (40 fiches + portraits)
- **4. Personnages célèbres** ✅ — 57 fiches (`characters.ts`), chips cliquables (`ficheFor`), cartes liées.
- **5. Frise chronologique interactive** ✅ — filtres par type, naissances d'auteurs, éléments cliquables.
- **6. Carte du monde** ✅ — 51 lieux (théâtres/festivals/traditions/écoles), 4 types, `fitBounds`.
- **7. Citations** ✅ — 41 citations, filtres thème + auteur, lien pièce (`/scene?seg=cit`).
- **8. Monologues** ✅ — 45 monologues, filtres groupés (genre/durée/niveau/époque/âge), `?focus=`.
- **9. Exercices d'acteur** ✅ — `/exercices`, 26 exercices, 10 catégories.
- **10. Entraînement vocal** ✅ — `/voix`, 20 exercices, 6 catégories.
- **11. Quiz** ✅ — 3 niveaux, 8 générateurs de questions (`Quiz.tsx`).
- **12. Mode IA** ✅ — `/ia`, Assistant ancré (OpenRouter, clé locale), streaming.
- **13. Générateur de scènes (IA)** ✅ — onglet Générer (« à la manière de », longueur, régénérer).
- **14. Analyse d'une pièce (IA)** ✅ — onglet Analyse (texte collé OU pièce du catalogue).
- **15. Lecture interactive** ✅ — personnages cliquables + lecture à voix haute (Web Speech).
- **16. Mise en scène virtuelle** ✅ — `/mise-en-scene`, plateau 2D drag, décor + lumière, sauvegarde idb.
- **17. Costumes** ✅ — `/costumes`, 31 costumes, 7 époques.
- **18. Décors** ✅ — `/decors`, 31 décors, 7 catégories.
- **19. Accessoires** ✅ — `/accessoires`, 42 (armes/mobilier/objets anciens).
- **20. Festivals** ✅ — `/festivals`, 20 festivals, agenda par saison.
- **21. Journal du comédien** ✅ (CRUD local + stats).
- **22. Collection personnelle** ✅ (favoris 4 catégories).
- **23. Podcasts et vidéos** ✅ — `/medias`, annuaire curé + onglet Nouveautés (flux RSS live, sources perso).
- **24. Glossaire** ✅ (Scène/Glossaire, 309 termes, filtres par lettre).
- **25. Parcours d'apprentissage** ✅ — `/parcours`, 6 profils, étapes cliquables vers les écrans.
- **26. Collections thématiques** ✅ (écran Collections).

**Au-delà de la roadmap** : agrégation RSS en direct (fonction Netlify + onglet Nouveautés) ;
compteurs sur tous les chips ; enrichissements de contenu.

## Détail du gros chantier « répertoire élargi » (fait le 2026-07-11)
Les **319 pièces** de `texteslibres.fr/categorie/theatre` intégrées. 8 pièces du site écartées
(2 liens 404, 3 gaps source : serments-indiscrets, pamela-giraud, eventail ; 3 sketches quasi-vides).
Duplicatas retirés (Dom Juan, Barbier, Tartuffe déjà présents).

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
manuscrits. **Portraits ajoutés (2026-07-11)** : les 20 nouveaux auteurs ont désormais leur portrait Wikimedia
(image d'infobox fr.wikipedia récupérée via API, `scripts` ad hoc dans le scratchpad ; toutes les
URLs Special:FilePath vérifiées 200). Crédits/licences ajoutés dans `src/lib/wikimedia.ts` (CREDITS).
Restent sans portrait : Koltès, Mouawad, Copi (pas d'image libre — initiale dorée).

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
