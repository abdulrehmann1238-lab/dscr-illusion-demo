import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { programs, Program } from '../data/programs';
import { faqs } from '../data/faqs';
import { assetManifest } from '../assets/manifest';
import { useSeo } from '../hooks/useSeo';
import { useBookingStore } from '../store/booking';
import { useHandoffStore } from '../store/handoff';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Segmented';
import { Accordion } from '../components/ui/Accordion';
import { ImageUnveil } from '../components/motion/ImageUnveil';
import { Reveal } from '../components/motion/Reveal';
import { DscrCheck } from '../components/features/DscrCheck';

export const Financing: React.FC = () => {
  useSeo('/financing');
  const location = useLocation();
  const { openBooking } = useBookingStore();
  const { logAnalyticsEvent } = useHandoffStore();

  const [activeProgramId, setActiveProgramId] = useState<'dscr' | 'fix-and-flip' | 'ground-up'>('dscr');

  // Handle hash deep-linking per PRD 13.2
  useEffect(() => {
    if (location.hash === '#fix-and-flip') setActiveProgramId('fix-and-flip');
    if (location.hash === '#ground-up') setActiveProgramId('ground-up');
    if (location.hash === '#dscr') setActiveProgramId('dscr');
  }, [location.hash]);

  const activeProgram = programs.find((p) => p.id === activeProgramId) || programs[0];
  const financingFaqs = faqs.filter((f) => f.category === 'financing');

  return (
    <div id="main-content" className="w-full">
      {/* 1. Page Header (Cream) */}
      <Section band="cream" padding="compact" className="pt-28 md:pt-36">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-line">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
                Investor Financing
              </span>
              <h1 className="heading-h1 text-ink-900">
                Loans built around the property, not the paperwork.
              </h1>
              <p
                data-editable="true"
                data-original-text="I provide non-QM and private capital for residential real estate investors across the United States. Direct access, clear parameters, and zero institutional runaround."
                className="body-lede text-ink-600 max-w-xl font-sans"
              >
                I provide non-QM and private capital for residential real estate investors across the United States. Direct access, clear parameters, and zero institutional runaround.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    logAnalyticsEvent('cta_click', { label: 'Book a financing call (Financing Header)' });
                    openBooking({ callType: 'financing' });
                  }}
                  icon="arrow-right"
                >
                  Book a financing call
                </Button>
                <a
                  href="#dscr-calculator"
                  className="editorial-link text-sm font-semibold uppercase tracking-wider text-ink-900"
                >
                  Run a DSCR check ↓
                </a>
              </div>

              {/* Anchor links row */}
              <div className="pt-6 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-ink-600">
                <span>Quick jump:</span>
                <button
                  onClick={() => setActiveProgramId('dscr')}
                  className={`hover:text-gold-700 ${activeProgramId === 'dscr' ? 'text-gold-700 underline' : ''}`}
                >
                  DSCR Rental
                </button>
                <span>·</span>
                <button
                  onClick={() => setActiveProgramId('fix-and-flip')}
                  className={`hover:text-gold-700 ${activeProgramId === 'fix-and-flip' ? 'text-gold-700 underline' : ''}`}
                >
                  Fix & Flip
                </button>
                <span>·</span>
                <button
                  onClick={() => setActiveProgramId('ground-up')}
                  className={`hover:text-gold-700 ${activeProgramId === 'ground-up' ? 'text-gold-700 underline' : ''}`}
                >
                  Ground-Up
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ImageUnveil
                src={assetManifest.pillars.financing}
                alt="Urban residential multi-unit property architecture"
                aspectRatio="aspect-[4/3] sm:aspect-[4/5]"
                delayMs={200}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Program Tabs & Stepper (Cream-100) */}
      <Section band="cream-100" id="programs" aria-labelledby="programs-heading">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-line">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
                Loan Programs
              </span>
              <h2 id="programs-heading" className="heading-h2 text-ink-900">
                Structured around your deal lifecycle.
              </h2>
            </div>

            <Segmented<'dscr' | 'fix-and-flip' | 'ground-up'>
              value={activeProgramId}
              onChange={setActiveProgramId}
              options={[
                { value: 'dscr', label: 'DSCR' },
                { value: 'fix-and-flip', label: 'Fix & Flip' },
                { value: 'ground-up', label: 'Ground-Up' },
              ]}
            />
          </div>

          {/* Active Panel with Crossfade */}
          <div className="pt-10 space-y-12 animate-in fade-in duration-med" key={activeProgram.id}>
            {/* Program Header */}
            <div className="p-6 sm:p-8 bg-paper rounded-sm border border-line flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                  Best For
                </span>
                <p className="font-display text-xl sm:text-2xl text-ink-900">
                  {activeProgram.bestFor}
                </p>
              </div>

              <div className="flex-shrink-0 text-left md:text-right border-t md:border-t-0 md:border-l border-line pt-4 md:pt-0 md:pl-6 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold block">
                  Typical Timing
                </span>
                <span className="text-sm font-semibold text-ink-900 block">
                  {activeProgram.timeline}
                </span>
                <span className="text-xs text-gold-700 block">
                  {activeProgram.maxLTV}
                </span>
              </div>
            </div>

            {/* Stepper (Horizontal desktop, Vertical mobile per PRD 13.2) */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-ink-600 font-semibold mb-6">
                How It Works: 4 Sequential Steps
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {activeProgram.steps.map((st) => (
                  <div
                    key={st.number}
                    className="p-6 bg-paper rounded-sm border border-line space-y-3 relative group hover:border-gold-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 text-xs font-mono font-bold flex items-center justify-center border border-gold-500/40">
                        0{st.number}
                      </span>
                    </div>

                    <h4 className="font-display text-lg text-ink-900 group-hover:text-gold-700 transition-colors">
                      {st.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                      {st.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What I Look At (3 Ruled Items) */}
            <div className="p-8 bg-paper rounded-sm border border-line space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
                What Underwriting Focuses On
              </h3>
              <ul className="divide-y divide-line text-sm text-ink-900">
                {activeProgram.whatILookAt.map((item, idx) => (
                  <li key={idx} className="py-3 flex items-start gap-3">
                    <Check className="w-4 h-4 text-ok flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. DSCR Ratio Check (Navy Signature Interactive Tool) */}
      <Section band="navy" aria-label="DSCR Calculator">
        <Container>
          <DscrCheck />
        </Container>
      </Section>

      {/* 4. Process Timeline (Cream) */}
      <Section band="cream" aria-labelledby="process-heading">
        <Container>
          <div className="pb-12 border-b border-line text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              From First Call to Closing
            </span>
            <h2 id="process-heading" className="heading-h2 text-ink-900">
              A predictable 5-step capital deployment.
            </h2>
          </div>

          <div className="pt-12 max-w-3xl mx-auto space-y-8 relative">
            {/* Timeline progressive line */}
            <div className="absolute top-4 bottom-4 left-4 sm:left-6 w-[1.5px] bg-gold-500/40" />

            {[
              {
                step: '01',
                title: 'Conversation',
                desc: 'A 20-30 minute strategy call where we examine property numbers, hold period, and portfolio goals.',
              },
              {
                step: '02',
                title: 'Scenario Review',
                desc: 'Within 24 hours, I model loan sizing, debt service ratios, and present rate/leverage options.',
              },
              {
                step: '03',
                title: 'Structure & Term Sheet',
                desc: 'You receive transparent terms with exact closing costs, reserve requirements, and no surprise broker markups.',
              },
              {
                step: '04',
                title: 'Underwriting & Appraisal',
                desc: 'Third-party valuation and lease validation run in parallel with entity title work to prevent dead time.',
              },
              {
                step: '05',
                title: 'Clear to Close',
                desc: 'Capital wires directly to the settlement escrow account and your property is funded.',
              },
            ].map((p, idx) => (
              <div key={idx} className="relative flex items-start gap-6 sm:gap-8 pl-12 sm:pl-16">
                <div className="absolute left-1.5 sm:left-3.5 top-1.5 w-6 h-6 rounded-full bg-cream-50 border-2 border-gold-500 flex items-center justify-center text-[10px] font-mono font-bold text-gold-700">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-display text-xl text-ink-900 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-600 font-sans leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. FAQ Accordion (Cream) */}
      <Section band="cream-100" aria-labelledby="faq-heading">
        <Container size="narrow">
          <div className="pb-10 text-center">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              Common Questions
            </span>
            <h2 id="faq-heading" className="heading-h2 text-ink-900">
              Investor Financing FAQ
            </h2>
          </div>

          <Accordion
            items={financingFaqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
            }))}
          />
        </Container>
      </Section>

      {/* 6. Closing Call to Action */}
      <Section band="navy" padding="compact">
        <Container className="text-center max-w-xl mx-auto space-y-6">
          <h2 className="heading-h2 text-cream-100">
            Have a deal under contract?
          </h2>
          <p className="text-sm sm:text-base text-cream-300 font-sans leading-relaxed">
            Send over the address and rent roll. We'll run the numbers and tell you exactly how it prices.
          </p>
          <div className="pt-2">
            <Button
              variant="gold-on-navy"
              size="lg"
              onClick={() => openBooking({ callType: 'financing' })}
            >
              Book a financing call
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
};
