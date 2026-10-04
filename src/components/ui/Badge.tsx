import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, AlertTriangle, XCircle, Info, Clock } from 'lucide-react';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className,
}) => {
  const variants = {
    success: 'bg-success-bg text-success border-success/30',
    warning: 'bg-warning-bg text-warning border-warning/40',
    error: 'bg-error-bg text-error border-error/30',
    info: 'bg-info-bg text-info border-info/30',
    neutral: 'bg-secondary-soft text-text-2 border-border-strong/50',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border leading-none shrink-0 select-none',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export interface StatusPillProps {
  status: 'Live' | 'Needs attention' | 'Domain pending' | 'Onboarding' | 'Connected' | 'Error' | 'Needs auth' | 'Requested' | 'In progress' | 'Review' | 'Done';
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, className }) => {
  switch (status) {
    case 'Live':
    case 'Connected':
    case 'Done':
      return (
        <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />} className={className}>
          {status}
        </Badge>
      );
    case 'Needs attention':
    case 'Needs auth':
      return (
        <Badge variant="warning" icon={<AlertTriangle className="w-3 h-3" />} className={className}>
          {status}
        </Badge>
      );
    case 'Error':
      return (
        <Badge variant="error" icon={<XCircle className="w-3 h-3" />} className={className}>
          {status}
        </Badge>
      );
    case 'In progress':
    case 'Review':
      return (
        <Badge variant="info" icon={<Clock className="w-3 h-3" />} className={className}>
          {status}
        </Badge>
      );
    case 'Domain pending':
    case 'Onboarding':
    case 'Requested':
    default:
      return (
        <Badge variant="neutral" icon={<Info className="w-3 h-3" />} className={className}>
          {status}
        </Badge>
      );
  }
};
