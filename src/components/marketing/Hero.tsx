import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { CanadaMap } from './CanadaMap';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left 6 Columns: Narrative & CTAs */}
          <div className="lg:col-span-6 flex flex-col text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/60 border border-secondary/30">
                GoHighLevel Build & Maintenance Partner
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="type-h1 text-text mb-6">
              Your agency sells the websites. I make sure every one of them keeps working.
            </h1>

            {/* Body Large */}
            <p className="type-body-l text-text-2 mb-8 max-w-xl">
              Snapshot-built sites, automations that don&apos;t silently fail, and a maintenance queue that never goes quiet. One senior partner for every client you add, from your next five to your next fifty.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <Link to="/console">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-sh-2">
                  <span>Explore the Partner Console</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link to="/demo/site/ridgeline-plumbing">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <span>Open Ridgeline sample site</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 text-text-muted" />
                </Button>
              </Link>
            </div>

            {/* Trust Row text chips */}
            <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-text-2 mr-1">Specialties:</span>
              {[
                '3–5+ yrs GHL',
                'Snapshot Architecture',
                'Monitored Workflows',
                'API & Webhooks',
                'SaaS Mode',
                'Custom CSS/Code',
              ].map((chip) => (
                <span
                  key={chip}
                  className="text-xs px-2.5 py-1 rounded-sm bg-surface border border-border text-text-2 font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right 6 Columns: Interactive Canada Map */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <CanadaMap />
          </div>
        </div>

        {/* Scroll cue (PRD §8.2) */}
        <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 text-text-muted/80">
          <span className="text-[10px] uppercase font-semibold tracking-widest mb-2 font-mono">
            Scroll to discover
          </span>
          <div className="w-[1px] h-8 bg-border-strong relative overflow-hidden">
            <div className="w-full h-3 bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
