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

export const MONOLOGUES: Monologue[] = [
  { id: 'tirade-nez', titre: 'La tirade du nez', source: 'Cyrano de Bergerac, acte I — Rostand', extrait: "« Ah ! non ! c'est un peu court, jeune homme ! On pouvait dire… oh ! Dieu ! bien des choses en somme… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', emotion: 'Panache', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'phedre-aveu', titre: 'Phèdre avoue sa passion', source: 'Phèdre, acte II — Racine', extrait: '« Oui, prince, je languis, je brûle pour Thésée… »', dureeMin: 2, duree: '≈ 2 min 30', pour: 'Femme', emotion: 'Passion', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'etre-ou-ne-pas', titre: 'Être ou ne pas être', source: 'Hamlet, acte III — Shakespeare', extrait: '« Être, ou ne pas être, telle est la question… »', dureeMin: 2, duree: '≈ 2 min', pour: 'Mixte', emotion: 'Doute', niveau: 'Intermédiaire', epoque: 'Classique' },
  { id: 'figaro-monologue', titre: 'Le monologue de Figaro', source: 'Le Mariage de Figaro, acte V — Beaumarchais', extrait: "« Ô femme ! femme ! femme ! créature faible et décevante !… »", dureeMin: 4, duree: '≈ 4 min', pour: 'Homme', emotion: 'Révolte', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'camille-amour', titre: "La tirade de Camille", source: "On ne badine pas avec l'amour, acte II — Musset", extrait: "« Adieu, Perdican. »", dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', emotion: 'Amertume', niveau: 'Intermédiaire', epoque: 'Contemporain' },
  { id: 'lady-macbeth', titre: 'Le somnambulisme de Lady Macbeth', source: 'Macbeth, acte V — Shakespeare', extrait: '« Va-t-en, tache maudite ! va-t-en, dis-je ! »', dureeMin: 2, duree: '≈ 2 min', pour: 'Femme', emotion: 'Folie', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'harpagon-cassette', titre: 'Harpagon et sa cassette', source: "L'Avare, acte IV — Molière", extrait: "« Au voleur ! au voleur ! à l'assassin ! au meurtrier ! »", dureeMin: 2, duree: '≈ 2 min', pour: 'Homme', emotion: 'Panique', niveau: 'Intermédiaire', epoque: 'Classique' },
  { id: 'antigone-loi', titre: 'Antigone face à Créon', source: 'Antigone — Sophocle', extrait: "« Ce n'est pas Zeus qui avait proclamé pour moi cet ordre… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Femme', emotion: 'Colère', niveau: 'Difficile', epoque: 'Classique' },
  { id: 'stances-cid', titre: 'Les stances de Rodrigue', source: 'Le Cid, acte I — Corneille', extrait: "« Percé jusques au fond du cœur / D'une atteinte imprévue aussi bien que mortelle… »", dureeMin: 3, duree: '≈ 3 min', pour: 'Homme', emotion: 'Déchirement', niveau: 'Difficile', epoque: 'Classique' },
];

export const CITATIONS: Citation[] = [
  { id: 'shakespeare-theatre', txt: "« Le monde entier est un théâtre, et tous, hommes et femmes, n'en sont que les acteurs. »", src: 'SHAKESPEARE — Comme il vous plaira', theme: 'Le théâtre' },
  { id: 'beaumarchais-aime', txt: "« Qu'il est doux d'être aimé pour soi-même ! »", src: 'BEAUMARCHAIS — Le Barbier de Séville', theme: 'Amour' },
  { id: 'corneille-hais', txt: '« Va, je ne te hais point. »', src: 'CORNEILLE — Le Cid', theme: 'Amour' },
  { id: 'moliere-corriger', txt: '« Le devoir de la comédie étant de corriger les hommes en les divertissant. »', src: 'MOLIÈRE — Premier placet au roi', theme: 'Le théâtre' },
  { id: 'racine-forets', txt: '« Dans le fond des forêts votre image me suit. »', src: 'RACINE — Phèdre', theme: 'Amour' },
  { id: 'corneille-maitre', txt: "« Je suis maître de moi comme de l'univers. »", src: 'CORNEILLE — Cinna', theme: 'Pouvoir' },
  { id: 'shakespeare-etre', txt: '« Être, ou ne pas être : telle est la question. »', src: 'SHAKESPEARE — Hamlet', theme: 'Mort' },
  { id: 'sophocle-homme', txt: "« Rien de plus grand que l'homme. »", src: 'SOPHOCLE — Antigone', theme: 'Destin' },
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
