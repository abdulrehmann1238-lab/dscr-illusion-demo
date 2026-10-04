import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, Code, ShieldCheck, Video } from 'lucide-react';
import { Button } from '../ui/Button';

export const TimelineStrip: React.FC = () => {
  const steps = [
    {
      day: 'Day 0',
      title: 'Brief & Access',
      description: 'Kickoff call, snapshot review, and agency sub-account onboarding access checklist.',
      icon: <Calendar className="w-4 h-4 text-primary" />,
    },
    {
      day: 'Days 1–3',
      title: 'Snapshot Build',
      description: 'Layout pages, mobile responsive optimization, local SEO tags, and custom code styling.',
      icon: <Code className="w-4 h-4 text-primary" />,
    },
    {
      day: 'Days 4–5',
      title: 'Automate & QA',
      description: 'Connect lead webhooks, Twilio dispatch SMS, CRM pipeline, and 12-point QA checklist.',
      icon: <ShieldCheck className="w-4 h-4 text-primary" />,
    },
    {
      day: 'Days 6–7',
      title: 'Screen Review & Handoff',
      description: 'Loom video walkthrough, live domain propagation, and handoff to your maintenance queue.',
      icon: <Video className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20 inline-block mb-3">
              Low-Risk Onboarding
            </span>
            <h2 className="type-h2 text-text mb-3">
              How we&apos;d start: The 7-Day Paid Test Build
            </h2>
            <p className="type-body text-text-2 max-w-xl">
              No long-term lock-in on day one. Give me one snapshot and one real client. Watch the communication, the speed, and the clean execution before committing to thirty sites.
            </p>
          </div>
          <Link to="/process">
            <Button variant="secondary" size="md" className="shrink-0">
              <span>View full test-build plan</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.day}
              className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
                  <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
                    {step.day}
                  </span>
                  <div className="w-7 h-7 rounded-sm bg-secondary-soft/50 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-text mb-1.5">{step.title}</h3>
                <p className="text-xs text-text-2 leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] text-text-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span>Deliverable mapped</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
