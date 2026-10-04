import React, { useState } from 'react';
import {
  Flame,
  Droplets,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Send,
  ArrowRight,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Checkbox } from '../ui/Checkbox';
import { SlotPicker } from './SlotPicker';
import { isValidCanadianPostalCode, formatCanadianPostalCode, isValidPhone } from '../../lib/validators';
import { delay } from '../../lib/delay';
import { useAppStore } from '../../store';
import { useToast } from '../ui/Toast';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const services = [
  { id: 'furnace', label: 'Furnace & Heating', icon: <Flame className="w-5 h-5 text-[#E0742B]" />, est: '$350 - $650' },
  { id: 'water-heater', label: 'Water Heater / Tankless', icon: <Droplets className="w-5 h-5 text-[#1E3A5F]" />, est: '$1,800 - $3,200' },
  { id: 'drain', label: 'Drain & Sewer Line', icon: <Wrench className="w-5 h-5 text-[#1E3A5F]" />, est: '$225 - $480' },
  { id: 'emergency', label: '24/7 Emergency Leak', icon: <AlertCircle className="w-5 h-5 text-red-600" />, est: 'Immediate Dispatch' },
];

export const QuoteForm: React.FC<{ onSuccessRedirect?: () => void }> = () => {
  const { addLead } = useAppStore();
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState('Furnace & Heating');
  const [details, setDetails] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Next = () => {
    const errs: Record<string, string> = {};
    if (!postalCode.trim()) {
      errs.postalCode = 'Postal code is required for technician dispatch radius';
    } else if (!isValidCanadianPostalCode(postalCode)) {
      errs.postalCode = 'Please enter a valid Canadian postal code (e.g. T2P 1J9)';
    }
    if (!details.trim() || details.length < 5) {
      errs.details = 'Please describe the issue briefly (min 5 characters)';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name required';
    if (!phone.trim() || !isValidPhone(phone)) {
      errs.phone = 'Valid 10-digit phone number required for SMS dispatch';
    }
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email required';
    if (!consent) errs.consent = 'CASL consent required for dispatch notice';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    setLoading(true);
    await delay(900); // 900ms simulated GHL submission

    const newLead = {
      id: `lead-${Date.now()}`,
      clientId: 'c01',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: `Calgary (${formatCanadianPostalCode(postalCode)})`,
      service: selectedService,
      details: details.trim(),
      valueCAD: selectedService.includes('Water Heater') ? 2800 : 450,
      stage: 'New Lead' as const,
      source: 'Website Quote Form' as const,
      createdAt: 'Just now',
      urgent: selectedService.includes('Emergency'),
    };

    addLead(newLead);
    setSubmittedLead(newLead);
    setLoading(false);

    // Trigger WOW notification to prove site -> CRM loop!
    toast({
      type: 'success',
      title: `New Lead Captured: ${newLead.name}`,
      message: `Quote form submitted on Ridgeline site -> Tagged, SMS queued, and Deal card added in Console CRM!`,
      action: {
        label: 'View in Console →',
        onClick: () => {
          window.location.href = '/console/workflows';
        },
      },
      durationMs: 8000,
    });
  };

  if (submittedLead) {
    return (
      <div className="bg-white rounded-lg border border-border shadow-sh-2 p-6 sm:p-8 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-[#1E3A5F] mb-2">
          Request Received!
        </h3>
        <p className="text-sm text-text-2 mb-2 max-w-md leading-relaxed">
          Thanks, <strong className="text-text">{submittedLead.name}</strong>. An on-call technician has been notified via instant SMS dispatch.
        </p>
        <p className="text-xs text-text-muted mb-6">
          Estimated response window: <strong>under 15 minutes</strong> for Calgary area.
        </p>

        {bookedSlot ? (
          <div className="w-full max-w-md p-4 bg-emerald-50 border border-emerald-300 rounded-md text-emerald-900 text-xs text-left mb-6 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Arrival Window Confirmed</div>
              <div className="mt-0.5">{bookedSlot}</div>
              <div className="text-[10px] text-emerald-700 mt-1">Calendar invite & 2h reminder SMS scheduled.</div>
            </div>
          </div>
        ) : showSlotPicker ? (
          <div className="w-full max-w-md mb-6">
            <SlotPicker
              onSlotSelected={(slot) => {
                setBookedSlot(slot);
                setShowSlotPicker(false);
              }}
              onCancel={() => setShowSlotPicker(false)}
            />
          </div>
        ) : (
          <div className="w-full max-w-md p-4 bg-surface rounded-md border border-border text-left mb-6">
            <div className="text-xs font-semibold text-text mb-1">
              Want to lock in a specific technician arrival window?
            </div>
            <p className="text-xs text-text-muted mb-3">
              Skip the phone wait and select your preferred diagnostic slot right now.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowSlotPicker(true)}
              className="bg-[#1E3A5F] hover:bg-[#142842] text-white"
              icon={<Calendar className="w-3.5 h-3.5" />}
            >
              Choose Arrival Window
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
          <Link to="/console/workflows">
            <Button variant="primary" size="md" className="bg-[#E0742B] hover:bg-[#C9621E] text-white">
              <span>View This Lead in Partner Console</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="md"
            onClick={() => {
              setSubmittedLead(null);
              setStep(1);
              setBookedSlot(null);
            }}
          >
            Submit Another Quote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border shadow-sh-2 overflow-hidden text-left">
      {/* Stepper Progress Header */}
      <div className="bg-[#1E3A5F] text-white p-4 sm:p-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-semibold block">
            Step {step} of 3 · Fast 90-Second Quote
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {step === 1 && 'Select Required Plumbing / Heating Service'}
            {step === 2 && 'Location & Issue Description'}
            {step === 3 && 'Contact Details & Instant SMS Confirmation'}
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-white/10 px-2 py-1 rounded">
          {step === 1 ? '33%' : step === 2 ? '66%' : '99%'}
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((svc) => {
                const isSelected = selectedService === svc.label;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setSelectedService(svc.label)}
                    className={cn(
                      'p-4 rounded-md border text-left transition-all duration-fast cursor-pointer flex items-start gap-3',
                      isSelected
                        ? 'border-[#1E3A5F] bg-blue-50/50 shadow-sh-1 ring-1 ring-[#1E3A5F]'
                        : 'border-border bg-surface hover:bg-white hover:border-text-2'
                    )}
                  >
                    <div className="p-2 rounded bg-white border border-border shrink-0">
                      {svc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#1E3A5F]">{svc.label}</div>
                      <div className="text-[11px] text-text-muted mt-0.5">Est: {svc.est}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={handleStep1Next}
                className="bg-[#E0742B] hover:bg-[#C9621E] text-white"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <Input
              label="Canadian Postal Code (e.g. T2P 1J9)"
              placeholder="T2P 1J9"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
              error={errors.postalCode}
              hint="Ensures a technician within the Calgary dispatch radius is assigned."
              required
            />

            <Textarea
              label="Describe What Happened"
              placeholder="e.g. Furnace stopped blowing heat at 1 AM. Pilot light won't stay on..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              error={errors.details}
              required
            />

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleStep2Next}
                className="bg-[#E0742B] hover:bg-[#C9621E] text-white"
              >
                <span>Continue to Contact</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Your Full Name"
              placeholder="Marcus Tran"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Phone Number (Mobile for SMS Dispatch)"
              placeholder="+1 (403) 555-0142"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              hint="You will receive an automated dispatch text in under 30 seconds."
              required
            />

            <Input
              label="Email Address"
              placeholder="marcus.tran@example.ca"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <Checkbox
              checked={consent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)}
              label="CASL Consent for Service Dispatch"
              description="I consent to receive service updates, appointment reminders, and estimates via phone & SMS."
              error={errors.consent}
            />

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="bg-[#E0742B] hover:bg-[#C9621E] text-white"
                icon={<Send className="w-4 h-4" />}
              >
                Submit Emergency Quote
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
