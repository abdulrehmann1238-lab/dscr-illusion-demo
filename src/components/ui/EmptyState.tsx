import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-border rounded-lg bg-surface/30',
        className
      )}
    >
      {icon && (
        <div className="w-10 h-10 rounded-full bg-secondary-soft/50 text-secondary flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      <h4 className="text-base font-semibold text-text mb-1">{title}</h4>
      {description && (
        <p className="text-xs text-text-muted max-w-sm leading-relaxed mb-4">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
