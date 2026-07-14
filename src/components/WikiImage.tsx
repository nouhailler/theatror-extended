import { useState, type CSSProperties } from 'react';
import { wiki } from '../lib/wikimedia';

interface Props {
  /** Nom de fichier Wikimedia (sans URL). Vide → repli seul. */
  file?: string;
  /** Initiale affichée en repli (Playfair or translucide). */
  initial: string;
  /** Taille de l'initiale de repli. */
  initialSize?: number;
  /** Largeur demandée à Special:FilePath. */
  width?: number;
  /** object-position de l'image (ex. "center top", "center 20%"). */
  objectPosition?: string;
  /** Texte alternatif (accessibilité). Vide par défaut = image décorative. */
  alt?: string;
  /** Dégradé de repli (par défaut #3a2028 → #221219). */
  fallbackBg?: string;
  /** Opacité de l'image (collections : .85). */
  imgOpacity?: number;
  /** Style du conteneur (hauteur, radius…). */
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Affiche une image Wikimedia par-dessus un repli « initiale dorée ».
 * Si l'image manque ou échoue, seul le repli reste visible — jamais de trou.
 */
export default function WikiImage({
  file,
  initial,
  initialSize = 44,
  width = 500,
  objectPosition = 'center top',
  alt = '',
  fallbackBg = 'linear-gradient(180deg,#3a2028,#221219)',
  imgOpacity,
  style,
  className,
  children,
}: Props) {
  const [failed, setFailed] = useState(false);
  const src = file ? wiki(file, width) : '';
  const showImg = !!src && !failed;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: fallbackBg,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: initialSize,
          color: 'rgba(212,169,78,.3)',
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
      {showImg && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            opacity: imgOpacity,
          }}
        />
      )}
      {children}
    </div>
  );
}
