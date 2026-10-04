import React from 'react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ActivityFeed: React.FC<{ maxItems?: number; className?: string }> = ({
  maxItems = 8,
  className,
}) => {
  const { activities } = useAppStore();
  const displayed = activities.slice(0, maxItems);

  // Group by timeGroup
  const groups: { [key: string]: typeof activities } = {};
  displayed.forEach((act) => {
    const g = act.timeGroup || 'Today';
    if (!groups[g]) groups[g] = [];
    groups[g].push(act);
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />;
      case 'warning':
        return <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />;
      case 'error':
        return <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />;
      case 'info':
      default:
        return <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-1" />;
    }
  };

  return (
    <div className={cn('bg-elevated border border-border rounded-lg p-5 shadow-sh-1 text-left', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
          Operations Activity Feed
        </h3>
        <span className="text-[11px] font-mono text-text-muted">Live sync</span>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-text-muted">
              {groupName}
            </span>
            <div className="flex flex-col divide-y divide-border/50">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-2.5 first:pt-1 last:pb-1 flex items-start gap-2.5 group hover:bg-surface/50 rounded-sm px-1.5 transition-colors"
                >
                  {getStatusIcon(item.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-2 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                    {item.clientName && (
                      <span className="text-[10px] text-primary font-medium block mt-0.5">
                        Client: {item.clientName}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
