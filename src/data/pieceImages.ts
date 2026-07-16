// Miniatures des pièces (écran Pièces & cartes réutilisées).
// Fichier Wikimedia Commons par id de pièce — servi via Special:FilePath par
// <WikiImage>, qui retombe sur l'« initiale dorée » quand aucune image n'existe.
//
// Ne sont référencés ici que des fichiers du domaine public / licences libres
// DÉJÀ utilisés ailleurs dans l'app (voir CREDITS de lib/wikimedia.ts) : ils
// sont donc garantis de se charger. On complète progressivement, œuvre par
// œuvre, dès qu'une image fiable est trouvée — jamais d'invention de nom.

export const PIECE_IMAGES: Record<string, string> = {
  // Molière
  'le-misanthrope': 'LeMisanthrope.jpg',
  tartuffe: 'Tartuffe Moliere.jpg',
  lavare: "Charles Dullin, L'Avare, 1944.jpg",
  'malade-imaginaire': 'Le Malade imaginaire.jpg',
  'bourgeois-gentilhomme': 'BourgeoisGentilhomme1688.jpg',
  'dom-juan': "Frontispiece to Molière's Dom Juan by P Brissart 1682 - césar.jpg",
  'fourberies-scapin': 'Les Fourberies de Scapin frontispice.jpg',
  'ecole-des-femmes': "L'EcoledesFemmes.jpg",
  'femmes-savantes': 'LesFemmesSavantes.jpg',

  // Racine
  phedre: 'Alexandre Cabanel - Phèdre.jpg',
  andromaque: 'Jacques-Louis David- Andromache Mourning Hector.JPG',
  britannicus: 'Racine - Britannicus, Barbin, 1670, 2.jpg',
  berenice: 'Berenice 1671 title page.JPG',

  // Corneille
  'le-cid': '3402440-Le Cid performed in Paris 1637-Burgos.jpg',
  cinna: 'Cinna corneille.jpg',
  'medee-corneille': 'Médée furieuse - Eugène Delacroix - Musée du Louvre Peintures RF 1402.jpg',

  // Beaumarchais
  'mariage-figaro': 'Ramberg figaro 1.jpg',
  'barbier-seville': 'BarberSeville.jpg',

  // Marivaux
  'le-jeu-amour-hasard': 'MarivauxGameLoveChance.jpg',

  // Musset
  lorenzaccio: 'Alfons Mucha - 1896 - Lorenzaccio.jpg',
  'on-ne-badine-pas': "Musset - On ne badine pas avec l'amour, 1884.djvu",
  fantasio: "Umberto Brunelleschi, illustration pour Fantasio d'Alfred de Musset.jpg",

  // Hugo
  hernani: 'Hernani Act I - Sc. III. by Paris & Martin after Vierge.png',
  'ruy-blas': 'Roybet, Ferdinand - Don César de Bazan - 195 - Maison de Victor Hugo.jpg',

  // Rostand / Jarry
  cyrano: 'Coquelin ainé.jpg',
  'ubu-roi': 'Programme for the première of Ubu Roi.jpg',

  // Shakespeare
  hamlet: 'Edwin Booth Hamlet 1870.jpg',
  macbeth: 'Orson Welles as Macbeth.jpg',
  'romeo-juliette': 'Frank Bernard Dicksee - Romeo and Juliet, 1884.jpg',

  // Tragédie grecque
  'oedipe-roi': 'Oedipus and Sphinx, pelike, 450-440 BC, Berlin F 2355, 141646.jpg',
  'antigone-sophocle': 'Antigone Gives Token Burial to the Body of Her Brother Polynices MET DP807380.jpg',

  // Ibsen
  'maison-poupee': "A Doll's House.jpeg",

  // Feydeau
  'puce-a-l-oreille': "La puce à l'oreille, pièce de Georges Feydeau - défets de presse - btv1b525109326 (1 of 8).jpg",

  // ── Batch 1 (2026-07-16) — liens fournis par l'utilisateur, résolus vers un
  // fichier Commons concret et vérifiés (200). Quand aucune image spécifique
  // fiable n'existait, on retombe sur le portrait de l'auteur (repli assumé).
  // Images spécifiques de l'œuvre
  antony: 'Antony (Alexandre Dumas).jpg',
  turcaret: 'Turcaret II-3 – Lesage.png',
  'henry-iii-et-sa-cour': 'Henri III et sa cour P-FG-ES-05765.jpg',
  'tour-de-nesle': 'Bocage as Buridan (Tour de Nesle).jpg',
  'ubu-enchaine': 'Jarry - Ubu enchaîné, 1900 (page 11 crop).jpg',
  'farce-cuvier': 'Farce du cuvier, modernisation Gassies, 1896.djvu',
  'la-mouette': "Moscow Art Theatre production of Anton Chekhov's The Seagull 1898.jpg",
  'oncle-vania': '"Uncle Vanya" LCCN98517783.jpg',
  'chant-du-cygne': 'Лебединая песня (Калхас) литографированный оттиск 1888.jpg',
  ours: 'The Bear by Anton Chekhov - Jan 2009 (3287886601).jpg',
  noce: 'The Wedding Chekhov Gymnasium.jpg',
  lysistrata: 'Title page first editions of Lysistrata of Aristophanes, 1516.jpg',
  eugenie: 'Beaumarchais Eugénie Akt III Szene VIII.jpg',
  // Repli : portrait de l'auteur (aucune image spécifique fiable)
  'crispin-rival-de-son-maitre': 'Alain-René Lesage.png',
  kean: 'Nadar - Alexander Dumas père (1802-1870) - Google Art Project 2.jpg',
  antliaclastes: 'Alfred Jarry.jpg',
  'andre-del-sarto': 'Alfred de Musset.jpg',
  barberine: 'Alfred de Musset.jpg',
  carmosine: 'Alfred de Musset.jpg',
  'il-faut-qu-une-porte-soit-ouverte-ou-fer': 'Alfred de Musset.jpg',
  'il-ne-faut-jurer-de-rien': 'Alfred de Musset.jpg',
  'ane-et-le-ruisseau': 'Alfred de Musset.jpg',
  'nuit-venitienne': 'Alfred de Musset.jpg',
  chandelier: 'Alfred de Musset.jpg',
  'caprices-marianne': 'Alfred de Musset.jpg',
  louison: 'Alfred de Musset.jpg',
  'on-ne-saurait-penser-a-tout': 'Alfred de Musset.jpg',
  caprice: 'Alfred de Musset.jpg',
  sauvage: 'Anton Chekhov with bow-tie sepia image.jpg',
  'demande-en-mariage': 'Anton Chekhov with bow-tie sepia image.jpg',
  'ce-fou-de-platonov': 'Anton Chekhov with bow-tie sepia image.jpg',
  cerisaie: 'Anton Chekhov with bow-tie sepia image.jpg',
  jubile: 'Anton Chekhov with bow-tie sepia image.jpg',
  'mefaits-du-tabac': 'Anton Chekhov with bow-tie sepia image.jpg',
  'trois-s-urs': 'Anton Chekhov with bow-tie sepia image.jpg',
  'sur-la-grand-route': 'Anton Chekhov with bow-tie sepia image.jpg',
  'tatiana-repina': 'Anton Chekhov with bow-tie sepia image.jpg',
  'tragedien-malgre-lui': 'Anton Chekhov with bow-tie sepia image.jpg',
  ivanov: 'Anton Chekhov with bow-tie sepia image.jpg',
  'les-grenouilles': 'Aristofanes.jpg',
  'les-oiseaux': 'Aristofanes.jpg',

  // ── Batch 2 (2026-07-16) — surtout Labiche. Idem : image spécifique fiable,
  // sinon portrait de l'auteur. Pages de djvu vides / scans noirs écartés.
  // Images spécifiques de l'œuvre
  'arlequin-valet-de-deux-maitres': 'Jean-Antoine Watteau, The Italian Comedians - Getty Museum.jpg',
  agamemnon: '"Agamemnon" 2008 Studiobühne Siegburg (bearbeitet).jpg',
  'les-perses': 'Aeschylus Αἰσχύλος Eschilo Esquil Catalan translation any 1932 Els perses.jpg',
  'promethee-enchaine': 'Aischylos - Prometheys.pdf',
  'je-croque-ma-tante': 'Labiche - Je croque ma tante, 1858.djvu',
  cagnotte: 'La Cagnotte.png',
  grammaire: 'La Grammaire de Labiche - acteurs.jpg',
  'station-champbaudet': "La station Champbaudet, comédie d'Eugène Labiche - dessins pour illustrer l'édition de la pièce - dessins - d'Henriot - btv1b550037206 (5 of 5).jpg",
  'roi-des-frontins': 'Labiche - Le roi des Frontins, 1845 (Couverture).jpg',
  // Repli : portrait de l'auteur
  rustres: 'Alessandro Longhi - Ritratto di Carlo Goldoni (c 1757) Ca Goldoni Venezia - Close-up.jpg',
  'est-il-bon-est-il-mechant': 'Denis Diderot 111.PNG',
  'pere-de-famille': 'Denis Diderot 111.PNG',
  contagion: 'Émile Augier by Adam-Salomon c1870s.jpg',
  'fils-de-giboyer': 'Émile Augier by Adam-Salomon c1870s.jpg',
  'post-scriptum': 'Émile Augier by Adam-Salomon c1870s.jpg',
  '29-degres-a-l-ombre': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'celimare-le-bien-aime': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'deux-merles-blancs': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'deux-papas-tres-bien': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'doit-on-le-dire': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'edgard-et-sa-bonne': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'affaire-de-la-rue-de-lourcine': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'embrassons-nous-folleville': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'en-manches-de-chemise': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  frisette: 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'garanti-dix-ans': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'j-ai-compromis-ma-femme': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'j-invite-le-colonel': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'amour-en-sabots': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'avocat-d-un-grec': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'chasse-aux-corbeaux': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'cigale-chez-les-fourmis': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'dame-au-petit-chien': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'fille-bien-gardee': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'main-leste': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'perle-de-la-canebiere': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'poudre-aux-yeux': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  sensitive: 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'baron-de-fourchevif': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'chevalier-des-dames': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'choix-d-un-gendre': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'club-champenois': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'major-cravachon': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'misanthrope-et-l-auvergnat': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'plus-heureux-des-trois': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'point-de-mire': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'premier-pas': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  'prix-martin': 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
  perrichon: 'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg',
};

/** Fichier Wikimedia d'une pièce, ou undefined (→ repli initiale dans WikiImage). */
export function pieceImage(id: string): string | undefined {
  return PIECE_IMAGES[id];
}
