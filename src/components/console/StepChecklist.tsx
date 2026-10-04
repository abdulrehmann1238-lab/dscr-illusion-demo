import React from 'react';
import { CheckCircle2, Loader2, AlertCircle, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

export type StepState = 'pending' | 'running' | 'done' | 'failed';

export interface StepItem {
  id: string;
  label: string;
  description?: string;
  state: StepState;
  errorDetails?: string;
}

export interface StepChecklistProps {
  steps: StepItem[];
  className?: string;
}

export const StepChecklist: React.FC<StepChecklistProps> = ({ steps, className }) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {steps.map((step, idx) => {
        const isRunning = step.state === 'running';
        const isDone = step.state === 'done';
        const isFailed = step.state === 'failed';

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-start gap-3 p-3.5 rounded-md border transition-all duration-fast text-left',
              isDone
                ? 'bg-success-bg/40 border-success/30'
                : isRunning
                ? 'bg-secondary-soft/50 border-primary shadow-sh-1'
                : isFailed
                ? 'bg-error-bg border-error/50'
                : 'bg-surface/50 border-border opacity-70'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : isRunning ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : isFailed ? (
                <AlertCircle className="w-5 h-5 text-error" />
              ) : (
                <span className="w-5 h-5 rounded-full border border-border-strong text-text-muted flex items-center justify-center text-[10px] font-mono">
                  {idx + 1}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'text-xs font-semibold',
                    isDone
                      ? 'text-success font-semibold'
                      : isRunning
                      ? 'text-primary font-bold'
                      : isFailed
                      ? 'text-error font-semibold'
                      : 'text-text-muted'
                  )}
                >
                  {step.label}
                </span>
                <span className="text-[10px] uppercase font-mono font-medium tracking-wider">
                  {isDone ? 'COMPLETED' : isRunning ? 'PROCESSING' : isFailed ? 'FAILED' : 'QUEUED'}
                </span>
              </div>
              {step.description && (
                <p className="text-[11px] text-text-2 mt-0.5 leading-snug">
                  {step.description}
                </p>
              )}
              {isFailed && step.errorDetails && (
                <div className="mt-2 p-2 rounded bg-elevated border border-error/30 text-[11px] text-error font-mono">
                  {step.errorDetails}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
