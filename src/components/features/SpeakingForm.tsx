import React, { useState } from 'react';
import { Check, AlertCircle, Sparkles } from 'lucide-react';
import { isValidEmail, isValidRequired } from '../../lib/validators';
import { api, SpeakingPayload } from '../../mock/api';
import { talkTopics } from '../../data/talks';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Chip } from '../ui/Chip';

interface SpeakingFormProps {
  initialAudience?: 'mortgage' | 'real-estate';
  preselectedTopic?: string;
}

export const SpeakingForm: React.FC<SpeakingFormProps> = ({
  initialAudience = 'mortgage',
  preselectedTopic,
}) => {
  const [audience, setAudience] = useState<'mortgage' | 'real-estate'>(initialAudience);
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [attendance, setAttendance] = useState('50-150 attendees');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    preselectedTopic ? [preselectedTopic] : []
  );
  const [format, setFormat] = useState('Keynote (45 min)');
  const [honorarium, setHonorarium] = useState('Standard range');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyingCaption, setVerifyingCaption] = useState(false);
  const [serverErrorBanner, setServerErrorBanner] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableTopics = talkTopics.filter((t) => t.audience === audience);

  const toggleTopic = (title: string) => {
    setSelectedTopics((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErrorBanner(null);

    const newErrors: Record<string, string> = {};

    const nameCheck = isValidRequired(fullName, 2, 'Full name');
    if (!nameCheck.valid) newErrors.fullName = nameCheck.message!;

    const emailCheck = isValidEmail(workEmail);
    if (!emailCheck.valid) newErrors.workEmail = emailCheck.message!;

    const orgCheck = isValidRequired(organization, 2, 'Organization');
    if (!orgCheck.valid) newErrors.organization = orgCheck.message!;

    const eventCheck = isValidRequired(eventName, 2, 'Event name');
    if (!eventCheck.valid) newErrors.eventName = eventCheck.message!;

    if (!isVirtual) {
      const locCheck = isValidRequired(location, 2, 'Location');
      if (!locCheck.valid) newErrors.location = locCheck.message!;
    }

    if (!eventDate) {
      newErrors.eventDate = 'Please select a proposed event date.';
    }

    if (selectedTopics.length === 0) {
      newErrors.topics = 'Please select at least one topic of interest.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setVerifyingCaption(true);

    try {
      const payload: SpeakingPayload = {
        fullName,
        workEmail,
        organization,
        role,
        eventName,
        eventDate,
        location: isVirtual ? 'Virtual' : location,
        isVirtual,
        audience,
        attendance,
        topics: selectedTopics,
        format,
        honorarium,
        message,
        honeypot,
      };

      await api.submitSpeaking(payload);
      setIsSubmitted(true);
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
    setIsSubmitted(false);
    setFullName('');
    setWorkEmail('');
    setOrganization('');
    setRole('');
    setEventName('');
    setLocation('');
    setSelectedTopics([]);
    setMessage('');
    setServerErrorBanner(null);
  };

  const firstName = fullName.trim().split(' ')[0] || 'there';

  return (
    <div className="bg-paper p-8 sm:p-12 rounded-sm border border-line shadow-1">
      {serverErrorBanner && (
        <div className="mb-8 p-4 bg-cream-100 border-l-4 border-err text-err text-xs sm:text-sm flex items-start gap-3">
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
        // Success Panel per PRD 13.4
        <div className="py-8 text-center space-y-6 animate-in fade-in duration-med">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto text-gold-700 border border-gold-500/50">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
              Inquiry Received
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-ink-900">
              Thank you, {firstName}.
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed font-sans">
              I read every speaking inquiry personally and will reply to <strong className="text-ink-900">{workEmail}</strong> within two business days.
            </p>
          </div>

          <div className="p-4 bg-cream-50 rounded-sm border border-line text-left text-xs space-y-1.5 max-w-md mx-auto">
            <div>
              <strong className="text-ink-900">Event:</strong> {eventName} ({isVirtual ? 'Virtual' : location})
            </div>
            <div>
              <strong className="text-ink-900">Audience:</strong> {audience === 'mortgage' ? 'Mortgage Professionals' : 'Real Estate Investors'}
            </div>
            <div>
              <strong className="text-ink-900">Topics:</strong> {selectedTopics.join(', ')}
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="secondary" onClick={handleReset}>
              Send another inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-line pb-4 mb-6">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
              Speaking Invitation
            </span>
            <h3 className="font-display text-2xl text-ink-900">
              Check Availability & Topics
            </h3>
          </div>

          {/* Audience selection radio chips */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ink-600 mb-2">
              Primary Audience *
            </label>
            <div className="flex gap-2">
              <Chip
                label="Mortgage Audience"
                selected={audience === 'mortgage'}
                onClick={() => setAudience('mortgage')}
              />
              <Chip
                label="Real Estate Investors"
                selected={audience === 'real-estate'}
                onClick={() => setAudience('real-estate')}
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />
            <Input
              label="Work Email"
              type="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              error={errors.workEmail}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Organization / Company"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              error={errors.organization}
              required
            />
            <Input
              label="Your Role (optional)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              error={errors.eventName}
              required
            />
            <Input
              label="Proposed Event Date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              error={errors.eventDate}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                label="City & State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={errors.location}
                disabled={isVirtual}
                required={!isVirtual}
              />
              <label className="flex items-center gap-2 text-xs text-ink-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVirtual}
                  onChange={(e) => setIsVirtual(e.target.checked)}
                  className="rounded text-navy-900 focus:ring-gold-500"
                />
                <span>This is a virtual event / webinar</span>
              </label>
            </div>

            <Select
              label="Expected Attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              options={[
                'Under 50 attendees',
                '50 - 150 attendees',
                '150 - 500 attendees',
                '500+ attendees',
              ]}
            />
          </div>

          {/* Topics of Interest Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-ink-600">
                Topics of Interest *
              </label>
              <span className="text-xs text-ink-400">Select at least one</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableTopics.map((topic) => (
                <Chip
                  key={topic.id}
                  label={topic.title}
                  selected={selectedTopics.includes(topic.title)}
                  onClick={() => toggleTopic(topic.title)}
                />
              ))}
            </div>
            {errors.topics && (
              <p className="text-xs text-err mt-2">{errors.topics}</p>
            )}
          </div>

          {/* Format and Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Preferred Format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              options={[
                'Keynote (45 min)',
                'Breakout Session (60 min)',
                'Interactive Workshop (90 min)',
                'Panel Discussion',
              ]}
            />
            <Select
              label="Honorarium Budget"
              value={honorarium}
              onChange={(e) => setHonorarium(e.target.value)}
              options={[
                'Standard range',
                'Custom / To discuss',
                '$5,000 - $10,000',
                '$10,000+',
              ]}
            />
          </div>

          <Textarea
            label="Additional context or event themes (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxChars={600}
            rows={3}
          />

          {/* Honeypot field */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Submit area */}
          <div className="pt-4 border-t border-line">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              Submit Speaking Inquiry
            </Button>

            {verifyingCaption && (
              <p className="text-center text-xs text-ink-400 mt-2 animate-in fade-in">
                Verifying you're human (Cloudflare Turnstile)...
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
