#!/usr/bin/env python3
"""Génère src/data/texts/<id>.ts à partir de Wikisource, via ws_fetch.parse_act."""
import sys, json, importlib.util, os

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("ws", os.path.join(HERE, "ws_fetch.py"))
ws = importlib.util.module_from_spec(spec); spec.loader.exec_module(ws)

OUT = os.path.normpath(os.path.join(HERE, "..", "..", "src", "data", "texts"))

# id : (base Wikisource, nb actes, source affichée)
PLAYS = {
  "le-misanthrope": ("Le Misanthrope/Édition Louandre, 1910", 5,
      "Molière, Le Misanthrope (1666) — texte établi par Charles Louandre, Charpentier, 1910. Source : Wikisource, domaine public."),
  "tartuffe": ("Tartuffe ou l’Imposteur/Édition Louandre, 1910", 5,
      "Molière, Tartuffe ou l’Imposteur (1669) — édition Louandre, Charpentier, 1910. Source : Wikisource, domaine public."),
  "lavare": ("L’Avare (Molière)/Édition Louandre, 1910", 5,
      "Molière, L’Avare (1668) — édition Louandre, Charpentier, 1910. Source : Wikisource, domaine public."),
  "phedre": ("Phèdre (Racine), Didot, 1854", 5,
      "Jean Racine, Phèdre (1677) — éditions Didot, 1854. Source : Wikisource, domaine public."),
  "andromaque": ("Andromaque (Racine, éditions Didot, 1854)", 5,
      "Jean Racine, Andromaque (1667) — éditions Didot, 1854. Source : Wikisource, domaine public."),
  "le-cid": ("Le Cid/Édition Ginn", 5,
      "Pierre Corneille, Le Cid (1637) — édition Ginn. Source : Wikisource, domaine public."),
  "britannicus": ("Britannicus (1670)", 5,
      "Jean Racine, Britannicus (1669) — édition de 1670. Source : Wikisource, domaine public."),
  "cyrano": ("Cyrano de Bergerac (Rostand)", 5,
      "Edmond Rostand, Cyrano de Bergerac (1897). Source : Wikisource, domaine public."),
  "malade-imaginaire": ("Le Malade imaginaire", 3,
      "Molière, Le Malade imaginaire (1673) — édition Louandre, Charpentier, 1910. Source : Wikisource, domaine public."),
  "bourgeois-gentilhomme": ("Le Bourgeois gentilhomme/Édition Louandre, 1910", 5,
      "Molière, Le Bourgeois gentilhomme (1670) — édition Louandre, Charpentier, 1910. Source : Wikisource, domaine public."),
  "dom-juan": ("Don Juan ou le Festin de pierre/Édition Louandre, 1910", 5,
      "Molière, Dom Juan ou le Festin de pierre (1665) — édition Louandre, Charpentier, 1910. Source : Wikisource, domaine public."),
}

def esc(s):
    return s.replace("\\","\\\\").replace("'", "\\'")

def gen(pid):
    base, nact, source = PLAYS[pid]
    blocks=[]
    for i in range(1, nact+1):
        roman=["","I","II","III","IV","V","VI","VII","VIII","IX","X"][i]
        page=f"{base}/Acte {roman}"
        html=ws.get_html(page)
        b=ws.parse_act(html)
        sys.stderr.write(f"  {page}: {len(b)} blocs\n")
        if not b:
            raise SystemExit(f"ABORT: 0 bloc pour {page}")
        blocks+=b
    lines=["import type { PieceTexte } from '../pieceTextes';","",
           "const texte: PieceTexte = {",
           f"  source: '{esc(source)}',",
           "  blocs: ["]
    for bl in blocks:
        lines.append(f"    {{ k: '{bl['k']}', t: '{esc(bl['t'])}' }},")
    lines += ["  ],","};","","export default texte;",""]
    out=os.path.join(OUT, pid+".ts")
    open(out,"w").write("\n".join(lines))
    from collections import Counter
    sys.stderr.write(f"→ {out}  ({len(blocks)} blocs, {dict(Counter(x['k'] for x in blocks))})\n")

if __name__=="__main__":
    os.makedirs(OUT, exist_ok=True)
    ids = sys.argv[1:] or list(PLAYS)
    for pid in ids:
        sys.stderr.write(f"### {pid}\n")
        gen(pid)
