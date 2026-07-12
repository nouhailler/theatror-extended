// Décors — priorité 18. Bibliothèque de décors de théâtre. Reprend les 8 décors
// de la Mise en scène (prio 16) enrichis + 14 nouveaux. La vignette EST le dégradé
// du décor (aperçu), pas d'image externe (offline/CSP).

export type DecorCategorie =
  | 'Antique' | 'Palais & cour' | 'Ville & rue' | 'Nature'
  | 'Intérieur' | 'Populaire' | 'Symbolique';

export interface Decor {
  id: string;
  nom: string;
  categorie: DecorCategorie;
  initiale: string;
  bg: string; // dégradé servant d'aperçu
  description: string;
  elements: string[];
  pieces?: string; // pièces / usages typiques
}

export const DECOR_COULEUR: Record<DecorCategorie, string> = {
  'Antique': '#c98b4e',
  'Palais & cour': '#d4a94e',
  'Ville & rue': '#5f8ea8',
  'Nature': '#8e9e5a',
  'Intérieur': '#a85a72',
  'Populaire': '#b0563a',
  'Symbolique': '#7a6fae',
};

export const DECORS: Decor[] = [
  // ─── Repris de la Mise en scène (enrichis) ───
  { id: 'theatre-grec', nom: 'Théâtre grec', categorie: 'Antique', initiale: 'G', bg: 'radial-gradient(circle at 50% 30%, #6b5d47, #3d3527)',
    description: "Le skéné (mur de scène) et l'orchestra circulaire où évolue le chœur, au pied des gradins de pierre. Cadre de la tragédie antique.",
    elements: ['Skéné', 'Orchestra', 'Colonnes', 'Autel'], pieces: 'Antigone, Œdipe roi, Les Grenouilles' },
  { id: 'palais', nom: 'Palais', categorie: 'Palais & cour', initiale: 'P', bg: 'linear-gradient(160deg, #4a1f28, #2a1018)',
    description: "Vaste salle d'apparat aux colonnes de marbre, tentures et trône. Théâtre du pouvoir, des intrigues de cour et des tragédies royales.",
    elements: ['Colonnes de marbre', 'Trône', 'Tentures', 'Dorures'], pieces: 'Britannicus, Bérénice, Ruy Blas' },
  { id: 'rue', nom: 'Rue', categorie: 'Ville & rue', initiale: 'R', bg: 'linear-gradient(160deg, #3a3d42, #26282c)',
    description: "Une rue ou un carrefour urbain, façades et portes de maisons — décor traditionnel de la comédie d'intrigue.",
    elements: ['Façades', 'Portes', 'Pavés', 'Enseigne'], pieces: 'Le Barbier de Séville, comédies de Molière' },
  { id: 'foret', nom: 'Forêt', categorie: 'Nature', initiale: 'F', bg: 'linear-gradient(160deg, #26402a, #16261a)',
    description: "Bois profond et mystérieux, lieu des rencontres, des sortilèges et des égarements amoureux ou merveilleux.",
    elements: ['Arbres', 'Feuillage', 'Clairière', 'Brume'], pieces: "Le Songe d'une nuit d'été" },
  { id: 'interieur-bourgeois', nom: 'Intérieur bourgeois', categorie: 'Intérieur', initiale: 'B', bg: 'linear-gradient(160deg, #4a3826, #2c2015)',
    description: "Un salon cossu, meubles, cheminée et portes multiples pour les entrées et sorties : le décor par excellence de la comédie de mœurs et du vaudeville.",
    elements: ['Salon', 'Cheminée', 'Portes multiples', 'Fauteuils'], pieces: 'Tartuffe, Le Malade imaginaire, Feydeau' },
  { id: 'taverne', nom: 'Taverne', categorie: 'Populaire', initiale: 'T', bg: 'linear-gradient(160deg, #3d2c1a, #241810)',
    description: "Salle enfumée aux tables de bois, tonneaux et pichets. Lieu populaire des rencontres, disputes et beuveries.",
    elements: ['Tables de bois', 'Tonneaux', 'Comptoir', 'Cheminée'], pieces: 'Scènes populaires, farces' },
  { id: 'jardin', nom: 'Jardin', categorie: 'Nature', initiale: 'J', bg: 'linear-gradient(160deg, #2f4a33, #1c3021)',
    description: "Jardin à la française ou bosquet, allées, statues et bancs — décor galant des marivaudages et des scènes de rendez-vous.",
    elements: ['Allées', 'Bosquets', 'Statues', 'Banc'], pieces: "Le Mariage de Figaro, Le Jeu de l'amour et du hasard" },
  { id: 'bord-mer', nom: 'Bord de mer', categorie: 'Nature', initiale: 'M', bg: 'linear-gradient(160deg, #23485c, #142d3c)',
    description: "Rivage, port ou falaise ouverts sur l'horizon marin — décor des départs, des naufrages et des retrouvailles.",
    elements: ['Rivage', 'Barque', 'Horizon', 'Rochers'], pieces: "La Mouette, drames romantiques" },

  // ─── Nouveaux décors ───
  { id: 'agora', nom: 'Agora / Forum', categorie: 'Antique', initiale: 'A', bg: 'radial-gradient(circle at 50% 35%, #7a6a4c, #3a3222)',
    description: "Place publique de la cité antique, entourée de portiques, où se nouent débats politiques et destinées collectives.",
    elements: ['Portiques', 'Statues', 'Tribune', 'Marches'], pieces: 'Jules César, tragédies romaines' },
  { id: 'enfers', nom: 'Enfers', categorie: 'Antique', initiale: 'E', bg: 'radial-gradient(circle at 50% 60%, #3a1a2a, #0f0810)',
    description: "Royaume des morts, brumes et fleuve des ombres. Décor du merveilleux mythologique et des descentes aux Enfers.",
    elements: ['Fleuve (Styx)', 'Brumes', 'Ombres', 'Roche noire'], pieces: 'Les Grenouilles, Orphée' },
  { id: 'place-publique', nom: 'Place publique', categorie: 'Ville & rue', initiale: 'P', bg: 'linear-gradient(160deg, #45474d, #2a2c30)',
    description: "Grande place de ville, marché ou parvis où se rassemble la foule — théâtre des scènes collectives et des émeutes.",
    elements: ['Fontaine', 'Étals', 'Foule', 'Balcon'], pieces: 'Roméo et Juliette, Lorenzaccio' },
  { id: 'cour-auberge', nom: "Cour d'auberge", categorie: 'Ville & rue', initiale: 'A', bg: 'linear-gradient(160deg, #443421, #281d12)',
    description: "Cour intérieure d'auberge, galeries de bois et va-et-vient de voyageurs — décor animé des comédies d'intrigue.",
    elements: ['Galeries de bois', 'Escalier', 'Puits', 'Chariot'], pieces: 'Comédies, farces de voyage' },
  { id: 'cimetiere', nom: 'Cimetière', categorie: 'Ville & rue', initiale: 'C', bg: 'linear-gradient(160deg, #2c3038, #16181d)',
    description: "Tombes, cyprès et clair de lune : décor des veillées funèbres, des apparitions et des méditations sur la mort.",
    elements: ['Tombes', 'Croix', 'Cyprès', 'Clair de lune'], pieces: 'Hamlet (scène du fossoyeur), Dom Juan' },
  { id: 'chambre', nom: 'Chambre / Alcôve', categorie: 'Intérieur', initiale: 'C', bg: 'linear-gradient(160deg, #4a2f3a, #291923)',
    description: "Espace intime du lit et de l'alcôve, propice aux confidences, aux quiproquos et aux scènes de nuit.",
    elements: ['Lit à baldaquin', 'Paravent', 'Bougeoir', 'Miroir'], pieces: 'Une maison de poupée, comédies d\'alcôve' },
  { id: 'prison', nom: 'Prison / Cachot', categorie: 'Intérieur', initiale: 'P', bg: 'linear-gradient(160deg, #33363b, #17181b)',
    description: "Voûte sombre, barreaux et chaînes — décor de l'enfermement, du désespoir et des adieux tragiques.",
    elements: ['Barreaux', 'Chaînes', 'Paille', 'Lucarne'], pieces: 'Scènes de captivité tragiques' },
  { id: 'cloitre', nom: 'Cloître / Église', categorie: 'Intérieur', initiale: 'C', bg: 'linear-gradient(160deg, #3a3d34, #1f2019)',
    description: "Arcades, vitraux et silence sacré — décor des couvents, des vœux et des drames de la foi.",
    elements: ['Arcades', 'Vitraux', 'Autel', 'Cierges'], pieces: 'Cyrano (final au couvent)' },
  { id: 'salon', nom: 'Salon mondain', categorie: 'Palais & cour', initiale: 'S', bg: 'linear-gradient(160deg, #4a3a44, #2a2028)',
    description: "Salon élégant du bel esprit, canapés, lustres et conversations : le théâtre de la satire des mœurs et des salons.",
    elements: ['Lustre', 'Canapés', 'Console', 'Miroirs'], pieces: 'Le Misanthrope, Les Femmes savantes' },
  { id: 'salle-bal', nom: 'Salle de bal', categorie: 'Palais & cour', initiale: 'B', bg: 'linear-gradient(160deg, #43304a, #241629)',
    description: "Grande salle illuminée, lustres et musique, où se croisent masques et intrigues galantes.",
    elements: ['Lustres', 'Parquet', 'Estrade des musiciens', 'Masques'], pieces: 'Roméo et Juliette (le bal), Lorenzaccio' },
  { id: 'campagne', nom: 'Campagne / Ferme', categorie: 'Nature', initiale: 'C', bg: 'linear-gradient(160deg, #4a4526, #2a2715)',
    description: "Champs, grange et village rustique — décor des pastorales, des noces paysannes et des comédies champêtres.",
    elements: ['Grange', 'Meules', 'Puits', 'Chemin'], pieces: 'George Sand, comédies rustiques' },
  { id: 'ile-deserte', nom: 'Île déserte', categorie: 'Nature', initiale: 'I', bg: 'linear-gradient(160deg, #2b6072, #163b48)',
    description: "Rivage sauvage, palmiers et grotte — décor du dépaysement, de l'utopie et des naufragés.",
    elements: ['Palmiers', 'Grotte', 'Épave', 'Rochers'], pieces: "L'Île des esclaves, La Tempête" },
  { id: 'cabaret', nom: 'Cabaret / Café-concert', categorie: 'Populaire', initiale: 'C', bg: 'linear-gradient(160deg, #4a2a2a, #281414)',
    description: "Petite scène, tables et lampions, ambiance de fête populaire : décor du théâtre de boulevard et des revues.",
    elements: ['Petite scène', 'Lampions', 'Tables rondes', 'Rideau rouge'], pieces: 'Revues, théâtre de boulevard' },
  { id: 'champ-bataille', nom: 'Champ de bataille', categorie: 'Symbolique', initiale: 'B', bg: 'linear-gradient(160deg, #45372c, #201812)',
    description: "Plaine dévastée, fumées et étendards — décor des épopées guerrières et des tragédies héroïques.",
    elements: ['Étendards', 'Fumées', 'Tente', 'Armes'], pieces: 'Le Cid, Macbeth, Horace' },
  { id: 'plateau-nu', nom: 'Plateau nu', categorie: 'Symbolique', initiale: 'N', bg: 'linear-gradient(160deg, #2a2a2e, #141416)',
    description: "Espace vide, murs noirs et lumière seule : le parti pris du théâtre contemporain, où le corps et le texte suffisent.",
    elements: ['Murs noirs', 'Lumière', 'Praticable', 'Aucun accessoire'], pieces: "Théâtre de l'absurde, mises en scène contemporaines" },
];
