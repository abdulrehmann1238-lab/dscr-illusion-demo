import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'underline' | 'pill';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'underline',
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center gap-1 overflow-x-auto no-scrollbar',
        variant === 'underline' ? 'border-b border-border' : 'p-1 bg-surface border border-border rounded-md',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-colors select-none whitespace-nowrap outline-none',
              isActive
                ? 'text-primary font-semibold'
                : 'text-text-2 hover:text-text hover:bg-secondary-soft/30',
              variant === 'pill' && isActive && 'text-primary bg-elevated shadow-sh-1 rounded-sm'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[11px] font-mono leading-tight',
                  isActive
                    ? 'bg-secondary-soft text-primary font-bold'
                    : 'bg-border/60 text-text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
            {variant === 'underline' && isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
