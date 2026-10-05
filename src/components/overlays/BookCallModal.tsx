import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, Globe, Check, ArrowRight, Download } from 'lucide-react';
import { brandConfig } from '../../brand.config';
import { assetManifest } from '../../assets/manifest';
import { useBookingStore, CallType } from '../../store/booking';
import { generateNext14BusinessDays, DaySchedule } from '../../mock/slots';
import { api, downloadCalendarInvite } from '../../mock/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Segmented } from '../ui/Segmented';

export const BookCallModal: React.FC = () => {
  const { isOpen, prefill, closeBooking } = useBookingStore();

  const [callType, setCallType] = useState<CallType>('financing');
  const [days, setDays] = useState<DaySchedule[]>([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCaption, setVerificationCaption] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<{
    dateISO: string;
    dayName: string;
    time: string;
    type: string;
  } | null>(null);

  // Initialize days & prefill
  useEffect(() => {
    if (isOpen) {
      const generated = generateNext14BusinessDays();
      setDays(generated);
      setSelectedDayIdx(0);
      setSelectedTime(generated[0]?.slots[0]?.time || null);

      if (prefill.callType) setCallType(prefill.callType);
      if (prefill.scenarioNote) setNote(prefill.scenarioNote);
      if (prefill.applicantName) setName(prefill.applicantName);
      if (prefill.applicantEmail) setEmail(prefill.applicantEmail);

      setBookedDetails(null);
      setIsSubmitting(false);
      setVerificationCaption(false);
      setErrors({});
    }
  }, [isOpen, prefill]);

  // Handle ESC key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBooking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBooking]);

  const handleSelectDay = (idx: number) => {
    setSelectedDayIdx(idx);
    setIsSlotsLoading(true);
    setSelectedTime(null);
    setTimeout(() => {
      setIsSlotsLoading(false);
      const day = days[idx];
      if (day && day.slots.length > 0) {
        setSelectedTime(day.slots[0].time);
      }
    }, 350);
  };

  const handleNextAvailable = () => {
    // Jump to the next day with open slots
    for (let i = selectedDayIdx + 1; i < days.length; i++) {
      if (!days[i].isFullyBooked) {
        handleSelectDay(i);
        break;
      }
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please enter a valid email.';
    if (!selectedTime) newErrors.time = 'Please select a time slot.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setVerificationCaption(true);

    try {
      const currentDay = days[selectedDayIdx];
      await api.createBooking({
        callType,
        dateISO: currentDay.dateISO,
        time: selectedTime || '',
        name,
        email,
        note,
        honeypot,
      });

      setBookedDetails({
        dateISO: currentDay.dateISO,
        dayName: `${currentDay.dayName}, ${currentDay.monthName} ${currentDay.dayNumber}`,
        time: selectedTime || '',
        type:
          callType === 'financing'
            ? 'Financing Strategy Call (30 min)'
            : callType === 'advisory'
            ? 'Video Advisory Fit Call (20 min)'
            : 'Speaking Inquiry Intro (20 min)',
      });
    } catch (err) {
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
      setVerificationCaption(false);
    }
  };

  if (!isOpen) return null;

  const currentDay = days[selectedDayIdx];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'EST';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-modal flex items-center justify-center p-0 md:p-6 overflow-y-auto bg-navy-900/75 backdrop-blur-sm animate-in fade-in duration-med"
    >
      <div
        className="relative w-full md:max-w-4xl min-h-screen md:min-h-0 bg-cream-50 rounded-none md:rounded-lg shadow-2 border-0 md:border border-line overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-med"
      >
        {/* Close Button */}
        <button
          onClick={closeBooking}
          aria-label="Close scheduler"
          className="absolute top-4 right-4 z-10 p-2 text-ink-600 hover:text-ink-900 md:text-ink-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Navy Host Profile & Details */}
        <div className="md:col-span-5 bg-navy-900 text-cream-100 p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-line-dark">
          <div>
            {/* Host Portrait & Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={assetManifest.hero.portrait}
                alt={brandConfig.name}
                className="w-14 h-14 rounded-full object-cover border border-gold-500/40"
              />
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
                  {brandConfig.firm}
                </span>
                <h3 className="font-display text-lg font-normal text-cream-100">
                  {brandConfig.name}
                </h3>
              </div>
            </div>

            <h2 id="booking-modal-title" className="font-display text-2xl md:text-3xl leading-tight mb-4">
              Schedule a Conversation
            </h2>
            <p className="text-xs md:text-sm text-cream-400 leading-relaxed mb-6 font-sans">
              Thirty minutes. Direct advisory with no pitch. We evaluate property numbers, capital feasibility, or video strategy directly.
            </p>

            <div className="space-y-3 text-xs md:text-sm text-cream-300 border-t border-line-dark pt-6">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-300" />
                <span>
                  {callType === 'financing'
                    ? '30 minutes'
                    : callType === 'advisory'
                    ? '20 minutes'
                    : '20 minutes'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-gold-300" />
                <span>Google Meet video call</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gold-300" />
                <span>{userTimezone} timezone</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-line-dark text-[11px] text-cream-400">
            Simulated Calendly scheduler. Generates a real calendar .ics file upon confirmation.
          </div>
        </div>

        {/* Right Column: Cream Scheduler & Form */}
        <div className="md:col-span-7 bg-cream-50 p-6 sm:p-10 flex flex-col justify-between">
          {bookedDetails ? (
            // Success State per PRD 14.4
            <div className="my-auto py-8 text-center animate-in fade-in duration-med">
              <div className="w-12 h-12 bg-ok/15 text-ok rounded-full flex items-center justify-center mx-auto mb-4 border border-ok/30">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>

              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
                Confirmed
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink-900 mb-2">
                You're booked.
              </h3>
              <p className="text-sm text-ink-600 mb-6 max-w-sm mx-auto">
                A calendar invitation is on its way to <strong className="text-ink-900">{email}</strong>.
              </p>

              <div className="p-4 bg-cream-100 rounded-sm border border-line text-left text-sm space-y-2 mb-8 max-w-sm mx-auto">
                <div className="font-semibold text-ink-900">{bookedDetails.type}</div>
                <div className="text-ink-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-700" />
                  <span>{bookedDetails.dayName}</span>
                </div>
                <div className="text-ink-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-700" />
                  <span>{bookedDetails.time} ({userTimezone})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  onClick={() =>
                    downloadCalendarInvite({
                      title: bookedDetails.type,
                      description: `Call with ${brandConfig.name} (${brandConfig.firm})`,
                      dateISO: bookedDetails.dateISO,
                      timeStr: bookedDetails.time,
                      hostName: brandConfig.name,
                    })
                  }
                  icon="none"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Add to Calendar (.ics)</span>
                </Button>
                <Button variant="secondary" onClick={closeBooking}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            // Scheduler Form
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              {/* Call Type Segmented Toggle */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-600 mb-2">
                  Call Objective
                </label>
                <Segmented<CallType>
                  value={callType}
                  onChange={setCallType}
                  options={[
                    { value: 'financing', label: 'Financing (30m)' },
                    { value: 'advisory', label: 'Advisory (20m)' },
                    { value: 'speaking', label: 'Speaking (20m)' },
                  ]}
                />
              </div>

              {/* Horizontal Date Picker Strip */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-ink-600">
                    Select a Date
                  </label>
                  <span className="text-xs text-ink-400">Next 14 business days</span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {days.map((day, idx) => {
                    const isSelected = idx === selectedDayIdx;
                    return (
                      <button
                        key={day.dateISO}
                        type="button"
                        onClick={() => handleSelectDay(idx)}
                        className={`flex-shrink-0 w-16 py-2.5 px-1 rounded-sm border text-center transition-all ${
                          isSelected
                            ? 'bg-gold-100 text-ink-900 border-gold-500 shadow-sm font-semibold'
                            : 'bg-cream-100 text-ink-600 border-line hover:border-line-strong'
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider text-ink-400">
                          {day.dayName}
                        </div>
                        <div className="font-display text-lg font-bold">
                          {day.dayNumber}
                        </div>
                        <div className="text-[10px] text-ink-400">{day.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Area with Shimmer & Empty State */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-600 mb-2">
                  Select Time ({userTimezone})
                </label>

                {isSlotsLoading ? (
                  <div className="grid grid-cols-3 gap-2 animate-pulse py-2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="h-10 bg-line/40 rounded-sm" />
                    ))}
                  </div>
                ) : currentDay?.isFullyBooked ? (
                  // Empty State per PRD 14.4
                  <div className="p-4 bg-cream-100 rounded-sm border border-line text-center space-y-2">
                    <p className="text-sm text-ink-600">Fully booked on this day.</p>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleNextAvailable}
                    >
                      Next available day
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {currentDay?.slots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2 px-1 text-xs font-semibold rounded-sm border transition-all ${
                            isSelected
                              ? 'bg-navy-900 text-cream-100 border-navy-900'
                              : 'bg-cream-100 text-ink-900 border-line hover:border-navy-900'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.time && (
                  <p className="text-xs text-err mt-1">{errors.time}</p>
                )}
              </div>

              {/* Contact Details Fields */}
              <div className="space-y-4 pt-2 border-t border-line">
                <Input
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  label="Work Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required
                />
                <Textarea
                  label="Deal scenario or discussion notes (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxChars={400}
                  rows={2}
                />

                {/* Honeypot hidden field for anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Submit Button & Human Verification Micro-state */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Confirm Appointment
                </Button>

                {verificationCaption && (
                  <p className="text-center text-xs text-ink-400 mt-2 animate-in fade-in duration-fast">
                    Verifying you're human...
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
