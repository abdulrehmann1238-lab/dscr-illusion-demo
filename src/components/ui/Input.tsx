import React, { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isValid = false,
  helpText,
  id,
  value,
  onFocus,
  onBlur,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isLifted = isFocused || hasValue;

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="relative">
        <input
          id={inputId}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          className={`peer w-full h-14 pt-5 pb-1 px-4 bg-cream-100 text-ink-900 border rounded-sm text-base transition-colors duration-fast placeholder-transparent focus:outline-none ${
            error
              ? 'border-err focus:border-err focus:ring-1 focus:ring-err'
              : 'border-line hover:border-line-strong focus:border-navy-900'
          }`}
          placeholder={label}
          {...props}
        />

        {/* Floating Label per PRD 14.3 */}
        <label
          htmlFor={inputId}
          className={`absolute left-4 transition-all duration-fast pointer-events-none select-none ${
            isLifted
              ? 'top-2 text-[0.75rem] font-medium tracking-wide text-ink-600'
              : 'top-4 text-base text-ink-400'
          } ${error ? 'text-err' : ''}`}
        >
          {label} {props.required && <span className="text-err">*</span>}
        </label>

        {/* Status icons (check on valid blur, alert on error) */}
        {isValid && !error && (
          <div className="absolute right-4 top-4.5 text-ok pointer-events-none">
            <Check className="w-4 h-4" />
          </div>
        )}
        {error && (
          <div className="absolute right-4 top-4.5 text-err pointer-events-none">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Error message slide-in */}
      {error && (
        <div
          id={`${inputId}-error`}
          className="flex items-center gap-1.5 mt-1.5 text-xs text-err transition-all duration-fast animate-in fade-in slide-in-from-top-1"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper text */}
      {!error && helpText && (
        <span id={`${inputId}-help`} className="mt-1.5 text-xs text-ink-600">
          {helpText}
        </span>
      )}
    </div>
  );
};
