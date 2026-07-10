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
  monologueId?: string; // monologue lié (écran Scène)
  citation?: string;
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
];
