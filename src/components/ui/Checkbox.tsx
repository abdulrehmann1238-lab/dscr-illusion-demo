import React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const checkId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1 text-left">
        <label htmlFor={checkId} className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            id={checkId}
            ref={ref}
            type="checkbox"
            className={cn(
              'mt-0.5 h-4 w-4 rounded-sm border border-border-strong text-primary accent-primary focus:ring-secondary focus:ring-offset-1 transition cursor-pointer',
              error && 'border-error',
              className
            )}
            {...props}
          />
          {(label || description) && (
            <div className="flex flex-col">
              {label && <span className="text-xs sm:text-sm text-text font-normal leading-tight">{label}</span>}
              {description && <span className="text-[11px] text-text-muted mt-0.5">{description}</span>}
            </div>
          )}
        </label>
        {error && <span className="text-xs text-error font-medium ml-6">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
