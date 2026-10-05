import React from 'react';
import { Check } from 'lucide-react';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected,
  onClick,
  className = '',
  size = 'md',
}) => {
  const heightClass = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-10 px-4 text-xs md:text-sm';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-pill font-medium transition-all duration-fast border select-none ${heightClass} ${
        selected
          ? 'bg-gold-100 text-ink-900 border-gold-500 shadow-sm'
          : 'bg-cream-100/70 text-ink-600 border-line hover:border-line-strong hover:text-ink-900'
      } ${className}`}
    >
      {selected && (
        <span className="w-3.5 h-3.5 flex items-center justify-center text-gold-700 animate-in zoom-in-50 duration-fast">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      )}
      <span>{label}</span>
    </button>
  );
};
