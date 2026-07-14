# Changelog

Toutes les évolutions notables du projet. Le détail technique et l'historique complet du
chantier « répertoire élargi » restent dans `CONTEXT.md`.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/). Dates au format `AAAA-MM-JJ`.

## [Non publié]

### 2026-07-14
- **Glossaire enrichi** : passage de 10 à **309 termes** de théâtre (triés alphabétiquement,
  doublons fusionnés). Accessible depuis l'écran Scène (navigation par lettre) et la recherche globale.
- **Mode répétition** (`/repetition`) : import d'une pièce du catalogue ou saisie libre, choix de son
  rôle, lecture des autres répliques à voix haute (Web Speech), masquage/révélation de ses répliques et
  **enregistrement vocal** de sa propre voix pour se réécouter.
- **Correctif** : l'enregistrement vocal en répétition s'arrêtait dès son démarrage (effet React qui se
  redéclenchait à chaque rendu) — corrigé pour ne se couper qu'au changement réel de réplique.
- **Aide** : mode démo, aide contextuelle par écran et astuces.
- **Réglages** : sélection d'un modèle gratuit d'OpenRouter.
- **Costumes / Décors / Accessoires / Festivals** : vignettes illustrées + fiche détail cliquable.
- **Collections** curées, favoris étendus, images hors-ligne et améliorations d'accessibilité.

### 2026-07-13
- **Accueil** : recherche globale sur toute l'application (pièces, auteurs, personnages, contenus…).
- **Recherche** : liens de section pré-remplis, plus directs.
- **Encyclopédie** : +22 auteurs contemporains.
- **Fiches auteurs** : sections Récompenses + Thèmes (dont tous les contemporains).
- **Exercices d'acteur** et **Entraînement vocal** : illustrations par catégorie.
- **Mise en scène** : aperçus visuels sur les options.

## Base — Roadmap complète (26/26)

Les 26 priorités de la roadmap initiale sont livrées : coquille/onboarding, base de **330 pièces**
(dont **320 avec texte intégral** hors-ligne), **40 dramaturges**, **57 personnages célèbres**, frise,
carte, citations, monologues, exercices, voix, quiz, mode IA (assistant, génération, analyse,
distribution), lecture interactive, mise en scène 2D, costumes, décors, accessoires, festivals,
journal, collection, podcasts & vidéos (+ agrégation RSS en direct), glossaire, parcours et
collections thématiques. Détail dans `CONTEXT.md`.
