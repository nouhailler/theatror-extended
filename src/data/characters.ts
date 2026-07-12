export interface Personnage {
  id: string;
  nom: string;
  initiale: string;
  piece: string;
  pieceId?: string;
  auteur: string;
  auteurId?: string;
  emploi: string; // type de rôle
  psychologie: string;
  evolution: string;
  scenes: string[]; // scènes importantes
  adaptations?: string[]; // reprises / mises en scène / adaptations marquantes
  monologueId?: string; // monologue lié (écran Scène)
  citation?: string;
  aka?: string[]; // graphies alternatives du rôle dans la distribution (ex. « Don Rodrigue »)
}

export const PERSONNAGES: Personnage[] = [
  {
    id: 'tartuffe', nom: 'Tartuffe', initiale: 'T', piece: 'Tartuffe', pieceId: 'tartuffe',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Faux dévot',
    psychologie: "Hypocrite consommé, Tartuffe masque une avidité charnelle et matérielle sous les dehors de la piété. Manipulateur habile, il exploite la crédulité d'Orgon pour s'emparer de ses biens et de sa femme.",
    evolution: "D'abord tout-puissant et intouchable, il se démasque lui-même en cédant à son désir pour Elmire, avant d'être confondu et arrêté par la justice du roi.",
    scenes: ['Acte III, sc. 2 — « Couvrez ce sein… »', "Acte III, sc. 3 — la déclaration à Elmire", 'Acte IV, sc. 5 — le piège tendu par Elmire'],
    citation: "« Le ciel défend, de vrai, certains contentements ; mais on trouve avec lui des accommodements. »",
  },
  {
    id: 'cyrano', nom: 'Cyrano', initiale: 'C', piece: 'Cyrano de Bergerac', pieceId: 'cyrano',
    auteur: 'Edmond Rostand', auteurId: 'rostand', emploi: 'Héros bretteur et poète',
    psychologie: "Bretteur génial et poète flamboyant, Cyrano cache sous son panache une blessure profonde : la honte de son nez, qui le persuade d'être indigne d'être aimé de Roxane.",
    evolution: "Il aime en secret, prête ses mots à Christian, puis garde le silence quinze ans durant. Il ne révèle son amour qu'à l'instant de mourir — fidèle à son panache jusqu'au bout.",
    scenes: ['Acte I — la tirade du nez', 'Acte III — la scène du balcon', 'Acte V — la mort de Cyrano'],
    monologueId: 'tirade-nez',
    citation: "« Mon panache. »",
  },
  {
    id: 'antigone', nom: 'Antigone', initiale: 'A', piece: 'Antigone', pieceId: 'antigone-sophocle',
    auteur: 'Sophocle', auteurId: 'sophocle', emploi: 'Héroïne tragique',
    psychologie: "Jeune femme d'une droiture absolue, Antigone place la loi divine et le devoir familial au-dessus de la loi de la cité. Son intransigeance la rend à la fois sublime et vouée à la mort.",
    evolution: "De la décision d'ensevelir son frère à sa condamnation, elle ne fléchit jamais. Emmurée vivante, elle se donne la mort, entraînant la chute de Créon.",
    scenes: ['Le prologue avec Ismène', 'La confrontation avec Créon', "L'adieu à la lumière"],
    monologueId: 'antigone-loi',
    citation: "« Je suis née pour partager l'amour et non la haine. »",
  },
  {
    id: 'dom-juan', nom: 'Dom Juan', initiale: 'D', piece: 'Dom Juan', pieceId: 'dom-juan',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Grand seigneur libertin',
    psychologie: "Séducteur insatiable et libre-penseur, Dom Juan défie toutes les lois — morales, sociales, divines. Son courage se double d'un cynisme qui confine au blasphème.",
    evolution: "De conquête en provocation, il refuse tout repentir jusqu'au bout et disparaît, foudroyé, englouti par la statue du Commandeur.",
    scenes: ["L'éloge de l'inconstance (acte I)", 'La scène du pauvre (acte III)', "Le souper avec la statue (acte IV-V)"],
    citation: "« Je crois que deux et deux sont quatre, Sganarelle, et que quatre et quatre sont huit. »",
  },
  {
    id: 'figaro', nom: 'Figaro', initiale: 'F', piece: 'Le Mariage de Figaro', pieceId: 'mariage-figaro',
    auteur: 'Beaumarchais', auteurId: 'beaumarchais', emploi: 'Valet frondeur',
    psychologie: "Vif, débrouillard et lucide, Figaro incarne l'intelligence populaire qui tient tête aux puissants. Sous la gaieté perce une conscience aiguë de l'injustice sociale.",
    evolution: "Du barbier complice au valet qui déjoue son maître, il gagne en profondeur jusqu'au grand monologue où il médite sur sa condition et le hasard des naissances.",
    scenes: ['Le monologue de l’acte V', 'La scène du procès', 'Le dénouement dans les jardins'],
    monologueId: 'figaro-monologue',
    citation: "« Vous vous êtes donné la peine de naître, et rien de plus. »",
  },
  {
    id: 'phedre', nom: 'Phèdre', initiale: 'P', piece: 'Phèdre', pieceId: 'phedre',
    auteur: 'Jean Racine', auteurId: 'racine', emploi: 'Héroïne tragique',
    psychologie: "Dévorée par une passion incestueuse pour son beau-fils Hippolyte, Phèdre lutte contre un désir qu'elle sait monstrueux. Sa lucidité même fait son supplice.",
    evolution: "De l'aveu arraché à la calomnie qui perd Hippolyte, elle sombre dans le remords, puis s'empoisonne en confessant la vérité.",
    scenes: ["L'aveu à Œnone (acte I)", "La déclaration à Hippolyte (acte II)", "La jalousie et la mort (acte IV-V)"],
    monologueId: 'phedre-aveu',
    citation: "« C'est Vénus tout entière à sa proie attachée. »",
  },
  {
    id: 'hamlet', nom: 'Hamlet', initiale: 'H', piece: 'Hamlet', pieceId: 'hamlet',
    auteur: 'William Shakespeare', auteurId: 'shakespeare', emploi: 'Prince vengeur',
    psychologie: "Intellectuel tourmenté, Hamlet est paralysé par le doute et la conscience. Sa quête de vengeance se heurte à ses interrogations sur l'action, la mort et le sens de l'existence.",
    evolution: "De la révélation du spectre à la feinte folie, il diffère sa vengeance jusqu'au massacre final où il périt avec toute la cour.",
    scenes: ['La rencontre du spectre', '« Être ou ne pas être » (acte III)', 'Le duel final'],
    monologueId: 'etre-ou-ne-pas',
    citation: "« Il y a quelque chose de pourri au royaume de Danemark. »",
  },

  // ─── Molière ───────────────────────────────────────────────────────────
  {
    id: 'harpagon', nom: 'Harpagon', initiale: 'H', piece: "L'Avare", pieceId: 'lavare',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Barbon avare',
    psychologie: "Vieillard dévoré par l'avarice, Harpagon voit des voleurs partout et fait passer son argent avant ses enfants. Sa passion pour sa cassette confine à la folie et le rend tyrannique, ridicule et pathétique à la fois.",
    evolution: "Rival de son propre fils auprès de Mariane, il est floué de toutes parts ; le vol de sa cassette le plonge dans le délire, avant qu'un dénouement de comédie ne dénoue tout et le laisse retrouver, ému, son or.",
    scenes: ['Acte I, sc. 3 — la fouille de La Flèche', "Acte IV, sc. 7 — le monologue de la cassette (« Au voleur ! »)", 'Acte V — la confrontation avec Valère'],
    adaptations: ['Louis de Funès au cinéma (Jean Girault, 1980)', 'Michel Serrault à la Comédie-Française', "Mise en scène de Catherine Hiegel (2009)"],
    citation: "« Sans dot ! »",
  },
  {
    id: 'alceste', nom: 'Alceste', initiale: 'A', piece: 'Le Misanthrope', pieceId: 'le-misanthrope',
    auteur: 'Molière', auteurId: 'moliere', emploi: "L'atrabilaire amoureux",
    psychologie: "Épris d'absolu et de sincérité, Alceste hait l'hypocrisie sociale et exige une franchise totale. Son intransigeance, à la fois admirable et intenable, le rend malheureux — d'autant qu'il aime la coquette Célimène, tout ce qu'il déteste.",
    evolution: "De procès en brouilles, son exigence morale le coupe du monde. Après avoir démasqué Célimène, il refuse ses demi-mesures et choisit de fuir la société des hommes pour un « désert ».",
    scenes: ['Acte I, sc. 1 — la querelle avec Philinte', "Acte I, sc. 2 — le sonnet d'Oronte", 'Acte V — la rupture avec Célimène et la fuite'],
    adaptations: ['Film Alceste à bicyclette (Philippe Le Guay, 2013)', "Mise en scène de Clément Hervieu-Léger (Comédie-Française, 2016)", 'Lambert Wilson au théâtre'],
    citation: "« Je veux qu'on soit sincère, et qu'en homme d'honneur, on ne lâche aucun mot qui ne parte du cœur. »",
  },
  {
    id: 'argan', nom: 'Argan', initiale: 'A', piece: 'Le Malade imaginaire', pieceId: 'malade-imaginaire',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Hypocondriaque',
    psychologie: "Persuadé d'être malade, Argan est en réalité prisonnier de sa peur de la mort et des médecins qui l'exploitent. Égoïste et crédule, il veut marier sa fille à un médecin pour avoir un praticien sous la main.",
    evolution: "Manipulé par sa seconde femme Béline et par la Faculté, il est peu à peu détrompé par Toinette et son frère Béralde, jusqu'à la fausse mort qui lui révèle les cœurs — et son intronisation burlesque en médecin.",
    scenes: ['Acte I, sc. 1 — les comptes de l\'apothicaire', 'Acte III — Toinette déguisée en médecin', 'Acte III — la fausse mort et la cérémonie finale'],
    adaptations: ['Christian Hecq (Comédie-Française)', "Nombreuses mises en scène du ballet-comédie final", 'Daniel Auteuil au théâtre'],
    citation: "« Il y a plus de quatre-vingts et douze prises de médecine... »",
  },
  {
    id: 'scapin', nom: 'Scapin', initiale: 'S', piece: 'Les Fourberies de Scapin', pieceId: 'fourberies-scapin',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Valet fourbe',
    psychologie: "Valet rusé et virtuose de l'intrigue, Scapin manie le mensonge en artiste, par goût du jeu autant que par dévouement. Effronté, inventif, il se réjouit de sa propre habileté à mener les vieillards par le bout du nez.",
    evolution: "Sollicité par deux fils sans le sou, il extorque l'argent aux pères par des ruses de plus en plus audacieuses — dont la fameuse scène du sac — avant de feindre l'agonie pour se faire pardonner.",
    scenes: ['Acte II, sc. 7 — « Que diable allait-il faire dans cette galère ? »', 'Acte III, sc. 2 — la scène du sac et du bâton', 'Acte III — le faux mourant du dénouement'],
    adaptations: ['Daniel Auteuil et la mise en scène de Marcel Maréchal', "Comédie-Française (mise en scène de Denis Podalydès)", 'Nombreuses versions de tréteaux'],
    citation: "« Que diable allait-il faire dans cette galère ? »",
  },
  {
    id: 'arnolphe', nom: 'Arnolphe', initiale: 'A', piece: 'L\'École des femmes', pieceId: 'ecole-des-femmes',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Barbon jaloux',
    psychologie: "Obsédé par la peur d'être trompé, Arnolphe a fait élever Agnès dans l'ignorance pour s'en faire une épouse docile. Sous le tyran domestique perce, malgré lui, un homme qui finit par aimer vraiment — et en souffre.",
    evolution: "Son système vole en éclats à mesure qu'Agnès s'éveille à l'amour pour Horace. De maître assuré, il devient suppliant ridicule, puis dépassé par le dénouement qui lui arrache Agnès.",
    scenes: ['Acte II — les leçons et « les maximes du mariage »', 'Acte III — le récit naïf d\'Agnès', 'Acte V — les supplications désespérées à Agnès'],
    adaptations: ['Louis Jouvet, interprétation et mise en scène légendaires (1936)', "Mise en scène de Didier Bezace (2001)", 'Comédie-Française'],
    citation: "« Le petit chat est mort. »",
  },

  // ─── Corneille ─────────────────────────────────────────────────────────
  {
    id: 'rodrigue', nom: 'Rodrigue', initiale: 'R', piece: 'Le Cid', pieceId: 'le-cid', aka: ['Don Rodrigue'],
    auteur: 'Corneille', auteurId: 'corneille', emploi: 'Héros cornélien',
    psychologie: "Jeune homme déchiré entre l'amour et l'honneur, Rodrigue incarne le héros cornélien : la gloire et le devoir l'emportent sur la passion, mais au prix d'un déchirement intime que rien n'apaise.",
    evolution: "Contraint de venger son père en tuant celui de Chimène, il conquiert ensuite sa légende en repoussant les Maures (« le Cid »), transformant sa faute privée en gloire publique pour mériter enfin Chimène.",
    scenes: ['Acte I, sc. 6 — les stances (« Percé jusques au fond du cœur… »)', 'Acte III, sc. 4 — la confrontation avec Chimène', 'Acte IV — le récit de la bataille contre les Maures'],
    adaptations: ['Gérard Philipe au TNP (Jean Vilar, 1951)', "Mise en scène de Thomas Le Douarec", 'Comédie-Française, nombreuses reprises'],
    monologueId: 'stances-cid',
    citation: "« Percé jusques au fond du cœur / D'une atteinte imprévue aussi bien que mortelle… »",
  },
  {
    id: 'chimene', nom: 'Chimène', initiale: 'C', piece: 'Le Cid', pieceId: 'le-cid',
    auteur: 'Corneille', auteurId: 'corneille', emploi: 'Héroïne cornélienne',
    psychologie: "Aussi entière que Rodrigue, Chimène aime celui qui a tué son père et se doit pourtant de réclamer sa mort. Son honneur et sa passion la déchirent à égalité, dans une lutte où l'amour affleure sous chaque exigence de vengeance.",
    evolution: "Elle poursuit Rodrigue en justice tout en tremblant pour sa vie, jusqu'à laisser paraître son amour ; le roi impose un délai qui, sans effacer le deuil, ouvre la voie à leur union.",
    scenes: ['Acte III, sc. 4 — « Va, je ne te hais point »', 'Acte IV, sc. 5 — la feinte de la mort de Rodrigue', 'Acte V — la demande de justice au roi'],
    adaptations: ['Comédie-Française, rôle de répertoire', "Mises en scène contemporaines multiples"],
    citation: "« Va, je ne te hais point. »",
  },

  // ─── Racine ────────────────────────────────────────────────────────────
  {
    id: 'neron', nom: 'Néron', initiale: 'N', piece: 'Britannicus', pieceId: 'britannicus',
    auteur: 'Racine', auteurId: 'racine', emploi: 'Tyran naissant',
    psychologie: "« Monstre naissant », Néron bascule de l'empereur encore vertueux au tyran. La jalousie envers Britannicus et le désir pour Junie réveillent en lui une cruauté que ni sa mère Agrippine ni son gouverneur Burrhus ne peuvent plus contenir.",
    evolution: "D'abord retenu par la crainte d'Agrippine et les conseils de Burrhus, il s'affranchit peu à peu de toute tutelle, écoute le perfide Narcisse et empoisonne Britannicus — franchissant le seuil du crime dont il ne reviendra pas.",
    scenes: ['Acte II, sc. 2 — l\'enlèvement et l\'espionnage de Junie', 'Acte II, sc. 6 — Junie contrainte de repousser Britannicus', 'Acte V — l\'empoisonnement de Britannicus'],
    adaptations: ['Comédie-Française, rôle majeur du répertoire', "Mise en scène de Stéphane Braunschweig", 'Mise en scène de Jean-Louis Martinelli'],
    citation: "« J'embrasse mon rival, mais c'est pour l'étouffer. »",
  },
  {
    id: 'hermione', nom: 'Hermione', initiale: 'H', piece: 'Andromaque', pieceId: 'andromaque',
    auteur: 'Racine', auteurId: 'racine', emploi: 'Amoureuse jalouse',
    psychologie: "Promise à Pyrrhus qui lui préfère Andromaque, Hermione est ravagée par une passion humiliée. Orgueil et amour se confondent en une jalousie dévorante qui la pousse au bord de la folie meurtrière.",
    evolution: "Ballottée entre l'espoir et le dépit, elle arme la main d'Oreste pour tuer Pyrrhus, puis, apprenant le meurtre accompli, se retourne contre Oreste, maudit son crime et se donne la mort sur le corps de l'aimé.",
    scenes: ['Acte II, sc. 1 — les confidences à Cléone', 'Acte IV, sc. 3 — « Je t\'aimais inconstant, qu\'aurais-je fait fidèle ? »', 'Acte V, sc. 3 — « Où suis-je ? Qu\'ai-je fait ? »'],
    adaptations: ['Rôle-phare des grandes tragédiennes (Rachel, Sarah Bernhardt)', "Comédie-Française, reprises régulières"],
    citation: "« Qui te l'a dit ? »",
  },
  {
    id: 'andromaque', nom: 'Andromaque', initiale: 'A', piece: 'Andromaque', pieceId: 'andromaque',
    auteur: 'Racine', auteurId: 'racine', emploi: 'Veuve fidèle',
    psychologie: "Veuve d'Hector et captive de Pyrrhus, Andromaque n'est plus que mère : tout son être se voue à sauver son fils Astyanax. Fidèle à la mémoire d'Hector, elle oppose à la passion de Pyrrhus une dignité inébranlable.",
    evolution: "Sommée d'épouser Pyrrhus pour sauver l'enfant, elle imagine un « innocent stratagème » — l'épouser puis se tuer. La mort de Pyrrhus la laisse paradoxalement reine d'Épire, gardienne de son fils.",
    scenes: ['Acte I, sc. 4 — la supplique à Pyrrhus', 'Acte III, sc. 8 — la délibération sur le sort d\'Astyanax', 'Acte IV, sc. 1 — le « funeste dessein »'],
    adaptations: ['Comédie-Française, pilier du répertoire', "Mise en scène de Muriel Mayette", 'Nombreuses lectures scolaires et scéniques'],
    citation: "« Songe, songe, Céphise, à cette nuit cruelle / Qui fut pour tout un peuple une nuit éternelle. »",
  },

  // ─── Musset ────────────────────────────────────────────────────────────
  {
    id: 'lorenzo', nom: 'Lorenzo', initiale: 'L', piece: 'Lorenzaccio', pieceId: 'lorenzaccio',
    auteur: 'Musset', auteurId: 'musset', emploi: 'Héros romantique',
    psychologie: "Idéaliste qui s'est fait débauché pour approcher le tyran, Lorenzo (« Lorenzaccio ») s'est perdu dans le masque : à force de jouer le vice, il ne sait plus s'il agit par vertu ou par vertige. Figure du doute romantique par excellence.",
    evolution: "Résolu à assassiner le duc Alexandre pour libérer Florence, il accomplit son meurtre — mais le peuple ne se soulève pas ; désabusé, il erre puis se laisse tuer, ayant sacrifié son âme pour un geste vain.",
    scenes: ['Acte III, sc. 3 — la grande confession à Philippe Strozzi', 'Acte IV — la préparation et le meurtre du duc', 'Acte V — la mort de Lorenzo'],
    adaptations: ['Sarah Bernhardt dans le rôle-titre (1896)', "Gérard Philipe au TNP", 'Mise en scène de Georges Lavaudant'],
    citation: "« Je suis plus creux et plus vide qu'une statue de fer-blanc. »",
  },
  {
    id: 'perdican', nom: 'Perdican', initiale: 'P', piece: "On ne badine pas avec l'amour", pieceId: 'on-ne-badine-pas',
    auteur: 'Musset', auteurId: 'musset', emploi: 'Jeune premier',
    psychologie: "Jeune homme brillant et orgueilleux, Perdican aime Camille mais se pique de son refus. Blessé dans sa fierté, il joue avec les sentiments de la petite Rosette pour piquer Camille — sans mesurer que l'on ne badine pas avec l'amour.",
    evolution: "De la cour blessée au dépit, il en vient à un aveu sincère ; mais son jeu cruel a fait une victime : Rosette meurt de chagrin, et cette mort sépare à jamais les deux amants qui s'aimaient.",
    scenes: ['Acte II, sc. 5 — la dispute philosophique avec Camille', 'Acte III — la scène de la fontaine avec Rosette', 'Acte III, sc. 8 — le dénouement tragique'],
    adaptations: ['Comédie-Française, pièce de répertoire', "Mise en scène d'Yves Beaunesne", 'Nombreuses versions scolaires'],
    citation: "« Tous les hommes sont menteurs, inconstants… mais il y a au monde quelque chose de saint et de sublime, c'est l'union de deux de ces êtres si imparfaits et si affreux. »",
  },

  // ─── Shakespeare ───────────────────────────────────────────────────────
  {
    id: 'romeo', nom: 'Roméo', initiale: 'R', piece: 'Roméo et Juliette', pieceId: 'romeo-juliette',
    auteur: 'Shakespeare', auteurId: 'shakespeare', emploi: 'Jeune amoureux',
    psychologie: "Cœur ardent et lyrique, Roméo passe de la mélancolie amoureuse (pour Rosaline) au coup de foudre absolu pour Juliette. Impulsif et entier, il aime et agit sans mesure, jusqu'au tragique.",
    evolution: "Le mariage secret, puis le meurtre de Tybalt et l'exil précipitent sa chute ; croyant Juliette morte, il s'empoisonne près d'elle — une seconde trop tôt, scellant la fatalité des amants.",
    scenes: ['Acte I, sc. 5 — la rencontre au bal des Capulet', 'Acte II, sc. 2 — la scène du balcon', 'Acte V, sc. 3 — le tombeau et le suicide'],
    adaptations: ['Film de Franco Zeffirelli (1968)', "Roméo + Juliette de Baz Luhrmann (1996)", 'Comédie musicale de Gérard Presgurvic'],
    citation: "« Mais doucement ! Quelle lumière jaillit par cette fenêtre ? »",
  },
  {
    id: 'juliette', nom: 'Juliette', initiale: 'J', piece: 'Roméo et Juliette', pieceId: 'romeo-juliette',
    auteur: 'Shakespeare', auteurId: 'shakespeare', emploi: 'Jeune amoureuse',
    psychologie: "À peine quatorze ans, Juliette révèle une maturité et un courage que rien ne laissait présager. D'enfant obéissante, elle devient une femme résolue, prête à défier sa famille et à risquer la mort par amour.",
    evolution: "Du bal au balcon, du mariage secret au faux poison de Frère Laurent, elle brave tout pour rejoindre Roméo ; réveillée trop tard dans le tombeau, elle se tue sur son corps.",
    scenes: ['Acte II, sc. 2 — la scène du balcon', 'Acte IV, sc. 3 — la potion de Frère Laurent', 'Acte V, sc. 3 — le réveil et le suicide'],
    adaptations: ['Olivia Hussey chez Zeffirelli (1968)', "Claire Danes chez Baz Luhrmann (1996)", 'Ballet de Prokofiev'],
    citation: "« Roméo, Roméo ! Pourquoi es-tu Roméo ? »",
  },
  {
    id: 'macbeth', nom: 'Macbeth', initiale: 'M', piece: 'Macbeth', pieceId: 'macbeth',
    auteur: 'Shakespeare', auteurId: 'shakespeare', emploi: 'Tyran tragique',
    psychologie: "Brave général rongé par l'ambition, Macbeth cède à la prophétie des sorcières et à l'aiguillon de sa femme. Lucide sur le mal qu'il commet, il s'y enfonce pourtant, hanté par la culpabilité et la peur.",
    evolution: "Du meurtre de Duncan à l'enchaînement de crimes pour garder le trône, il se coupe de tout et sombre dans la paranoïa ; les prophéties se retournent contre lui et il meurt les armes à la main face à Macduff.",
    scenes: ['Acte I, sc. 3 — la rencontre des sorcières', 'Acte II, sc. 1 — « Est-ce un poignard que je vois là ? »', 'Acte V — « La vie n\'est qu\'une ombre qui marche »'],
    adaptations: ['Film d\'Orson Welles (1948)', "Throne of Blood d'Akira Kurosawa (1957)", 'Film de Justin Kurzel (2015) avec Michael Fassbender'],
    citation: "« La vie n'est qu'une ombre qui marche, un pauvre acteur qui se pavane… »",
  },
  {
    id: 'lady-macbeth', nom: 'Lady Macbeth', initiale: 'L', piece: 'Macbeth', pieceId: 'macbeth',
    auteur: 'Shakespeare', auteurId: 'shakespeare', emploi: 'Instigatrice',
    psychologie: "Ambitieuse et volontaire, Lady Macbeth est le moteur du crime : elle appelle les puissances des ténèbres à la « déviriliser » pour étouffer tout scrupule et pousse son mari au meurtre par la force de sa volonté.",
    evolution: "D'abord plus résolue que Macbeth, elle craque sous le poids du remords : la femme d'acier devient somnambule, se frottant les mains d'un sang qui ne part pas, avant de sombrer et de se donner la mort.",
    scenes: ['Acte I, sc. 5 — « Venez, esprits… désexez-moi »', 'Acte II, sc. 2 — juste après le meurtre de Duncan', 'Acte V, sc. 1 — la scène du somnambulisme (« Out, damned spot ! »)'],
    adaptations: ['Rôle-phare de Judi Dench, Marion Cotillard', "Opéra de Verdi", 'Nombreuses relectures féministes'],
    citation: "« Va-t'en, tache maudite ! Va-t'en, dis-je ! »",
  },

  // ─── Sophocle ──────────────────────────────────────────────────────────
  {
    id: 'oedipe', nom: 'Œdipe', initiale: 'Œ', piece: 'Œdipe roi', pieceId: 'oedipe-roi',
    auteur: 'Sophocle', auteurId: 'sophocle', emploi: 'Roi tragique',
    psychologie: "Roi juste et intelligent, sauveur de Thèbes, Œdipe est aussi orgueilleux et emporté. Sa volonté acharnée de connaître la vérité — moteur de sa grandeur — devient l'instrument de sa perte.",
    evolution: "Menant l'enquête sur le meurtre de Laïos, il découvre qu'il est lui-même le coupable, qu'il a tué son père et épousé sa mère ; accablé, il se crève les yeux et s'exile, aveugle et clairvoyant à la fois.",
    scenes: ['Le prologue — la peste sur Thèbes', 'L\'affrontement avec le devin Tirésias', 'Le dénouement — la révélation et l\'aveuglement'],
    adaptations: ['Œdipe roi de Pier Paolo Pasolini (1967)', "Mise en scène d'Ariane Mnouchkine", 'Nombreuses relectures (Cocteau, La Machine infernale)'],
    citation: "« Ô lumière, que je te voie aujourd'hui pour la dernière fois ! »",
  },

  // ─── Hugo ──────────────────────────────────────────────────────────────
  {
    id: 'ruy-blas', nom: 'Ruy Blas', initiale: 'R', piece: 'Ruy Blas', pieceId: 'ruy-blas',
    auteur: 'Victor Hugo', auteurId: 'hugo', emploi: 'Laquais amoureux',
    psychologie: "« Ver de terre amoureux d'une étoile », Ruy Blas est un valet de génie qui aime en secret la reine d'Espagne. Instrument de la vengeance de Don Salluste, il porte avec noblesse un habit d'emprunt et une passion impossible.",
    evolution: "Devenu ministre sous une fausse identité, il gouverne avec grandeur et se fait aimer de la reine ; mais Don Salluste revient dénouer son piège. Pour sauver l'honneur de la reine, Ruy Blas tue son maître et s'empoisonne.",
    scenes: ['Acte II — la rencontre avec la reine', 'Acte III, sc. 2 — « Bon appétit, messieurs ! »', 'Acte V — le dénouement et la mort'],
    adaptations: ['La Folie des grandeurs (Gérard Oury, 1971), parodie avec de Funès et Montand', "Comédie-Française, reprises", 'Mise en scène de Christian Schiaretti'],
    citation: "« Bon appétit, messieurs ! Ô ministres intègres ! »",
  },
  {
    id: 'hernani', nom: 'Hernani', initiale: 'H', piece: 'Hernani', pieceId: 'hernani',
    auteur: 'Victor Hugo', auteurId: 'hugo', emploi: 'Proscrit romantique',
    psychologie: "Noble déguisé en bandit, Hernani est le héros romantique par excellence : proscrit, fatal, dévoré par l'amour de Doña Sol et par un serment d'honneur qui pèse sur lui comme une malédiction.",
    evolution: "Rival du roi Don Carlos et lié à Don Ruy Gomez par une dette d'honneur, il conquiert Doña Sol ; mais le cor fatal de Ruy Gomez retentit le soir de ses noces et l'oblige à tenir sa parole : les amants meurent ensemble.",
    scenes: ['Acte I — l\'armoire et les trois hommes chez Doña Sol', 'Acte III — le serment au cor', 'Acte V — le cor fatal et la mort des amants'],
    adaptations: ['Symbole de la « bataille d\'Hernani » (1830)', "Comédie-Française, mise en scène d'Antoine Vitez", 'Mise en scène d\'Anne Delbée'],
    citation: "« Je suis une force qui va ! »",
  },

  // ─── Rostand ───────────────────────────────────────────────────────────
  {
    id: 'roxane', nom: 'Roxane', initiale: 'R', piece: 'Cyrano de Bergerac', pieceId: 'cyrano',
    auteur: 'Edmond Rostand', auteurId: 'rostand', emploi: 'Précieuse aimée',
    psychologie: "Belle précieuse éprise de bel esprit, Roxane aime les mots autant que les hommes. Séduite par la beauté de Christian et les lettres de Cyrano, elle met du temps à comprendre qu'elle aimait, à travers deux hommes, une seule âme.",
    evolution: "Elle épouse Christian, puis le perd à la guerre ; retirée au couvent, elle vénère sa mémoire quinze ans durant, jusqu'à découvrir, à l'instant de la mort de Cyrano, que c'est lui l'auteur des lettres — et l'homme qu'elle aimait.",
    scenes: ['Acte II — le rendez-vous où Cyrano espérait être aimé', 'Acte III — la scène du balcon', 'Acte V — la dernière lettre lue dans le soir'],
    adaptations: ['Anne Brochet dans le film de Rappeneau (1990)', "Nombreuses reprises à la Comédie-Française", 'Mise en scène de Denis Podalydès'],
    citation: "« Un baiser, mais à tout prendre, qu'est-ce ? Un serment fait d'un peu plus près… »",
  },

  // ─── Ibsen ─────────────────────────────────────────────────────────────
  {
    id: 'nora', nom: 'Nora', initiale: 'N', piece: 'Maison de poupée', pieceId: 'maison-poupee',
    auteur: 'Henrik Ibsen', auteurId: 'ibsen', emploi: 'Épouse en éveil',
    psychologie: "D'abord « petite alouette » et « écureuil » aux yeux de son mari, Nora joue le rôle de l'épouse-enfant tout en cachant un secret : elle a jadis emprunté en fraude pour sauver Torvald. Sous la poupée couve une conscience qui s'éveille.",
    evolution: "Le chantage de Krogstad et l'égoïsme de Torvald face au scandale lui ouvrent les yeux : elle comprend n'avoir jamais été qu'un jouet. Elle claque la porte de la « maison de poupée » pour se chercher elle-même — fin qui fit scandale.",
    scenes: ['Acte I — la dette cachée et la tarentelle', 'Acte III — la lettre de Krogstad découverte par Torvald', 'Acte III — le départ final et la porte qui claque'],
    adaptations: ['Rôle emblématique du théâtre moderne', "Mise en scène de Thomas Ostermeier (Nora, 2004)", 'Nombreuses relectures féministes ; suite A Doll\'s House Part 2'],
    citation: "« Je crois que je suis avant tout un être humain, tout comme toi. »",
  },
];

// Normalise un nom de rôle pour le rapprochement distribution ↔ fiche :
// minuscules, sans accents, espaces compactés, et « dom » ↔ « don »
// (Dom Juan / Don Juan, Dom Carlos / Don Carlos… conventions théâtrales).
const normRole = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/^dom\b/, 'don').replace(/\s+/g, ' ').trim();

const FICHE_BY_PIECE_ROLE = new Map<string, string>();
for (const p of PERSONNAGES) {
  if (!p.pieceId) continue;
  for (const label of [p.nom, ...(p.aka ?? [])]) {
    FICHE_BY_PIECE_ROLE.set(`${p.pieceId}::${normRole(label)}`, p.id);
  }
}

// Renvoie l'id de la fiche personnage correspondant à un rôle d'une pièce donnée,
// ou undefined si aucune fiche détaillée n'existe.
export function ficheFor(pieceId: string, role: string): string | undefined {
  return FICHE_BY_PIECE_ROLE.get(`${pieceId}::${normRole(role)}`);
}
