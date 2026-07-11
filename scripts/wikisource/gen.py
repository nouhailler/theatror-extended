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
  # nb actes = 0 → page unique (« Texte entier »)
  "horace": ("Horace (Corneille)/Édition Courbé", 0,
      "Pierre Corneille, Horace (1640) — édition Augustin Courbé. Source : Wikisource, domaine public."),
  "mariage-figaro": ("Le Mariage de Figaro", 5,
      "Beaumarchais, La Folle Journée, ou le Mariage de Figaro (1784). Source : Wikisource, domaine public."),
  "barbier-seville": ("Le Barbier de Séville", 4,
      "Beaumarchais, Le Barbier de Séville, ou la Précaution inutile (1775). Source : Wikisource, domaine public."),
  "hernani": ("Hernani (Hetzel, 1889)", 5,
      "Victor Hugo, Hernani (1830) — édition Hetzel, 1889. Source : Wikisource, domaine public."),
  "ruy-blas": ("Ruy Blas", 5,
      "Victor Hugo, Ruy Blas (1838). Source : Wikisource, domaine public.", "Acte {n}"),
  "on-ne-badine-pas": ("On ne badine pas avec l’amour (1884)", 3,
      "Alfred de Musset, On ne badine pas avec l’amour (1834) — édition de 1884. Source : Wikisource, domaine public."),
  "le-jeu-amour-hasard": ("Le Jeu de l’amour et du hasard", 3,
      "Marivaux, Le Jeu de l’amour et du hasard (1730). Source : Wikisource, domaine public."),
  "ubu-roi": ("Ubu roi (1896)", 5,
      "Alfred Jarry, Ubu roi (1896). Source : Wikisource, domaine public.", "Acte {n}"),
  # Sand : versions théâtre en page unique (nb actes = 0)
  "marquis-villemer": ("Le Marquis de Villemer (Théâtre)", 0,
      "George Sand, Le Marquis de Villemer (théâtre, 1864). Source : Wikisource, domaine public."),
  "francois-champi": ("François le Champi (Théâtre)", 0,
      "George Sand, François le Champi (théâtre, 1849). Source : Wikisource, domaine public."),
  # Lot 3 — étranger, traductions françaises du domaine public
  "hamlet": ("Hamlet/Traduction Guizot, 1864", 5,
      "William Shakespeare, Hamlet — traduction française de François Guizot, 1864. Source : Wikisource, domaine public."),
  "macbeth": ("Macbeth/Traduction Guizot, 1864", 5,
      "William Shakespeare, Macbeth — traduction française de François Guizot, 1864. Source : Wikisource, domaine public."),
  "songe-nuit-ete": ("Le Songe d’une nuit d’été/Traduction Guizot, 1862", 5,
      "William Shakespeare, Le Songe d’une nuit d’été — traduction française de François Guizot, 1862. Source : Wikisource, domaine public."),
  "maison-poupee": ("Une maison de poupée", 3,
      "Henrik Ibsen, Une maison de poupée — traduction française d’Albert Savine, 1906. Source : Wikisource, domaine public."),
}

def esc(s):
    return s.replace("\\","\\\\").replace("'", "\\'")

def gen(pid):
    entry = PLAYS[pid]
    base, nact, source = entry[0], entry[1], entry[2]
    # 4e élément optionnel = gabarit de la page d'acte (défaut : romain « Acte {roman} »).
    # Certaines éditions numérotent en arabe → passer "Acte {n}".
    actfmt = entry[3] if len(entry) > 3 else "Acte {roman}"
    blocks=[]
    if nact == 0:
        # Page unique (« Texte entier ») : base contient toute la pièce,
        # parse_act repère les actes (h2) et scènes (h3) d'un seul tenant.
        html=ws.get_html(base)
        blocks=ws.parse_act(html)
        sys.stderr.write(f"  {base}: {len(blocks)} blocs\n")
        if not blocks:
            raise SystemExit(f"ABORT: 0 bloc pour {base}")
    else:
        for i in range(1, nact+1):
            roman=["","I","II","III","IV","V","VI","VII","VIII","IX","X"][i]
            page=f"{base}/"+actfmt.format(roman=roman, n=i)
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
