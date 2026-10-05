import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useToastStore } from '../../store/toasts';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-toast flex flex-col gap-2 pointer-events-none max-w-md w-[92vw]"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'warn'
            ? AlertTriangle
            : toast.type === 'error'
            ? AlertCircle
            : Info;

        const colorClasses =
          toast.type === 'success'
            ? 'text-ok'
            : toast.type === 'warn'
            ? 'text-warn'
            : toast.type === 'error'
            ? 'text-err'
            : 'text-gold-700';

        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-paper text-ink-900 border border-line-strong rounded-sm shadow-2 text-xs md:text-sm animate-in fade-in slide-in-from-bottom-2 duration-fast"
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 flex-shrink-0 ${colorClasses}`} />
              <span className="font-sans font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="p-1 text-ink-400 hover:text-ink-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
