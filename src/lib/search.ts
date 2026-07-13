// Index de recherche global : agrège tous les contenus de l'application en
// entrées { label, sous-titre, type, route } pour la barre de recherche d'accueil.
import { PIECES } from '../data/pieces';
import { DRAMATURGES } from '../data/dramaturges';
import { PERSONNAGES as CHARACTERS } from '../data/characters';
import { ARTICLES } from '../data/encyclopedie';
import { LIEUX, MONOLOGUES, COLLECTIONS, GLOSSAIRE } from '../data/content';
import { COSTUMES } from '../data/costumes';
import { DECORS } from '../data/decors';
import { ACCESSOIRES } from '../data/accessoires';
import { FESTIVALS } from '../data/festivals';
import { EXERCICES } from '../data/exercices';
import { EXERCICES_VOCAUX } from '../data/voix';

export interface SearchHit {
  label: string;
  sub: string;
  type: string;
  route: string;
  /** true si le lien mène à l'élément précis, false si à la section qui le contient. */
  direct: boolean;
}
interface Entry extends SearchHit { hay: string; }

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const LIEU_TYPE: Record<string, string> = { theatre: 'Théâtre', festival: 'Festival', tradition: 'Tradition', ecole: 'École' };

function build(): Entry[] {
  const e: Entry[] = [];
  const push = (label: string, sub: string, type: string, route: string, direct: boolean, extra = '') =>
    e.push({ label, sub, type, route, direct, hay: norm(`${label} ${sub} ${extra}`) });

  (PIECES as any[]).forEach((p) => push(p.titre, p.auteur ?? '', 'Pièce', `/pieces/${p.id}`, true, `${p.genre ?? ''} ${p.annee ?? ''}`));
  (DRAMATURGES as any[]).forEach((d) => push(d.nom, d.dates ?? '', d.categorie === 'Auteurs contemporains' ? 'Auteur contemp.' : 'Dramaturge', `/explorer/dramaturge/${d.id}`, true, `${d.nomComplet ?? ''} ${(d.themes ?? []).join(' ')}`));
  (CHARACTERS as any[]).forEach((c) => push(c.nom, c.piece ?? '', 'Personnage', `/explorer/personnage/${c.id}`, true, `${c.auteur ?? ''} ${(c.aka ?? []).join(' ')} ${c.emploi ?? ''}`));
  (ARTICLES as any[]).forEach((a) => push(a.titre, a.categorie, 'Encyclopédie', `/explorer/article/${a.id}`, true, a.soustitre ?? ''));
  (MONOLOGUES as any[]).forEach((m) => push(m.titre, m.source ?? '', 'Monologue', `/scene?seg=mono&focus=${m.id}`, true, `${m.extrait ?? ''} ${m.pour ?? ''}`));
  (COLLECTIONS as any[]).forEach((c) => push(c.titre, c.nb ?? '', 'Collection', `/explorer/collections/${c.id}`, true));
  (LIEUX as any[]).forEach((l) => push(l.nom, l.lieu ?? '', LIEU_TYPE[l.type] ?? 'Lieu', '/explorer/carte', false, l.txt ?? ''));
  (COSTUMES as any[]).forEach((c) => push(c.nom, c.epoque, 'Costume', '/costumes', false, `${c.pays ?? ''} ${c.personnages ?? ''} ${(c.elements ?? []).join(' ')}`));
  (DECORS as any[]).forEach((d) => push(d.nom, d.categorie ?? '', 'Décor', '/decors', false, d.description ?? ''));
  (ACCESSOIRES as any[]).forEach((a) => push(a.nom, a.categorie ?? '', 'Accessoire', '/accessoires', false, `${a.epoque ?? ''} ${a.description ?? ''}`));
  (FESTIVALS as any[]).forEach((f) => push(f.nom, [f.ville, f.pays].filter(Boolean).join(' · '), 'Festival', '/festivals', false, `${f.periode ?? ''} ${f.region ?? ''}`));
  (EXERCICES as any[]).forEach((x) => push(x.titre, x.categorie, 'Exercice', '/exercices', false, x.objectif ?? ''));
  (EXERCICES_VOCAUX as any[]).forEach((x) => push(x.titre, x.categorie, 'Voix', '/voix', false, x.objectif ?? ''));
  (GLOSSAIRE as any[]).forEach((g) => push(g.terme, g.cat ?? '', 'Glossaire', '/scene?seg=glos', false, g.def ?? ''));
  return e;
}

const INDEX = build();

/** Recherche multi-termes (tous les termes doivent apparaître). Résultats triés par pertinence. */
export function searchAll(q: string, limit = 40): SearchHit[] {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const out: { it: Entry; score: number }[] = [];
  for (const it of INDEX) {
    const labN = norm(it.label);
    let ok = true;
    let score = 0;
    for (const t of terms) {
      if (it.hay.indexOf(t) < 0) { ok = false; break; }
      if (labN.includes(t)) score += 3;        // match dans le titre : prioritaire
      if (labN.startsWith(t)) score += 4;       // début du titre
    }
    if (!ok) continue;
    if (terms.every((t) => labN.includes(t))) score += 5; // tout dans le titre
    if (it.direct) score += 1;                             // léger bonus lien direct
    out.push({ it, score });
  }
  out.sort((a, b) => b.score - a.score || a.it.label.length - b.it.label.length);
  return out.slice(0, limit).map(({ it }) => ({ label: it.label, sub: it.sub, type: it.type, route: it.route, direct: it.direct }));
}
