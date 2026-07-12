// Festivals — priorité 20. Agenda mondial du théâtre. Pas de dates/billetterie
// en temps réel (offline) : période habituelle, lieu, description, site indicatif.

export type Region = 'Europe' | 'Amériques' | 'Océanie';

export interface Festival {
  id: string;
  nom: string;
  ville: string;
  pays: string;
  region: Region;
  periode: string; // période habituelle
  moisNum: number; // mois de début (1–12), pour l'ordre du calendrier
  depuis?: string; // année de création
  description: string;
  genre?: string; // type de programmation
  site?: string; // domaine indicatif (texte, non cliquable)
}

const MOIS = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
export const moisCourt = (n: number) => MOIS[(n - 1 + 12) % 12] ?? '';

// Couleur d'accent par saison (vignette calendrier).
export function saisonCouleur(mois: number): string {
  if (mois === 12 || mois <= 2) return '#5f8ea8'; // hiver
  if (mois <= 5) return '#8e9e5a'; // printemps
  if (mois <= 8) return '#d4a94e'; // été
  return '#b0563a'; // automne
}

export const FESTIVALS: Festival[] = [
  { id: 'under-the-radar', nom: 'Under the Radar', ville: 'New York', pays: 'États-Unis', region: 'Amériques', periode: 'Janvier', moisNum: 1, depuis: '2005',
    description: "Rendez-vous new-yorkais de la création théâtrale d'avant-garde, vitrine des écritures et formes émergentes du monde entier.", genre: 'Avant-garde', site: 'undertheradarfestival.com' },
  { id: 'santiago-a-mil', nom: 'Santiago a Mil', ville: 'Santiago', pays: 'Chili', region: 'Amériques', periode: 'Janvier', moisNum: 1, depuis: '1994',
    description: "Le grand festival de l'été austral, carrefour majeur des arts de la scène latino-américains et internationaux.", genre: 'Pluridisciplinaire', site: 'fundacionteatroamil.cl' },
  { id: 'adelaide-fringe', nom: 'Adelaide Fringe', ville: 'Adélaïde', pays: 'Australie', region: 'Océanie', periode: 'Février – mars', moisNum: 2, depuis: '1960',
    description: "Deuxième plus grand festival off du monde après Édimbourg : des milliers de spectacles investissent toute la ville.", genre: 'Fringe / arts du spectacle', site: 'adelaidefringe.com.au' },
  { id: 'bogota', nom: 'Festival Iberoamericano', ville: 'Bogotá', pays: 'Colombie', region: 'Amériques', periode: 'Mars – avril', moisNum: 3, depuis: '1988',
    description: "L'un des plus grands festivals de théâtre au monde (édition bisannuelle), grande fête populaire des scènes ibéro-américaines.", genre: 'Théâtre international', site: 'festivaldeteatro.com.co' },
  { id: 'theatertreffen', nom: 'Theatertreffen', ville: 'Berlin', pays: 'Allemagne', region: 'Europe', periode: 'Mai', moisNum: 5, depuis: '1964',
    description: "La « rencontre théâtrale » qui réunit les dix mises en scène les plus remarquables de la saison germanophone.", genre: 'Théâtre germanophone', site: 'berlinerfestspiele.de' },
  { id: 'kunstenfestival', nom: 'Kunstenfestivaldesarts', ville: 'Bruxelles', pays: 'Belgique', region: 'Europe', periode: 'Mai', moisNum: 5, depuis: '1994',
    description: "Festival bilingue de création contemporaine, laboratoire des formes scéniques les plus actuelles.", genre: 'Création contemporaine', site: 'kfda.be' },
  { id: 'fta', nom: 'Festival TransAmériques', ville: 'Montréal', pays: 'Canada', region: 'Amériques', periode: 'Mai – juin', moisNum: 5, depuis: '1985',
    description: "Grand rendez-vous nord-américain du théâtre et de la danse contemporains, tourné vers la création internationale.", genre: 'Théâtre & danse', site: 'fta.ca' },
  { id: 'wiener-festwochen', nom: 'Wiener Festwochen', ville: 'Vienne', pays: 'Autriche', region: 'Europe', periode: 'Mai – juin', moisNum: 5, depuis: '1951',
    description: "Les « Semaines festives » de Vienne : théâtre, opéra et performance, une des grandes manifestations européennes.", genre: 'Pluridisciplinaire', site: 'festwochen.at' },
  { id: 'holland-festival', nom: 'Holland Festival', ville: 'Amsterdam', pays: 'Pays-Bas', region: 'Europe', periode: 'Juin', moisNum: 6, depuis: '1947',
    description: "Le plus ancien et plus grand festival des arts de la scène des Pays-Bas, exigeant et international.", genre: 'Arts de la scène', site: 'hollandfestival.nl' },
  { id: 'printemps-comediens', nom: 'Printemps des Comédiens', ville: 'Montpellier', pays: 'France', region: 'Europe', periode: 'Juin', moisNum: 6, depuis: '1987',
    description: "Grand festival de théâtre du sud de la France, dans le parc du domaine d'O, entre grandes formes et découvertes.", genre: 'Théâtre', site: 'printempsdescomediens.com' },
  { id: 'grec-barcelone', nom: 'Festival Grec', ville: 'Barcelone', pays: 'Espagne', region: 'Europe', periode: 'Juin – juillet', moisNum: 6, depuis: '1976',
    description: "Le grand festival estival de Barcelone, dont le cœur bat au Teatre Grec, amphithéâtre à ciel ouvert de Montjuïc.", genre: 'Théâtre, danse, musique', site: 'barcelona.cat/grec' },
  { id: 'athenes-epidaure', nom: 'Festival d\'Athènes & Épidaure', ville: 'Athènes / Épidaure', pays: 'Grèce', region: 'Europe', periode: 'Juin – août', moisNum: 6, depuis: '1955',
    description: "Les tragédies grecques rejouées dans l'Odéon d'Hérode Atticus et le théâtre antique d'Épidaure — l'antique et le contemporain.", genre: 'Théâtre antique & contemporain', site: 'aefestival.gr' },
  { id: 'merida', nom: 'Festival de Mérida', ville: 'Mérida', pays: 'Espagne', region: 'Europe', periode: 'Juillet – août', moisNum: 7, depuis: '1933',
    description: "Le plus ancien festival de théâtre gréco-latin, joué dans le magnifique théâtre romain de Mérida.", genre: 'Théâtre gréco-latin', site: 'festivaldemerida.es' },
  { id: 'avignon', nom: 'Festival d\'Avignon', ville: 'Avignon', pays: 'France', region: 'Europe', periode: 'Juillet', moisNum: 7, depuis: '1947',
    description: "Le plus grand festival de théâtre francophone : la Cour d'honneur du Palais des papes et plus de 1 500 spectacles au Off.", genre: 'Théâtre', site: 'festival-avignon.com' },
  { id: 'almada', nom: 'Festival d\'Almada', ville: 'Almada / Lisbonne', pays: 'Portugal', region: 'Europe', periode: 'Juillet', moisNum: 7, depuis: '1984',
    description: "Rendez-vous majeur du théâtre en péninsule ibérique, entre créations portugaises et grandes compagnies invitées.", genre: 'Théâtre', site: 'ctalmada.pt' },
  { id: 'edinburgh-international', nom: 'Edinburgh International Festival', ville: 'Édimbourg', pays: 'Écosse', region: 'Europe', periode: 'Août', moisNum: 8, depuis: '1947',
    description: "Programmation d'excellence en théâtre, opéra, danse et musique — le pendant « officiel » du Fringe.", genre: 'Arts de la scène', site: 'eif.co.uk' },
  { id: 'edinburgh-fringe', nom: 'Edinburgh Festival Fringe', ville: 'Édimbourg', pays: 'Écosse', region: 'Europe', periode: 'Août', moisNum: 8, depuis: '1947',
    description: "Le plus grand festival des arts du spectacle au monde : des dizaines de milliers de représentations dans toute la ville.", genre: 'Fringe / arts du spectacle', site: 'edfringe.com' },
  { id: 'bitef', nom: 'BITEF', ville: 'Belgrade', pays: 'Serbie', region: 'Europe', periode: 'Septembre', moisNum: 9, depuis: '1967',
    description: "Le Belgrade International Theatre Festival, vitrine historique des « nouvelles tendances » de la mise en scène.", genre: 'Nouvelles tendances', site: 'bitef.rs' },
  { id: 'automne-paris', nom: 'Festival d\'Automne à Paris', ville: 'Paris', pays: 'France', region: 'Europe', periode: 'Septembre – décembre', moisNum: 9, depuis: '1972',
    description: "Grand festival pluridisciplinaire de création contemporaine, disséminé dans les théâtres et musées de Paris et d'Île-de-France.", genre: 'Création contemporaine', site: 'festival-automne.com' },
  { id: 'mess', nom: 'MESS', ville: 'Sarajevo', pays: 'Bosnie-Herzégovine', region: 'Europe', periode: 'Octobre', moisNum: 10, depuis: '1960',
    description: "L'un des plus anciens festivals de théâtre expérimental d'Europe, symbole de résistance culturelle.", genre: 'Théâtre expérimental', site: 'mess.ba' },
];
