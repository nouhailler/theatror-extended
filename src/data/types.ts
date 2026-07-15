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
  recompenses?: string[]; // prix et distinctions (Molières, Tony, Académies…)
  themes?: string[]; // grands thèmes de l'œuvre (famille, guerre, exil…)
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
  desc: string; // sous-titre thématique (le nombre de pièces est calculé)
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
  age?: 'Jeune' | 'Adulte' | 'Mûr'; // tranche d'âge du rôle
  pieceId?: string; // lien vers la fiche pièce
}

export type CitationTheme =
  | 'Amour' | 'Pouvoir' | 'Destin' | 'Le théâtre' | 'Mort'
  | 'Liberté' | 'Honneur' | 'Temps' | 'Vérité' | 'Folie';

export interface Citation {
  id: string;
  txt: string;
  src: string; // affichage « AUTEUR — Pièce »
  theme: CitationTheme;
  auteur: string; // pour le classement / filtre par auteur
  pieceId?: string; // lien vers la fiche pièce
  emotion?: string; // émotion dominante
}

// ─── Base de références thématiques ───
// Répertoire élargi (592 pièces) indexé par thème. Va au-delà du catalogue :
// il couvre le répertoire moderne et contemporain, dont le texte n'est pas libre.

export type RefTheme = string;

export interface RefOeuvre {
  id: string;
  auteur: string;
  piece: string;
  pieceId?: string; // lien vers la fiche pièce, si l'œuvre est au catalogue
  // Au plus une note par thème : la génération en écarte 139 quand deux thèmes
  // du tableau source retombent sur le même thème canonique. Voir themes.ts.
  notes: { theme: RefTheme; txt: string }[];
}

export interface GlossaireTerme {
  id: string;
  terme: string;
  cat: string;
  def: string;
  lettre: string;
}
