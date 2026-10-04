import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Navbar } from '../components/marketing/Navbar';
import { Footer } from '../components/marketing/Footer';
import { selectedBuilds } from '../components/marketing/WorkCard';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Workflow, Code } from 'lucide-react';

export const CaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const build = selectedBuilds.find((b) => b.slug === slug);

  if (!build) {
    return <Navigate to="/work" replace />;
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
          {/* Back button */}
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all builds</span>
          </Link>

          {/* Title Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent block mb-2">
              {build.industry} · {build.location}
            </span>
            <h1 className="type-h1 text-text mb-4">{build.title}</h1>
            <p className="type-body-l text-text-2">{build.headline}</p>
          </div>

          {/* Sticky Left Summary + Right Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sticky Left Column: Meta & Action */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-elevated border border-border rounded-lg p-6 shadow-sh-1 space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-text-muted uppercase block">
                    GHL Snapshot
                  </span>
                  <span className="text-sm font-semibold text-text">{build.snapshot}</span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-text-muted uppercase block">
                    Primary Goal
                  </span>
                  <span className="text-xs text-text-2 leading-relaxed">{build.outcome}</span>
                </div>

                <div className="pt-3 border-t border-border">
                  <span className="text-[11px] font-mono text-text-muted uppercase block mb-2">
                    Verified Outcomes
                  </span>
                  <div className="space-y-2">
                    {build.stats.map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-xs">
                        <span className="text-text-2">{s.label}:</span>
                        <span className="font-bold font-mono text-primary">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-col gap-2.5">
                  {build.isLiveDemo ? (
                    <Link to="/demo/site/ridgeline-plumbing">
                      <Button variant="primary" size="md" className="w-full">
                        <span>Launch Live Interactive Site</span>
                        <ArrowUpRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  ) : null}

                  <Link to={`/console/clients/${build.id}`}>
                    <Button variant="secondary" size="md" className="w-full">
                      <span>View in Partner Console</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Narrative Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Context & Challenge */}
              <div className="space-y-3">
                <h3 className="type-h3 text-text">The Client Problem & Market Context</h3>
                <p className="type-body text-text-2">
                  In the Canadian home services sector, lead capture speed is everything. Over 70% of emergency furnace and water heater replacement inquiries choose the first provider who responds. Traditional web agency builds suffered from bloated WordPress load times and delayed form notifications that sent leads to dead inboxes hours later.
                </p>
                <p className="type-body text-text-2">
                  Prairie &amp; Pine Digital needed a repeatable, snapshot-driven funnel capable of instant SMS dispatch, postal-code radius validation for Calgary quadrants, and zero maintenance friction.
                </p>
              </div>

              {/* What Was Built */}
              <div className="space-y-4">
                <h3 className="type-h3 text-text">What Was Built in GoHighLevel</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-md bg-surface border border-border">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                      <Zap className="w-4 h-4 text-accent" />
                      <span>90-Second Multi-Step Quote</span>
                    </div>
                    <p className="text-xs text-text-2">
                      Radio cards, Canadian postal code regex validation, and CASL explicit consent checkboxes.
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-surface border border-border">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                      <Workflow className="w-4 h-4 text-primary" />
                      <span>Automated Twilio Dispatch</span>
                    </div>
                    <p className="text-xs text-text-2">
                      Instant text within 30 seconds confirming request receipt and paging on-call technicians.
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-surface border border-border">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                      <Code className="w-4 h-4 text-[#1E3A5F]" />
                      <span>Sticky Quick-Dial Bar</span>
                    </div>
                    <p className="text-xs text-text-2">
                      Custom CSS floating bar designed for mobile touch ergonomics with safe-area notch padding.
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-surface border border-border">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>12-Point Regression QA</span>
                    </div>
                    <p className="text-xs text-text-2">
                      Verified form delivery, Google Reviews follow-up drip, and SSL certificates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Qualitative & Quantitative Results */}
              <div className="space-y-3 p-6 rounded-lg bg-surface border border-border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text">
                  Operational Results for the Agency
                </h4>
                <ul className="space-y-2 text-sm text-text-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>Deployed in 3 business days from snapshot brief to live DNS propagation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>Average customer quote conversion lifted by 38% compared to client&apos;s previous site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>Zero snapshot drift: ongoing maintenance requests handled through a central queue.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
