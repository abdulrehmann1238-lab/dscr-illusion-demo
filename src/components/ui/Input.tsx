import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, Check } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, hint, leftIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold tracking-wider uppercase text-text-2">
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-text-muted pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-elevated text-text placeholder:text-text-muted/60 text-sm rounded-sm border border-border-strong px-3 py-2.5 transition-all duration-fast outline-none',
              'hover:border-text-2 focus:border-primary focus:ring-1 focus:ring-primary',
              leftIcon && 'pl-9',
              error && 'border-error focus:border-error focus:ring-error pr-9',
              success && 'border-success focus:border-success focus:ring-success pr-9',
              'disabled:bg-bg disabled:text-text-muted disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 text-error pointer-events-none flex items-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
          {success && !error && (
            <div className="absolute right-3 text-success pointer-events-none flex items-center">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
        {error && <span className="text-xs text-error font-medium">{error}</span>}
        {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
