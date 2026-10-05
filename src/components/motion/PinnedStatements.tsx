import React, { useEffect, useRef, useState } from 'react';

const STATEMENTS = [
  "A deal is a story before it is a number.",
  "Investors deserve a lender who explains the trade-offs.",
  "Education should be free, specific and a little uncomfortable.",
];

export const PinnedStatements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = container.offsetHeight - windowHeight;

      if (totalScrollable <= 0) return;

      // How far through the 300vh section are we?
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      if (progress < 0.33) {
        setActiveIndex(0);
      } else if (progress < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      data-band="navy"
      className="relative h-[240vh] md:h-[300vh] bg-navy-900 text-cream-100 on-navy"
      aria-label="What I believe"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-8 block">
          What I Believe
        </span>

        <div className="space-y-8 md:space-y-12">
          {STATEMENTS.map((text, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 md:gap-6 transition-all duration-slow ease-editorial"
              >
                {/* 6px gold square marker per PRD 13.1 */}
                <div className="pt-3 md:pt-4 flex-shrink-0">
                  <div
                    className={`w-1.5 h-1.5 rounded-[1px] transition-all duration-med ${
                      isActive ? 'bg-gold-500 scale-125' : 'bg-transparent'
                    }`}
                  />
                </div>

                <p
                  data-editable="true"
                  data-original-text={text}
                  className={`font-display text-2xl sm:text-3xl md:text-5xl leading-tight transition-opacity duration-slow ${
                    isActive ? 'opacity-100 text-cream-100' : 'opacity-25 text-cream-400'
                  }`}
                >
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
