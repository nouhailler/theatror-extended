// Exercices d'acteur — priorité 9. Type co-localisé (cf. characters.ts).

export type ExerciceCategorie =
  | 'Respiration' | 'Diction' | 'Articulation' | 'Concentration'
  | 'Improvisation' | 'Émotions' | 'Regard' | 'Posture' | 'Mémoire' | 'Écoute';

export interface Exercice {
  id: string;
  titre: string;
  categorie: ExerciceCategorie;
  duree: string; // ex. « 5 min »
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  solo: boolean; // seul (true) ou en groupe (false)
  objectif: string; // ce que l'exercice travaille
  etapes: string[]; // déroulé pas à pas
  conseil?: string; // astuce du comédien
}

export const EXERCICES: Exercice[] = [
  // ─── Respiration ───
  {
    id: 'respi-diaphragme', titre: 'La respiration diaphragmatique', categorie: 'Respiration',
    duree: '5 min', niveau: 'Débutant', solo: true,
    objectif: "Ancrer le souffle dans le ventre plutôt que dans les épaules, base de toute voix posée.",
    etapes: [
      'Allongez-vous ou tenez-vous debout, une main sur le ventre, une sur la poitrine.',
      "Inspirez par le nez en gonflant le ventre : seule la main du bas doit se soulever.",
      'Expirez lentement par la bouche en rentrant le ventre, sur un « ffff » régulier.',
      'Répétez 10 cycles, de plus en plus lents.',
    ],
    conseil: "La poitrine reste immobile : si l'épaule monte, c'est que le souffle est trop haut.",
  },
  {
    id: 'respi-continu', titre: 'Le souffle compté', categorie: 'Respiration',
    duree: '5 min', niveau: 'Intermédiaire', solo: true,
    objectif: "Allonger et maîtriser l'expiration pour tenir de longues répliques sans reprendre d'air.",
    etapes: [
      "Inspirez profondément par le ventre en 4 temps.",
      'Expirez en comptant à voix haute, lentement, le plus loin possible.',
      "Notez le chiffre atteint, puis recommencez en cherchant à le dépasser.",
      "Variez : chuchoté, puis projeté, sans changer la régularité.",
    ],
    conseil: 'Gardez un débit constant : ne lâchez pas tout l\'air au début.',
  },
  {
    id: 'respi-ballon', titre: "Le ballon d'air", categorie: 'Respiration',
    duree: '3 min', niveau: 'Débutant', solo: true,
    objectif: 'Détendre la cage thoracique et relâcher les tensions avant de jouer.',
    etapes: [
      'Inspirez en imaginant un ballon qui gonfle à 360° autour de la taille (ventre, côtes, dos).',
      'Bloquez 2 secondes.',
      'Expirez en soufflant comme pour éteindre une bougie lointaine, sans forcer.',
      'Enchaînez 8 fois, épaules basses.',
    ],
  },

  // ─── Diction ───
  {
    id: 'diction-virelangues', titre: 'Les virelangues progressifs', categorie: 'Diction',
    duree: '10 min', niveau: 'Intermédiaire', solo: true,
    objectif: 'Délier la langue et gagner en netteté sur les enchaînements difficiles.',
    etapes: [
      'Commencez lentement : « Un chasseur sachant chasser sait chasser sans son chien ».',
      'Répétez en accélérant progressivement, sans jamais avaler de syllabe.',
      "Passez à « Les chaussettes de l'archiduchesse sont-elles sèches ? ».",
      'Terminez à vitesse maximale, articulation intacte.',
    ],
    conseil: 'Mieux vaut lent et net que rapide et bafouillé : la vitesse vient après la précision.',
  },
  {
    id: 'diction-bouchon', titre: 'Le crayon entre les dents', categorie: 'Diction',
    duree: '8 min', niveau: 'Intermédiaire', solo: true,
    objectif: 'Forcer les muscles articulatoires à travailler pour une diction éclatante.',
    etapes: [
      'Placez un crayon (ou un bouchon) horizontalement entre les dents.',
      'Lisez un texte à voix haute en cherchant à rester compréhensible malgré la gêne.',
      "Retirez le crayon et relisez le même passage : l'articulation paraît soudain facile.",
    ],
    conseil: "N'exagérez pas la mâchoire : c'est la langue et les lèvres qui compensent.",
  },
  {
    id: 'diction-voyelles', titre: 'Les voyelles projetées', categorie: 'Diction',
    duree: '5 min', niveau: 'Débutant', solo: true,
    objectif: 'Ouvrir la bouche et le son pour porter la voix sans crier.',
    etapes: [
      'Tenez chaque voyelle : A – E – I – O – U, en exagérant la forme des lèvres.',
      'Envoyez le son vers le fond de la salle, comme pour toucher le mur du fond.',
      'Enchaînez les voyelles sur une seule expiration.',
    ],
  },

  // ─── Articulation ───
  {
    id: 'articulation-explosives', titre: 'Les consonnes explosives', categorie: 'Articulation',
    duree: '5 min', niveau: 'Débutant', solo: true,
    objectif: 'Réveiller les lèvres et la langue avec les sons percutants P, T, K.',
    etapes: [
      'Répétez « pa-ta-ka » de plus en plus vite, en détachant nettement chaque consonne.',
      'Puis « pe-te-ke », « pi-ti-ki », « po-to-ko », « pu-tu-ku ».',
      'Terminez par une phrase pleine de plosives : « Papa, tu ne comprends pas ! ».',
    ],
    conseil: 'Chaque consonne doit « claquer » : imaginez qu\'elle atteint le dernier rang.',
  },
  {
    id: 'articulation-ralenti', titre: 'Le texte au ralenti', categorie: 'Articulation',
    duree: '8 min', niveau: 'Intermédiaire', solo: true,
    objectif: 'Sentir chaque son du texte pour ne plus en escamoter aucun en jeu.',
    etapes: [
      'Choisissez 4 vers connus.',
      'Dites-les au ralenti extrême, en savourant chaque syllabe.',
      'Reprenez à vitesse normale en gardant la même précision.',
    ],
  },

  // ─── Concentration ───
  {
    id: 'concentration-point-fixe', titre: 'Le point fixe', categorie: 'Concentration',
    duree: '5 min', niveau: 'Débutant', solo: true,
    objectif: "Développer l'attention et chasser les parasites mentaux avant d'entrer en scène.",
    etapes: [
      'Fixez un point immobile devant vous (une marque au mur).',
      'Respirez calmement en gardant toute votre attention sur ce point.',
      "Dès qu'une pensée surgit, revenez au point sans vous juger.",
      'Tenez 2 minutes, puis élargissez à tout ce qui entoure le point.',
    ],
    conseil: "L'esprit vagabonde, c'est normal : l'exercice, c'est le retour, pas l'immobilité parfaite.",
  },
  {
    id: 'concentration-decompte', titre: 'Le décompte perturbé', categorie: 'Concentration',
    duree: '5 min', niveau: 'Intermédiaire', solo: false,
    objectif: 'Maintenir sa concentration malgré les distractions extérieures.',
    etapes: [
      'Comptez à voix haute de 1 à 30, lentement.',
      "Un partenaire essaie de vous déconcentrer (bruits, questions) sans vous toucher.",
      'Si vous perdez le fil, reprenez à zéro.',
    ],
  },
  {
    id: 'concentration-sens', titre: 'Les cinq sens', categorie: 'Concentration',
    duree: '6 min', niveau: 'Débutant', solo: true,
    objectif: 'Ancrer sa présence dans l\'ici-et-maintenant par les perceptions.',
    etapes: [
      'Nommez mentalement 5 choses que vous voyez.',
      'Puis 4 que vous entendez, 3 que vous touchez, 2 que vous sentez, 1 que vous goûtez.',
      'Prenez le temps de vraiment percevoir chacune.',
    ],
    conseil: 'Excellent juste avant une entrée en scène pour couper le trac.',
  },

  // ─── Improvisation ───
  {
    id: 'impro-oui-et', titre: '« Oui, et… »', categorie: 'Improvisation',
    duree: '10 min', niveau: 'Débutant', solo: false,
    objectif: "Apprendre à accepter et enrichir les propositions du partenaire, règle d'or de l'impro.",
    etapes: [
      'À deux, construisez une histoire phrase par phrase.',
      "Chaque réplique doit commencer par « Oui, et… » et ajouter un élément.",
      'Interdit de nier ou de bloquer ce que propose l\'autre.',
      'Poursuivez jusqu\'à une chute commune.',
    ],
    conseil: 'Le refus tue la scène : dans le doute, dites oui et rebondissez.',
  },
  {
    id: 'impro-mot-impose', titre: 'Le mot imposé', categorie: 'Improvisation',
    duree: '10 min', niveau: 'Intermédiaire', solo: false,
    objectif: 'Développer la réactivité et l\'inventivité sous contrainte.',
    etapes: [
      'Le public (ou un partenaire) donne un mot au hasard.',
      'Vous devez le placer naturellement dans la scène en cours.',
      'De nouveaux mots tombent régulièrement, à intégrer sans casser le rythme.',
    ],
  },
  {
    id: 'impro-statues', titre: 'Statues et déclencheurs', categorie: 'Improvisation',
    duree: '12 min', niveau: 'Intermédiaire', solo: false,
    objectif: 'Faire naître une situation à partir du corps et de l\'espace.',
    etapes: [
      'Un acteur prend une posture figée (statue) sans intention préalable.',
      'Un second entre, observe, et justifie la posture par une réplique.',
      'La scène démarre à partir de cette justification.',
    ],
    conseil: 'Ne préparez rien : c\'est le corps de l\'autre qui doit vous inspirer.',
  },

  // ─── Émotions ───
  {
    id: 'emotions-levier', titre: 'La mémoire affective', categorie: 'Émotions',
    duree: '10 min', niveau: 'Avancé', solo: true,
    objectif: "Convoquer une émotion vraie en s'appuyant sur un souvenir personnel (méthode Stanislavski).",
    etapes: [
      'Choisissez un souvenir chargé d\'une émotion précise.',
      'Revivez-en les détails sensoriels (lieu, lumière, odeurs, sons).',
      'Laissez l\'émotion monter, puis dites votre texte en la gardant vivante.',
      'Refermez consciemment le souvenir à la fin.',
    ],
    conseil: 'À manier avec précaution : choisissez un souvenir que vous pouvez « refermer » sans danger.',
  },
  {
    id: 'emotions-intensites', titre: 'La gamme des intensités', categorie: 'Émotions',
    duree: '8 min', niveau: 'Intermédiaire', solo: true,
    objectif: 'Doser une émotion sur une échelle, pour éviter le tout ou rien.',
    etapes: [
      'Prenez une émotion (la colère, par exemple).',
      'Jouez-la à 1/10 (contrariété), puis 5/10, puis 10/10 (fureur).',
      'Passez d\'un niveau à l\'autre sur une même réplique.',
    ],
  },
  {
    id: 'emotions-dix', titre: 'La même phrase, dix émotions', categorie: 'Émotions',
    duree: '8 min', niveau: 'Débutant', solo: true,
    objectif: 'Découvrir combien le sens dépend de l\'intention, pas seulement des mots.',
    etapes: [
      'Choisissez une phrase neutre : « Il pleut ce soir ».',
      'Dites-la successivement joyeux, triste, en colère, apeuré, séducteur, ironique…',
      'Observez comment le corps et le regard changent avec l\'émotion.',
    ],
    conseil: 'Filmez-vous : l\'écart entre ce que vous ressentez et ce qui se voit est instructif.',
  },

  // ─── Regard ───
  {
    id: 'regard-raconte', titre: 'Le regard qui raconte', categorie: 'Regard',
    duree: '6 min', niveau: 'Intermédiaire', solo: true,
    objectif: 'Faire passer une pensée par le seul regard, sans un mot.',
    etapes: [
      'Face à un miroir ou une caméra, pensez très fort à une phrase précise.',
      'Ne la dites pas : laissez-la vivre dans vos yeux.',
      'Variez les phrases et vérifiez qu\'un observateur devine l\'intention.',
    ],
  },
  {
    id: 'regard-lointain', titre: 'Le point au loin', categorie: 'Regard',
    duree: '4 min', niveau: 'Débutant', solo: true,
    objectif: 'Apprendre à « voir » ce qui n\'existe pas sur le plateau.',
    etapes: [
      'Fixez un point imaginaire au loin (un personnage, un souvenir, l\'horizon).',
      'Décrivez-le mentalement dans le moindre détail.',
      'Dites votre texte comme si vous le regardiez vraiment.',
    ],
    conseil: 'Un regard précis et habité vaut mille gestes : le public suit vos yeux.',
  },

  // ─── Posture ───
  {
    id: 'posture-ancrage', titre: "L'ancrage", categorie: 'Posture',
    duree: '5 min', niveau: 'Débutant', solo: true,
    objectif: 'Trouver une assise stable et une présence solide au sol.',
    etapes: [
      'Debout, pieds écartés à la largeur du bassin, genoux souples.',
      'Imaginez des racines qui descendent de vos pieds dans le sol.',
      'Sentez le poids réparti également, colonne longue, sommet du crâne vers le ciel.',
      'Faites un pas : gardez cette sensation d\'ancrage.',
    ],
  },
  {
    id: 'posture-pantin', titre: 'Le pantin désarticulé', categorie: 'Posture',
    duree: '5 min', niveau: 'Débutant', solo: true,
    objectif: 'Relâcher les tensions et prendre conscience de chaque partie du corps.',
    etapes: [
      'Debout, relâchez la tête vers l\'avant, puis déroulez lentement vers le sol, vertèbre par vertèbre.',
      'Restez suspendu, bras et nuque relâchés.',
      'Remontez tout aussi lentement en réempilant les vertèbres.',
    ],
    conseil: 'La tête remonte en dernier : ne « tirez » jamais avec le cou.',
  },
  {
    id: 'posture-statuts', titre: 'La marche des statuts', categorie: 'Posture',
    duree: '10 min', niveau: 'Intermédiaire', solo: false,
    objectif: 'Incarner un statut social par la seule posture et la démarche.',
    etapes: [
      'Marchez « en statut 1 » (soumis, effacé) : regard bas, corps replié.',
      'Montez peu à peu jusqu\'au « statut 10 » (dominant, sûr) : buste ouvert, rythme posé.',
      'Croisez d\'autres marcheurs et jouez les rapports de statut sans un mot.',
    ],
  },

  // ─── Mémoire ───
  {
    id: 'memoire-blocs', titre: 'La mémoire par blocs', categorie: 'Mémoire',
    duree: '15 min', niveau: 'Débutant', solo: true,
    objectif: 'Apprendre un texte solidement en le découpant en unités de sens.',
    etapes: [
      'Découpez la tirade en petits blocs (une idée = un bloc).',
      'Mémorisez le premier bloc, récitez-le sans le texte.',
      'Ajoutez le deuxième, récitez les deux ensemble, et ainsi de suite.',
      'Reliez chaque bloc au geste ou à l\'intention qui le déclenche.',
    ],
    conseil: 'On retient mieux une action qu\'une suite de mots : associez texte et mouvement.',
  },
  {
    id: 'memoire-palais', titre: 'Le palais de mémoire', categorie: 'Mémoire',
    duree: '20 min', niveau: 'Avancé', solo: true,
    objectif: 'Ancrer un long texte en le plaçant mentalement dans un lieu familier.',
    etapes: [
      'Imaginez un lieu que vous connaissez par cœur (votre appartement).',
      'Associez chaque partie du texte à un endroit précis, dans l\'ordre de votre parcours.',
      'Pour réciter, « promenez-vous » mentalement de pièce en pièce.',
    ],
  },

  // ─── Écoute ───
  {
    id: 'ecoute-echo', titre: "L'écho", categorie: 'Écoute',
    duree: '6 min', niveau: 'Débutant', solo: false,
    objectif: 'Écouter réellement le partenaire au lieu d\'attendre son tour de parole.',
    etapes: [
      'À deux, l\'un dit une phrase avec une intention.',
      'L\'autre la répète exactement, avec la même intonation et la même émotion.',
      'Inversez les rôles, puis complexifiez avec des phrases plus longues.',
    ],
    conseil: 'Jouer, c\'est d\'abord écouter : la réplique naît de ce que l\'autre vient de donner.',
  },
  {
    id: 'ecoute-miroir', titre: 'Le miroir', categorie: 'Écoute',
    duree: '8 min', niveau: 'Débutant', solo: false,
    objectif: 'Développer l\'attention au partenaire et la synchronisation corporelle.',
    etapes: [
      'Face à face, l\'un mène des mouvements lents, l\'autre les reproduit en miroir.',
      'Cherchez à être si synchrones qu\'un observateur ne devine plus qui mène.',
      'Échangez les rôles sans vous arrêter, puis « sans meneur ».',
    ],
  },
];
