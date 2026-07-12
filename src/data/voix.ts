// Entraînement vocal — priorité 10. Centré sur la VOIX (échauffement, placement,
// projection, virelangues, justesse, soutien), distinct des exercices d'acteur.

export type CategorieVocale =
  | 'Échauffement' | 'Résonateurs' | 'Projection' | 'Virelangues' | 'Justesse' | 'Souffle';

export interface ExerciceVocal {
  id: string;
  titre: string;
  categorie: CategorieVocale;
  duree: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  objectif: string;
  etapes: string[];
  conseil?: string;
}

export const EXERCICES_VOCAUX: ExerciceVocal[] = [
  // ─── Échauffement ───
  {
    id: 'echauff-baillement', titre: 'Le bâillement sonore', categorie: 'Échauffement',
    duree: '3 min', niveau: 'Débutant',
    objectif: 'Détendre la gorge et ouvrir le pharynx avant de faire sonner la voix.',
    etapes: [
      'Provoquez un vrai bâillement, bouche grande ouverte.',
      'À la fin du bâillement, laissez échapper un son « haaa » relâché.',
      'Recommencez 5 fois en descendant peu à peu dans les graves.',
    ],
    conseil: "La gorge doit rester libre : c'est la sensation d'espace du bâillement qu'on recherche.",
  },
  {
    id: 'echauff-sirenes', titre: 'Les sirènes', categorie: 'Échauffement',
    duree: '4 min', niveau: 'Débutant',
    objectif: "Assouplir toute l'étendue vocale, du grave à l'aigu, sans à-coups.",
    etapes: [
      'Sur un « ou » ou un « ng », partez du grave et montez vers l\'aigu en glissant.',
      'Redescendez de même, comme une sirène continue.',
      'Enchaînez montées et descentes sur une seule expiration.',
    ],
    conseil: 'Cherchez la continuité : aucun « palier », un glissando lisse.',
  },
  {
    id: 'echauff-trille', titre: 'Le trille de lèvres', categorie: 'Échauffement',
    duree: '3 min', niveau: 'Débutant',
    objectif: 'Faire vibrer les lèvres pour masser la voix et réduire les tensions.',
    etapes: [
      'Soufflez entre les lèvres relâchées pour produire un « brrr » de moteur.',
      'Ajoutez la voix, puis promenez la hauteur en montant et descendant.',
      'Tenez le trille le plus longtemps possible sur un souffle.',
    ],
  },
  {
    id: 'echauff-hum', titre: 'Le bourdonnement (hum)', categorie: 'Échauffement',
    duree: '3 min', niveau: 'Débutant',
    objectif: 'Réveiller les résonances et sentir les vibrations dans le visage.',
    etapes: [
      'Bouche fermée, émettez un « mmm » confortable, en milieu de voix.',
      'Cherchez à sentir picoter les lèvres et le nez.',
      'Ouvrez sur « mmm-a » sans perdre la vibration.',
    ],
    conseil: 'Si ça ne picote pas, la voix est trop dans la gorge : amenez le son vers l\'avant.',
  },

  // ─── Résonateurs (placement de voix) ───
  {
    id: 'reso-masque', titre: 'La voix dans le masque', categorie: 'Résonateurs',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Placer le son dans les résonateurs du visage pour une voix claire qui porte.',
    etapes: [
      'Répétez « ming – ming – ming » de façon un peu nasillarde.',
      'Sentez la vibration dans le nez et les pommettes (le « masque »).',
      'Gardez cette sensation en passant à une phrase parlée.',
    ],
    conseil: 'Le masque, c\'est la zone yeux-nez-pommettes : la voix y gagne en brillance.',
  },
  {
    id: 'reso-poitrine', titre: 'La voix de poitrine', categorie: 'Résonateurs',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Trouver l\'assise grave et la profondeur du timbre.',
    etapes: [
      'Une main à plat sur le sternum, dites un « ho » grave et posé.',
      'Cherchez à sentir vibrer la poitrine sous la main.',
      'Lisez une phrase en gardant cette résonance basse.',
    ],
  },
  {
    id: 'reso-avant', titre: 'Le placement en avant', categorie: 'Résonateurs',
    duree: '4 min', niveau: 'Intermédiaire',
    objectif: 'Éviter la voix « dans la gorge » en projetant le son vers les dents.',
    etapes: [
      'Répétez « ni-ni-ni » puis « nè-nè-nè » en imaginant le son sortir par les incisives.',
      'Passez à « nini veut la lune » sans reculer le son.',
      'Vérifiez : la voix doit sembler naître devant vous, pas derrière.',
    ],
  },

  // ─── Projection ───
  {
    id: 'projection-appel', titre: "L'appel au loin", categorie: 'Projection',
    duree: '4 min', niveau: 'Débutant',
    objectif: 'Porter la voix loin sans crier ni forcer la gorge.',
    etapes: [
      "Imaginez quelqu'un à l'autre bout d'un champ.",
      'Lancez « Ohé ! » vers cette personne, en appui sur le souffle du ventre.',
      'Répétez en visant de plus en plus loin, gorge relâchée.',
    ],
    conseil: 'Projeter n\'est pas crier : c\'est l\'appui du souffle, pas la tension du cou.',
  },
  {
    id: 'projection-crescendo', titre: 'Le crescendo maîtrisé', categorie: 'Projection',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Contrôler le volume, du murmure à la pleine voix, sans casser le son.',
    etapes: [
      'Tenez une voyelle « a » très doucement.',
      'Augmentez progressivement le volume jusqu\'au maximum confortable.',
      'Redescendez lentement au murmure, timbre stable.',
    ],
  },
  {
    id: 'projection-dernier-rang', titre: 'Parler au dernier rang', categorie: 'Projection',
    duree: '6 min', niveau: 'Intermédiaire',
    objectif: 'Adapter la voix à l\'espace pour être entendu partout sans micro.',
    etapes: [
      'Choisissez un texte court et un point très éloigné.',
      'Dites-le en visant explicitement ce point du regard et de la voix.',
      'Rapprochez puis éloignez le point : ajustez l\'énergie, pas la tension.',
    ],
    conseil: 'Le dernier rang doit tout entendre ; le premier ne doit pas être agressé.',
  },

  // ─── Virelangues ───
  {
    id: 'vire-archiduchesse', titre: "Les chaussettes de l'archiduchesse", categorie: 'Virelangues',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Travailler les sifflantes (ch/s) et la vélocité articulatoire.',
    etapes: [
      "« Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ? »",
      'Dites-la lentement et parfaitement, puis accélérez par paliers.',
      'Gardez chaque « ch » et chaque « s » nets jusqu\'à vitesse maximale.',
    ],
    conseil: 'La précision d\'abord, la vitesse ensuite.',
  },
  {
    id: 'vire-toux', titre: "Ton thé t'a-t-il ôté ta toux ?", categorie: 'Virelangues',
    duree: '4 min', niveau: 'Débutant',
    objectif: 'Délier les dentales (t) et les enchaînements de voyelles.',
    etapes: [
      "« Ton thé t'a-t-il ôté ta toux ? »",
      'Répétez en boucle, de plus en plus vite.',
      'Puis « Tata, ta tarte tatin tenta Tonton ».',
    ],
  },
  {
    id: 'vire-chasseur', titre: 'Un chasseur sachant chasser', categorie: 'Virelangues',
    duree: '4 min', niveau: 'Débutant',
    objectif: 'Alterner les sons « ch » et « s » sans les confondre.',
    etapes: [
      '« Un chasseur sachant chasser sait chasser sans son chien. »',
      'Décomposez lentement, puis enchaînez à vitesse croissante.',
    ],
  },
  {
    id: 'vire-didon', titre: 'Didon dîna, dit-on…', categorie: 'Virelangues',
    duree: '6 min', niveau: 'Avancé',
    objectif: 'Maîtriser un virelangue long et piégeux à débit rapide.',
    etapes: [
      "« Didon dîna, dit-on, du dos d'un dodu dindon. »",
      'Puis « Si six scies scient six cyprès, six cent six scies scient six cent six cyprès. »',
      'Cherchez la vitesse maximale sans jamais avaler une syllabe.',
    ],
    conseil: 'Respirez aux bons endroits : un virelangue se joue aussi avec le souffle.',
  },

  // ─── Justesse (hauteur / chant) ───
  {
    id: 'justesse-gammes', titre: 'Les gammes parlées-chantées', categorie: 'Justesse',
    duree: '6 min', niveau: 'Intermédiaire',
    objectif: 'Travailler la précision de la hauteur et l\'oreille musicale.',
    etapes: [
      'Chantez une gamme montante do-ré-mi-fa-sol-la-si-do sur « la ».',
      'Redescendez de même, en tenant chaque note juste.',
      'Reprenez en « parlé-chanté » : la voix parlée qui monte de degré en degré.',
    ],
    conseil: 'Enregistrez-vous et comparez à un instrument pour vérifier la justesse.',
  },
  {
    id: 'justesse-octave', titre: "L'unisson et l'octave", categorie: 'Justesse',
    duree: '6 min', niveau: 'Avancé',
    objectif: 'Se caler sur une note donnée, puis la retrouver à l\'octave.',
    etapes: [
      'Faites sonner une note de référence (piano, appli, diapason).',
      'Chantez la même note à l\'unisson, tenez-la.',
      'Cherchez la même note une octave plus haut, puis plus bas.',
    ],
  },
  {
    id: 'justesse-glissando', titre: 'Le glissando contrôlé', categorie: 'Justesse',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Passer d\'une note à une autre en contrôlant tout le trajet.',
    etapes: [
      'Partez d\'une note grave, glissez jusqu\'à une note aigüe précise et arrêtez-vous net.',
      'Vérifiez que la note d\'arrivée est juste.',
      'Variez la vitesse du glissando, sans dépasser la cible.',
    ],
  },

  // ─── Souffle (soutien vocal) ───
  {
    id: 'souffle-s', titre: 'Le soutien sur « s »', categorie: 'Souffle',
    duree: '4 min', niveau: 'Débutant',
    objectif: 'Sentir le soutien abdominal qui alimente la voix.',
    etapes: [
      'Émettez un « sssss » long et parfaitement régulier.',
      'Une main sur le ventre, sentez les abdominaux soutenir le flux.',
      'Coupez le « s » en petits « s-s-s » toniques, ventre actif.',
    ],
    conseil: 'Le soutien, c\'est le ventre qui pousse doucement : la gorge ne fait qu\'ouvrir le passage.',
  },
  {
    id: 'souffle-phrase', titre: 'La phrase sur un souffle', categorie: 'Souffle',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Gérer la respiration pour dire une longue phrase sans reprise d\'air.',
    etapes: [
      'Prenez une réplique longue (un alexandrin ou deux).',
      'Dites-la d\'un seul souffle, en dosant l\'air du début à la fin.',
      'Allongez peu à peu la longueur tenue sur une seule inspiration.',
    ],
  },
  {
    id: 'souffle-comptine', titre: 'Souffle et voix combinés', categorie: 'Souffle',
    duree: '5 min', niveau: 'Intermédiaire',
    objectif: 'Coordonner l\'appui du souffle et l\'émission vocale sur un rythme.',
    etapes: [
      'Récitez une comptine en marquant fortement chaque temps par le ventre.',
      'Puis alternez une syllabe voisée et une syllabe chuchotée.',
      'Gardez le débit d\'air constant malgré les changements.',
    ],
  },
];
