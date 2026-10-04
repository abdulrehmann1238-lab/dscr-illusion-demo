import React, { useState } from 'react';
import { Navbar } from '../components/marketing/Navbar';
import { Footer } from '../components/marketing/Footer';
import { AccordionItem } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Clock, ShieldCheck, Video, Calendar, Code, ArrowRight } from 'lucide-react';
import { brand } from '../config/brand';

const initialQaItems = [
  { label: 'Mobile responsive audit at 375px, 412px, 768px, 1280px', checked: true },
  { label: 'Form submission validation & Canadian postal code parsing', checked: true },
  { label: 'CASL explicit opt-in consent and privacy disclosure tags', checked: true },
  { label: 'Twilio 10DLC SMS instant dispatch trigger (<30s delay)', checked: true },
  { label: 'CRM pipeline deal card creation with estimated job values', checked: true },
  { label: 'Technician on-call internal push & SMS notifications', checked: true },
  { label: 'Google Calendar booking slot synchronization', checked: true },
  { label: 'SSL certificate verification and custom CNAME propagation', checked: true },
  { label: 'Click-to-call mobile URI encoding and tracking events', checked: true },
  { label: 'Local SEO meta tags, OpenGraph images, and semantic H1s', checked: true },
  { label: 'Core Web Vitals check: LCP < 2.0s, CLS < 0.05', checked: true },
  { label: 'Loom video walkthrough recorded and shared with agency owner', checked: true },
];

export const ProcessPage: React.FC = () => {
  const [qaList, setQaList] = useState(initialQaItems);

  const toggleQa = (index: number) => {
    setQaList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedCount = qaList.filter((q) => q.checked).length;
  const progressPct = Math.round((completedCount / qaList.length) * 100);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36 sm:pb-28 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20 inline-block mb-3">
              Predictable Delivery Cadence
            </span>
            <h1 className="type-h1 text-text mb-4">
              The 7-Day Paid Test Build, mapped out.
            </h1>
            <p className="type-body-l text-text-2">
              Before we discuss managing 30 to 50 sites on retainer, let&apos;s build one site together. Clear milestones, daily updates, zero surprises.
            </p>
          </div>

          {/* 7-Day Timeline Accordion */}
          <div className="space-y-4 mb-20">
            <h2 className="type-h2 text-text mb-6">Milestones & Deliverables</h2>

            <AccordionItem
              title="Day 0: Brief & Agency Onboarding Checklist"
              subtitle="Access provisioning, snapshot alignment, and brand assets collection"
              defaultOpen={true}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-primary font-bold uppercase block mb-1">
                    Deliverables
                  </span>
                  <p className="text-xs text-text-2">
                    Sub-account access verified, snapshot cloned, custom domain DNS records requested.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-accent font-bold uppercase block mb-1">
                    Needed From You
                  </span>
                  <p className="text-xs text-text-2">
                    Client logo, phone number, primary service area, and snapshot choice.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-secondary font-bold uppercase block mb-1">
                    Communication
                  </span>
                  <p className="text-xs text-text-2">
                    Shared Slack channel or email thread with confirmation memo within 4 hours.
                  </p>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              title="Days 1–3: Snapshot Build & Responsive Layout"
              subtitle="Full page architecture, custom CSS typography tokens, and mobile reflow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-primary font-bold uppercase block mb-1">
                    Deliverables
                  </span>
                  <p className="text-xs text-text-2">
                    10–18 production pages built, mobile sticky call bar injected, local Calgary SEO schema.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-accent font-bold uppercase block mb-1">
                    Needed From You
                  </span>
                  <p className="text-xs text-text-2">
                    Quick mid-point layout approval via staged preview link.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-secondary font-bold uppercase block mb-1">
                    Communication
                  </span>
                  <p className="text-xs text-text-2">
                    End-of-day Loom video walkthrough (3 mins) demonstrating all mobile viewports.
                  </p>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              title="Days 4–5: Automations, Integrations & 12-Point QA"
              subtitle="Webhooks, Twilio instant SMS dispatch, CRM pipelines, and regression testing"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-primary font-bold uppercase block mb-1">
                    Deliverables
                  </span>
                  <p className="text-xs text-text-2">
                    Full CRM lead routing, SMS confirmation under 30s, Google Calendar sync, and live test lead executed.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-accent font-bold uppercase block mb-1">
                    Needed From You
                  </span>
                  <p className="text-xs text-text-2">
                    Confirm recipient phone number for technician dispatch alerts.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-secondary font-bold uppercase block mb-1">
                    Communication
                  </span>
                  <p className="text-xs text-text-2">
                    Detailed QA report with test lead IDs and payload logs.
                  </p>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              title="Days 6–7: Review, Domain Propagation & Queue Handoff"
              subtitle="Live domain SSL verification, Loom video recap, and maintenance queue onboarding"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-primary font-bold uppercase block mb-1">
                    Deliverables
                  </span>
                  <p className="text-xs text-text-2">
                    Live production site on custom domain, locked snapshot record, and maintenance ticket system activated.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-accent font-bold uppercase block mb-1">
                    Needed From You
                  </span>
                  <p className="text-xs text-text-2">
                    Final sign-off and alignment on monthly recurring maintenance schedule.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded border border-border">
                  <span className="text-[11px] font-mono text-secondary font-bold uppercase block mb-1">
                    Communication
                  </span>
                  <p className="text-xs text-text-2">
                    15-minute handoff screen-share or recap video.
                  </p>
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* Interactive 12-Point QA Checklist Component (PRD §14.12) */}
          <div className="p-6 sm:p-8 rounded-lg bg-surface border border-border mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-border gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent block">
                  Interactive QA Standards
                </span>
                <h3 className="type-h3 text-text">
                  The 12-Point Pre-Launch Verification Checklist
                </h3>
              </div>

              {/* Progress Ring / Percentage */}
              <div className="flex items-center gap-3 bg-elevated px-4 py-2 rounded-md border border-border shadow-sh-1 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-primary block leading-none">
                    {completedCount} / {qaList.length} PASSED
                  </span>
                  <span className="text-[10px] text-text-muted">Regression Signoff</span>
                </div>
                <div className="w-10 h-10 rounded-full border-4 border-emerald-200 border-t-emerald-700 flex items-center justify-center font-mono font-bold text-xs text-emerald-800">
                  {progressPct}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {qaList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleQa(idx)}
                  className="flex items-start gap-3 p-3 rounded-md bg-elevated border border-border hover:border-border-strong cursor-pointer transition-colors select-none"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="mt-0.5 h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  <span
                    className={`text-xs leading-relaxed ${
                      item.checked ? 'text-text font-medium' : 'text-text-muted line-through'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Model: 3 Columns (Build · Monitor · Maintain) */}
          <div className="mb-20">
            <h2 className="type-h2 text-text mb-8">Ongoing Partnership Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-elevated border border-border shadow-sh-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-secondary-soft flex items-center justify-center text-primary font-bold text-sm mb-4">
                    01
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">Build & Provision</h3>
                  <p className="text-xs text-text-2 leading-relaxed mb-4">
                    Fast, error-free onboarding for every new client your sales team closes. Full snapshot configuration, custom CSS, domain setup, and tested forms.
                  </p>
                </div>
                <div className="pt-3 border-t border-border text-[11px] text-text-muted font-mono">
                  SLA: 3–5 business days per site
                </div>
              </div>

              <div className="p-6 rounded-lg bg-elevated border border-border shadow-sh-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-secondary-soft flex items-center justify-center text-primary font-bold text-sm mb-4">
                    02
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">Monitor & Protect</h3>
                  <p className="text-xs text-text-2 leading-relaxed mb-4">
                    Continuous monitoring of webhook delivery, form routing, SMS dispatch triggers, and domain SSL health so bugs are resolved before your client calls.
                  </p>
                </div>
                <div className="pt-3 border-t border-border text-[11px] text-text-muted font-mono">
                  SLA: Automated failure alerts & retries
                </div>
              </div>

              <div className="p-6 rounded-lg bg-elevated border border-border shadow-sh-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-secondary-soft flex items-center justify-center text-primary font-bold text-sm mb-4">
                    03
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">Maintain & Iterate</h3>
                  <p className="text-xs text-text-2 leading-relaxed mb-4">
                    Centralized change request queue for text updates, photo swaps, holiday banners, and new service landing pages with before/after visual QA.
                  </p>
                </div>
                <div className="pt-3 border-t border-border text-[11px] text-text-muted font-mono">
                  SLA: {brand.responseCommitment}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 rounded-lg bg-primary text-surface text-center flex flex-col items-center">
            <h3 className="font-display text-2xl sm:text-3xl font-medium mb-3">
              Ready to schedule your paid test build?
            </h3>
            <p className="text-sm text-secondary-soft max-w-lg mb-6">
              Let&apos;s pick a real client project or upgrade an existing snapshot. One week from kickoff, you&apos;ll have a production-ready build.
            </p>
            <a href="#contact">
              <Button
                variant="accent"
                size="lg"
                className="shadow-sh-2"
                onClick={() => {
                  window.location.href = '/contact';
                }}
              >
                <span>Start the test build now</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
