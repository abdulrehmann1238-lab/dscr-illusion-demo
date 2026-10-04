import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItemProps {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  children,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border border-border rounded-md bg-elevated overflow-hidden', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/60 transition-colors select-none cursor-pointer"
      >
        <div className="flex flex-col gap-0.5 pr-4">
          <span className="text-sm font-semibold text-text">{title}</span>
          {subtitle && <span className="text-xs text-text-2">{subtitle}</span>}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-text-muted shrink-0 transition-transform duration-fast',
            isOpen && 'rotate-180 text-primary'
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-med ease-out overflow-hidden',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="min-h-0">
          <div className="p-4 pt-1 border-t border-border/50 text-sm text-text-2 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
