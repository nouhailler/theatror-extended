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
  { id: 'chiton', nom: 'Chiton grec', epoque: 'Antiquité', pays: 'Grèce', genre: 'Mixte', initiale: 'C',
    description: "Tunique de lin ou de laine agrafée aux épaules et serrée à la taille, drapée en plis souples. Vêtement de base du théâtre grec antique.",
    elements: ['Tunique drapée', 'Fibules (agrafes)', 'Ceinture'], personnages: 'Chœur, héros grecs' },
  { id: 'peplos', nom: 'Péplos', epoque: 'Antiquité', pays: 'Grèce', genre: 'Femme', initiale: 'P',
    description: "Longue étoffe de laine pliée et épinglée aux épaules, laissant les côtés ouverts. Le vêtement féminin par excellence de la Grèce archaïque.",
    elements: ['Étoffe pliée', 'Épingles', 'Voile'], personnages: 'Antigone, Électre' },
  { id: 'toge', nom: 'Toge romaine', epoque: 'Antiquité', pays: 'Rome', genre: 'Homme', initiale: 'T',
    description: "Vaste drapé de laine blanche enroulé autour du corps, réservé aux citoyens romains. Symbole de dignité et de statut.",
    elements: ['Drapé de laine', 'Tunique dessous', 'Sandales'], personnages: 'Sénateurs, César' },
  { id: 'cothurnes', nom: 'Cothurnes et masque', epoque: 'Antiquité', pays: 'Grèce', genre: 'Mixte', initiale: 'C',
    description: "Brodequins à semelle épaisse qui grandissent l'acteur tragique, associés au grand masque expressif et au chœur. La silhouette monumentale de la tragédie.",
    elements: ['Cothurnes (semelles hautes)', 'Masque tragique', 'Onkos (coiffe)'], personnages: 'Tragédiens' },

  // ─── Moyen Âge ───
  { id: 'bliaud', nom: 'Bliaud', epoque: 'Moyen Âge', pays: 'France', genre: 'Femme', initiale: 'B',
    description: "Longue robe ajustée au buste et évasée, aux manches amples, portée par les dames du XIIe siècle. Élégance de la cour féodale.",
    elements: ['Robe ajustée', 'Manches pendantes', 'Ceinture basse'], personnages: 'Dames, reines médiévales' },
  { id: 'houppelande', nom: 'Houppelande', epoque: 'Moyen Âge', pays: 'France', genre: 'Homme', initiale: 'H',
    description: "Ample robe longue à larges manches, souvent doublée de fourrure, marque de richesse à la fin du Moyen Âge.",
    elements: ['Robe ample', 'Larges manches', 'Ceinture', 'Fourrure'], personnages: 'Bourgeois, seigneurs' },
  { id: 'mysteres-medievaux', nom: 'Costumes de mystères', epoque: 'Moyen Âge', pays: 'France', genre: 'Mixte', initiale: 'M',
    description: "Sur les parvis, anges aux ailes dorées et diables cornus et velus jouaient la Passion. Théâtre religieux haut en couleur et en symboles.",
    elements: ['Ailes dorées', 'Masques de diable', 'Cornes et queue', 'Robes de saints'], personnages: 'Anges, diables, saints' },

  // ─── Renaissance ───
  { id: 'pourpoint', nom: 'Pourpoint et haut-de-chausses', epoque: 'Renaissance', pays: 'France', genre: 'Homme', initiale: 'P',
    description: "Veste ajustée et rembourrée (pourpoint) sur des chausses bouffantes, complétée d'une fraise. La silhouette masculine du XVIe siècle.",
    elements: ['Pourpoint rembourré', 'Haut-de-chausses', 'Fraise', 'Chausses'], personnages: 'Gentilshommes' },
  { id: 'vertugadin', nom: 'Robe à vertugadin', epoque: 'Renaissance', pays: 'Espagne', genre: 'Femme', initiale: 'V',
    description: "Robe montée sur un bourrelet ou des cerceaux (vertugadin) qui élargit les hanches, buste rigide et col de dentelle. Faste des cours de la Renaissance.",
    elements: ['Vertugadin (cerceaux)', 'Corps baleiné', 'Col en dentelle', 'Manches à crevés'], personnages: 'Reines, infantes' },
  { id: 'commedia', nom: "Costumes de la commedia dell'arte", epoque: 'Renaissance', pays: 'Italie', genre: 'Mixte', initiale: 'A',
    description: "Types immédiatement reconnaissables : Arlequin et son habit de losanges colorés, Pantalon en rouge et noir, le Docteur tout de noir vêtu. Masques et couleurs codifiés.",
    elements: ['Habit à losanges (Arlequin)', 'Masques de cuir', 'Batte', 'Collants'], personnages: 'Arlequin, Pantalon, Colombine' },

  // ─── Grand Siècle (XVIIe) ───
  { id: 'habit-francaise-17', nom: 'Habit de cour Louis XIV', epoque: 'Grand Siècle', pays: 'France', genre: 'Homme', initiale: 'H',
    description: "Justaucorps brodé, rhingrave à rubans, bas de soie, perruque et talons rouges : le luxe ostentatoire de la cour de Versailles.",
    elements: ['Justaucorps brodé', 'Jabot de dentelle', 'Perruque', 'Talons rouges'], personnages: 'Courtisans, Dom Juan' },
  { id: 'robe-cour-17', nom: 'Robe de cour', epoque: 'Grand Siècle', pays: 'France', genre: 'Femme', initiale: 'R',
    description: "Corps très serré, jupe ouverte sur un jupon brodé, dentelles et rubans. L'élégance grave et fastueuse du siècle de Louis XIV.",
    elements: ['Corps baleiné', 'Jupon brodé', 'Dentelles', 'Coiffure Fontanges'], personnages: 'Célimène, dames de cour' },
  { id: 'romaine-tragedie', nom: 'Costume « à la romaine »', epoque: 'Grand Siècle', pays: 'France', genre: 'Homme', initiale: 'R',
    description: "Convention de la tragédie classique : casque à plumes, cuirasse et tonnelet (jupe rigide plissée) par-dessus des bas, quelle que soit l'époque du sujet.",
    elements: ['Casque à plumes', 'Cuirasse', 'Tonnelet', 'Bas de soie'], personnages: 'Héros de tragédie (Racine, Corneille)' },

  // ─── Lumières (XVIIIe) ───
  { id: 'robe-paniers', nom: 'Robe à paniers', epoque: 'Lumières', pays: 'France', genre: 'Femme', initiale: 'R',
    description: "Jupe élargie latéralement par des paniers, taille fine, étoffes de soie fleurie. Le raffinement galant du XVIIIe siècle.",
    elements: ['Paniers latéraux', 'Corps à baleines', 'Fichu', 'Soie fleurie'], personnages: 'Marquises, Suzanne, Rosine' },
  { id: 'habit-brode-18', nom: 'Habit et gilet brodé', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'H',
    description: "Habit à la française, gilet brodé, culotte serrée au genou, bas et souliers à boucle. L'élégance masculine des salons du siècle des Lumières.",
    elements: ['Habit à la française', 'Gilet brodé', 'Culotte', 'Souliers à boucle'], personnages: 'Le Comte Almaviva, marquis' },
  { id: 'costume-valet-18', nom: 'Livrée de valet', epoque: 'Lumières', pays: 'France', genre: 'Homme', initiale: 'L',
    description: "Habit de couleur vive, parfois galonné, du valet de comédie — vif et malicieux comme Figaro ou Scapin.",
    elements: ['Livrée galonnée', 'Gilet', 'Bas', 'Chapeau'], personnages: 'Figaro, Scapin, Arlequin' },

  // ─── Romantique (XIXe) ───
  { id: 'redingote', nom: 'Redingote et haut-de-forme', epoque: 'Romantique', pays: 'France', genre: 'Homme', initiale: 'R',
    description: "Longue veste ajustée, gilet, pantalon et haut-de-forme : la silhouette du gentleman du XIXe siècle, du drame bourgeois au vaudeville.",
    elements: ['Redingote', 'Gilet', 'Haut-de-forme', 'Canne'], personnages: 'Bourgeois de Feydeau, Labiche' },
  { id: 'crinoline', nom: 'Robe à crinoline', epoque: 'Romantique', pays: 'France', genre: 'Femme', initiale: 'C',
    description: "Ample jupe portée sur une armature de crinoline, taille resserrée par le corset. Le volume spectaculaire du Second Empire.",
    elements: ['Crinoline (armature)', 'Corset', 'Volants', 'Ombrelle'], personnages: 'Héroïnes du drame romantique' },
  { id: 'troubadour', nom: 'Costume troubadour', epoque: 'Romantique', pays: 'France', genre: 'Mixte', initiale: 'T',
    description: "Reconstitutions historicisantes, colorées et pittoresques, du drame romantique à la Hugo : velours, toques à plumes, pourpoints d'apparat.",
    elements: ['Velours', 'Toque à plume', 'Pourpoint', 'Cape'], personnages: 'Hernani, Ruy Blas, Lorenzo' },

  // ─── Moderne (XXe) ───
  { id: 'trois-pieces', nom: 'Costume trois-pièces', epoque: 'Moderne', pays: 'International', genre: 'Homme', initiale: 'C',
    description: "Veste, gilet et pantalon assortis : le costume moderne, tenue neutre du théâtre réaliste et contemporain.",
    elements: ['Veste', 'Gilet', 'Pantalon', 'Cravate'], personnages: 'Rôles contemporains' },
  { id: 'charleston', nom: 'Robe charleston', epoque: 'Moderne', pays: 'International', genre: 'Femme', initiale: 'C',
    description: "Robe droite à franges des Années folles, taille basse, coupe libérée du corset. L'élan des années 1920.",
    elements: ['Robe à franges', 'Bandeau', 'Collier de perles', 'Escarpins'], personnages: 'Héroïnes des années 1920' },
  { id: 'absurde', nom: "Costume du théâtre de l'absurde", epoque: 'Moderne', pays: 'International', genre: 'Mixte', initiale: 'A',
    description: "Dépouillement volontaire : chapeau melon, vêtements usés et intemporels, silhouettes de clowns tristes — l'univers de Beckett et Ionesco.",
    elements: ['Chapeau melon', 'Vêtements usés', 'Chaussures trop grandes'], personnages: 'Vladimir et Estragon (Godot)' },
];
