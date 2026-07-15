#!/usr/bin/env python3
"""Génère src/data/themes.ts à partir de source.md (base de références thématiques)."""
import re, sys, os, unicodedata
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from vocab import THEMES, EXCLURE, REATTRIBUER, RETITRER  # noqa: E402

SRC = os.path.join(HERE, "source.md")
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
PIECES = os.path.join(ROOT, "src", "data", "pieces.ts")
OUT = os.path.join(ROOT, "src", "data", "themes.ts")


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm_titre(s):
    s = strip_accents(s).lower().replace("’", "'").replace("œ", "oe").replace("æ", "ae")
    s = re.sub(r"\(.*?\)", " ", s)  # « (adaptation théâtrale) »
    s = re.sub(r"[^a-z0-9']", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(le|la|les|l|un|une|des|the|a)\s+", "", s)
    return re.sub(r"^l'", "", s).strip()


def norm_auteur(s):
    """Nom de famille seul : la base écrit tantôt « Marivaux », tantôt « Pierre de Marivaux »."""
    s = re.sub(r"[^a-z\s]", " ", strip_accents(s).lower())
    toks = [t for t in s.split() if t not in ("de", "von", "del", "la", "van", "du")]
    return toks[-1] if toks else s.strip()


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", strip_accents(s).lower().replace("œ", "oe")).strip("-")


BRUT2CANON = {b: c for c, bruts in THEMES.items() for b in bruts}
CANON = sorted(THEMES)

# ─── Lecture du tableau source ───
rows = []
for line in open(SRC, encoding="utf-8"):
    if not line.strip().startswith("|"):
        continue
    c = [x.strip() for x in line.strip().strip("|").split("|")]
    if len(c) != 5 or c[0] == "ID" or set(c[0]) <= set("-"):
        continue
    rows.append(dict(auteur=c[1], piece=c[2], resume=c[3], theme=c[4]))

inconnus = sorted({r["theme"] for r in rows} - set(BRUT2CANON))
if inconnus:
    sys.exit(f"Thèmes absents de vocab.py : {inconnus}")

# ─── Corrections d'attribution, puis dé-duplication sur (auteur, titre) ───
works, exclues, perdus = {}, 0, []
for r in rows:
    ka, kt = norm_auteur(r["auteur"]), norm_titre(r["piece"])
    if (ka, kt) in EXCLURE:
        exclues += 1
        continue
    auteur = REATTRIBUER.get((ka, kt), r["auteur"])
    piece = RETITRER.get((ka, kt), r["piece"])
    k = (norm_auteur(auteur), norm_titre(piece))
    w = works.setdefault(k, dict(auteur=auteur, piece=piece, notes=[], vus=set()))
    if len(piece) > len(w["piece"]):  # « Le Tartuffe » l'emporte sur « Tartuffe »
        w["piece"] = piece
    canon = BRUT2CANON[r["theme"]]
    # Plusieurs thèmes bruts d'une même pièce retombent souvent sur le même thème
    # canonique (Tyrannie et Pouvoir → Pouvoir). On ne garde alors que la première
    # note : les suivantes sont perdues, alors qu'elles disent souvent autre chose.
    # Voir README.md § « Perte connue ».
    if canon in w["vus"]:
        perdus.append((r["auteur"], r["piece"], r["theme"], canon, r["resume"]))
        continue
    w["vus"].add(canon)
    w["notes"].append((canon, r["resume"]))

# ─── Liens vers le catalogue ───
src = open(PIECES, encoding="utf-8").read()
cat = {}
for m in re.finditer(
    r"id:\s*'([^']+)',\s*titre:\s*(?:'([^']*)'|\"([^\"]*)\"),\s*auteur:\s*(?:'([^']*)'|\"([^\"]*)\")", src
):
    cat[(norm_auteur(m.group(4) or m.group(5)), norm_titre(m.group(2) or m.group(3)))] = m.group(1)


def q(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


ids, out, nlie = set(), [], 0
for k, w in sorted(works.items(), key=lambda x: (x[1]["auteur"], x[1]["piece"])):
    base = f'{slug(w["piece"])}-{slug(norm_auteur(w["auteur"]))}'
    i, wid = 2, base
    while wid in ids:
        wid, i = f"{base}-{i}", i + 1
    ids.add(wid)
    pid = cat.get(k)
    if pid:
        nlie += 1
    notes = ", ".join(f"{{ theme: {q(t)}, txt: {q(x)} }}" for t, x in w["notes"])
    out.append(
        f'  {{ id: {q(wid)}, auteur: {q(w["auteur"])}, piece: {q(w["piece"])}, '
        + (f"pieceId: {q(pid)}, " if pid else "")
        + f"notes: [{notes}] }},"
    )

gardees = sum(len(w["notes"]) for w in works.values())

hdr = f'''import type {{ RefOeuvre, RefTheme }} from './types';

// Base de références théâtrales : {len(works)} pièces, {len(CANON)} thèmes.
// Fichier GÉNÉRÉ par scripts/themes/gen.py — ne pas éditer à la main.
//
// Ce que la génération a fait des 1000 lignes de scripts/themes/source.md :
//   - {exclues} écartées : des œuvres qui ne sont pas du théâtre (romans de Beckett,
//     la Poétique d'Aristote…), plus quelques attributions d'auteur corrigées ;
//   - dé-duplication sur (auteur, titre) : une même pièce revenait jusqu'à 10 fois ;
//   - les 207 thèmes du tableau ont été ramenés à {len(CANON)} thèmes canoniques (vocab.py).
//
// ⚠️ INCOMPLET : {len(perdus)} résumés ont été PERDUS à l'étape de consolidation des thèmes.
// Quand deux thèmes bruts d'une même pièce retombent sur le même thème canonique
// (Tyrannie et Pouvoir → Pouvoir), seule la première note est conservée — et les
// suivantes ne sont pas des doublons, elles disent souvent autre chose. Sur Caligula,
// « La cruauté devient un instrument philosophique » a ainsi disparu.
// Notes conservées : {gardees} sur les {gardees + len(perdus)} du tableau ({len(perdus) * 100 // (gardees + len(perdus))} % de perte).
// Voir scripts/themes/README.md § « Perte connue » pour la piste de correction.
//
// `pieceId` relie au catalogue quand la pièce y figure ({nlie} sur {len(works)}).

export const REF_THEMES: RefTheme[] = [
{chr(10).join(f"  {q(t)}," for t in CANON)}
];

export const REFERENCES: RefOeuvre[] = [
'''
open(OUT, "w", encoding="utf-8").write(hdr + "\n".join(out) + "\n];\n")

print(f"Lignes lues          : {len(rows)}")
print(f"Écartées (non-thé.)  : {exclues}")
print(f"Œuvres après dédup   : {len(works)}")
print(f"Reliées au catalogue : {nlie}")
print(f"Notes conservées     : {gardees}   ⚠️ perdues : {len(perdus)}")
n = defaultdict(int)
for w in works.values():
    for t, _ in w["notes"]:
        n[t] += 1
print("Répartition          : " + ", ".join(f"{t} {n[t]}" for t in sorted(n, key=lambda x: -n[x])))
print(f"\n→ {os.path.relpath(OUT, ROOT)}")

if "--perdus" in sys.argv:
    print(f"\n─── Les {len(perdus)} résumés perdus ───")
    for aut, pie, th, canon, res in perdus:
        print(f"  {aut} — {pie}\n    « {th} » → « {canon} » déjà pris\n    {res}")
