# CONTEXT — travail en cours

_Dernière mise à jour : 2026-07-11._

## 🔔 À rappeler au démarrage de la prochaine session
On reprend le **texte intégral des pièces** : le lecteur est en place, il reste à
**ajouter les textes des pièces manquantes** (lots suivants). Voir ci-dessous.

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

## À faire — textes des pièces restantes (~19)

### Lot 2 (suite) — classiques français faciles (sous-pages /Acte sur Wikisource)
- **Hugo** : hernani, ruy-blas
- **Musset** : on-ne-badine-pas
- **Marivaux** : le-jeu-amour-hasard
- **Jarry** : ubu-roi
- **Sand** : marquis-villemer, francois-champi

→ Procédure : `scripts/wikisource/README.md` (déclarer dans `PLAYS`, générer, enregistrer
le loader dans `pieceTextes.ts`, build, vérifier le rendu).

### Lot 3 — étranger, via traduction française du domaine public (plus délicat)
- **Shakespeare** : hamlet, romeo-juliette, macbeth, songe-nuit-ete
- **Tragiques grecs** : antigone-sophocle, oedipe-roi, medee, les-grenouilles
- **Tchekhov** : la-mouette, oncle-vania
- **Ibsen** : maison-poupee
- **Wilde** : importance-etre-constant

⚠️ Souvent une page « Texte entier » unique (pas de /Acte) → le parseur devra peut-être
être adapté (repérage des actes/scènes différent). À valider au cas par cas.

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
