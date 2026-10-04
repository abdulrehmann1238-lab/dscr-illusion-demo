import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold tracking-wider uppercase text-text-2">
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full bg-elevated text-text text-sm rounded-sm border border-border-strong px-3 py-2.5 pr-9 appearance-none transition-all duration-fast outline-none cursor-pointer',
              'hover:border-text-2 focus:border-primary focus:ring-1 focus:ring-primary',
              error && 'border-error focus:border-error focus:ring-error',
              'disabled:bg-bg disabled:text-text-muted disabled:cursor-not-allowed',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="w-4 h-4 text-text-muted pointer-events-none absolute right-3" />
        </div>
        {error && <span className="text-xs text-error font-medium">{error}</span>}
        {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
