import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';

export const GrowthTeaser: React.FC = () => {
  const [sites, setSites] = useState(14);
  const requestsPerSite = 2.1;
  const totalMonthlyRequests = Math.round(sites * requestsPerSite);
  const hoursSavedPerMonth = Math.round(totalMonthlyRequests * 0.75);

  return (
    <section className="py-20 sm:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20">
            Portfolio Capacity & Scale
          </span>
        </div>

        <h2 className="type-h2 text-text mb-4">
          Scale the portfolio, not the operational chaos.
        </h2>
        <p className="type-body text-text-2 max-w-xl mx-auto mb-10">
          See how the maintenance workload scales from your next 10 sites to 50 active Canadian business accounts without hiring full-time staff.
        </p>

        {/* Interactive Slider Box */}
        <div className="bg-elevated border border-border rounded-lg p-6 sm:p-8 shadow-sh-2 text-left mb-8">
          <Slider
            label="Active Client Sites in your Agency"
            value={sites}
            min={5}
            max={60}
            step={1}
            valueDisplay={`${sites} client sites`}
            onChange={(e) => setSites(Number(e.target.value))}
            marks={[
              { value: 12, label: 'Current baseline (12)' },
              { value: 30, label: 'Phase 2 Scale (30)' },
              { value: 50, label: 'Agency Target (50)' },
            ]}
          />

          {/* Dynamic Calculated Results Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="p-3 bg-surface rounded-md border border-border">
              <span className="text-[11px] text-text-muted font-semibold uppercase block mb-1">
                Monthly Change Requests
              </span>
              <span className="text-2xl font-bold font-mono text-primary">
                ~{totalMonthlyRequests}
              </span>
              <span className="text-[11px] text-text-muted block mt-0.5">
                Content, design & tweaks
              </span>
            </div>

            <div className="p-3 bg-surface rounded-md border border-border">
              <span className="text-[11px] text-text-muted font-semibold uppercase block mb-1">
                Estimated Dev Time Handled
              </span>
              <span className="text-2xl font-bold font-mono text-accent">
                ~{hoursSavedPerMonth} hrs
              </span>
              <span className="text-[11px] text-text-muted block mt-0.5">
                Off your agency plate
              </span>
            </div>

            <div className="p-3 bg-surface rounded-md border border-border">
              <span className="text-[11px] text-text-muted font-semibold uppercase block mb-1">
                Partner Bandwidth
              </span>
              <span className="text-sm font-semibold font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">
                {sites <= 35 ? 'Comfortable (1 senior dev)' : 'Co-managed queue'}
              </span>
              <span className="text-[11px] text-text-muted block mt-1">
                Zero snapshot drift
              </span>
            </div>
          </div>
        </div>

        <Link to="/console/growth">
          <Button variant="secondary" size="md">
            <span>Explore full Growth & Capacity Model</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
