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

## À faire — 4 pièces restantes (sources indisponibles)

- **INDISPONIBLES** — pas de traduction FR du domaine public exploitable sur fr.wikisource :
  `oncle-vania` (Tchekhov), `importance-etre-constant` (Wilde), `medee` (Euripide : Artaud n'a
  pas traduit Médée ; l'édition Leconte de Lisle « Mèdéia » a son djvu source manquant), et
  `la-mouette` (Tchekhov : page ~35 Ko sans h2/h3 ni classe locuteur — aucune autre édition FR
  libre trouvée). → laissées sans texte tant qu'aucune source libre exploitable n'apparaît.

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
