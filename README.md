# Theathror — le compagnon du comédien

PWA en français pour comédiens et passionnés de théâtre : encyclopédie, bibliothèque de
**330 pièces** filtrable (dont **320 avec le texte intégral** lisible hors-ligne), fiches de
**57 personnages célèbres**, atelier du comédien (monologues, citations, **glossaire de 309 termes**),
exercices d'acteur et vocaux, **mode répétition** (l'app lit les autres rôles à voix haute +
enregistrement de la sienne), mise en scène 2D, costumes / décors / accessoires, agenda des festivals,
quiz, mode IA, podcasts & vidéos, parcours d'apprentissage, collection de favoris et journal de
répétitions. Mobile Android d'abord, installable, fonctionne hors-ligne.

## Stack

- **React 18 + Vite + TypeScript**
- **Styles** : tokens CSS (`src/styles/tokens.css`) + styles inline fidèles au prototype
- **PWA** : `vite-plugin-pwa` (manifest, service worker, cache offline des polices auto-hébergées,
  des images Wikimédia et des tuiles OpenStreetMap). Les **textes intégraux** des pièces sont
  code-splittés dans `assets/texts/`, **exclus du précache** et mis en cache à la demande
  (install léger malgré 320 textes)
- **Routing** : `react-router-dom` (routes = onglets + sous-écrans)
- **État / persistance** : `zustand` + `idb-keyval` (IndexedDB) — favoris, journal, préférences,
  mise en scène, cache des flux RSS, carnet de contacts et rappels, pièces du mode répétition et
  **journal de répétition**. Flag d'onboarding en `localStorage` (`theathror-onb`)
- **Carte** : `leaflet` + `react-leaflet` sur fond OpenStreetMap
- **Mode IA** : OpenRouter (streaming SSE), clé fournie par l'utilisateur dans Réglages —
  **jamais en dur**, stockée localement
- **Agrégation RSS** : fonction serverless Netlify (`netlify/functions/feed.js`) servant de proxy
  CORS (garde anti-SSRF + cache) pour les flux de podcasts / vidéos

## Démarrer

```bash
npm install
npm run dev        # serveur de dev (Vite)
npm run build      # build de production → dist/
npm run preview    # prévisualiser le build
npm run typecheck  # vérification des types

netlify dev        # dev avec la fonction serverless (onglet Nouveautés des Médias)
```

## Déploiement Netlify

`netlify.toml` : build `npm run build`, publication de `dist`, redirection SPA `/* → /index.html`,
et **`functions = "netlify/functions"`** (proxy RSS). Connectez le dépôt à Netlify, aucune config
supplémentaire. L'onglet « Nouveautés » des Médias ne fonctionne qu'une fois déployé (ou via
`netlify dev`) ; le reste de l'app est autonome et hors-ligne.

## Structure

```
netlify/functions/   feed.js — proxy CORS des flux RSS/Atom (allowlist anti-SSRF + cache)
public/fonts/        Playfair Display + EB Garamond auto-hébergées (offline)
src/
  data/              Données typées : pieces (330), dramaturges (40), characters (57 fiches),
                     encyclopedie, frise, lieux (51), collections, monologues (45), citations (41),
                     glossaire, exercices, voix, costumes, decors, accessoires, festivals, medias,
                     flux (RSS), parcours ; themes (592 pièces / 47 thèmes, généré) ;
                     texts/<id>.ts = texte intégral par pièce
  components/        WikiImage (repli « initiale dorée »), Star, shell, ui
  screens/           Un fichier par écran (+ ia/ pour le Mode IA)
  lib/               openrouter, aiContext, useAI, feeds (RSS), storage (idb), wikimedia, date
  store.ts           Zustand (favoris, journal, réglages, onboarding, visite guidée)
scripts/wikisource/  Outils Python de génération des textes (Wikisource + texteslibres.fr)
scripts/themes/      Génération de src/data/themes.ts (source.md → gen.py). Voir son README.
```

## Fonctionnalités

- **Coquille** : barre haute, nav basse 5 onglets, tiroir ; onboarding + visite guidée qui navigue l'app
- **Pièces** : recherche (titre, auteur, personnage) + filtres combinables **avec compteurs**
  (genre, durée, distribution, décor, âge, difficulté, époque, domaine public)
- **Fiche pièce** : résumé, extrait, distribution, thèmes, chips personnages **cliquables** vers les
  fiches, et **lecteur de texte intégral** (nav par actes, taille de police, hors-ligne)
- **Lecture interactive** : noms de personnages cliquables → fiche, **lecture à voix haute** (Web Speech)
- **Personnages célèbres** : 57 fiches (psychologie, évolution, scènes, adaptations, monologue lié)
- **Encyclopédie** + fiches dramaturges (40 auteurs, portraits) ; **Frise** interactive et **Carte** du monde
- **Thèmes** : le répertoire par sujet — 592 pièces, 47 thèmes. Va **au-delà du catalogue** : couvre le
  répertoire moderne et contemporain (Beckett, Brecht, Koltès, Pommerat…), dont le texte n'est pas
  libre. Les 102 pièces au catalogue sont cliquables vers leur fiche, les autres sont des références
- **Scène** : monologues, citations et **glossaire (309 termes)**, tous filtrables (glossaire par lettre)
- **Mode répétition** : importez une pièce du catalogue ou saisissez votre texte, choisissez votre rôle ;
  l'app lit les autres répliques à voix haute (Web Speech) et vous pouvez **enregistrer votre voix** pour
  vous réécouter. Réglages **Didascalies** (lire / afficher / ignorer) et **Mes répliques** (pause manuelle /
  chronométré / masqué), avec une **documentation intégrée** (« Lire la documentation pour commencer »)
  - **Mémoriser son rôle (cartes)** : entraînement type Anki adapté au théâtre — **Ping-Pong** (réplique du
    partenaire → la vôtre), **Texte à trous** (mots masqués, densité réglable, adaptatif) et **Indice
    contextuel** (acte/scène → amorce). « Révéler » puis auto-évaluation ; révision espacée persistante
  - **Journal de répétition** (par pièce) : consignez chaque séance en la reliant à l'**acte et aux scènes
    travaillées**. Énergie du jour (pour filtrer « en forme » / « fatigué »), présences, notes de mise en
    scène (objectif), travail d'interprétation (subjectif), régie, bilan « le recul » et **note vocale** à
    chaud — chaque champ documenté
- **Exercices d'acteur** et **Entraînement vocal** (déroulés pas à pas)
- **Mise en scène** : plateau 2D — placez vos acteurs, choisissez décor et lumière (sauvegarde locale)
- **Costumes · Décors · Accessoires** : galeries historiques filtrables
- **Festivals** : agenda mondial classé par saison
- **Quiz** à plusieurs niveaux ; **Mode IA** (assistant, générateur de scènes, distribution, analyse)
- **Podcasts & vidéos** : annuaire curé (hors-ligne) + onglet **Nouveautés** agrégeant des flux RSS
  (France Culture, France Inter, Comédie-Française, ARTE, TNP…) — sources personnalisables
- **Parcours d'apprentissage** par profil (débutant, comédien, metteur en scène…)
- **Ma collection** (favoris) et **Journal** du comédien (CRUD local + stats)
- **Carnet & contacts** : répertoire des professionnels du spectacle (metteurs en scène, directeurs de
  casting, régisseurs, compagnies…). Collez l'URL d'un site ou d'un profil → l'**IA prépare une fiche**
  (dernières mises en scène, esthétique, contacts publics, angle de candidature). **Suivi des
  interactions** : rappels contextuels en un tap (relancer après audition, anniversaire, félicitations)
  regroupés dans un encart « À relancer » sur l'Accueil et le Carnet
- **Castings** : veille des appels à candidatures. Ajoutez des **flux RSS** ou des **pages d'auditions** ;
  l'app les lit à la demande (via le proxy) et l'**IA détecte, résume, structure et note** chaque casting
  selon votre profil (score de compatibilité). Tableau de bord, filtres, fiche détail — tout reste local

Chaque chip de filtre affiche le **nombre d'enregistrements** correspondants, pour voir d'un coup
d'œil la profondeur de chaque catégorie.

## Images & licences

Portraits et lieux proviennent de Wikimedia Commons via `Special:FilePath`, avec crédit/licence
(`src/lib/wikimedia.ts`) et repli « initiale dorée ». Les textes intégraux sont du **domaine public**
(fr.wikisource, texteslibres.fr), avec l'attribution de l'édition/traduction dans le lecteur.

## État du projet

**Roadmap complète (26/26) livrée.** Historique des évolutions dans `CHANGELOG.md`, détail
technique et notes de chantier dans `CONTEXT.md`.
