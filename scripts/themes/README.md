# Base de références thématiques (`source.md` → `src/data/themes.ts`)

Indexe le répertoire par thème pour l'écran **Thèmes** (`/explorer/themes`).

Contrairement au catalogue (`src/data/pieces.ts`), qui se limite aux pièces dont le texte
est libre, cette base couvre aussi le répertoire moderne et contemporain — Beckett, Brecht,
Koltès, Pommerat, Sarah Kane… Sur 592 pièces, **102 seulement sont au catalogue** ; ce sont
les seules cliquables vers une fiche. Les autres existent comme entrées de référence.

## Fichiers

| Fichier | Rôle |
|---|---|
| `source.md` | Tableau source, 1000 lignes : ID, auteur, pièce, résumé, thème. Vérité de départ. |
| `vocab.py` | Vocabulaire contrôlé : 207 thèmes bruts → 47 canoniques, + corrections d'attribution. |
| `gen.py` | Génère `src/data/themes.ts`. |

## Usage

```bash
python3 scripts/themes/gen.py            # régénère src/data/themes.ts
python3 scripts/themes/gen.py --perdus   # + liste les résumés perdus (voir ci-dessous)
```

Aucune dépendance : Python 3 standard. Le script est idempotent — à source et vocabulaire
constants, il réécrit le même fichier.

## Ce que fait la génération

1. **Écarte 9 lignes** qui ne sont pas du théâtre (`EXCLURE` dans `vocab.py`) : les romans de
   Beckett (*Murphy*, *Malone meurt*…), la *Poétique* d'Aristote, un film d'Almodóvar.
2. **Corrige les attributions** (`REATTRIBUER`) : *Meurtre dans la cathédrale* était donné à
   Jean Vilar, qui l'a montée — c'est T.S. Eliot qui l'a écrite. *Le Mahabharata* était donné
   à Peter Brook, metteur en scène — le texte est de Jean-Claude Carrière.
3. **Dé-duplique sur (auteur, titre)** : 1000 lignes → 592 pièces. *Dialogues des Carmélites*
   revenait 10 fois, l'*Antigone* d'Anouilh 9 fois. La normalisation fusionne les variantes
   (`Tartuffe`/`Le Tartuffe`, `Marivaux`/`Pierre de Marivaux`, et les trois occurrences de
   « Jean-Marie Koltès », qui n'existe pas — c'est Bernard-Marie).
4. **Consolide les thèmes** : 207 → 47, via `THEMES` dans `vocab.py`.

Deux pièces homonymes d'auteurs différents restent distinctes : l'*Antigone* d'Anouilh n'est
pas celle de Sophocle, la *Médée* de Sénèque n'est pas celle d'Euripide.

## ⚠️ Perte connue : 139 résumés

L'étape 4 **jette du contenu**. Quand deux thèmes bruts d'une même pièce retombent sur le
même thème canonique, seule la première note est conservée :

```
Caligula — brut « Tyrannie » → canon « Pouvoir », déjà pris
  gardé : Un empereur pousse la logique du pouvoir jusqu'à l'absurde.   (brut « Pouvoir »)
  JETÉ  : La cruauté devient un instrument philosophique.               (brut « Tyrannie »)
```

Ces notes ne sont **pas des doublons** — elles disent autre chose. Bilan : 852 notes
conservées sur 991 exploitables, soit **14 % de perte**. `--perdus` les liste toutes.

### Piste de correction

Autoriser plusieurs notes par thème canonique et garder le thème brut comme nuance :

```ts
notes: [
  { theme: "Pouvoir", sujet: "Pouvoir",  txt: "Un empereur pousse la logique…" },
  { theme: "Pouvoir", sujet: "Tyrannie", txt: "La cruauté devient un instrument…" },
]
```

`theme` sert à naviguer (47 entrées, chips lisibles), `sujet` restitue la finesse des 207
thèmes d'origine. Demande un champ `sujet` sur `RefOeuvre` (`src/data/types.ts`) et
l'affichage des notes multiples dans `src/screens/ThemeDetail.tsx`.

## Autre chantier ouvert

L'app a **deux vocabulaires de thèmes** qui s'ignorent. La fiche pièce affiche une section
« Thèmes » alimentée par `src/data/pieceDetails.ts` : 62 pièces, 151 termes en texte libre
(« Barbon ridicule », « Fausse dévotion »). Cette base-ci en utilise 47, contrôlés. Une même
pièce peut donc être étiquetée différemment selon l'écran. `help.ts` promet déjà des
« thèmes » sur la fiche pièce : c'est le point de jonction naturel si tu veux réconcilier.
