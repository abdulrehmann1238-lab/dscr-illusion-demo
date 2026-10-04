import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'bg-error-bg border border-error/30 rounded-md p-4 flex items-start justify-between gap-3 text-left',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-error uppercase tracking-wider">{title}</span>
          <span className="text-sm text-text-2 mt-0.5">{message}</span>
        </div>
      </div>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          className="bg-white shrink-0"
        >
          Retry
        </Button>
      )}
    </div>
  );
};
