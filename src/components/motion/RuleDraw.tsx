import React from 'react';
import { useInView } from '../../hooks/useInView';

interface RuleDrawProps {
  color?: 'gold' | 'line' | 'dark';
  className?: string;
  delayMs?: number;
}

export const RuleDraw: React.FC<RuleDrawProps> = ({
  color = 'line',
  className = '',
  delayMs = 150,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const colorClass =
    color === 'gold'
      ? 'bg-gold-500'
      : color === 'dark'
      ? 'bg-line-dark'
      : 'bg-line';

  return (
    <div
      ref={ref}
      className={`h-[1px] w-full origin-left transition-transform duration-slow ease-editorial ${colorClass} ${
        inView ? 'scale-x-100' : 'scale-x-0'
      } ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
        willChange: inView ? 'auto' : 'transform',
      }}
      aria-hidden="true"
    />
  );
};
