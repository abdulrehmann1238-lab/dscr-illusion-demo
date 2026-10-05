import React, { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { brandConfig } from '../../brand.config';

interface ImageUnveilProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[4/5]"
  delayMs?: number;
  withNavyOverlay?: boolean;
}

export const ImageUnveil: React.FC<ImageUnveilProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/5]',
  delayMs = 200,
  withNavyOverlay = true,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-md bg-navy-900 ${aspectRatio} ${className}`}
    >
      {hasError ? (
        // Navy placeholder block with monogram if image fails (PRD Section 20)
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-700 text-gold-300 p-6 text-center">
          <div className="font-display text-4xl font-semibold tracking-wider mb-2 border border-gold-500/30 rounded px-3 py-1">
            {brandConfig.monogram}
          </div>
          <span className="text-xs uppercase tracking-widest text-cream-400">
            {brandConfig.firm}
          </span>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all ease-editorial ${
              inView && isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
            style={{
              transitionDuration: '1000ms',
              transitionDelay: `${delayMs}ms`,
            }}
          />

          {/* Restrained <=12% navy overlay for legibility per PRD 6 rule 4 */}
          {withNavyOverlay && (
            <div
              className="absolute inset-0 bg-navy-900/12 pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* Unveil mask: a cream curtain sliding off */}
          <div
            className={`absolute inset-0 bg-cream-50 transition-all ease-editorial pointer-events-none ${
              inView ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
            style={{
              transitionDuration: '900ms',
              transitionDelay: `${delayMs}ms`,
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
};
