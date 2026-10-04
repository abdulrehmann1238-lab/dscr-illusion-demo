import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold tracking-wider uppercase text-text-2">
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            className={cn(
              'w-full bg-elevated text-text placeholder:text-text-muted/60 text-sm rounded-sm border border-border-strong p-3 min-h-[90px] transition-all duration-fast outline-none',
              'hover:border-text-2 focus:border-primary focus:ring-1 focus:ring-primary',
              error && 'border-error focus:border-error focus:ring-error',
              'disabled:bg-bg disabled:text-text-muted disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center gap-1 text-xs text-error font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </div>
        )}
        {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
