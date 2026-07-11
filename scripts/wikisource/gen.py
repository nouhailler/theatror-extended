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
  # Tragédies grecques : pas de structure d'actes → nact = -1 (mode no_act),
  # 4e champ = intitulé du bloc « acte » synthétique.
  "antigone-sophocle": ("Tragédies de Sophocle (Artaud)/Antigone", -1,
      "Sophocle, Antigone — traduction française de Nicolas Artaud, Charpentier, 1859. Source : Wikisource, domaine public.",
      "ANTIGONE"),
  "oedipe-roi": ("Tragédies de Sophocle (Artaud)/Œdipe roi", -1,
      "Sophocle, Œdipe roi — traduction française de Nicolas Artaud, Charpentier, 1859. Source : Wikisource, domaine public.",
      "ŒDIPE ROI"),
  "les-grenouilles": ("Les Grenouilles (trad. Eugène Talbot)", -1,
      "Aristophane, Les Grenouilles — traduction française d’Eugène Talbot, Alphonse Lemerre, 1897. Source : Wikisource, domaine public.",
      "LES GRENOUILLES"),
  # medee (Euripide) : PAS de traduction FR exploitable sur fr.wikisource (Artaud n'a
  # pas traduit Médée ; l'édition Leconte de Lisle « Mèdéia » a son djvu manquant). Laissée sans texte.
  "romeo-juliette": ("Roméo et Juliette (trad. Hugo)", -2,
      "William Shakespeare, Roméo et Juliette — traduction française de François-Victor Hugo, 1868. Source : Wikisource, domaine public.",
      "ROMÉO ET JULIETTE"),
}

# Pièces issues d'une source externe (texteslibres.fr) : une URL par acte.
EXTERNAL = {
  "la-mouette": {
    "source": "Anton Tchekhov, La Mouette (1896) — traduction française du domaine public. Source : texteslibres.fr.",
    "acts": [
      ("ACTE PREMIER", "https://www.texteslibres.fr/la-mouette-anton-tchekhov/acte-premier-6074.html"),
      ("ACTE II",      "https://www.texteslibres.fr/la-mouette-anton-tchekhov/acte-ii-6075.html"),
      ("ACTE III",     "https://www.texteslibres.fr/la-mouette-anton-tchekhov/acte-iii-6076.html"),
      ("ACTE IV",      "https://www.texteslibres.fr/la-mouette-anton-tchekhov/acte-iv-6077.html"),
    ],
  },
}

def esc(s):
    return s.replace("\\","\\\\").replace("'", "\\'")

def gen_external(pid):
    """Génère une pièce depuis texteslibres.fr (une page par acte)."""
    spec = EXTERNAL[pid]
    blocks = []
    for label, url in spec["acts"]:
        html = ws.get_texteslibres(url)
        b = ws.parse_act(html, force_started=True)
        sys.stderr.write(f"  {label} ({url}): {len(b)} blocs\n")
        if not b:
            raise SystemExit(f"ABORT: 0 bloc pour {url}")
        blocks.append({"k": "acte", "t": label})
        blocks += b
    write_ts(pid, spec["source"], blocks)

def gen(pid):
    if pid in EXTERNAL:
        return gen_external(pid)
    entry = PLAYS[pid]
    base, nact, source = entry[0], entry[1], entry[2]
    # 4e élément optionnel = gabarit de la page d'acte (défaut : romain « Acte {roman} »).
    # Certaines éditions numérotent en arabe → passer "Acte {n}".
    actfmt = entry[3] if len(entry) > 3 else "Acte {roman}"
    blocks=[]
    if nact <= 0:
        # Page unique. nact==0 : « Texte entier » avec actes (h2)/scènes (h3).
        # nact==-1 : pièce SANS actes (tragédie grecque…) → mode no_act.
        # nact==-2 : édition in-quarto (Roméo, trad. Hugo) → mode sc_mode.
        # Pour -1/-2 : un bloc « acte » synthétique (titre = 4e champ) est prépendu.
        html=ws.get_html(base)
        blocks=ws.parse_act(html, no_act=(nact == -1), sc_mode=(nact == -2))
        if nact <= -1:
            label = entry[3] if len(entry) > 3 else "Texte intégral"
            blocks = [{"k":"acte","t":label}] + blocks
        sys.stderr.write(f"  {base}: {len(blocks)} blocs\n")
        if len(blocks) <= (1 if nact <= -1 else 0):
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
    write_ts(pid, source, blocks)

def write_ts(pid, source, blocks):
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
