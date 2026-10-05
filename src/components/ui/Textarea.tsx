import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  maxChars?: number;
  helpText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  maxChars = 600,
  helpText,
  id,
  value,
  onFocus,
  onBlur,
  className = '',
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const charCount = typeof value === 'string' ? value.length : 0;
  const hasValue = charCount > 0;
  const isLifted = isFocused || hasValue;

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="relative">
        <textarea
          id={inputId}
          rows={rows}
          value={value}
          maxLength={maxChars}
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
          className={`peer w-full pt-6 pb-2 px-4 bg-cream-100 text-ink-900 border rounded-sm text-base transition-colors duration-fast placeholder-transparent focus:outline-none resize-none ${
            error
              ? 'border-err focus:border-err focus:ring-1 focus:ring-err'
              : 'border-line hover:border-line-strong focus:border-navy-900'
          }`}
          placeholder={label}
          {...props}
        />

        {/* Floating Label */}
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
      </div>

      <div className="flex items-center justify-between mt-1.5 text-xs text-ink-600">
        <div>
          {error ? (
            <span id={`${inputId}-error`} className="flex items-center gap-1.5 text-err">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </span>
          ) : (
            helpText && <span id={`${inputId}-help`}>{helpText}</span>
          )}
        </div>

        {maxChars && (
          <span className="tabular-nums ml-auto text-ink-400">
            {charCount}/{maxChars}
          </span>
        )}
      </div>
    </div>
  );
};
