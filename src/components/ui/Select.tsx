import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface OptionItem {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionItem[] | string[];
  error?: string;
  helpText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helpText,
  id,
  value,
  className = '',
  ...props
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : helpText ? `${selectId}-help` : undefined}
          className={`peer w-full h-14 pt-5 pb-1 px-4 pr-10 bg-cream-100 text-ink-900 border rounded-sm text-base appearance-none transition-colors duration-fast focus:outline-none cursor-pointer ${
            error
              ? 'border-err focus:border-err focus:ring-1 focus:ring-err'
              : 'border-line hover:border-line-strong focus:border-navy-900'
          }`}
          {...props}
        >
          {options.map((opt, i) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={i} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>

        {/* Floating Label */}
        <label
          htmlFor={selectId}
          className="absolute left-4 top-2 text-[0.75rem] font-medium tracking-wide text-ink-600 pointer-events-none select-none"
        >
          {label} {props.required && <span className="text-err">*</span>}
        </label>

        {/* Chevron icon */}
        <div className="absolute right-4 top-4.5 text-ink-600 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <span id={`${selectId}-error`} className="flex items-center gap-1.5 mt-1.5 text-xs text-err">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </span>
      ) : (
        helpText && <span id={`${selectId}-help`} className="mt-1.5 text-xs text-ink-600">{helpText}</span>
      )}
    </div>
  );
};
