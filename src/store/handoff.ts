import { create } from 'zustand';

export type HandoffTab =
  | 'overview'
  | 'platform'
  | 'edit-mode'
  | 'seo'
  | 'analytics'
  | 'spam-privacy'
  | 'test-scripts';

export interface AnalyticsEvent {
  id: string;
  name: string;
  params: Record<string, any>;
  ts: string;
  consent: boolean;
}

interface HandoffState {
  isOpen: boolean;
  activeTab: HandoffTab;
  isEditMode: boolean;
  visitedChecklist: {
    dscrCalculator: boolean;
    calendlyBooking: boolean;
    videoLightbox: boolean;
    formSubmitted: boolean;
    editModeTried: boolean;
  };
  events: AnalyticsEvent[];
  cookieConsent: {
    essential: boolean;
    analytics: boolean;
  };
  isCookieModalOpen: boolean;
  isPillDismissed: boolean;

  // Actions
  openHandoff: (tab?: HandoffTab) => void;
  closeHandoff: () => void;
  setTab: (tab: HandoffTab) => void;
  toggleEditMode: () => void;
  resetAllEdits: () => void;
  markFeatureVisited: (feature: keyof HandoffState['visitedChecklist']) => void;
  logAnalyticsEvent: (name: string, params?: Record<string, any>) => void;
  clearAnalyticsEvents: () => void;
  setCookieConsent: (analytics: boolean) => void;
  openCookieModal: () => void;
  closeCookieModal: () => void;
  dismissPill: () => void;
}

export const useHandoffStore = create<HandoffState>((set, get) => ({
  isOpen: false,
  activeTab: 'overview',
  isEditMode: false,
  visitedChecklist: {
    dscrCalculator: false,
    calendlyBooking: false,
    videoLightbox: false,
    formSubmitted: false,
    editModeTried: false,
  },
  events: [
    {
      id: "ev-init",
      name: "page_view",
      params: { page_title: "Home", page_location: "/" },
      ts: new Date().toLocaleTimeString(),
      consent: false,
    }
  ],
  cookieConsent: {
    essential: true,
    analytics: false,
  },
  isCookieModalOpen: false,
  isPillDismissed: false,

  openHandoff: (tab) => set((s) => ({ isOpen: true, activeTab: tab || s.activeTab })),
  closeHandoff: () => set({ isOpen: false }),
  setTab: (activeTab) => set({ activeTab }),

  toggleEditMode: () => {
    const nextState = !get().isEditMode;
    set({ isEditMode: nextState });
    if (nextState) {
      document.body.classList.add('edit-mode-active');
      get().markFeatureVisited('editModeTried');
      get().logAnalyticsEvent('edit_mode_toggle', { status: 'enabled' });
    } else {
      document.body.classList.remove('edit-mode-active');
      get().logAnalyticsEvent('edit_mode_toggle', { status: 'disabled' });
    }
  },

  resetAllEdits: () => {
    // Reset any contenteditable changes back to default
    const editables = document.querySelectorAll('[data-editable="true"]');
    editables.forEach((el) => {
      const defaultText = el.getAttribute('data-original-text');
      if (defaultText) {
        el.textContent = defaultText;
      }
    });
    get().logAnalyticsEvent('edit_mode_reset');
  },

  markFeatureVisited: (feature) => {
    set((s) => ({
      visitedChecklist: {
        ...s.visitedChecklist,
        [feature]: true,
      },
    }));
  },

  logAnalyticsEvent: (name, params = {}) => {
    const { cookieConsent } = get();
    // In demo, we log all events to show instrumentation, flagging the consent state
    const newEvent: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name,
      params,
      ts: new Date().toLocaleTimeString(),
      consent: cookieConsent.analytics,
    };
    set((s) => ({
      events: [newEvent, ...s.events.slice(0, 49)], // keep last 50 events
    }));
  },

  clearAnalyticsEvents: () => set({ events: [] }),

  setCookieConsent: (analytics) => {
    set({
      cookieConsent: {
        essential: true,
        analytics,
      },
      isCookieModalOpen: false,
    });
    get().logAnalyticsEvent('cookie_consent_update', { analytics_granted: analytics });
  },

  openCookieModal: () => set({ isCookieModalOpen: true }),
  closeCookieModal: () => set({ isCookieModalOpen: false }),
  dismissPill: () => set({ isPillDismissed: true }),
}));
