import { useEffect, useState } from 'react';

export type BandColor = 'navy' | 'cream' | 'charcoal';

export function useBand(): BandColor {
  const [currentBand, setCurrentBand] = useState<BandColor>('navy');

  useEffect(() => {
    const handleScroll = () => {
      const bandSections = document.querySelectorAll<HTMLElement>('[data-band]');
      const scrollPos = window.scrollY + 90; // offset for nav line

      for (let i = bandSections.length - 1; i >= 0; i--) {
        const sec = bandSections[i];
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          const band = sec.getAttribute('data-band') as BandColor;
          if (band && band !== currentBand) {
            setCurrentBand(band);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentBand]);

  return currentBand;
}
