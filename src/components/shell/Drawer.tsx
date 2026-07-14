import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';

interface Item {
  label: string;
  note?: string;
  soon?: boolean;
  onGo?: () => void;
}
interface Group {
  titre: string;
  items: Item[];
}

export default function Drawer() {
  const open = useStore((s) => s.menuOpen);
  const close = useStore((s) => s.closeMenu);
  const startTour = useStore((s) => s.startTour);
  const onbReplay = useStore((s) => s.onbReplay);
  const openHelp = useStore((s) => s.openHelp);
  const nav = useNavigate();

  if (!open) return null;

  const go = (path: string) => () => {
    close();
    nav(path);
  };

  const groups: Group[] = [
    {
      titre: 'Découvrir',
      items: [
        { label: 'Accueil', onGo: go('/') },
        { label: 'Pièces & filtres', onGo: go('/pieces') },
        { label: 'Encyclopédie', onGo: go('/explorer/encyclopedie') },
        { label: 'Personnages célèbres', onGo: go('/explorer/personnages') },
        { label: 'Fiche dramaturge', note: 'ex. Molière', onGo: go('/explorer/dramaturge/moliere') },
        { label: 'Frise chronologique', onGo: go('/explorer/frise') },
        { label: 'Carte du monde', onGo: go('/explorer/carte') },
        { label: 'Collections thématiques', onGo: go('/explorer/collections') },
        { label: 'Quiz', onGo: go('/quiz') },
      ],
    },
    {
      titre: "L'atelier",
      items: [
        { label: 'Monologues', onGo: go('/scene?seg=mono') },
        { label: 'Citations', onGo: go('/scene?seg=cit') },
        { label: 'Glossaire', onGo: go('/scene?seg=glos') },
        { label: 'Mode répétition', note: 'lecture vocale', onGo: go('/repetition') },
        { label: "Exercices d'acteur", onGo: go('/exercices') },
        { label: 'Voix & diction', onGo: go('/voix') },
        { label: 'Parcours', onGo: go('/parcours') },
        { label: 'Médias', note: 'podcasts, vidéos', onGo: go('/medias') },
        { label: 'Mode IA', note: 'assistant', onGo: go('/ia') },
      ],
    },
    {
      titre: 'Scène & spectacle',
      items: [
        { label: 'Mise en scène', note: 'plateau', onGo: go('/mise-en-scene') },
        { label: 'Costumes', onGo: go('/costumes') },
        { label: 'Décors', onGo: go('/decors') },
        { label: 'Accessoires', onGo: go('/accessoires') },
        { label: 'Festivals', onGo: go('/festivals') },
      ],
    },
    {
      titre: 'Personnel',
      items: [
        { label: 'Ma collection', note: 'favoris', onGo: go('/collection') },
        { label: 'Journal du comédien', onGo: go('/journal') },
      ],
    },
    {
      titre: 'Aide',
      items: [
        { label: 'Aide de cet écran', note: '?', onGo: () => { close(); openHelp(); } },
        { label: 'Mode démo', note: 'visite guidée', onGo: () => { close(); startTour(); } },
        { label: "Revoir l'introduction", onGo: () => { onbReplay(); } },
        { label: 'Réglages', onGo: go('/reglages') },
      ],
    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex' }}>
      <aside
        style={{
          width: 288,
          maxWidth: '82%',
          background: 'var(--bg-drawer)',
          borderRight: '1px solid rgba(212,169,78,.3)',
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 0 24px',
          boxShadow: 'var(--sh-drawer)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px 13px',
            borderBottom: '1px solid rgba(212,169,78,.15)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
              THEATHROR
            </div>
            <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: 'var(--gold)', marginTop: 2 }}>
              Toutes les sections
            </div>
          </div>
          <button onClick={close} aria-label="Fermer le menu"
            style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: 22, lineHeight: 1, background: 'none', border: 'none' }}>
            ×
          </button>
        </div>

        {groups.map((g) => (
          <div key={g.titre}>
            <div style={{ padding: '16px 18px 5px', fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>
              {g.titre}
            </div>
            {g.items.map((i) => (
              <div
                key={i.label}
                onClick={i.soon ? undefined : i.onGo}
                className={i.soon ? undefined : 'drawer-item'}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '8px 18px',
                  cursor: i.soon ? 'default' : 'pointer',
                  color: i.soon ? 'var(--text-disabled)' : 'var(--text)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 16.5 }}>{i.label}</span>
                {(i.note || i.soon) && (
                  <span style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--text-drawer-note)', whiteSpace: 'nowrap' }}>
                    {i.soon ? 'bientôt' : i.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </aside>
      <div onClick={close} style={{ flex: 1, background: 'rgba(0,0,0,.55)' }} />
    </div>
  );
}
