import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, GitBranch, MessageSquareX, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FailureCard {
  id: string;
  problem: string;
  impact: string;
  fixLabel: string;
  fixDescription: string;
  icon: React.ReactNode;
}

const failureCards: FailureCard[] = [
  {
    id: 'fail-1',
    problem: 'The form that stopped sending leads in March.',
    impact: 'A webhook URL changed on a third-party CRM, and the agency only found out when the plumbing client called asking why the phone went quiet for 10 days.',
    fixLabel: 'Monitored Workflows & Active Logs',
    fixDescription: 'Real-time webhook health tracking, automated failure alerts before your client notices, and automated 1m/5m/15m retry schedules.',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 'fail-2',
    problem: 'The snapshot that drifted across 22 sites.',
    impact: 'Every time a new trades client was onboarded, tweaks were made directly in the live sub-account. Soon, no two sites shared the same pipeline, and updating one broke another.',
    fixLabel: 'Version-Controlled Snapshots',
    fixDescription: 'Strict snapshot versioning (v4.1 -> v4.2) with drift detection indicators and one-click regression-tested rollouts.',
    icon: <GitBranch className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 'fail-3',
    problem: 'The edit request buried in an SMS thread.',
    impact: '"Can you change our Saturday emergency hours?" texted to the owner at 9:30 PM, forgotten by Monday morning, resulting in an upset client and scrambled revisions.',
    fixLabel: 'One Centralized Maintenance Queue',
    fixDescription: 'Structured Kanban tickets with before/after visual verification sliders, changelogs, and one-business-day turnaround commitments.',
    icon: <MessageSquareX className="w-5 h-5 text-rose-600" />,
  },
];

export const ProblemStory: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">
              The Reality of Agency Scale
            </span>
            <h2 className="type-h2 text-text mb-4">
              The problem, honestly.
            </h2>
            <p className="type-body text-text-2 mb-6">
              When you manage 10 sites, duct tape works. When you scale toward 30 to 50 Canadian local clients, silent breaks kill your agency retention.
            </p>

            {/* Dynamic Fix Pill tied to scroll card */}
            <div className="p-4 rounded-md bg-elevated border border-border shadow-sh-1 flex flex-col gap-2 transition-all duration-med">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>The Northline System</span>
              </div>
              <div className="text-base font-semibold text-text">
                {failureCards[activeCardIndex].fixLabel}
              </div>
              <div className="text-xs text-text-2 leading-relaxed">
                {failureCards[activeCardIndex].fixDescription}
              </div>
            </div>
          </div>

          {/* Right Column: 3 Failure Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {failureCards.map((card, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardIndex(idx)}
                  className={cn(
                    'p-6 sm:p-7 rounded-lg border transition-all duration-med text-left cursor-pointer',
                    isActive
                      ? 'bg-elevated border-primary/40 shadow-sh-2 translate-x-1'
                      : 'bg-elevated/60 border-border hover:border-border-strong hover:bg-elevated'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-sm bg-bg border border-border shrink-0">
                      {card.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-text-muted">
                          Failure 0{idx + 1}
                        </span>
                        {isActive && (
                          <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-full bg-secondary-soft">
                            Active Focus
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-text">
                        &ldquo;{card.problem}&rdquo;
                      </h3>
                      <p className="text-sm text-text-2 leading-relaxed">
                        {card.impact}
                      </p>

                      <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-2 text-xs font-medium text-primary">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span>Solved by: {card.fixLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
