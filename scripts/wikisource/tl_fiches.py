#!/usr/bin/env python3
"""Construit les fiches PIECES + les loaders pour les pièces générées (manifeste texteslibres).

Champs factuels exacts (titre/auteur/année/actes) ; epoque déduite de l'année ; durée
estimée du nb de répliques ; genre par heuristique-auteur ; distribution F/H par heuristique
sur les noms de rôles ; résumé pris dans RESUMES (pièces connues) sinon omis.

Injection idempotente entre marqueurs AUTO-TL dans src/data/pieces.ts et pieceTextes.ts.
"""
import json, re, os, unicodedata, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
SCR = "/tmp/claude-1000/-home-patrick-Documents-Claude-Projects-theatror-extended/a01c0167-13b0-45b9-976c-598897180e63/scratchpad"
MANIFEST = os.path.join(SCR, "tl_manifest.jsonl")

spec = importlib.util.spec_from_file_location("ws", os.path.join(HERE, "ws_fetch.py"))
ws = importlib.util.module_from_spec(spec); spec.loader.exec_module(ws)

# Genre dominant par auteur (défaut 'comédie')
GENRE_AUT = {
  "Georges Feydeau": "vaudeville", "Eugène Labiche": "vaudeville",
  "Georges Courteline": "comédie", "Marivaux": "comédie", "Molière": "comédie",
  "Jean Racine": "tragédie", "Pierre Corneille": "tragédie", "Thomas Corneille": "tragédie",
  "Voltaire": "tragédie", "Victor Hugo": "drame", "Henrik Ibsen": "drame",
  "Alfred de Musset": "comédie", "Anton Tchekhov": "comédie", "Alexandre Dumas": "drame",
  "Denis Diderot": "drame", "Honoré de Balzac": "drame", "Alfred Jarry": "farce",
  "Carlo Goldoni": "comédie", "Beaumarchais": "comédie", "Emile Augier": "comédie",
  "Guy de Maupassant": "comédie", "Alain-René Lesage": "comédie", "Jean de La Fontaine": "comédie",
  "William Shakespeare": "drame",
}
# auteurId : dramaturges déjà présents, sinon slug (rendu gracieux si absent)
def auteur_id(nom):
    s = unicodedata.normalize("NFD", nom.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.split(" de ")[-1] if " de " in s else s
    return re.sub(r"[^a-z]", "", s.split()[-1]) if s.split() else "?"

FEM = re.compile(r"^(madame|mme|mademoiselle|mlle|la |une |dame|reine|princesse|comtesse|marquise|"
                 r"baronne|duchesse|dona|doña|miss|lady|mère|tante|nourrice|servante|soeur|sœur)\b", re.I)
MASC = re.compile(r"^(monsieur|m\.|le |un |don |sieur|roi|prince|comte|marquis|baron|duc|abbé|"
                  r"père|oncle|valet|comdt|commandant|general|général|docteur|maître|frère)\b", re.I)
FEM_END = ("a", "e", "ine", "ette", "elle")  # faible indice
KNOWN_F = {"lucette","lucienne","marianne","silvia","araminte","marton","adèle","henriette","clara",
           "nini","maggy","viviane","hermia","flaminia","lisette","zerbinette","hyacinte","martine",
           "jacqueline","lucinde","nérine","émilie","fulvie","livie","pauline","stratonice","bérénice",
           "phénice","roxane","atalide","zaïre","zatime","marceline","armandine","célimène","agnès"}

def gender(role):
    r = role.strip()
    low = r.lower()
    if FEM.match(low): return "F"
    if MASC.match(low): return "M"
    base = re.split(r"[ ,(]", low)[0]
    if base in KNOWN_F: return "F"
    return "M"  # défaut masculin (heuristique imparfaite)

def split_fh(roles):
    f = sum(1 for r in roles if gender(r) == "F")
    return len(roles) - f, f  # hommes, femmes

def epoque(an):
    return "antique" if an < 0 else "classique" if an < 1800 else "contemporain"

def duree(nl):
    m = max(20, min(180, round(nl / 16)))
    h, mn = divmod(m, 60)
    d = f"≈ {h} h" + (f" {mn:02d}" if mn else "") if h else f"≈ {m} min"
    return m, d

def difficulte(an, genre):
    if an < 1800 and genre == "tragédie": return 4
    if an < 1800: return 3
    return 2

# Résumés rédigés pour les pièces les plus connues (id -> résumé). Sinon omis.
RESUMES = {}

def esc(s): return s.replace("\\", "\\\\").replace("'", "\\'")

def fiche(rec):
    an = rec["annee"]; genre = GENRE_AUT.get(rec["auteur"], "comédie")
    roles = rec["roles"]; h, f = split_fh(roles)
    dm, ds = duree(rec["nlignes"])
    ep = epoque(an)
    aid = auteur_id(rec["auteur"])
    actes = f"{rec['actes']} acte" + ("s" if rec["actes"] > 1 else "")
    r = RESUMES.get(rec["id"])
    fields = [
        f"id: '{rec['id']}'", f"titre: '{esc(rec['titre'])}'", f"auteur: '{esc(rec['auteur'])}'",
        f"auteurId: '{aid}'", f"annee: '{an}'", f"anneeNum: {an}", f"genre: '{genre}'",
        f"actes: '{actes}'", f"femmes: {f}", f"hommes: {h}", f"dureeMin: {dm}", f"duree: '{ds}'",
        "domainePublic: true", "decor: 'décor simple'", "pourEnfants: false",
        f"epoque: '{ep}'", f"difficulte: {difficulte(an, genre)}",
    ]
    if r: fields.append(f"resume: \"{r}\"")
    return "  { " + ", ".join(fields) + " },"

def inject(path, marker, block):
    txt = open(path).read()
    beg, end = f"// AUTO-TL {marker} DÉBUT", f"// AUTO-TL {marker} FIN"
    new = f"{beg}\n{block}\n  {end}"
    if beg in txt:
        txt = re.sub(re.escape(beg) + r".*?" + re.escape(end), lambda m: new.strip(), txt, flags=re.S)
    else:
        # insérer avant la dernière fermeture du tableau/objet
        anchor = "];" if marker == "PIECES" else "};"
        i = txt.rfind(anchor)
        txt = txt[:i] + "  " + new + "\n" + txt[i:]
    open(path, "w").write(txt)

if __name__ == "__main__":
    recs = [json.loads(l) for l in open(MANIFEST) if l.strip()]
    recs.sort(key=lambda r: r["titre"])
    fiches = "\n".join(fiche(r) for r in recs)
    loaders = "\n".join(f"  '{r['id']}': () => import('./texts/{r['id']}')," for r in recs)
    inject(os.path.join(ROOT, "src/data/pieces.ts"), "PIECES", fiches)
    inject(os.path.join(ROOT, "src/data/pieceTextes.ts"), "LOADERS", loaders)
    print(f"{len(recs)} fiches + loaders injectés.")
