import React from 'react';
import { Sparkline } from './Sparkline';
import { Tooltip } from '../ui/Tooltip';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive: boolean };
  sparklineData: number[];
  tooltip?: string;
  sparklineColor?: string;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  delta,
  sparklineData,
  tooltip,
  sparklineColor,
  className,
}) => {
  const cardContent = (
    <div
      className={cn(
        'bg-elevated border border-border rounded-lg p-5 shadow-sh-1 hover:shadow-sh-2 hover:border-border-strong transition-all duration-fast flex flex-col justify-between text-left',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </span>
        {delta && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-[11px] font-mono font-semibold px-1.5 py-0.2 rounded',
              delta.positive
                ? 'bg-success-bg text-success'
                : 'bg-warning-bg text-warning'
            )}
          >
            {delta.positive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{delta.value}</span>
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-3 mt-1">
        <span className="text-2xl sm:text-3xl font-display font-semibold text-text leading-none font-mono">
          {value}
        </span>
        <div className="shrink-0 pb-1">
          <Sparkline
            data={sparklineData}
            color={sparklineColor || (delta?.positive ? 'var(--success)' : 'var(--primary)')}
          />
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} side="top" className="w-full">
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};
