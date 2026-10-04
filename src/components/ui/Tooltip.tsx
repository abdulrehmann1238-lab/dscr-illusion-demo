import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className,
  side = 'top',
}) => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const t = setTimeout(() => setVisible(true), 350);
    setTimer(t);
  };

  const hideTooltip = () => {
    if (timer) clearTimeout(timer);
    setVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-2.5 py-1.5 text-xs text-surface bg-ink-dark rounded-sm shadow-sh-2 max-w-[240px] pointer-events-none text-center leading-normal animate-fade-in',
            positionClasses[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
