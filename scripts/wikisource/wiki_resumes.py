#!/usr/bin/env python3
"""Récupère un extrait d'introduction Wikipédia (fr) pour chaque pièce sans résumé,
afin de rédiger ensuite un résumé fidèle (aucune copie : base factuelle seulement).

Sortie : scratchpad/wiki_extracts.json  { id: {titre, auteur, wiki, extract} }.
"""
import json, re, os, time, urllib.parse, urllib.request

SCR = "/tmp/claude-1000/-home-patrick-Documents-Claude-Projects-theatror-extended/a01c0167-13b0-45b9-976c-598897180e63/scratchpad"
ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
API = "https://fr.wikipedia.org/w/api.php"
UA = {"User-Agent": "Theathror/1.0 (educational; patrick.nouhailler@gmail.com)"}

def api(**p):
    p.setdefault("format", "json"); p.setdefault("formatversion", "2")
    u = API + "?" + urllib.parse.urlencode(p)
    with urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30) as r:
        return json.load(r)

def missing_ids():
    manifest = {r["id"]: r for r in (json.loads(l) for l in open(os.path.join(SCR, "tl_manifest.jsonl")) if l.strip())}
    txt = open(os.path.join(ROOT, "src/data/pieces.ts")).read()
    blk = txt[txt.index("AUTO-TL PIECES DÉBUT"):txt.index("AUTO-TL PIECES FIN")]
    out = []
    for line in blk.splitlines():
        m = re.match(r"\s*\{ id: '([a-z0-9-]+)'", line)
        if m and "resume:" not in line and m.group(1) in manifest:
            out.append(manifest[m.group(1)])
    return out

def find_extract(titre, auteur):
    # recherche « Titre (auteur) » puis « Titre Auteur »
    for q in (f"{titre} {auteur}", f"{titre} (pièce)", titre):
        r = api(action="query", list="search", srsearch=q, srlimit=5, srnamespace=0)
        hits = r.get("query", {}).get("search", [])
        for h in hits:
            title = h["title"]
            ex = api(action="query", prop="extracts", exintro=1, explaintext=1,
                     redirects=1, titles=title)
            pages = ex.get("query", {}).get("pages", [])
            if not pages: continue
            extract = pages[0].get("extract", "") or ""
            low = extract.lower()
            # valider : parle bien d'une pièce de cet auteur
            surname = auteur.split()[-1].lower()
            if extract and (surname in low or any(k in low for k in
                    ("pièce", "comédie", "vaudeville", "tragédie", "drame", "acte", "théâtre", "farce"))):
                return title, extract
        time.sleep(0.3)
    return None, ""

if __name__ == "__main__":
    recs = missing_ids()
    cache = os.path.join(SCR, "wiki_extracts.json")
    res = json.load(open(cache)) if os.path.exists(cache) else {}
    for i, r in enumerate(recs, 1):
        if r["id"] in res:
            continue
        try:
            wiki, extract = find_extract(r["titre"], r["auteur"])
        except Exception as e:
            wiki, extract = None, f"ERR {e}"
        res[r["id"]] = {"titre": r["titre"], "auteur": r["auteur"], "wiki": wiki,
                        "extract": extract[:900]}
        print(f"[{i}/{len(recs)}] {r['id']}: {'OK '+str(wiki) if extract and not extract.startswith('ERR') else 'MANQUE'}")
        json.dump(res, open(cache, "w"), ensure_ascii=False, indent=0)
        time.sleep(0.3)
    got = sum(1 for v in res.values() if v["extract"] and not v["extract"].startswith("ERR"))
    print(f"=== {got}/{len(res)} extraits trouvés ===")
