import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  width?: 'md' | 'lg'; // md = 480px, lg = 640px
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = 'md',
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widths = {
    md: 'md:w-[480px]',
    lg: 'md:w-[640px]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-drawer flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#16221F]/45"
            aria-hidden="true"
          />

          {/* Drawer / Bottom sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
            className={cn(
              'relative z-10 w-full h-full bg-elevated border-l border-border shadow-sh-3 flex flex-col',
              'max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:h-[85vh] max-md:rounded-t-lg max-md:border-t',
              widths[width],
              className
            )}
          >
            {/* Mobile drag handle */}
            <div className="md:hidden flex justify-center pt-2 pb-1">
              <div className="w-12 h-1.5 rounded-full bg-border-strong" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-border bg-surface/60">
              <div className="flex flex-col gap-1 pr-6">
                {title && (
                  <h3 className="font-display text-lg font-medium text-text leading-snug">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs text-text-2 leading-relaxed">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-sm text-text-muted hover:text-text hover:bg-secondary-soft/50 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
