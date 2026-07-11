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
    extrait: { texte: "« Je suis une force qui va ! »", source: 'Hernani, acte III, scène 4' },
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
    extrait: { texte: "« Avant tout, je suis un être humain, tout comme toi. »", source: 'Nora, acte III' },
  },
  'la-mouette': {
    themes: ['Art', 'Amour non partagé', 'Désillusion', 'Jeunesse'],
    personnages: ['Nina', 'Treplev', 'Arkadina', 'Trigorine'],
  },

  // ─── Répertoire canonique (thèmes + extraits célèbres) ───
  // Molière
  'amphitryon': {
    themes: ['Double / identité', 'Pouvoir des dieux', 'Jalousie', 'Illusion'],
    extrait: { texte: "« Le véritable Amphitryon est l'Amphitryon où l'on dîne. »", source: 'Sosie, acte III, scène 5' },
  },
  'bourgeois-gentilhomme': {
    themes: ['Vanité sociale', 'Ascension bourgeoise', 'Ridicule', 'Argent'],
    extrait: { texte: "« Il y a plus de quarante ans que je dis de la prose sans que j'en susse rien. »", source: 'Monsieur Jourdain, acte II, scène 4' },
  },
  'fourberies-scapin': {
    themes: ['Ruse', 'Valet fourbe', 'Amours contrariées', 'Argent'],
    extrait: { texte: "« Que diable allait-il faire dans cette galère ? »", source: 'Géronte, acte II, scène 7' },
  },
  'medecin-malgre-lui': {
    themes: ['Médecine', 'Imposture', 'Ruse', 'Ivrognerie'],
    extrait: { texte: "« Nous avons changé tout cela. »", source: 'Sganarelle, acte II, scène 4' },
  },
  'ecole-des-femmes': {
    themes: ['Jalousie', 'Éducation des femmes', 'Amour', 'Barbon ridicule'],
    extrait: { texte: "« Le petit chat est mort. »", source: 'Agnès, acte II, scène 5' },
  },
  'femmes-savantes': {
    themes: ['Pédantisme', 'Préciosité', 'Autorité', 'Mariage'],
    extrait: { texte: "« Guenille si l'on veut, ma guenille m'est chère. »", source: 'Chrysale, acte II, scène 7' },
  },
  'precieuses-ridicules': {
    themes: ['Préciosité', 'Snobisme', 'Ridicule', 'Vengeance'],
  },
  'monsieur-de-pourceaugnac': {
    themes: ['Médecine', 'Provincial berné', 'Mariage', 'Farce'],
  },
  // Corneille
  'cinna': {
    themes: ['Clémence', 'Vengeance', 'Pouvoir', 'Conjuration'],
    extrait: { texte: "« Je suis maître de moi comme de l'univers ; je le suis, je veux l'être. »", source: 'Auguste, acte V, scène 3' },
  },
  'horace': {
    themes: ['Devoir patriotique', 'Famille', 'Héroïsme', 'Sacrifice'],
    extrait: { texte: "« Qu'il mourût. »", source: 'Le vieil Horace, acte III, scène 6' },
  },
  'polyeucte': {
    themes: ['Foi', 'Martyre', 'Grâce', 'Amour et devoir'],
    extrait: { texte: "« Je vois, je sais, je crois, je suis désabusée. »", source: 'Pauline, acte V, scène 5' },
  },
  'illusion-comique': {
    themes: ['Théâtre', 'Illusion', 'Amour', 'Magie'],
    extrait: { texte: "« À présent le Théâtre / Est en un point si haut que chacun l'idolâtre. »", source: 'Alcandre, acte V, scène 5' },
  },
  'menteur': {
    themes: ['Mensonge', 'Séduction', 'Quiproquo', 'Imagination'],
  },
  'rodogune': {
    themes: ['Vengeance', 'Pouvoir', 'Mère criminelle', 'Rivalité fraternelle'],
  },
  'nicomede': {
    themes: ['Politique', 'Héroïsme', 'Ironie', 'Rome'],
  },
  // Racine
  'britannicus': {
    themes: ['Tyrannie naissante', 'Pouvoir', 'Jalousie', 'Manipulation'],
    extrait: { texte: "« J'embrasse mon rival, mais c'est pour l'étouffer. »", source: 'Néron, acte IV, scène 3' },
  },
  'berenice': {
    themes: ['Amour et devoir', 'Renoncement', 'Séparation', 'Pouvoir'],
    extrait: { texte: "« Dans un mois, dans un an, comment souffrirons-nous, Seigneur, que tant de mers me séparent de vous ? »", source: 'Bérénice, acte IV, scène 5' },
  },
  'bajazet': {
    themes: ['Passion', 'Sérail', 'Politique', 'Trahison'],
    extrait: { texte: "« Sortez. »", source: 'Roxane, acte V, scène 4' },
  },
  'iphigenie': {
    themes: ['Sacrifice', 'Fatalité', 'Devoir', 'Amour paternel'],
  },
  'athalie': {
    themes: ['Foi', 'Tyrannie', 'Providence', 'Complot'],
    extrait: { texte: "« C'était pendant l'horreur d'une profonde nuit. »", source: 'Athalie, acte II, scène 5' },
  },
  'mithridate': {
    themes: ['Pouvoir', 'Rivalité', 'Amour', 'Rome'],
  },
  'plaideurs': {
    themes: ['Justice', 'Manie procédurière', 'Satire', 'Comédie'],
    extrait: { texte: "« Ce que je sais le mieux, c'est mon commencement. »", source: 'Petit Jean, acte III, scène 3' },
  },
  // Marivaux
  'le-jeu-amour-hasard': {
    themes: ['Amour', 'Déguisement', 'Rang social', 'Sincérité'],
  },
  'fausses-confidences': {
    themes: ['Amour', 'Stratagème', 'Argent', 'Sincérité'],
  },
  'double-inconstance': {
    themes: ['Amour', 'Inconstance', 'Pouvoir', 'Cour'],
  },
  'ile-des-esclaves': {
    themes: ['Égalité', 'Maîtres et valets', 'Humanité', 'Utopie'],
  },
  // Musset
  'on-ne-badine-pas': {
    themes: ['Amour', 'Orgueil', 'Jeu cruel', 'Mort'],
    extrait: { texte: "« On est souvent trompé en amour, souvent blessé et souvent malheureux ; mais on aime. »", source: 'Perdican, acte II, scène 5' },
  },
  'caprices-marianne': {
    themes: ['Amour', 'Mélancolie', 'Amitié', 'Mort'],
  },
  'lorenzaccio': {
    themes: ['Tyrannicide', 'Corruption', 'Idéalisme', 'Masque'],
  },
  'fantasio': {
    themes: ['Fantaisie', 'Mélancolie', 'Liberté', 'Jeunesse'],
  },
  'il-ne-faut-jurer-de-rien': {
    themes: ['Amour', 'Pari', 'Libertinage', 'Insouciance'],
  },
  // Hugo
  'ruy-blas': {
    themes: ['Amour impossible', 'Ambition', 'Pouvoir', 'Vengeance'],
    extrait: { texte: "« Bon appétit, messieurs ! Ô ministres intègres ! »", source: 'Ruy Blas, acte III, scène 2' },
  },
  // Tchekhov
  'cerisaie': {
    themes: ['Fin d\'un monde', 'Nostalgie', 'Argent', 'Temps'],
    extrait: { texte: "« Toute la Russie est notre jardin. »", source: 'Trofimov, acte II' },
  },
  'oncle-vania': {
    themes: ['Désillusion', 'Travail', 'Amour non partagé', 'Ennui'],
    extrait: { texte: "« Nous nous reposerons ! »", source: 'Sonia, acte IV' },
  },
  'trois-s-urs': {
    themes: ['Nostalgie', 'Espoir', 'Province', 'Temps'],
    extrait: { texte: "« À Moscou ! À Moscou ! À Moscou ! »", source: 'Irina' },
  },
  'ivanov': {
    themes: ['Désespoir', 'Ennui', 'Dettes', 'Déchéance'],
  },
  // Ibsen
  'hedda-gabler': {
    themes: ['Ennui', 'Manipulation', 'Liberté', 'Beauté et mort'],
  },
  'revenants': {
    themes: ['Hérédité', 'Hypocrisie sociale', 'Maladie', 'Devoir'],
  },
  'ennemi-du-peuple': {
    themes: ['Vérité', 'Individu contre foule', 'Corruption', 'Courage'],
    extrait: { texte: "« L'homme le plus fort du monde, c'est celui qui est le plus seul. »", source: 'Docteur Stockmann, acte V' },
  },
  // Shakespeare
  'roi-lear': {
    themes: ['Ingratitude', 'Folie', 'Pouvoir', 'Vieillesse'],
  },
  'othello': {
    themes: ['Jalousie', 'Manipulation', 'Amour', 'Honneur'],
  },
  // Aristophane
  'les-grenouilles': {
    themes: ['Poésie', 'Descente aux Enfers', 'Satire littéraire', 'Comédie'],
  },
};
