// Costumes — priorité 17. Galerie historique (vignette illustrée par une œuvre
// de musée + description riche ; fiche détail cliquable avec grande image).
// Recherche par époque/pays/style/personnage.

export type CostumeEpoque =
  | 'Antiquité' | 'Moyen Âge' | 'Renaissance' | 'Grand Siècle'
  | 'Lumières' | 'Romantique' | 'Moderne';

export interface Costume {
  id: string;
  nom: string;
  epoque: CostumeEpoque;
  pays: string;
  genre: 'Homme' | 'Femme' | 'Mixte';
  initiale: string;
  img?: string; // fichier Wikimedia (repli : vignette colorée par époque)
  description: string;
  detail?: string; // explication approfondie (fiche détail)
  elements: string[]; // pièces du costume
  personnages?: string; // rôles / emplois associés
}

// Couleur d'accent par époque (vignette de repli, faute d'image).
export const COSTUME_COULEUR: Record<CostumeEpoque, string> = {
  'Antiquité': '#c98b4e',
  'Moyen Âge': '#8e9e5a',
  'Renaissance': '#5f8ea8',
  'Grand Siècle': '#d4a94e',
  'Lumières': '#a85a72',
  'Romantique': '#9e2b3a',
  'Moderne': '#7a6fae',
};

export const COSTUMES: Costume[] = [
  // ─── Antiquité ───
  { id: 'chiton', nom: 'Chiton grec', epoque: 'Antiquité', pays: 'Grèce', genre: 'Mixte', initiale: 'C', img: 'AurigaDelfi.jpg',
    description: "Tunique de lin ou de laine agrafée aux épaules et serrée à la taille, drapée en plis souples. Vêtement de base du théâtre grec antique.",
    detail: "Le chiton se portait à même le corps : une simple pièce d'étoffe rectangulaire, pliée puis fixée aux épaules par des fibules et resserrée par une ceinture qui réglait la longueur. Court pour les hommes actifs et les jeunes gens, long jusqu'aux pieds pour les femmes et les personnages de dignité. Au théâtre, l'acteur y ajoutait un manteau (himation) drapé pour marquer le rang, et sa couleur pouvait signaler le statut ou le deuil. La beauté du costume tenait tout entière au mouvement des plis, que la statuaire grecque a fixé pour l'éternité.",
    elements: ['Tunique drapée', 'Fibules (agrafes)', 'Ceinture'], personnages: 'Chœur, héros grecs' },
  { id: 'peplos', nom: 'Péplos', epoque: 'Antiquité', pays: 'Grèce', genre: 'Femme', initiale: 'P', img: 'Acropole Musée Athéna pensante.JPG',
    description: "Longue étoffe de laine pliée et épinglée aux épaules, laissant les côtés ouverts. Le vêtement féminin par excellence de la Grèce archaïque.",
    detail: "Plus ancien et plus lourd que le chiton, le péplos est une grande pièce de laine dont le haut se replie vers l'extérieur (l'apoptygma) pour retomber en pans sur la poitrine. Épinglé aux épaules, il laisse un côté ouvert et se ceinture à la taille. C'est le vêtement que l'on offrait rituellement à Athéna lors des Panathénées. Sur la scène tragique, sa gravité convient aux figures royales et douloureuses — une Antigone, une Électre — dont la silhouette drapée impose d'emblée la noblesse.",
    elements: ['Étoffe pliée', 'Épingles', 'Voile'], personnages: 'Antigone, Électre' },
  { id: 'toge', nom: 'Toge romaine', epoque: 'Antiquité', pays: 'Rome', genre: 'Homme', initiale: 'T', img: 'Tiberius Capri Louvre Ma1248.jpg',
    description: "Vaste drapé de laine blanche enroulé autour du corps, réservé aux citoyens romains. Symbole de dignité et de statut.",
    detail: "Immense demi-cercle de laine (jusqu'à six mètres), la toge s'enroulait autour du corps par-dessus la tunique en un drapé savant qui immobilisait le bras gauche — le vêtement de l'homme de loisir et d'autorité, non du travailleur. Sa bordure pourpre (toge prétexte) distinguait les magistrats et les enfants, sa blancheur éclatante le candidat (candidatus). Au théâtre, elle habille sénateurs, orateurs et Césars : porter la toge, c'est jouer la romanité, la parole publique et le pouvoir.",
    elements: ['Drapé de laine', 'Tunique dessous', 'Sandales'], personnages: 'Sénateurs, César' },
  { id: 'cothurnes', nom: 'Cothurnes et masque', epoque: 'Antiquité', pays: 'Grèce', genre: 'Mixte', initiale: 'C', img: 'Buskin (PSF).jpg',
    description: "Brodequins à semelle épaisse qui grandissent l'acteur tragique, associés au grand masque expressif et au chœur. La silhouette monumentale de la tragédie.",
    detail: "Le cothurne est la chaussure emblématique de la tragédie : sa semelle surélevée grandit l'acteur pour le hisser à la mesure des héros et le rendre visible du haut des gradins. Complété par le grand masque (prosôpon) aux traits accusés — qui portait la voix et fixait une émotion unique — et par l'onkos, cette coiffe qui rehausse encore la tête, il compose une silhouette monumentale, presque surhumaine. Par opposition, le soc (soccus), chaussure plate et basse, était le signe de la comédie.",
    elements: ['Cothurnes (semelles hautes)', 'Masque tragique', 'Onkos (coiffe)'], personnages: 'Tragédiens' },

  // ─── Moyen Âge ───
  { id: 'bliaud', nom: 'Bliaud', epoque: 'Moyen Âge', pays: 'France', genre: 'Femme', initiale: 'B', img: 'Charles Nègre, André Jammes, Planche XIII – Cathédrale de Chartres, Statues Colonnes de la Porte Centrale du Portail Royal, 1855, NGA 210763.jpg',
    description: "Longue robe ajustée au buste et évasée, aux manches amples, portée par les dames du XIIe siècle. Élégance de la cour féodale.",
    detail: "Le bliaud (ou bliaut) marque le passage du vêtement flottant du haut Moyen Âge à une silhouette ajustée : le buste est lacé sur les côtés pour épouser le corps, tandis que la jupe s'évase et que les manches s'ouvrent en larges pans pendants. Serré par une longue ceinture nouée bas sur les hanches, souvent tissé de fils précieux, il habille les dames de la cour féodale — celles que chantent les romans courtois. Les statues-colonnes de Chartres en donnent l'image la plus célèbre, aux plis longs et minutieux.",
    elements: ['Robe ajustée', 'Manches pendantes', 'Ceinture basse'], personnages: 'Dames, reines médiévales' },
  { id: 'houppelande', nom: 'Houppelande', epoque: 'Moyen Âge', pays: 'France', genre: 'Homme', initiale: 'H', img: '15th century costume - the Houppelande.jpg',
    description: "Ample robe longue à larges manches, souvent doublée de fourrure, marque de richesse à la fin du Moyen Âge.",
    detail: "Vêtement de dessus des XIVe-XVe siècles, la houppelande est une vaste robe tombant en plis amples depuis un col montant, aux manches énormes — évasées en « ailes » ou en « gueules » — souvent festonnées (découpées en dents) et doublées de fourrure. Longue et solennelle pour les hommes de rang, elle pouvait être raccourcie pour la marche. Étoffe, ampleur et fourrure la désignaient comme un vêtement d'apparat : au théâtre, elle campe aussitôt le bourgeois cossu, le magistrat ou le seigneur de la fin du Moyen Âge.",
    elements: ['Robe ample', 'Larges manches', 'Ceinture', 'Fourrure'], personnages: 'Bourgeois, seigneurs' },
  { id: 'mysteres-medievaux', nom: 'Costumes de mystères', epoque: 'Moyen Âge', pays: 'France', genre: 'Mixte', initiale: 'M', img: 'Mystery Play Metz.jpg',
    description: "Sur les parvis, anges aux ailes dorées et diables cornus et velus jouaient la Passion. Théâtre religieux haut en couleur et en symboles.",
    detail: "Les mystères, joués sur les parvis des cathédrales, mettaient en scène l'histoire sainte devant toute la ville. Le costume y était un langage immédiat : ailes dorées et robes blanches pour les anges, or et couronne pour Dieu et les saints, et surtout les diables — corps velus, cornes, masques grimaçants, queue et griffes — qui faisaient rire et frémir la foule. Ces déguisements, souvent conçus avec de vrais moyens de « feintes » (feu, fumée), font des mystères un théâtre spectaculaire où le vêtement rend visible l'invisible.",
    elements: ['Ailes dorées', 'Masques de diable', 'Cornes et queue', 'Robes de saints'], personnages: 'Anges, diables, saints' },

  // ─── Renaissance ───
  { id: 'pourpoint', nom: 'Pourpoint et haut-de-chausses', epoque: 'Renaissance', pays: 'France', genre: 'Homme', initiale: 'P', img: 'Italian pourpoint.jpg',
    description: "Veste ajustée et rembourrée (pourpoint) sur des chausses bouffantes, complétée d'une fraise. La silhouette masculine du XVIe siècle.",
    detail: "Le pourpoint est une veste courte et ajustée, rembourrée (« bourrée ») pour bomber le torse, boutonnée devant et lacée aux hauts-de-chausses. Ces derniers, courts et bouffants, gonflés d'étoffe et parfois « tailladés » de crevés qui laissent voir la doublure, couvrent le haut de la jambe au-dessus des bas collants. Le tout se couronne d'une fraise empesée qui isole la tête comme sur un plateau. Rigide, structurée, cette silhouette masculine du XVIe siècle dit la maîtrise et l'élégance des gentilshommes de cour.",
    elements: ['Pourpoint rembourré', 'Haut-de-chausses', 'Fraise', 'Chausses'], personnages: 'Gentilshommes' },
  { id: 'vertugadin', nom: 'Robe à vertugadin', epoque: 'Renaissance', pays: 'Espagne', genre: 'Femme', initiale: 'V', img: 'Pedro García de Benabarre St John Retable Detail.jpg',
    description: "Robe montée sur un bourrelet ou des cerceaux (vertugadin) qui élargit les hanches, buste rigide et col de dentelle. Faste des cours de la Renaissance.",
    detail: "Née à la cour d'Espagne, la robe à vertugadin repose sur une armature interne — un jupon renforcé de cerceaux d'osier ou de baleine — qui donne à la jupe une forme rigide, cône ou tambour, tandis qu'un corps baleiné aplatit et allonge le buste. Manches à crevés, col relevé et fraise de dentelle complètent une silhouette architecturale, presque immobile, qui impose la majesté du rang. C'est le costume des reines et des infantes, celui que la peinture de cour a rendu inoubliable.",
    elements: ['Vertugadin (cerceaux)', 'Corps baleiné', 'Col en dentelle', 'Manches à crevés'], personnages: 'Reines, infantes' },
  { id: 'commedia', nom: "Costumes de la commedia dell'arte", epoque: 'Renaissance', pays: 'Italie', genre: 'Mixte', initiale: 'A', img: 'SAND Maurice Masques et bouffons 01.jpg',
    description: "Types immédiatement reconnaissables : Arlequin et son habit de losanges colorés, Pantalon en rouge et noir, le Docteur tout de noir vêtu. Masques et couleurs codifiés.",
    detail: "Dans la commedia dell'arte, chaque personnage-type possède un costume figé qui le rend reconnaissable dès son entrée. Arlequin porte l'habit collant couvert de losanges bariolés (jadis de simples pièces rapiécées), un demi-masque noir et une batte de bois ; Pantalon, le vieux marchand vénitien, va en rouge et noir avec bourse à la ceinture ; le Docteur bolonais s'habille de noir doctoral ; Colombine et les amoureux, eux, jouent à visage découvert. Le masque de cuir et la couleur tiennent lieu de fiche d'identité : le vêtement est le rôle.",
    elements: ['Habit à losanges (Arlequin)', 'Masques de cuir', 'Batte', 'Collants'], personnages: 'Arlequin, Pantalon, Colombine' },

  // ─── Grand Siècle (XVIIe) ───
  { id: 'habit-francaise-17', nom: 'Habit de cour Louis XIV', epoque: 'Grand Siècle', pays: 'France', genre: 'Homme', initiale: 'H', img: 'Voet-duque de medinacelli-prado.jpg',
    description: "Justaucorps brodé, rhingrave à rubans, bas de soie, perruque et talons rouges : le luxe ostentatoire de la cour de Versailles.",
    detail: "Sous Louis XIV, le costume masculin de cour devient un manifeste de puissance. Le justaucorps, long habit ajusté richement brodé, se porte sur une veste et une chemise à jabot de dentelle ; la rhingrave, sorte de culotte très large ornée de flots de rubans, cède peu à peu à la culotte serrée. La haute perruque poudrée, les bas de soie et les talons rouges — privilège réservé aux courtisans admis auprès du Roi — parachèvent une silhouette éclatante. Au théâtre, c'est l'habit d'un Dom Juan ou des grands seigneurs de Molière.",
    elements: ['Justaucorps brodé', 'Jabot de dentelle', 'Perruque', 'Talons rouges'], personnages: 'Courtisans, Dom Juan' },
  { id: 'robe-cour-17', nom: 'Robe de cour', epoque: 'Grand Siècle', pays: 'France', genre: 'Femme', initiale: 'R', img: 'Mantua MET DT6543.jpg',
    description: "Corps très serré, jupe ouverte sur un jupon brodé, dentelles et rubans. L'élégance grave et fastueuse du siècle de Louis XIV.",
    detail: "La robe de cour du Grand Siècle enferme le buste dans un corps baleiné très rigide, à la taille longue et pointue, tandis que la jupe s'ouvre en devant sur un jupon richement brodé qu'elle est faite pour montrer. Dentelles, galons, nœuds d'épaule et manches à engageantes multiplient les ornements ; la coiffure « à la Fontanges » dresse au sommet de la tête un échafaudage de dentelle empesée. Gravité et faste s'y équilibrent : c'est la parure des dames de Versailles, d'une Célimène ou des grandes coquettes de la comédie.",
    elements: ['Corps baleiné', 'Jupon brodé', 'Dentelles', 'Coiffure Fontanges'], personnages: 'Célimène, dames de cour' },
  { id: 'romaine-tragedie', nom: 'Costume « à la romaine »', epoque: 'Grand Siècle', pays: 'France', genre: 'Homme', initiale: 'R', img: 'François-Joseph Talma (1763-1826), by Aimée Perlet.jpg',
    description: "Convention de la tragédie classique : casque à plumes, cuirasse et tonnelet (jupe rigide plissée) par-dessus des bas, quelle que soit l'époque du sujet.",
    detail: "La tragédie classique ne cherchait pas l'exactitude historique mais la dignité : on jouait Grecs et Romains « à la romaine », c'est-à-dire dans un costume de convention mêlant casque empanaché, cuirasse moulée et tonnelet — une courte jupe rigide, rembourrée et plissée en rayons — porté par-dessus des bas de soie et des souliers du temps. Cette panoplie codifiée, richement brodée, valait pour toute Antiquité. C'est contre elle que l'acteur Talma, à la fin du XVIIIe siècle, imposera un costume plus proche de la réalité archéologique.",
    elements: ['Casque à plumes', 'Cuirasse', 'Tonnelet', 'Bas de soie'], personnages: 'Héros de tragédie (Racine, Corneille)' },

  // ─── Lumières (XVIIIe) ───
  { id: 'robe-paniers', nom: 'Robe à paniers', epoque: 'Lumières', pays: 'France', genre: 'Femme', initiale: 'R', img: 'Robe à la Française - MET C.I.61.34a, b.jpg',
    description: "Jupe élargie latéralement par des paniers, taille fine, étoffes de soie fleurie. Le raffinement galant du XVIIIe siècle.",
    detail: "La robe à paniers repose sur une armature de côté — les « paniers » d'osier ou de baleine — qui élargit la jupe latéralement tout en la laissant plate devant et derrière, produisant cette silhouette caractéristique du XVIIIe siècle. À l'arrière, la robe « à la française » retombe en larges plis (dits plis Watteau) depuis les épaules. Soies fleuries aux tons tendres, fichu de dentelle sur la gorge, taille fine prise dans le corps baleiné : c'est l'élégance galante des marquises, mais aussi de Suzanne ou de Rosine chez Beaumarchais.",
    elements: ['Paniers latéraux', 'Corps à baleines', 'Fichu', 'Soie fleurie'], personnages: 'Marquises, Suzanne, Rosine' },
  { id: 'habit-brode-18', nom: 'Habit et gilet brodé', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'H', img: 'Costumes historiques Costume Louis XVI (1774), N°82, G.12342(1).jpg',
    description: "Habit à la française, gilet brodé, culotte serrée au genou, bas et souliers à boucle. L'élégance masculine des salons du siècle des Lumières.",
    detail: "L'habit à la française se compose de trois pièces assorties : l'habit aux basques évasées et au col rabattu, le gilet (souvent la pièce la plus richement brodée, seule visible sous l'habit ouvert) et la culotte serrée au genou. Bas de soie, souliers à boucle et petite perruque ou cheveux poudrés à catogan complètent la tenue. La broderie de soie, de fil d'or ou d'argent court sur les bords et les poches. Léger, coloré, spirituel, c'est le vêtement des salons et des comédies galantes — celui du comte Almaviva.",
    elements: ['Habit à la française', 'Gilet brodé', 'Culotte', 'Souliers à boucle'], personnages: 'Le Comte Almaviva, marquis' },
  { id: 'costume-valet-18', nom: 'Livrée de valet', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'L', img: 'Ramberg figaro 1.jpg',
    description: "Habit de couleur vive, parfois galonné, du valet de comédie — vif et malicieux comme Figaro ou Scapin.",
    detail: "La livrée est l'uniforme des domestiques d'une grande maison : un habit aux couleurs de la famille servie, souvent galonné de bandes contrastées aux coutures et aux poches. Au théâtre, le valet de comédie en tire un costume vif et reconnaissable, plus simple que celui du maître mais plein d'allant — à l'image de Figaro, meneur d'intrigue, ou de Scapin. Le vêtement dit à la fois la condition subalterne du personnage et son esprit délié : c'est le costume du serviteur qui mène le jeu.",
    elements: ['Livrée galonnée', 'Gilet', 'Bas', 'Chapeau'], personnages: 'Figaro, Scapin, Arlequin' },

  // ─── Romantique (XIXe) ───
  { id: 'redingote', nom: 'Redingote et haut-de-forme', epoque: 'Romantique', pays: 'France', genre: 'Homme', initiale: 'R', img: 'Frock Coat April 1904.jpg',
    description: "Longue veste ajustée, gilet, pantalon et haut-de-forme : la silhouette du gentleman du XIXe siècle, du drame bourgeois au vaudeville.",
    detail: "Au XIXe siècle, la couleur et la broderie désertent le costume masculin au profit d'une élégance sobre et sombre. La redingote — longue veste ajustée à la taille, aux pans tombant sur les cuisses — se porte sur un gilet et un pantalon (qui a définitivement remplacé la culotte), avec chemise à col dur et cravate. Le haut-de-forme et la canne parachèvent la silhouette du bourgeois et du gentleman. Uniforme d'une société d'hommes d'affaires, c'est le costume du drame bourgeois, du vaudeville de Feydeau et des comédies de Labiche.",
    elements: ['Redingote', 'Gilet', 'Haut-de-forme', 'Canne'], personnages: 'Bourgeois de Feydeau, Labiche' },
  { id: 'crinoline', nom: 'Robe à crinoline', epoque: 'Romantique', pays: 'France', genre: 'Femme', initiale: 'C', img: 'Princess Dagmar of Denmark with her dog.jpg',
    description: "Ample jupe portée sur une armature de crinoline, taille resserrée par le corset. Le volume spectaculaire du Second Empire.",
    detail: "La crinoline est une cage d'acier articulé qui, vers 1850-1860, remplace les innombrables jupons pour donner à la jupe un volume énorme et parfaitement arrondi, tout en la rendant plus légère. La taille, très resserrée par le corset, contraste avec l'ampleur de la coupole d'étoffe ornée de volants. Épaules dégagées, châle ou ombrelle : c'est la silhouette spectaculaire du Second Empire, celle des héroïnes du grand théâtre romantique et des drames bourgeois du milieu du siècle.",
    elements: ['Crinoline (armature)', 'Corset', 'Volants', 'Ombrelle'], personnages: 'Héroïnes du drame romantique' },
  { id: 'troubadour', nom: 'Costume troubadour', epoque: 'Romantique', pays: 'France', genre: 'Mixte', initiale: 'T', img: 'Hernani Act I - Sc. III. by Paris & Martin after Vierge.png',
    description: "Reconstitutions historicisantes, colorées et pittoresques, du drame romantique à la Hugo : velours, toques à plumes, pourpoints d'apparat.",
    detail: "Le drame romantique, épris de Moyen Âge et de Renaissance, invente un costume « troubadour » : une évocation pittoresque et colorée du passé, plus soucieuse d'atmosphère et de couleur locale que d'exactitude. Velours profonds, toques à plumes, pourpoints crevés, capes, bottes à revers et poignards composent des silhouettes d'apparat pour les héros exaltés de Hugo — Hernani, Ruy Blas, Lorenzaccio. Ce goût du costume historique spectaculaire marque tout le théâtre du XIXe siècle et prépare les grandes reconstitutions de la scène.",
    elements: ['Velours', 'Toque à plume', 'Pourpoint', 'Cape'], personnages: 'Hernani, Ruy Blas, Lorenzo' },

  // ─── Moderne (XXe) ───
  { id: 'trois-pieces', nom: 'Costume trois-pièces', epoque: 'Moderne', pays: 'International', genre: 'Homme', initiale: 'C', img: "Suit, three-piece, man's (AM 1970.37-1).jpg",
    description: "Veste, gilet et pantalon assortis : le costume moderne, tenue neutre du théâtre réaliste et contemporain.",
    detail: "Héritier de la redingote assagie, le costume trois-pièces — veste, gilet et pantalon taillés dans la même étoffe — s'impose au XXe siècle comme le vêtement universel de l'homme moderne, du bureau au salon. Sa neutralité même en fait un outil précieux au théâtre : il situe une classe sociale et une époque sans détourner l'attention, et sert de tenue de base au drame réaliste comme au répertoire contemporain. La coupe, la couleur et l'usure suffisent alors à dessiner le personnage.",
    elements: ['Veste', 'Gilet', 'Pantalon', 'Cravate'], personnages: 'Rôles contemporains' },
  { id: 'charleston', nom: 'Robe charleston', epoque: 'Moderne', pays: 'International', genre: 'Femme', initiale: 'C', img: 'Louise Brooks ggbain 32453u crop.jpg',
    description: "Robe droite à franges des Années folles, taille basse, coupe libérée du corset. L'élan des années 1920.",
    detail: "Symbole des Années folles, la robe « charleston » abandonne le corset et la taille marquée pour une ligne droite qui tombe des épaules à une taille basse posée sur les hanches. Courte pour l'époque (au genou), couverte de franges ou de perles qui frémissent à chaque pas de danse, elle s'accompagne d'un bandeau, d'un collier de perles à longs rangs et de la coupe « à la garçonne ». Ce costume dit une émancipation : celle de la femme des années 1920, mobile, dansante et affranchie des armatures du passé.",
    elements: ['Robe à franges', 'Bandeau', 'Collier de perles', 'Escarpins'], personnages: 'Héroïnes des années 1920' },
  { id: 'absurde', nom: "Costume du théâtre de l'absurde", epoque: 'Moderne', pays: 'International', genre: 'Mixte', initiale: 'A', img: "En attendant Godot, Festival d'Avignon, 1978.jpeg",
    description: "Dépouillement volontaire : chapeau melon, vêtements usés et intemporels, silhouettes de clowns tristes — l'univers de Beckett et Ionesco.",
    detail: "Le théâtre de l'absurde congédie le costume signifiant : chez Beckett ou Ionesco, les personnages portent des vêtements usés, dépareillés, intemporels, qui ne situent ni une époque ni une classe précise. Le chapeau melon, les godillots trop grands, les habits élimés évoquent le clown triste et le vagabond — une humanité réduite à l'essentiel, hors de l'histoire. Ce dénuement est un parti pris : en effaçant les repères, il expose la condition nue des êtres, comme les deux traîne-misère d'En attendant Godot.",
    elements: ['Chapeau melon', 'Vêtements usés', 'Chaussures trop grandes'], personnages: 'Vladimir et Estragon (Godot)' },

  // ─── Compléments ───
  { id: 'stola', nom: 'Stola romaine', epoque: 'Antiquité', pays: 'Rome', genre: 'Femme', initiale: 'S', img: 'Livia Drusila (15708884953).jpg',
    description: "Longue robe des matrones romaines, portée par-dessus la tunique et drapée d'une palla ; marque de la femme mariée et respectable.",
    detail: "La stola est le vêtement réservé à la matrone, la femme mariée de citoyen romain : une longue robe sans manches ou à manches courtes, portée par-dessus la tunique et suspendue aux épaules par des bretelles, qui tombe jusqu'aux pieds et se ceinture sous la poitrine. Pour sortir, la Romaine y drape la palla, grand manteau qu'elle peut ramener sur la tête en signe de pudeur. Costume de dignité et de statut, la stola habille au théâtre les matrones, les mères et les reines du monde romain.",
    elements: ['Stola', 'Palla (manteau)', 'Ceinture haute'], personnages: 'Matrones, reines romaines' },
  { id: 'armure-chevalier', nom: 'Armure de chevalier', epoque: 'Moyen Âge', pays: 'Europe', genre: 'Homme', initiale: 'A', img: 'Gothic Armor MET 158414.jpg',
    description: "Cotte de mailles puis armure de plates, heaume et surcot armorié : la panoplie du chevalier, entre guerre et tournoi.",
    detail: "La panoplie du chevalier évolue de la cotte de mailles — chemise de milliers d'anneaux rivés — à l'armure de plates articulée du XVe siècle, qui enveloppe le corps de pièces d'acier mobiles. Le heaume protège la tête, le surcot puis le tabard portent les armoiries qui identifient le combattant, et l'écu redouble ce blason. Lourde et éclatante, cette armure sert autant la guerre que le tournoi, spectacle chevaleresque par excellence. Sur scène, elle campe croisés, paladins et héros de légende.",
    elements: ['Cotte de mailles', 'Heaume', 'Surcot armorié', 'Épée'], personnages: 'Chevaliers, croisés' },
  { id: 'hennin', nom: 'Hennin & robe médiévale', epoque: 'Moyen Âge', pays: 'France', genre: 'Femme', initiale: 'H', img: 'Young Woman with a Pink MET DT200206.jpg',
    description: "Robe ajustée à traîne et haut hennin conique voilé : l'élégance aristocratique de la fin du Moyen Âge.",
    detail: "À la fin du Moyen Âge, la dame de haut rang porte une robe au corsage ajusté et à la taille très haute, d'où la jupe descend en plis lourds jusqu'à une longue traîne. La coiffure devient sculpture : le hennin, haut cône de tissu rigide voilé d'une mousseline flottante, dégage un front que la mode voulait épilé et bombé. Ceinture haute, encolure dégagée et étoffes précieuses achèvent une silhouette élancée et aristocratique, celle des cours de Bourgogne que la peinture flamande a immortalisée.",
    elements: ['Hennin conique', 'Voile', 'Robe à traîne', 'Ceinture haute'], personnages: 'Dames de cour médiévales' },
  { id: 'bouffon', nom: 'Costume de bouffon', epoque: 'Renaissance', pays: 'Europe', genre: 'Mixte', initiale: 'B', img: 'Heinrich Vogtherr d. J. Schalksnarr.JPG',
    description: "Habit bariolé à grelots, capuchon à oreilles d'âne et marotte : le fou du roi, libre de tout dire en riant.",
    detail: "Le fou de cour se reconnaît à son habit bicolore, parfois « mi-parti » (une moitié d'une couleur, l'autre d'une autre), semé de grelots qui tintent à chaque geste. Le capuchon à longues oreilles — d'âne ou de coq — coiffe la tête, et la marotte, sceptre dérisoire surmonté d'une petite tête de fou, parodie les insignes du pouvoir. Sous ce déguisement de dérision, le bouffon jouit d'une liberté unique : celle de dire au roi ce que nul autre n'oserait. C'est le costume de Triboulet et des fous shakespeariens.",
    elements: ['Habit bicolore', 'Capuchon à grelots', 'Marotte', 'Grelots'], personnages: 'Fous du roi, Triboulet' },
  { id: 'precieuse', nom: 'Toilette de précieuse', epoque: 'Grand Siècle', pays: 'France', genre: 'Femme', initiale: 'P', img: 'School of Gobert - Anne Louise Bénédicte de Bourbon-Condé.png',
    description: "Soies, rubans et falbalas de la précieuse de salon, coiffée « à la Fontanges » ; l'apprêt raffiné que raille Molière.",
    detail: "La précieuse pousse l'apprêt jusqu'à la caricature : robe chargée de falbalas (volants froncés), rubans multipliés, dentelles, éventail et « mouches » — ces petits points noirs collés sur le visage dont l'emplacement avait tout un langage. Au sommet, la coiffure « à la Fontanges » dresse un édifice de dentelle empesée. Cette recherche à outrance du raffinement, dans la toilette comme dans le langage, est précisément ce que Molière tourne en ridicule dans Les Précieuses ridicules, avec Cathos et Madelon.",
    elements: ['Robe à falbalas', 'Coiffure Fontanges', 'Mouches', 'Éventail'], personnages: 'Les Précieuses, Cathos et Madelon' },
  { id: 'sans-culotte', nom: 'Costume de sans-culotte', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'S', img: 'Sans-culotte.jpg',
    description: "Pantalon rayé (par opposition à la culotte des nobles), carmagnole et bonnet phrygien : la silhouette du révolutionnaire de 1789.",
    detail: "Le costume devient étendard sous la Révolution. Le sans-culotte tire son nom même de son vêtement : il porte le pantalon long — vêtement du peuple et des travailleurs — et non la culotte serrée au genou, marque des aristocrates. La carmagnole, courte veste à revers, le bonnet phrygien rouge (bonnet de la liberté), la cocarde tricolore et les sabots composent la panoplie du patriote de 1789. Au théâtre, cette silhouette dit d'emblée le peuple en armes et le drame révolutionnaire.",
    elements: ['Pantalon rayé', 'Carmagnole', 'Bonnet phrygien', 'Cocarde'], personnages: 'Révolutionnaires, drames historiques' },
  { id: 'dandy', nom: 'Habit de dandy', epoque: 'Romantique', pays: 'Angleterre / France', genre: 'Homme', initiale: 'D', img: 'Dandies of 1831.jpg',
    description: "Redingote ajustée, gilet cintré, cravate savamment nouée et haut-de-forme : l'élégance étudiée du dandy romantique.",
    detail: "Le dandy fait de sa mise un art de vivre. Sur le modèle du légendaire Brummell, il proscrit l'ostentation au profit d'une élégance sobre mais impeccable : redingote parfaitement coupée et cintrée, gilet ajusté, pantalon tendu par un sous-pied, bottes miroitantes et surtout la cravate, nouée avec un soin quasi religieux. Le haut-de-forme et la canne complètent une silhouette d'une correction absolue. Cette perfection étudiée, cette distinction froide, font du dandy une figure des élégants du théâtre et du roman romantiques.",
    elements: ['Redingote cintrée', 'Gilet', 'Cravate', 'Haut-de-forme', 'Canne'], personnages: 'Élégants du drame romantique' },
  { id: 'total-noir', nom: 'Costume contemporain épuré', epoque: 'Moderne', pays: 'International', genre: 'Mixte', initiale: 'É',
    description: "Vêtement neutre et intemporel, souvent noir : le parti pris du théâtre contemporain qui efface l'époque pour révéler le corps et le texte.",
    detail: "Une part du théâtre contemporain refuse le costume historique ou psychologique pour un vêtement volontairement neutre — souvent noir, sans marqueur d'époque ni de classe. Ce dépouillement, hérité des recherches de la scène moderne (Copeau, Brook, le théâtre chorégraphique), vise à effacer l'anecdote pour faire ressortir le corps de l'acteur, le mouvement du groupe et la matière même du texte. Le costume devient support neutre : moins il raconte, plus il laisse voir le jeu et la parole.",
    elements: ['Vêtement neutre', 'Noir', 'Sans marqueur d\'époque'], personnages: 'Rôles contemporains' },
];
