import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
          checked ? 'bg-primary' : 'bg-border-strong'
        )}
      >
        <span
          className={cn(
            'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-fast shadow-sm',
            checked ? 'translate-x-4' : 'translate-x-1'
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && <span className="text-sm font-medium text-text">{label}</span>}
          {description && <span className="text-xs text-text-muted">{description}</span>}
        </div>
      )}
    </label>
  );
};

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
              {label && <span className="text-sm text-text font-normal leading-tight">{label}</span>}
              {description && <span className="text-xs text-text-muted mt-0.5">{description}</span>}
            </div>
          )}
        </label>
        {error && <span className="text-xs text-error font-medium ml-6">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
