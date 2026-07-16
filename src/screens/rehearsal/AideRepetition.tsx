import { useParams, useNavigate } from 'react-router-dom';
import { BackHeader } from '../../components/ui';

// Documentation du mode Répétition — pensée pour des comédiens, pas des
// informaticiens. On explique chaque réglage et surtout les cartes de
// mémorisation, avec des exemples tirés du Misanthrope.

function Section({ tag, titre, children }: { tag: string; titre: string; children: React.ReactNode }) {
  return (
    <section className="card card-16" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>{tag}</div>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 19, fontWeight: 700, marginTop: 2 }}>{titre}</div>
      </div>
      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-2b)', display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </section>
  );
}
function Sub({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12.5, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold-chip-text)', marginTop: 2 }}>{children}</div>;
}
function Step({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
      <span style={{ color: 'var(--gold)', flex: 'none' }}>▸</span>
      <span><strong style={{ color: 'var(--text)' }}>{label}</strong> — {children}</span>
    </div>
  );
}
function Ex({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 13.5, color: 'var(--text-2)', fontStyle: 'italic', borderLeft: '2px solid var(--gold)', paddingLeft: 10, margin: '2px 0' }}>{children}</div>;
}

export default function AideRepetition() {
  const { id } = useParams();
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 28px' }} data-screen-label="Aide Répétition">
      <BackHeader to={id ? `/repetition/${id}/config` : '/repetition'} title="Documentation — Répétition" sub="Comment régler et mémoriser votre rôle" />

      <Section tag="Cet écran" titre="Configurer votre session">
        <div>
          L'écran <strong>Configuration</strong> prépare la répétition d'une pièce : vous choisissez votre rôle,
          la voix des autres personnages, la vitesse, et deux réglages importants — <strong>Didascalies</strong> et
          <strong> Mes répliques</strong>. Ensuite, deux façons de travailler : <strong>Commencer la lecture</strong>
          (l'app lit les autres à voix haute, vous répondez) ou <strong>Mémoriser mon rôle (cartes)</strong>.
        </div>
        <Step label="Mon rôle">le personnage que vous jouez (ex. Alceste dans Le Misanthrope). Tout le reste s'y adapte.</Step>
        <Step label="Voix / Vitesse / Volume">comment l'app lit les autres personnages à voix haute.</Step>
      </Section>

      <Section tag="Réglage" titre="Didascalies">
        <div>Les <strong>didascalies</strong> sont les indications de mise en scène (ex. « <em>se levant brusquement</em> »). Vous décidez de leur sort pendant la lecture :</div>
        <Step label="Lire">la voix les lit aussi à voix haute, avec le dialogue.</Step>
        <Step label="Afficher">elles s'affichent à l'écran mais ne sont pas lues.</Step>
        <Step label="Ignorer">elles disparaissent — lecture épurée, dialogue seul.</Step>
        <Ex>Le Misanthrope, acte I : « ALCESTE, <em>se levant brusquement.</em> Moi, votre ami ? » En mode <strong>Lire</strong>, la voix annonce le geste ; en <strong>Afficher</strong>, vous le voyez ; en <strong>Ignorer</strong>, on passe droit à « Moi, votre ami ? ».</Ex>
      </Section>

      <Section tag="Réglage" titre="Mes répliques">
        <div>Ce réglage décide <strong>ce qui se passe quand arrive VOTRE réplique</strong> pendant la lecture à voix haute :</div>
        <Step label="Pause manuelle">l'app s'arrête et <strong>attend que vous touchiez l'écran</strong> une fois votre texte dit. Le plus fiable.</Step>
        <Step label="Chronométré">pause <strong>estimée</strong> d'après la longueur de la réplique, puis la lecture repart seule (un bouton permet de passer avant la fin).</Step>
        <Step label="Masqué">votre réplique est <strong>cachée</strong> pendant la pause — pour tester votre mémoire — avec un bouton « révéler ».</Step>
        <Ex>Vous jouez Alceste : à chaque réplique d'Alceste, la lecture des autres s'interrompt selon le mode choisi, le temps que vous la disiez.</Ex>
      </Section>

      <Section tag="⭐ L'outil clé" titre="Mémoriser mon rôle (cartes)">
        <div>
          Sous « Commencer la lecture », le bouton <strong>🎴 Mémoriser mon rôle (cartes)</strong> ouvre un entraînement
          type <strong>Anki</strong> adapté au théâtre : <strong>une carte par réplique</strong> de votre rôle. Vous récitez
          de tête, vous touchez <strong>Révéler</strong>, puis vous vous auto-évaluez. Choisissez le mode en haut de l'écran.
        </div>

        <Sub>Mode Ping-Pong</Sub>
        <div>Recto = <strong>la fin de la réplique du partenaire</strong> (celle juste avant la vôtre). À vous de dire la suite. « Révéler » montre votre réplique exacte.</div>
        <Ex>PHILINTE : « …Mais encor, dites-moi, quelle bizarrerie… » → <strong>Révéler</strong> → ALCESTE : « Laissez-moi là, vous dis-je, et courez vous cacher. »</Ex>

        <Sub>Mode Trous</Sub>
        <div>Votre réplique s'affiche avec des <strong>mots masqués</strong> (densité <em>Facile / Moyen / Difficile</em>). « Révéler » remplit les trous en or. L'outil <strong>re-masque en priorité les mots que vous ratez</strong>.</div>
        <Ex>« Moi, je <span style={{ borderBottom: '1.5px solid var(--gold)' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span> me fâcher, et ne <span style={{ borderBottom: '1.5px solid var(--gold)' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span> point entendre. » → <strong>Révéler</strong> → « Moi, je <strong style={{ color: 'var(--gold)' }}>veux</strong> me fâcher, et ne <strong style={{ color: 'var(--gold)' }}>veux</strong> point entendre. »</Ex>

        <Sub>Mode Indice</Sub>
        <div>Recto = <strong>l'indice de mise en scène</strong> (acte, scène, didascalie). « Révéler » donne <strong>l'amorce</strong> de votre réplique pour retrouver le fil (avec « Voir toute la réplique »).</div>
        <Ex>« Acte I · Scène première » → <strong>Révéler</strong> → « Que la plaisanterie est de mauvaise grâce !… »</Ex>

        <Sub>Révéler & s'auto-évaluer</Sub>
        <div>Après <strong>Révéler</strong>, trois boutons : <strong>À revoir</strong> (la carte revient plus tard), <strong>Presque</strong>, <strong>Su</strong> (acquise). Les répliques faibles <strong>reviennent en priorité</strong>, y compris d'une séance à l'autre (révision espacée). Rien ne quitte votre appareil.</div>

        <Sub>Les compteurs</Sub>
        <Step label="« 0/200 sues »">le nombre de répliques marquées <strong>Su</strong> sur le total de votre rôle (Alceste a <strong>200</strong> répliques dans Le Misanthrope). Il grimpe au fil de vos « Su ».</Step>
        <Step label="« carte 1/200 »">où vous en êtes dans la <strong>séance en cours</strong> (carte courante / cartes à voir). Ce total <strong>augmente</strong> quand vous mettez « À revoir » — la carte est remise dans la file.</Step>
      </Section>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => nav(id ? `/repetition/${id}/config` : '/repetition')} className="gold-btn" style={{ padding: '11px 22px', fontSize: 15 }}>Revenir à la configuration</button>
      </div>
    </div>
  );
}
