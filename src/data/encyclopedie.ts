import type { EncycloCategorie } from './types';

export interface Article {
  id: string;
  categorie: EncycloCategorie;
  titre: string;
  soustitre?: string;
  initiale: string;
  intro: string;
  points?: string[]; // faits clés
  sections?: { titre: string; texte: string }[];
  chrono?: { an: string; txt: string }[];
  citation?: { txt: string; src?: string };
  anecdote?: string;
}

export const ARTICLES: Article[] = [
  // ─────────────── HISTOIRE ───────────────
  {
    id: 'hist-antiquite', categorie: 'Histoire', titre: 'Le théâtre antique', soustitre: 'Grèce & Rome · Ve s. av. J.-C.', initiale: 'A',
    intro: "Né des fêtes religieuses en l'honneur de Dionysos, le théâtre grec invente la tragédie et la comédie. À Rome, le spectacle se fait plus populaire, mêlant farces, pantomimes et jeux du cirque.",
    points: [
      'Le chœur, collectif chantant, dialogue avec les acteurs.',
      'Les acteurs portent masques et cothurnes ; tous les rôles sont tenus par des hommes.',
      "Trois grands tragiques grecs : Eschyle, Sophocle, Euripide ; Aristophane pour la comédie.",
    ],
    chrono: [
      { an: '~534', txt: 'Thespis, premier acteur, aux Dionysies d’Athènes.' },
      { an: '~458', txt: "L'Orestie d'Eschyle." },
      { an: '~441', txt: 'Antigone de Sophocle.' },
      { an: '~240', txt: 'Premières pièces latines de Livius Andronicus.' },
    ],
    citation: { txt: "« Rien de plus grand que l'homme. »", src: 'Sophocle, Antigone' },
    anecdote: "Le théâtre d'Épidaure, aux 14 000 places, possède une acoustique si parfaite qu'une pièce de monnaie tombée sur la scène s'entend au dernier rang.",
  },
  {
    id: 'hist-moyen-age', categorie: 'Histoire', titre: 'Le théâtre médiéval', soustitre: 'Ve – XVe siècle', initiale: 'M',
    intro: "Après l'effacement du théâtre antique, le drame renaît dans l'Église : on met en scène les épisodes bibliques. Peu à peu, le spectacle gagne les parvis puis les places, entre ferveur religieuse et rire populaire.",
    points: [
      'Les mystères : vastes fresques religieuses jouées plusieurs jours durant.',
      'Les miracles : récits d’interventions de la Vierge ou des saints.',
      'Les farces et soties : comique populaire, satire des mœurs.',
    ],
    sections: [
      { titre: 'La farce de Maître Pathelin', texte: "Chef-d'œuvre anonyme du XVe siècle, cette farce de l'avocat rusé pris à son propre piège annonce déjà la comédie de Molière." },
    ],
    anecdote: "Les mystères pouvaient mobiliser toute une ville : des centaines d'acteurs amateurs et des machineries spectaculaires pour figurer l'enfer ou le paradis.",
  },
  {
    id: 'hist-renaissance', categorie: 'Histoire', titre: 'Renaissance & théâtre élisabéthain', soustitre: 'XVIe – début XVIIe siècle', initiale: 'R',
    intro: "La redécouverte des Anciens relance le théâtre savant, tandis qu'en Angleterre, l'ère élisabéthaine fait éclore un théâtre populaire et grandiose porté par Shakespeare et Marlowe.",
    points: [
      "La commedia dell'arte italienne : masques, canevas improvisés, personnages types (Arlequin, Pantalon).",
      'Les théâtres londoniens à ciel ouvert, comme le Globe, accueillent toutes les classes.',
      "Shakespeare mêle librement tragique et comique, rois et bouffons.",
    ],
    chrono: [
      { an: '1576', txt: 'The Theatre, premier théâtre permanent de Londres.' },
      { an: '1599', txt: 'Ouverture du Globe.' },
      { an: '1601', txt: 'Hamlet de Shakespeare.' },
    ],
    anecdote: "Au Globe, les spectateurs les plus modestes, les « groundlings », restaient debout dans la fosse pour un penny.",
  },
  {
    id: 'hist-classicisme', categorie: 'Histoire', titre: 'Le Grand Siècle', soustitre: 'XVIIe siècle · classicisme français', initiale: 'C',
    intro: "Sous Louis XIV, le théâtre français atteint son apogée. Corneille, Racine et Molière portent la tragédie et la comédie à la perfection, dans le respect des règles héritées d'Aristote.",
    points: [
      'La règle des trois unités : action, lieu, temps.',
      'La bienséance et la vraisemblance encadrent la scène.',
      'La Comédie-Française est fondée en 1680, « Maison de Molière ».',
    ],
    chrono: [
      { an: '1637', txt: 'Le Cid de Corneille et sa Querelle.' },
      { an: '1664', txt: 'Tartuffe fait scandale.' },
      { an: '1677', txt: 'Phèdre de Racine.' },
    ],
    citation: { txt: "« Le devoir de la comédie étant de corriger les hommes en les divertissant. »", src: 'Molière' },
  },
  {
    id: 'hist-romantisme', categorie: 'Histoire', titre: 'Le théâtre romantique', soustitre: 'Première moitié du XIXe siècle', initiale: 'R',
    intro: "Contre la rigidité classique, les romantiques réclament la liberté : mélange des genres, couleur locale, héros passionnés. La bataille d'Hernani, en 1830, consacre cette révolution.",
    points: [
      "La préface de Cromwell (Hugo, 1827) est le manifeste du drame romantique.",
      'Le grotesque et le sublime cohabitent sur la scène.',
      'Musset invente un théâtre à lire, subtil et désenchanté.',
    ],
    anecdote: "À la première d'Hernani, partisans et adversaires en vinrent aux mains dans la salle : le gilet rouge de Théophile Gautier fit scandale.",
  },
  {
    id: 'hist-contemporain', categorie: 'Histoire', titre: 'Le théâtre contemporain', soustitre: 'XXe – XXIe siècle', initiale: 'C',
    intro: "Le XXe siècle bouleverse la scène : le metteur en scène devient auteur du spectacle, les avant-gardes multiplient les ruptures, de l'absurde au théâtre engagé jusqu'aux formes performatives d'aujourd'hui.",
    points: [
      'Antoine et le naturalisme, Copeau et le renouveau du jeu.',
      "Le théâtre de l'absurde (Beckett, Ionesco) après 1950.",
      'Brecht et la distanciation ; le théâtre documentaire et immersif contemporain.',
    ],
    citation: { txt: "« Le théâtre n'est pas le pays du réel : il y a des arbres de carton, des palais de toile. »", src: 'Victor Hugo' },
  },

  // ─────────────── MOUVEMENTS ───────────────
  {
    id: 'mvt-classicisme', categorie: 'Mouvements', titre: 'Le classicisme', soustitre: 'XVIIe siècle', initiale: 'C',
    intro: "Idéal de mesure, d'ordre et de raison, le classicisme cherche à plaire et instruire en imitant les Anciens. Il impose des règles strictes pour atteindre le naturel et l'universel.",
    points: [
      'Les trois unités : un lieu, un jour, une action.',
      'Bienséance : ni violence ni trivialité sur scène.',
      'Vise l’étude des passions humaines universelles.',
    ],
    sections: [{ titre: 'Figures', texte: 'Corneille, Racine, Molière, Boileau (théoricien de l’Art poétique).' }],
  },
  {
    id: 'mvt-romantisme', categorie: 'Mouvements', titre: 'Le romantisme', soustitre: 'XIXe siècle', initiale: 'R',
    intro: "Révolte contre les règles classiques, le romantisme exalte la passion, la liberté et le mélange des tons. Le drame romantique refuse de séparer le sublime du grotesque.",
    points: [
      'Rejet des trois unités.',
      'Héros marginaux, exaltés, en lutte contre le destin.',
      'Couleur locale et historique.',
    ],
    sections: [{ titre: 'Figures', texte: 'Victor Hugo, Alfred de Vigny, Alexandre Dumas, Alfred de Musset.' }],
  },
  {
    id: 'mvt-naturalisme', categorie: 'Mouvements', titre: 'Le naturalisme', soustitre: 'Fin XIXe siècle', initiale: 'N',
    intro: "Prolongement du réalisme, le naturalisme veut porter la vie quotidienne et les milieux sociaux sur scène, avec une exactitude presque scientifique. André Antoine en fait un théâtre du vrai.",
    points: [
      'Décors réalistes, jeu naturel, « quatrième mur ».',
      'Sujets sociaux, milieux populaires et déterminisme.',
      "Le Théâtre-Libre d'Antoine (1887) en est le laboratoire.",
    ],
    sections: [{ titre: 'Figures', texte: 'Émile Zola (théoricien), Henry Becque, Henrik Ibsen, Anton Tchekhov.' }],
  },
  {
    id: 'mvt-symbolisme', categorie: 'Mouvements', titre: 'Le symbolisme', soustitre: 'Fin XIXe siècle', initiale: 'S',
    intro: "En réaction au naturalisme, le symbolisme cherche à suggérer plutôt qu'à montrer. Il privilégie le rêve, le mystère et la musicalité, ouvrant la voie aux avant-gardes.",
    points: [
      'Atmosphères oniriques, langage poétique.',
      "Refus de l'imitation du réel.",
      'Influence durable sur la mise en scène moderne.',
    ],
    sections: [{ titre: 'Figures', texte: 'Maurice Maeterlinck, Villiers de l’Isle-Adam, Paul Fort (Théâtre d’Art).' }],
  },
  {
    id: 'mvt-absurde', categorie: 'Mouvements', titre: "Le théâtre de l'absurde", soustitre: 'Années 1950', initiale: 'A',
    intro: "Au lendemain de la guerre, un théâtre naît qui met en scène l'absurdité de la condition humaine : langage qui se délite, actions sans but, attente sans fin. Le sens même est questionné.",
    points: [
      'Dialogues déréglés, répétitions, non-sens.',
      "L'attente, l'ennui et l'incommunicabilité comme sujets.",
      'Structures circulaires, sans progression classique.',
    ],
    chrono: [
      { an: '1950', txt: 'La Cantatrice chauve d’Ionesco.' },
      { an: '1953', txt: 'En attendant Godot de Beckett.' },
    ],
    sections: [{ titre: 'Figures', texte: 'Samuel Beckett, Eugène Ionesco, Arthur Adamov, Jean Genet.' }],
  },
  {
    id: 'mvt-epique', categorie: 'Mouvements', titre: 'Le théâtre épique', soustitre: 'XXe siècle · Brecht', initiale: 'É',
    intro: "Théorisé par Bertolt Brecht, le théâtre épique veut faire réfléchir plutôt qu'émouvoir. Par la « distanciation », il empêche le spectateur de s'identifier pour le rendre critique et lucide.",
    points: [
      "Effet de distanciation (Verfremdungseffekt).",
      "Le spectateur doit juger, non pleurer.",
      'Songs, pancartes, adresse au public brisent l’illusion.',
    ],
    citation: { txt: "« Le théâtre doit apprendre au spectateur à penser au-dessus du courant. »", src: 'Bertolt Brecht' },
  },

  // ─────────────── GENRES ───────────────
  {
    id: 'genre-tragedie', categorie: 'Genres', titre: 'La tragédie', initiale: 'T',
    intro: "Genre noble par excellence, la tragédie met en scène de grands personnages aux prises avec le destin, la passion ou le devoir. Sa fin malheureuse suscite terreur et pitié — la catharsis.",
    points: [
      'Héros de haut rang, sujet grave.',
      'Dénouement funeste ; mort ou malheur.',
      'Registre soutenu, souvent en vers.',
    ],
    sections: [{ titre: 'Exemples', texte: 'Antigone (Sophocle), Phèdre (Racine), Hamlet (Shakespeare).' }],
  },
  {
    id: 'genre-comedie', categorie: 'Genres', titre: 'La comédie', initiale: 'C',
    intro: "La comédie peint les travers des hommes pour en rire et les corriger. Des personnages ordinaires, un dénouement heureux — souvent un mariage — et une satire des mœurs de son temps.",
    points: [
      'Personnages de condition moyenne.',
      'Ressorts : quiproquos, caractères, situations.',
      'Fin heureuse ; visée morale sous le rire.',
    ],
    sections: [{ titre: 'Exemples', texte: "L'Avare, Le Misanthrope (Molière), Le Mariage de Figaro (Beaumarchais)." }],
    citation: { txt: '« Castigat ridendo mores » — elle corrige les mœurs en riant.', src: 'Devise de la comédie' },
  },
  {
    id: 'genre-farce', categorie: 'Genres', titre: 'La farce', initiale: 'F',
    intro: "Courte et populaire, la farce cherche le rire franc par la caricature, les coups, les ruses et les jeux de mots. Héritière du Moyen Âge, elle nourrit toute la comédie française.",
    points: [
      'Comique de geste et de situation appuyé.',
      'Personnages types : le mari trompé, le valet rusé.',
      'Rythme rapide, longueur brève.',
    ],
    sections: [{ titre: 'Exemples', texte: 'La Farce de Maître Pathelin, Les Fourberies de Scapin (Molière), Ubu roi (Jarry).' }],
  },
  {
    id: 'genre-drame', categorie: 'Genres', titre: 'Le drame', initiale: 'D',
    intro: "Né au XVIIIe siècle et épanoui avec le romantisme, le drame mêle le tragique et le comique pour peindre la vie dans sa complexité. Il rompt avec la séparation classique des genres.",
    points: [
      'Mélange des tons et des conditions sociales.',
      'Sujets contemporains ou historiques.',
      'Liberté de construction et de langue.',
    ],
    sections: [{ titre: 'Exemples', texte: 'Hernani, Ruy Blas (Hugo), Une maison de poupée (Ibsen).' }],
  },
  {
    id: 'genre-tragicomedie', categorie: 'Genres', titre: 'La tragi-comédie', initiale: 'T',
    intro: "À la croisée des genres, la tragi-comédie propose une action grave et périlleuse mais un dénouement heureux. En vogue au début du XVIIe siècle, elle précède le triomphe du classicisme.",
    points: [
      'Péripéties nombreuses, tension dramatique.',
      'Personnages nobles mais fin favorable.',
      'Liberté relative vis-à-vis des règles.',
    ],
    sections: [{ titre: 'Exemple', texte: 'Le Cid (Corneille, 1637), longtemps qualifié de tragi-comédie.' }],
  },
  {
    id: 'genre-vaudeville', categorie: 'Genres', titre: 'Le vaudeville', initiale: 'V',
    intro: "Comédie légère et enlevée du XIXe siècle, le vaudeville repose sur une mécanique d'intrigue implacable : quiproquos, portes qui claquent, situations d'adultère. Feydeau en est le maître horloger.",
    points: [
      'Rythme effréné, mécanique de précision.',
      'Comique de situation et de mouvement.',
      "Souvent entrecoupé de couplets chantés à l'origine.",
    ],
    sections: [{ titre: 'Figure', texte: 'Georges Feydeau (La Puce à l’oreille, Le Dindon).' }],
  },

  // ─────────────── MÉTIERS ───────────────
  {
    id: 'metier-comedien', categorie: 'Métiers', titre: 'Le comédien', initiale: 'C',
    intro: "Au cœur du théâtre, le comédien prête son corps et sa voix à un personnage. Son art conjugue technique (diction, présence, mémoire) et sensibilité, pour rendre vivant et vrai ce qui est écrit.",
    points: [
      'Travail du texte, de la voix et du corps.',
      "Écoute du partenaire et rapport au public.",
      'Méthodes : Stanislavski, Lecoq, jeu masqué…',
    ],
    citation: { txt: "« Le monde entier est un théâtre, et tous, hommes et femmes, n'en sont que les acteurs. »", src: 'Shakespeare' },
  },
  {
    id: 'metier-metteur-scene', categorie: 'Métiers', titre: 'Le metteur en scène', initiale: 'M',
    intro: "Apparu à la fin du XIXe siècle, le metteur en scène est le maître d'œuvre du spectacle. Il interprète le texte, dirige les comédiens et coordonne décor, lumière et son pour donner sa vision.",
    points: [
      'Choisit un parti pris de lecture de l’œuvre.',
      'Dirige le jeu et les déplacements.',
      "Unifie tous les éléments scéniques.",
    ],
    sections: [{ titre: 'Pionniers', texte: 'André Antoine, Jacques Copeau, Constantin Stanislavski, Bertolt Brecht.' }],
  },
  {
    id: 'metier-dramaturge', categorie: 'Métiers', titre: 'Le dramaturge', initiale: 'D',
    intro: "Le dramaturge écrit pour la scène. Le mot désigne aussi, dans le théâtre moderne, le conseiller littéraire qui accompagne le metteur en scène dans l'analyse et l'adaptation des textes.",
    points: [
      'Auteur du texte théâtral (dialogues, didascalies).',
      'Pense la structure, les conflits, les personnages.',
      "Rôle moderne : dramaturgie d'accompagnement du spectacle.",
    ],
  },
  {
    id: 'metier-scenographe', categorie: 'Métiers', titre: 'Le scénographe', initiale: 'S',
    intro: "Le scénographe conçoit l'espace du spectacle : décor, volumes, matières et parfois lumière. Il traduit dans l'espace la vision du metteur en scène et guide le regard du spectateur.",
    points: [
      'Conçoit décors et espace scénique.',
      'Travaille échelle, perspective, matériaux.',
      "Collabore étroitement avec lumière et costumes.",
    ],
  },
  {
    id: 'metier-regisseur', categorie: 'Métiers', titre: 'Le régisseur', initiale: 'R',
    intro: "Chef d'orchestre invisible, le régisseur assure le bon déroulement technique de la représentation : il donne les tops de lumière, de son et de plateau, et coordonne les équipes en coulisses.",
    points: [
      'Conduite du spectacle en temps réel.',
      'Coordonne plateau, lumière, son.',
      'Garant de la sécurité et du minutage.',
    ],
  },
  {
    id: 'metier-costumier', categorie: 'Métiers', titre: 'Le costumier', initiale: 'C',
    intro: "Le costumier imagine et réalise les vêtements des personnages. Le costume situe une époque, révèle un caractère et participe pleinement au sens du spectacle — bien au-delà de l'habillage.",
    points: [
      'Conçoit et fabrique les costumes.',
      "Sert l'époque, le milieu, la psychologie du rôle.",
      'Contraintes : mouvement, changements rapides, scène.',
    ],
    anecdote: "Au XVIIe siècle, les comédiens jouaient les tragédies antiques en costume de leur propre temps : perruques et habits à la mode de Versailles.",
  },

  // ─────────────── HISTOIRE (compléments) ───────────────
  {
    id: 'hist-lumieres', categorie: 'Histoire', titre: 'Le théâtre des Lumières', soustitre: 'XVIIIe siècle', initiale: 'L',
    intro: "Au siècle des Lumières, la comédie s'affine (Marivaux, le « marivaudage ») et se fait plus hardie socialement (Beaumarchais). Diderot invente le drame bourgeois, qui met en scène les gens du commun et leurs sentiments.",
    points: [
      "Marivaux : la surprise de l'amour et le jeu des masques sociaux.",
      "Beaumarchais : Figaro, valet plus fin que ses maîtres, et une satire qui annonce la Révolution.",
      'Diderot théorise le « drame sérieux », entre tragédie et comédie.',
    ],
    citation: { txt: "« Sans la liberté de blâmer, il n'est point d'éloge flatteur. »", src: 'Beaumarchais, Le Mariage de Figaro' },
  },
  {
    id: 'hist-realisme', categorie: 'Histoire', titre: 'Réalisme & naturalisme', soustitre: 'Fin du XIXe siècle', initiale: 'R',
    intro: "À la fin du XIXe siècle, la scène cherche la vérité du quotidien. André Antoine fonde le Théâtre Libre et impose le « quatrième mur » ; Ibsen et Tchekhov peignent l'intime et les non-dits.",
    points: [
      "Le « quatrième mur » : jouer comme si le public n'existait pas.",
      'Décors et jeu cherchent le vrai, contre l\'emphase romantique.',
      'Ibsen, Tchekhov, Strindberg : naissance du théâtre moderne.',
    ],
    anecdote: "Antoine faisait apporter de vrais quartiers de viande sur scène pour une pièce sur des bouchers : le naturalisme jusqu'au bout.",
  },
  {
    id: 'hist-boulevard', categorie: 'Histoire', titre: 'Le théâtre de boulevard', soustitre: 'XIXe – XXe siècle', initiale: 'B',
    intro: "Sur les « Grands Boulevards » parisiens, un théâtre populaire et commercial triomphe : vaudevilles à quiproquos, comédies légères et rires en cascade, pour un public en quête de divertissement.",
    points: [
      'Le vaudeville : mécanique implacable des portes qui claquent (Feydeau, Labiche).',
      'Courteline : la satire des petits travers et de l\'administration.',
      'Un art du rythme, du timing et de la réplique.',
    ],
    citation: { txt: "« Il est plus facile d'être héros que honnête homme. »", src: 'Courteline' },
  },
  {
    id: 'hist-decentralisation', categorie: 'Histoire', titre: 'La décentralisation théâtrale', soustitre: 'France · après 1945', initiale: 'D',
    intro: "Après la guerre, l'État porte le théâtre hors de Paris : centres dramatiques nationaux, maisons de la culture, festivals. Jean Vilar et le TNP rêvent d'un « théâtre populaire » de service public.",
    points: [
      'Jean Vilar fonde le Festival d\'Avignon (1947) puis dirige le TNP.',
      'Création des Centres dramatiques nationaux (CDN) en région.',
      'Un théâtre exigeant pour le plus grand nombre.',
    ],
    anecdote: "Vilar jouait dans la Cour d'honneur du Palais des papes, sans rideau ni décor, misant tout sur l'acteur, le texte et la lumière.",
  },

  // ─────────────── MOUVEMENTS (compléments) ───────────────
  {
    id: 'mvt-baroque', categorie: 'Mouvements', titre: 'Le baroque', soustitre: 'Fin XVIe – début XVIIe siècle', initiale: 'B',
    intro: "Avant l'ordre classique, le théâtre baroque cultive l'illusion, le mouvement et la métamorphose : le monde est un théâtre, la vie un songe. Machines, apparitions et coups de théâtre s'y multiplient.",
    points: [
      'Goût de l\'illusion et du théâtre dans le théâtre.',
      "Instabilité, déguisements, renversements de situation.",
      "Corneille jeune (L'Illusion comique), Shakespeare, Calderón.",
    ],
    citation: { txt: "« Nous sommes de l'étoffe dont sont faits les songes. »", src: 'Shakespeare, La Tempête' },
  },
  {
    id: 'mvt-commedia', categorie: 'Mouvements', titre: "La commedia dell'arte", soustitre: 'Italie · XVIe – XVIIIe siècle', initiale: 'C',
    intro: "Théâtre italien de comédiens ambulants, la commedia dell'arte repose sur des types fixes et masqués (Arlequin, Pantalon, le Docteur) improvisant sur un canevas. Son énergie irrigue Molière et Marivaux.",
    points: [
      'Des personnages-types reconnaissables, aux masques codifiés.',
      'Le jeu est improvisé sur un scénario (canevas).',
      'Les « lazzi » : gags physiques et numéros comiques.',
    ],
    anecdote: "Arlequin, avec son habit de losanges colorés et sa batte, est né misérable valet avant de devenir l'amoureux virtuose que l'on connaît.",
  },
  {
    id: 'mvt-cruaute', categorie: 'Mouvements', titre: 'Avant-gardes & théâtre de la cruauté', soustitre: 'Première moitié du XXe siècle', initiale: 'A',
    intro: "Contre le théâtre psychologique, les avant-gardes veulent choquer et régénérer la scène. Jarry ouvre la voie avec Ubu ; Antonin Artaud rêve d'un « théâtre de la cruauté » agissant sur les sens comme un rite.",
    points: [
      'Jarry (Ubu roi) : provocation et grotesque fondateurs.',
      "Artaud : un théâtre physique, incantatoire, au-delà des mots.",
      'Influence majeure sur toute la scène moderne.',
    ],
    citation: { txt: "« Le théâtre, c'est le double non pas de cette réalité quotidienne… mais d'une autre réalité dangereuse. »", src: 'Antonin Artaud' },
  },
  {
    id: 'mvt-quotidien', categorie: 'Mouvements', titre: 'Le théâtre du quotidien', soustitre: 'Fin XXe siècle', initiale: 'Q',
    intro: "Dans les années 1970-90, des auteurs captent la langue ordinaire, ses ratés et ses silences. Le drame naît du banal, de la parole empêchée : c'est le théâtre de Michel Vinaver ou de Jean-Luc Lagarce.",
    points: [
      'La matière : la conversation, le travail, la famille.',
      'Une langue faite de reprises, de blancs, d\'inachèvement.',
      'Vinaver, Lagarce, Koltès dans son sillage.',
    ],
    citation: { txt: "« Je ne me souviens plus très bien des mots. »", src: 'Jean-Luc Lagarce, Juste la fin du monde' },
  },

  // ─────────────── GENRES (compléments) ───────────────
  {
    id: 'genre-comedie-ballet', categorie: 'Genres', titre: 'La comédie-ballet', initiale: 'C',
    intro: "Née de la collaboration entre Molière et le compositeur Lully, la comédie-ballet mêle comédie parlée, musique et danse en un spectacle total, très en faveur à la cour de Louis XIV.",
    points: [
      'Alternance de scènes parlées et d\'intermèdes chantés et dansés.',
      'Chefs-d\'œuvre : Le Bourgeois gentilhomme, Le Malade imaginaire.',
      'Un divertissement de cour, mais aussi une satire sociale.',
    ],
  },
  {
    id: 'genre-melodrame', categorie: 'Genres', titre: 'Le mélodrame', initiale: 'M',
    intro: "Genre populaire du XIXe siècle, le mélodrame joue des émotions fortes : innocence persécutée, traîtres, coups du sort et musique soulignant les moments clés. Il triomphe sur les boulevards.",
    points: [
      'Manichéisme : le bon, la victime, le traître.',
      'Grands sentiments, péripéties et pathos assumé.',
      'La musique ponctue et amplifie l\'émotion.',
    ],
    anecdote: "Le mot « mélodrame » vient du grec melos (chant) : à l'origine, un drame accompagné de musique.",
  },
  {
    id: 'genre-feerie', categorie: 'Genres', titre: 'La féerie', initiale: 'F',
    intro: "Spectacle du merveilleux, la féerie déploie décors à transformations, machineries et effets visuels pour figurer fées, palais enchantés et métamorphoses. Un théâtre du rêve et de l'émerveillement.",
    points: [
      'Décors à changements « à vue » et machines spectaculaires.',
      'Sujets tirés des contes et des légendes.',
      'Ancêtre de la grande scène à effets et des comédies musicales.',
    ],
  },
  {
    id: 'genre-monologue', categorie: 'Genres', titre: 'Le monologue', initiale: 'M',
    intro: "Discours d'un personnage seul en scène qui pense tout haut, le monologue révèle l'intériorité : délibération, aveu, désespoir. Du soliloque tragique à la tirade virtuose, c'est un sommet du jeu d'acteur.",
    points: [
      'Le personnage se parle à lui-même (ou au public).',
      "Moment de vérité et d'introspection.",
      'Exemples : « Être ou ne pas être », les stances de Rodrigue.',
    ],
    citation: { txt: "« Être, ou ne pas être : telle est la question. »", src: 'Shakespeare, Hamlet' },
  },

  // ─────────────── MÉTIERS (compléments) ───────────────
  {
    id: 'metier-eclairagiste', categorie: 'Métiers', titre: "L'éclairagiste", initiale: 'É',
    intro: "Créateur de la lumière, l'éclairagiste sculpte l'espace, le temps et l'émotion. Un même décor devient aube, orage ou huis clos selon la lumière : c'est un art à part entière de la scène moderne.",
    points: [
      'Conçoit les ambiances lumineuses et leurs changements.',
      'Révèle les corps, guide le regard, rythme le spectacle.',
      'Travaille étroitement avec le metteur en scène et le scénographe.',
    ],
  },
  {
    id: 'metier-machiniste', categorie: 'Métiers', titre: 'Le machiniste', initiale: 'M',
    intro: "Technicien du plateau, le machiniste monte les décors, manœuvre les changements et fait fonctionner les machineries. De l'ombre, il rend possible la magie visible du spectacle.",
    points: [
      'Montage, démontage et manipulation des décors.',
      'Changements « à vue » ou dans le noir, au cordeau.',
      'Héritier des machinistes du théâtre baroque à machines.',
    ],
    anecdote: "L'expression « côté cour » et « côté jardin » sert aux machinistes à ne jamais confondre la gauche et la droite du plateau.",
  },
  {
    id: 'metier-souffleur', categorie: 'Métiers', titre: 'Le souffleur', initiale: 'S',
    intro: "Longtemps installé dans son « trou » au bord de la scène, le souffleur soufflait discrètement leur texte aux comédiens. Métier en voie de disparition, il reste le symbole d'un théâtre de la mémoire et du secours.",
    points: [
      'Suit le texte et relance l\'acteur en cas de trou de mémoire.',
      'Autrefois installé dans une niche à l\'avant-scène.',
      'Aujourd\'hui rare, remplacé par le travail de mémorisation.',
    ],
  },
  {
    id: 'metier-directeur', categorie: 'Métiers', titre: 'Le directeur de théâtre', initiale: 'D',
    intro: "À la tête d'une salle ou d'une troupe, le directeur choisit la programmation, porte un projet artistique et gère l'institution — entre ambition esthétique et réalités économiques.",
    points: [
      'Définit la ligne artistique et la saison.',
      'Dirige équipes, budget et relations aux tutelles.',
      'De Molière chef de troupe aux directeurs de CDN.',
    ],
  },
];

export function articlesFor(categorie: EncycloCategorie): Article[] {
  return ARTICLES.filter((a) => a.categorie === categorie);
}

export function articleById(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}
