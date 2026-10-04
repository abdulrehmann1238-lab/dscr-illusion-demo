import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brand } from '../../config/brand';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader in this browser session
    const hasLoaded = sessionStorage.getItem('northline_loaded');
    if (hasLoaded) {
      onComplete();
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / 750) * 100));
      setProgress(pct);

      if (elapsed >= 850) {
        clearInterval(interval);
        setIsExiting(true);
        sessionStorage.setItem('northline_loaded', 'true');
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 40);

    const handleSkip = () => {
      clearInterval(interval);
      sessionStorage.setItem('northline_loaded', 'true');
      setIsExiting(true);
      setTimeout(onComplete, 300);
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-loader bg-bg flex flex-col items-center justify-center select-none"
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display text-3xl font-medium tracking-tight text-primary">
              {brand.name}
            </h1>

            {/* 1px Hairline progress bar */}
            <div className="w-28 h-[1px] bg-border-strong mt-3 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mt-3"
            >
              {brand.tagline}
            </motion.p>
          </motion.div>

          {/* Skip prompt hint */}
          <span className="absolute bottom-6 text-[10px] text-text-muted/60 font-mono">
            Press any key to enter
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="curtain-swipe"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-loader bg-primary pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};
