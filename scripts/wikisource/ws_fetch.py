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

def parse_act(html, no_act=False, sc_mode=False):
    # no_act : pièces sans structure d'actes (tragédies grecques…) : on n'ouvre pas
    # la capture sur un h2 ACTE (il n'y en a pas) mais sur le 1er vrai locuteur, ce
    # qui saute d'office le front-matter (titre, notice, liste des personnages).
    # sc_mode : édition « in-quarto » (Roméo et Juliette, trad. Hugo 1868) — actes/scènes
    # composés en <div> texte (pas de h2/h3), locuteur = <div> ne contenant qu'un
    # <span class="sc"> EN GRAS (les noms cités dans les didascalies sont en sc non gras).
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

    def sc_cue(el):
        # Convention « petites capitales » (traduction Guizot de Shakespeare) :
        # <p><span class="sc">nom</span>. — réplique…</p>. Le locuteur n'est reconnu
        # que si le span.sc ouvre le paragraphe et est suivi d'une ponctuation de
        # réplique (« . — »), pour ne pas confondre avec un nom cité dans le texte.
        first = None
        for ch in el.children:
            if isinstance(ch, NavigableString):
                if str(ch).strip() == "": continue
                return None
            first = ch; break
        if first is None or first.name != "span" or "sc" not in scls(first):
            return None
        name = norm(first.get_text())
        if not name: return None
        rest = norm(el.get_text())[len(name):].lstrip()
        if rest[:1] in (".", "—", "–", ":"):
            line = re.sub(r"^[\s.—–:-]+", "", rest)
            return (name, line)
        return None

    def bold_sc_cue(el):
        # locuteur « in-quarto » : le bloc ne contient qu'un span.sc EN GRAS.
        sp = el.find("span", class_="sc")
        if not sp or "bold" not in sget(sp, "style", ""):
            return None
        if norm(el.get_text()) != norm(sp.get_text()):
            return None
        return norm(sp.get_text()).rstrip(" .,")

    def walk_sc(node):
        nonlocal started
        for el in node.children:
            if not isinstance(el, Tag):
                continue
            if el.name in ("style", "link", "script"):
                continue
            t = norm(el.get_text())
            # En-tête acte/scène = <div> texte, sans span.sc.
            if el.name in ("div", "center", "p") and not el.find("span", class_="sc") \
               and re.match(r"(?i)^(acte|sc[eè]ne|prologue|épilogue)\b", t) and len(t) < 40:
                started = True
                k = "acte" if re.match(r"(?i)^acte\b", t) else "scene"
                blocks.append({"k": k, "t": t})
                continue
            if not started:
                # avant la 1re scène : on descend chercher l'en-tête, on ignore le reste
                if el.name in ("div", "section", "center"):
                    walk_sc(el)
                continue
            cue = bold_sc_cue(el)
            if cue:
                blocks.append({"k": "perso", "t": cue})
                continue
            if el.name == "p":
                emit_lines(el, blocks)
                continue
            if el.name in ("div", "center", "dd"):
                # didascalie (décor, entrées/sorties) — peut contenir des sc non gras
                if el.find(["div", "p", "center"]):
                    walk_sc(el)
                elif t:
                    blocks.append({"k": "didascalie", "t": t})
                continue

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
            if name == "h2" and started and "SCÈNE" in el.get_text().upper():
                # Certaines éditions (trad. Guizot de Shakespeare) composent aussi
                # les scènes en h2. On ne les prend qu'après le 1er acte.
                skip_cast = False
                blocks.append({"k":"scene","t":norm(el.get_text())})
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
                if no_act and is_cue(el):
                    started = True  # 1er locuteur : on tombe dans le traitement normal
                else:
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
                sc = sc_cue(el)
                if sc:
                    blocks.append({"k":"perso","t":sc[0]})
                    if sc[1]: blocks.append({"k":"ligne","t":sc[1]})
                else:
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

    walk_sc(root) if sc_mode else walk(root)
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
