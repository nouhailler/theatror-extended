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

export const FRISE: FriseItem[] = [
  { id: 'thespis', ere: 'Antiquité', couleur: '#c98b4e', an: '~534 av. J.-C.', anNum: -534, titre: 'Thespis, premier acteur', txt: "Aux Grandes Dionysies d'Athènes, un homme sort du chœur : le théâtre est né." },
  { id: 'antigone', ere: 'Antiquité', couleur: '#c98b4e', an: '~441 av. J.-C.', anNum: -441, titre: 'Antigone de Sophocle', txt: 'La tragédie grecque à son sommet — loi des hommes contre loi des dieux.' },
  { id: 'mysteres', ere: 'Moyen Âge', couleur: '#8e9e5a', an: 'XVe s.', anNum: 1450, titre: 'Mystères et farces', txt: 'Sur les parvis, la Passion se joue trois jours durant ; la farce de Maître Pathelin fait rire les foules.' },
  { id: 'globe', ere: 'Élisabéthain', couleur: '#5f8ea8', an: '1599', anNum: 1599, titre: 'Le Globe ouvre à Londres', txt: 'La troupe de Shakespeare y créera Hamlet, Othello, Le Roi Lear.' },
  { id: 'tartuffe', ere: 'Classicisme', couleur: '#d4a94e', an: '1664', anNum: 1664, titre: 'Tartuffe fait scandale', txt: 'Molière défie les dévots ; la règle des trois unités règne sur la scène française.' },
  { id: 'hernani', ere: 'Romantisme', couleur: '#a85a72', an: '1830', anNum: 1830, titre: "La bataille d'Hernani", txt: 'Hugo fait exploser les règles classiques — clameurs et pugilats dans la salle.' },
  { id: 'ubu', ere: 'Moderne', couleur: '#9e2b3a', an: '1896', anNum: 1896, titre: 'Ubu roi', txt: '« Merdre ! » — Jarry ouvre la voie aux avant-gardes du XXe siècle.' },
  { id: 'godot', ere: 'Absurde', couleur: '#b0563a', an: '1953', anNum: 1953, titre: 'En attendant Godot', txt: "Beckett met l'attente elle-même en scène ; le théâtre de l'absurde triomphe." },
];

export const LIEUX: Lieu[] = [
  { id: 'epidaure', nom: "Théâtre d'Épidaure", lieu: 'Grèce · IVe s. av. J.-C.', txt: '14 000 places, acoustique légendaire.', initiale: 'É', img: 'Epidaurus Theater.jpg', type: 'theatre', lat: 37.596, lng: 23.079 },
  { id: 'comedie-francaise', nom: 'Comédie-Française', lieu: 'Paris · fondée en 1680', txt: 'La « Maison de Molière », plus ancienne troupe au monde.', initiale: 'C', img: 'Comédie-Française.jpg', type: 'theatre', lat: 48.863, lng: 2.336 },
  { id: 'globe', nom: "Shakespeare's Globe", lieu: 'Londres · reconstruit en 1997', txt: 'Théâtre élisabéthain à ciel ouvert, spectateurs debout.', initiale: 'G', img: 'Shakespeare’s Globe Theatre, London.jpg', type: 'theatre', lat: 51.508, lng: -0.097 },
  { id: 'avignon', nom: "Festival d'Avignon", lieu: 'France · chaque juillet', txt: "Cour d'honneur du Palais des papes + 1 500 spectacles au Off.", initiale: 'A', img: 'Avignon, Palais des Papes by JM Rosier.jpg', type: 'festival', lat: 43.951, lng: 4.807 },
  { id: 'garnier', nom: 'Palais Garnier', lieu: 'Paris · inauguré en 1875', txt: "Chef-d'œuvre du Second Empire, temple de l'opéra et du ballet.", initiale: 'G', img: 'Paris Opera full frontal architecture, May 2009.jpg', type: 'theatre', lat: 48.872, lng: 2.332 },
  { id: 'edimbourg', nom: 'Edinburgh Fringe', lieu: 'Écosse · chaque août', txt: 'Le plus grand festival des arts du spectacle au monde.', initiale: 'E', img: '', type: 'festival', lat: 55.953, lng: -3.188 },
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
