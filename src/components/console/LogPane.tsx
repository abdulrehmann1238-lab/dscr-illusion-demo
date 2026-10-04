import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { Terminal } from 'lucide-react';

export interface LogPaneProps {
  logs: string[];
  title?: string;
  className?: string;
}

export const LogPane: React.FC<LogPaneProps> = ({
  logs,
  title = 'Console Execution Stream',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className={cn(
        'bg-[#16221F] text-[#F6F3EE] rounded-lg border border-border/40 font-mono text-xs overflow-hidden flex flex-col',
        className
      )}
    >
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/20 text-[11px] text-white/60">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#B8613F]" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400">STREAM ACTIVE</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="p-3.5 max-h-52 overflow-y-auto space-y-1.5 scroll-smooth text-left"
      >
        {logs.map((line, idx) => (
          <div key={idx} className="flex items-start gap-2 leading-relaxed">
            <span className="text-white/40 select-none shrink-0">&gt;</span>
            <span
              className={cn(
                line.includes('ERROR') || line.includes('Failed')
                  ? 'text-rose-400 font-semibold'
                  : line.includes('SUCCESS') || line.includes('Verified') || line.includes('Done')
                  ? 'text-emerald-400'
                  : line.includes('WARN')
                  ? 'text-amber-400'
                  : 'text-white/80'
              )}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
