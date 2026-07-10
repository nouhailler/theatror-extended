# Handoff : Theathror — application PWA pour passionnés de théâtre

## Overview
Theathror est le « compagnon du comédien » : encyclopédie du théâtre, bibliothèque de pièces filtrable, atelier du comédien (monologues, citations, glossaire), collection personnelle de favoris et journal de répétitions. Cible : comédiens professionnels, mobile Android d'abord, en français.

**Objectif de livraison : une PWA installable, déployée sur Netlify.**

## About the Design Files
Les fichiers de `design/` sont des **références de design créées en HTML** — un prototype montrant l'apparence et le comportement voulus, PAS du code de production à copier. La mission est de **recréer ces écrans dans une vraie base de code** (recommandation : React + Vite, voir PROMPT.md), avec ses propres patterns. Le fichier `Theathror.dc.html` utilise un runtime de prototypage propriétaire (`support.js`, balises `<sc-if>`, `<sc-for>`, trous `{{ }}`) : lisez-le comme une spec (styles inline exacts, textes, structure), ne le réutilisez pas tel quel. `android-frame.jsx` n'est que le cadre de téléphone du prototype — à ignorer en production.

## Fidelity
**High-fidelity.** Couleurs, typographie, espacements, rayons et textes sont définitifs. Recréer au pixel près. Les données (pièces, dramaturges, citations…) sont un échantillon : la structure des fiches est contractuelle, le volume de contenu doit croître.

## Architecture de navigation
- **Barre haute** (tous les écrans) : hamburger ☰ (ouvre le tiroir de sections) + wordmark THEATHROR + date.
- **Nav basse, 5 onglets** : Accueil · Pièces · Explorer · Scène · Journal. Onglet actif : libellé or `#d4a94e` + point 5px au-dessus ; inactif `#8a7a6e`.
- **Tiroir ☰** (288px, fond `#1a1118`, scrim `rgba(0,0,0,.55)`) groupé : Découvrir / L'atelier / Aide / Personnel / À venir (entrées grisées `#6a5c52`, note italique « bientôt »).

## Screens / Views
Captures dans `screenshots/` (⚠ les photos Wikimédia apparaissent en vide dans les captures — remplacées par le repli « initiale dorée » ; dans le prototype réel elles se chargent) :

1. `01` Onboarding 1/3 — Bienvenue (anneau or avec « T », wordmark, pitch)
2. `02` Onboarding 2/3 — Découvrir (4 lignes à barre verticale or)
3. `03` Onboarding 3/3 — Votre atelier (barres rouge `#9e2b3a`) + 2 boutons : « Lancer la visite guidée » (plein or) / « Explorer par moi-même » (contour)
4. `04` Accueil — théâtre du jour (héro image + dégradé), citation du jour (filet or gauche), pièce du jour (chips métadonnées), grille 2×2 d'accès rapides, carte « Ma collection », carte collection en vedette (dégradé rouge)
5. `05` Pièces — recherche (pilule), chips de filtres (actif : fond or, texte `#231a10` ; inactif : contour or, texte `#d9b45b`), compteur de résultats, cartes de pièces (titre Playfair 18.5px, durée or, chips genre/actes/distribution, difficulté ●●●○)
6. `06` Explorer — hub de 4 cartes + bandeau « Bientôt »
7. `07` Encyclopédie — chips de catégories + grille 2 colonnes de portraits (image 150px, repli initiale)
8. `08` Fiche dramaturge (Molière) — héro portrait 230px avec dégradés, bio, chronologie (année or 44px + texte), citation, œuvres majeures (chips italiques), carte Influence
9. `09` Frise chronologique — timeline verticale, pastille colorée par ère (Antiquité `#c98b4e`, Moyen Âge `#8e9e5a`, Élisabéthain `#5f8ea8`, Classicisme `#d4a94e`, Romantisme `#a85a72`, Moderne `#9e2b3a`, Absurde `#b0563a`)
10. `10` Carte du monde — carte (fond image monde inversée/sépia, opacité .35) + épingles (or = théâtres, rouge = festivals), chips de filtres, liste de lieux (vignette 64px)
11. `11` Collections thématiques — grille 2 colonnes, en-tête image/dégradé 110px + initiale
12. `12` Scène — contrôle segmenté Monologues / Citations / Glossaire ; cartes monologue (titre, source italique, extrait Playfair italique, chips pour/émotion/niveau)
13. `13` Journal — 3 tuiles de stats (chiffre Playfair 24px or), entrées datées avec type en surtitre or, bouton flottant « + Nouvelle entrée »
14. `14` Ma collection — 4 segments Pièces/Auteurs/Citations/Monologues, listes de favoris, état vide (cadre pointillé, texte italique)
15. `15` Tiroir de navigation ☰ ouvert
16. `16` Visite guidée — carte ancrée en bas (fond `#241626`, bord or .55), « VISITE GUIDÉE · n / 10 », titre, texte, ← Précédent / Suivant →

## Interactions & Behavior
- **Onboarding** : affiché au premier lancement uniquement (flag localStorage `theathror-onb`). « Passer » en haut à droite. Points de progression. Relançable via ☰ → Aide → « Revoir l'introduction ».
- **Visite guidée (démo)** : 10 étapes qui naviguent réellement l'app (Accueil → Pièces → Explorer → Encyclopédie → Fiche → Frise → Carte → Scène → Journal → Ma collection), carte explicative non bloquante, ✕ pour quitter, dernier bouton « Terminer » ramène à l'Accueil. Lancée depuis la fin de l'onboarding ou ☰ → Aide.
- **Favoris** : étoile ☆/★ sur pièces, dramaturges (coin de vignette, avec text-shadow), citations, monologues. Tap = toggle, ★ = or `#d4a94e`, ☆ = `rgba(242,233,220,.35)`. Persistés en localStorage (`theathror-favs`, clés `categorie::id`). Le clic étoile ne doit PAS déclencher la navigation de la carte (stopPropagation).
- **Hover/press cartes** : bordure passe de `rgba(212,169,78,.14)` à `rgba(212,169,78,.45–.5)`.
- Fiches accessibles par tap sur les cartes (encyclopédie → fiche dramaturge ; retour ←).

## State Management
- Navigation : onglet actif + sous-écran (`explorer/encyclo|dramaturge|frise|carte|collections`, `accueil/collectionPerso`), segment actif dans Scène (`mono|cit|glos`) et Ma collection (`p|a|c|m`).
- `menuOpen`, `onboardingStep (0–2|null)`, `demoStep (0–9|null)`.
- Persistance locale : `theathror-favs` (objet map), `theathror-onb` (flag). En production : IndexedDB ou équivalent + option de synchronisation ultérieure.

## Design Tokens
Couleurs :
- Fond app `#171015`, fond barre haute/basse `#130d12`, cartes `#1f1620` (variante `#221925` pour champs/segments), tiroir `#1a1118`, carte démo `#241626`
- Fond page (hors téléphone) : radial `#241419 → #120b0e → #0b0708`
- Texte principal `#f2e9dc`, secondaire `#c4b4a4` / `#d8cabb`, atténué `#a8988a`, désactivé `#6a5c52`
- **Or (accent)** `#d4a94e` (hover `#e0ba62`, chips texte `#d9b45b`) ; texte sur or `#231a10`
- **Rouge rideau** `#9e2b3a` (chips genre : fond `rgba(158,43,58,.25)`, bord `.5`, texte `#e0a3ab`) ; dégradé héro `#7a1f2b → #43101a`
- Bordures or translucides : `.14–.16` (repos), `.2` (inputs), `.3–.35` (chips), `.45–.6` (hover/actif)
Typographie :
- Titres : **Playfair Display** (Google Fonts) 400/600/700 — wordmark 16–30px letterspacing 2.5–3px ; titres d'écran 24–26px/700 ; titres de carte 16–18.5px/600
- Texte : **EB Garamond** 400/500/600 — corps 14–16px, sources/notes italiques 13–14px
- Surtitres : 11–12px, uppercase, letter-spacing 2–2.5px, or
Rayons : cartes 12px, héros 14px, pilules/chips/boutons 999px. Vignettes 10px.
Ombres : bouton or `0 6px 18px rgba(212,169,78,.25)` ; tiroir `8px 0 30px rgba(0,0,0,.5)` ; carte démo `0 14px 38px rgba(0,0,0,.65)`.

## Assets
- Images : Wikimedia Commons via `https://commons.wikimedia.org/wiki/Special:FilePath/<Nom>?width=500` (portraits Molière, Shakespeare, Racine, Tchekhov, Hugo, Sophocle, George Sand ; Palais Garnier, Épidaure, Comédie-Française, Globe, Avignon ; fond de carte BlankMap-World.svg). **Toujours prévoir le repli** : initiale en Playfair or translucide sur dégradé `#3a2028 → #221219`. En production, télécharger/mettre en cache les images (service worker) et créditer les auteurs (licences Commons).
- Polices : Google Fonts (Playfair Display, EB Garamond) — à auto-héberger pour la PWA offline.
- Aucune icône bitmap : hamburger, étoiles (U+2605/U+2606), flèches (U+2190/U+2192) en texte/CSS.

## Files
- `design/Theathror.dc.html` — prototype complet (spec de référence : tous les styles inline, textes et écrans)
- `design/support.js`, `design/android-frame.jsx` — runtime du prototype + cadre téléphone (référence seulement)
- `screenshots/01…16-ecran.png` — captures de chaque écran
- `PROMPT.md` — prompt prêt à coller dans Claude Code
