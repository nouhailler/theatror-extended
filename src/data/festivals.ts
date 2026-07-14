// Festivals — priorité 20. Agenda mondial du théâtre. Pas de dates/billetterie
// en temps réel (offline) : période habituelle, lieu, description, site indicatif.
// Vignette illustrée (lieu / ville via Wikimedia) + fiche détail cliquable.

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
  img?: string; // fichier Wikimedia (lieu / ville ; repli : vignette calendrier)
  description: string;
  detail?: string; // présentation approfondie (fiche détail)
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
  { id: 'under-the-radar', nom: 'Under the Radar', ville: 'New York', pays: 'États-Unis', region: 'Amériques', periode: 'Janvier', moisNum: 1, depuis: '2005', img: 'The Public Theater (48072652481).jpg',
    description: "Rendez-vous new-yorkais de la création théâtrale d'avant-garde, vitrine des écritures et formes émergentes du monde entier.",
    detail: "Né au Public Theater de New York, Under the Radar s'est imposé chaque mois de janvier comme la vitrine américaine des écritures et des formes scéniques émergentes. On y découvre, sur une dizaine de jours, des compagnies venues du monde entier, souvent avant qu'elles n'accèdent aux grandes scènes. C'est un baromètre de l'avant-garde théâtrale internationale, à la croisée du théâtre, de la performance et des arts visuels.",
    genre: 'Avant-garde', site: 'undertheradarfestival.com' },
  { id: 'santiago-a-mil', nom: 'Santiago a Mil', ville: 'Santiago', pays: 'Chili', region: 'Amériques', periode: 'Janvier', moisNum: 1, depuis: '1994', img: 'Festival Santiago a Mil 2023 - Palacio de la Moneda.jpg',
    description: "Le grand festival de l'été austral, carrefour majeur des arts de la scène latino-américains et internationaux.",
    detail: "En plein été austral, Santiago a Mil transforme la capitale chilienne en immense scène ouverte : salles, rues et places accueillent théâtre, danse et arts de la rue. Fondé en 1994, son nom rappelle l'époque où les billets coûtaient « mille » pesos, dans une volonté d'ouverture populaire. Devenu le grand carrefour des arts de la scène en Amérique latine, il conjugue créations chiliennes, tournées internationales et gratuité d'une partie de la programmation.",
    genre: 'Pluridisciplinaire', site: 'fundacionteatroamil.cl' },
  { id: 'adelaide-fringe', nom: 'Adelaide Fringe', ville: 'Adélaïde', pays: 'Australie', region: 'Océanie', periode: 'Février – mars', moisNum: 2, depuis: '1960', img: 'Sammy J in the Garden of Unearthly Delights at the 2018 Adelaide Fringe Festival.jpg',
    description: "Deuxième plus grand festival off du monde après Édimbourg : des milliers de spectacles investissent toute la ville.",
    detail: "Sur le modèle d'Édimbourg, l'Adelaide Fringe est un festival « ouvert » sans sélection : quiconque trouve un lieu peut s'y produire. Pendant un mois, des milliers de spectacles — théâtre, cabaret, cirque, comédie — envahissent salles, jardins et chapiteaux comme le fameux Garden of Unearthly Delights. Deuxième plus grand festival off du monde, il est le grand rendez-vous estival des arts du spectacle de l'hémisphère sud.",
    genre: 'Fringe / arts du spectacle', site: 'adelaidefringe.com.au' },
  { id: 'bogota', nom: 'Festival Iberoamericano', ville: 'Bogotá', pays: 'Colombie', region: 'Amériques', periode: 'Mars – avril', moisNum: 3, depuis: '1988', img: 'Teatro Colon Bogota.jpg',
    description: "L'un des plus grands festivals de théâtre au monde (édition bisannuelle), grande fête populaire des scènes ibéro-américaines.",
    detail: "Fondé en 1988 par l'actrice Fanny Mikey, le Festival Ibéro-américain de Bogotá est devenu, par son ampleur, l'un des plus grands rassemblements théâtraux de la planète. Bisannuel, il mêle spectacles en salle, grands événements de rue et une immense fête populaire qui embrase la capitale colombienne. Sa programmation fait dialoguer les scènes ibéro-américaines et les grandes compagnies du monde entier, dans un esprit de célébration collective.",
    genre: 'Théâtre international', site: 'festivaldeteatro.com.co' },
  { id: 'theatertreffen', nom: 'Theatertreffen', ville: 'Berlin', pays: 'Allemagne', region: 'Europe', periode: 'Mai', moisNum: 5, depuis: '1964', img: 'Haus der Berliner Festspiele 02-2014.jpg',
    description: "La « rencontre théâtrale » qui réunit les dix mises en scène les plus remarquables de la saison germanophone.",
    detail: "Chaque mai, le Theatertreffen de Berlin réunit les « dix mises en scène les plus remarquables » de la saison, choisies par un jury de critiques parmi toutes les productions de l'espace germanophone (Allemagne, Autriche, Suisse). Organisé par les Berliner Festspiele, il est à la fois une consécration pour les artistes retenus et un observatoire de l'état du théâtre de langue allemande, réputé pour son audace et sa radicalité formelle.",
    genre: 'Théâtre germanophone', site: 'berlinerfestspiele.de' },
  { id: 'kunstenfestival', nom: 'Kunstenfestivaldesarts', ville: 'Bruxelles', pays: 'Belgique', region: 'Europe', periode: 'Mai', moisNum: 5, depuis: '1994', img: 'Kaaitheater Brussels 2.jpg',
    description: "Festival bilingue de création contemporaine, laboratoire des formes scéniques les plus actuelles.",
    detail: "Résolument bilingue (français et néerlandais), le Kunstenfestivaldesarts épouse la double identité de Bruxelles et en fait une force. Pendant trois semaines de mai, il investit des dizaines de lieux de la capitale belge pour présenter des créations souvent inédites, à la pointe de la recherche scénique. Théâtre, danse, performance et arts visuels s'y croisent : c'est l'un des grands laboratoires de la création contemporaine en Europe.",
    genre: 'Création contemporaine', site: 'kfda.be' },
  { id: 'fta', nom: 'Festival TransAmériques', ville: 'Montréal', pays: 'Canada', region: 'Amériques', periode: 'Mai – juin', moisNum: 5, depuis: '1985', img: 'Place des Arts.jpg',
    description: "Grand rendez-vous nord-américain du théâtre et de la danse contemporains, tourné vers la création internationale.",
    detail: "Le Festival TransAmériques (FTA) est le grand rendez-vous montréalais du théâtre et de la danse contemporains. Chaque printemps, il investit les salles du Quartier des spectacles, autour de la Place des Arts, pour présenter des œuvres d'ici et d'ailleurs, souvent des premières nord-américaines. Tourné vers les écritures scéniques les plus actuelles, il est une plaque tournante de la création francophone et internationale sur le continent américain.",
    genre: 'Théâtre & danse', site: 'fta.ca' },
  { id: 'wiener-festwochen', nom: 'Wiener Festwochen', ville: 'Vienne', pays: 'Autriche', region: 'Europe', periode: 'Mai – juin', moisNum: 5, depuis: '1951', img: '2020-05-23 Theater an der Wien Linke Wienzeile.jpg',
    description: "Les « Semaines festives » de Vienne : théâtre, opéra et performance, une des grandes manifestations européennes.",
    detail: "Créées en 1951 dans une Vienne encore marquée par l'après-guerre, les « Semaines festives » (Festwochen) sont devenues l'une des grandes manifestations pluridisciplinaires d'Europe. Cinq semaines durant, elles réunissent théâtre, opéra, danse et performance dans les salles historiques et les lieux emblématiques de la capitale autrichienne. Leur programmation exigeante et cosmopolite en fait un rendez-vous majeur de la scène européenne.",
    genre: 'Pluridisciplinaire', site: 'festwochen.at' },
  { id: 'holland-festival', nom: 'Holland Festival', ville: 'Amsterdam', pays: 'Pays-Bas', region: 'Europe', periode: 'Juin', moisNum: 6, depuis: '1947', img: 'Stadsschouwburg amsterdam.jpg',
    description: "Le plus ancien et plus grand festival des arts de la scène des Pays-Bas, exigeant et international.",
    detail: "Fondé en 1947, le Holland Festival est le plus ancien et le plus important festival des arts de la scène des Pays-Bas. Tout au long du mois de juin, il déploie à Amsterdam une programmation exigeante et internationale mêlant théâtre, opéra, danse et musique, souvent confiée à de grands noms de la mise en scène. Institution culturelle majeure, il conjugue tradition d'excellence et goût pour les formes contemporaines.",
    genre: 'Arts de la scène', site: 'hollandfestival.nl' },
  { id: 'printemps-comediens', nom: 'Printemps des Comédiens', ville: 'Montpellier', pays: 'France', region: 'Europe', periode: 'Juin', moisNum: 6, depuis: '1987', img: 'Place de la Comédie Montpellier.jpg',
    description: "Grand festival de théâtre du sud de la France, dans le parc du domaine d'O, entre grandes formes et découvertes.",
    detail: "Chaque mois de juin, le Printemps des Comédiens fait de Montpellier une capitale du théâtre. Ses spectacles se déploient en grande partie en plein air, dans le parc arboré du domaine d'O, cadre magnifique pour les grandes formes comme pour les découvertes. Ouvert aux écritures d'aujourd'hui autant qu'aux relectures des classiques, il est l'un des principaux festivals de théâtre du sud de la France.",
    genre: 'Théâtre', site: 'printempsdescomediens.com' },
  { id: 'grec-barcelone', nom: 'Festival Grec', ville: 'Barcelone', pays: 'Espagne', region: 'Europe', periode: 'Juin – juillet', moisNum: 6, depuis: '1976', img: 'Teatre Grec Barcelona.jpg',
    description: "Le grand festival estival de Barcelone, dont le cœur bat au Teatre Grec, amphithéâtre à ciel ouvert de Montjuïc.",
    detail: "Le Festival Grec tire son nom du Teatre Grec, amphithéâtre à ciel ouvert bâti sur les flancs de Montjuïc pour l'Exposition de 1929, en imitation des théâtres antiques. Chaque été depuis 1976, ce lieu emblématique et de nombreuses salles de la ville accueillent théâtre, danse, musique et cirque. Grand rendez-vous estival de Barcelone, le Grec conjugue créations catalanes et invitations internationales sous le ciel méditerranéen.",
    genre: 'Théâtre, danse, musique', site: 'barcelona.cat/grec' },
  { id: 'athenes-epidaure', nom: 'Festival d\'Athènes & Épidaure', ville: 'Athènes / Épidaure', pays: 'Grèce', region: 'Europe', periode: 'Juin – août', moisNum: 6, depuis: '1955', img: 'Odeon of Herodes Atticus (34580450331).jpg',
    description: "Les tragédies grecques rejouées dans l'Odéon d'Hérode Atticus et le théâtre antique d'Épidaure — l'antique et le contemporain.",
    detail: "Ce festival estival a la singularité de faire résonner les œuvres sur les lieux mêmes de la naissance du théâtre. À Athènes, les spectacles se donnent dans l'Odéon d'Hérode Atticus, au pied de l'Acropole ; à Épidaure, dans le théâtre antique à l'acoustique légendaire, où l'on rejoue les tragédies grecques face à des milliers de spectateurs. Depuis 1955, il fait dialoguer répertoire antique et création contemporaine dans un cadre incomparable.",
    genre: 'Théâtre antique & contemporain', site: 'aefestival.gr' },
  { id: 'merida', nom: 'Festival de Mérida', ville: 'Mérida', pays: 'Espagne', region: 'Europe', periode: 'Juillet – août', moisNum: 7, depuis: '1933', img: 'Teatro romano - Mérida.jpg',
    description: "Le plus ancien festival de théâtre gréco-latin, joué dans le magnifique théâtre romain de Mérida.",
    detail: "Fondé en 1933, le Festival de Mérida est le plus ancien festival de théâtre gréco-latin. Son écrin est exceptionnel : le théâtre romain de Mérida, l'un des mieux conservés au monde, avec sa scène monumentale à colonnes édifiée sous Auguste. Chaque été, tragédies et comédies de l'Antiquité — Sophocle, Euripide, Plaute, Sénèque — y sont rejouées dans ce cadre d'origine, faisant revivre le théâtre à l'endroit même pour lequel il fut conçu.",
    genre: 'Théâtre gréco-latin', site: 'festivaldemerida.es' },
  { id: 'avignon', nom: 'Festival d\'Avignon', ville: 'Avignon', pays: 'France', region: 'Europe', periode: 'Juillet', moisNum: 7, depuis: '1947', img: 'Avignon, Palais des Papes by JM Rosier.jpg',
    description: "Le plus grand festival de théâtre francophone : la Cour d'honneur du Palais des papes et plus de 1 500 spectacles au Off.",
    detail: "Créé en 1947 par Jean Vilar, le Festival d'Avignon est le plus grand rendez-vous du théâtre francophone. Son cœur bat dans la Cour d'honneur du Palais des papes, où se donnent chaque juillet les grandes créations du « In ». Autour de lui a grandi un « Off » foisonnant de plus de 1 500 spectacles qui envahissent toute la ville. Pendant trois semaines, Avignon devient une cité-théâtre unique au monde, laboratoire et vitrine de la scène contemporaine.",
    genre: 'Théâtre', site: 'festival-avignon.com' },
  { id: 'almada', nom: 'Festival d\'Almada', ville: 'Almada / Lisbonne', pays: 'Portugal', region: 'Europe', periode: 'Juillet', moisNum: 7, depuis: '1984', img: 'Vista de Almada by Juntas (cropped).jpg',
    description: "Rendez-vous majeur du théâtre en péninsule ibérique, entre créations portugaises et grandes compagnies invitées.",
    detail: "Porté de longue date par la Compagnie de théâtre d'Almada et son fondateur Joaquim Benite, ce festival de juillet s'est imposé comme le grand rendez-vous théâtral du Portugal. De part et d'autre du Tage, à Almada et à Lisbonne, il présente créations portugaises et grandes compagnies internationales, dans des salles comme en plein air. Populaire et exigeant, il tisse un pont entre la scène lusophone et le théâtre européen.",
    genre: 'Théâtre', site: 'ctalmada.pt' },
  { id: 'edinburgh-international', nom: 'Edinburgh International Festival', ville: 'Édimbourg', pays: 'Écosse', region: 'Europe', periode: 'Août', moisNum: 8, depuis: '1947', img: 'Festival Theatre (408960988).jpg',
    description: "Programmation d'excellence en théâtre, opéra, danse et musique — le pendant « officiel » du Fringe.",
    detail: "Fondé en 1947 pour reconstruire les liens culturels de l'après-guerre, l'Edinburgh International Festival est la manifestation « officielle » et sélective dont le Fringe est né en marge. Chaque mois d'août, il présente dans les grandes salles de la capitale écossaise — dont le Festival Theatre — une programmation d'excellence en théâtre, opéra, danse et musique classique, confiée à des artistes de premier plan venus du monde entier.",
    genre: 'Arts de la scène', site: 'eif.co.uk' },
  { id: 'edinburgh-fringe', nom: 'Edinburgh Festival Fringe', ville: 'Édimbourg', pays: 'Écosse', region: 'Europe', periode: 'Août', moisNum: 8, depuis: '1947', img: 'Edinburgh Fringe 037.jpg',
    description: "Le plus grand festival des arts du spectacle au monde : des dizaines de milliers de représentations dans toute la ville.",
    detail: "Né en 1947 lorsque des compagnies non invitées se produisirent « en marge » (fringe) du festival officiel, l'Edinburgh Festival Fringe est devenu le plus grand festival des arts du spectacle au monde. Sans jury ni sélection, il offre chaque août des dizaines de milliers de représentations — théâtre, comédie, cabaret, danse — dans des centaines de lieux, des grandes salles aux arrière-salles de pubs. La ville tout entière se change en une gigantesque scène ouverte.",
    genre: 'Fringe / arts du spectacle', site: 'edfringe.com' },
  { id: 'bitef', nom: 'BITEF', ville: 'Belgrade', pays: 'Serbie', region: 'Europe', periode: 'Septembre', moisNum: 9, depuis: '1967', img: 'Panorama Belgrad.jpg',
    description: "Le Belgrade International Theatre Festival, vitrine historique des « nouvelles tendances » de la mise en scène.",
    detail: "Fondé en 1967, le BITEF (Belgrade International Theatre Festival) s'est bâti une réputation historique en accueillant, au cœur de l'Europe et par-delà le rideau de fer, les « nouvelles tendances » de la mise en scène. On y a découvert les grands noms de l'avant-garde scénique internationale, d'Est en Ouest. Chaque automne, il reste une vitrine exigeante de la recherche théâtrale et un symbole d'ouverture culturelle.",
    genre: 'Nouvelles tendances', site: 'bitef.rs' },
  { id: 'automne-paris', nom: 'Festival d\'Automne à Paris', ville: 'Paris', pays: 'France', region: 'Europe', periode: 'Septembre – décembre', moisNum: 9, depuis: '1972', img: 'Théâtre Sarah-Bernhardt 1.jpg',
    description: "Grand festival pluridisciplinaire de création contemporaine, disséminé dans les théâtres et musées de Paris et d'Île-de-France.",
    detail: "Créé en 1972 par Michel Guy, le Festival d'Automne à Paris n'a pas de lieu unique : de septembre à décembre, il se diffuse dans les théâtres, musées et salles de Paris et d'Île-de-France, en partenariat avec de nombreuses institutions. Pluridisciplinaire, il fait dialoguer théâtre, danse, musique et arts visuels, avec une fidélité aux grandes figures de la création contemporaine. C'est l'un des rendez-vous les plus prestigieux de la scène française.",
    genre: 'Création contemporaine', site: 'festival-automne.com' },
  { id: 'mess', nom: 'MESS', ville: 'Sarajevo', pays: 'Bosnie-Herzégovine', region: 'Europe', periode: 'Octobre', moisNum: 10, depuis: '1960', img: 'Sarajevo National Theatre.JPG',
    description: "L'un des plus anciens festivals de théâtre expérimental d'Europe, symbole de résistance culturelle.",
    detail: "Fondé en 1960, le MESS de Sarajevo est l'un des plus anciens festivals de théâtre expérimental d'Europe. Maintenu envers et contre tout — y compris durant le siège de la ville dans les années 1990 —, il est devenu un puissant symbole de résistance culturelle et de dignité par l'art. Chaque octobre, il présente des créations audacieuses venues des Balkans et du monde, fidèle à sa vocation de laboratoire et de lieu de rencontre.",
    genre: 'Théâtre expérimental', site: 'mess.ba' },
];
