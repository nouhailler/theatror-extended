// Parcours d'apprentissage — priorité 25. Par profil : une suite d'étapes qui
// renvoient vers les écrans déjà construits de l'app. La synthèse de Theathror.

export interface Etape { titre: string; txt: string; to: string }
export interface Parcours {
  id: string;
  profil: string;
  emoji: string;
  sous: string; // accroche
  description: string;
  etapes: Etape[];
}

export const PARCOURS: Parcours[] = [
  {
    id: 'debutant', profil: 'Débutant', emoji: '🌱', sous: 'Découvrir le théâtre',
    description: "Une première approche en douceur : l'histoire, les grandes figures et le plaisir de la découverte.",
    etapes: [
      { titre: "Explorer l'encyclopédie", txt: 'Histoire, mouvements, genres et métiers du théâtre.', to: '/explorer/encyclopedie' },
      { titre: 'Remonter la frise du temps', txt: "D'Eschyle à Beckett : auteurs, œuvres et grands événements.", to: '/explorer/frise' },
      { titre: 'Rencontrer les personnages célèbres', txt: 'Tartuffe, Cyrano, Antigone, Dom Juan…', to: '/explorer/personnages' },
      { titre: 'Savourer des citations', txt: 'Les plus belles répliques, classées par thème.', to: '/scene?seg=cit' },
      { titre: 'Écouter des podcasts', txt: 'Comédie-Française, France Culture, INA…', to: '/medias' },
      { titre: 'Tester ses connaissances', txt: 'Un quiz au niveau Facile pour commencer.', to: '/quiz' },
    ],
  },
  {
    id: 'amateur', profil: 'Amateur', emoji: '🎭', sous: 'Pratiquer pour le plaisir',
    description: "Vous montez sur les planches en amateur : de quoi vous échauffer, choisir un texte et progresser.",
    etapes: [
      { titre: 'Choisir une pièce courte', txt: 'Filtrez le répertoire par durée et nombre de rôles.', to: '/pieces' },
      { titre: 'Premiers exercices', txt: 'Respiration, concentration, écoute.', to: '/exercices' },
      { titre: 'Échauffer la voix', txt: 'Sirènes, virelangues, projection.', to: '/voix' },
      { titre: 'Travailler un monologue', txt: 'Filtrez par genre, durée et niveau.', to: '/scene?seg=mono' },
      { titre: 'Le vocabulaire du théâtre', txt: 'Aparté, didascalie, tirade… le glossaire.', to: '/scene?seg=glos' },
      { titre: 'Se tester en s\'amusant', txt: 'Un quiz pour jauger ses progrès.', to: '/quiz' },
    ],
  },
  {
    id: 'etudiant', profil: 'Étudiant', emoji: '🎓', sous: 'Étudier et analyser',
    description: "Pour les études : lire, situer, analyser et réviser le répertoire et son histoire.",
    etapes: [
      { titre: 'Explorer le répertoire', txt: 'Genres, époques, distributions — 317 pièces.', to: '/pieces' },
      { titre: 'Étudier les dramaturges', txt: 'Fiches, styles, chronologies, influences.', to: '/explorer/encyclopedie' },
      { titre: 'Lire un texte intégral', txt: 'Le texte hors-ligne, avec lecture interactive.', to: '/pieces' },
      { titre: 'Analyser une pièce (IA)', txt: 'Thèmes, structure, conflits, symboles.', to: '/ia?outil=analyse' },
      { titre: 'Situer dans le temps', txt: 'Frise des œuvres, styles et événements.', to: '/explorer/frise' },
      { titre: 'Réviser au niveau Difficile', txt: 'Quiz auteurs, dates, citations, personnages.', to: '/quiz' },
    ],
  },
  {
    id: 'professeur', profil: 'Professeur', emoji: '📚', sous: 'Enseigner le théâtre',
    description: "Des ressources pour préparer un cours, un atelier ou une sortie : sélections, exercices et évaluation.",
    etapes: [
      { titre: 'Composer une collection', txt: 'Regroupez des œuvres par thème pour la classe.', to: '/explorer/collections' },
      { titre: 'Ressources et analyses', txt: 'Conférences, captations, dossiers pédagogiques.', to: '/medias' },
      { titre: 'Le glossaire de référence', txt: 'Les termes clés à transmettre.', to: '/scene?seg=glos' },
      { titre: 'Exercices pour la classe', txt: 'Concentration, improvisation, émotions.', to: '/exercices' },
      { titre: 'Histoire des costumes', txt: 'Époques, pays, styles — support visuel.', to: '/costumes' },
      { titre: 'Évaluer par le jeu', txt: 'Un quiz à adapter au niveau des élèves.', to: '/quiz' },
    ],
  },
  {
    id: 'metteur-en-scene', profil: 'Metteur en scène', emoji: '🎬', sous: 'Monter un spectacle',
    description: "De la lecture au plateau : choisir la pièce, penser les personnages, l'espace, les costumes et les objets.",
    etapes: [
      { titre: 'Choisir la pièce', txt: 'Selon la distribution (F/H), la durée, le décor.', to: '/pieces' },
      { titre: 'Analyser les personnages', txt: 'Psychologie, évolution, scènes clés.', to: '/explorer/personnages' },
      { titre: 'Composer le plateau', txt: 'Placez les acteurs, le décor et la lumière.', to: '/mise-en-scene' },
      { titre: 'Choisir un décor', txt: 'Bibliothèque de décors et leurs usages.', to: '/decors' },
      { titre: 'Habiller les rôles', txt: 'Galerie historique des costumes.', to: '/costumes' },
      { titre: 'Les accessoires', txt: 'Armes, mobilier, objets emblématiques.', to: '/accessoires' },
      { titre: 'Générer une variante (IA)', txt: 'Dialogue, scène, à la manière d\'un auteur.', to: '/ia?outil=generer' },
    ],
  },
  {
    id: 'comedien', profil: 'Comédien', emoji: '🎙️', sous: 'Préparer un rôle',
    description: "Le travail de l'acteur : le corps, la voix, le texte et le suivi de sa progression.",
    etapes: [
      { titre: 'Le corps et le souffle', txt: 'Respiration, posture, ancrage, relâchement.', to: '/exercices' },
      { titre: "S'échauffer vocalement", txt: 'Placement, résonateurs, projection.', to: '/voix' },
      { titre: 'Choisir un monologue', txt: "Pour une audition : genre, âge, durée, émotion.", to: '/scene?seg=mono' },
      { titre: 'Lire le texte à voix haute', txt: 'Lecture interactive, personnages cliquables.', to: '/pieces' },
      { titre: "L'assistant de rôle (IA)", txt: 'Poser des questions, comparer, approfondir.', to: '/ia' },
      { titre: 'Tenir son carnet de bord', txt: 'Répétitions, progrès, idées, difficultés.', to: '/journal' },
    ],
  },
];
