import React from 'react';
import { cn } from '../../lib/utils';
import { Check, Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  success?: boolean;
  successText?: string;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      success = false,
      successText = 'Done',
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-ui transition-all duration-fast select-none rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer min-h-[40px]';

    const variants = {
      primary:
        'bg-primary text-surface hover:bg-primary-hover active:bg-primary-active border border-primary',
      secondary:
        'bg-transparent text-text border border-border-strong hover:bg-secondary-soft hover:border-secondary',
      accent:
        'bg-accent text-white hover:bg-accent-hover active:bg-[#8D4428] border border-accent shadow-sm',
      ghost:
        'bg-transparent text-text-2 hover:bg-secondary-soft/50 hover:text-text border border-transparent',
      danger:
        'bg-error text-white hover:bg-red-700 active:bg-red-800 border border-error',
      outline:
        'bg-surface text-text border border-border hover:border-border-strong hover:bg-white',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs min-h-[36px] gap-1.5',
      md: 'px-4 py-2 text-sm min-h-[40px] gap-2',
      lg: 'px-6 py-2.5 text-base min-h-[44px] gap-2.5',
      icon: 'w-10 h-10 p-0 text-base',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Loading...</span>
          </>
        ) : success ? (
          <>
            <Check className="w-4 h-4 text-success" />
            <span>{successText}</span>
          </>
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
