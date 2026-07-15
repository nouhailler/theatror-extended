# Changelog

Toutes les évolutions notables du projet. Le détail technique et l'historique complet du
chantier « répertoire élargi » restent dans `CONTEXT.md`.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/). Dates au format `AAAA-MM-JJ`.

## [Non publié]

### 2026-07-15
- **Écran Thèmes** (`/explorer/themes`) : le répertoire indexé par sujet — **592 pièces, 47 thèmes**.
  On entre par un thème, on obtient les pièces qui l'abordent avec un résumé ; les **102 pièces
  présentes au catalogue** sont cliquables vers leur fiche. Accessible depuis Explorer et le menu.
- **Répertoire élargi au XXe–XXIe** : cette base couvre **154 auteurs absents du catalogue** (Anouilh,
  Pinter, Beckett, Brecht, Ionesco, Pirandello, Koltès, Pommerat, Sarah Kane, August Wilson…), que le
  catalogue ne peut pas accueillir faute de texte libre. Ces **490 pièces** existent comme entrées de
  référence, sans texte ni distribution.
- **Génération** (`scripts/themes/`) : le tableau source de 1000 lignes est versionné et régénérable
  (`python3 scripts/themes/gen.py`). 9 lignes écartées (romans de Beckett, *Poétique* d'Aristote…),
  attributions corrigées (*Meurtre dans la cathédrale* est de T.S. Eliot, pas de Jean Vilar),
  dé-duplication sur (auteur, titre), 207 thèmes ramenés à 47.
- **Limite connue** : la consolidation des thèmes **perd 139 résumés** (852 conservés sur 991, 14 %).
  Documentée dans `scripts/themes/README.md`, listable via `gen.py --perdus`, avec la piste de
  correction. À reprendre.
- **Correctif** : la recherche de thèmes ignorait les accents (« mem » ne trouvait pas « Mémoire ») —
  le helper `norm` de `lib/search.ts` est désormais exporté et réutilisé.

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
