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

## À faire — textes des pièces restantes (8, toutes DÉLICATES)

→ Procédure : `scripts/wikisource/README.md` (déclarer dans `PLAYS`, générer, enregistrer
le loader dans `pieceTextes.ts`, build, vérifier le rendu).

### Lot 3 (reste) — étranger, chaque cas est bespoke
- **INDISPONIBLES** (pas de traduction FR du domaine public trouvée sur fr.wikisource) :
  `oncle-vania` (Tchekhov), `importance-etre-constant` (Wilde). → À laisser sans texte
  (ou chercher une autre source libre).
- **Tragiques grecs** (`antigone-sophocle`, `oedipe-roi`, `medee`, `les-grenouilles`) :
  pas de structure « ACTE », locuteurs souvent hors classe détectable. `les-grenouilles`
  (trad. Talbot) A des `span.personnage` (717) mais AUCUN acte + front-matter avant un 2e
  h2 titre → il faudrait un mode « sans actes » + saut du front-matter (bespoke).
  `antigone`/`medee`/`oedipe(Sophocle)` : pages sans h2/h3 ni classe locuteur (oedipe
  Sophocle quasi vide, 1 Ko) → parseur dédié requis.
- **`la-mouette`** (Tchekhov) : page ~35 Ko sans h2/h3 ni classe locuteur → bespoke.
- **`romeo-juliette`** : trad. Montégut = locuteurs NON balisés (ni `sc` ni `personnage`),
  en-têtes de scènes incohérents (mélange h2/h3) → bespoke. (Voir aussi trad. Hugo 1868.)

⚠️ Ces 8 pièces ne se génèrent PAS avec le pipeline actuel. Chacune demande une adaptation
spécifique (repérage locuteur/acte différent) ou n'a pas de source libre — décision au cas
par cas avant d'y investir.

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
