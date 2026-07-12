import type {
  FriseItem,
  Lieu,
  Collection,
  Monologue,
  Citation,
  GlossaireTerme,
} from './types';

// ─── Ères (couleurs README) ───
export const ERES = {
  Antiquité: '#c98b4e',
  'Moyen Âge': '#8e9e5a',
  Élisabéthain: '#5f8ea8',
  Classicisme: '#d4a94e',
  Romantisme: '#a85a72',
  Moderne: '#9e2b3a',
  Absurde: '#b0563a',
} as const;

// Frise curée : styles, événements et œuvres majeures. Les naissances d'auteurs
// sont ajoutées dynamiquement depuis DRAMATURGES par l'écran Frise.
export const FRISE: FriseItem[] = [
  // ─── Antiquité ───
  { id: 'thespis', ere: 'Antiquité', couleur: '#c98b4e', an: '~534 av. J.-C.', anNum: -534, type: 'evenement', titre: 'Thespis, premier acteur', txt: "Aux Grandes Dionysies d'Athènes, un homme sort du chœur : le théâtre est né." },
  { id: 'tragedie-grecque', ere: 'Antiquité', couleur: '#8e9e5a', an: 'Ve s. av. J.-C.', anNum: -480, type: 'style', titre: 'L\'âge de la tragédie grecque', txt: 'Eschyle, Sophocle et Euripide inventent la tragédie ; la comédie naît avec Aristophane.' },
  { id: 'antigone', ere: 'Antiquité', couleur: '#c98b4e', an: '~441 av. J.-C.', anNum: -441, type: 'oeuvre', pieceId: 'antigone-sophocle', titre: 'Antigone de Sophocle', txt: 'La tragédie grecque à son sommet — loi des hommes contre loi des dieux.' },
  { id: 'oedipe-roi', ere: 'Antiquité', couleur: '#c98b4e', an: '~430 av. J.-C.', anNum: -430, type: 'oeuvre', pieceId: 'oedipe-roi', titre: 'Œdipe roi de Sophocle', txt: "Le modèle même de la tragédie du destin, que commentera Aristote." },
  { id: 'grenouilles', ere: 'Antiquité', couleur: '#c98b4e', an: '405 av. J.-C.', anNum: -405, type: 'oeuvre', pieceId: 'les-grenouilles', titre: 'Les Grenouilles d\'Aristophane', txt: 'La comédie grecque met la poésie elle-même en procès aux Enfers.' },

  // ─── Moyen Âge ───
  { id: 'mysteres', ere: 'Moyen Âge', couleur: '#8e9e5a', an: 'XVe s.', anNum: 1450, type: 'style', titre: 'Mystères et farces', txt: 'Sur les parvis, la Passion se joue trois jours durant ; la farce de Maître Pathelin fait rire les foules.' },

  // ─── Élisabéthain ───
  { id: 'globe', ere: 'Élisabéthain', couleur: '#5f8ea8', an: '1599', anNum: 1599, type: 'evenement', titre: 'Le Globe ouvre à Londres', txt: 'La troupe de Shakespeare y créera Hamlet, Othello, Le Roi Lear.' },
  { id: 'romeo', ere: 'Élisabéthain', couleur: '#5f8ea8', an: '~1597', anNum: 1597, type: 'oeuvre', pieceId: 'romeo-juliette', titre: 'Roméo et Juliette', txt: 'Shakespeare porte au sommet la tragédie amoureuse.' },
  { id: 'hamlet-oeuvre', ere: 'Élisabéthain', couleur: '#5f8ea8', an: '~1601', anNum: 1601, type: 'oeuvre', pieceId: 'hamlet', titre: 'Hamlet', txt: '« Être ou ne pas être » — la tragédie du doute et de la conscience.' },
  { id: 'macbeth-oeuvre', ere: 'Élisabéthain', couleur: '#5f8ea8', an: '~1606', anNum: 1606, type: 'oeuvre', pieceId: 'macbeth', titre: 'Macbeth', txt: "L'ambition et le crime chez Shakespeare, sous le signe des sorcières." },

  // ─── Classicisme ───
  { id: 'classicisme', ere: 'Classicisme', couleur: '#8e9e5a', an: 'XVIIe s.', anNum: 1630, type: 'style', titre: 'Le classicisme français', txt: 'La règle des trois unités (temps, lieu, action) et la bienséance règnent sur la scène.' },
  { id: 'le-cid', ere: 'Classicisme', couleur: '#d4a94e', an: '1637', anNum: 1637, type: 'oeuvre', pieceId: 'le-cid', titre: 'Le Cid de Corneille', txt: "Triomphe et « Querelle du Cid » : l'honneur contre l'amour enflamme le public." },
  { id: 'tartuffe', ere: 'Classicisme', couleur: '#d4a94e', an: '1664', anNum: 1664, type: 'oeuvre', pieceId: 'tartuffe', titre: 'Tartuffe fait scandale', txt: 'Molière défie les dévots ; la pièce sera interdite cinq ans.' },
  { id: 'dom-juan', ere: 'Classicisme', couleur: '#d4a94e', an: '1665', anNum: 1665, type: 'oeuvre', pieceId: 'dom-juan', titre: 'Dom Juan', txt: 'Le grand seigneur libertin défie le Ciel — audace qui inquiète la cour.' },
  { id: 'misanthrope', ere: 'Classicisme', couleur: '#d4a94e', an: '1666', anNum: 1666, type: 'oeuvre', pieceId: 'le-misanthrope', titre: 'Le Misanthrope', txt: 'La plus haute comédie de Molière : Alceste contre le monde.' },
  { id: 'andromaque-oeuvre', ere: 'Classicisme', couleur: '#d4a94e', an: '1667', anNum: 1667, type: 'oeuvre', pieceId: 'andromaque', titre: 'Andromaque de Racine', txt: 'Racine impose la tragédie de la passion fatale.' },
  { id: 'phedre-oeuvre', ere: 'Classicisme', couleur: '#d4a94e', an: '1677', anNum: 1677, type: 'oeuvre', pieceId: 'phedre', titre: 'Phèdre', txt: 'Le chef-d\'œuvre de Racine — la passion coupable portée à l\'incandescence.' },
  { id: 'comedie-francaise', ere: 'Classicisme', couleur: '#a85a72', an: '1680', anNum: 1680, type: 'evenement', titre: 'Fondation de la Comédie-Française', txt: "Louis XIV réunit les troupes parisiennes : la « Maison de Molière » est née." },

  // ─── Lumières ───
  { id: 'barbier', ere: 'Lumières', couleur: '#d4a94e', an: '1775', anNum: 1775, type: 'oeuvre', pieceId: 'barbier-seville', titre: 'Le Barbier de Séville', txt: 'Beaumarchais lance Figaro, valet plus fin que ses maîtres.' },
  { id: 'mariage', ere: 'Lumières', couleur: '#d4a94e', an: '1784', anNum: 1784, type: 'oeuvre', pieceId: 'mariage-figaro', titre: 'Le Mariage de Figaro', txt: "La « folle journée » qui, dit-on, annonce la Révolution." },

  // ─── Romantisme ───
  { id: 'romantisme', ere: 'Romantisme', couleur: '#8e9e5a', an: '1830', anNum: 1829, type: 'style', titre: 'Le drame romantique', txt: 'Hugo (préface de Cromwell) brise les unités et mêle le sublime au grotesque.' },
  { id: 'hernani', ere: 'Romantisme', couleur: '#a85a72', an: '1830', anNum: 1830, type: 'evenement', pieceId: 'hernani', titre: "La bataille d'Hernani", txt: 'Hugo fait exploser les règles classiques — clameurs et pugilats dans la salle.' },
  { id: 'lorenzaccio-oeuvre', ere: 'Romantisme', couleur: '#a85a72', an: '1834', anNum: 1834, type: 'oeuvre', pieceId: 'lorenzaccio', titre: 'Lorenzaccio de Musset', txt: 'Le grand drame romantique du doute et de l\'action vaine.' },
  { id: 'ruy-blas-oeuvre', ere: 'Romantisme', couleur: '#a85a72', an: '1838', anNum: 1838, type: 'oeuvre', pieceId: 'ruy-blas', titre: 'Ruy Blas', txt: '« Ver de terre amoureux d\'une étoile » — le sommet du théâtre de Hugo.' },

  // ─── Théâtre moderne ───
  { id: 'realisme', ere: 'Moderne', couleur: '#8e9e5a', an: 'Fin XIXe s.', anNum: 1875, type: 'style', titre: 'Naissance du théâtre moderne', txt: 'Ibsen et Tchekhov inventent un théâtre de l\'intime et du réel ; naît la mise en scène.' },
  { id: 'maison-poupee-oeuvre', ere: 'Moderne', couleur: '#5f8ea8', an: '1879', anNum: 1879, type: 'oeuvre', pieceId: 'maison-poupee', titre: 'Une maison de poupée', txt: "Ibsen : Nora claque la porte — scandale et acte fondateur du théâtre moderne." },
  { id: 'mouette-oeuvre', ere: 'Moderne', couleur: '#5f8ea8', an: '1896', anNum: 1896, type: 'oeuvre', pieceId: 'la-mouette', titre: 'La Mouette de Tchekhov', txt: 'Un four à sa création, un triomphe deux ans plus tard au Théâtre d\'Art de Moscou.' },
  { id: 'ubu', ere: 'Moderne', couleur: '#9e2b3a', an: '1896', anNum: 1896, type: 'evenement', pieceId: 'ubu-roi', titre: 'Ubu roi', txt: '« Merdre ! » — Jarry ouvre la voie aux avant-gardes du XXe siècle.' },
  { id: 'cyrano-oeuvre', ere: 'Moderne', couleur: '#d4a94e', an: '1897', anNum: 1897, type: 'oeuvre', pieceId: 'cyrano', titre: 'Cyrano de Bergerac', txt: 'Rostand offre un triomphe au drame en vers, à contre-courant de son époque.' },
  { id: 'cerisaie-oeuvre', ere: 'Moderne', couleur: '#5f8ea8', an: '1904', anNum: 1904, type: 'oeuvre', pieceId: 'cerisaie', titre: 'La Cerisaie', txt: 'Le testament théâtral de Tchekhov — un monde qui s\'efface.' },

  // ─── Absurde & contemporain ───
  { id: 'absurde', ere: 'Absurde', couleur: '#8e9e5a', an: 'Années 1950', anNum: 1950, type: 'style', titre: 'Le théâtre de l\'absurde', txt: 'Beckett, Ionesco, Adamov : le langage et le sens se délitent sur scène.' },
  { id: 'godot', ere: 'Absurde', couleur: '#b0563a', an: '1953', anNum: 1953, type: 'evenement', titre: 'En attendant Godot', txt: "Beckett met l'attente elle-même en scène ; le théâtre de l'absurde triomphe." },
];

export const LIEUX: Lieu[] = [
  // ─── Grands théâtres ───
  { id: 'epidaure', nom: "Théâtre d'Épidaure", lieu: 'Grèce · IVe s. av. J.-C.', txt: '14 000 places, acoustique légendaire.', initiale: 'É', img: 'Epidaurus Theater.jpg', type: 'theatre', lat: 37.596, lng: 23.079 },
  { id: 'dionysos', nom: 'Théâtre de Dionysos', lieu: "Athènes · Ve s. av. J.-C.", txt: 'Le berceau de la tragédie, au pied de l\'Acropole.', initiale: 'D', img: '', type: 'theatre', lat: 37.970, lng: 23.727 },
  { id: 'olimpico', nom: 'Teatro Olimpico', lieu: 'Vicence · 1585', txt: 'Le plus ancien théâtre couvert du monde, dessiné par Palladio.', initiale: 'O', img: '', type: 'theatre', lat: 45.549, lng: 11.548 },
  { id: 'comedie-francaise', nom: 'Comédie-Française', lieu: 'Paris · fondée en 1680', txt: 'La « Maison de Molière », plus ancienne troupe au monde.', initiale: 'C', img: 'Comédie-Française.jpg', type: 'theatre', lat: 48.863, lng: 2.336 },
  { id: 'globe', nom: "Shakespeare's Globe", lieu: 'Londres · reconstruit en 1997', txt: 'Théâtre élisabéthain à ciel ouvert, spectateurs debout.', initiale: 'G', img: 'Shakespeare’s Globe Theatre, London.jpg', type: 'theatre', lat: 51.508, lng: -0.097 },
  { id: 'garnier', nom: 'Palais Garnier', lieu: 'Paris · inauguré en 1875', txt: "Chef-d'œuvre du Second Empire, temple de l'opéra et du ballet.", initiale: 'G', img: 'Paris Opera full frontal architecture, May 2009.jpg', type: 'theatre', lat: 48.872, lng: 2.332 },
  { id: 'scala', nom: 'Teatro alla Scala', lieu: 'Milan · 1778', txt: 'La plus prestigieuse scène lyrique du monde.', initiale: 'S', img: '', type: 'theatre', lat: 45.467, lng: 9.189 },
  { id: 'bolshoi', nom: 'Théâtre Bolchoï', lieu: 'Moscou · 1825', txt: 'Haut lieu de l\'opéra et du ballet russes.', initiale: 'B', img: '', type: 'theatre', lat: 55.760, lng: 37.618 },
  { id: 'burgtheater', nom: 'Burgtheater', lieu: 'Vienne · 1741', txt: 'Le « Burg », l\'un des plus grands théâtres de langue allemande.', initiale: 'B', img: '', type: 'theatre', lat: 48.210, lng: 16.361 },
  { id: 'broadway', nom: 'Broadway', lieu: 'New York · quartier des théâtres', txt: 'Une quarantaine de salles autour de Times Square.', initiale: 'B', img: '', type: 'theatre', lat: 40.759, lng: -73.985 },
  { id: 'colon', nom: 'Teatro Colón', lieu: 'Buenos Aires · 1908', txt: 'Réputé pour son acoustique parmi les meilleures au monde.', initiale: 'C', img: '', type: 'theatre', lat: -34.601, lng: -58.383 },
  { id: 'sydney', nom: 'Opéra de Sydney', lieu: 'Australie · 1973', txt: 'Icône mondiale de l\'architecture, aux voiles de béton.', initiale: 'S', img: '', type: 'theatre', lat: -33.857, lng: 151.215 },

  // ─── Festivals ───
  { id: 'avignon', nom: "Festival d'Avignon", lieu: 'France · chaque juillet', txt: "Cour d'honneur du Palais des papes + 1 500 spectacles au Off.", initiale: 'A', img: 'Avignon, Palais des Papes by JM Rosier.jpg', type: 'festival', lat: 43.951, lng: 4.807 },
  { id: 'edimbourg', nom: 'Edinburgh Fringe', lieu: 'Écosse · chaque août', txt: 'Le plus grand festival des arts du spectacle au monde.', initiale: 'E', img: '', type: 'festival', lat: 55.953, lng: -3.188 },
  { id: 'epidaure-festival', nom: "Festival d'Athènes-Épidaure", lieu: 'Grèce · chaque été', txt: 'Les tragédies grecques rejouées dans les théâtres antiques.', initiale: 'É', img: '', type: 'festival', lat: 37.972, lng: 23.726 },
  { id: 'bitef', nom: 'BITEF', lieu: 'Belgrade · chaque automne', txt: 'Grand festival des nouvelles tendances du théâtre.', initiale: 'B', img: '', type: 'festival', lat: 44.816, lng: 20.460 },
  { id: 'almada', nom: 'Festival d\'Almada', lieu: 'Portugal · chaque juillet', txt: 'Rendez-vous majeur du théâtre en péninsule ibérique.', initiale: 'A', img: '', type: 'festival', lat: 38.677, lng: -9.158 },

  // ─── Traditions ───
  { id: 'kabuki', nom: 'Kabuki-za', lieu: 'Tokyo · Japon', txt: 'Le grand théâtre du kabuki ; le nô, plus ancien, lui est proche.', initiale: 'K', img: '', type: 'tradition', lat: 35.669, lng: 139.767 },
  { id: 'opera-pekin', nom: 'Opéra de Pékin', lieu: 'Chine · depuis 1790', txt: 'Chant, mime, acrobatie et maquillages codifiés (jingju).', initiale: 'P', img: '', type: 'tradition', lat: 39.905, lng: 116.391 },
  { id: 'kathakali', nom: 'Kathakali', lieu: 'Kerala · Inde', txt: 'Théâtre dansé aux costumes et maquillages spectaculaires.', initiale: 'K', img: '', type: 'tradition', lat: 10.850, lng: 76.271 },
  { id: 'commedia', nom: "Commedia dell'arte", lieu: 'Venise · Italie', txt: 'Masques et types (Arlequin, Pantalon) improvisant sur canevas.', initiale: 'C', img: '', type: 'tradition', lat: 45.440, lng: 12.316 },
  { id: 'wayang', nom: 'Wayang kulit', lieu: 'Java · Indonésie', txt: 'Théâtre d\'ombres avec marionnettes de cuir découpé.', initiale: 'W', img: '', type: 'tradition', lat: -7.797, lng: 110.370 },

  // ─── Écoles ───
  { id: 'cnsad', nom: 'Conservatoire (CNSAD)', lieu: 'Paris · 1786', txt: "Le Conservatoire national supérieur d'art dramatique.", initiale: 'C', img: '', type: 'ecole', lat: 48.872, lng: 2.345 },
  { id: 'lecoq', nom: 'École Jacques Lecoq', lieu: 'Paris · 1956', txt: 'École internationale du mouvement, du mime et du jeu.', initiale: 'L', img: '', type: 'ecole', lat: 48.867, lng: 2.363 },
  { id: 'rada', nom: 'RADA', lieu: 'Londres · 1904', txt: 'Royal Academy of Dramatic Art, école britannique de référence.', initiale: 'R', img: '', type: 'ecole', lat: 51.522, lng: -0.130 },
  { id: 'actors-studio', nom: 'Actors Studio', lieu: 'New York · 1947', txt: 'Berceau de la Méthode (Strasberg, Brando, De Niro).', initiale: 'A', img: '', type: 'ecole', lat: 40.764, lng: -73.992 },
  { id: 'gitis', nom: 'GITIS', lieu: 'Moscou · 1878', txt: 'Grande école russe, héritière de Stanislavski.', initiale: 'G', img: '', type: 'ecole', lat: 55.766, lng: 37.607 },
];

export const COLLECTIONS: Collection[] = [
  { id: 'incontournables', titre: 'Les 100 pièces incontournables', nb: '100 pièces', initiale: 'C', fond: 'linear-gradient(140deg,#7a1f2b,#43101a)', img: '' },
  { id: 'tragedies-grecques', titre: 'Les grandes tragédies grecques', nb: '18 pièces', initiale: 'Τ', fond: 'linear-gradient(140deg,#8a6a3a,#4a3416)', img: 'Sophocles pushkin.jpg' },
  { id: 'moliere', titre: 'Le théâtre de Molière', nb: '33 pièces', initiale: 'M', fond: 'linear-gradient(140deg,#3a4a6a,#1c2436)', img: 'Pierre Mignard - Portrait de Jean-Baptiste Poquelin dit Molière (1622-1673) - Google Art Project.jpg' },
  { id: 'shakespeare', titre: 'Shakespeare en 20 œuvres', nb: '20 pièces', initiale: 'S', fond: 'linear-gradient(140deg,#4a5a3a,#242e1a)', img: 'Shakespeare.jpg' },
  { id: 'femmes', titre: 'Les femmes dramaturges', nb: '24 autrices', initiale: 'F', fond: 'linear-gradient(140deg,#6a3a5a,#32182a)', img: 'George Sand by Nadar, 1864.jpg' },
  { id: 'absurde', titre: "Le théâtre de l'absurde", nb: '12 pièces', initiale: 'A', fond: 'linear-gradient(140deg,#3a3a3a,#1a1a1a)', img: '' },
];

// Époque : Classique = XVIIe-XVIIIe (+ antique/élisabéthain) ; Contemporain = XIXe-XXe (romantiques, modernes).
export const MONOLOGUES: Monologue[] = [
  // ─── Molière ───
  { id: 'harpagon-cassette', titre: 'Harpagon et sa cassette', source: "L'Avare, acte IV — Molière", pieceId: 'lavare', extrait: "« Au voleur ! au voleur ! à l'assassin ! au meurtrier ! »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Mûr', emotion: 'Panique', niveau: 'Intermédiaire', epoque: 'Classique' },
  { id: 'alceste-sincere', titre: 'La profession de foi d\'Alceste', source: 'Le Misanthrope, acte I — Molière', pieceId: 'le-misanthrope', extrait: "« Je veux qu'on soit sincère, et qu'en homme d'honneur, on ne lâche aucun mot qui ne parte du cœur. »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Adulte', emotion: 'Colère', niveau: 'Intermédiaire', epoque: 'Classique' },
  { id: 'dom-juan-hypocrisie', titre: "L'éloge de l'hypocrisie", source: 'Dom Juan, acte V — Molière', pieceId: 'dom-juan', extrait: "« L'hypocrisie est un vice à la mode, et tous les vices à la mode passent pour vertus. »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', age: 'Adulte', emotion: 'Cynisme', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'sganarelle-tabac', titre: "L'éloge du tabac", source: 'Dom Juan, acte I — Molière', pieceId: 'dom-juan', extrait: "« Quoi que puisse dire Aristote et toute la philosophie, il n'est rien d'égal au tabac. »", dureeMin: 1, duree: '≈ 1 min', pour: 'Homme', age: 'Adulte', emotion: 'Comique', niveau: 'Facile', epoque: 'Classique' },
  { id: 'arnolphe-jalousie', titre: 'La jalousie d\'Arnolphe', source: "L'École des femmes, acte IV — Molière", pieceId: 'ecole-des-femmes', extrait: "« Ciel ! faut-il que le sort, par un souci cuisant, trouble ainsi le repos d'un homme innocent ? »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Mûr', emotion: 'Jalousie', niveau: 'Intermédiaire', epoque: 'Classique' },

  // ─── Corneille ───
  { id: 'stances-cid', titre: 'Les stances de Rodrigue', source: 'Le Cid, acte I — Corneille', pieceId: 'le-cid', extrait: "« Percé jusques au fond du cœur / D'une atteinte imprévue aussi bien que mortelle… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', age: 'Jeune', emotion: 'Déchirement', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'don-diegue', titre: "Ô rage ! ô désespoir !", source: 'Le Cid, acte I — Corneille', pieceId: 'le-cid', extrait: "« Ô rage ! ô désespoir ! ô vieillesse ennemie ! N'ai-je donc tant vécu que pour cette infamie ? »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Mûr', emotion: 'Désespoir', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'auguste-clemence', titre: 'La délibération d\'Auguste', source: 'Cinna, acte IV — Corneille', pieceId: 'cinna', extrait: "« Ciel, à qui voulez-vous désormais que je fie / Les secrets de mon âme et le soin de ma vie ? »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', age: 'Mûr', emotion: 'Délibération', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'medee-vengeance', titre: 'Médée seule contre tous', source: 'Médée, acte I — Corneille', pieceId: 'medee-corneille', extrait: "« Dans un si grand revers que vous reste-t-il ? — Moi, / Moi, dis-je, et c'est assez. »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', age: 'Adulte', emotion: 'Vengeance', niveau: 'Difficile', epoque: 'Classique' },

  // ─── Racine ───
  { id: 'phedre-aveu', titre: 'Phèdre avoue sa passion', source: 'Phèdre, acte II — Racine', pieceId: 'phedre', extrait: "« Oui, prince, je languis, je brûle pour Thésée… »", dureeMin: 2, duree: '≈ 2 min 30', pour: 'Femme', age: 'Adulte', emotion: 'Passion', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'hermione-fureur', titre: 'La fureur d\'Hermione', source: 'Andromaque, acte V — Racine', pieceId: 'andromaque', extrait: "« Où suis-je ? Qu'ai-je fait ? Que dois-je faire encore ? »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', age: 'Jeune', emotion: 'Fureur', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'andromaque-hector', titre: 'Andromaque fidèle à Hector', source: 'Andromaque, acte III — Racine', pieceId: 'andromaque', extrait: "« Songe, songe, Céphise, à cette nuit cruelle / Qui fut pour tout un peuple une nuit éternelle… »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', age: 'Adulte', emotion: 'Fidélité', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'berenice-adieu', titre: 'Les adieux de Bérénice', source: 'Bérénice, acte IV — Racine', pieceId: 'berenice', extrait: "« Pour jamais ! Ah, Seigneur ! songez-vous en vous-même / Combien ce mot cruel est affreux quand on aime ? »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', age: 'Adulte', emotion: 'Douleur', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'neron-monstre', titre: 'Néron amoureux de Junie', source: 'Britannicus, acte II — Racine', pieceId: 'britannicus', extrait: "« Excité d'un désir curieux, / Cette nuit je l'ai vue arriver en ces lieux… »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Jeune', emotion: 'Trouble', niveau: 'Difficile', epoque: 'Classique' },

  // ─── Beaumarchais ───
  { id: 'figaro-monologue', titre: 'Le monologue de Figaro', source: 'Le Mariage de Figaro, acte V — Beaumarchais', pieceId: 'mariage-figaro', extrait: "« Ô femme ! femme ! femme ! créature faible et décevante !… »", dureeMin: 5, duree: '≈ 5 min', pour: 'Homme', age: 'Adulte', emotion: 'Révolte', niveau: 'Difficile', epoque: 'Classique' },

  // ─── Marivaux ───
  { id: 'silvia-trouble', titre: 'Le trouble de Silvia', source: "Le Jeu de l'amour et du hasard, acte II — Marivaux", pieceId: 'le-jeu-amour-hasard', extrait: "« Ah ! je vois clair dans mon cœur. »", dureeMin: 1, duree: '≈ 1 min 30', pour: 'Femme', age: 'Jeune', emotion: 'Trouble', niveau: 'Intermédiaire', epoque: 'Classique' },

  // ─── Shakespeare ───
  { id: 'etre-ou-ne-pas', titre: 'Être ou ne pas être', source: 'Hamlet, acte III — Shakespeare', pieceId: 'hamlet', extrait: "« Être, ou ne pas être, telle est la question… »", dureeMin: 2, duree: '≈ 2 min', pour: 'Mixte', age: 'Jeune', emotion: 'Doute', niveau: 'Intermédiaire', epoque: 'Classique' },
  { id: 'macbeth-poignard', titre: 'Le poignard de Macbeth', source: 'Macbeth, acte II — Shakespeare', pieceId: 'macbeth', extrait: "« Est-ce un poignard que je vois là devant moi, le manche tourné vers ma main ? »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Adulte', emotion: 'Angoisse', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'lady-macbeth', titre: 'Le somnambulisme de Lady Macbeth', source: 'Macbeth, acte V — Shakespeare', pieceId: 'macbeth', extrait: "« Va-t'en, tache maudite ! va-t'en, dis-je ! »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', age: 'Adulte', emotion: 'Folie', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'macbeth-vie', titre: "« La vie n'est qu'une ombre »", source: 'Macbeth, acte V — Shakespeare', pieceId: 'macbeth', extrait: "« Demain, et demain, et demain se glisse à petits pas de jour en jour… »", dureeMin: 1, duree: '≈ 1 min 30', pour: 'Homme', age: 'Adulte', emotion: 'Désespoir', niveau: 'Intermédiaire', epoque: 'Classique' },

  // ─── Sophocle ───
  { id: 'antigone-loi', titre: 'Antigone face à Créon', source: 'Antigone — Sophocle', pieceId: 'antigone-sophocle', extrait: "« Ce n'est pas Zeus qui avait proclamé pour moi cet ordre… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Femme', age: 'Jeune', emotion: 'Colère', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'oedipe-lumiere', titre: "L'aveuglement d'Œdipe", source: 'Œdipe roi — Sophocle', pieceId: 'oedipe-roi', extrait: "« Ô lumière, que je te voie aujourd'hui pour la dernière fois ! »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Adulte', emotion: 'Effroi', niveau: 'Difficile', epoque: 'Classique' },

  // ─── Musset (romantique) ───
  { id: 'camille-amour', titre: 'La tirade de Camille', source: "On ne badine pas avec l'amour, acte II — Musset", pieceId: 'on-ne-badine-pas', extrait: "« Adieu, Perdican. »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', age: 'Jeune', emotion: 'Amertume', niveau: 'Intermédiaire', epoque: 'Contemporain' },
  { id: 'perdican-amour', titre: "L'aveu de Perdican", source: "On ne badine pas avec l'amour, acte II — Musset", pieceId: 'on-ne-badine-pas', extrait: "« Tous les hommes sont menteurs, inconstants… mais il y a au monde quelque chose de saint et de sublime… »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Jeune', emotion: 'Passion', niveau: 'Intermédiaire', epoque: 'Contemporain' },
  { id: 'lorenzo-confession', titre: 'La confession de Lorenzo', source: 'Lorenzaccio, acte III — Musset', pieceId: 'lorenzaccio', extrait: "« Je suis plus creux et plus vide qu'une statue de fer-blanc. »", dureeMin: 4, duree: '≈ 4 min', pour: 'Homme', age: 'Jeune', emotion: 'Désabusement', niveau: 'Difficile', epoque: 'Contemporain' },

  // ─── Hugo (romantique) ───
  { id: 'ruy-blas-ministres', titre: '« Bon appétit, messieurs ! »', source: 'Ruy Blas, acte III — Hugo', pieceId: 'ruy-blas', extrait: "« Bon appétit, messieurs ! Ô ministres intègres ! Conseillers vertueux ! Voilà votre façon de servir… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', age: 'Adulte', emotion: 'Colère', niveau: 'Difficile', epoque: 'Contemporain' },
  { id: 'hernani-force', titre: '« Je suis une force qui va ! »', source: 'Hernani, acte III — Hugo', pieceId: 'hernani', extrait: "« Tu me crois peut-être / Un homme comme sont tous les autres… Je suis une force qui va ! »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', age: 'Jeune', emotion: 'Fatalité', niveau: 'Difficile', epoque: 'Contemporain' },

  // ─── Rostand (moderne) ───
  { id: 'tirade-nez', titre: 'La tirade du nez', source: 'Cyrano de Bergerac, acte I — Rostand', pieceId: 'cyrano', extrait: "« Ah ! non ! c'est un peu court, jeune homme ! On pouvait dire… oh ! Dieu ! bien des choses en somme… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', age: 'Adulte', emotion: 'Panache', niveau: 'Difficile', epoque: 'Contemporain' },
  { id: 'cyrano-non-merci', titre: 'La tirade des « non, merci »', source: 'Cyrano de Bergerac, acte II — Rostand', pieceId: 'cyrano', extrait: "« Et que faudrait-il faire ? … Non, merci. Non, merci. Non, merci ! Mais… chanter, rêver, rire, passer, être seul, être libre… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', age: 'Adulte', emotion: 'Fierté', niveau: 'Difficile', epoque: 'Contemporain' },

  // ─── Jarry (moderne) ───
  { id: 'pere-ubu-finances', titre: 'Ubu et les finances', source: 'Ubu roi, acte III — Jarry', pieceId: 'ubu-roi', extrait: "« Cornegidouille ! nous allons faire notre grande machine à décerveler ! »", dureeMin: 1, duree: '≈ 1 min', pour: 'Homme', age: 'Adulte', emotion: 'Grotesque', niveau: 'Facile', epoque: 'Contemporain' },
];

export const CITATIONS: Citation[] = [
  // ─── Molière ───
  { id: 'moliere-corriger', txt: '« Le devoir de la comédie étant de corriger les hommes en les divertissant. »', src: 'MOLIÈRE — Premier placet au roi', auteur: 'Molière', theme: 'Le théâtre', emotion: 'Ironie' },
  { id: 'moliere-pauvre-homme', txt: '« Le pauvre homme ! »', src: 'MOLIÈRE — Tartuffe', auteur: 'Molière', pieceId: 'tartuffe', theme: 'Vérité', emotion: 'Aveuglement' },
  { id: 'moliere-couvrez', txt: '« Couvrez ce sein que je ne saurais voir. »', src: 'MOLIÈRE — Tartuffe', auteur: 'Molière', pieceId: 'tartuffe', theme: 'Vérité', emotion: 'Hypocrisie' },
  { id: 'moliere-sans-dot', txt: '« Sans dot ! »', src: "MOLIÈRE — L'Avare", auteur: 'Molière', pieceId: 'lavare', theme: 'Pouvoir', emotion: 'Avarice' },
  { id: 'moliere-manger', txt: '« Il faut manger pour vivre, et non pas vivre pour manger. »', src: "MOLIÈRE — L'Avare", auteur: 'Molière', pieceId: 'lavare', theme: 'Vérité', emotion: 'Sagesse' },
  { id: 'moliere-mourir', txt: "« On ne meurt qu'une fois, et c'est pour si longtemps ! »", src: 'MOLIÈRE — Le Dépit amoureux', auteur: 'Molière', theme: 'Mort', emotion: 'Ironie' },
  { id: 'moliere-prose', txt: "« Il y a plus de quarante ans que je dis de la prose sans que j'en susse rien. »", src: 'MOLIÈRE — Le Bourgeois gentilhomme', auteur: 'Molière', pieceId: 'bourgeois-gentilhomme', theme: 'Le théâtre', emotion: 'Naïveté' },
  { id: 'moliere-hypocrisie', txt: "« L'hypocrisie est un vice à la mode, et tous les vices à la mode passent pour vertus. »", src: 'MOLIÈRE — Dom Juan', auteur: 'Molière', pieceId: 'dom-juan', theme: 'Vérité', emotion: 'Cynisme' },

  // ─── Corneille ───
  { id: 'corneille-hais', txt: '« Va, je ne te hais point. »', src: 'CORNEILLE — Le Cid', auteur: 'Corneille', pieceId: 'le-cid', theme: 'Amour', emotion: 'Déchirement' },
  { id: 'corneille-maitre', txt: "« Je suis maître de moi comme de l'univers. »", src: 'CORNEILLE — Cinna', auteur: 'Corneille', pieceId: 'cinna', theme: 'Pouvoir', emotion: 'Grandeur' },
  { id: 'corneille-vaincre', txt: '« À vaincre sans péril, on triomphe sans gloire. »', src: 'CORNEILLE — Le Cid', auteur: 'Corneille', pieceId: 'le-cid', theme: 'Honneur', emotion: 'Fierté' },
  { id: 'corneille-rage', txt: '« Ô rage ! ô désespoir ! ô vieillesse ennemie ! »', src: 'CORNEILLE — Le Cid', auteur: 'Corneille', pieceId: 'le-cid', theme: 'Temps', emotion: 'Désespoir' },
  { id: 'corneille-valeur', txt: "« Aux âmes bien nées, la valeur n'attend point le nombre des années. »", src: 'CORNEILLE — Le Cid', auteur: 'Corneille', pieceId: 'le-cid', theme: 'Honneur', emotion: 'Fierté' },
  { id: 'corneille-coeur', txt: '« Rodrigue, as-tu du cœur ? — Tout autre que mon père… »', src: 'CORNEILLE — Le Cid', auteur: 'Corneille', pieceId: 'le-cid', theme: 'Honneur', emotion: 'Devoir' },

  // ─── Racine ───
  { id: 'racine-forets', txt: '« Dans le fond des forêts votre image me suit. »', src: 'RACINE — Phèdre', auteur: 'Racine', pieceId: 'phedre', theme: 'Amour', emotion: 'Passion' },
  { id: 'racine-venus', txt: "« C'est Vénus tout entière à sa proie attachée. »", src: 'RACINE — Phèdre', auteur: 'Racine', pieceId: 'phedre', theme: 'Amour', emotion: 'Passion' },
  { id: 'racine-vis', txt: '« Je le vis, je rougis, je pâlis à sa vue. »', src: 'RACINE — Phèdre', auteur: 'Racine', pieceId: 'phedre', theme: 'Amour', emotion: 'Trouble' },
  { id: 'racine-jour', txt: '« Que le jour recommence et que le jour finisse, / Sans que jamais Titus puisse voir Bérénice. »', src: 'RACINE — Bérénice', auteur: 'Racine', pieceId: 'berenice', theme: 'Amour', emotion: 'Douleur' },
  { id: 'racine-etouffer', txt: "« J'embrasse mon rival, mais c'est pour l'étouffer. »", src: 'RACINE — Britannicus', auteur: 'Racine', pieceId: 'britannicus', theme: 'Pouvoir', emotion: 'Perfidie' },

  // ─── Beaumarchais ───
  { id: 'beaumarchais-aime', txt: "« Qu'il est doux d'être aimé pour soi-même ! »", src: 'BEAUMARCHAIS — Le Barbier de Séville', auteur: 'Beaumarchais', pieceId: 'barbier-seville', theme: 'Amour', emotion: 'Tendresse' },
  { id: 'beaumarchais-rire', txt: "« Je me presse de rire de tout, de peur d'être obligé d'en pleurer. »", src: 'BEAUMARCHAIS — Le Barbier de Séville', auteur: 'Beaumarchais', pieceId: 'barbier-seville', theme: 'Vérité', emotion: 'Mélancolie' },
  { id: 'beaumarchais-genie', txt: '« Parce que vous êtes un grand seigneur, vous vous croyez un grand génie ! »', src: 'BEAUMARCHAIS — Le Mariage de Figaro', auteur: 'Beaumarchais', pieceId: 'mariage-figaro', theme: 'Pouvoir', emotion: 'Révolte' },
  { id: 'beaumarchais-liberte', txt: "« Sans la liberté de blâmer, il n'est point d'éloge flatteur. »", src: 'BEAUMARCHAIS — Le Mariage de Figaro', auteur: 'Beaumarchais', pieceId: 'mariage-figaro', theme: 'Liberté', emotion: 'Fierté' },

  // ─── Shakespeare ───
  { id: 'shakespeare-theatre', txt: "« Le monde entier est un théâtre, et tous, hommes et femmes, n'en sont que les acteurs. »", src: 'SHAKESPEARE — Comme il vous plaira', auteur: 'Shakespeare', theme: 'Le théâtre', emotion: 'Sagesse' },
  { id: 'shakespeare-etre', txt: '« Être, ou ne pas être : telle est la question. »', src: 'SHAKESPEARE — Hamlet', auteur: 'Shakespeare', pieceId: 'hamlet', theme: 'Mort', emotion: 'Doute' },
  { id: 'shakespeare-pourri', txt: '« Il y a quelque chose de pourri au royaume de Danemark. »', src: 'SHAKESPEARE — Hamlet', auteur: 'Shakespeare', pieceId: 'hamlet', theme: 'Pouvoir', emotion: 'Soupçon' },
  { id: 'shakespeare-mots', txt: '« Des mots, des mots, des mots. »', src: 'SHAKESPEARE — Hamlet', auteur: 'Shakespeare', pieceId: 'hamlet', theme: 'Vérité', emotion: 'Ironie' },
  { id: 'shakespeare-ombre', txt: "« La vie n'est qu'une ombre qui marche, un pauvre acteur qui se pavane… »", src: 'SHAKESPEARE — Macbeth', auteur: 'Shakespeare', pieceId: 'macbeth', theme: 'Mort', emotion: 'Désespoir' },
  { id: 'shakespeare-romeo', txt: '« Roméo, Roméo ! Pourquoi es-tu Roméo ? »', src: 'SHAKESPEARE — Roméo et Juliette', auteur: 'Shakespeare', pieceId: 'romeo-juliette', theme: 'Amour', emotion: 'Passion' },

  // ─── Sophocle ───
  { id: 'sophocle-homme', txt: "« Il existe bien des merveilles en ce monde, il n'en est pas de plus grande que l'homme. »", src: 'SOPHOCLE — Antigone', auteur: 'Sophocle', pieceId: 'antigone-sophocle', theme: 'Destin', emotion: 'Gravité' },
  { id: 'sophocle-amour', txt: "« Je suis née pour partager l'amour et non la haine. »", src: 'SOPHOCLE — Antigone', auteur: 'Sophocle', pieceId: 'antigone-sophocle', theme: 'Amour', emotion: 'Conviction' },

  // ─── Victor Hugo ───
  { id: 'hugo-force', txt: '« Je suis une force qui va ! »', src: 'HUGO — Hernani', auteur: 'Victor Hugo', pieceId: 'hernani', theme: 'Destin', emotion: 'Fatalité' },
  { id: 'hugo-appetit', txt: '« Bon appétit, messieurs ! Ô ministres intègres ! »', src: 'HUGO — Ruy Blas', auteur: 'Victor Hugo', pieceId: 'ruy-blas', theme: 'Pouvoir', emotion: 'Colère' },

  // ─── Musset ───
  { id: 'musset-badine', txt: "« On ne badine pas avec l'amour. »", src: "MUSSET — On ne badine pas avec l'amour", auteur: 'Musset', pieceId: 'on-ne-badine-pas', theme: 'Amour', emotion: 'Amertume' },
  { id: 'musset-creux', txt: "« Je suis plus creux et plus vide qu'une statue de fer-blanc. »", src: 'MUSSET — Lorenzaccio', auteur: 'Musset', pieceId: 'lorenzaccio', theme: 'Vérité', emotion: 'Désabusement' },

  // ─── Rostand ───
  { id: 'rostand-panache', txt: '« Mon panache. »', src: 'ROSTAND — Cyrano de Bergerac', auteur: 'Edmond Rostand', pieceId: 'cyrano', theme: 'Honneur', emotion: 'Panache' },
  { id: 'rostand-baiser', txt: "« Un baiser, mais à tout prendre, qu'est-ce ? Un serment fait d'un peu plus près… »", src: 'ROSTAND — Cyrano de Bergerac', auteur: 'Edmond Rostand', pieceId: 'cyrano', theme: 'Amour', emotion: 'Lyrisme' },
  { id: 'rostand-cap', txt: "« C'est un roc ! … c'est un pic ! … c'est un cap ! Que dis-je, c'est un cap ? … C'est une péninsule ! »", src: 'ROSTAND — Cyrano de Bergerac', auteur: 'Edmond Rostand', pieceId: 'cyrano', theme: 'Le théâtre', emotion: 'Panache' },

  // ─── Jarry ───
  { id: 'jarry-merdre', txt: '« Merdre ! »', src: 'JARRY — Ubu roi', auteur: 'Alfred Jarry', pieceId: 'ubu-roi', theme: 'Pouvoir', emotion: 'Grotesque' },

  // ─── Ibsen ───
  { id: 'ibsen-humain', txt: '« Je crois que je suis avant tout un être humain, tout comme toi. »', src: 'IBSEN — Une maison de poupée', auteur: 'Henrik Ibsen', pieceId: 'maison-poupee', theme: 'Liberté', emotion: 'Émancipation' },

  // ─── Marivaux ───
  { id: 'marivaux-coeur', txt: '« Ah ! je vois clair dans mon cœur. »', src: "MARIVAUX — Le Jeu de l'amour et du hasard", auteur: 'Marivaux', pieceId: 'le-jeu-amour-hasard', theme: 'Amour', emotion: 'Trouble' },
];

export const GLOSSAIRE: GlossaireTerme[] = [
  { id: 'aparte', terme: 'Aparté', cat: 'Jeu', lettre: 'A', def: "Réplique qu'un personnage adresse au public, censée ne pas être entendue des autres personnages." },
  { id: 'catharsis', terme: 'Catharsis', cat: 'Théorie', lettre: 'C', def: "Purgation des passions du spectateur par la représentation — concept d'Aristote dans la Poétique." },
  { id: 'cour-jardin', terme: 'Cour et jardin', cat: 'Espace', lettre: 'C', def: "Côtés de la scène vus par l'acteur : la cour à sa gauche, le jardin à sa droite." },
  { id: 'didascalie', terme: 'Didascalie', cat: 'Texte', lettre: 'D', def: "Indication scénique donnée par l'auteur : ton, geste, décor, déplacement." },
  { id: 'deus-ex-machina', terme: 'Deus ex machina', cat: 'Dramaturgie', lettre: 'D', def: "Intervention inattendue qui dénoue soudainement l'intrigue, à l'origine par une machinerie." },
  { id: 'monologue', terme: 'Monologue', cat: 'Texte', lettre: 'M', def: "Discours qu'un personnage seul en scène s'adresse à lui-même, révélant ses pensées." },
  { id: 'quatrieme-mur', terme: 'Quatrième mur', cat: 'Mise en scène', lettre: 'Q', def: "Mur imaginaire séparant la scène de la salle ; le « briser », c'est s'adresser au public." },
  { id: 'stichomythie', terme: 'Stichomythie', cat: 'Texte', lettre: 'S', def: 'Dialogue où les personnages se répondent vers pour vers, dans un duel verbal serré.' },
  { id: 'tirade', terme: 'Tirade', cat: 'Texte', lettre: 'T', def: 'Longue réplique ininterrompue adressée à un interlocuteur présent sur scène.' },
  { id: 'trois-unites', terme: 'Trois unités', cat: 'Théorie', lettre: 'T', def: "Règle classique : une seule action, en un seul lieu, en une seule journée." },
];
