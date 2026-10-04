import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Loader2, Sparkles, Terminal, Shield, MoveRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const ConsoleTeaser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deploy' | 'automate' | 'maintain'>('deploy');
  const [deployStep, setDeployStep] = useState(0);

  // Deploy animation stepper
  useEffect(() => {
    if (activeTab === 'deploy') {
      setDeployStep(0);
      const timer = setInterval(() => {
        setDeployStep((prev) => (prev < 4 ? prev + 1 : 0));
      }, 1400);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20 inline-block mb-3">
            Operations & Scale
          </span>
          <h2 className="type-h2 text-text mb-4">
            How your 30–50 sites actually get run.
          </h2>
          <p className="type-body text-text-2">
            No messy spreadsheets or ad-hoc logins. A disciplined operations console designed to deploy, automate, and maintain client builds with zero drift.
          </p>
        </div>

        {/* Browser Chrome Frame */}
        <div className="bg-elevated border border-border rounded-lg shadow-sh-3 overflow-hidden text-left max-w-4xl mx-auto">
          {/* Top Bar / Window Controls */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-border-strong/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-border-strong/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-border-strong/80 inline-block" />
              <span className="ml-3 text-xs font-mono text-text-muted">
                console.northline-partner.ca/preview
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                ● Live Demo Environment
              </span>
            </div>
          </div>

          {/* Mini-Console Viewport Container */}
          <div className="p-6 sm:p-8 min-h-[340px] flex items-center justify-center bg-bg/50">
            {activeTab === 'deploy' && (
              <div className="w-full max-w-lg bg-elevated border border-border rounded-md p-5 shadow-sh-1">
                <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                  <span className="text-xs font-semibold text-text uppercase tracking-wider">
                    Snapshot Deployment Engine
                  </span>
                  <span className="text-xs font-mono text-text-muted">Trades v4.2</span>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Provision GHL Sub-account & CNAME', step: 0 },
                    { label: 'Inject Canadian Brand Assets & CASL Consent', step: 1 },
                    { label: 'Deploy 9 Monitored Workflows & SMS Hooks', step: 2 },
                    { label: 'Automated 12-Point Regression QA Check', step: 3 },
                  ].map((item, idx) => {
                    const isDone = deployStep > idx;
                    const isRunning = deployStep === idx;
                    return (
                      <div
                        key={item.label}
                        className={cn(
                          'flex items-center justify-between p-2.5 rounded-sm border text-xs transition-all duration-med',
                          isDone
                            ? 'bg-success-bg border-success/30 text-success'
                            : isRunning
                            ? 'bg-secondary-soft border-primary/40 text-primary font-semibold'
                            : 'bg-surface border-border text-text-muted'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          ) : isRunning ? (
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-border-strong flex items-center justify-center text-[10px]">
                              {idx + 1}
                            </span>
                          )}
                          <span>{item.label}</span>
                        </div>
                        <span className="font-mono text-[10px]">
                          {isDone ? 'COMPLETED' : isRunning ? 'APPLYING...' : 'QUEUED'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'automate' && (
              <div className="w-full max-w-lg flex flex-col gap-3">
                <div className="text-xs font-semibold uppercase text-text-2 tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span>Real-Time Lead Automation Node Chain</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full p-3 rounded-md bg-elevated border border-border text-left shadow-sh-1">
                    <span className="text-[10px] uppercase font-mono text-accent font-semibold block">
                      Trigger
                    </span>
                    <span className="text-xs font-semibold text-text">Website Quote Form</span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Calgary NW lead</span>
                  </div>
                  <MoveRight className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
                  <div className="w-full p-3 rounded-md bg-elevated border border-primary/50 text-left shadow-sh-1">
                    <span className="text-[10px] uppercase font-mono text-primary font-semibold block">
                      Instant Action
                    </span>
                    <span className="text-xs font-semibold text-text">SMS Sent (&lt;30s)</span>
                    <span className="text-[11px] text-emerald-700 block mt-0.5">Delivered via Twilio</span>
                  </div>
                  <MoveRight className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
                  <div className="w-full p-3 rounded-md bg-elevated border border-border text-left shadow-sh-1">
                    <span className="text-[10px] uppercase font-mono text-secondary font-semibold block">
                      Pipeline
                    </span>
                    <span className="text-xs font-semibold text-text">Deal Card Added</span>
                    <span className="text-[11px] text-text-muted block mt-0.5">$450 Est. Value</span>
                  </div>
                </div>
                <div className="p-3 bg-elevated border border-border rounded-md text-xs font-mono text-text-2 flex items-center justify-between">
                  <span>Log: Webhook 200 OK · 142ms latency · 0 packet loss</span>
                  <span className="text-emerald-700 font-bold">✓ VERIFIED</span>
                </div>
              </div>
            )}

            {activeTab === 'maintain' && (
              <div className="w-full max-w-lg bg-elevated border border-border rounded-md p-5 shadow-sh-1">
                <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                  <span className="text-xs font-semibold text-text">
                    Ticket #104: Victoria Day Holiday Banner
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    QA Passed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="p-2.5 rounded bg-surface border border-border">
                    <span className="text-[10px] uppercase font-mono text-text-muted block mb-1">
                      Before Change
                    </span>
                    <span className="text-text font-medium">Standard Mon-Fri 7am-6pm</span>
                  </div>
                  <div className="p-2.5 rounded bg-success-bg border border-success/30">
                    <span className="text-[10px] uppercase font-mono text-success block mb-1">
                      After Update
                    </span>
                    <span className="text-text font-medium">24/7 On-Call Dispatch Notice</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-text-muted">
                  <span>Client: Ridgeline Plumbing & Heating</span>
                  <span>Turnaround: 4.2 hours</span>
                </div>
              </div>
            )}
          </div>

          {/* Three Feature Annotation Tabs */}
          <div className="grid grid-cols-3 border-t border-border bg-surface text-center">
            {[
              { id: 'deploy', title: '1. Deploy', subtitle: 'Snapshot wizard & sub-accounts' },
              { id: 'automate', title: '2. Automate', subtitle: 'Workflows, triggers & webhooks' },
              { id: 'maintain', title: '3. Maintain', subtitle: 'Visual QA & change requests' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'p-3.5 sm:p-4 text-left transition-colors cursor-pointer border-r last:border-r-0 border-border',
                  activeTab === tab.id
                    ? 'bg-elevated text-primary font-semibold border-b-2 border-b-primary'
                    : 'text-text-2 hover:bg-secondary-soft/30 hover:text-text'
                )}
              >
                <div className="text-xs font-semibold">{tab.title}</div>
                <div className="text-[11px] text-text-muted truncate mt-0.5">{tab.subtitle}</div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <Link to="/console">
            <Button variant="primary" size="lg" className="shadow-sh-2">
              <span>Open the full Partner Console</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
