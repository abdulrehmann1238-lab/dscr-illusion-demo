import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Calendar, Clock, MapPin, ArrowUp, Shield } from 'lucide-react';
import { brand } from '../../config/brand';
import { ContactForm } from './ContactForm';
import { Modal } from '../ui/Modal';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#16221F] text-[#F6F3EE] pt-20 pb-12 overflow-hidden">
      {/* Hairline Canada Map Motif Background (6% opacity, PRD §20) */}
      <div className="absolute right-0 bottom-12 w-96 h-64 pointer-events-none opacity-[0.06] select-none">
        <svg viewBox="0 0 960 540" className="w-full h-full stroke-white fill-none" strokeWidth="2">
          <path d="M 70 210 L 140 340 L 435 355 C 650 425 760 330 840 355 L 940 310" />
          <path d="M 430 125 C 470 160 480 230 460 260 C 440 285 410 295 440 305" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left 6 Columns: Closing Pitch & Direct Details */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B8613F] mb-3">
              One Partner · Predictable Scale
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F6F3EE] mb-6 leading-[1.1]">
              Let&apos;s build one site properly. Then we&apos;ll talk about fifty.
            </h2>
            <p className="text-base text-[#DDE6E2]/80 leading-relaxed mb-8 max-w-lg">
              Paid test build, clear scope, one week. If it&apos;s a fit, we establish a recurring maintenance and build rhythm. If not, you keep a production-ready, high-converting client site.
            </p>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-4 text-sm text-[#DDE6E2]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#B8613F]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Direct Email</span>
                  <a
                    href={`mailto:${brand.email}`}
                    className="font-mono text-sm text-[#F6F3EE] hover:underline"
                  >
                    {brand.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#B8613F]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Direct Booking</span>
                  <a
                    href={brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#F6F3EE] hover:underline"
                  >
                    Book a 20-minute kickoff discovery call →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#5B7F76]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Response Commitment</span>
                  <span className="text-xs text-white/90">
                    Replies guaranteed within one Canadian business day
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#5B7F76]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Coverage</span>
                  <span className="text-xs text-white/90">{brand.timezone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Contact Form on Elevated Surface */}
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>

        {/* Bottom Bar (PRD §20) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <span className="font-display font-medium text-sm text-[#F6F3EE]">
              {brand.name}
            </span>
            <span>·</span>
            <span>
              &copy; {brand.copyrightYear} {brand.devName}. Built for Canadian local business.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy & CASL
            </button>
            <button
              onClick={() => setTermsOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Partnership Terms
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy & CASL Compliance"
        description="Canadian compliance standards implemented on all agency client builds."
      >
        <div className="space-y-4 text-sm text-text-2">
          <p>
            This website and client demonstration are strictly compliant with Canada&apos;s Anti-Spam Legislation (CASL) and the Personal Information Protection and Electronic Documents Act (PIPEDA).
          </p>
          <h4 className="font-semibold text-text">1. Client Data Confidentiality</h4>
          <p>
            Agency sub-accounts, customer CRM records, and snapshot configurations remain 100% owned by your agency. No client lead data is ever sold or utilized outside authorized maintenance.
          </p>
          <h4 className="font-semibold text-text">2. Form Consent Disclosures</h4>
          <p>
            All quote forms deployed via Northline snapshots contain explicit opt-in checkboxes and transparent privacy disclosures adhering to CRTC guidelines.
          </p>
        </div>
      </Modal>

      {/* Terms Modal */}
      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Partnership Terms & Scope"
        description="Standard operating framework for GoHighLevel build and maintenance retainers."
      >
        <div className="space-y-4 text-sm text-text-2">
          <h4 className="font-semibold text-text">1. Test Build Scope</h4>
          <p>
            Initial paid test build includes one sub-account creation, full snapshot deployment, custom CSS/styling adjustments, webhook connections, and a 12-point QA signoff within 7 business days.
          </p>
          <h4 className="font-semibold text-text">2. Ongoing Maintenance Retainer</h4>
          <p>
            Maintenance retainers cover content swaps, CSS tweaks, workflow health monitoring, domain SSL verifications, and urgent bug fixes with one-business-day turnaround.
          </p>
        </div>
      </Modal>
    </footer>
  );
};
