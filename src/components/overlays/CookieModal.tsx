import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useHandoffStore } from '../../store/handoff';
import { useToastStore } from '../../store/toasts';
import { Button } from '../ui/Button';

export const CookieModal: React.FC = () => {
  const { isCookieModalOpen, closeCookieModal, cookieConsent, setCookieConsent } = useHandoffStore();
  const { addToast } = useToastStore();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(cookieConsent.analytics);

  if (!isCookieModalOpen) return null;

  const handleSave = () => {
    setCookieConsent(analyticsEnabled);
    addToast({
      message: 'Cookie preferences saved.',
      type: 'success',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-med"
    >
      <div className="w-full max-w-md bg-paper border border-line rounded-lg shadow-2 p-6 space-y-6 animate-in zoom-in-95 duration-med text-ink-900">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="flex items-center gap-2 text-ink-900">
            <ShieldCheck className="w-5 h-5 text-gold-700" />
            <h3 id="cookie-modal-title" className="font-display text-lg font-semibold">
              Cookie Preferences
            </h3>
          </div>
          <button
            onClick={closeCookieModal}
            aria-label="Close cookie modal"
            className="p-1 text-ink-600 hover:text-ink-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-ink-600 leading-relaxed font-sans">
          This site uses strictly necessary cookies for application routing and optional analytics cookies to measure anonymous visitor engagement.
        </p>

        <div className="space-y-4 text-sm">
          {/* Essential cookies */}
          <div className="flex items-center justify-between p-3 bg-cream-50 rounded-sm border border-line">
            <div>
              <div className="font-semibold text-xs uppercase tracking-wider text-ink-900">
                Essential Cookies
              </div>
              <div className="text-xs text-ink-600">Form draft persistence and navigation</div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-ok">
              Always on
            </span>
          </div>

          {/* Analytics cookies */}
          <div className="flex items-center justify-between p-3 bg-cream-50 rounded-sm border border-line">
            <div>
              <div className="font-semibold text-xs uppercase tracking-wider text-ink-900">
                Analytics Cookies
              </div>
              <div className="text-xs text-ink-600">Anonymous Google Analytics 4 event logging</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-line peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-navy-900" />
            </label>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={closeCookieModal}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
