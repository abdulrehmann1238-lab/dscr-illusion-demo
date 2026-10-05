import React from 'react';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';

export type ButtonVariant =
  | 'primary' // navy fill on cream
  | 'secondary' // 1px navy border
  | 'gold-on-navy' // gold-300 border, transparent fill, cream text
  | 'ghost-dark' // transparent on navy
  | 'text-link'; // inline text with gold underline

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  successLabel?: string;
  icon?: 'arrow-right' | 'arrow-up-right' | 'none';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  successLabel = 'Success',
  icon = 'none',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base sizing per PRD 7.1 & 12
  const sizeClasses = {
    sm: 'h-10 px-4 text-xs font-semibold uppercase tracking-wider',
    md: 'h-12 px-6 text-sm font-semibold tracking-wide',
    lg: 'h-14 px-8 text-base font-semibold tracking-wide',
  }[size];

  // Variant color definitions
  const variantClasses = {
    primary:
      'bg-navy-900 text-cream-100 hover:bg-navy-700 active:bg-[#0A1320] border border-transparent shadow-1',
    secondary:
      'bg-transparent text-navy-900 border border-navy-900 hover:bg-navy-900 hover:text-cream-100',
    'gold-on-navy':
      'bg-transparent text-cream-100 border border-gold-300/80 hover:border-gold-300 hover:bg-gold-500/10 active:bg-gold-500/20',
    'ghost-dark':
      'bg-transparent text-cream-100 hover:bg-white/10 border border-transparent',
    'text-link':
      'p-0 h-auto bg-transparent text-ink-900 hover:text-gold-700 border-b border-gold-500 rounded-none pb-0.5',
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`group relative inline-flex items-center justify-center font-ui rounded-sm transition-all duration-fast ease-out active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        // Three-dot opacity pulse per PRD 12 & 14.3
        <span className="inline-flex items-center gap-1.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
            style={{ animationDelay: '300ms' }}
          />
        </span>
      ) : isSuccess ? (
        <span className="inline-flex items-center gap-2 text-ok">
          <Check className="w-4 h-4" />
          <span>{successLabel}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <span>{children}</span>
          {icon === 'arrow-right' && (
            <ArrowRight className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1" />
          )}
          {icon === 'arrow-up-right' && (
            <ArrowUpRight className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </span>
      )}
    </button>
  );
};
