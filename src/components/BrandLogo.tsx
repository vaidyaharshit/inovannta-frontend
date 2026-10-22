import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
  variant?: 'emblem' | 'dark' | 'plain';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  onClick,
}) => {
  let isLight = false;
  try {
    const { theme } = useTheme();
    isLight = theme === 'light';
  } catch {
    if (typeof document !== 'undefined') {
      isLight = !document.documentElement.classList.contains('dark');
    }
  }

  // Height configurations preserving original 508x434 / 1357x1159 aspect ratio (~1.17:1)
  const sizeClasses = {
    sm: 'h-8 sm:h-8.5 w-auto max-w-[105px]',
    md: 'h-10 w-auto max-w-[130px]',
    lg: 'h-12 w-auto max-w-[160px]',
    hero: 'h-20 sm:h-24 md:h-28 w-auto max-w-[280px]',
  };

  const logoSrc = isLight ? '/image.png' : '/innovanta-logo-transparent.png';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none group cursor-pointer transition-transform duration-200 hover:scale-[1.01] ${className}`}
      title="INNOVANTA — MANIFEST. BUILD. IMPACT."
    >
      <img
        src={logoSrc}
        alt="INNOVANTA Logo - Manifest. Build. Impact."
        className={`${sizeClasses[size]} object-contain relative z-10 transition-opacity duration-200 ${
          isLight ? 'mix-blend-multiply' : ''
        }`}
        loading="eager"
      />
    </div>
  );
};

