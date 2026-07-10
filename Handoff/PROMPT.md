# Prompt pour Claude Code

Colle ce qui suit dans Claude Code, depuis un dossier vide contenant ce package de handoff :

---

Je veux construire **Theathror**, une PWA en français pour comédiens professionnels, à partir du package de design dans ce dossier (`README.md` = spec détaillée, `design/Theathror.dc.html` = prototype HTML haute-fidélité de référence, `screenshots/` = captures).

## Stack
- **React + Vite + TypeScript**, sans framework CSS lourd (styles CSS modules ou vanilla-extract, tokens du README).
- **PWA installable** : `vite-plugin-pwa` (manifest, service worker, cache offline des polices auto-hébergées, des données et des images Wikimédia déjà consultées).
- **Déploiement Netlify** : fournir `netlify.toml` (build `npm run build`, publish `dist`, redirection SPA `/* → /index.html`).
- Routing : react-router (routes = onglets + sous-écrans du README).
- État/persistance : Zustand (ou contexte) + IndexedDB (idb-keyval) pour favoris, journal, préférences ; clé `theathror-onb` pour l'onboarding vu.

## À implémenter (fidèle au prototype, pixel-perfect selon README)
1. Coquille : barre haute (hamburger + wordmark), nav basse 5 onglets, tiroir de navigation groupé.
2. Onboarding 3 écrans (premier lancement) + **visite guidée** 10 étapes qui navigue réellement l'app.
3. Accueil (théâtre/citation/pièce du jour, accès rapides, Ma collection, collection en vedette).
4. Pièces : liste + recherche + filtres combinables (durée, distribution H/F, genre, décor, domaine public, âge, difficulté). Données dans des fichiers JSON typés (`src/data/`), démarrer avec ~30 pièces du domaine public.
5. Encyclopédie (catégories + grille de fiches) et fiche dramaturge (bio, chronologie, citation, œuvres, influence).
6. Frise chronologique (ères colorées) et carte du monde (Leaflet + OpenStreetMap, épingles théâtres/festivals, liste).
7. Collections thématiques.
8. Scène : monologues filtrables, citations par thème, glossaire A–Z.
9. Ma collection (favoris 4 catégories, états vides) et Journal du comédien (CRUD local, stats).
10. Images Wikimédia via `Special:FilePath` avec repli « initiale dorée » systématique + crédit/licence en pied de fiche.

## Étapes suivantes (préparer l'architecture, ne pas implémenter tout de suite)
- Mode IA via **OpenRouter** (clé fournie par l'utilisateur dans Réglages, jamais en dur) : recherche en langage naturel, explication de pièces, générateur de scènes.
- Lecture interactive avec **Web Speech API** (voix Google sur Android ; prévoir dégradation gracieuse iOS).
- Quiz, exercices d'acteur/voix, costumes/décors/accessoires, agenda des festivals.

Commence par : initialiser le projet, poser les tokens et la coquille de navigation, puis implémenter les écrans dans l'ordre ci-dessus. Vérifie chaque écran contre sa capture dans `screenshots/`.
