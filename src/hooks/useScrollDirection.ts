import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const threshold = 10;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 80);

      if (Math.abs(currentScrollY - prevScrollY.current) < threshold) {
        return;
      }

      if (currentScrollY > prevScrollY.current && currentScrollY > 120) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollDirection, isScrolled };
}
