import React from 'react';
import { Navbar } from '../components/marketing/Navbar';
import { Footer } from '../components/marketing/Footer';
import { WorkCard, selectedBuilds } from '../components/marketing/WorkCard';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const WorkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20 inline-block mb-3">
              Client Builds & Snapshots
            </span>
            <h1 className="type-h1 text-text mb-4">
              Selected Work for Canadian Local Business
            </h1>
            <p className="type-body-l text-text-2">
              Every site here is built on GoHighLevel with modular CSS design tokens, custom code enhancements, and rigorously monitored CRM automations.
            </p>
          </div>

          {/* 3 Case Study Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {selectedBuilds.map((build) => (
              <WorkCard key={build.id} build={build} />
            ))}
          </div>

          {/* Agency Standards Strip */}
          <div className="p-8 rounded-lg bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-3 max-w-xl">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-text">Snapshot Consistency Standards</h4>
                <p className="text-xs text-text-2 mt-1 leading-relaxed">
                  Every site is deployed from locked snapshot versions. Modifications are isolated to custom code variables, ensuring painless portfolio-wide upgrades without breakages.
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-text-muted shrink-0">
              CASL · PIPEDA · Responsive
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
