import React from 'react';

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
  theme?: 'cream' | 'navy';
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = '',
  theme = 'cream',
}: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      className={`inline-flex p-1 rounded-sm border ${
        theme === 'navy'
          ? 'bg-navy-900/60 border-line-dark'
          : 'bg-cream-100 border-line'
      } ${className}`}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-sm transition-all duration-fast select-none whitespace-nowrap ${
              isSelected
                ? theme === 'navy'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50 shadow-sm'
                  : 'bg-gold-100 text-ink-900 border border-gold-500 shadow-1'
                : theme === 'navy'
                ? 'text-cream-400 hover:text-cream-100 border border-transparent'
                : 'text-ink-600 hover:text-ink-900 border border-transparent'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
