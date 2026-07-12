// Podcasts & vidéos — priorité 23. Annuaire curé de ressources gratuites (et
// parfois libres de droits) autour du théâtre. Pas d'agrégation en direct
// (offline/CSP/CORS) : liens vers les institutions, ouverts dans le navigateur.

export type MediaCategorie = 'Podcast' | 'Captation' | 'Conférence' | 'Interview' | 'Analyse' | 'Lecture';
export type MediaAcces = 'Gratuit' | 'Abonnement' | 'Mixte';

export interface Media {
  id: string;
  titre: string;
  source: string; // institution / chaîne
  categorie: MediaCategorie;
  acces: MediaAcces;
  description: string;
  url: string; // domaine institutionnel (lien réel, ouvert dans le navigateur)
}

export const MEDIA_COULEUR: Record<MediaCategorie, string> = {
  'Podcast': '#d4a94e',
  'Captation': '#9e2b3a',
  'Conférence': '#5f8ea8',
  'Interview': '#a85a72',
  'Analyse': '#8e9e5a',
  'Lecture': '#b0784a',
};

export const MEDIAS: Media[] = [
  // ─── Podcasts ───
  { id: 'cf-quelle-comedie', titre: 'Quelle Comédie !', source: 'Comédie-Française', categorie: 'Podcast', acces: 'Gratuit',
    description: "Le podcast de la Comédie-Française : interviews de comédiens, metteurs en scène, costumiers et scénographes, autour des spectacles.", url: 'https://www.comedie-francaise.fr/fr/podcasts' },
  { id: 'cf-entretien', titre: "L'Entretien", source: 'Comédie-Française', categorie: 'Podcast', acces: 'Gratuit',
    description: "De longues conversations avec les sociétaires de la troupe, sur leur parcours et leur art.", url: 'https://www.comedie-francaise.fr/fr/podcasts' },
  { id: 'fc-theatre', titre: 'Théâtre & arts de la scène', source: 'France Culture', categorie: 'Podcast', acces: 'Gratuit',
    description: "La plus riche source francophone : analyses de pièces, histoire du théâtre, biographies d'auteurs, débats et captations radiophoniques.", url: 'https://www.radiofrance.fr/franceculture/theatre' },
  { id: 'fc-nuits', titre: 'Les Nuits de France Culture', source: 'France Culture', categorie: 'Podcast', acces: 'Gratuit',
    description: "Un trésor d'archives : entretiens et émissions historiques sur les grands auteurs et metteurs en scène.", url: 'https://www.radiofrance.fr/franceculture/podcasts/les-nuits-de-france-culture' },
  { id: 'fc-bookclub', titre: 'Le Book Club', source: 'France Culture', categorie: 'Podcast', acces: 'Gratuit',
    description: "Lectures et conversations littéraires, souvent autour du théâtre et de ses grandes voix.", url: 'https://www.radiofrance.fr/franceculture/podcasts/le-book-club' },
  { id: 'inter-theatre', titre: 'Émissions théâtre', source: 'France Inter', categorie: 'Podcast', acces: 'Gratuit',
    description: "Nombreuses émissions sur Molière, Racine, Hugo, Tchekhov, Shakespeare, Mnouchkine ou Pommerat, disponibles plusieurs années.", url: 'https://www.radiofrance.fr/franceinter' },

  // ─── Captations ───
  { id: 'ina-madelen', titre: 'Madelen (INA)', source: 'INA', categorie: 'Captation', acces: 'Abonnement',
    description: "Plus d'une centaine de captations de la Comédie-Française et une immense collection d'archives télévisées du spectacle.", url: 'https://madelen.ina.fr' },
  { id: 'ina', titre: 'INA.fr', source: 'INA', categorie: 'Captation', acces: 'Mixte',
    description: "Archives audiovisuelles : spectacles, répétitions, interviews et émissions culturelles ; une partie est en accès libre.", url: 'https://www.ina.fr' },
  { id: 'francetv', titre: 'Culturebox / France.tv', source: 'France Télévisions', categorie: 'Captation', acces: 'Gratuit',
    description: "Captations de la Comédie-Française, du Châtelet, du Festival d'Avignon, opéras et ballets, souvent en replay plusieurs mois.", url: 'https://www.france.tv/spectacles-et-culture' },
  { id: 'arte-spectacles', titre: 'Spectacles et concerts', source: 'ARTE', categorie: 'Captation', acces: 'Gratuit',
    description: "Spectacles complets, documentaires et portraits de metteurs en scène ; disponibles gratuitement plusieurs mois.", url: 'https://www.arte.tv/fr/videos/spectacles-et-concerts/' },
  { id: 'cf-youtube', titre: 'Chaîne Comédie-Française', source: 'Comédie-Française (YouTube)', categorie: 'Captation', acces: 'Gratuit',
    description: "Extraits, bandes-annonces, répétitions, conférences et podcasts vidéo de la Maison de Molière.", url: 'https://www.youtube.com/@comediefrancaise' },

  // ─── Conférences ───
  { id: 'college-de-france', titre: 'Cours et conférences', source: 'Collège de France', categorie: 'Conférence', acces: 'Gratuit',
    description: "Cours magistraux en accès libre sur la littérature dramatique, la poétique et l'histoire du théâtre.", url: 'https://www.college-de-france.fr' },
  { id: 'bnf', titre: 'Conférences & expositions', source: 'BnF', categorie: 'Conférence', acces: 'Gratuit',
    description: "La Bibliothèque nationale de France met en ligne conférences, dossiers pédagogiques et ressources sur le théâtre.", url: 'https://www.bnf.fr' },
  { id: 'canal-u', titre: 'Canal-U', source: 'Enseignement supérieur', categorie: 'Conférence', acces: 'Gratuit',
    description: "La vidéothèque de l'enseignement supérieur : cours et conférences universitaires, dont l'analyse dramaturgique.", url: 'https://www.canal-u.tv' },
  { id: 'avignon-rencontres', titre: "Rencontres & masterclass", source: "Festival d'Avignon", categorie: 'Conférence', acces: 'Gratuit',
    description: "Tables rondes, ateliers de la pensée et rencontres publiques captés chaque été au Festival d'Avignon.", url: 'https://festival-avignon.com' },

  // ─── Interviews ───
  { id: 'theatre-ville', titre: 'Rencontres & entretiens', source: 'Théâtre de la Ville', categorie: 'Interview', acces: 'Gratuit',
    description: "Entretiens avec metteurs en scène, dramaturges et acteurs autour de la programmation.", url: 'https://www.theatredelaville-paris.com' },
  { id: 'odeon', titre: "Paroles d'artistes", source: 'Odéon – Théâtre de l\'Europe', categorie: 'Interview', acces: 'Gratuit',
    description: "Entretiens, bords de scène et ressources autour des créations de l'Odéon.", url: 'https://www.theatre-odeon.eu' },
  { id: 'tns', titre: 'Ressources & entretiens', source: 'Théâtre National de Strasbourg', categorie: 'Interview', acces: 'Gratuit',
    description: "Le TNS publie entretiens, cahiers et captations autour de ses spectacles et de son école.", url: 'https://www.tns.fr' },

  // ─── Analyses ───
  { id: 'bnf-classes', titre: 'Dossiers pédagogiques', source: 'BnF – Les Essentiels', categorie: 'Analyse', acces: 'Gratuit',
    description: "Analyses d'œuvres et dossiers sur les grands auteurs dramatiques (Molière, Racine, Hugo, Beaumarchais…).", url: 'https://gallica.bnf.fr' },
  { id: 'theatre-contemporain', titre: 'Théâtre-contemporain.net', source: 'CNT / theatre-contemporain.net', categorie: 'Analyse', acces: 'Gratuit',
    description: "Base de référence : dossiers, captations, entretiens et analyses sur le théâtre contemporain.", url: 'https://www.theatre-contemporain.net' },
  { id: 'ens-savoirs', titre: 'Savoirs ENS', source: 'École normale supérieure', categorie: 'Analyse', acces: 'Gratuit',
    description: "Conférences et analyses universitaires en accès libre (Phèdre, Le Cid, Dom Juan, Tchekhov, Beckett…).", url: 'https://savoirs.ens.fr' },

  // ─── Lectures ───
  { id: 'fc-fictions', titre: 'Fictions & lectures', source: 'France Culture', categorie: 'Lecture', acces: 'Gratuit',
    description: "Lectures et dramatiques radiophoniques de textes classiques par de grands interprètes.", url: 'https://www.radiofrance.fr/franceculture/podcasts/fictions-theatre-et-cie' },
  { id: 'cf-lectures', titre: 'Lectures des acteurs', source: 'Comédie-Française', categorie: 'Lecture', acces: 'Gratuit',
    description: "Textes classiques lus par les comédiens de la troupe (Le Cid, Britannicus, Le Malade imaginaire…).", url: 'https://www.comedie-francaise.fr/fr/podcasts' },
  { id: 'litterature-audio', titre: 'Littérature audio', source: 'litteratureaudio.com', categorie: 'Lecture', acces: 'Gratuit',
    description: "Livres audio bénévoles et libres de droits : de nombreuses pièces du domaine public à écouter.", url: 'https://www.litteratureaudio.com' },
];
