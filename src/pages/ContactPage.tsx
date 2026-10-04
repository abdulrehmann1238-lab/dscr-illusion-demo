import React from 'react';
import { Navbar } from '../components/marketing/Navbar';
import { Footer } from '../components/marketing/Footer';
import { ContactForm } from '../components/marketing/ContactForm';
import { brand } from '../config/brand';
import { Mail, Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36 sm:pb-28 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 6 cols: Info */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20 inline-block mb-3">
                  Direct Line
                </span>
                <h1 className="type-h1 text-text mb-4">
                  Let&apos;s talk about your agency&apos;s build partner.
                </h1>
                <p className="type-body-l text-text-2 leading-relaxed">
                  Whether you need an immediate handoff for an upcoming snapshot build or you&apos;re preparing to streamline maintenance across 30+ Canadian sites, reach out directly.
                </p>
              </div>

              <div className="p-6 bg-surface rounded-lg border border-border space-y-4 text-xs text-text-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted block">Direct Email</span>
                    <a href={`mailto:${brand.email}`} className="font-semibold text-primary hover:underline font-mono">
                      {brand.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted block">Direct Calendar Booking</span>
                    <a
                      href={brand.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-accent hover:underline"
                    >
                      Book 20-minute kickoff intro call →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted block">Turnaround Commitment</span>
                    <span className="font-medium text-text">Guaranteed response {brand.responseCommitment.toLowerCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted block">Timezone Coverage</span>
                    <span className="font-medium text-text">{brand.timezone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Zero spam · CASL & PIPEDA Compliant Electronic Messaging</span>
              </div>
            </div>

            {/* Right 6 cols: Form */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
