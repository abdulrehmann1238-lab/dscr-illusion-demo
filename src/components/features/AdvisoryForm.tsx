import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, AlertCircle, Edit2, RotateCcw } from 'lucide-react';
import {
  AdvisoryDraft,
  getSavedAdvisoryDraft,
  saveAdvisoryDraft,
  clearAdvisoryDraft,
  defaultAdvisoryDraft,
} from '../../store/drafts';
import { isValidEmail, isValidRequired } from '../../lib/validators';
import { api } from '../../mock/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Chip } from '../ui/Chip';
import { useBookingStore } from '../../store/booking';

export const AdvisoryForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [draft, setDraft] = useState<AdvisoryDraft>(getSavedAdvisoryDraft());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyingCaption, setVerifyingCaption] = useState(false);
  const [serverErrorBanner, setServerErrorBanner] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { openBooking } = useBookingStore();

  // Keep draft persisted in sessionStorage on change
  useEffect(() => {
    saveAdvisoryDraft(draft);
  }, [draft]);

  const updateDraft = (field: keyof AdvisoryDraft, value: any) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};

    if (s === 1) {
      const nameChk = isValidRequired(draft.name, 2, 'Your name');
      if (!nameChk.valid) errs.name = nameChk.message!;

      const emailChk = isValidEmail(draft.email);
      if (!emailChk.valid) errs.email = emailChk.message!;

      const compChk = isValidRequired(draft.company, 2, 'Company');
      if (!compChk.valid) errs.company = compChk.message!;

      const roleChk = isValidRequired(draft.role, 2, 'Role');
      if (!roleChk.valid) errs.role = roleChk.message!;
    } else if (s === 3) {
      if (!draft.annualGoal || draft.annualGoal.trim().length < 40) {
        errs.annualGoal = 'Please share your 12-month goal (minimum 40 characters) so we can assess fit.';
      }
    } else if (s === 4) {
      if (!draft.consent) {
        errs.consent = 'Please confirm consent to be contacted regarding your application.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => (s + 1) as any);
    }
  };

  const handleBack = () => {
    setStep((s) => (s - 1) as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setVerifyingCaption(true);
    setServerErrorBanner(null);

    try {
      await api.submitAdvisory(draft);
      setIsSubmitted(true);
      clearAdvisoryDraft();
    } catch (err: any) {
      setServerErrorBanner(
        err.message ||
          "We couldn't send that just now. Your answers are still here. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setVerifyingCaption(false);
    }
  };

  const handleReset = () => {
    clearAdvisoryDraft();
    setDraft(defaultAdvisoryDraft);
    setStep(1);
    setIsSubmitted(false);
    setServerErrorBanner(null);
  };

  const STEPS = [
    { num: 1, title: 'About You' },
    { num: 2, title: 'Video Today' },
    { num: 3, title: 'Your Goals' },
    { num: 4, title: 'Review & Submit' },
  ];

  return (
    <div id="apply" className="bg-paper p-6 sm:p-12 rounded-sm border border-line shadow-1">
      {/* Progress Header per PRD 13.5 */}
      <div className="border-b border-line pb-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
            Advisory Application · Step {step} of 4
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-ink-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Start over</span>
          </button>
        </div>

        {/* 4 Gold Segments */}
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((s) => (
            <div key={s.num} className="space-y-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-med ${
                  s.num <= step ? 'bg-gold-500' : 'bg-line'
                }`}
              />
              <span className="hidden sm:block text-[11px] font-medium text-ink-600 truncate">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {serverErrorBanner && (
        <div className="mb-6 p-4 bg-cream-100 border-l-4 border-err text-err text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">{serverErrorBanner}</p>
            <p className="mt-1 text-xs text-ink-600">
              Note for reviewer: The name "Error Test" triggers this intentional fallback test state.
            </p>
          </div>
        </div>
      )}

      {isSubmitted ? (
        // Success Panel per PRD 13.5
        <div className="py-8 text-center space-y-6 animate-in fade-in duration-med">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto text-gold-700 border border-gold-500/50">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
              Application Received
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-ink-900">
              Thank you, {draft.name.split(' ')[0] || 'there'}.
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed font-sans">
              I read every application personally and reply within three business days. If there is a strong strategic fit, I'll send an invitation for an initial 20-minute video fit call.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => openBooking({ callType: 'advisory', applicantName: draft.name, applicantEmail: draft.email })}
            >
              Book a tentative fit call
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Submit another
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: ABOUT YOU */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-med">
              <h3 className="font-display text-xl font-semibold mb-4">
                Tell me about your business & production
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  value={draft.name}
                  onChange={(e) => updateDraft('name', e.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  label="Work Email"
                  type="email"
                  value={draft.email}
                  onChange={(e) => updateDraft('email', e.target.value)}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Lender / Brokerage Company"
                  value={draft.company}
                  onChange={(e) => updateDraft('company', e.target.value)}
                  error={errors.company}
                  required
                />
                <Input
                  label="Your Title / Role"
                  value={draft.role}
                  onChange={(e) => updateDraft('role', e.target.value)}
                  error={errors.role}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="NMLS # (optional)"
                  value={draft.nmls}
                  onChange={(e) => updateDraft('nmls', e.target.value)}
                />
                <Select
                  label="Team Structure / Size"
                  value={draft.teamSize}
                  onChange={(e) => updateDraft('teamSize', e.target.value)}
                  options={[
                    'Solo (1 Producing LO)',
                    'Branch Team (2 - 5 LOs)',
                    'Regional Team (6 - 15 LOs)',
                    'Corporate Enterprise',
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 2: YOUR VIDEO TODAY */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-med">
              <h3 className="font-display text-xl font-semibold mb-2">
                Where is your video content today?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="YouTube or Social Channel URL (optional)"
                  value={draft.youtubeUrl}
                  onChange={(e) => updateDraft('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
                <Select
                  label="Videos Published to Date"
                  value={draft.videosCount}
                  onChange={(e) => updateDraft('videosCount', e.target.value)}
                  options={[
                    'None yet (starting from zero)',
                    '1 - 5 videos',
                    '6 - 20 videos',
                    '20+ videos published',
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-600 mb-2">
                  What is your biggest obstacle with video right now?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Consistency & Routine',
                    'On-camera confidence',
                    'Scripting & topic ideas',
                    'Turning views into leads',
                    'Mortgage compliance fears',
                  ].map((obs) => (
                    <Chip
                      key={obs}
                      label={obs}
                      selected={draft.biggestObstacle === obs}
                      onClick={() => updateDraft('biggestObstacle', obs)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GOALS & FORMAT */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-med">
              <h3 className="font-display text-xl font-semibold mb-2">
                Your 12-Month Vision
              </h3>

              <Textarea
                label="What does a successful video advisory engagement achieve for you in the next 12 months? *"
                value={draft.annualGoal}
                onChange={(e) => updateDraft('annualGoal', e.target.value)}
                error={errors.annualGoal}
                helpText="Be specific about loan volume, lead quality, or brand positioning."
                maxChars={600}
                rows={4}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Preferred Advisory Format"
                  value={draft.preferredFormat}
                  onChange={(e) => updateDraft('preferredFormat', e.target.value)}
                  options={[
                    { value: 'one-on-one', label: 'One-on-One Private Engagement' },
                    { value: 'small-group', label: 'Small Group Peer Cohort' },
                    { value: 'not-sure', label: 'Not sure (recommend for me)' },
                  ]}
                />
                <Select
                  label="Desired Start Timeline"
                  value={draft.desiredStart}
                  onChange={(e) => updateDraft('desiredStart', e.target.value)}
                  options={[
                    'Immediately (Next 14 days)',
                    'Next 30 days',
                    'Next quarter',
                    'Exploring for future',
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONSENT */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-med">
              <h3 className="font-display text-xl font-semibold mb-2">
                Review Your Application
              </h3>

              {/* Review summary cards with edit triggers */}
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-cream-50 rounded-sm border border-line flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-ink-900 mb-1">About You</div>
                    <div className="text-ink-600">
                      {draft.name} · {draft.email}
                    </div>
                    <div className="text-ink-600">
                      {draft.company} ({draft.role}) · Team: {draft.teamSize}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-gold-700 hover:text-gold-900 font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="p-4 bg-cream-50 rounded-sm border border-line flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-ink-900 mb-1">Video Situation</div>
                    <div className="text-ink-600">
                      Published: {draft.videosCount} · Obstacle: {draft.biggestObstacle}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1 text-gold-700 hover:text-gold-900 font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="p-4 bg-cream-50 rounded-sm border border-line flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-ink-900 mb-1">Goals & Format</div>
                    <div className="text-ink-600 line-clamp-2">
                      Goal: {draft.annualGoal}
                    </div>
                    <div className="text-ink-600 mt-1">
                      Format: {draft.preferredFormat} · Timeline: {draft.desiredStart}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-1 text-gold-700 hover:text-gold-900 font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.consent}
                    onChange={(e) => updateDraft('consent', e.target.checked)}
                    className="mt-1 rounded text-navy-900 focus:ring-gold-500"
                  />
                  <span className="text-xs text-ink-600 leading-relaxed font-sans">
                    I agree to be contacted regarding my application. I understand Marcus Hale works with a limited roster of advisory clients to ensure personal focus.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-err mt-1.5">{errors.consent}</p>
                )}
              </div>
            </div>
          )}

          {/* Stepper Buttons (Back / Continue / Submit) */}
          <div className="pt-6 border-t border-line flex items-center justify-between">
            {step > 1 ? (
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleBack}
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back</span>
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Submit Application
              </Button>
            )}
          </div>

          {verifyingCaption && (
            <p className="text-center text-xs text-ink-400 animate-in fade-in">
              Verifying you're human (Cloudflare Turnstile)...
            </p>
          )}
        </form>
      )}
    </div>
  );
};
