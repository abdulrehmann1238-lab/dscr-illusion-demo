import { create } from 'zustand';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warn' | 'error';
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = {
      ...toast,
      id,
      duration: toast.duration || 4000,
    };
    set((s) => ({
      toasts: [...s.toasts.slice(-1), newToast], // max 2 stacked toasts per PRD 14.7
    }));

    setTimeout(() => {
      set((s) => ({
        toasts: s.toasts.filter((t) => t.id !== id),
      }));
    }, newToast.duration);
  },
  removeToast: (id) =>
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    })),
}));
