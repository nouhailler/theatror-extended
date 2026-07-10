// Construit une URL Wikimedia Commons via Special:FilePath.
// Le repli « initiale dorée » est géré par le composant <WikiImage>.
const BASE = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

export function wiki(file: string, width = 500): string {
  if (!file) return '';
  // Le nom peut déjà être encodé ; on ré-encode proprement les espaces.
  const encoded = encodeURIComponent(file).replace(/%2F/g, '/');
  return `${BASE}${encoded}?width=${width}`;
}

// Crédit / licence par fichier (Wikimedia Commons). Affiché en pied de fiche.
export interface Credit {
  auteur: string;
  licence: string;
}

export const CREDITS: Record<string, Credit> = {
  'Pierre Mignard - Portrait de Jean-Baptiste Poquelin dit Molière (1622-1673) - Google Art Project.jpg':
    { auteur: 'Pierre Mignard (Google Art Project)', licence: 'Domaine public' },
  'Shakespeare.jpg': { auteur: 'Attribué à John Taylor', licence: 'Domaine public' },
  'Jean racine.jpg': { auteur: "Atelier de Jean-Baptiste Santerre", licence: 'Domaine public' },
  'Anton Chekhov with bow-tie sepia image.jpg': { auteur: 'Anonyme', licence: 'Domaine public' },
  'Victor Hugo by Étienne Carjat 1876 - full.jpg': { auteur: 'Étienne Carjat', licence: 'Domaine public' },
  'Sophocles pushkin.jpg': { auteur: "Musée Pouchkine", licence: 'Domaine public' },
  'George Sand by Nadar, 1864.jpg': { auteur: 'Nadar', licence: 'Domaine public' },
  'Paris Opera full frontal architecture, May 2009.jpg': { auteur: 'Peter Rivera', licence: 'CC BY 2.0' },
  'Epidaurus Theater.jpg': { auteur: 'Carole Raddato', licence: 'CC BY-SA 2.0' },
  'Comédie-Française.jpg': { auteur: 'Wikimedia Commons', licence: 'CC BY-SA' },
  'Shakespeare’s Globe Theatre, London.jpg': { auteur: 'Wikimedia Commons', licence: 'CC BY-SA' },
  'Avignon, Palais des Papes by JM Rosier.jpg': { auteur: 'Jean-Marc Rosier', licence: 'CC BY-SA 3.0' },
  // Auteurs contemporains
  'Lagarce.jpg': { auteur: 'Babelio', licence: 'CC BY-SA 4.0' },
  'Yasmina Reza at XIII Prix Diálogo - Ceremonia de entrega.jpg': { auteur: 'power axle', licence: 'CC BY 2.0' },
  'Joël Pommerat.jpg': { auteur: 'David Balicki', licence: 'CC BY-SA 4.0' },
  'OscarsCoulisses2021.jpg': { auteur: 'StradellaLand', licence: 'CC0' },
  'Valère Novarina - portrait de Fernand Michaud - btv1b103296260.jpg': { auteur: 'Fernand Michaud', licence: 'Domaine public' },
  'Michel Vinaver - 2006.jpg': { auteur: 'Wikinade', licence: 'CC BY-SA 4.0' },
  'Marie Ndiaye 01.jpg': { auteur: 'Bengt Oberger', licence: 'CC BY-SA 4.0' },
  'Fabrice Melquiot.jpg': { auteur: 'Unmecmoi', licence: 'CC BY-SA 4.0' },
};

export function creditFor(file?: string): Credit | undefined {
  if (!file) return undefined;
  return CREDITS[file];
}
