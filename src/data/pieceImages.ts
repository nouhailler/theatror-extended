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
};

/** Fichier Wikimedia d'une pièce, ou undefined (→ repli initiale dans WikiImage). */
export function pieceImage(id: string): string | undefined {
  return PIECE_IMAGES[id];
}
