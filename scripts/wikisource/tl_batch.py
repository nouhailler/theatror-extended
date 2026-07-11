#!/usr/bin/env python3
"""Génération de masse des pièces texteslibres.fr (lit tl_todo.json du scratchpad).

Pour chaque pièce : auto-découverte des sous-pages, validation (assez de pages,
numérotation d'actes sans trou majeur), génération de src/data/texts/<id>.ts.
Reprenable (saute les .ts déjà écrits), throttlé, cache HTML brut.
Écrit un manifeste JSONL (un objet par pièce générée) pour la construction des fiches.
"""
import sys, os, re, json, time, importlib.util
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("ws", os.path.join(HERE, "ws_fetch.py"))
ws = importlib.util.module_from_spec(spec); spec.loader.exec_module(ws)

OUT = os.path.normpath(os.path.join(HERE, "..", "..", "src", "data", "texts"))
SCR = "/tmp/claude-1000/-home-patrick-Documents-Claude-Projects-theatror-extended/a01c0167-13b0-45b9-976c-598897180e63/scratchpad"
TODO = os.path.join(SCR, "tl_todo.json")
MANIFEST = os.path.join(SCR, "tl_manifest.jsonl")
BROKEN = os.path.join(SCR, "tl_broken.jsonl")

# Exclusions (contenu inapproprié)
EXCLUDE_SLUGS = {"a-la-feuille-de-rose-maison-turque-guy-de-maupassant"}

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def clean_roles(blocks):
    roles = []
    for b in blocks:
        if b["k"] != "perso":
            continue
        t = b["t"]
        low = t.lower()
        if " et " in low or low in ("tous", "toutes", "ensemble") or low.startswith("voix"):
            continue
        if t not in roles:
            roles.append(t)
    return roles

def act_gap(acts):
    nums = []
    for lbl, _ in acts:
        m = re.match(r"ACTE (\w+)", lbl)
        if m:
            n = ws._ROMAN.get(m.group(1).lower())
            if n: nums.append(n)
    return bool(nums) and nums != list(range(1, len(nums) + 1))

def gen(rec):
    pid, slug = rec["id"], rec["slug"]
    out = os.path.join(OUT, pid + ".ts")
    if os.path.exists(out):
        return "exists"
    landing = f"https://www.texteslibres.fr/{slug}.html"
    acts = ws.discover_texteslibres(landing)
    total = sum(len(s) for _, s in acts)
    blocks = []
    if not acts or total == 0:
        # pas de sous-pages → pièce en un acte, texte sur la page-landing elle-même
        b = ws.parse_act(ws_cached(landing), force_started=True)
        if sum(1 for x in b if x["k"] == "ligne") >= 20:
            blocks = [{"k": "acte", "t": rec["titre"]}] + b
        else:
            json.dump({**rec, "reason": "landing vide"}, open(BROKEN, "a"), ensure_ascii=False)
            open(BROKEN, "a").write("\n")
            return "broken"
    elif act_gap(acts):
        json.dump({**rec, "reason": "gap actes", "acts": [(l, len(s)) for l, s in acts]},
                  open(BROKEN, "a"), ensure_ascii=False); open(BROKEN, "a").write("\n")
        return "broken"
    else:
        for act_label, scenes in acts:
            # étiquette « TEXTE » (acte non numéroté d'un one-act) → titre de la pièce
            blocks.append({"k": "acte", "t": rec["titre"] if act_label == "TEXTE" else act_label})
            for scene_label, url in scenes:
                b = ws.parse_act(ws_cached(url), force_started=True)
                if not b:
                    continue
                if scene_label:
                    blocks.append({"k": "scene", "t": scene_label})
                blocks += b
    nl = sum(1 for b in blocks if b["k"] == "ligne")
    if nl < 20:
        json.dump({**rec, "reason": f"only {nl} lignes"}, open(BROKEN, "a"), ensure_ascii=False)
        open(BROKEN, "a").write("\n")
        return "broken"
    source = f"{rec['auteur']}, {rec['titre']} ({rec['annee']}). Texte du domaine public. Source : texteslibres.fr."
    lines = ["import type { PieceTexte } from '../pieceTextes';", "",
             "const texte: PieceTexte = {", f"  source: '{esc(source)}',", "  blocs: ["]
    for b in blocks:
        lines.append(f"    {{ k: '{b['k']}', t: '{esc(b['t'])}' }},")
    lines += ["  ],", "};", "", "export default texte;", ""]
    open(out, "w").write("\n".join(lines))
    rec2 = {**rec, "actes": len([1 for b in blocks if b["k"] == "acte"]),
            "nlignes": nl, "roles": clean_roles(blocks)}
    json.dump(rec2, open(MANIFEST, "a"), ensure_ascii=False); open(MANIFEST, "a").write("\n")
    return f"ok ({rec2['actes']} actes, {nl} rép., {len(rec2['roles'])} rôles)"

_CACHE = os.path.join(SCR, "tl_cache")
os.makedirs(_CACHE, exist_ok=True)
import hashlib
def ws_cached(url):
    key = hashlib.md5(url.encode()).hexdigest() + ".html"
    p = os.path.join(_CACHE, key)
    if os.path.exists(p):
        return open(p, encoding="utf-8").read()
    h = ws.get_texteslibres(url)
    open(p, "w", encoding="utf-8").write(h)
    time.sleep(0.35)
    return h

if __name__ == "__main__":
    todo = json.load(open(TODO))
    todo = [r for r in todo if r["slug"] not in EXCLUDE_SLUGS]
    n = len(todo)
    for i, rec in enumerate(todo, 1):
        try:
            res = gen(rec)
        except Exception as e:
            res = f"ERR {e}"
            json.dump({**rec, "reason": str(e)}, open(BROKEN, "a"), ensure_ascii=False)
            open(BROKEN, "a").write("\n")
        sys.stderr.write(f"[{i}/{n}] {rec['id']}: {res}\n")
        sys.stderr.flush()
    sys.stderr.write("=== TERMINÉ ===\n")
