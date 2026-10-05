import React, { useEffect, useState } from 'react';
import { brandConfig } from '../../brand.config';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'exit' | 'done'>('intro');

  useEffect(() => {
    // Check if previously visited in this session
    try {
      if (sessionStorage.getItem('mh_loader_seen') === 'true') {
        onComplete();
        return;
      }
    } catch (e) {
      // ignore
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => {
        try {
          sessionStorage.setItem('mh_loader_seen', 'true');
        } catch (e) {}
        onComplete();
      }, 400);
      return () => clearTimeout(t);
    }

    // Normal sequence per PRD Section 9
    // 0-900ms: intro
    // 900-1400ms: exit curtain split
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1000);

    const finishTimer = setTimeout(() => {
      setPhase('done');
      try {
        sessionStorage.setItem('mh_loader_seen', 'true');
      } catch (e) {}
      onComplete();
    }, 1600);

    // Skip trigger on any key or click
    const handleSkip = () => {
      setPhase('done');
      try {
        sessionStorage.setItem('mh_loader_seen', 'true');
      } catch (e) {}
      onComplete();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      role="status"
      aria-label="Loading site entry"
      className="fixed inset-0 z-loader pointer-events-none select-none overflow-hidden"
    >
      {/* Top Curtain Panel (slides up on exit) */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-navy-900 transition-transform duration-slow ease-in-out ${
          phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Curtain Panel (slides down on exit) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-navy-900 transition-transform duration-slow ease-in-out ${
          phase === 'exit' ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Monogram, Gold Line & Descriptor */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-fast ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center max-w-sm px-6 text-center">
          {/* Monogram: fades in and rises 12px */}
          <div className="font-display text-4xl sm:text-5xl font-bold tracking-wider text-gold-300 animate-in fade-in slide-in-from-bottom-3 duration-500">
            {brandConfig.monogram}
          </div>

          {/* 1px gold line drawing left-to-right (scaleX 0 to 1) per PRD Section 9 */}
          <div className="w-28 sm:w-36 h-[1.5px] bg-gold-500 mt-4 mb-4 origin-left animate-in duration-700 ease-editorial scale-x-100" />

          {/* Small caps descriptor line */}
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream-400 font-ui font-semibold animate-in fade-in duration-700 delay-300">
            {brandConfig.tagline}
          </div>
        </div>
      </div>
    </div>
  );
};
