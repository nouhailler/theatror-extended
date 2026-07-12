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
    monologueId: 'harpagon-cassette',
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
    monologueId: 'lady-macbeth',
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

  // ─── Molière (suite) ───────────────────────────────────────────────────
  {
    id: 'orgon', nom: 'Orgon', initiale: 'O', piece: 'Tartuffe', pieceId: 'tartuffe',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Bourgeois aveuglé',
    psychologie: "Père de famille autoritaire mais crédule, Orgon voue à Tartuffe une dévotion aveugle qui confine au fanatisme. Sa passion pour le faux dévot le rend sourd à sa famille et prêt à la sacrifier tout entière.",
    evolution: "De protecteur enthousiaste de l'imposteur, il devient sa victime : il lui donne sa fille, sa fortune, sa maison — jusqu'à ce que la scène de la table lui dessille enfin les yeux, trop tard pour éviter le désastre.",
    scenes: ['Acte I, sc. 4 — « Et Tartuffe ? » / « Le pauvre homme ! »', 'Acte III, sc. 6 — la donation à Tartuffe', 'Acte IV, sc. 5 — caché sous la table'],
    citation: "« Le pauvre homme ! »",
  },
  {
    id: 'elmire', nom: 'Elmire', initiale: 'E', piece: 'Tartuffe', pieceId: 'tartuffe',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Épouse habile',
    psychologie: "Femme d'Orgon, honnête et fine, Elmire préfère l'adresse à l'éclat. Plutôt que de s'indigner, elle tend un piège calculé à Tartuffe pour confondre l'hypocrite sous les yeux mêmes de son mari.",
    evolution: "Discrète d'abord face aux avances de Tartuffe, elle prend l'initiative décisive : la scène de la table où elle le pousse à se démasquer pendant qu'Orgon écoute, sauvant la famille par sa lucidité.",
    scenes: ['Acte III, sc. 3 — la première déclaration de Tartuffe', 'Acte IV, sc. 5 — le piège de la table', 'Acte IV, sc. 6 — Orgon détrompé'],
    citation: "« Les gens comme vous savent flatter les sens. »",
  },
  {
    id: 'dorine', nom: 'Dorine', initiale: 'D', piece: 'Tartuffe', pieceId: 'tartuffe',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Suivante impertinente',
    psychologie: "Servante au franc-parler, Dorine incarne le bon sens populaire face à l'aveuglement des maîtres. Insolente et lucide, elle dit tout haut ce que la bienséance tait et défend Mariane contre la tyrannie d'Orgon.",
    evolution: "Elle raille sans relâche la fausse dévotion, tient tête à Orgon, souffle aux amoureux leur conduite et se démène pour déjouer le mariage forcé — véritable metteur en scène de la résistance familiale.",
    scenes: ['Acte I, sc. 1 — la tirade face à Madame Pernelle', 'Acte II, sc. 2 — l\'affrontement avec Orgon', 'Acte II, sc. 4 — la réconciliation des amoureux'],
    citation: "« Vous êtes donc bien tendre à la tentation. »",
  },
  {
    id: 'agnes', nom: 'Agnès', initiale: 'A', piece: "L'École des femmes", pieceId: 'ecole-des-femmes',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Ingénue',
    psychologie: "Élevée dans l'ignorance pour rester docile, Agnès est l'ingénue par excellence — mais sa naïveté cache une intelligence et un cœur qui s'éveillent d'un coup à l'amour, déjouant tous les calculs d'Arnolphe.",
    evolution: "De jeune fille candide récitant ses « maximes », elle découvre le désir avec Horace, apprend à ruser, à écrire, à désobéir — et affirme, dans l'acte V, une liberté neuve qui laisse Arnolphe désarmé.",
    scenes: ['Acte II, sc. 5 — le récit naïf du « petit chat »', 'Acte III — la lettre à Horace', 'Acte V — « Que ne vous êtes-vous comme lui fait aimer ? »'],
    citation: "« Le moyen de chasser ce qui fait du plaisir ? »",
  },
  {
    id: 'sganarelle-dj', nom: 'Sganarelle', initiale: 'S', piece: 'Dom Juan', pieceId: 'dom-juan',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Valet couard',
    psychologie: "Valet de Dom Juan, Sganarelle est partagé entre la peur, la morale et la fascination pour son maître. Superstitieux et lâche, il désapprouve tout haut les débauches qu'il sert tout bas — double comique et conscience impuissante.",
    evolution: "Il assiste, mi-effrayé mi-complice, à toutes les provocations de Dom Juan ; après l'engloutissement du libertin, il ne lui reste que sa fameuse plainte matérielle : « Mes gages ! »",
    scenes: ['Acte I, sc. 1 — l\'éloge du tabac', 'Acte III — la dispute sur la religion (« Je crois que deux et deux sont quatre »)', 'Acte V — « Mes gages ! »'],
    citation: "« Mes gages ! mes gages ! mes gages ! »",
  },

  // ─── Corneille (suite) ─────────────────────────────────────────────────
  {
    id: 'auguste', nom: 'Auguste', initiale: 'A', piece: 'Cinna', pieceId: 'cinna',
    auteur: 'Corneille', auteurId: 'corneille', emploi: 'Empereur magnanime',
    psychologie: "Empereur parvenu au faîte du pouvoir par la violence, Auguste est las du trône et rongé par le doute. Découvrant la conjuration de Cinna qu'il aimait comme un fils, il livre en lui-même le combat entre la vengeance et la clémence.",
    evolution: "De la tentation d'abdiquer à la découverte du complot, il choisit finalement le pardon — geste souverain qui le grandit et fonde sa gloire : « Je suis maître de moi comme de l'univers. »",
    scenes: ['Acte II, sc. 1 — la délibération sur l\'abdication', 'Acte IV — la découverte de la conjuration', 'Acte V, sc. 3 — « Soyons amis, Cinna »'],
    citation: "« Je suis maître de moi comme de l'univers. »",
  },
  {
    id: 'cinna', nom: 'Cinna', initiale: 'C', piece: 'Cinna', pieceId: 'cinna',
    auteur: 'Corneille', auteurId: 'corneille', emploi: 'Conjuré partagé',
    psychologie: "Petit-fils de Pompée, Cinna conspire contre Auguste par amour pour Émilie autant que par idéal républicain. Mais la bonté du tyran qu'il veut tuer le déchire : sa parole donnée à Émilie s'oppose à sa reconnaissance grandissante.",
    evolution: "Meneur ardent de la conjuration, il vacille à mesure qu'Auguste le comble de bienfaits ; démasqué, il assume son crime avant d'être submergé par la clémence impériale qui le désarme et le rachète.",
    scenes: ['Acte I, sc. 3 — le récit enflammé de la conjuration', 'Acte III, sc. 4 — les remords face à Maxime', 'Acte V — l\'aveu et le pardon'],
    citation: "« Je sais ce que je suis, et ce que je vous dois. »",
  },

  // ─── Racine (suite) ────────────────────────────────────────────────────
  {
    id: 'berenice', nom: 'Bérénice', initiale: 'B', piece: 'Bérénice', pieceId: 'berenice',
    auteur: 'Racine', auteurId: 'racine', emploi: 'Reine sacrifiée',
    psychologie: "Reine de Palestine aimée de Titus, Bérénice croit au bonheur jusqu'à ce que la raison d'État le lui arrache. Femme entière et digne, elle passe de l'amour comblé à la douleur de l'absolu renoncement.",
    evolution: "De l'attente heureuse des noces à l'incompréhension, puis à la révolte et enfin à la grandeur : elle s'impose de partir pour que Titus règne, transformant sa souffrance en héroïsme de la retenue.",
    scenes: ['Acte IV, sc. 5 — « Pour jamais ! Ah, Seigneur ! songez-vous en vous-même… »', 'Acte V — les adieux', 'Acte V, sc. dernière — « Que le jour recommence et que le jour finisse… »'],
    citation: "« Dans un mois, dans un an, comment souffrirons-nous, / Seigneur, que tant de mers me séparent de vous ? »",
  },
  {
    id: 'titus', nom: 'Titus', initiale: 'T', piece: 'Bérénice', pieceId: 'berenice',
    auteur: 'Racine', auteurId: 'racine', emploi: 'Empereur déchiré',
    psychologie: "Nouvel empereur de Rome, Titus aime Bérénice mais découvre que Rome n'acceptera jamais une reine. Le devoir impérial et la passion se livrent en lui un combat où l'homme s'efface douloureusement devant le souverain.",
    evolution: "Il diffère l'aveu, cherche des détours, songe même à mourir, avant de trouver la force de renoncer publiquement à Bérénice — sacrifice qui scelle sa gloire au prix de son bonheur.",
    scenes: ['Acte II, sc. 2 — la résolution douloureuse', 'Acte IV, sc. 5 — la confrontation avec Bérénice', 'Acte V — le triple renoncement'],
    citation: "« Je n'ai que trop pris soin de vous montrer mes larmes. »",
  },

  // ─── Beaumarchais (suite) ──────────────────────────────────────────────
  {
    id: 'suzanne', nom: 'Suzanne', initiale: 'S', piece: 'Le Mariage de Figaro', pieceId: 'mariage-figaro',
    auteur: 'Beaumarchais', auteurId: 'beaumarchais', emploi: 'Camériste rusée',
    psychologie: "Fiancée de Figaro et camériste de la Comtesse, Suzanne est vive, spirituelle et plus fine encore que Figaro. C'est elle qui déjoue le Comte : l'intelligence pratique et le sang-froid au service de son mariage et de sa vertu.",
    evolution: "Menacée par le « droit du seigneur » que convoite le Comte, elle mène le jeu des travestissements de la « folle journée », piège Almaviva dans le noir des marronniers et sauve à la fois son honneur et son amour.",
    scenes: ['Acte I, sc. 1 — la révélation des intentions du Comte', 'Acte IV — le billet dicté à la Comtesse', 'Acte V — la scène des marronniers'],
    citation: "« Est-ce qu'on n'est pas toujours assez riche pour attendre ? »",
  },
  {
    id: 'cherubin', nom: 'Chérubin', initiale: 'C', piece: 'Le Mariage de Figaro', pieceId: 'mariage-figaro',
    auteur: 'Beaumarchais', auteurId: 'beaumarchais', emploi: 'Page amoureux',
    psychologie: "Adolescent que l'amour trouble tout entier, Chérubin aime toutes les femmes et surtout la Comtesse. Figure de l'éveil du désir, il incarne la grâce, l'émoi et l'impertinence de la jeunesse.",
    evolution: "Renvoyé par le Comte jaloux, il se cache, se travestit, multiplie les émois et les quiproquos ; son innocence espiègle alimente toute l'intrigue avant qu'on l'expédie à l'armée — sans qu'il cesse de revenir.",
    scenes: ['Acte I, sc. 7 — « Non, je ne sais plus ce que je suis »', 'Acte II — le travestissement et le saut par la fenêtre', 'Acte II, sc. 4 — la romance « Mon coursier hors d\'haleine »'],
    citation: "« Je ne sais plus ce que je suis ; mais depuis quelque temps je sens ma poitrine agitée… »",
  },

  // ─── Musset (suite) ────────────────────────────────────────────────────
  {
    id: 'camille', nom: 'Camille', initiale: 'C', piece: "On ne badine pas avec l'amour", pieceId: 'on-ne-badine-pas',
    auteur: 'Musset', auteurId: 'musset', emploi: 'Jeune fille blessée',
    psychologie: "Élevée au couvent et marquée par les confidences amères des religieuses, Camille se méfie de l'amour et des hommes. Orgueil, peur d'être trahie et passion refoulée pour Perdican se disputent en elle.",
    evolution: "De la froideur affichée au duel verbal avec Perdican, elle laisse enfin paraître son amour ; mais l'orgueil des deux jeunes gens et la mort de Rosette brisent tout : « Adieu, Perdican. »",
    scenes: ['Acte II, sc. 5 — la joute sur l\'amour et les couvents', 'Acte III — l\'aveu surpris derrière le mur', 'Acte III, sc. 8 — « Adieu, Perdican »'],
    monologueId: 'camille-amour',
    citation: "« Adieu, Perdican. »",
  },
  {
    id: 'celimene', nom: 'Célimène', initiale: 'C', piece: 'Le Misanthrope', pieceId: 'le-misanthrope',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Coquette mondaine',
    psychologie: "Jeune veuve brillante et médisante, Célimène règne sur les salons par son esprit. Coquette assumée, elle aime être courtisée et redoute l'engagement — tout ce qui rend Alceste furieux et amoureux à la fois.",
    evolution: "Maîtresse du jeu des soupirants, elle est prise à son propre piège quand ses lettres contradictoires sont dévoilées ; démasquée, elle refuse pourtant de suivre Alceste au « désert » : elle a vingt ans et aime le monde.",
    scenes: ['Acte II, sc. 4 — la scène des portraits', 'Acte V — la lecture publique des lettres', 'Acte V — le refus final de suivre Alceste'],
    citation: "« La solitude effraie une âme de vingt ans. »",
  },

  // ─── Hugo (suite) ──────────────────────────────────────────────────────
  {
    id: 'don-salluste', nom: 'Don Salluste', initiale: 'D', piece: 'Ruy Blas', pieceId: 'ruy-blas',
    auteur: 'Victor Hugo', auteurId: 'hugo', emploi: 'Grand d\'Espagne vindicatif',
    psychologie: "Ministre disgracié et froid, Don Salluste met toute son intelligence au service d'une seule passion : la vengeance contre la reine qui l'a chassé. Cynique et méthodique, il manie les êtres comme des instruments.",
    evolution: "Il façonne son valet Ruy Blas en faux seigneur pour perdre la reine, tisse patiemment son piège — mais son mépris pour ceux qu'il utilise le perd : Ruy Blas se retourne et le tue avant de mourir.",
    scenes: ['Acte I, sc. 1 — l\'exposition du plan de vengeance', 'Acte IV — le retour et le resserrement du piège', 'Acte V — le dénouement où il est tué par Ruy Blas'],
    citation: "« Je construis un édifice, et je bâtis sur toi. »",
  },

  // ─── Sophocle (suite) ──────────────────────────────────────────────────
  {
    id: 'creon', nom: 'Créon', initiale: 'C', piece: 'Antigone', pieceId: 'antigone-sophocle',
    auteur: 'Sophocle', auteurId: 'sophocle', emploi: 'Roi intransigeant',
    psychologie: "Nouveau maître de Thèbes, Créon confond l'ordre de l'État avec sa propre volonté. Soucieux d'autorité et de cohérence, il fait de l'intransigeance une vertu — jusqu'à l'aveuglement tragique qui le dresse contre les lois non écrites.",
    evolution: "De législateur assuré condamnant Antigone, il s'obstine malgré les avertissements de son fils Hémon et du devin Tirésias ; quand il cède enfin, il est trop tard : Antigone, Hémon et Eurydice sont morts, et il reste anéanti.",
    scenes: ['L\'édit interdisant d\'ensevelir Polynice', 'L\'affrontement avec Antigone puis avec Hémon', 'La prophétie de Tirésias et le dénouement'],
    adaptations: ['Antigone d\'Anouilh (1944) — relecture du couple Créon/Antigone', "Mises en scène contemporaines multiples", 'Opéra Œdipus Rex de Stravinsky (univers proche)'],
    citation: "« Il n'est pas de plus grand fléau que l'anarchie. »",
  },

  // ─── Molière (suite 2) ─────────────────────────────────────────────────
  {
    id: 'monsieur-jourdain', nom: 'Monsieur Jourdain', initiale: 'J', piece: 'Le Bourgeois gentilhomme', pieceId: 'bourgeois-gentilhomme',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Bourgeois vaniteux', aka: ['Jourdain'],
    psychologie: "Riche bourgeois obsédé par la noblesse, Monsieur Jourdain veut acheter les manières des gens de qualité. Vaniteux, crédule et touchant, il se fait plumer par tous ceux qui flattent sa lubie de paraître ce qu'il n'est pas.",
    evolution: "De leçon de danse en leçon de philosophie, il s'enfonce dans le ridicule ; manipulé par Dorante et grisé par la cérémonie turque du « Mamamouchi », il finit dupé mais heureux, roi de sa propre comédie.",
    scenes: ['Acte II — « Il y a plus de quarante ans que je dis de la prose »', 'Acte III — la leçon de belles manières', 'Acte IV — la cérémonie turque du Mamamouchi'],
    adaptations: ['Michel Serrault, Jean Le Poulain à la Comédie-Française', "Comédie-ballet reprise avec la musique de Lully", 'Mise en scène de Denis Podalydès (2020)'],
    citation: "« Par ma foi ! il y a plus de quarante ans que je dis de la prose sans que j'en susse rien. »",
  },
  {
    id: 'philaminte', nom: 'Philaminte', initiale: 'P', piece: 'Les Femmes savantes', pieceId: 'femmes-savantes',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Bel esprit autoritaire',
    psychologie: "Maîtresse femme éprise de savoir et de beaux discours, Philaminte règne en despote sur sa maison au nom de la philosophie et des lettres. Sincère dans sa soif de culture, elle en devient tyrannique et aveugle au ridicule de son pédantisme.",
    evolution: "Elle impose Trissotin comme gendre et méprise le bon sens de son mari ; une fausse ruine dévoile l'imposteur, et Philaminte, détrompée sur le faux savant, retrouve un peu de mesure au dénouement.",
    scenes: ['Acte III — la lecture des vers de Trissotin', 'Acte III — le renvoi de la servante Martine « pour faute de grammaire »', 'Acte V — la fausse ruine qui démasque Trissotin'],
    citation: "« Nul n'aura de l'esprit hors nous et nos amis. »",
  },
  {
    id: 'trissotin', nom: 'Trissotin', initiale: 'T', piece: 'Les Femmes savantes', pieceId: 'femmes-savantes',
    auteur: 'Molière', auteurId: 'moliere', emploi: 'Faux bel esprit',
    psychologie: "Poète de salon vaniteux et intéressé, Trissotin séduit les femmes savantes par ses vers précieux pour mettre la main sur la dot d'Henriette. Sous le bel esprit affecté perce le cuistre cupide.",
    evolution: "Adulé par Philaminte, il triomphe jusqu'à ce que la nouvelle d'une ruine de la famille le fasse fuir : l'amour du savoir n'était qu'appât, et son masque tombe d'un coup.",
    scenes: ['Acte III — le sonnet « À la princesse Uranie »', 'Acte III — la joute de vers avec Vadius', 'Acte V — la fuite devant la fausse ruine'],
    citation: "« Souffrez que d'un poème encor je vous régale. »",
  },

  // ─── Beaumarchais (suite 2) ────────────────────────────────────────────
  {
    id: 'comte-almaviva', nom: 'Le Comte Almaviva', initiale: 'A', piece: 'Le Mariage de Figaro', pieceId: 'mariage-figaro',
    auteur: 'Beaumarchais', auteurId: 'beaumarchais', emploi: 'Grand seigneur libertin', aka: ['Le Comte'],
    psychologie: "Grand d'Espagne séduisant et autoritaire, le Comte règne sur son domaine et sur les femmes. Jaloux de son épouse tout en convoitant Suzanne, il incarne l'arbitraire du privilège que la « folle journée » va mettre en échec.",
    evolution: "Décidé à rétablir le « droit du seigneur » sur Suzanne, il est déjoué à chaque tour par les valets et par la Comtesse ; pris dans le noir des marronniers, il doit demander pardon publiquement — le maître humilié par ses domestiques.",
    scenes: ['Acte III — le monologue de la jalousie', 'Acte III — le procès Marceline / Figaro', 'Acte V — les marronniers et le pardon final'],
    adaptations: ['Personnage central des Noces de Figaro de Mozart', "Comédie-Française, rôle de répertoire", 'Trilogie Beaumarchais (déjà présent dans Le Barbier de Séville)'],
    citation: "« Tandis que je m'agite, elle est tranquille ? »",
  },
  {
    id: 'rosine', nom: 'Rosine', initiale: 'R', piece: 'Le Barbier de Séville', pieceId: 'barbier-seville',
    auteur: 'Beaumarchais', auteurId: 'beaumarchais', emploi: 'Jeune pupille amoureuse',
    psychologie: "Pupille séquestrée par le vieux Bartholo qui veut l'épouser, Rosine est vive, spirituelle et bien décidée à conquérir sa liberté. Sous la docilité de façade, une jeune femme rusée qui mène sa propre évasion sentimentale.",
    evolution: "Éprise du mystérieux « Lindor » (le Comte déguisé), elle déjoue avec Figaro la surveillance de Bartholo, échange billets et signes, et finit par épouser son amant — future Comtesse Almaviva.",
    scenes: ['Acte II — le billet glissé malgré Bartholo', 'Acte III — la leçon de musique et « la Précaution inutile »', 'Acte IV — le mariage nocturne'],
    citation: "« Tout me dit que Lindor n'est pas fait pour moi. »",
  },

  // ─── Hugo (suite 2) ────────────────────────────────────────────────────
  {
    id: 'dona-sol', nom: 'Doña Sol', initiale: 'S', piece: 'Hernani', pieceId: 'hernani',
    auteur: 'Victor Hugo', auteurId: 'hugo', emploi: 'Amoureuse passionnée',
    psychologie: "Nièce et promise du vieux Don Ruy Gomez, Doña Sol aime le proscrit Hernani d'un amour absolu qui défie sa famille et le roi. Entière et courageuse, elle place la passion au-dessus de tout, jusqu'au sacrifice.",
    evolution: "Convoitée par trois hommes — Hernani, le roi Don Carlos et Don Ruy Gomez —, elle reste fidèle à Hernani ; le soir de leurs noces, quand le cor fatal résonne, elle boit le poison avant lui pour ne pas lui survivre.",
    scenes: ['Acte I — les trois soupirants dans sa chambre', 'Acte II — le refus du roi Don Carlos', 'Acte V — la mort des amants sur le poison partagé'],
    citation: "« Vous êtes mon lion superbe et généreux ! »",
  },

  // ─── Shakespeare (suite 2) ─────────────────────────────────────────────
  {
    id: 'ophelie', nom: 'Ophélie', initiale: 'O', piece: 'Hamlet', pieceId: 'hamlet',
    auteur: 'Shakespeare', auteurId: 'shakespeare', emploi: 'Jeune fille brisée', aka: ['Ophélia', 'Ophelia'],
    psychologie: "Fille de Polonius et aimée de Hamlet, Ophélie est prise entre l'obéissance filiale et son amour. Douce et fragile, elle devient le jouet des manœuvres de la cour, jusqu'à ce que la folie l'emporte.",
    evolution: "Éconduite puis brutalisée par un Hamlet feignant (ou non) la démence, bouleversée par la mort de son père tué par Hamlet, elle sombre dans la folie et se noie — figure tragique de l'innocence sacrifiée.",
    scenes: ['Acte III — « Get thee to a nunnery » (la rupture avec Hamlet)', 'Acte IV — la folie et les chansons', 'Acte IV — le récit de sa noyade par la reine'],
    adaptations: ['Tableau d\'Ophélie de John Everett Millais (1852)', "Rôle repris par les plus grandes actrices", 'Nombreuses relectures au cinéma (Zeffirelli, Branagh)'],
    citation: "« Nous savons ce que nous sommes, mais non ce que nous pouvons être. »",
  },

  // ─── Musset (suite 2) ──────────────────────────────────────────────────
  {
    id: 'fantasio', nom: 'Fantasio', initiale: 'F', piece: 'Fantasio', pieceId: 'fantasio',
    auteur: 'Musset', auteurId: 'musset', emploi: 'Bouffon mélancolique',
    psychologie: "Jeune homme désœuvré, spirituel et mélancolique, Fantasio fuit ses dettes et son ennui en se déguisant en bouffon du roi. Sous la fantaisie et l'ironie affleure le mal du siècle romantique : le vertige de l'inutilité.",
    evolution: "Endossant le costume du fou mort, il s'immisce à la cour et, par une pirouette poétique, empêche le mariage politique de la princesse Elsbeth — sauvant, presque par jeu, un royaume et une jeune fille du malheur.",
    scenes: ['Acte I — la mélancolie et les dettes', 'Acte II — le bouffon qui pêche la perruque du prince', 'Acte II — le dialogue avec Elsbeth dans le jardin'],
    citation: "« Comme tous les hommes sont plats et peu de chose ! »",
  },

  // ─── Marivaux ──────────────────────────────────────────────────────────
  {
    id: 'silvia', nom: 'Silvia', initiale: 'S', piece: "Le Jeu de l'amour et du hasard", pieceId: 'le-jeu-amour-hasard',
    auteur: 'Marivaux', auteurId: 'marivaux', emploi: 'Amoureuse déguisée',
    psychologie: "Pour observer librement le prétendant qu'on lui destine, Silvia échange son rôle avec sa servante Lisette. Fine et fière, elle veut aimer par choix, non par convention — et se trouve troublée par un « valet » plus digne qu'il ne devrait.",
    evolution: "Le déguisement croisé (Dorante s'est lui aussi travesti en valet) la met à l'épreuve : elle lutte contre son cœur qui s'éprend d'un homme qu'elle croit domestique, jusqu'à la reconnaissance qui couronne l'amour né du hasard.",
    scenes: ['Acte I — le pacte du déguisement avec Lisette', 'Acte II — le trouble amoureux malgré les rangs', 'Acte III — l\'aveu et la reconnaissance'],
    citation: "« Ah ! je vois clair dans mon cœur. »",
  },
  {
    id: 'dorante-jeu', nom: 'Dorante', initiale: 'D', piece: "Le Jeu de l'amour et du hasard", pieceId: 'le-jeu-amour-hasard',
    auteur: 'Marivaux', auteurId: 'marivaux', emploi: 'Amoureux déguisé',
    psychologie: "Venu incognito sous l'habit de son valet pour juger sa promise, Dorante est un jeune homme délicat et sincère. Son amour naissant pour une « suivante » le met en guerre avec les préjugés de son rang.",
    evolution: "Épris de celle qu'il croit servante (Silvia déguisée), il ose braver les convenances et lui offrir son cœur avant de connaître sa vraie condition — preuve d'un amour vrai que la révélation finale récompense.",
    scenes: ['Acte I — l\'arrivée sous le costume de Bourguignon', 'Acte II — la lutte entre l\'amour et le rang', 'Acte III — la demande faite à la « servante »'],
    citation: "« Il n'y a point de bonheur pour moi que par toi. »",
  },
  {
    id: 'arlequin', nom: 'Arlequin', initiale: 'A', piece: "Le Jeu de l'amour et du hasard", pieceId: 'le-jeu-amour-hasard',
    auteur: 'Marivaux', auteurId: 'marivaux', emploi: 'Valet bouffon',
    psychologie: "Valet de Dorante travesti en maître, Arlequin est truculent, gourmand et sans façons. Héritier de la commedia dell'arte, il fait éclater sous la préciosité marivaudienne un comique franc et populaire.",
    evolution: "Jouant le grand seigneur avec maladresse, il courtise Lisette (elle-même déguisée en maîtresse) ; les deux valets tombent amoureux et se démasquent avec un naturel réjouissant, doublant en miroir l'intrigue des maîtres.",
    scenes: ['Acte II — le « seigneur » Arlequin en pleine gloutonnerie', 'Acte II — la cour à Lisette', 'Acte III — le double aveu des valets'],
    citation: "« Va, dans deux jours je t'aimerai bien tout à fait. »",
  },

  // ─── Corneille (suite 2) ───────────────────────────────────────────────
  {
    id: 'medee', nom: 'Médée', initiale: 'M', piece: 'Médée', pieceId: 'medee-corneille',
    auteur: 'Corneille', auteurId: 'corneille', emploi: 'Magicienne vengeresse',
    psychologie: "Magicienne trahie par Jason pour qui elle a tout sacrifié, Médée est la passion portée à l'incandescence. Bafouée, elle transforme son amour en fureur vengeresse d'une froide et terrible lucidité.",
    evolution: "Répudiée et menacée d'exil, elle feint la soumission pour mieux frapper : elle empoisonne sa rivale Créuse et le roi Créon, puis égorge ses propres enfants pour anéantir Jason — et s'envole, invincible dans le crime.",
    scenes: ["Acte I — « Moi, moi, dis-je, et c'est assez »", 'Acte IV — la préparation des présents empoisonnés', 'Acte V — le meurtre des enfants et la fuite'],
    adaptations: ['Médée d\'Euripide, matrice du personnage', "Médée de Pasolini (1969) avec Maria Callas", 'Opéra Médée de Cherubini'],
    citation: "« Dans un si grand revers que vous reste-t-il ? — Moi, / Moi, dis-je, et c'est assez. »",
  },

  // ─── Ibsen (suite) ─────────────────────────────────────────────────────
  {
    id: 'hedda', nom: 'Hedda Gabler', initiale: 'H', piece: 'Hedda Gabler', pieceId: 'hedda-gabler',
    auteur: 'Henrik Ibsen', auteurId: 'ibsen', emploi: 'Bourgeoise étouffée', aka: ['Hedda'],
    psychologie: "Fille du général Gabler, Hedda a épousé sans amour un universitaire terne. Étouffée par l'ennui et la médiocrité, avide de beauté et de pouvoir sur les autres, elle manipule son entourage par pur besoin de sentir sa liberté.",
    evolution: "Jalouse de l'œuvre et de la vie de Lövborg, elle le pousse au « beau » suicide en lui offrant un pistolet ; mais la mort qu'elle a orchestrée est sordide, et prise au piège du chantage de Brack, elle se tue à son tour.",
    scenes: ['Acte I — le retour de voyage de noces et l\'ennui', 'Acte III — Hedda brûle le manuscrit de Lövborg', 'Acte IV — le chantage de Brack et le suicide'],
    adaptations: ['Rôle-phare du répertoire (Isabelle Huppert, Cate Blanchett)', "Mise en scène de Thomas Ostermeier (2005)", 'Nombreuses versions filmées'],
    citation: "« Je brûle ton enfant, Thea ! »",
  },

  // ─── Jarry ─────────────────────────────────────────────────────────────
  {
    id: 'pere-ubu', nom: 'Père Ubu', initiale: 'U', piece: 'Ubu roi', pieceId: 'ubu-roi',
    auteur: 'Alfred Jarry', auteurId: 'jarry', emploi: 'Tyran grotesque',
    psychologie: "Lâche, glouton, cupide et cruel, le Père Ubu est la caricature bouffonne du tyran et de la bêtise au pouvoir. Poussé par sa femme et par son appétit sans limites, il incarne l'absurde et la sauvagerie sous des dehors de pantin.",
    evolution: "De capitaine félon, il assassine le roi Venceslas, s'empare du trône de Pologne, y règne par la « débraillade » et la « décervelage », avant d'être chassé et de fuir sur la mer — toujours aussi ignoble et impuni.",
    scenes: ['Acte I — « Merdre ! » et le complot poussé par la Mère Ubu', 'Acte III — la « machine à décerveler » et les impôts', 'Acte V — la déroute et la fuite en bateau'],
    adaptations: ['Scandale de la création (1896) — acte de naissance du théâtre moderne', "Inspiration du surréalisme et du théâtre de l'absurde", 'Mises en scène et marionnettes innombrables'],
    citation: "« Merdre ! »",
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
