// Détails enrichis, optionnels, par id de pièce (affichés sur la fiche-pièce).
// Toutes les pièces n'ont pas ces champs : la fiche dégrade gracieusement.
export interface PieceDetail {
  themes?: string[];
  personnages?: string[];
  extrait?: { texte: string; source: string };
}

export const PIECE_DETAILS: Record<string, PieceDetail> = {
  'le-misanthrope': {
    themes: ['Sincérité', 'Hypocrisie mondaine', 'Amour', 'Solitude'],
    personnages: ['Alceste', 'Célimène', 'Philinte', 'Éliante', 'Oronte'],
    extrait: { texte: "« Je veux qu'on soit sincère, et qu'en homme d'honneur, on ne lâche aucun mot qui ne parte du cœur. »", source: 'Alceste, acte I, scène 1' },
  },
  tartuffe: {
    themes: ['Fausse dévotion', 'Manipulation', 'Autorité familiale', 'Vérité'],
    personnages: ['Tartuffe', 'Orgon', 'Elmire', 'Dorine', 'Madame Pernelle'],
    extrait: { texte: "« Couvrez ce sein que je ne saurais voir. »", source: 'Tartuffe, acte III, scène 2' },
  },
  lavare: {
    themes: ["Avarice", 'Argent', 'Amour contrarié', 'Autorité paternelle'],
    personnages: ['Harpagon', 'Cléante', 'Élise', 'Valère', 'Mariane'],
    extrait: { texte: "« Au voleur ! au voleur ! à l'assassin ! au meurtrier ! »", source: 'Harpagon, acte IV, scène 7' },
  },
  'malade-imaginaire': {
    themes: ['Hypocondrie', 'Médecine', 'Mariage forcé', 'Ruse'],
    personnages: ['Argan', 'Toinette', 'Angélique', 'Béline', 'Béralde'],
  },
  'dom-juan': {
    themes: ['Libertinage', 'Séduction', 'Blasphème', 'Châtiment divin'],
    personnages: ['Dom Juan', 'Sganarelle', 'Elvire', 'Le Commandeur'],
  },
  phedre: {
    themes: ['Passion coupable', 'Fatalité', 'Culpabilité', 'Jalousie'],
    personnages: ['Phèdre', 'Hippolyte', 'Thésée', 'Œnone', 'Aricie'],
    extrait: { texte: "« Ce n'est plus une ardeur dans mes veines cachée : c'est Vénus tout entière à sa proie attachée. »", source: 'Phèdre, acte I, scène 3' },
  },
  'andromaque': {
    themes: ['Amour non partagé', 'Devoir maternel', 'Vengeance', 'Fidélité'],
    personnages: ['Andromaque', 'Pyrrhus', 'Hermione', 'Oreste'],
  },
  'antigone-sophocle': {
    themes: ['Loi divine vs loi humaine', 'Devoir', 'Révolte', 'Mort'],
    personnages: ['Antigone', 'Créon', 'Ismène', 'Hémon', 'Tirésias'],
    extrait: { texte: "« Je suis née pour partager l'amour et non la haine. »", source: 'Antigone' },
  },
  'oedipe-roi': {
    themes: ['Destin', 'Vérité', 'Aveuglement', 'Culpabilité'],
    personnages: ['Œdipe', 'Jocaste', 'Créon', 'Tirésias'],
  },
  cyrano: {
    themes: ['Amour', 'Panache', 'Éloquence', 'Sacrifice de soi'],
    personnages: ['Cyrano', 'Roxane', 'Christian', 'De Guiche', 'Le Bret'],
    extrait: { texte: "« C'est un roc ! … c'est un pic ! … c'est un cap ! Que dis-je, c'est un cap ? … C'est une péninsule ! »", source: 'Cyrano, acte I, scène 4' },
  },
  hernani: {
    themes: ['Honneur', 'Amour', 'Fatalité', 'Rébellion'],
    personnages: ['Hernani', 'Doña Sol', 'Don Ruy Gomez', 'Don Carlos'],
  },
  hamlet: {
    themes: ['Vengeance', 'Folie', 'Mort', 'Doute existentiel'],
    personnages: ['Hamlet', 'Claudius', 'Gertrude', 'Ophélie', 'Polonius'],
    extrait: { texte: "« Être, ou ne pas être, telle est la question. »", source: 'Hamlet, acte III, scène 1' },
  },
  'romeo-juliette': {
    themes: ['Amour', 'Haine familiale', 'Destin', 'Jeunesse'],
    personnages: ['Roméo', 'Juliette', 'Mercutio', 'Tybalt', 'Frère Laurent'],
  },
  macbeth: {
    themes: ['Ambition', 'Culpabilité', 'Pouvoir', 'Surnaturel'],
    personnages: ['Macbeth', 'Lady Macbeth', 'Banquo', 'Macduff', 'Les trois sorcières'],
  },
  'mariage-figaro': {
    themes: ['Ruse', 'Lutte des classes', 'Amour', 'Justice'],
    personnages: ['Figaro', 'Suzanne', 'Le Comte Almaviva', 'La Comtesse', 'Chérubin'],
    extrait: { texte: "« Vous vous êtes donné la peine de naître, et rien de plus. »", source: 'Figaro, acte V, scène 3' },
  },
  'barbier-seville': {
    themes: ['Ruse', 'Amour', 'Jalousie', 'Liberté'],
    personnages: ['Figaro', 'Le Comte', 'Rosine', 'Bartholo'],
  },
  'le-cid': {
    themes: ["Honneur", 'Amour', 'Devoir', 'Vengeance'],
    personnages: ['Rodrigue', 'Chimène', 'Don Diègue', 'Le Comte', "L'Infante"],
    extrait: { texte: "« Ô rage ! ô désespoir ! ô vieillesse ennemie ! »", source: 'Don Diègue, acte I, scène 4' },
  },
  'ubu-roi': {
    themes: ['Tyrannie', 'Absurde', 'Grotesque', 'Cupidité'],
    personnages: ['Père Ubu', 'Mère Ubu', 'Le Roi Venceslas', 'Bougrelas'],
    extrait: { texte: "« Merdre ! »", source: 'Père Ubu, acte I, scène 1' },
  },
  'maison-poupee': {
    themes: ['Émancipation', 'Mariage', 'Mensonge', 'Identité'],
    personnages: ['Nora', 'Torvald Helmer', 'Krogstad', 'Madame Linde'],
  },
  'la-mouette': {
    themes: ['Art', 'Amour non partagé', 'Désillusion', 'Jeunesse'],
    personnages: ['Nina', 'Treplev', 'Arkadina', 'Trigorine'],
  },
};
