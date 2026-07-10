# Theathror — le compagnon du comédien

PWA en français pour comédiens professionnels : encyclopédie du théâtre, bibliothèque
de pièces filtrable, atelier du comédien (monologues, citations, glossaire), collection
de favoris et journal de répétitions. Mobile Android d'abord, installable, fonctionne
hors-ligne.

## Stack

- **React 18 + Vite + TypeScript**
- **Styles** : tokens CSS (`src/styles/tokens.css`) + styles inline fidèles au prototype
- **PWA** : `vite-plugin-pwa` (manifest, service worker, cache offline des polices
  auto-hébergées, des images Wikimédia et des tuiles OpenStreetMap déjà consultées)
- **Routing** : `react-router-dom` (routes = onglets + sous-écrans)
- **État / persistance** : `zustand` + `idb-keyval` (IndexedDB) — favoris, journal,
  préférences. Flag d'onboarding en `localStorage` (`theathror-onb`).
- **Carte** : `leaflet` + `react-leaflet` sur fond OpenStreetMap

## Démarrer

```bash
npm install
npm run dev        # serveur de dev
npm run build      # build de production → dist/
npm run preview    # prévisualiser le build
npm run typecheck  # vérification des types
```

## Déploiement Netlify

`netlify.toml` est fourni : build `npm run build`, publication de `dist`, redirection
SPA `/* → /index.html`. Connectez le dépôt à Netlify, aucune config supplémentaire.

## Structure

```
public/fonts/        Playfair Display + EB Garamond auto-hébergées (offline)
src/
  data/              Données typées (pièces, dramaturges, frise, lieux, collections,
                     monologues, citations, glossaire) — ~30 pièces du domaine public
  components/        WikiImage (repli « initiale dorée »), Star, Credit, shell, ui
  screens/           Un fichier par écran
  store.ts           Zustand (favoris, journal, réglages, onboarding, visite guidée)
  lib/               wikimedia, storage (idb), date
```

## Fonctionnalités

- Coquille : barre haute (☰ + wordmark + date), nav basse 5 onglets, tiroir groupé
- Onboarding 3 écrans (premier lancement) + visite guidée 10 étapes qui navigue l'app
- Accueil (théâtre / citation / pièce du jour, accès rapides, collections)
- Pièces : recherche + filtres combinables (durée, distribution, genre, décor,
  domaine public, âge, difficulté)
- Encyclopédie + fiche dramaturge (bio, chronologie, citation, œuvres, influence)
- Frise chronologique (ères colorées) et carte du monde (Leaflet + OSM)
- Collections thématiques
- Scène : monologues filtrables, citations par thème, glossaire A–Z
- Ma collection (favoris 4 catégories, états vides) et Journal (CRUD local + stats)
- Images Wikimédia via `Special:FilePath` avec repli systématique + crédit/licence

## Images & licences

Portraits et lieux proviennent de Wikimedia Commons via `Special:FilePath`. Chaque fiche
affiche le crédit et la licence (`src/lib/wikimedia.ts`). En cas d'échec de chargement,
un repli « initiale dorée » s'affiche — jamais de trou visuel.

## Étapes suivantes (architecture préparée)

- **Mode IA via OpenRouter** : clé fournie dans Réglages (jamais en dur, stockée
  localement). Recherche en langage naturel, explication de pièces, générateur de scènes.
- **Lecture interactive** (Web Speech API, voix Google sur Android, dégradation iOS)
- Quiz, exercices d'acteur/voix, costumes/décors/accessoires, agenda des festivals
