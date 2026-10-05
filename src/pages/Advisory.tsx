import React from 'react';
import { Check, X, ArrowRight, ShieldCheck, Film, Users, Sparkles } from 'lucide-react';
import { faqs } from '../data/faqs';
import { useSeo } from '../hooks/useSeo';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { AdvisoryForm } from '../components/features/AdvisoryForm';

export const Advisory: React.FC = () => {
  useSeo('/advisory');

  const advisoryFaqs = faqs.filter((f) => f.category === 'advisory');

  return (
    <div id="main-content" className="w-full">
      {/* 1. Header (Charcoal) */}
      <Section band="charcoal" padding="compact" className="pt-28 md:pt-36">
        <Container>
          <div className="max-w-3xl space-y-6 pb-12 border-b border-line-dark">
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
              Strategic Video Advisory
            </span>
            <h1 className="heading-h1 text-cream-100">
              A video strategy built for how mortgage borrowers actually choose.
            </h1>
            <p
              data-editable="true"
              data-original-text="Most mortgage videos fail because they sound like corporate brochures. I work with producing loan officers and branch teams to turn deep technical lending knowledge into weekly educational videos that build self-qualified inbound pipelines."
              className="body-lede text-cream-300 font-sans"
            >
              Most mortgage videos fail because they sound like corporate brochures. I work with producing loan officers and branch teams to turn deep technical lending knowledge into weekly educational videos that build self-qualified inbound pipelines.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a href="#apply">
                <Button variant="gold-on-navy" size="lg" icon="arrow-right">
                  Apply for advisory
                </Button>
              </a>
              <a
                href="#who-its-for"
                className="text-sm font-semibold uppercase tracking-wider text-cream-300 hover:text-gold-300 transition-colors"
              >
                See how it works ↓
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Who It's For (Cream, 2 Columns: Good Fit vs Probably Not Yet) */}
      <Section band="cream" id="who-its-for" aria-labelledby="fit-heading">
        <Container>
          <div className="pb-10 border-b border-line text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              Selectivity & Alignment
            </span>
            <h2 id="fit-heading" className="heading-h2 text-ink-900">
              Is this advisory right for you?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {/* Good Fit Column */}
            <div className="p-8 bg-paper rounded-sm border border-line space-y-6">
              <div className="flex items-center gap-2.5 text-ok">
                <Check className="w-5 h-5 stroke-[2.5]" />
                <h3 className="font-display text-xl text-ink-900">
                  A Good Fit If
                </h3>
              </div>
              <ul className="divide-y divide-line text-sm text-ink-700 font-sans">
                <li className="py-3">
                  You are a producing loan officer, broker, or branch lead with verifiable deal experience.
                </li>
                <li className="py-3">
                  You want to win borrowers through authority, education, and domain trust—not dance trends.
                </li>
                <li className="py-3">
                  You can dedicate 3-4 hours per week to scripting, batch recording, and review calls.
                </li>
                <li className="py-3">
                  You want a sustainable consumer-direct channel that frees you from sole reliance on realtor favors.
                </li>
              </ul>
            </div>

            {/* Probably Not Yet Column */}
            <div className="p-8 bg-cream-100 rounded-sm border border-line space-y-6">
              <div className="flex items-center gap-2.5 text-err">
                <X className="w-5 h-5 stroke-[2.5]" />
                <h3 className="font-display text-xl text-ink-900">
                  Probably Not Yet If
                </h3>
              </div>
              <ul className="divide-y divide-line text-sm text-ink-600 font-sans">
                <li className="py-3">
                  You are looking for an agency to completely ghostwrite and fake your expertise.
                </li>
                <li className="py-3">
                  You expect thousands of viral views in week one without committing to iterative improvement.
                </li>
                <li className="py-3">
                  Your compliance director prohibits any public video participation whatsoever.
                </li>
                <li className="py-3">
                  You do not currently have the back-office staff to answer incoming borrower inquiries.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Advisory Formats (Cream-100) */}
      <Section band="cream-100" id="formats" aria-labelledby="formats-heading">
        <Container>
          <div className="pb-10 border-b border-line text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              Engagement Models
            </span>
            <h2 id="formats-heading" className="heading-h2 text-ink-900">
              Two pathways to video authority.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {/* Format 1: One-on-One */}
            <div className="p-8 sm:p-10 bg-paper rounded-sm border border-line hover:border-gold-500 transition-colors flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-gold-700 font-semibold block font-mono">
                  Private Engagement
                </span>
                <h3 className="heading-h3 text-ink-900 group-hover:text-gold-700 transition-colors">
                  One-on-One Intensive
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed font-sans">
                  Private, bespoke advisory where I personally audit your channel, co-write editorial frameworks, and refine your lead capture funnel.
                </p>

                <div className="pt-4 border-t border-line">
                  <span className="text-xs font-semibold text-ink-900 uppercase tracking-wider block mb-3">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs text-ink-700 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Bi-weekly 60-minute private strategy & script reviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Line-by-line script doctoring & hook optimizations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Direct Slack / voice-memo access between sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Compliant CRM lead routing setup review</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-line flex items-center justify-between">
                <span className="text-xs text-ink-400 font-sans">3-Month Minimum Commitment</span>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-900 group-hover:text-gold-700 transition-colors"
                >
                  <span>Start application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Format 2: Small Group */}
            <div className="p-8 sm:p-10 bg-paper rounded-sm border border-line hover:border-gold-500 transition-colors flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-gold-700 font-semibold block font-mono">
                  Cohort Model
                </span>
                <h3 className="heading-h3 text-ink-900 group-hover:text-gold-700 transition-colors">
                  Small Group Sprint
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed font-sans">
                  A high-accountability cohort capped at six mortgage professionals. Real peer feedback, shared scripting templates, and sprint deadlines.
                </p>

                <div className="pt-4 border-t border-line">
                  <span className="text-xs font-semibold text-ink-900 uppercase tracking-wider block mb-3">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs text-ink-700 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Weekly 75-minute sprint workshop & peer hot-seats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Shared vault of proven high-performing script templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Community sprint accountability & thumbnail critiques</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold-700 flex-shrink-0" />
                      <span>Capped at 6 non-competing producers per cohort</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-line flex items-center justify-between">
                <span className="text-xs text-ink-400 font-sans">8-Week Accelerated Cohort</span>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-900 group-hover:text-gold-700 transition-colors"
                >
                  <span>Start application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Method Timeline (Navy) */}
      <Section band="navy" aria-labelledby="method-heading">
        <Container>
          <div className="pb-12 border-b border-line-dark text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block mb-2">
              The Advisory Methodology
            </span>
            <h2 id="method-heading" className="heading-h2 text-cream-100">
              Position · Produce · Publish · Convert
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
            {[
              {
                phase: '01',
                title: 'Position',
                desc: 'Define your unique mortgage positioning so you stand out immediately from generic rate updates.',
              },
              {
                phase: '02',
                title: 'Produce',
                desc: 'Scripting frameworks and recording setups that remove camera friction and batch 4 videos in 2 hours.',
              },
              {
                phase: '03',
                title: 'Publish',
                desc: 'Optimized packaging, editorial thumbnails, and YouTube SEO to capture organic investor search intent.',
              },
              {
                phase: '04',
                title: 'Convert',
                desc: 'Compliant lead magnets and booking funnels that route warm inquiries into loan applications.',
              },
            ].map((m) => (
              <div key={m.phase} className="p-6 bg-navy-700/60 rounded-sm border border-line-dark space-y-3">
                <span className="text-xs font-mono font-bold text-gold-300 block">
                  Phase {m.phase}
                </span>
                <h3 className="font-display text-xl text-cream-100">{m.title}</h3>
                <p className="text-xs sm:text-sm text-cream-400 font-sans leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Application Flow (Cream, Anchored #apply) */}
      <Section band="cream" id="apply" aria-labelledby="apply-heading">
        <Container size="narrow">
          <div className="pb-10 text-center">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              Limited Roster
            </span>
            <h2 id="apply-heading" className="heading-h2 text-ink-900">
              Apply for Advisory
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 font-sans mt-2 max-w-lg mx-auto">
              Please take 3 minutes to complete the application below. I review every submission personally to determine mutual fit.
            </p>
          </div>

          <AdvisoryForm />
        </Container>
      </Section>

      {/* 6. Advisory FAQ */}
      <Section band="cream-100" aria-label="Advisory FAQ">
        <Container size="narrow">
          <div className="pb-10 text-center">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              FAQ
            </span>
            <h2 className="heading-h2 text-ink-900">
              Advisory Questions Answered
            </h2>
          </div>

          <Accordion
            items={advisoryFaqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
            }))}
          />
        </Container>
      </Section>
    </div>
  );
};
