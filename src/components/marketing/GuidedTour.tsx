import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, ArrowLeft, X, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';

interface TourStep {
  title: string;
  description: string;
  route: string;
  actionText?: string;
}

const tourSteps: TourStep[] = [
  {
    title: '1. Welcome to Northline',
    description: 'A dedicated GHL partner experience for Canadian local-business agencies managing 30–50 sites.',
    route: '/',
    actionText: 'Explore Sample Site',
  },
  {
    title: '2. Ridgeline Plumbing Sample Site',
    description: 'High-converting trades site. Submit the quote form or toggle device frame (desktop/tablet/phone).',
    route: '/demo/site/ridgeline-plumbing',
    actionText: 'See Workflows & CRM',
  },
  {
    title: '3. Workflows & Pipeline Board',
    description: 'Click "Send test lead" to watch automation nodes light up and populate the New Lead column.',
    route: '/console/workflows',
    actionText: 'Try Snapshot Deploy',
  },
  {
    title: '4. Snapshot Deployment Wizard',
    description: 'Deploy a new client in 4 clean steps: brand colors, Canadian phone/province, and live preview.',
    route: '/console/deploy',
    actionText: 'Inspect Webhooks',
  },
  {
    title: '5. Webhook Inspector & Debugger',
    description: 'Test payload delivery, simulate a 500 failure, and watch exponential backoff retry in action.',
    route: '/console/integrations',
    actionText: 'View Maintenance Queue',
  },
  {
    title: '6. Maintenance Queue & QA Slider',
    description: 'Click a ticket to view the Before/After visual diff slider and approve with full changelog.',
    route: '/console/maintenance',
    actionText: 'Finish Guided Tour',
  },
];

export const GuidedTour: React.FC = () => {
  const { tourActive, setTourActive, tourStep, setTourStep } = useAppStore();
  const navigate = useNavigate();

  const current = tourSteps[tourStep] || tourSteps[0];

  const handleNext = () => {
    if (tourStep < tourSteps.length - 1) {
      const nextIdx = tourStep + 1;
      setTourStep(nextIdx);
      navigate(tourSteps[nextIdx].route);
    } else {
      setTourActive(false);
      setTourStep(0);
    }
  };

  const handlePrev = () => {
    if (tourStep > 0) {
      const prevIdx = tourStep - 1;
      setTourStep(prevIdx);
      navigate(tourSteps[prevIdx].route);
    }
  };

  return (
    <>
      {/* Floating Trigger Pill in bottom-right if inactive */}
      {!tourActive && (
        <button
          onClick={() => {
            setTourActive(true);
            setTourStep(0);
            navigate(tourSteps[0].route);
          }}
          className="fixed bottom-5 right-5 z-40 bg-elevated border border-primary/40 shadow-sh-2 rounded-full px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-primary hover:bg-secondary-soft/50 transition-all duration-fast select-none cursor-pointer group"
          aria-label="Start guided demo tour"
        >
          <Compass className="w-4 h-4 text-accent animate-spin-slow" />
          <span>Interactive Tour (2 min)</span>
          <span className="w-2 h-2 rounded-full bg-accent" />
        </button>
      )}

      {/* Active Tour Modal / Card */}
      <AnimatePresence>
        {tourActive && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-modal bg-elevated border-2 border-primary shadow-sh-3 rounded-lg p-5 max-w-sm w-full text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-[11px] font-mono uppercase font-bold text-primary">
                  Step {tourStep + 1} of {tourSteps.length}
                </span>
              </div>
              <button
                onClick={() => setTourActive(false)}
                className="text-text-muted hover:text-text p-1 rounded cursor-pointer"
                aria-label="Exit tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-sm font-semibold text-text mb-1.5">{current.title}</h4>
            <p className="text-xs text-text-2 leading-relaxed mb-4">{current.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <button
                onClick={handlePrev}
                disabled={tourStep === 0}
                className="text-xs text-text-muted hover:text-text disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                className="text-xs"
              >
                <span>{current.actionText || 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
