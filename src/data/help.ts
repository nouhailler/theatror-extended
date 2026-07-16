// Aide contextuelle & mode démo — source unique.
// Chaque section décrit : à quoi elle sert, ce qu'on peut y faire (tips),
// où la trouver, et ses liens avec les autres menus (relations).
// Utilisé par : l'aide de l'écran (bouton ?), les astuces au fil de la
// navigation (ScreenTip) et le mode démo (visite guidée).

export interface HelpRelation {
  label: string;
  path: string;
}

export interface HelpEntry {
  id: string;
  title: string;
  /** Résumé court (1–2 phrases) — sert aussi de texte au mode démo. */
  resume: string;
  /** Ce que vous pouvez faire ici (comment ça marche). */
  tips: string[];
  /** Où se trouve la section / comment y accéder. */
  situe: string;
  /** Sections en lien (navigation croisée). */
  relations: HelpRelation[];
  /** Prédicat d'association à une route (les plus spécifiques d'abord). */
  test: (path: string) => boolean;
}

// Ordre important : les routes les plus spécifiques en premier.
export const HELP: HelpEntry[] = [
  {
    id: 'accueil',
    title: 'Accueil',
    resume: "Votre point de départ quotidien : un théâtre, une citation et une pièce à découvrir, plus une recherche globale et des accès rapides.",
    tips: [
      "La barre de recherche cherche dans toute l'application : pièces, auteurs, personnages, costumes, décors…",
      'Le « rendez-vous du jour » change chaque jour — théâtre, citation et pièce mis en avant.',
      'Les accès rapides sont personnalisables : choisissez-les dans Réglages (Mode répétition, Voix & diction, Carnet & contacts…).',
      "Touchez ☆ n'importe où pour ajouter aux favoris (retrouvés dans Ma collection).",
    ],
    situe: "Onglet « Accueil » en bas à gauche, ou le titre THEATHROR en haut.",
    relations: [
      { label: 'Ma collection', path: '/collection' },
      { label: 'Explorer', path: '/explorer' },
      { label: 'Pièces', path: '/pieces' },
    ],
    test: (p) => p === '/',
  },
  {
    id: 'collection',
    title: 'Ma collection',
    resume: "Tous vos favoris réunis : pièces, auteurs, citations, monologues et éléments de spectacle (costumes, décors, accessoires, festivals) marqués d'une étoile.",
    tips: [
      "Ajoutez un favori en touchant l'étoile ☆ sur une pièce, un auteur, une citation, un monologue, ou une fiche costume/décor/accessoire/festival.",
      "L'onglet « Spectacle » réunit vos costumes, décors, accessoires et festivals favoris.",
      'Tout est stocké sur votre appareil — aucun compte requis.',
    ],
    situe: "Depuis l'Accueil (onglet du bas) ou le menu ☰ › Personnel › Ma collection.",
    relations: [
      { label: 'Pièces', path: '/pieces' },
      { label: 'Scène (monologues, citations)', path: '/scene' },
    ],
    test: (p) => p.startsWith('/collection'),
  },
  {
    id: 'fiche-piece',
    title: 'Fiche d\'une pièce',
    resume: "Tout sur une pièce : résumé, personnages, distribution, durée, thèmes et accès au texte intégral quand il est disponible.",
    tips: [
      'Touchez « Lire le texte » pour ouvrir le texte intégral (pièces du domaine public).',
      "Touchez ☆ pour garder la pièce dans Ma collection.",
      'Les personnages renvoient à leurs fiches détaillées.',
    ],
    situe: "En touchant une pièce dans la liste des Pièces.",
    relations: [
      { label: 'Toutes les pièces', path: '/pieces' },
      { label: 'Personnages', path: '/explorer/personnages' },
    ],
    test: (p) => /^\/pieces\/[^/]+/.test(p),
  },
  {
    id: 'pieces',
    title: 'Pièces & filtres',
    resume: "La bibliothèque de pièces, avec des filtres puissants pour trouver celle qui convient à votre projet ou audition.",
    tips: [
      'Filtrez par durée, distribution hommes/femmes, genre, décor ou domaine public.',
      'Touchez une pièce pour ouvrir sa fiche complète et son texte.',
      "Touchez ☆ pour l'ajouter à Ma collection.",
      'La recherche accepte titre, auteur ou mot-clé.',
    ],
    situe: "Onglet « Pièces » en bas, ou menu ☰ › Découvrir.",
    relations: [
      { label: 'Ma collection', path: '/collection' },
      { label: 'Personnages', path: '/explorer/personnages' },
      { label: 'Scène — monologues', path: '/scene?seg=mono' },
    ],
    test: (p) => p === '/pieces' || p.startsWith('/pieces?'),
  },
  {
    id: 'encyclopedie',
    title: 'Encyclopédie',
    resume: "2 500 ans d'histoire du théâtre : dramaturges, mouvements, genres, grandes dates et métiers de la scène.",
    tips: [
      'Choisissez une rubrique : histoire, mouvements, genres, métiers…',
      'Touchez un portrait ou un article pour ouvrir sa fiche complète.',
      "Les fiches renvoient les unes aux autres (auteur ↔ mouvement ↔ époque).",
    ],
    situe: "Explorer › Encyclopédie, ou menu ☰ › Découvrir › Encyclopédie.",
    relations: [
      { label: 'Frise chronologique', path: '/explorer/frise' },
      { label: 'Personnages', path: '/explorer/personnages' },
      { label: 'Explorer', path: '/explorer' },
    ],
    test: (p) => p.startsWith('/explorer/encyclopedie') || p.startsWith('/explorer/article') || p.startsWith('/explorer/dramaturge'),
  },
  {
    id: 'personnages',
    title: 'Personnages célèbres',
    resume: "Les grandes figures du répertoire — de Tartuffe à Hamlet — avec leur caractère, leur emploi et les pièces où on les trouve.",
    tips: [
      'Touchez un personnage pour sa fiche détaillée.',
      'Utile pour préparer un rôle ou choisir un monologue.',
      "Les fiches renvoient vers la pièce d'origine.",
    ],
    situe: "Explorer › Personnages, ou menu ☰ › Découvrir.",
    relations: [
      { label: 'Pièces', path: '/pieces' },
      { label: 'Scène — monologues', path: '/scene?seg=mono' },
    ],
    test: (p) => p.startsWith('/explorer/personnage'),
  },
  {
    id: 'frise',
    title: 'Frise chronologique',
    resume: "2 500 ans de théâtre en un coup d'œil : de Thespis à Beckett, ères colorées et événements clés.",
    tips: [
      'Faites défiler la frise pour parcourir les époques.',
      'Chaque ère a sa couleur ; les jalons marquent les tournants majeurs.',
      "Complète l'Encyclopédie en donnant la vue d'ensemble dans le temps.",
    ],
    situe: "Explorer › Frise chronologique.",
    relations: [
      { label: 'Encyclopédie', path: '/explorer/encyclopedie' },
      { label: 'Carte du monde', path: '/explorer/carte' },
    ],
    test: (p) => p.startsWith('/explorer/frise'),
  },
  {
    id: 'carte',
    title: 'Carte du monde',
    resume: "Le théâtre dans l'espace : grands théâtres, festivals, traditions et écoles, d'Épidaure à Avignon.",
    tips: [
      'Touchez un lieu pour en savoir plus.',
      'Filtrez par type : théâtres, festivals, traditions…',
      "Prolonge la Frise (le temps) par la géographie (l'espace).",
    ],
    situe: "Explorer › Carte du monde.",
    relations: [
      { label: 'Festivals', path: '/festivals' },
      { label: 'Frise chronologique', path: '/explorer/frise' },
    ],
    test: (p) => p.startsWith('/explorer/carte'),
  },
  {
    id: 'collections',
    title: 'Collections thématiques',
    resume: "Des sélections prêtes à explorer : Molière, la tragédie classique, pièces courtes, petites distributions, jeune public…",
    tips: [
      'Touchez une collection pour voir les pièces qu\'elle réunit.',
      'Un bon raccourci quand on ne sait pas quoi lire ou monter.',
      'Chaque pièce garde son ☆ pour la mettre en favori.',
    ],
    situe: "Explorer › Collections thématiques.",
    relations: [
      { label: 'Pièces & filtres', path: '/pieces' },
      { label: 'Ma collection', path: '/collection' },
    ],
    test: (p) => p.startsWith('/explorer/collections'),
  },
  {
    id: 'explorer',
    title: 'Explorer',
    resume: "Le hub de la découverte : encyclopédie, frise, carte du monde, personnages et collections thématiques.",
    tips: [
      'Chaque tuile ouvre un espace de découverte.',
      "C'est le point d'entrée de tout le contenu « culture ».",
      'Retrouvez ici l\'Encyclopédie, la Frise, la Carte et les Collections.',
    ],
    situe: "Onglet « Explorer » en bas.",
    relations: [
      { label: 'Encyclopédie', path: '/explorer/encyclopedie' },
      { label: 'Frise', path: '/explorer/frise' },
      { label: 'Carte', path: '/explorer/carte' },
    ],
    test: (p) => p === '/explorer',
  },
  {
    id: 'quiz',
    title: 'Quiz',
    resume: "Testez et consolidez vos connaissances du théâtre, de façon ludique.",
    tips: [
      'Répondez aux questions et suivez votre score.',
      "Idéal pour réviser après une visite de l'Encyclopédie.",
    ],
    situe: "Menu ☰ › Découvrir › Quiz.",
    relations: [
      { label: 'Encyclopédie', path: '/explorer/encyclopedie' },
    ],
    test: (p) => p.startsWith('/quiz'),
  },
  {
    id: 'ia',
    title: 'Mode IA',
    resume: "Un assistant qui explique une pièce, aide à la distribution ou répond à vos questions sur le théâtre.",
    tips: [
      "Nécessite une clé OpenRouter (gratuite) à renseigner dans les Réglages.",
      "« Mon rôle » interroge le texte intégral de votre personnage — repérer où il parle d'un sujet, ou décrire son évolution émotionnelle. L'analyse se fait acte par acte pour tenir dans les modèles gratuits.",
      'Dans les Réglages, vous pouvez choisir un modèle gratuit d\'OpenRouter.',
      'La clé reste sur votre appareil et n\'est jamais transmise à Theathror.',
    ],
    situe: "Menu ☰ › L'atelier › Mode IA.",
    relations: [
      { label: 'Réglages (clé & modèle)', path: '/reglages' },
      { label: 'Pièces', path: '/pieces' },
    ],
    test: (p) => p.startsWith('/ia'),
  },
  {
    id: 'exercices',
    title: "Exercices d'acteur",
    resume: "Des exercices pour travailler le jeu, l'échauffement et la présence, à faire seul ou en groupe.",
    tips: [
      'Parcourez les exercices par objectif.',
      'À combiner avec le travail de la Voix et le Journal pour suivre vos progrès.',
    ],
    situe: "Menu ☰ › L'atelier › Exercices.",
    relations: [
      { label: 'Voix & diction', path: '/voix' },
      { label: 'Journal', path: '/journal' },
    ],
    test: (p) => p.startsWith('/exercices'),
  },
  {
    id: 'voix',
    title: 'Voix & diction',
    resume: "Travaillez la voix, la respiration, l'articulation et la projection.",
    tips: [
      'Suivez les exercices de diction et de souffle.',
      "Complément naturel des Exercices d'acteur.",
    ],
    situe: "Menu ☰ › L'atelier › Voix.",
    relations: [
      { label: "Exercices d'acteur", path: '/exercices' },
      { label: 'Scène', path: '/scene' },
    ],
    test: (p) => p.startsWith('/voix'),
  },
  {
    id: 'mise-en-scene',
    title: 'Mise en scène',
    resume: "Un plateau virtuel pour disposer décors et personnages et préparer vos placements.",
    tips: [
      'Placez les éléments sur le plateau pour visualiser une scène.',
      'Vos plateaux sont enregistrés sur votre appareil.',
      'À rapprocher des Décors et Accessoires pour l\'ambiance.',
    ],
    situe: "Menu ☰ › L'atelier › Mise en scène.",
    relations: [
      { label: 'Décors', path: '/decors' },
      { label: 'Accessoires', path: '/accessoires' },
    ],
    test: (p) => p.startsWith('/mise-en-scene'),
  },
  {
    id: 'costumes',
    title: 'Costumes',
    resume: "Une galerie historique du costume de théâtre, de l'Antiquité au XXe siècle, illustrée d'œuvres de musée.",
    tips: [
      'Filtrez par époque ou par genre (homme, femme, mixte).',
      'Touchez une carte pour la fiche détaillée : grande image et explication.',
      'La recherche accepte un pays, un style ou un personnage.',
      "Touchez ☆ dans la fiche pour l'ajouter à Ma collection (onglet Spectacle).",
    ],
    situe: "Menu ☰ › Scène & spectacle › Costumes.",
    relations: [
      { label: 'Décors', path: '/decors' },
      { label: 'Accessoires', path: '/accessoires' },
    ],
    test: (p) => p.startsWith('/costumes'),
  },
  {
    id: 'decors',
    title: 'Décors',
    resume: "Une bibliothèque de décors de théâtre par catégorie — palais, rue, nature, intérieur… — avec fiche illustrée.",
    tips: [
      'Filtrez par catégorie de décor.',
      'Touchez une carte pour l\'image en grand et le détail.',
      'Recherchez par lieu, pièce ou élément.',
      "Touchez ☆ dans la fiche pour l'ajouter à Ma collection (onglet Spectacle).",
    ],
    situe: "Menu ☰ › Scène & spectacle › Décors.",
    relations: [
      { label: 'Costumes', path: '/costumes' },
      { label: 'Mise en scène', path: '/mise-en-scene' },
    ],
    test: (p) => p.startsWith('/decors'),
  },
  {
    id: 'accessoires',
    title: 'Accessoires',
    resume: "Un catalogue d'accessoires — armes, mobilier, objets anciens — et leur rôle dramatique, illustré.",
    tips: [
      'Filtrez par catégorie : armes, mobilier, objets anciens.',
      'Touchez une carte pour la fiche : image, histoire et usages à la scène.',
      "Chaque objet cite les pièces où il joue un rôle.",
      "Touchez ☆ dans la fiche pour l'ajouter à Ma collection (onglet Spectacle).",
    ],
    situe: "Menu ☰ › Scène & spectacle › Accessoires.",
    relations: [
      { label: 'Costumes', path: '/costumes' },
      { label: 'Décors', path: '/decors' },
    ],
    test: (p) => p.startsWith('/accessoires'),
  },
  {
    id: 'festivals',
    title: 'Festivals',
    resume: "L'agenda mondial du théâtre, classé par saison : d'Avignon à Édimbourg, avec fiche illustrée par festival.",
    tips: [
      'Filtrez par région ; les festivals sont classés par saison.',
      'Touchez une carte pour la fiche : image du lieu et présentation détaillée.',
      'Chaque fiche indique la période, l\'année de création et le genre.',
      "Touchez ☆ dans la fiche pour l'ajouter à Ma collection (onglet Spectacle).",
    ],
    situe: "Menu ☰ › Scène & spectacle › Festivals.",
    relations: [
      { label: 'Carte du monde', path: '/explorer/carte' },
    ],
    test: (p) => p.startsWith('/festivals'),
  },
  {
    id: 'medias',
    title: 'Médias',
    resume: "Podcasts et vidéos autour du théâtre, avec les dernières nouveautés des sources que vous suivez.",
    tips: [
      'Parcourez les contenus proposés.',
      'Vous pouvez ajouter vos propres sources RSS.',
    ],
    situe: "Menu ☰ › L'atelier › Médias.",
    relations: [
      { label: 'Explorer', path: '/explorer' },
    ],
    test: (p) => p.startsWith('/medias'),
  },
  {
    id: 'parcours',
    title: 'Parcours',
    resume: "Des parcours guidés pour progresser étape par étape, du débutant au comédien confirmé.",
    tips: [
      'Suivez un parcours dans l\'ordre proposé.',
      'Combine découverte et exercices pratiques.',
    ],
    situe: "Menu ☰ › L'atelier › Parcours.",
    relations: [
      { label: "Exercices", path: '/exercices' },
      { label: 'Journal', path: '/journal' },
    ],
    test: (p) => p.startsWith('/parcours'),
  },
  {
    id: 'repetition',
    title: 'Mode répétition',
    resume: "Répétez votre rôle : collez le texte, choisissez votre personnage, et l'app lit à voix haute les répliques des autres pendant que le texte défile.",
    tips: [
      'Collez le texte au format « NOM : réplique » (ou importez un .txt), puis vérifiez les personnages détectés.',
      'Plus rapide : sur une fiche de pièce à texte intégral, touchez « 🎭 Répéter cette pièce » — tout est pré-rempli.',
      "Choisissez votre rôle, une voix par personnage, la vitesse, et le sort des didascalies.",
      "Sur vos répliques, l'app attend : touchez l'écran pour continuer (ou mode chronométré / masqué pour tester la mémoire). Vous pouvez aussi vous enregistrer et vous réécouter.",
      'La session reprend là où vous vous étiez arrêté ; tout est enregistré sur votre appareil.',
    ],
    situe: "Explorer › Mode répétition, ou menu ☰ › L'atelier › Mode répétition.",
    relations: [
      { label: 'Pièces (textes intégraux)', path: '/pieces' },
      { label: "Exercices d'acteur", path: '/exercices' },
    ],
    test: (p) => p.startsWith('/repetition'),
  },
  {
    id: 'scene',
    title: "Scène — l'atelier",
    resume: "L'atelier du comédien : monologues d'audition, citations classées et glossaire des termes du théâtre.",
    tips: [
      'Basculez entre Monologues, Citations et Glossaire en haut.',
      'Filtrez les monologues par durée, émotion, homme/femme et niveau.',
      "Touchez ☆ pour garder un monologue ou une citation dans Ma collection.",
    ],
    situe: "Onglet « Scène » en bas.",
    relations: [
      { label: 'Pièces', path: '/pieces' },
      { label: 'Ma collection', path: '/collection' },
      { label: "Exercices d'acteur", path: '/exercices' },
    ],
    test: (p) => p.startsWith('/scene'),
  },
  {
    id: 'fiche-contact',
    title: "Fiche d'un contact",
    resume: "Tout sur un contact professionnel : coordonnées, fiche de préparation générée depuis son site, et rappels de suivi.",
    tips: [
      "Renseignez l'URL d'un site de compagnie ou d'un profil, puis touchez « Analyser » : l'IA résume dernières mises en scène, esthétique et contacts publics.",
      "L'analyse nécessite une clé OpenRouter (Réglages). Si la page est illisible, la fiche s'appuie sur le nom — à vérifier.",
      'Ajoutez des rappels en un tap : relancer après une audition, souhaiter un anniversaire, féliciter pour une création.',
    ],
    situe: 'En touchant un contact dans le Carnet.',
    relations: [
      { label: 'Carnet & contacts', path: '/carnet' },
      { label: 'Réglages (clé IA)', path: '/reglages' },
    ],
    test: (p) => /^\/carnet\/[^/]+/.test(p),
  },
  {
    id: 'carnet',
    title: 'Carnet & contacts',
    resume: "Votre répertoire de professionnels du spectacle — metteurs en scène, directeurs de casting, régisseurs, compagnies — avec fiches de préparation et rappels de relance.",
    tips: [
      'Ajoutez un contact avec son rôle, sa structure et l\'URL de son site ou profil.',
      "Depuis une fiche, l'IA prépare un résumé pour votre candidature à partir de la page.",
      "L'encart « À relancer » regroupe les échéances : relances, anniversaires, félicitations.",
      'Tout reste privé, sur votre appareil.',
    ],
    situe: "Menu ☰ › Personnel › Carnet & contacts.",
    relations: [
      { label: 'Journal du comédien', path: '/journal' },
      { label: 'Mode IA', path: '/ia' },
    ],
    test: (p) => p.startsWith('/carnet'),
  },
  {
    id: 'casting',
    title: 'Castings — veille & candidatures',
    resume: "Surveillez des sources d'appels à candidatures (flux RSS et pages) et laissez l'IA détecter, résumer et noter les castings selon votre profil.",
    tips: [
      "Ajoutez vos sources : un flux RSS, ou l'URL d'une page « auditions / appel à candidatures » d'une compagnie, d'un théâtre ou d'un festival.",
      "Renseignez « Mon profil » (genre, âge, styles, régions) : l'IA s'en sert pour calculer un score de compatibilité.",
      "« Vérifier maintenant » lit les sources et analyse les nouvelles annonces (nécessite une clé OpenRouter — Réglages).",
      "Le tableau de bord résume : nouveaux, à échéance proche, très compatibles. Tout reste sur votre appareil.",
    ],
    situe: "Menu ☰ › Personnel › Castings.",
    relations: [
      { label: 'Carnet & contacts', path: '/carnet' },
      { label: 'Réglages (clé IA)', path: '/reglages' },
    ],
    test: (p) => p.startsWith('/casting'),
  },
  {
    id: 'journal',
    title: 'Journal du comédien',
    resume: "Votre carnet de bord : répétitions, progrès, difficultés et idées de mise en scène, avec suivi du temps.",
    tips: [
      'Ajoutez une entrée : répétition, progrès, idée, note ou audition.',
      'Indiquez le temps de travail pour suivre vos statistiques.',
      'Tout reste privé, sur votre appareil.',
    ],
    situe: "Onglet « Journal » en bas.",
    relations: [
      { label: "Exercices d'acteur", path: '/exercices' },
      { label: 'Ma collection', path: '/collection' },
    ],
    test: (p) => p.startsWith('/journal'),
  },
  {
    id: 'reglages',
    title: 'Réglages',
    resume: "Configurez les accès rapides de l'accueil, le Mode IA (clé OpenRouter et modèle), les astuces et l'aide.",
    tips: [
      "« Accès rapides » : cochez les raccourcis à afficher sur votre page d'accueil (Mode répétition, Voix & diction, Carnet & contacts…).",
      "Renseignez votre clé OpenRouter pour activer le Mode IA.",
      'Chargez et choisissez un modèle gratuit d\'OpenRouter.',
      "Relancez le mode démo, revoyez l'introduction ou gérez les astuces.",
    ],
    situe: "Menu ☰ › Aide › Réglages.",
    relations: [
      { label: 'Mode IA', path: '/ia' },
    ],
    test: (p) => p.startsWith('/reglages'),
  },
];

export function helpForPath(path: string): HelpEntry | undefined {
  return HELP.find((e) => e.test(path));
}

export function helpById(id: string): HelpEntry | undefined {
  return HELP.find((e) => e.id === id);
}

// ─── Mode démo : parcours qui traverse l'application ───
// Chaque étape ouvre une route et affiche le résumé de la section (help).
export interface DemoStep {
  path: string;
  helpId: string;
}

export const DEMO_STEPS: DemoStep[] = [
  { path: '/', helpId: 'accueil' },
  { path: '/pieces', helpId: 'pieces' },
  { path: '/explorer', helpId: 'explorer' },
  { path: '/explorer/encyclopedie', helpId: 'encyclopedie' },
  { path: '/explorer/frise', helpId: 'frise' },
  { path: '/explorer/carte', helpId: 'carte' },
  { path: '/explorer/collections', helpId: 'collections' },
  { path: '/costumes', helpId: 'costumes' },
  { path: '/decors', helpId: 'decors' },
  { path: '/accessoires', helpId: 'accessoires' },
  { path: '/festivals', helpId: 'festivals' },
  { path: '/scene?seg=mono', helpId: 'scene' },
  { path: '/quiz', helpId: 'quiz' },
  { path: '/ia', helpId: 'ia' },
  { path: '/journal', helpId: 'journal' },
  { path: '/collection', helpId: 'collection' },
  { path: '/reglages', helpId: 'reglages' },
];
