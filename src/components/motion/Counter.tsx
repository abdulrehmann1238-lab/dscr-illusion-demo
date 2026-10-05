import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  className = '',
}) => {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOutProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`font-display tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
