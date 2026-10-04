import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Checkbox } from '../ui/Checkbox';
import { CheckCircle2, Send, Calendar } from 'lucide-react';
import { delay } from '../../lib/delay';
import { brand } from '../../config/brand';

export const ContactForm: React.FC<{ className?: string }> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    siteType: 'Trades & Home Services (Plumbing, HVAC, Roofing)',
    message: '',
    consent: true,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name or agency name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please share a brief note about what you need built (min 10 chars)';
    }
    if (!formData.consent) {
      errs.consent = 'Canadian CASL consent is required to contact you';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await delay(900);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-elevated p-8 rounded-lg border border-border shadow-sh-3 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-success-bg text-success flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display text-2xl font-medium text-text mb-2">
          Message Received
        </h3>
        <p className="text-sm text-text-2 mb-6 max-w-sm leading-relaxed">
          Thanks, {formData.name}. {brand.devName} will review your snapshot and respond within {brand.responseCommitment.toLowerCase()} with available start dates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={brand.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book 20-min Intro Call
            </Button>
          </a>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                siteType: 'Trades & Home Services (Plumbing, HVAC, Roofing)',
                message: '',
                consent: true,
              });
            }}
          >
            Send Another Note
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-elevated p-6 sm:p-8 rounded-lg border border-border shadow-sh-3 flex flex-col gap-4 text-left ${className || ''}`}
    >
      <div className="border-b border-border pb-3 mb-1">
        <h3 className="font-display text-xl font-medium text-text">
          Start the 7-Day Test Build
        </h3>
        <p className="text-xs text-text-2 mt-0.5">
          Tell me about your agency and what you&apos;d like built first.
        </p>
      </div>

      <Input
        label="Your Name & Agency"
        placeholder="e.g. Dana Whitfield, Prairie & Pine Digital"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="dana@prairiepine.example"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />

      <Select
        label="What would you like built first?"
        value={formData.siteType}
        onChange={(e) => setFormData({ ...formData, siteType: e.target.value })}
      >
        <option value="Trades & Home Services (Plumbing, HVAC, Roofing)">
          Trades & Home Services (Plumbing, HVAC, Roofing)
        </option>
        <option value="Allied Healthcare & Dental Clinic">
          Allied Healthcare & Dental Clinic
        </option>
        <option value="Real Estate & Valuation Lead Funnel">
          Real Estate & Valuation Lead Funnel
        </option>
        <option value="Professional & Legal Firm">
          Professional & Legal Firm
        </option>
        <option value="Bilingual Québec French/English Build">
          Bilingual Québec French/English Build
        </option>
        <option value="Ongoing Maintenance Retainer (30-50 Sites)">
          Ongoing Maintenance Retainer (30-50 Sites)
        </option>
      </Select>

      <Textarea
        label="Project Details or Snapshot Scope"
        placeholder="We have an existing GHL snapshot for home services that needs refactoring, plus 2 new client onboarding sites next week..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        required
      />

      {/* CASL & PIPEDA Consent (PRD §0 & §14.13) */}
      <Checkbox
        checked={formData.consent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, consent: e.target.checked })}
        label="CASL & PIPEDA Consent"
        description="I consent to receiving electronic messages regarding project proposals and test build availability. You can unsubscribe at any time."
        error={errors.consent}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full mt-2 shadow-sh-2"
        icon={<Send className="w-4 h-4" />}
      >
        Send Brief to Alex
      </Button>

      <span className="text-[11px] text-text-muted text-center">
        Guaranteed reply within one business day · MST / EST coverage
      </span>
    </form>
  );
};
