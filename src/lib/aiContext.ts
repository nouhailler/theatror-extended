import { PIECES } from '../data/pieces';
import { DRAMATURGES } from '../data/dramaturges';

/** Résumé compact du catalogue (une ligne par pièce) pour ancrer les réponses. */
export function catalogueContext(): string {
  const lignes = PIECES.map(
    (p) =>
      `- id:${p.id} | ${p.titre} | ${p.auteur} | ${p.annee} | ${p.genre} | ${p.femmes}F/${p.hommes}H | ${p.duree} | diff ${p.difficulte}/4${p.pourEnfants ? ' | enfants' : ''}${p.domainePublic ? ' | domaine public' : ''}`,
  );
  const auteurs = DRAMATURGES.map((d) => `${d.nom} (${d.dates})`).join(', ');
  return `CATALOGUE DES PIÈCES (${PIECES.length} titres, toutes du domaine public) :\n${lignes.join('\n')}\n\nDRAMATURGES : ${auteurs}.`;
}

/** Prompt système : expert théâtre francophone, concis, ancré sur le catalogue. */
export function assistantSystemPrompt(): string {
  return [
    "Tu es l'assistant de Theathror, une application pour comédiens et passionnés de théâtre.",
    'Tu es un expert du théâtre (histoire, dramaturgie, jeu, répertoire francophone et international).',
    'Réponds en français, de façon précise, chaleureuse et concise (pas de remplissage).',
    "Quand tu recommandes des pièces, appuie-toi EN PRIORITÉ sur le catalogue fourni et cite les titres exacts.",
    'Utilise des listes courtes quand c\'est utile. Évite le jargon inutile.',
    '',
    catalogueContext(),
  ].join('\n');
}
