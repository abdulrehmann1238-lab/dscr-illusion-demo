import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { brand } from '../../config/brand';
import { KpiCard } from '../../components/console/KpiCard';
import { LineChart } from '../../components/console/LineChart';
import { ActivityFeed } from '../../components/console/ActivityFeed';
import { StatusPill } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  AlertTriangle,
  GitBranch,
  Globe,
  ArrowRight,
  TrendingUp,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { formatCAD } from '../../lib/format';

export const OverviewPage: React.FC = () => {
  const { clients, requests } = useAppStore();
  const navigate = useNavigate();

  const [selectedChartClient, setSelectedChartClient] = useState('c01');

  // Sparkline sample datasets (PRD §14.1)
  const sparklineSites = [10, 10, 11, 11, 12, 12, 13, 14];
  const sparklineLeads = [34, 38, 42, 39, 45, 48, 52, 58];
  const sparklineSuccess = [98.8, 99.0, 99.1, 99.4, 98.9, 99.2, 99.3, 99.2];
  const sparklineTurnaround = [2.2, 2.0, 1.8, 1.9, 1.6, 1.5, 1.4, 1.4];

  // 30-day chart mock datasets
  const allSitesLeads = [
    32, 35, 30, 42, 45, 40, 48, 52, 50, 58, 62, 55, 60, 68, 65,
    72, 70, 75, 78, 82, 80, 85, 88, 92, 90, 95, 98, 102, 108, 112,
  ];

  const selectedSiteLeads = [
    8, 9, 7, 11, 12, 10, 14, 15, 13, 16, 18, 15, 17, 19, 18,
    20, 19, 21, 22, 24, 23, 25, 26, 28, 27, 29, 30, 32, 34, 36,
  ];

  const clientObj = clients.find((c) => c.id === selectedChartClient) || clients[0];

  const liveSitesCount = clients.filter((c) => c.status === 'Live').length;
  const pendingRequestsCount = requests.filter(
    (r) => r.stage === 'Requested' || r.stage === 'In progress'
  ).length;

  return (
    <div className="space-y-8 text-left">
      {/* Top Greeting & Operational Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
            Canadian Agency Operations Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-text mt-0.5">
            Good morning, {brand.agencyOwner.split(' ')[0]}
          </h1>
          <p className="text-xs text-text-2 mt-1">
            <span className="font-semibold text-warning">2 sites need attention.</span>{' '}
            <span className="text-text-muted">{pendingRequestsCount} change requests active in the maintenance queue.</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/console/deploy">
            <Button variant="primary" size="sm" icon={<PlusCircle className="w-3.5 h-3.5" />}>
              Deploy new client
            </Button>
          </Link>
          <Link to="/demo/site/ridgeline-plumbing">
            <Button variant="secondary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              Live sample site
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Needs Action Strip (PRD §14.1) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-accent" />
            <span>Needs Attention (Priority Fixes)</span>
          </span>
          <span className="text-text-muted font-mono">3 flagged</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Failing webhook */}
          <div className="p-4 rounded-lg bg-elevated border border-border border-l-4 border-l-accent shadow-sh-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-text">Prairie Sky Roofing</span>
                <span className="text-[10px] font-mono font-bold text-error bg-error-bg px-1.5 py-0.2 rounded">
                  500 Error
                </span>
              </div>
              <p className="text-xs text-text-2 leading-relaxed mb-3">
                Intake webhook failing (last 3 submissions). Destination pool timed out.
              </p>
            </div>
            <div className="flex justify-end pt-2 border-t border-border/50">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs w-full bg-surface"
                onClick={() => navigate('/console/integrations')}
              >
                <span>Fix Webhook in Inspector</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Card 2: Outdated snapshot */}
          <div className="p-4 rounded-lg bg-elevated border border-border border-l-4 border-l-warning shadow-sh-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-text">Capital City Cleaners</span>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                  Outdated Snapshot
                </span>
              </div>
              <p className="text-xs text-text-2 leading-relaxed mb-3">
                Running Home Services v4.1. Version v4.2 with CASL compliance ready to apply.
              </p>
            </div>
            <div className="flex justify-end pt-2 border-t border-border/50">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs w-full bg-surface"
                onClick={() => navigate('/console/snapshots')}
              >
                <span>Review Diff & Upgrade</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Card 3: Domain pending */}
          <div className="p-4 rounded-lg bg-elevated border border-border border-l-4 border-l-secondary shadow-sh-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-text">Lakehead Auto Care</span>
                <span className="text-[10px] font-mono font-bold text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded">
                  DNS Pending
                </span>
              </div>
              <p className="text-xs text-text-2 leading-relaxed mb-3">
                CNAME record lakeheadauto.ca detected. SSL certificate issuance queued.
              </p>
            </div>
            <div className="flex justify-end pt-2 border-t border-border/50">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs w-full bg-surface"
                onClick={() => navigate('/console/clients/c09')}
              >
                <span>Re-verify DNS & SSL</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KPI Metrics Row (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Agency Sites Live"
          value={liveSitesCount}
          delta={{ value: '+2 this month', positive: true }}
          sparklineData={sparklineSites}
          tooltip="Active Canadian local-business websites maintained across all sub-accounts."
        />
        <KpiCard
          label="Leads Routed (30d)"
          value="1,284"
          delta={{ value: '+9.2%', positive: true }}
          sparklineData={sparklineLeads}
          tooltip="Total customer inquiries processed across quote forms, calendar bookings, and missed-call text backs."
        />
        <KpiCard
          label="Workflow Success Rate"
          value="99.2%"
          delta={{ value: '0.8% failure alert', positive: false }}
          sparklineData={sparklineSuccess}
          sparklineColor="var(--success)"
          tooltip="Percentage of automated Twilio SMS triggers and CRM deal allocations that resolved without error."
        />
        <KpiCard
          label="Avg. Turnaround Time"
          value="1.4 days"
          delta={{ value: '-0.6d faster', positive: true }}
          sparklineData={sparklineTurnaround}
          tooltip="Average resolution time for maintenance requests from submission to production QA signoff."
        />
      </div>

      {/* 3. Two-Column Dashboard: Lead Volume Chart & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Lead Volume Chart */}
        <div className="lg:col-span-7 bg-elevated border border-border rounded-lg p-5 shadow-sh-1 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                Lead Ingestion Volume
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                30-day conversion telemetry across all agency sub-accounts.
              </p>
            </div>

            <select
              value={selectedChartClient}
              onChange={(e) => setSelectedChartClient(e.target.value)}
              className="text-xs bg-surface border border-border rounded px-2.5 py-1.5 font-medium text-text outline-none cursor-pointer"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortName} ({c.city})
                </option>
              ))}
            </select>
          </div>

          <LineChart
            allSitesData={allSitesLeads}
            selectedSiteData={selectedSiteLeads}
            selectedSiteName={clientObj.shortName}
          />
        </div>

        {/* Right Column (5 cols): Activity Feed */}
        <div className="lg:col-span-5">
          <ActivityFeed maxItems={6} />
        </div>
      </div>

      {/* 4. Clients at a Glance Compact Table */}
      <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
              Agency Portfolio Overview
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Showing 6 of {clients.length} active client accounts.
            </p>
          </div>

          <Link to="/console/clients">
            <Button variant="ghost" size="sm" className="text-xs">
              <span>View all {clients.length} clients</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-text-muted border-b border-border/70 font-mono text-[11px]">
                <th className="pb-2 font-medium">Business</th>
                <th className="pb-2 font-medium">Snapshot</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Leads (30d)</th>
                <th className="pb-2 font-medium">Uptime</th>
                <th className="pb-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {clients.slice(0, 6).map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/console/clients/${c.id}`)}
                  className="hover:bg-surface/60 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 font-medium text-text">
                    <div className="flex flex-col">
                      <span className="font-semibold">{c.business}</span>
                      <span className="text-[11px] text-text-muted">
                        {c.city}, {c.province}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 font-mono text-text-2">
                    {c.snapshot} {c.snapshotVersion}
                    {c.snapshotOutdated && (
                      <span className="ml-1 text-[10px] text-amber-700 bg-amber-100 px-1 py-0.2 rounded font-bold">
                        Update
                      </span>
                    )}
                  </td>
                  <td className="py-2.5">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="py-2.5 font-mono font-semibold text-text">{c.leads30d}</td>
                  <td className="py-2.5 font-mono text-text-2">{c.uptime}</td>
                  <td className="py-2.5 text-right">
                    <span className="text-primary hover:underline font-medium">Manage →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
