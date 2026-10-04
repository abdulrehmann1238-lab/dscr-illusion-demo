import React from 'react';
import { cn } from '../../lib/utils';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: React.ReactNode;
  min: number;
  max: number;
  step?: number;
  marks?: { value: number; label: string }[];
}

export const Slider: React.FC<SliderProps> = ({
  label,
  valueDisplay,
  min,
  max,
  step = 1,
  value,
  marks,
  className,
  ...props
}) => {
  const percentage = (((Number(value) - min) / (max - min)) * 100).toFixed(1);

  return (
    <div className="w-full flex flex-col gap-2 text-left">
      {(label || valueDisplay) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-semibold text-text-2 uppercase tracking-wider">{label}</span>}
          {valueDisplay && <span className="text-sm font-semibold text-primary font-mono">{valueDisplay}</span>}
        </div>
      )}
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={cn(
            'w-full h-2 bg-secondary-soft rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
            className
          )}
          style={{
            background: `linear-gradient(to right, var(--primary) ${percentage}%, var(--secondary-soft) ${percentage}%)`,
          }}
          {...props}
        />
      </div>
      {marks && marks.length > 0 && (
        <div className="flex justify-between text-[11px] text-text-muted mt-1 px-1">
          {marks.map((m) => (
            <span key={m.value}>{m.label}</span>
          ))}
        </div>
      )}
    </div>
  );
};
