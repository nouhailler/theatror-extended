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
  // Grands théâtres (carte du monde)
  'Theatre of Dionysus 2017.jpg': { auteur: 'Petter Ulleland', licence: 'CC BY-SA 4.0' },
  'Interior of Teatro Olimpico (Vicenza) scena .jpg': { auteur: 'Didier Descouens', licence: 'CC BY-SA 4.0' },
  'Exterior Teatro Alla Scala high quality 01.jpg': { auteur: 'John Picken', licence: 'CC BY 2.0' },
  'Moscow-Bolshoi-Theare-1.jpg': { auteur: 'DmitriyGuryanov', licence: 'CC BY-SA 3.0' },
  'Wien - Burgtheater.JPG': { auteur: 'C.Stadler/Bwag', licence: 'CC BY-SA 4.0' },
  'New york times square-terabass.jpg': { auteur: 'Terabass', licence: 'CC BY-SA 3.0' },
  'Fachada del Teatro Colón en Buenos Aires, Argentina.jpg': { auteur: 'EEJCC', licence: 'CC0' },
  'Sydney Australia. (21339175489).jpg': { auteur: 'Bernard Spragg. NZ', licence: 'CC0' },
  'The National Theatre, South Bank, London - geograph.org.uk - 1861458.jpg': { auteur: "Anthony O'Neil", licence: 'CC BY-SA 2.0' },
  'Berlin Berliner Ensemble.jpg': { auteur: 'Wikimedia Commons', licence: 'CC BY-SA 3.0' },
  'Teatro Real de Madrid 2025.jpg': { auteur: 'Fernando', licence: 'CC BY-SA 4.0' },
  'Санкт-Петербург, Мариинский театр, фасад (edited version).jpg': { auteur: 'Nikolai Bulykin', licence: 'CC BY-SA 4.0' },
  // Festivals (carte du monde)
  'Edinburgh Fringe 037.jpg': { auteur: 'Festival Fringe Society', licence: 'CC BY-SA 3.0' },
  'Odeon of Herodes Atticus (34580450331).jpg': { auteur: 'Robert Anders', licence: 'CC BY 2.0' },
  'Panorama Belgrad.jpg': { auteur: 'Zlatan Jovanović', licence: 'CC BY 3.0' },
  'Vista de Almada by Juntas (cropped).jpg': { auteur: 'Juntas', licence: 'CC BY-SA 4.0' },
  '2020-05-23 Theater an der Wien Linke Wienzeile.jpg': { auteur: 'Rosso Robot', licence: 'CC BY-SA 4.0' },
  'Théâtre Sarah-Bernhardt 1.jpg': { auteur: 'ZeusUpsistos', licence: 'CC BY-SA 4.0' },
  'Haus der Berliner Festspiele 02-2014.jpg': { auteur: 'A.Savin', licence: 'CC BY-SA 3.0' },
  'Teatre Grec Barcelona.jpg': { auteur: 'Wikimedia Commons', licence: 'CC BY-SA 2.5' },
  'Sarajevo National Theatre.JPG': { auteur: 'Slein80', licence: 'CC BY-SA 2.0 de' },
  'The Public Theater (48072652481).jpg': { auteur: 'Ajay Suresh', licence: 'CC BY 2.0' },
  'Sammy J in the Garden of Unearthly Delights at the 2018 Adelaide Fringe Festival.jpg': { auteur: 'Linh Chameleon', licence: 'CC BY-SA 2.0' },
  'Festival Santiago a Mil 2023 - Palacio de la Moneda.jpg': { auteur: 'LuisCG11', licence: 'CC BY-SA 4.0' },
  // Encyclopédie — Histoire
  'Greek - Actor - Walters 541067.jpg': { auteur: 'Anonyme (Grèce antique)', licence: 'Domaine public' },
  'Mystery Play Metz.jpg': { auteur: 'Auguste Migette', licence: 'Domaine public' },
  'The Swan cropped.png': { auteur: 'Aernout van Buchel', licence: 'Domaine public' },
  'Pierre Mignard - Portrait de Jean-Baptiste Poquelin dit Molière (1622-1673) - Google Art Project (cropped).jpg': { auteur: 'Pierre Mignard', licence: 'Domaine public' },
  'Ariane Mnouchkine.jpg': { auteur: 'Michèle Laurent', licence: 'Attribution' },
  'Figaro-1785-title-page.jpg': { auteur: 'Anonyme', licence: 'Domaine public' },
  'André Antoine actor.jpg': { auteur: 'Charles Reutlinger', licence: 'Domaine public' },
  "Louis Léopold Boilly - L'entrée du théâtre.jpg": { auteur: 'Louis-Léopold Boilly', licence: 'Domaine public' },
  'Jean Vilar, April 1955.jpg': { auteur: 'Hans-Joachim Koch', licence: 'CC BY-SA 4.0' },
  // Encyclopédie — Mouvements
  "Portrait de Jean Racine d'après Jean-Baptiste Santerre.jpg": { auteur: "D'après Jean-Baptiste Santerre", licence: 'Domaine public' },
  'Caspar David Friedrich - Wanderer above the sea of fog.jpg': { auteur: 'Caspar David Friedrich', licence: 'Domaine public' },
  'MissJulie1906.jpg': { auteur: 'Anonyme', licence: 'Domaine public' },
  'Maurice Maeterlinck 2.jpg': { auteur: 'Anonyme', licence: 'Domaine public' },
  "En attendant Godot, Festival d'Avignon, 1978.jpeg": { auteur: 'Fernand Michaud', licence: 'CC0' },
  'Bertolt-Brecht.jpg': { auteur: 'Jörg Kolbe (Bundesarchiv)', licence: 'CC BY-SA 3.0 de' },
  'Parma-teatro-farnese-in-national-gallery.jpg': { auteur: 'bestofcinqueterre.com', licence: 'CC BY-SA 4.0' },
  'Jean-Antoine Watteau, The Italian Comedians - Getty Museum.jpg': { auteur: 'Jean-Antoine Watteau', licence: 'Domaine public' },
  'Antonin Artaud 1926.jpg': { auteur: 'Agence Meurisse', licence: 'Domaine public' },
  // Encyclopédie — Genres
  'Ny Carlsberg Glyptothek - Melpomene.jpg': { auteur: 'Wolfgang Sauber', licence: 'CC BY-SA 3.0' },
  'Tragic comic masks - roman mosaic.jpg': { auteur: 'Anonyme (mosaïque romaine)', licence: 'Domaine public' },
  'Theatre Farce (Petrov-Vodkin).jpg': { auteur: 'Kouzma Petrov-Vodkine', licence: 'Domaine public' },
  "A Doll's House.jpeg": { auteur: 'Henrik Ibsen (page de titre)', licence: 'Domaine public' },
  '3402440-Le Cid performed in Paris 1637-Burgos.jpg': { auteur: 'Gravure ancienne', licence: 'Domaine public' },
  "La puce à l'oreille, pièce de Georges Feydeau - défets de presse - btv1b525109326 (1 of 8).jpg": { auteur: 'BnF / Gallica', licence: 'Domaine public' },
  'BourgeoisGentilhomme1688.jpg': { auteur: 'Henri Wetstein (éd.)', licence: 'Domaine public' },
  'Honoré Daumier 026.jpg': { auteur: 'Honoré Daumier', licence: 'Domaine public' },
  'La Biche au bois, Alfred Choubrac.jpg': { auteur: 'Alfred Choubrac', licence: 'Domaine public' },
  'Edwin Booth Hamlet 1870.jpg': { auteur: 'J. Gurney & Son', licence: 'Domaine public' },
  // Encyclopédie — Métiers
  'David Garrick by Thomas Gainsborough.jpg': { auteur: 'Thomas Gainsborough', licence: 'Domaine public' },
  'Constantin Stanislavski.jpg': { auteur: 'Anonyme', licence: 'Domaine public' },
  'Marcel Jambon - Giuseppe Verdi - Otello Act I set design model.jpg': { auteur: 'Marcel Jambon', licence: 'Domaine public' },
  'Stage managers panel.jpg': { auteur: 'KeepOnTruckin', licence: 'CC BY 2.5' },
  'Léon Bakst - Costume Design for a Ballet (1916).jpg': { auteur: 'Léon Bakst', licence: 'Domaine public' },
  'Classical spectacular10.jpg': { auteur: 'fir0002/Flagstaffotos', licence: 'GFDL 1.2' },
  'Scenic Design by Glenn Davis, Hospital Set 2013.jpg': { auteur: 'Glenn Davis', licence: 'CC BY-SA 3.0' },
  'Apuntador (souffleur) del siglo XVIII.jpg': { auteur: 'Anonyme (XVIIIe s.)', licence: 'Domaine public' },
  'Peter Brook.JPG': { auteur: 'John Thaxter', licence: 'CC0' },
  // Auteurs contemporains
  'Lagarce.jpg': { auteur: 'Babelio', licence: 'CC BY-SA 4.0' },
  'Yasmina Reza at XIII Prix Diálogo - Ceremonia de entrega.jpg': { auteur: 'power axle', licence: 'CC BY 2.0' },
  'Joël Pommerat.jpg': { auteur: 'David Balicki', licence: 'CC BY-SA 4.0' },
  'OscarsCoulisses2021.jpg': { auteur: 'StradellaLand', licence: 'CC0' },
  'Valère Novarina - portrait de Fernand Michaud - btv1b103296260.jpg': { auteur: 'Fernand Michaud', licence: 'Domaine public' },
  'Michel Vinaver - 2006.jpg': { auteur: 'Wikinade', licence: 'CC BY-SA 4.0' },
  'Marie Ndiaye 01.jpg': { auteur: 'Bengt Oberger', licence: 'CC BY-SA 4.0' },
  'Fabrice Melquiot.jpg': { auteur: 'Unmecmoi', licence: 'CC BY-SA 4.0' },
  // Portraits des grands dramaturges (ajout)
  'Pierre Carlet de Chamblain de Marivaux - Versailles MV 2985.jpg': { auteur: 'D\'après Louis-Michel van Loo', licence: 'Domaine public' },
  'Landelle, Charles - Alfred de Musset - Musée d\'Orsay.png': { auteur: 'Charles Landelle', licence: 'Domaine public' },
  'Atelier de Nicolas de Largillière, portrait de Voltaire, détail (musée Carnavalet) -002.jpg': { auteur: 'Atelier de Nicolas de Largillière', licence: 'Domaine public' },
  'G Feydeau Carolus-Duran Lille 2918.jpg': { auteur: 'D\'après Carolus-Duran', licence: 'Domaine public' },
  'Félix Nadar 1820-1910 portraits Eugène Labiche.jpg': { auteur: 'Nadar', licence: 'Domaine public' },
  'Georges Courteline circa 1890.jpg': { auteur: 'Anonyme', licence: 'Domaine public' },
  'Schaarwächter Henrik Ibsen cropped.jpg': { auteur: 'J. C. Schaarwächter', licence: 'Domaine public' },
  'Edmond Rostand en habit vert 01.jpg': { auteur: 'Léopold-Émile Reutlinger', licence: 'Domaine public' },
  'Nadar - Alexander Dumas père (1802-1870) - Google Art Project 2.jpg': { auteur: 'Nadar (Google Art Project)', licence: 'Domaine public' },
  'Alfred Jarry.jpg': { auteur: 'Atelier Nadar', licence: 'Domaine public' },
  '奥·巴尔扎克.png': { auteur: 'Louis-Auguste Bisson', licence: 'Domaine public' },
  'Alessandro Longhi - Ritratto di Carlo Goldoni (c 1757) Ca Goldoni Venezia - Close-up.jpg': { auteur: 'Alessandro Longhi (photo D. Descouens)', licence: 'CC BY-SA 4.0' },
  'Alain-René Lesage.png': { auteur: 'Anonyme', licence: 'Domaine public' },
  'Denis Diderot 111.PNG': { auteur: 'Anonyme', licence: 'Domaine public' },
  'Maupassant par Nadar.jpg': { auteur: 'Nadar', licence: 'Domaine public' },
  'Émile Augier by Adam-Salomon c1870s.jpg': { auteur: 'Antoine Samuel Adam-Salomon', licence: 'Domaine public' },
  'Jean de La Fontaine.PNG': { auteur: 'Hyacinthe Rigaud', licence: 'Domaine public' },
  'Aristofanes.jpg': { auteur: 'Buste antique, via Wikimedia Commons', licence: 'Domaine public' },
  'Euripide.jpg': { auteur: 'Buste antique, via Wikimedia Commons', licence: 'CC BY-SA 4.0' },
  'Oscar Wilde (1854-1900) 1889, May 23. Picture by W. and D. Downey.jpg': { auteur: 'W. & D. Downey', licence: 'Domaine public' },
};

export function creditFor(file?: string): Credit | undefined {
  if (!file) return undefined;
  return CREDITS[file];
}
