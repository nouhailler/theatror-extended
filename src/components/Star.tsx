import type { CSSProperties } from 'react';
import { useStore, type FavCategory } from '../store';

interface Props {
  cat: FavCategory;
  id: string;
  size?: number;
  /** Ombre portée (étoiles sur vignettes/héros). */
  shadow?: boolean;
  style?: CSSProperties;
}

/**
 * Étoile favori ☆/★. Le tap fait un toggle et n'entraîne PAS
 * la navigation de la carte parente (stopPropagation).
 */
export default function Star({ cat, id, size = 17, shadow, style }: Props) {
  const fav = useStore((s) => !!s.favs[`${cat}::${id}`]);
  const toggle = useStore((s) => s.toggleFav);

  return (
    <span
      role="button"
      aria-pressed={fav}
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      onClick={(e) => {
        e.stopPropagation();
        toggle(cat, id);
      }}
      style={{
        cursor: 'pointer',
        fontSize: size,
        lineHeight: 1,
        color: fav ? '#d4a94e' : 'rgba(242,233,220,.35)',
        textShadow: shadow ? '0 1px 4px rgba(0,0,0,.85)' : undefined,
        userSelect: 'none',
        ...style,
      }}
    >
      {fav ? '★' : '☆'}
    </span>
  );
}
