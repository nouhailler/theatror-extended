// ─── Types de données (structure de fiche contractuelle) ───

export type Genre =
  | 'comédie'
  | 'tragédie'
  | 'drame'
  | 'absurde'
  | 'héroï-comédie'
  | 'tragi-comédie'
  | 'farce'
  | 'comédie-ballet'
  | 'vaudeville'
  | 'féerie';

export interface Piece {
  id: string;
  titre: string;
  auteur: string;
  auteurId?: string;
  annee: string; // affiché tel quel (« 1666 », « ~441 av. J.-C. »)
  anneeNum: number; // pour tri/filtre (négatif = av. J.-C.)
  genre: Genre;
  actes: string; // « 5 actes », « 11 scènes »
  hommes: number;
  femmes: number;
  dureeMin: number; // durée en minutes (filtre)
  duree: string; // « ≈ 2 h »
  domainePublic: boolean;
  decor: 'sans décor' | 'décor simple' | 'décor multiple';
  pourEnfants: boolean;
  epoque: 'antique' | 'classique' | 'contemporain';
  difficulte: 1 | 2 | 3 | 4; // ●●●○
  resume?: string;
}

export interface Dramaturge {
  id: string;
  nom: string;
  nomComplet?: string;
  dates: string;
  naissance: number;
  initiale: string;
  img?: string; // fichier Wikimedia
  bio: string;
  chrono: { an: string; txt: string }[];
  citation?: { txt: string; src: string };
  citations?: { txt: string; src: string }[]; // plusieurs citations (prioritaire sur citation)
  oeuvres: string[]; // « Tartuffe · 1664 »
  influence?: string;
  style?: string; // style dramatique / écriture
  manuscrits?: string; // état des manuscrits, fonds, autographes
  adaptations?: string[]; // adaptations célèbres (opéra, cinéma…)
  categorie: EncycloCategorie;
}

export type EncycloCategorie =
  | 'Dramaturges'
  | 'Auteurs contemporains'
  | 'Histoire'
  | 'Mouvements'
  | 'Genres'
  | 'Métiers'
  | 'Théâtres'
  | 'Festivals';

export type FriseType = 'auteur' | 'oeuvre' | 'evenement' | 'style';

export interface FriseItem {
  id: string;
  ere: string;
  couleur: string;
  an: string;
  anNum: number;
  titre: string;
  txt: string;
  type?: FriseType; // catégorie (défaut : 'evenement')
  pieceId?: string; // lien vers une fiche pièce
  auteurId?: string; // lien vers une fiche dramaturge
}

export interface Lieu {
  id: string;
  nom: string;
  lieu: string;
  txt: string;
  initiale: string;
  img?: string;
  type: 'theatre' | 'festival' | 'tradition' | 'ecole';
  lat: number;
  lng: number;
}

export interface Collection {
  id: string;
  titre: string;
  nb: string;
  initiale: string;
  fond: string;
  img?: string;
}

export interface Monologue {
  id: string;
  titre: string;
  source: string;
  extrait: string;
  texte?: string; // texte complet (lecture interactive future)
  dureeMin: number;
  duree: string;
  pour: 'Homme' | 'Femme' | 'Mixte';
  emotion: string;
  niveau: 'Facile' | 'Intermédiaire' | 'Difficile';
  epoque: 'Classique' | 'Contemporain';
}

export interface Citation {
  id: string;
  txt: string;
  src: string;
  theme: 'Amour' | 'Pouvoir' | 'Destin' | 'Le théâtre' | 'Mort';
}

export interface GlossaireTerme {
  id: string;
  terme: string;
  cat: string;
  def: string;
  lettre: string;
}
