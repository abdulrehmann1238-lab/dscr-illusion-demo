import React from 'react';

export type BandType = 'cream' | 'cream-100' | 'navy' | 'charcoal';

interface SectionProps {
  children: React.ReactNode;
  band?: BandType;
  className?: string;
  id?: string;
  padding?: 'default' | 'spacious' | 'compact' | 'none';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  band = 'cream',
  className = '',
  id,
  padding = 'default',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}) => {
  const bandClasses = {
    cream: 'bg-cream-50 text-ink-900',
    'cream-100': 'bg-cream-100 text-ink-900',
    navy: 'bg-navy-900 text-cream-100 on-navy',
    charcoal: 'bg-charcoal-800 text-cream-100 on-navy',
  }[band];

  const paddingClasses = {
    none: '',
    compact: 'py-12 sm:py-16 md:py-20',
    default: 'py-16 sm:py-24 md:py-32 xl:py-40', // 96-160px per PRD 7.3
    spacious: 'py-24 sm:py-32 md:py-40 xl:py-48',
  }[padding];

  return (
    <section
      id={id}
      data-band={band === 'cream-100' ? 'cream' : band}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full ${bandClasses} ${paddingClasses} ${className}`}
    >
      {children}
    </section>
  );
};
