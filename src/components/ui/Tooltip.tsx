import React, { useState } from 'react';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  delayMs?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  delayMs = 400,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    const id = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-navy-900 text-cream-100 text-[11px] font-medium tracking-wide rounded-sm whitespace-nowrap shadow-1 pointer-events-none animate-in fade-in zoom-in-95 duration-fast z-toast"
        >
          {label}
        </div>
      )}
    </div>
  );
};
