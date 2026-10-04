import React, { useState } from 'react';
import { Slider } from '../../components/ui/Slider';
import { Input } from '../../components/ui/Input';
import { Tooltip } from '../../components/ui/Tooltip';
import { TrendingUp, HelpCircle, Layers, ShieldCheck, UserCheck } from 'lucide-react';
import { formatCAD } from '../../lib/format';

export const GrowthPage: React.FC = () => {
  const [activeSites, setActiveSites] = useState(14);
  const [requestsPerSite, setRequestsPerSite] = useState(2.0);
  const [hoursPerRequest, setHoursPerRequest] = useState(0.75);
  const [partnerRateInput, setPartnerRateInput] = useState('');

  const monthlyRequests = Math.round(activeSites * requestsPerSite);
  const monthlyDevHours = (monthlyRequests * hoursPerRequest).toFixed(1);
  const partnerRateNum = parseFloat(partnerRateInput);

  // Capacity threshold logic (PRD §14.9)
  // Up to 35 sites (approx 50h/mo): Comfortable for 1 senior partner
  // 36–50 sites (approx 75h/mo): High efficiency, snapshot discipline crucial
  // 50+ sites: May require second dedicated build assistant
  const capacityPct = Math.min(100, Math.round((activeSites / 50) * 100));

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-border">
        <span className="text-[10px] uppercase font-mono tracking-wider text-accent font-semibold block">
          Recommended Partner Enhancement
        </span>
        <h1 className="text-2xl font-display font-medium text-text mt-0.5">
          Capacity &amp; Recurring Growth Model
        </h1>
        <p className="text-xs text-text-2 mt-1 max-w-2xl">
          &ldquo;Scale the portfolio, not the chaos.&rdquo; Explore how maintenance workload develops as your agency grows from 10 to 50 Canadian local-business sites.
        </p>
      </div>

      {/* Interactive Controls Card */}
      <div className="bg-elevated border border-border rounded-lg p-6 shadow-sh-1 space-y-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
          Interactive Capacity Variables
        </h3>

        {/* 1. Sites Slider */}
        <Slider
          label="Total Maintained Agency Sites (5 – 60)"
          value={activeSites}
          min={5}
          max={60}
          step={1}
          valueDisplay={`${activeSites} Active Sites`}
          onChange={(e) => setActiveSites(Number(e.target.value))}
          marks={[
            { value: 12, label: 'Baseline (12)' },
            { value: 30, label: 'Scale Phase (30)' },
            { value: 50, label: 'Agency Goal (50)' },
          ]}
        />

        {/* 2. Secondary Assumptions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Avg. Changes / Site / Month
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="10"
              value={requestsPerSite}
              onChange={(e) => setRequestsPerSite(parseFloat(e.target.value) || 1)}
              className="w-full text-xs font-mono bg-surface border border-border rounded px-3 py-2 text-text outline-none focus:border-primary"
            />
            <span className="text-[11px] text-text-muted mt-1 block">
              Content, text & styling edits
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Avg. Dev Hours per Ticket
            </label>
            <input
              type="number"
              step="0.25"
              min="0.25"
              max="5"
              value={hoursPerRequest}
              onChange={(e) => setHoursPerRequest(parseFloat(e.target.value) || 0.5)}
              className="w-full text-xs font-mono bg-surface border border-border rounded px-3 py-2 text-text outline-none focus:border-primary"
            />
            <span className="text-[11px] text-text-muted mt-1 block">
              Includes testing & QA checks
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                Partner Retainer / Site / Mo
              </label>
              <Tooltip content="Neutral illustrative field. We never state pricing the agency hasn't agreed to.">
                <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
              </Tooltip>
            </div>
            <input
              type="text"
              placeholder="Set after discussion"
              value={partnerRateInput}
              onChange={(e) => setPartnerRateInput(e.target.value.replace(/[^0-9.]/g, ''))}
              className="w-full text-xs font-mono bg-surface border border-border rounded px-3 py-2 text-text outline-none focus:border-primary placeholder:text-text-muted/60"
            />
            <span className="text-[10px] text-text-muted font-mono mt-1 block">
              Illustrative — pay terms to be discussed
            </span>
          </div>
        </div>
      </div>

      {/* Output Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-elevated border border-border rounded-lg shadow-sh-1">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
            Total Monthly Change Requests
          </span>
          <div className="text-3xl font-display font-semibold text-text font-mono">
            ~{monthlyRequests}
          </div>
          <span className="text-xs text-text-2 mt-1 block">
            Across {activeSites} client sites
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-elevated border border-border rounded-lg shadow-sh-1">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
            Estimated Dev Bandwidth Needed
          </span>
          <div className="text-3xl font-display font-semibold text-accent font-mono">
            ~{monthlyDevHours} hrs/mo
          </div>
          <span className="text-xs text-text-2 mt-1 block">
            Handled by your senior partner
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-elevated border border-border rounded-lg shadow-sh-1">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
            Partner Retainer Total
          </span>
          {partnerRateNum ? (
            <div className="text-3xl font-display font-semibold text-primary font-mono">
              {formatCAD(Math.round(activeSites * partnerRateNum))}
              <span className="text-xs font-normal text-text-muted ml-1">/mo CAD</span>
            </div>
          ) : (
            <div className="text-sm font-mono text-text-muted italic py-1">
              — (Awaiting agency rate input)
            </div>
          )}
          <span className="text-[10px] text-text-muted mt-1 block font-mono">
            Predictable recurring cost
          </span>
        </div>
      </div>

      {/* Capacity Indicator Bar (PRD §14.9) */}
      <div className="bg-elevated border border-border rounded-lg p-6 shadow-sh-1 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
            Operational Capacity Load Indicator
          </h3>
          <span className="text-xs font-mono font-bold text-primary">
            {activeSites <= 35
              ? 'Comfortable Bandwidth (1 Senior Partner)'
              : activeSites <= 50
              ? 'High Efficiency Tier (Strict QA Queue)'
              : 'Requires Dedicated Junior Support'}
          </span>
        </div>

        {/* Horizontal Progress Meter */}
        <div className="w-full h-3 bg-surface border border-border rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-med rounded-full"
            style={{
              width: `${capacityPct}%`,
              backgroundColor:
                activeSites <= 35
                  ? 'var(--success)'
                  : activeSites <= 50
                  ? 'var(--primary)'
                  : 'var(--accent)',
            }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-text-muted font-mono pt-1">
          <span>0 Sites</span>
          <span>30 Sites (Ideal Solo Partner Scale)</span>
          <span>50 Sites (Agency Target)</span>
        </div>

        <p className="text-xs text-text-2 leading-relaxed pt-2 border-t border-border/60">
          Because Northline works from <strong>versioned snapshots</strong> rather than bespoke codebases, maintenance tickets are completed in 30–45 minutes instead of hours. No drift means predictable turnaround.
        </p>
      </div>
    </div>
  );
};
