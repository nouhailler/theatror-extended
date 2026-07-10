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
