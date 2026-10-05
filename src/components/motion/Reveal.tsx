import React from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delayMs = 0,
  className = '',
  as: Component = 'div',
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Component
      ref={ref}
      className={`transition-all duration-slow ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};
