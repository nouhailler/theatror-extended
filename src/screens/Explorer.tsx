import { useNavigate } from 'react-router-dom';
import { ScreenTitle } from '../components/ui';

const CARDS = [
  { titre: 'Encyclopédie', sub: 'Histoire, dramaturges, auteurs contemporains, mouvements, genres, métiers', to: '/explorer/encyclopedie' },
  { titre: 'Personnages célèbres', sub: 'Tartuffe, Cyrano, Antigone, Dom Juan, Figaro…', to: '/explorer/personnages' },
  { titre: 'Thèmes', sub: 'Le répertoire par sujet : pouvoir, exil, mémoire, révolte…', to: '/explorer/themes' },
  { titre: 'Frise chronologique', sub: "D'Eschyle à Ionesco — auteurs, œuvres, événements", to: '/explorer/frise' },
  { titre: 'Carte du monde', sub: 'Grands théâtres, festivals, traditions, écoles', to: '/explorer/carte' },
  { titre: 'Mode répétition', sub: 'Répétez votre rôle : l\'app lit les autres à voix haute', to: '/repetition' },
  { titre: "Exercices d'acteur", sub: 'Respiration, diction, impro, émotions, mémoire, écoute…', to: '/exercices' },
  { titre: 'Entraînement vocal', sub: 'Échauffement, placement, projection, virelangues, justesse', to: '/voix' },
  { titre: 'Mise en scène', sub: 'Plateau 2D : placez vos acteurs, décor et lumière', to: '/mise-en-scene' },
  { titre: 'Costumes', sub: 'Galerie historique : époque, pays, style, personnage', to: '/costumes' },
  { titre: 'Décors', sub: 'Bibliothèque : théâtre grec, palais, forêt, salon…', to: '/decors' },
  { titre: 'Accessoires', sub: 'Catalogue : armes, mobilier, objets anciens', to: '/accessoires' },
  { titre: 'Festivals', sub: 'Agenda mondial : Avignon, Édimbourg, Athènes…', to: '/festivals' },
  { titre: 'Podcasts & vidéos', sub: 'Ressources gratuites : Comédie-Française, France Culture, INA…', to: '/medias' },
  { titre: "Parcours d'apprentissage", sub: 'Un chemin par profil : débutant, comédien, metteur en scène…', to: '/parcours' },
  { titre: 'Collections thématiques', sub: 'Molière, tragédie classique, pièces courtes, jeune public…', to: '/explorer/collections' },
  { titre: 'Quiz', sub: 'Testez vos connaissances : auteurs, citations, chronologie', to: '/quiz' },
];

export default function Explorer() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Explorer">
      <ScreenTitle over="Découvrir">Explorer</ScreenTitle>

      {CARDS.map((c) => (
        <div key={c.titre} onClick={() => nav(c.to)} className="card card-16 card-tap" style={{ padding: 16 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 600 }}>{c.titre}</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 3 }}>{c.sub}</div>
        </div>
      ))}

      <div onClick={() => nav('/ia')} className="card-tap" style={{ background: 'linear-gradient(120deg,#2a1830,#1a1020)', border: '1px solid rgba(212,169,78,.4)', borderRadius: 12, padding: 16, cursor: 'pointer' }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Nouveau</div>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 600, marginTop: 2 }}>Mode IA</div>
        <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 3 }}>Assistant théâtre, générateur de scènes, distribution, analyse</div>
      </div>
    </div>
  );
}
