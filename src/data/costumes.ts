// Costumes — priorité 17. Galerie historique (sans image : vignette colorée
// par époque + description riche, recherche par époque/pays/style/personnage).

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
    elements: ['Tunique drapée', 'Fibules (agrafes)', 'Ceinture'], personnages: 'Chœur, héros grecs' },
  { id: 'peplos', nom: 'Péplos', epoque: 'Antiquité', pays: 'Grèce', genre: 'Femme', initiale: 'P', img: 'Acropole Musée Athéna pensante.JPG',
    description: "Longue étoffe de laine pliée et épinglée aux épaules, laissant les côtés ouverts. Le vêtement féminin par excellence de la Grèce archaïque.",
    elements: ['Étoffe pliée', 'Épingles', 'Voile'], personnages: 'Antigone, Électre' },
  { id: 'toge', nom: 'Toge romaine', epoque: 'Antiquité', pays: 'Rome', genre: 'Homme', initiale: 'T', img: 'Tiberius Capri Louvre Ma1248.jpg',
    description: "Vaste drapé de laine blanche enroulé autour du corps, réservé aux citoyens romains. Symbole de dignité et de statut.",
    elements: ['Drapé de laine', 'Tunique dessous', 'Sandales'], personnages: 'Sénateurs, César' },
  { id: 'cothurnes', nom: 'Cothurnes et masque', epoque: 'Antiquité', pays: 'Grèce', genre: 'Mixte', initiale: 'C', img: 'Buskin (PSF).jpg',
    description: "Brodequins à semelle épaisse qui grandissent l'acteur tragique, associés au grand masque expressif et au chœur. La silhouette monumentale de la tragédie.",
    elements: ['Cothurnes (semelles hautes)', 'Masque tragique', 'Onkos (coiffe)'], personnages: 'Tragédiens' },

  // ─── Moyen Âge ───
  { id: 'bliaud', nom: 'Bliaud', epoque: 'Moyen Âge', pays: 'France', genre: 'Femme', initiale: 'B', img: 'Charles Nègre, André Jammes, Planche XIII – Cathédrale de Chartres, Statues Colonnes de la Porte Centrale du Portail Royal, 1855, NGA 210763.jpg',
    description: "Longue robe ajustée au buste et évasée, aux manches amples, portée par les dames du XIIe siècle. Élégance de la cour féodale.",
    elements: ['Robe ajustée', 'Manches pendantes', 'Ceinture basse'], personnages: 'Dames, reines médiévales' },
  { id: 'houppelande', nom: 'Houppelande', epoque: 'Moyen Âge', pays: 'France', genre: 'Homme', initiale: 'H', img: '15th century costume - the Houppelande.jpg',
    description: "Ample robe longue à larges manches, souvent doublée de fourrure, marque de richesse à la fin du Moyen Âge.",
    elements: ['Robe ample', 'Larges manches', 'Ceinture', 'Fourrure'], personnages: 'Bourgeois, seigneurs' },
  { id: 'mysteres-medievaux', nom: 'Costumes de mystères', epoque: 'Moyen Âge', pays: 'France', genre: 'Mixte', initiale: 'M', img: 'Mystery Play Metz.jpg',
    description: "Sur les parvis, anges aux ailes dorées et diables cornus et velus jouaient la Passion. Théâtre religieux haut en couleur et en symboles.",
    elements: ['Ailes dorées', 'Masques de diable', 'Cornes et queue', 'Robes de saints'], personnages: 'Anges, diables, saints' },

  // ─── Renaissance ───
  { id: 'pourpoint', nom: 'Pourpoint et haut-de-chausses', epoque: 'Renaissance', pays: 'France', genre: 'Homme', initiale: 'P', img: 'Italian pourpoint.jpg',
    description: "Veste ajustée et rembourrée (pourpoint) sur des chausses bouffantes, complétée d'une fraise. La silhouette masculine du XVIe siècle.",
    elements: ['Pourpoint rembourré', 'Haut-de-chausses', 'Fraise', 'Chausses'], personnages: 'Gentilshommes' },
  { id: 'vertugadin', nom: 'Robe à vertugadin', epoque: 'Renaissance', pays: 'Espagne', genre: 'Femme', initiale: 'V', img: 'Pedro García de Benabarre St John Retable Detail.jpg',
    description: "Robe montée sur un bourrelet ou des cerceaux (vertugadin) qui élargit les hanches, buste rigide et col de dentelle. Faste des cours de la Renaissance.",
    elements: ['Vertugadin (cerceaux)', 'Corps baleiné', 'Col en dentelle', 'Manches à crevés'], personnages: 'Reines, infantes' },
  { id: 'commedia', nom: "Costumes de la commedia dell'arte", epoque: 'Renaissance', pays: 'Italie', genre: 'Mixte', initiale: 'A', img: 'SAND Maurice Masques et bouffons 01.jpg',
    description: "Types immédiatement reconnaissables : Arlequin et son habit de losanges colorés, Pantalon en rouge et noir, le Docteur tout de noir vêtu. Masques et couleurs codifiés.",
    elements: ['Habit à losanges (Arlequin)', 'Masques de cuir', 'Batte', 'Collants'], personnages: 'Arlequin, Pantalon, Colombine' },

  // ─── Grand Siècle (XVIIe) ───
  { id: 'habit-francaise-17', nom: 'Habit de cour Louis XIV', epoque: 'Grand Siècle', pays: 'France', genre: 'Homme', initiale: 'H', img: 'Voet-duque de medinacelli-prado.jpg',
    description: "Justaucorps brodé, rhingrave à rubans, bas de soie, perruque et talons rouges : le luxe ostentatoire de la cour de Versailles.",
    elements: ['Justaucorps brodé', 'Jabot de dentelle', 'Perruque', 'Talons rouges'], personnages: 'Courtisans, Dom Juan' },
  { id: 'robe-cour-17', nom: 'Robe de cour', epoque: 'Grand Siècle', pays: 'France', genre: 'Femme', initiale: 'R', img: 'Mantua MET DT6543.jpg',
    description: "Corps très serré, jupe ouverte sur un jupon brodé, dentelles et rubans. L'élégance grave et fastueuse du siècle de Louis XIV.",
    elements: ['Corps baleiné', 'Jupon brodé', 'Dentelles', 'Coiffure Fontanges'], personnages: 'Célimène, dames de cour' },
  { id: 'romaine-tragedie', nom: 'Costume « à la romaine »', epoque: 'Grand Siècle', pays: 'France', genre: 'Homme', initiale: 'R', img: 'François-Joseph Talma (1763-1826), by Aimée Perlet.jpg',
    description: "Convention de la tragédie classique : casque à plumes, cuirasse et tonnelet (jupe rigide plissée) par-dessus des bas, quelle que soit l'époque du sujet.",
    elements: ['Casque à plumes', 'Cuirasse', 'Tonnelet', 'Bas de soie'], personnages: 'Héros de tragédie (Racine, Corneille)' },

  // ─── Lumières (XVIIIe) ───
  { id: 'robe-paniers', nom: 'Robe à paniers', epoque: 'Lumières', pays: 'France', genre: 'Femme', initiale: 'R', img: 'Robe à la Française - MET C.I.61.34a, b.jpg',
    description: "Jupe élargie latéralement par des paniers, taille fine, étoffes de soie fleurie. Le raffinement galant du XVIIIe siècle.",
    elements: ['Paniers latéraux', 'Corps à baleines', 'Fichu', 'Soie fleurie'], personnages: 'Marquises, Suzanne, Rosine' },
  { id: 'habit-brode-18', nom: 'Habit et gilet brodé', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'H', img: 'Costumes historiques Costume Louis XVI (1774), N°82, G.12342(1).jpg',
    description: "Habit à la française, gilet brodé, culotte serrée au genou, bas et souliers à boucle. L'élégance masculine des salons du siècle des Lumières.",
    elements: ['Habit à la française', 'Gilet brodé', 'Culotte', 'Souliers à boucle'], personnages: 'Le Comte Almaviva, marquis' },
  { id: 'costume-valet-18', nom: 'Livrée de valet', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'L', img: 'Ramberg figaro 1.jpg',
    description: "Habit de couleur vive, parfois galonné, du valet de comédie — vif et malicieux comme Figaro ou Scapin.",
    elements: ['Livrée galonnée', 'Gilet', 'Bas', 'Chapeau'], personnages: 'Figaro, Scapin, Arlequin' },

  // ─── Romantique (XIXe) ───
  { id: 'redingote', nom: 'Redingote et haut-de-forme', epoque: 'Romantique', pays: 'France', genre: 'Homme', initiale: 'R', img: 'Frock Coat April 1904.jpg',
    description: "Longue veste ajustée, gilet, pantalon et haut-de-forme : la silhouette du gentleman du XIXe siècle, du drame bourgeois au vaudeville.",
    elements: ['Redingote', 'Gilet', 'Haut-de-forme', 'Canne'], personnages: 'Bourgeois de Feydeau, Labiche' },
  { id: 'crinoline', nom: 'Robe à crinoline', epoque: 'Romantique', pays: 'France', genre: 'Femme', initiale: 'C', img: 'Princess Dagmar of Denmark with her dog.jpg',
    description: "Ample jupe portée sur une armature de crinoline, taille resserrée par le corset. Le volume spectaculaire du Second Empire.",
    elements: ['Crinoline (armature)', 'Corset', 'Volants', 'Ombrelle'], personnages: 'Héroïnes du drame romantique' },
  { id: 'troubadour', nom: 'Costume troubadour', epoque: 'Romantique', pays: 'France', genre: 'Mixte', initiale: 'T', img: 'Hernani Act I - Sc. III. by Paris & Martin after Vierge.png',
    description: "Reconstitutions historicisantes, colorées et pittoresques, du drame romantique à la Hugo : velours, toques à plumes, pourpoints d'apparat.",
    elements: ['Velours', 'Toque à plume', 'Pourpoint', 'Cape'], personnages: 'Hernani, Ruy Blas, Lorenzo' },

  // ─── Moderne (XXe) ───
  { id: 'trois-pieces', nom: 'Costume trois-pièces', epoque: 'Moderne', pays: 'International', genre: 'Homme', initiale: 'C', img: "Suit, three-piece, man's (AM 1970.37-1).jpg",
    description: "Veste, gilet et pantalon assortis : le costume moderne, tenue neutre du théâtre réaliste et contemporain.",
    elements: ['Veste', 'Gilet', 'Pantalon', 'Cravate'], personnages: 'Rôles contemporains' },
  { id: 'charleston', nom: 'Robe charleston', epoque: 'Moderne', pays: 'International', genre: 'Femme', initiale: 'C', img: 'Louise Brooks ggbain 32453u crop.jpg',
    description: "Robe droite à franges des Années folles, taille basse, coupe libérée du corset. L'élan des années 1920.",
    elements: ['Robe à franges', 'Bandeau', 'Collier de perles', 'Escarpins'], personnages: 'Héroïnes des années 1920' },
  { id: 'absurde', nom: "Costume du théâtre de l'absurde", epoque: 'Moderne', pays: 'International', genre: 'Mixte', initiale: 'A', img: "En attendant Godot, Festival d'Avignon, 1978.jpeg",
    description: "Dépouillement volontaire : chapeau melon, vêtements usés et intemporels, silhouettes de clowns tristes — l'univers de Beckett et Ionesco.",
    elements: ['Chapeau melon', 'Vêtements usés', 'Chaussures trop grandes'], personnages: 'Vladimir et Estragon (Godot)' },

  // ─── Compléments ───
  { id: 'stola', nom: 'Stola romaine', epoque: 'Antiquité', pays: 'Rome', genre: 'Femme', initiale: 'S', img: 'Livia Drusila (15708884953).jpg',
    description: "Longue robe des matrones romaines, portée par-dessus la tunique et drapée d'une palla ; marque de la femme mariée et respectable.",
    elements: ['Stola', 'Palla (manteau)', 'Ceinture haute'], personnages: 'Matrones, reines romaines' },
  { id: 'armure-chevalier', nom: 'Armure de chevalier', epoque: 'Moyen Âge', pays: 'Europe', genre: 'Homme', initiale: 'A', img: 'Gothic Armor MET 158414.jpg',
    description: "Cotte de mailles puis armure de plates, heaume et surcot armorié : la panoplie du chevalier, entre guerre et tournoi.",
    elements: ['Cotte de mailles', 'Heaume', 'Surcot armorié', 'Épée'], personnages: 'Chevaliers, croisés' },
  { id: 'hennin', nom: 'Hennin & robe médiévale', epoque: 'Moyen Âge', pays: 'France', genre: 'Femme', initiale: 'H', img: 'Young Woman with a Pink MET DT200206.jpg',
    description: "Robe ajustée à traîne et haut hennin conique voilé : l'élégance aristocratique de la fin du Moyen Âge.",
    elements: ['Hennin conique', 'Voile', 'Robe à traîne', 'Ceinture haute'], personnages: 'Dames de cour médiévales' },
  { id: 'bouffon', nom: 'Costume de bouffon', epoque: 'Renaissance', pays: 'Europe', genre: 'Mixte', initiale: 'B', img: 'Heinrich Vogtherr d. J. Schalksnarr.JPG',
    description: "Habit bariolé à grelots, capuchon à oreilles d'âne et marotte : le fou du roi, libre de tout dire en riant.",
    elements: ['Habit bicolore', 'Capuchon à grelots', 'Marotte', 'Grelots'], personnages: 'Fous du roi, Triboulet' },
  { id: 'precieuse', nom: 'Toilette de précieuse', epoque: 'Grand Siècle', pays: 'France', genre: 'Femme', initiale: 'P', img: 'School of Gobert - Anne Louise Bénédicte de Bourbon-Condé.png',
    description: "Soies, rubans et falbalas de la précieuse de salon, coiffée « à la Fontanges » ; l'apprêt raffiné que raille Molière.",
    elements: ['Robe à falbalas', 'Coiffure Fontanges', 'Mouches', 'Éventail'], personnages: 'Les Précieuses, Cathos et Madelon' },
  { id: 'sans-culotte', nom: 'Costume de sans-culotte', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'S', img: 'Sans-culotte.jpg',
    description: "Pantalon rayé (par opposition à la culotte des nobles), carmagnole et bonnet phrygien : la silhouette du révolutionnaire de 1789.",
    elements: ['Pantalon rayé', 'Carmagnole', 'Bonnet phrygien', 'Cocarde'], personnages: 'Révolutionnaires, drames historiques' },
  { id: 'dandy', nom: 'Habit de dandy', epoque: 'Romantique', pays: 'Angleterre / France', genre: 'Homme', initiale: 'D', img: 'Dandies of 1831.jpg',
    description: "Redingote ajustée, gilet cintré, cravate savamment nouée et haut-de-forme : l'élégance étudiée du dandy romantique.",
    elements: ['Redingote cintrée', 'Gilet', 'Cravate', 'Haut-de-forme', 'Canne'], personnages: 'Élégants du drame romantique' },
  { id: 'total-noir', nom: 'Costume contemporain épuré', epoque: 'Moderne', pays: 'International', genre: 'Mixte', initiale: 'É',
    description: "Vêtement neutre et intemporel, souvent noir : le parti pris du théâtre contemporain qui efface l'époque pour révéler le corps et le texte.",
    elements: ['Vêtement neutre', 'Noir', 'Sans marqueur d\'époque'], personnages: 'Rôles contemporains' },
];
