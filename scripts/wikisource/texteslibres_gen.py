#!/usr/bin/env python3
"""Génère src/data/texts/<id>.ts pour des pièces de texteslibres.fr.

Auto-découverte des sous-pages (une par scène/acte) via ws_fetch.discover_texteslibres,
puis parsing de chaque page (mêmes classes span.personnage / span.didascalie que Wikisource).
Requêtes throttlées + cache HTML brut dans le scratchpad → reprenable.

Usage: texteslibres_gen.py <id1> <id2> …   (sans argument = tout PLAYS)
"""
import sys, os, time, json, importlib.util, hashlib, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("ws", os.path.join(HERE, "ws_fetch.py"))
ws = importlib.util.module_from_spec(spec); spec.loader.exec_module(ws)

OUT = os.path.normpath(os.path.join(HERE, "..", "..", "src", "data", "texts"))
CACHE = "/tmp/claude-1000/-home-patrick-Documents-Claude-Projects-theatror-extended/a01c0167-13b0-45b9-976c-598897180e63/scratchpad/tl_cache"
os.makedirs(CACHE, exist_ok=True)
DELAY = 0.35  # secondes entre requêtes (politesse)

# id → (slug, "Auteur", "Titre", année)
PLAYS = {
  "amphitryon": ("amphitryon", "Molière", "Amphitryon", 1668),
  "fourberies-scapin": ("les-fourberies-de-scapin", "Molière", "Les Fourberies de Scapin", 1671),
  "medecin-malgre-lui": ("le-medecin-malgre-lui", "Molière", "Le Médecin malgré lui", 1666),
  "fausses-confidences": ("les-fausses-confidences-marivaux", "Marivaux", "Les Fausses Confidences", 1737),
  "double-inconstance": ("la-double-inconstance", "Marivaux", "La Double Inconstance", 1723),
  "cinna": ("cinna-pierre-corneille", "Pierre Corneille", "Cinna", 1641),
  "polyeucte": ("polyeucte-pierre-corneille", "Pierre Corneille", "Polyeucte", 1643),
  "berenice": ("berenice", "Jean Racine", "Bérénice", 1670),
  "bajazet": ("bajazet", "Jean Racine", "Bajazet", 1672),
  "caprices-marianne": ("les-caprices-de-marianne-alfred-de-musset", "Alfred de Musset", "Les Caprices de Marianne", 1833),
  "lorenzaccio": ("lorenzaccio-alfred-de-musset", "Alfred de Musset", "Lorenzaccio", 1834),
  "fil-a-la-patte": ("un-fil-a-la-patte-georges-feydeau", "Georges Feydeau", "Un fil à la patte", 1894),
  "le-dindon": ("le-dindon-georges-feydeau", "Georges Feydeau", "Le Dindon", 1896),
  "boubouroche": ("boubouroche-georges-courteline", "Georges Courteline", "Boubouroche", 1893),
  "perrichon": ("le-voyage-de-monsieur-perrichon-eugene-labiche", "Eugène Labiche", "Le Voyage de monsieur Perrichon", 1860),
}

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def cached_texteslibres(url):
    key = hashlib.md5(url.encode()).hexdigest() + ".html"
    path = os.path.join(CACHE, key)
    if os.path.exists(path):
        return open(path, encoding="utf-8").read()
    html = ws.get_texteslibres(url)
    open(path, "w", encoding="utf-8").write(html)
    time.sleep(DELAY)
    return html

def gen(pid):
    slug, auteur, titre, annee = PLAYS[pid]
    acts = ws.discover_texteslibres(f"https://www.texteslibres.fr/{slug}.html")
    blocks = []
    for act_label, scenes in acts:
        blocks.append({"k": "acte", "t": act_label})
        for scene_label, url in scenes:
            html = cached_texteslibres(url)
            b = ws.parse_act(html, force_started=True)
            if not b:
                sys.stderr.write(f"  ! vide: {url}\n")
                continue
            if scene_label:
                blocks.append({"k": "scene", "t": scene_label})
            blocks += b
    if sum(1 for b in blocks if b["k"] == "ligne") < 20:
        raise SystemExit(f"ABORT {pid}: trop peu de répliques")
    source = f"{auteur}, {titre} ({annee}). Texte du domaine public. Source : texteslibres.fr."
    lines = ["import type { PieceTexte } from '../pieceTextes';", "",
             "const texte: PieceTexte = {", f"  source: '{esc(source)}',", "  blocs: ["]
    for b in blocks:
        lines.append(f"    {{ k: '{b['k']}', t: '{esc(b['t'])}' }},")
    lines += ["  ],", "};", "", "export default texte;", ""]
    open(os.path.join(OUT, pid + ".ts"), "w").write("\n".join(lines))
    from collections import Counter
    c = Counter(b["k"] for b in blocks)
    sys.stderr.write(f"→ {pid}.ts  {dict(c)}\n")

if __name__ == "__main__":
    ids = sys.argv[1:] or list(PLAYS)
    for pid in ids:
        sys.stderr.write(f"### {pid}\n")
        gen(pid)
