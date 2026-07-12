import { PIECES } from '../data/pieces';
import { DRAMATURGES } from '../data/dramaturges';
import { MONOLOGUES } from '../data/content';
import { PERSONNAGES } from '../data/characters';

/** Résumé compact du catalogue (une ligne par pièce) pour ancrer les réponses. */
export function catalogueContext(): string {
  const lignes = PIECES.map(
    (p) =>
      `- id:${p.id} | ${p.titre} | ${p.auteur} | ${p.annee} | ${p.genre} | ${p.epoque} | ${p.femmes}F/${p.hommes}H | ${p.duree} | diff ${p.difficulte}/4${p.pourEnfants ? ' | enfants' : ''}`,
  );
  const auteurs = DRAMATURGES.map((d) => `${d.nom} (${d.dates})`).join(', ');
  return `CATALOGUE DES PIÈCES (${PIECES.length} titres, toutes du domaine public) :\n${lignes.join('\n')}\n\nDRAMATURGES : ${auteurs}.`;
}

/** Personnages détaillés disponibles dans l'app (fiches). */
export function personnagesContext(): string {
  const lignes = PERSONNAGES.map((c) => `- ${c.nom} | ${c.piece} (${c.auteur}) | ${c.emploi}`);
  return `PERSONNAGES AVEC FICHE (${PERSONNAGES.length}) :\n${lignes.join('\n')}`;
}

/** Monologues disponibles (atelier Scène), pour les recommandations d'audition. */
export function monologuesContext(): string {
  const lignes = MONOLOGUES.map(
    (m) => `- ${m.titre} | ${m.source} | ${m.pour}${m.age ? '/' + m.age : ''} | ${m.duree} | ${m.niveau} | ${m.emotion} | ${m.epoque}`,
  );
  return `MONOLOGUES DISPONIBLES (${MONOLOGUES.length}) :\n${lignes.join('\n')}`;
}

/** Prompt système : expert théâtre francophone, concis, ancré sur le contenu de l'app. */
export function assistantSystemPrompt(): string {
  return [
    "Tu es l'assistant de Theathror, une application pour comédiens et passionnés de théâtre.",
    'Tu es un expert du théâtre (histoire, dramaturgie, jeu, répertoire francophone et international).',
    'Réponds en français, de façon précise, chaleureuse et concise (pas de remplissage).',
    "Quand tu recommandes des pièces, des personnages ou des monologues, appuie-toi EN PRIORITÉ sur les listes fournies ci-dessous et cite les titres/noms EXACTS.",
    "Pour une audition ou un travail de rôle, propose des monologues de la liste en respectant le genre (Femme/Homme), l'âge, la durée et le niveau demandés.",
    'Utilise des listes courtes quand c\'est utile. Évite le jargon inutile.',
    '',
    catalogueContext(),
    '',
    personnagesContext(),
    '',
    monologuesContext(),
  ].join('\n');
}
