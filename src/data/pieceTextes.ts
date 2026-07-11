// Registre des textes intégraux (domaine public).
// Chaque pièce est un module chargé à la demande (import dynamique) pour ne pas
// alourdir le bundle initial : le texte n'est téléchargé que lorsqu'on ouvre le lecteur.
// Une fois chargé, il est embarqué (précaché par le service worker) → lisible hors-ligne.

export type BlocKind = 'acte' | 'scene' | 'didascalie' | 'perso' | 'ligne';

export interface TexteBloc {
  k: BlocKind;
  t: string;
}

export interface PieceTexte {
  source: string; // attribution / édition
  blocs: TexteBloc[];
}

type Loader = () => Promise<{ default: PieceTexte }>;

// Ajouter ici chaque pièce dont le texte est disponible.
export const TEXTE_LOADERS: Record<string, Loader> = {
  'le-misanthrope': () => import('./texts/le-misanthrope'),
  'tartuffe': () => import('./texts/tartuffe'),
  'lavare': () => import('./texts/lavare'),
  'phedre': () => import('./texts/phedre'),
  'andromaque': () => import('./texts/andromaque'),
  'le-cid': () => import('./texts/le-cid'),
  'britannicus': () => import('./texts/britannicus'),
  'cyrano': () => import('./texts/cyrano'),
  'malade-imaginaire': () => import('./texts/malade-imaginaire'),
  'bourgeois-gentilhomme': () => import('./texts/bourgeois-gentilhomme'),
  'dom-juan': () => import('./texts/dom-juan'),
  'horace': () => import('./texts/horace'),
  'mariage-figaro': () => import('./texts/mariage-figaro'),
  'barbier-seville': () => import('./texts/barbier-seville'),
  'hernani': () => import('./texts/hernani'),
  'ruy-blas': () => import('./texts/ruy-blas'),
  'on-ne-badine-pas': () => import('./texts/on-ne-badine-pas'),
  'le-jeu-amour-hasard': () => import('./texts/le-jeu-amour-hasard'),
  'ubu-roi': () => import('./texts/ubu-roi'),
  'marquis-villemer': () => import('./texts/marquis-villemer'),
  'francois-champi': () => import('./texts/francois-champi'),
  'hamlet': () => import('./texts/hamlet'),
  'macbeth': () => import('./texts/macbeth'),
  'songe-nuit-ete': () => import('./texts/songe-nuit-ete'),
  'maison-poupee': () => import('./texts/maison-poupee'),
  'antigone-sophocle': () => import('./texts/antigone-sophocle'),
  'oedipe-roi': () => import('./texts/oedipe-roi'),
  'les-grenouilles': () => import('./texts/les-grenouilles'),
  'romeo-juliette': () => import('./texts/romeo-juliette'),
  'la-mouette': () => import('./texts/la-mouette'),
  'medee-corneille': () => import('./texts/medee-corneille'),
  'oncle-vania': () => import('./texts/oncle-vania'),
};

export function hasTexte(id?: string): boolean {
  return !!id && id in TEXTE_LOADERS;
}

export async function loadTexte(id: string): Promise<PieceTexte | null> {
  const loader = TEXTE_LOADERS[id];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
