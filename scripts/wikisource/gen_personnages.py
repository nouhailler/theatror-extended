#!/usr/bin/env python3
"""Extrait la distribution (personnages) de chaque pièce depuis src/data/texts/*.ts
et écrit un index src/data/personnages.ts : Record<id, string[]> (noms d'affichage).
"""
import os, re, glob, json

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
TEXTS = os.path.join(ROOT, "src", "data", "texts")

PARTICLES = {"de", "du", "des", "d", "la", "le", "les", "et", "à", "au", "aux", "en", "un", "une", "l"}

def title_case(name):
    # ex. "DON SALLUSTE DE BAZAN" -> "Don Salluste de Bazan" ; "émilie" -> "Émilie"
    parts = re.split(r"(\s+|-|’|')", name.strip())
    out = []
    for i, w in enumerate(parts):
        if not w or re.match(r"[\s\-’']", w):
            out.append(w); continue
        low = w.lower()
        if low in PARTICLES and out and out[-1].strip():
            out.append(low)
        elif re.fullmatch(r"[IVXLC]+\.?", w):  # chiffres romains
            out.append(w.upper())
        else:
            out.append(low[:1].upper() + low[1:])
    return "".join(out)

def cast(path):
    txt = open(path).read()
    persos = re.findall(r"\{ k: 'perso', t: '((?:[^'\\]|\\.)*)' \}", txt)
    seen, out = set(), []
    for p in persos:
        p = p.replace("\\'", "'").replace("\\\\", "\\").strip()
        low = p.lower()
        # écarter les cues de foule / composés
        if " et " in low or low in ("tous", "toutes", "ensemble", "le choeur", "le chœur") \
           or low.startswith(("voix", "un autre", "une autre", "plusieurs", "tout le monde")):
            continue
        d = title_case(p)
        key = d.lower()
        if key in seen or not d:
            continue
        seen.add(key); out.append(d)
    return out

def main():
    data = {}
    for f in sorted(glob.glob(os.path.join(TEXTS, "*.ts"))):
        pid = os.path.basename(f)[:-3]
        c = cast(f)
        if c:
            data[pid] = c
    lines = ["// Distribution (personnages) de chaque pièce — extrait des textes intégraux.",
             "// Généré par scripts/wikisource/gen_personnages.py.", "",
             "export const PERSONNAGES: Record<string, string[]> = {"]
    for pid in sorted(data):
        names = ", ".join("'" + n.replace("\\", "\\\\").replace("'", "\\'") + "'" for n in data[pid])
        lines.append(f"  '{pid}': [{names}],")
    lines += ["};", ""]
    out = os.path.join(ROOT, "src", "data", "personnages.ts")
    open(out, "w").write("\n".join(lines))
    total = sum(len(v) for v in data.values())
    print(f"{len(data)} pièces, {total} rôles, fichier {os.path.getsize(out)//1024} Ko")

if __name__ == "__main__":
    main()
