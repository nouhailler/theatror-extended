// Catalogue des accès rapides personnalisables de l'accueil.
// L'utilisateur choisit lesquels afficher depuis Réglages ; l'ordre affiché
// suit celui de settings.homeShortcuts (voir store). Ajouter une entrée ici la
// rend disponible dans Réglages et sur l'accueil sans autre changement.

export interface HomeShortcut {
  id: string;
  label: string;
  sub: string;
  to: string;
}

export const HOME_SHORTCUTS: HomeShortcut[] = [
  { id: 'monologues', label: 'Monologues', sub: 'Pour vos auditions', to: '/scene?seg=mono' },
  { id: 'pieces', label: 'Trouver une pièce', sub: 'Filtres par distribution', to: '/pieces' },
  { id: 'repetition', label: 'Mode répétition', sub: 'Lecture vocale', to: '/repetition' },
  { id: 'exercices', label: "Exercices d'acteur", sub: 'Échauffement, jeu', to: '/exercices' },
  { id: 'voix', label: 'Voix & diction', sub: 'Souffle, articulation', to: '/voix' },
  { id: 'carnet', label: 'Carnet & contacts', sub: 'Pro du spectacle', to: '/carnet' },
  { id: 'journal', label: 'Journal', sub: 'Notes de répétition', to: '/journal' },
  { id: 'medias', label: 'Médias', sub: 'Podcasts & vidéos', to: '/medias' },
  { id: 'festivals', label: 'Festivals', sub: 'Agenda mondial', to: '/festivals' },
  { id: 'mise-en-scene', label: 'Mise en scène', sub: 'Plateau virtuel', to: '/mise-en-scene' },
  { id: 'citations', label: 'Citations', sub: 'Classées par thème', to: '/scene?seg=cit' },
  { id: 'glossaire', label: 'Glossaire', sub: 'Les mots du théâtre', to: '/scene?seg=glos' },
  { id: 'collection', label: 'Ma collection', sub: 'Vos favoris', to: '/collection' },
  { id: 'parcours', label: 'Parcours', sub: 'Apprentissage guidé', to: '/parcours' },
  { id: 'ia', label: 'Mode IA', sub: 'Assistant', to: '/ia' },
  { id: 'frise', label: 'Frise du théâtre', sub: "2 500 ans d'histoire", to: '/explorer/frise' },
  { id: 'carte', label: 'Carte du monde', sub: 'Théâtres, festivals', to: '/explorer/carte' },
  { id: 'encyclopedie', label: 'Encyclopédie', sub: 'Histoire du théâtre', to: '/explorer/encyclopedie' },
  { id: 'themes', label: 'Thèmes', sub: 'Le répertoire par sujet', to: '/explorer/themes' },
  { id: 'quiz', label: 'Quiz', sub: 'Testez-vous', to: '/quiz' },
];

// Par défaut : les 4 accès historiques de l'accueil (comportement inchangé).
export const DEFAULT_HOME_SHORTCUTS = ['monologues', 'frise', 'pieces', 'journal'];

export const HOME_SHORTCUTS_BY_ID: Record<string, HomeShortcut> = Object.fromEntries(
  HOME_SHORTCUTS.map((s) => [s.id, s]),
);
