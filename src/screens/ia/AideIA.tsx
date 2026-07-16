import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../../components/ui';

// Documentation du Mode IA — pensée pour des comédiens, pas des informaticiens.
// On explique pas à pas ce que fait chaque outil et l'effet de chaque réglage.

function Section({ tag, titre, children }: { tag: string; titre: string; children: React.ReactNode }) {
  return (
    <section className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{tag}</div>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 700, marginTop: 2 }}>{titre}</div>
      </div>
      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-2b)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12.5, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold-chip-text)', marginTop: 2 }}>{children}</div>;
}

// Une ligne « choix → effet ».
function Step({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
      <span style={{ color: 'var(--gold)', flex: 'none' }}>▸</span>
      <span><strong style={{ color: 'var(--text)' }}>{label}</strong> — {children}</span>
    </div>
  );
}

export default function AideIA() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Aide Mode IA">
      <BackHeader to="/ia" title="Documentation du Mode IA" sub="Comment fonctionne chaque outil" />

      {/* Prérequis : la clé */}
      <Section tag="Avant de commencer" titre="Activer le Mode IA (la clé)">
        <div>
          Le Mode IA fait appel à <strong>OpenRouter</strong>, un service qui donne accès à des intelligences
          artificielles. Il faut une <strong>clé</strong> (gratuite) pour que ça fonctionne — sans elle, rien ne s'envoie.
        </div>
        <Sub>En 3 étapes</Sub>
        <Step label="1. Créez un compte">sur <em>openrouter.ai</em>, puis générez une clé (rubrique « Keys »).</Step>
        <Step label="2. Collez la clé">dans <strong>Réglages</strong> de l'application, et enregistrez.</Step>
        <Step label="3. Choisissez un modèle gratuit">dans Réglages (bouton « Charger les modèles gratuits »). La clé reste sur votre appareil, elle n'est jamais transmise à l'application.</Step>
        <div style={{ marginTop: 4 }}>
          <button onClick={() => nav('/reglages')} className="gold-btn" style={{ padding: '10px 18px', fontSize: 14.5 }}>Ouvrir les Réglages</button>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 2 }}>
          Bon à savoir : les modèles <strong>gratuits</strong> sont plus lents et limités (quotas). Pour les longues analyses,
          procédez par petits morceaux — chaque outil est conçu pour ça.
        </div>
      </Section>

      {/* Assistant */}
      <Section tag="Outil" titre="Assistant — poser une question">
        <div><strong>Ce que vous obtenez :</strong> une conversation libre sur le théâtre. Vous posez une question ou demandez un conseil, l'assistant répond, et vous pouvez enchaîner pour préciser.</div>
        <Sub>Comment s'en servir</Sub>
        <Step label="Écrivez votre question">ou touchez une suggestion proposée.</Step>
        <Step label="Enchaînez">« plus court », « donne-m'en un autre », « et pour une femme ? » — le fil de la conversation est gardé.</Step>
        <Sub>Exemples</Sub>
        <div style={{ fontStyle: 'italic', color: 'var(--text-2)' }}>« Explique-moi Le Misanthrope en quelques lignes. » · « Un monologue de femme contemporain pour une audition ? » · « Quelle différence entre une comédie et une farce ? »</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>À retenir : les réponses viennent de la culture générale du modèle, <strong>pas d'un texte précis</strong>. Pour analyser le vrai texte d'un rôle, utilisez « Mon rôle ».</div>
      </Section>

      {/* Mon rôle */}
      <Section tag="Outil" titre="Mon rôle — analyser votre personnage">
        <div><strong>Ce que vous obtenez :</strong> l'outil lit le <strong>texte intégral</strong> de votre personnage dans une pièce, et répond à des questions précises sur son rôle.</div>
        <Sub>Vos choix, un par un</Sub>
        <Step label="Pièce">parmi les pièces dont le texte intégral est disponible.</Step>
        <Step label="Votre personnage">la liste des rôles s'affiche, avec leur nombre de répliques.</Step>
        <Step label="Type d'analyse">
          <em>Repérer un sujet</em> → vous tapez un thème (ex. « son père », « la mort », « l'argent ») et vous obtenez
          <strong> toutes les scènes où votre personnage en parle</strong>, même à demi-mot, avec la <strong>citation exacte</strong> et la scène.
          {' · '}<em>Évolution émotionnelle</em> → l'<strong>arc émotionnel</strong> de votre rôle, scène par scène.
        </Step>
        <Step label="Portée">
          <strong>Un acte</strong> (recommandé) = une seule requête, rapide et fiable. <strong>Toute la pièce</strong> = beaucoup de requêtes
          à la suite — <strong>déconseillé avec un modèle gratuit</strong> (lent, peut se bloquer).
        </Step>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>À retenir : l'outil ne lit que <strong>vos</strong> répliques (pas celles des autres). Les citations sont vérifiables via « Lire le texte » sur la fiche de la pièce. L'IA peut se tromper — recoupez toujours.</div>
      </Section>

      {/* Générer */}
      <Section tag="Outil" titre="Générer — écrire un texte de théâtre">
        <div><strong>Ce que vous obtenez :</strong> une scène ou un monologue <strong>original et jouable</strong>, écrit sur mesure. Chaque réglage modifie le texte produit.</div>
        <Sub>Vos choix, un par un</Sub>
        <Step label="Type">la forme du texte : scène comique, dialogue, scène tragique, monologue, ou exercice d'impro.</Step>
        <Step label="Ton">le style : <em>libre</em>, <em>classique (vers)</em> (des alexandrins), <em>contemporain</em>, <em>absurde</em> ou <em>poétique</em>.</Step>
        <Step label="Longueur">court (≈ ½ page), moyen (≈ 1 page) ou long (≈ 2 pages).</Step>
        <Step label="À la manière de (optionnel)">un auteur — le texte imitera son style (ex. Molière, Feydeau).</Step>
        <Step label="Personnages (optionnel)">ex. « une reine, un fou du roi ». Laissé vide, l'IA les invente.</Step>
        <Step label="Consigne / thème (optionnel)">le sujet de la scène, ex. « une dispute sur un héritage qui tourne au comique ».</Step>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>Résultat au format scène (noms en majuscules, didascalies entre parenthèses). Vous pouvez le <strong>Copier</strong> ou l'<strong>ajouter au Journal</strong>.</div>
      </Section>

      {/* Distribution */}
      <Section tag="Outil" titre="Distribution — une pièce pour votre troupe">
        <div><strong>Ce que vous obtenez :</strong> des pièces du catalogue <strong>jouables avec votre effectif</strong>, sélectionnées et justifiées.</div>
        <Sub>Vos choix, un par un</Sub>
        <Step label="Comédiennes / Comédiens">votre effectif — l'app ne garde que les pièces dont la distribution tient dans ce nombre.</Step>
        <Step label="Niveau">filtre par difficulté (accessible, intermédiaire, exigeant).</Step>
        <Step label="Durée">durée maximale du spectacle.</Step>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>L'app filtre d'abord localement, puis l'IA choisit les <strong>3 pièces les plus adaptées</strong> avec une phrase de justification. Sans clé (ou si l'IA échoue), vous obtenez quand même la liste complète des pièces jouables.</div>
      </Section>

      {/* Analyse (bonus) */}
      <Section tag="Outil" titre="Analyse — décortiquer une pièce ou un extrait">
        <div><strong>Ce que vous obtenez :</strong> une analyse dramaturgique structurée (thèmes, personnages, structure, conflits, symboles, évolution).</div>
        <Sub>Deux sources possibles</Sub>
        <Step label="Coller un texte">une scène ou une tirade que vous collez → analyse de cet extrait précis.</Step>
        <Step label="Une pièce du catalogue">→ analyse fondée sur la <strong>connaissance de l'œuvre</strong> (résumé, distribution), pas sur le texte intégral (pour ça, c'est « Mon rôle »).</Step>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>Le résultat peut être ajouté au Journal.</div>
      </Section>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={() => nav('/ia')} className="gold-btn" style={{ padding: '11px 22px', fontSize: 15 }}>Revenir au Mode IA</button>
      </div>
    </div>
  );
}
