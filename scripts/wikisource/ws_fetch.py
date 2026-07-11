#!/usr/bin/env python3
"""Récupère un texte de théâtre depuis fr.wikisource et le nettoie en blocs.
Sortie : liste de blocs {k, t} où k ∈ acte|scene|didascalie|perso|ligne.
Usage: ws_fetch.py "Le Misanthrope/Édition Louandre, 1910" 5   (5 actes)
"""
import sys, json, re, urllib.parse, urllib.request
from bs4 import BeautifulSoup, NavigableString, Tag

API = "https://fr.wikisource.org/w/api.php"

def get_html(page):
    q = urllib.parse.urlencode({"action":"parse","format":"json","prop":"text","page":page})
    req = urllib.request.Request(f"{API}?{q}", headers={"User-Agent":"Theathror/1.0 (educational PWA; contact patrick.nouhailler@gmail.com)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        d = json.load(r)
    return d["parse"]["text"]["*"]

def sget(el, k, default=""):
    a = getattr(el, "attrs", None)
    if not a: return default
    return a.get(k, default)

def scls(el):
    return sget(el, "class", []) or []

def norm(s):
    s = s.replace("\xa0"," ").replace(" "," ")
    s = re.sub(r"\s+"," ", s)
    return s.strip()

def parse_act(html):
    soup = BeautifulSoup(html, "lxml")
    root = soup.select_one(".mw-parser-output") or soup
    blocks = []
    started = False
    skip_cast = False
    # drop noise nodes
    for bad in root.select("style, link, script, sup.reference, .ws-noexport, .pagenum, .mw-editsection"):
        bad.decompose()
    # hidden alignment spans
    for sp in root.find_all("span"):
        st = sget(sp, "style", "").replace(" ","")
        if "visibility:hidden" in st:
            sp.decompose()

    def is_cue(el):
        perso = el.find("span", class_="personnage")
        if not perso: return None
        did = el.find("span", class_="didascalie")
        # feuille « locuteur » seulement si le div ne contient que le nom (+ didascalie)
        # comparaison insensible aux espaces : la didascalie commence souvent par « , »
        # collée au nom (« Sganarelle, tenant… ») → forcer un espace ferait échouer le test.
        own = norm(el.get_text()).replace(" ", "")
        expect = norm(perso.get_text() + " " + (did.get_text() if did else "")).replace(" ", "")
        if own == expect:
            return (norm(perso.get_text()), norm(did.get_text()) if did else "")
        return None

    def walk(node):
        nonlocal started, skip_cast
        for el in node.children:
            if not isinstance(el, Tag):
                continue
            cls = scls(el)
            name = el.name
            if name == "h2" and (sget(el,"id","").startswith("ACTE") or "ACTE" in el.get_text().upper()):
                started = True; skip_cast = False
                blocks.append({"k":"acte","t":norm(el.get_text())})
                continue
            if name == "h3":
                # Une scène ne peut exister avant un acte : on n'ouvre la capture
                # que sur un h2 ACTE. Ainsi les préfaces/notes d'éditeur composées
                # en h3 avant le 1er acte (vu dans « Le Marquis de Villemer ») sont ignorées.
                skip_cast = False
                if started:
                    blocks.append({"k":"scene","t":norm(el.get_text())})
                continue
            if not started:
                walk(el)
                continue
            # Liste des personnages parfois embarquée en tête de la page d'acte
            # (marqueur « PERSONNAGES », vu dans Ruy Blas) : on saute les noms
            # jusqu'à la scène suivante pour ne pas les émettre comme répliques.
            own = norm(el.get_text())
            if name in ("p","div") and re.match(r"(?i)^personnages\b", own) and len(own) < 16:
                skip_cast = True
                continue
            if skip_cast:
                # On descend dans les conteneurs (pour retrouver le h3 qui clôt la
                # liste et remet skip_cast à False) mais sans émettre de réplique.
                if name in ("div","section","dl","dd","ul","li","table","tbody","tr","td","span","a","center"):
                    walk(el)
                continue
            if "poem" in cls:
                emit_lines(el, blocks)
                continue
            cue = is_cue(el)
            if cue:
                blocks.append({"k":"perso","t":cue[0]})
                if cue[1]:
                    blocks.append({"k":"didascalie","t":cue[1]})
                continue
            if "didascalie" in cls:
                t = norm(el.get_text())
                if t: blocks.append({"k":"didascalie","t":t})
                continue
            if name == "p":
                emit_lines(el, blocks)
                continue
            if name in ("div","section","dl","dd","ul","li","table","tbody","tr","td","span","a","center"):
                walk(el)
                continue
        return

    def emit_lines(el, blocks):
        buf = []
        def flush():
            t = norm("".join(buf)); buf.clear()
            if t: blocks.append({"k":"ligne","t":t})
        for ch in el.children:
            if isinstance(ch, NavigableString):
                buf.append(str(ch)); continue
            if not isinstance(ch, Tag):
                continue
            n = ch.name; cls = scls(ch)
            if n == "br":
                flush(); continue
            if "personnage" in cls:
                flush(); blocks.append({"k":"perso","t":norm(ch.get_text())}); continue
            cue = is_cue(ch)
            if cue:
                flush(); blocks.append({"k":"perso","t":cue[0]})
                if cue[1]: blocks.append({"k":"didascalie","t":cue[1]})
                continue
            if "didascalie" in cls:
                flush()
                dt = norm(ch.get_text())
                if dt: blocks.append({"k":"didascalie","t":dt})
                continue
            if n in ("p","div","span"):
                # conteneur inline : parcourt récursivement
                emit_lines(ch, blocks); flush(); continue
            buf.append(ch.get_text())
        flush()

    walk(root)
    # collapse consecutive identical didascalies / empties
    out=[]
    for b in blocks:
        if b["k"]=="perso":
            b["t"]=b["t"].rstrip(" .,;:")
        if not b["t"]: continue
        if out and out[-1]==b: continue
        out.append(b)
    return out

def main():
    base = sys.argv[1]
    nact = int(sys.argv[2])
    all_blocks=[]
    for i in range(1, nact+1):
        roman = ["","I","II","III","IV","V","VI","VII","VIII","IX","X"][i]
        page = f"{base}/Acte {roman}"
        html = get_html(page)
        b = parse_act(html)
        sys.stderr.write(f"{page}: {len(b)} blocs\n")
        all_blocks += b
    json.dump(all_blocks, sys.stdout, ensure_ascii=False)

if __name__=="__main__":
    main()
