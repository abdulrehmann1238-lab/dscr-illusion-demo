import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastItem {
  id: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
  durationMs?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ durationMs = 4000, ...rest }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { ...rest, id, durationMs }]);

      if (durationMs > 0) {
        setTimeout(() => {
          removeToast(id);
        }, durationMs);
      }
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => toast({ type: 'success', title, message }), [toast]);
  const error = useCallback((title: string, message?: string) => toast({ type: 'error', title, message }), [toast]);
  const warning = useCallback((title: string, message?: string) => toast({ type: 'warning', title, message }), [toast]);
  const info = useCallback((title: string, message?: string) => toast({ type: 'info', title, message }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {/* Toast container */}
      <div
        role="status"
        aria-live="polite"
        className="fixed z-toast bottom-4 right-4 max-sm:left-4 max-sm:right-4 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const icons = {
              success: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />,
              warning: <AlertTriangle className="w-4 h-4 text-warning shrink-0" />,
              error: <XCircle className="w-4 h-4 text-error shrink-0" />,
              info: <Info className="w-4 h-4 text-info shrink-0" />,
            };

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'pointer-events-auto bg-elevated border border-border shadow-sh-2 rounded-md p-3.5 flex items-start gap-3 text-left w-full'
                )}
              >
                <div className="mt-0.5">{icons[t.type || 'info']}</div>
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <div className="text-xs font-semibold text-text leading-tight">{t.title}</div>
                  {t.message && (
                    <div className="text-xs text-text-2 leading-relaxed">{t.message}</div>
                  )}
                  {t.action && (
                    <button
                      onClick={t.action.onClick}
                      className="text-xs font-semibold text-primary underline hover:text-primary-hover mt-1 self-start cursor-pointer"
                    >
                      {t.action.label}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-text-muted hover:text-text p-0.5 rounded cursor-pointer"
                  aria-label="Dismiss toast"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
