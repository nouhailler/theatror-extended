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
# Corrections de genre (l'heuristique-auteur se trompe pour les auteurs « polygraphes »)
GENRE_OVERRIDE = {
  # Corneille : nombreuses comédies classées 'tragédie' par défaut
  "melite": "comédie", "clitandre": "tragi-comédie", "veuve": "comédie",
  "galerie-du-palais": "comédie", "suivante": "comédie", "illusion-comique": "comédie",
  "place-royale": "comédie", "menteur": "comédie", "suite-du-menteur": "comédie",
  "don-sanche-d-aragon": "héroï-comédie", "tite-et-berenice": "héroï-comédie",
  "pulcherie": "héroï-comédie",
  # Thomas Corneille
  "amour-a-la-mode": "comédie", "illustres-ennemis": "comédie", "galant-double": "comédie",
  "inconnu": "comédie", "festin-de-pierre": "comédie",
  # Racine : Les Plaideurs (unique comédie)
  "plaideurs": "comédie",
  # Marivaux : Annibal (unique tragédie)
  "annibal": "tragédie",
  # Molière : comédies-ballets
  "mariage-force": "comédie-ballet", "monsieur-de-pourceaugnac": "comédie-ballet",
  # Voltaire : une comédie
  "femme-qui-a-raison": "comédie",
  # Musset : drame
  "andre-del-sarto": "drame",
  # Tchekhov : drames vs vaudevilles en 1 acte
  "ivanov": "drame", "ce-fou-de-platonov": "drame", "trois-s-urs": "drame",
  "sur-la-grand-route": "drame", "chant-du-cygne": "drame", "tatiana-repina": "drame",
  "ours": "farce", "noce": "farce", "jubile": "farce", "demande-en-mariage": "farce",
  "tragedien-malgre-lui": "farce",
  # Beaumarchais : drames
  "eugenie": "drame", "mere-coupable": "drame",
  # Diderot / Balzac
  "est-il-bon-est-il-mechant": "comédie", "ressources-de-quinola": "comédie",
  # Jarry
  "antliaclastes": "farce", "ubu-enchaine": "farce",
  # Shakespeare
  "roi-lear": "tragédie", "othello": "tragédie",
  # La Fontaine
  "achille": "tragédie",
}

def auteur_id(nom):
    s = unicodedata.normalize("NFD", nom.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.split(" de ")[-1] if " de " in s else s
    return re.sub(r"[^a-z]", "", s.split()[-1]) if s.split() else "?"

FEM = re.compile(r"^(madame|mme|mademoiselle|mlle|mrs|miss|lady|la |une |dame|reine|princesse|"
                 r"comtesse|marquise|baronne|duchesse|vicomtesse|dona|doña|donna|mère|grand-?mère|"
                 r"tante|nourrice|servante|suivante|soeur|sœur|veuve|épouse|femme|fille|cousine|"
                 r"nièce|maîtresse|bergère|paysanne|marchande|cuisinière|gouvernante|abbesse|fée|"
                 r"déesse|impératrice|infante|demoiselle|bourgeoise|camériste|lingère|blanchisseuse)\b", re.I)
MASC = re.compile(r"^(monsieur|mr|m\.|le |un |don |sieur|roi|prince|comte|marquis|baron|duc|vicomte|"
                  r"abbé|père|grand-?père|oncle|valet|laquais|commandant|colonel|capitaine|général|"
                  r"lieutenant|docteur|médecin|maître|frère|chevalier|seigneur|fils|neveu|cousin|"
                  r"jardinier|notaire|curé|soldat|garde|huissier|empereur|sultan|pacha|marchand|"
                  r"paysan|bourgeois|domestique|comdt|gendarme|commissaire|brigadier|garçon|monsieur)\b", re.I)
# Prénoms féminins fréquents du répertoire (classique, XIXe, russe, scandinave)
KNOWN_F = set("""isabelle lyse angélique elvire dorine toinette nicole elmire célimène henriette armande
bélise philaminte agnès georgette rosine suzanne marceline fanchette cléone émilie camille sabine julie
chimène léonor léonore junie monime atalide roxane aricie hermione andromaque iphigénie ériphile phèdre
œnone josabeth athalie zaïre alzire mérope colombine silvia sylvia flaminia lisette marton araminte hortense
constance rosette nérine zerbinette hyacinte célie doris iris lucile lucinde marianne mariane marinette cathos
madelon jacqueline martine dorimène climène élise béline frosine dorothée agathe louison violette nanette babet
cécile adèle adrienne blanche clarisse clara clairette corinne delphine eugénie fanny gabrielle gervaise ginette
hélène jeanne joséphine juliette laure léonie léontine lucie lucienne madeleine marguerite mathilde nathalie
olympe pauline rose thérèse valentine victoire virginie yvonne zoé aline amélie antoinette augustine berthe
célestine clémence clémentine cunégonde sophie stéphanie charlotte caroline dorval nina macha sonia olga irina
irène natacha varia douniacha anfissa marina lioubov charlotta ania sacha hedda nora hedvig rebecca ellida hilde
gina berte thea rita maja bérénice phénice fulvie livie stratonice zatime maggy viviane hermia nini armandine
lucette pamela eugénie carmosine barberine félicie marton bettine rosette angelica cydalise araminte agathe
frisette célimare géronte-no dona rita clara sylvette ninon manon fadette cosette esther judith rebecca sara
marthe ruth noémie dina lia rachel léa myriam""".split())
FEM_SUFFIX = ("ette", "ine", "elle", "otte")  # suffixes assez sûrs (résiduel)

def _base(role):
    low = re.split(r"[,(]", role.strip().lower())[0].strip()
    return low, low.split()[0] if low.split() else low

def gender(role):
    low, first = _base(role)
    if FEM.match(low): return "F"
    if MASC.match(low): return "M"
    if first in KNOWN_F or low in KNOWN_F: return "F"
    if first.endswith(FEM_SUFFIX) and len(first) > 4: return "F"
    return "M"  # défaut masculin

def split_fh(roles):
    f = sum(1 for r in roles if gender(r) == "F")
    return len(roles) - f, f  # hommes, femmes

# Distributions F/H connues exactement (id -> (femmes, hommes)) pour les pièces majeures
FH_OVERRIDE = {
  "illusion-comique": (2, 8), "menteur": (3, 7), "femmes-savantes": (4, 7),
  "ecole-des-femmes": (2, 7), "ecole-des-maris": (2, 6), "precieuses-ridicules": (3, 8),
  "monsieur-de-pourceaugnac": (3, 9), "plaideurs": (1, 7), "athalie": (3, 6),
  "iphigenie": (4, 5), "mithridate": (1, 5), "cerisaie": (5, 7), "trois-s-urs": (4, 10),
  "ivanov": (5, 9), "hedda-gabler": (3, 4), "peer-gynt": (6, 12), "ours": (1, 2),
  "demande-en-mariage": (1, 2), "mefaits-du-tabac": (0, 1), "arlequin-valet-de-deux-maitres": (3, 6),
  "surprise-de-l-amour": (3, 4), "ile-des-esclaves": (2, 3), "triomphe-de-l-amour": (3, 3),
  "rodogune": (2, 5), "nicomede": (2, 6), "andromede": (4, 6), "dame-de-chez-maxim": (8, 12),
  "puce-a-l-oreille": (5, 9), "turcaret": (3, 6), "roi-lear": (3, 10), "othello": (3, 8),
}

def epoque(an):
    return "antique" if an < 0 else "classique" if an < 1800 else "contemporain"

def duree(nl, actes=1):
    # estimation : ~16 répliques/min, avec un plancher lié au nombre d'actes
    m = max(20, actes * 22, min(180, round(nl / 16)))
    m = min(180, m)
    h, mn = divmod(m, 60)
    d = f"≈ {h} h" + (f" {mn:02d}" if mn else "") if h else f"≈ {m} min"
    return m, d

def difficulte(an, genre):
    if an < 1800 and genre == "tragédie": return 4
    if an < 1800: return 3
    return 2

# Résumés rédigés pour les pièces connues (id -> résumé). Sinon omis (champ optionnel).
# Ne pas employer de guillemets droits (") — le champ est écrit entre guillemets doubles.
RESUMES = {
  # Corneille
  "melite": "Éraste présente Mélite à son ami Tircis, qui s'en éprend aussitôt : jalousies et fausses lettres brouillent les amants avant l'heureux dénouement. Première comédie de Corneille.",
  "illusion-comique": "Le magicien Alcandre fait revivre à un père les aventures de son fils disparu, comédien sans le savoir : éblouissant éloge du théâtre et de ses illusions.",
  "menteur": "À Paris, le jeune Dorante ment avec un brio intarissable pour séduire ; ses fables s'emmêlent jusqu'au quiproquo sur la femme qu'il convoite.",
  "place-royale": "Alidor, amoureux extravagant, veut se prouver libre en jetant celle qu'il aime dans les bras d'un ami : caprice qui se retourne contre lui.",
  "veuve": "Autour d'une jeune veuve courtisée, intrigues, enlèvement manqué et malentendus d'amour : comédie de jeunesse de Corneille.",
  "galerie-du-palais": "Amours contrariées et jalousies dans les boutiques de la Galerie du Palais, à Paris : peinture enjouée des mœurs galantes.",
  "suivante": "Une suivante rusée mène le jeu des amours de sa maîtresse, au risque de s'y perdre elle-même.",
  "suite-du-menteur": "Les nouveaux mensonges de Dorante, désormais en prison puis amoureux, prolongent les jeux de la vérité et de l'illusion.",
  "rodogune": "Deux frères aiment la princesse Rodogune ; leur mère Cléopâtre, reine de Syrie, exige d'eux un meurtre pour régner : tragédie du sang et du pouvoir.",
  "nicomede": "Le vaillant Nicomède déjoue les intrigues de sa belle-mère et de Rome pour sauver son père et son trône : tragédie politique à l'ironie souveraine.",
  "sertorius": "Au cœur des guerres civiles romaines, le général Sertorius, réfugié en Espagne, est déchiré entre l'amour et la raison d'État.",
  "surena": "Suréna, général parthe victorieux, refuse un mariage politique par fidélité à son amour : dernière tragédie de Corneille, tout élégie.",
  "dipe": "Corneille reprend le mythe d'Œdipe, roi de Thèbes qui découvre avoir tué son père et épousé sa mère, en y mêlant une intrigue amoureuse.",
  "andromede": "Persée délivre Andromède enchaînée au monstre marin : tragédie à machines spectaculaire.",
  "toison-d-or": "Jason conquiert la Toison d'or grâce à la magicienne Médée : pièce à machines pour un mariage princier.",
  "theodore": "Théodore, vierge chrétienne, préfère le martyre au déshonneur : rare tragédie chrétienne de Corneille.",
  "heraclius": "Un empire byzantin où nul ne sait plus qui est le vrai héritier du trône : imbroglio tragique d'identités échangées.",
  "othon": "À Rome, les prétendants au trône impérial nouent et dénouent des mariages d'ambition.",
  "attila-roi-des-huns": "Attila, redoutable roi des Huns, tient deux rois vassaux et deux princesses sous sa coupe : tragédie de la terreur politique.",
  "sophonisbe": "La reine numide Sophonisbe préfère le poison à la captivité romaine : tragédie de l'orgueil africain.",
  "pertharite": "Roi lombard dépossédé, Pertharite revient réclamer femme et trône au tyran Grimoald.",
  "sertorius": "Réfugié en Espagne au temps des guerres civiles, le général Sertorius est pris entre l'amour et le devoir envers Rome.",
  "don-sanche-d-aragon": "Un inconnu de haute valeur, aimé de deux reines, se révèle prince : comédie héroïque sur le mérite et la naissance.",
  "tite-et-berenice": "L'empereur Tite doit renoncer à la reine Bérénice — la version de Corneille, rivale de celle de Racine la même année.",
  "pulcherie": "Impératrice de Byzance, Pulchérie doit se marier pour régner sans renoncer à son cœur.",
  "agesilas": "Le roi de Sparte arbitre les amours et les ambitions de sa cour : tragédie en vers libres.",
  "clitandre": "Rocambolesque tragi-comédie d'amours contrariés, d'embuscades et de reconnaissances.",
  # Thomas Corneille
  "ariane": "Abandonnée par Thésée pour sa propre sœur Phèdre, Ariane sombre dans le désespoir : la plus belle tragédie de Thomas Corneille.",
  "comte-d-essex": "Favori de la reine Élisabeth d'Angleterre, le comte d'Essex marche à l'échafaud, victime des intrigues de cour et de son orgueil.",
  "festin-de-pierre": "La version versifiée du Dom Juan de Molière : le grand seigneur libertin défie le Ciel jusqu'à l'engloutissement.",
  # Racine
  "plaideurs": "Un juge maniaque, un fils prodigue et des plaideurs acharnés : l'unique comédie de Racine, satire réjouissante de la justice.",
  "thebaide": "Les fils maudits d'Œdipe, Étéocle et Polynice, s'entre-déchirent pour le trône de Thèbes : première tragédie de Racine.",
  "mithridate": "Le roi Mithridate, ennemi juré de Rome, revient soupçonner ses deux fils rivaux auprès de sa fiancée Monime.",
  "iphigenie": "Pour que la flotte grecque cingle vers Troie, Agamemnon doit sacrifier sa fille Iphigénie : déchirement d'un père entre l'État et le sang.",
  "athalie": "La reine impie Athalie, qui a massacré sa descendance, est renversée par le jeune Joas caché dans le Temple : chef-d'œuvre biblique de Racine.",
  # Molière
  "precieuses-ridicules": "Deux provinciales entichées de préciosité éconduisent d'honnêtes prétendants ; ceux-ci se vengent en leur dépêchant leurs valets déguisés en marquis.",
  "ecole-des-maris": "Deux frères aux méthodes opposées élèvent leurs pupilles ; le jaloux Sganarelle est joué par celle qu'il croyait mater.",
  "ecole-des-femmes": "Arnolphe élève Agnès dans l'ignorance pour en faire une épouse docile ; l'amour et la candeur de la jeune fille déjouent tous ses calculs.",
  "impromptu-de-versailles": "Molière et sa troupe se mettent en scène en pleine répétition : comédie sur le théâtre et riposte aux ennemis de L'École des femmes.",
  "mariage-force": "Sganarelle, quinquagénaire, veut épouser une coquette ; philosophes et devins consultés ne le tirent pas de son embarras. Comédie-ballet.",
  "monsieur-de-pourceaugnac": "Pour évincer un prétendant provincial, on accable le pauvre Pourceaugnac de médecins, de fausses épouses et d'avanies : comédie-ballet endiablée.",
  "femmes-savantes": "Dans une maison gagnée par le pédantisme, la douce Henriette lutte pour épouser Clitandre contre les lubies savantes de sa mère et le fat Trissotin.",
  "melicerte": "Comédie pastorale héroïque inachevée : amours de bergers dans la vallée de Tempé.",
  # Marivaux
  "surprise-de-l-amour": "Un misanthrope et une veuve ennemie des hommes se croient à l'abri du sentiment : l'amour les surprend malgré eux.",
  "seconde-surprise-de-l-amour": "Une marquise en deuil et un chevalier délaissé se lient d'amitié ; l'amour, encore, les prend au dépourvu.",
  "prince-travesti": "Un prince déguisé en simple aventurier gagne le cœur d'une princesse : jeux du rang et de la sincérité.",
  "ile-des-esclaves": "Sur une île utopique, maîtres et valets échangent leurs conditions : leçon d'humanité et satire des rapports sociaux.",
  "ile-de-la-raison": "Des Européens échoués chez les géants de l'Île de la Raison ne retrouvent taille humaine qu'en reconnaissant leurs travers.",
  "triomphe-de-l-amour": "Une princesse se déguise pour séduire un jeune homme élevé dans la haine de l'amour, et le philosophe qui le garde.",
  "fausse-suivante-ou-le-fourbe-puni": "Une jeune fille déguisée en chevalier démasque un séducteur intéressé : le fourbe puni.",
  "ecole-des-meres": "Une mère tyrannique veut marier sa fille à un barbon ; la jeunesse et l'amour l'emportent.",
  "mere-confidente": "Une mère se fait la confidente de sa fille pour guider son cœur sans le contraindre : marivaudage tendre.",
  "legs": "Un legs contraint deux cœurs timides à s'avouer leur amour à travers mille détours.",
  "epreuve": "Un riche amoureux met à l'épreuve la sincérité de celle qu'il aime en lui suscitant un rival.",
  "heureux-stratageme": "Pour reconquérir un cœur volage, on feint l'indifférence et de nouvelles amours : stratagème victorieux.",
  "annibal": "Réfugié à la cour de Bithynie, le grand Hannibal, traqué par Rome, choisit la mort plutôt que la trahison : unique tragédie de Marivaux.",
  "colonie": "Dans une colonie, les femmes se révoltent et réclament l'égalité des droits : comédie étonnamment moderne.",
  # Voltaire
  "oedipe": "La première tragédie de Voltaire reprend le destin d'Œdipe, roi de Thèbes rattrapé par l'oracle.",
  "alzire-ou-les-americains": "Au Pérou conquis, l'amour d'Alzire et le pardon chrétien triomphent de la cruauté des conquérants.",
  "fanatisme-ou-mahomet-le-prophete": "Voltaire dénonce le fanatisme religieux à travers un imposteur manipulant la foi jusqu'au crime.",
  "irene": "Dernière tragédie de Voltaire : une impératrice de Byzance déchirée entre l'amour et le devoir.",
  "femme-qui-a-raison": "Une épouse de bon sens ramène à la raison un mari despotique : comédie.",
  "agathocle": "Ultime tragédie de Voltaire, sur le tyran de Syracuse et ses fils.",
  # Beaumarchais
  "eugenie": "Une jeune fille séduite et abandonnée par un lord sauve son honneur : premier essai théâtral de Beaumarchais, drame bourgeois.",
  "mere-coupable": "Vingt ans après Le Mariage de Figaro, les Almaviva affrontent un traître ; Figaro déjoue une dernière fois l'intrigue : volet sombre de la trilogie.",
  # Hugo
  "roi-s-amuse": "Le bouffon Triboulet, qui pousse son roi à la débauche, voit sa propre fille victime de ce libertinage : drame qui inspira Rigoletto.",
  "marie-tudor": "Reine d'Angleterre, Marie Tudor sacrifie son favori à la raison d'État et à la vengeance : drame de la passion royale.",
  "burgraves": "Fresque médiévale des seigneurs du Rhin et du vieil empereur Barberousse revenu incognito : dernier grand drame de Hugo.",
  # Musset
  "fantasio": "Pour fuir ses dettes et l'ennui, Fantasio se fait bouffon du roi de Bavière et empêche, par pure fantaisie, un mariage politique.",
  "andre-del-sarto": "Le peintre André del Sarto, trahi par sa femme et son meilleur élève, voit s'effondrer son art et son bonheur : drame florentin.",
  "chandelier": "Une femme volage se sert d'un jeune naïf comme paravent (le « chandelier ») ; la sincérité du garçon bouleverse le jeu.",
  "il-ne-faut-jurer-de-rien": "Un jeune libertin parie qu'il séduira sans se marier : l'amour lui donne tort. Proverbe pétillant.",
  "barberine": "Une épouse vertueuse déjoue par la ruse un seigneur qui a parié de la séduire.",
  "carmosine": "Une jeune fille se meurt d'un amour secret pour le roi d'Aragon ; la générosité royale la sauve. D'après Boccace.",
  "caprice": "Un simple ruban et un caprice mettent un ménage en péril, que sauve une amie fine : proverbe délicat.",
  "il-faut-qu-une-porte-soit-ouverte-ou-fer": "Un marquis et une marquise ferraillent d'esprit jusqu'à s'avouer leur amour : le plus célèbre des proverbes de Musset.",
  "on-ne-saurait-penser-a-tout": "Proverbe léger : un distrait manque de tout gâcher, mais l'amour veille.",
  "nuit-venitienne": "À Venise, un amant délaissé prend le parti d'en rire et de jouir de la nuit : première pièce de Musset.",
  # Tchekhov
  "cerisaie": "Ruinée, la famille Ranevskaïa perd le domaine et sa cerisaie, rachetés par le fils d'un ancien serf : adieu élégiaque à un monde qui s'efface.",
  "trois-s-urs": "Les sœurs Prozorov rêvent de retourner à Moscou tandis que la vie de province étouffe peu à peu leurs espoirs.",
  "ivanov": "Un propriétaire désabusé, criblé de dettes et rongé par l'ennui, entraîne son entourage dans sa déroute morale.",
  "ce-fou-de-platonov": "Un instituteur séducteur et velléitaire sème le trouble parmi les femmes d'un domaine : première pièce, foisonnante, de Tchekhov.",
  "ours": "Une jeune veuve inconsolable et un créancier bourru passent de la dispute au coup de foudre : farce en un acte.",
  "demande-en-mariage": "Un prétendant maladroit vient demander une main mais s'enferre dans d'absurdes querelles de voisinage : vaudeville d'un acte.",
  "jubile": "Le jubilé d'une banque tourne au chaos entre un directeur harcelé et deux femmes envahissantes : farce.",
  "noce": "Un repas de noces vire au ridicule quand le faux général invité pour épater se révèle simple marin.",
  "mefaits-du-tabac": "Un mari terrorisé par sa femme donne une conférence sur les méfaits du tabac qui tourne à la confession : monologue tragi-comique.",
  "sur-la-grand-route": "Dans une auberge de grand chemin, un vagabond ruiné par l'amour croise celle qui l'a perdu : étude dramatique.",
  "chant-du-cygne": "Un vieux comédien, seul la nuit dans un théâtre vide, revit sa vie et son art devant un souffleur : bouleversante étude.",
  "sauvage": "Version première d'Oncle Vania : amours et désillusions dans un domaine de campagne.",
  # Ibsen
  "peer-gynt": "Fils de paysan hâbleur et rêveur, Peer Gynt court le monde de mensonge en illusion avant de revenir mourir près de celle qui l'attendait : poème dramatique.",
  "revenants": "Les fautes du passé et l'hérédité rattrapent une veuve et son fils malade : drame qui fit scandale.",
  "ennemi-du-peuple": "Un médecin découvre que les bains qui font vivre sa ville sont empoisonnés ; le dire fait de lui un « ennemi du peuple ».",
  "canard-sauvage": "Vouloir la vérité à tout prix détruit une famille qui vivait de ses illusions : parabole amère.",
  "hedda-gabler": "Enfermée dans un mariage sans amour, Hedda Gabler manipule son entourage jusqu'au drame, par ennui et soif de beauté.",
  "rosmersholm": "Dans un vieux manoir hanté par le passé, un pasteur et une femme libre s'aiment jusqu'à la faute et l'expiation.",
  "dame-de-la-mer": "Une femme fascinée par la mer et un marin d'autrefois choisit librement de rester : drame du désir et de la liberté.",
  "solness-le-constructeur": "Un architecte au faîte de la gloire, hanté par sa réussite, se laisse entraîner vers la chute par une jeune admiratrice.",
  "john-gabriel-borkman": "Un banquier déchu rumine sa grandeur perdue entre deux sœurs qu'il a sacrifiées : tragédie de l'orgueil et de l'argent.",
  # Dumas
  "henry-iii-et-sa-cour": "Intrigues sanglantes à la cour des derniers Valois : premier grand drame romantique.",
  "antony": "Amant maudit et fatal, Antony aime une femme mariée jusqu'au meurtre passionnel : manifeste du drame romantique.",
  "tour-de-nesle": "Reine criminelle et amours meurtrières dans le Paris médiéval : mélodrame flamboyant.",
  "kean": "Le grand acteur anglais Kean, adulé et déchiré entre la scène et la vie, entre passion et dignité.",
  # Balzac
  "vautrin": "Le génie du crime Vautrin, sous une fausse identité, protège un jeune homme et défie la société : drame.",
  "maratre": "Une belle-mère et sa belle-fille aiment le même homme ; la jalousie conduit au poison : drame intime et implacable.",
  "ressources-de-quinola": "Comédie d'intrigue autour d'un inventeur et de son valet retors dans l'Espagne de Philippe II.",
  # Feydeau
  "dame-de-chez-maxim": "Un médecin rangé se réveille après une nuit de fête avec une danseuse dans son lit : la Môme Crevette met sa vie sens dessus dessous.",
  "puce-a-l-oreille": "Un soupçon de jalousie, un piège dans un hôtel galant et des sosies : la mécanique du quiproquo portée à l'incandescence.",
  "occupe-toi-d-amelie": "Une cocotte accepte de jouer les épouses le temps d'un faux mariage : l'imbroglio devient bien réel. Vaudeville étourdissant.",
  "feu-la-mere-de-madame": "En pleine nuit, un couple épuisé apprend une fausse nouvelle de deuil : dispute conjugale hilarante en un acte.",
  "on-purge-bebe": "Entre un marché de pots incassables et un enfant récalcitrant, un ménage se déchire : farce conjugale.",
  "tailleur-pour-dames": "Un mari volage multiplie mensonges et cachotteries qui se retournent contre lui : premier grand succès de Feydeau.",
  "champignol-malgre-lui": "Un homme est pris pour un peintre appelé au régiment et doit faire son service à sa place : quiproquo militaire.",
  "monsieur-chasse": "« Monsieur chasse » — mais pas le gibier qu'on croit : maris et amants se croisent dans un vaudeville réglé au cordeau.",
  "hotel-du-libre-echange": "Un hôtel de rendez-vous réunit par malheur tous ceux qui ne devaient pas s'y croiser : nuit de quiproquos.",
  "mais-n-te-promene-donc-pas-toute-nue": "Une épouse trop naturelle compromet la carrière politique de son mari : farce en un acte.",
  "systeme-ribadier": "Un mari infidèle a mis au point un système pour endormir sa femme et sortir la nuit : le stratagème se retourne contre lui.",
  "chat-en-poche": "Un provincial croit acheter un ténor et récolte un cancre : quiproquo en cascade.",
  # Labiche
  "chapeau-de-paille-d-italie": "Le jour de son mariage, Fadinard court tout Paris remplacer un chapeau de paille mangé par son cheval : course-poursuite vaudevillesque irrésistible.",
  "cagnotte": "Des villageois montent à Paris dépenser leur cagnotte et enchaînent les catastrophes : satire jubilatoire de la province.",
  "affaire-de-la-rue-de-lourcine": "Deux bourgeois se réveillent persuadés d'avoir commis un crime pendant une beuverie oubliée : farce du remords absurde.",
  "embrassons-nous-folleville": "Course aux malentendus autour d'un mariage : un acte enlevé.",
  "poudre-aux-yeux": "Deux familles rivalisent d'esbroufe pour marier leurs enfants : satire des apparences bourgeoises.",
  "deux-timides": "Deux timides incapables de s'affirmer manquent de tout rater : comédie tendre.",
  # Courteline
  "paix-chez-soi": "Un mari harcelé par sa femme pour de l'argent finit par retourner la situation : scène de ménage féroce.",
  "article-330": "Poursuivi pour outrage public, un excentrique plaide sa cause avec une logique désopilante devant le tribunal.",
  "commissaire-est-bon-enfant": "Au commissariat, l'arbitraire et l'absurde règnent avec bonhomie : satire de la police.",
  "boulingrin": "Un pique-assiette s'invite chez un couple qui se déteste et déclenche la guerre : farce grinçante.",
  "gendarme-est-sans-pitie": "Petites lâchetés et arbitraire ordinaire : saynète au vitriol de Courteline.",
  # Goldoni
  "arlequin-valet-de-deux-maitres": "Pour manger deux fois, Arlequin sert en secret deux maîtres à la fois et s'empêtre dans d'inextricables quiproquos.",
  "rustres": "Quatre bourrus vénitiens tyrannisent femmes et filles ; celles-ci s'allient pour déjouer leur despotisme.",
  # Lesage
  "turcaret": "Le financier Turcaret, parvenu vaniteux, est plumé par une coquette et son valet : satire mordante de l'argent.",
  "crispin-rival-de-son-maitre": "Le valet Crispin tente de se faire passer pour un beau parti : comédie d'intrigue.",
  # Diderot
  "pere-de-famille": "Un père tiraillé entre l'autorité et l'amour laisse ses enfants suivre leur cœur : drame bourgeois théorisé par Diderot.",
  "est-il-bon-est-il-mechant": "Un homme rend service à tous par des moyens retors et brusques : comédie sur l'ambiguïté de la bonté.",
  # Augier
  "fils-de-giboyer": "Comédie politique et sociale sur l'arrivisme et la presse sous le Second Empire.",
  # Jarry
  "ubu-enchaine": "Contrepoint d'Ubu roi : le Père Ubu veut à tout prix devenir esclave, dans un monde où la liberté est obligatoire. Farce absurde.",
  # Shakespeare
  "roi-lear": "Le vieux roi Lear partage son royaume selon la flatterie et rejette la seule fille qui l'aime : descente aux enfers de l'orgueil et de l'ingratitude.",
  "othello": "Manipulé par le perfide Iago, le Maure Othello étouffe de jalousie et tue Desdémone, son innocente épouse : tragédie de la calomnie.",
  # Compléments (pièces connues)
  "acteurs-de-bonne-foi": "Des valets répètent une comédie qui se confond peu à peu avec leurs vrais sentiments : subtile mise en abyme du théâtre et de l'amour.",
  "heritier-de-village": "Un paysan brusquement enrichi veut singer les manières nobles : satire enlevée de la vanité sociale.",
  "denouement-imprevu": "Un père veut marier sa fille contre son gré ; un dénouement inattendu délivre la jeune fille.",
  "joie-imprevue": "Un père retrouve son fils qui a joué tout son argent ; la joie des retrouvailles efface la faute.",
  "prejuge-vaincu": "Une jeune femme de qualité surmonte son préjugé de rang pour aimer un homme de moindre naissance.",
  "inconnu": "Une comtesse est courtisée par un galant qui garde l'anonymat et multiplie fêtes et prodiges pour se faire aimer : comédie à machines.",
  "petit-eyolf": "Après la noyade de leur enfant infirme, un couple affronte la culpabilité et tente de se reconstruire : drame intime d'Ibsen.",
  "quand-nous-nous-reveillerons-d-entre-les": "Un sculpteur vieillissant retrouve l'ancien modèle qui inspira son chef-d'œuvre : ultime drame d'Ibsen sur l'art et la vie manquée.",
  "monsieur-badin": "Un employé qui ne vient jamais au bureau explique à son chef, avec une mauvaise foi géniale, pourquoi il s'absente : monologue de la lâcheté ordinaire.",
  "amour-et-piano": "Un jeune homme sonne chez une cocotte en croyant venir pour le piano ; elle le prend pour un tout autre visiteur : quiproquo pétillant en un acte.",
  "par-la-fenetre": "Pour se venger d'un mari jaloux, une femme fait irruption par la fenêtre chez un voisin ahuri : farce conjugale en un acte.",
  "main-passe": "Vaudeville des ménages qui se trompent à tour de rôle ; un phonographe compromettant finit par tout faire éclater.",
  "ruban": "Un médecin obnubilé par la Légion d'honneur voit un autre récolter le ruban à sa place : satire de la vanité.",
  "celimare-le-bien-aime": "Un veuf sur le point de se remarier voit débarquer les maris de ses anciennes maîtresses, devenus des amis encombrants.",
  "tragedien-malgre-lui": "Accablé de commissions par sa famille pendant ses « vacances », un homme excédé finit par exploser : monologue-farce.",
  "achille": "Fragment de tragédie inachevée sur la colère d'Achille au siège de Troie.",
  "mangeront-ils": "Comédie féerique : deux amants réfugiés dans une forêt échappent à un roi tyrannique grâce à un mendiant sorcier.",
  # Compléments d'après les notices de fr.wikipedia (résumés reformulés)
  "29-degres-a-l-ombre": "Par une chaleur accablante, Pomadour surprend un invité inconnu embrassant sa femme et exige un duel : les atermoiements d'un mari sous la canicule.",
  "37-sous-de-m-montaudoin": "Le jour où il marie sa fille, M. Montaudoin s'obstine à élucider un mystère : depuis vingt ans, on lui dérobe chaque jour exactement trente-sept sous.",
  "gros-chagrins": "Gabrielle découvre dans la poche de son mari la lettre d'une autre femme et s'en ouvre à son amie Caroline : petite scène acide de la jalousie conjugale.",
  "client-serieux": "Un substitut menacé par un avocat ambitieux voit celui-ci commis d'office pour défendre un prévenu : la mécanique judiciaire tourne à l'absurde.",
  "dormez-je-le-veux": "Le valet Justin, hypnotiseur, fait faire son service par son propre maître et sabote le mariage de celui-ci pour préserver sa combine : vaudeville d'un acte.",
  "gibier-de-potence": "Trompé par sa femme, l'herboriste Plumard dénonce anonymement l'amant à la police ; le quiproquo lui vaut d'être pris lui-même pour un malfaiteur.",
  "hortense-a-dit-je-m-en-fous": "Un dentiste débordé doit à la fois soigner ses patients et arbitrer la guerre entre sa femme et une bonne insolente qui a lâché un « Je m'en fous ! ».",
  "je-ne-trompe-pas-mon-mari": "Une femme qui refuse de tromper son mari déclenche malgré elle une cascade d'intrigues entre un peintre, un gigolo et une milliardaire américaine.",
  "leonie-est-en-avance-ou-le-mal-joli": "Une jeune femme sur le point d'accoucher tyrannise son mari et lui impose ses caprices les plus absurdes : farce conjugale en un acte.",
  "maman-sabouleux": "Le père Sabouleux se retrouve du jour au lendemain à devoir élever deux nourrissons : comédie mêlée de chants.",
  "meprise": "Deux sœurs blondes, vêtues de même et masquées, se promènent séparément ; leur soupirant les confond et s'enferre dans d'inextricables malentendus.",
  "paves-de-l-ours": "Décidé à rompre avec sa maîtresse pour un beau mariage, Lucien engage un valet de campagne « âme simple » dont la maladresse complique tout.",
  "pere-prudent-et-equitable": "Un père veut marier sa fille à l'un de trois partis ; le valet Crispin intrigue pour les écarter au profit de l'amant qu'elle préfère.",
}

def esc(s): return s.replace("\\", "\\\\").replace("'", "\\'")

def fiche(rec):
    an = rec["annee"]; genre = GENRE_OVERRIDE.get(rec["id"], GENRE_AUT.get(rec["auteur"], "comédie"))
    if rec["id"] in FH_OVERRIDE:
        f, h = FH_OVERRIDE[rec["id"]]
    else:
        h, f = split_fh(rec["roles"])
    dm, ds = duree(rec["nlignes"], rec["actes"])
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
