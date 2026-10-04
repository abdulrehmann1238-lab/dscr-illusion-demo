import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { StatusPill } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { StepChecklist, StepItem } from '../../components/console/StepChecklist';
import { useToast } from '../../components/ui/Toast';
import { delay } from '../../lib/delay';
import {
  ExternalLink,
  Globe,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Code,
  Shield,
  Clock,
  Sparkles,
  Phone,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatCAD } from '../../lib/format';

export const ClientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    clients,
    leads,
    workflows,
    customCodeAccent,
    setCustomCodeAccent,
    customCodeMobileOnly,
    setCustomCodeMobileOnly,
    resetCustomCode,
  } = useAppStore();
  const { success, error, info } = useToast();

  const client = clients.find((c) => c.id === id) || clients[0];
  const clientLeads = leads.filter((l) => l.clientId === client.id);
  const clientWorkflows = workflows.filter((w) => w.clientId === client.id);

  const [activeTab, setActiveTab] = useState<string>('overview');

  // Domain verification state
  const [domainSteps, setDomainSteps] = useState<StepItem[]>([
    { id: '1', label: '1. Add Custom Domain Hostname', description: `${client.domain} configured in DNS`, state: 'done' },
    { id: '2', label: '2. CNAME Record Verification', description: 'Pointing to proxy.northline-ghl.ca', state: client.status === 'Domain pending' ? 'pending' : 'done' },
    { id: '3', label: '3. Auto-SSL Certificate Provisioning', description: 'Let’s Encrypt 2048-bit TLS/SSL handshake', state: client.status === 'Domain pending' ? 'pending' : 'done' },
  ]);
  const [isVerifyingDomain, setIsVerifyingDomain] = useState(false);
  const [simulateCnameError, setSimulateCnameError] = useState(false);

  // SaaS Plan state
  const [saasPlan, setSaasPlan] = useState<'Starter' | 'Pro'>(client.plan);

  const handleVerifyDns = async () => {
    setIsVerifyingDomain(true);
    setDomainSteps((prev) => [
      prev[0],
      { ...prev[1], state: 'running' },
      { ...prev[2], state: 'pending' },
    ]);

    await delay(1200);

    if (simulateCnameError) {
      setDomainSteps((prev) => [
        prev[0],
        {
          ...prev[1],
          state: 'failed',
          errorDetails: `CNAME mismatch: DNS query returned 'host.invalid-parked.com' instead of 'proxy.northline-ghl.ca'. Please update your Cloudflare or GoDaddy DNS records.`,
        },
        { ...prev[2], state: 'pending' },
      ]);
      setIsVerifyingDomain(false);
      error('DNS Verification Failed', 'CNAME record is misconfigured. Review error details.');
      return;
    }

    setDomainSteps((prev) => [
      prev[0],
      { ...prev[1], state: 'done' },
      { ...prev[2], state: 'running' },
    ]);

    await delay(1200);

    setDomainSteps((prev) => [
      prev[0],
      { ...prev[1], state: 'done' },
      { ...prev[2], state: 'done' },
    ]);
    setIsVerifyingDomain(false);
    success('SSL Certificate Active', `Domain ${client.domain} verified with zero SSL downtime.`);
  };

  const copyRecordValue = () => {
    navigator.clipboard.writeText('proxy.northline-ghl.ca');
    info('Copied CNAME Target', 'Value copied to clipboard.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pages', label: 'Pages (18)' },
    { id: 'domain', label: 'Domain & SaaS' },
    { id: 'code', label: 'Custom Code' },
    { id: 'activity', label: 'Audit Trail' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Client Detail Header */}
      <div className="bg-elevated border border-border rounded-lg p-5 sm:p-6 shadow-sh-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className="w-12 h-12 rounded-md flex items-center justify-center text-white font-bold text-base shrink-0 shadow-sm"
            style={{ backgroundColor: client.brandColor || '#24453F' }}
          >
            {client.business.slice(0, 2).toUpperCase()}
          </span>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-display font-medium text-text">
                {client.business}
              </h1>
              <StatusPill status={client.status} />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mt-1">
              <span>{client.city}, {client.province}</span>
              <span>·</span>
              <span>{client.industry}</span>
              <span>·</span>
              <a
                href={`https://${client.domain}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-primary hover:underline flex items-center gap-1"
              >
                <span>{client.domain}</span>
                <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {client.hasPreview && (
            <Link to="/demo/site/ridgeline-plumbing">
              <Button
                variant="primary"
                size="sm"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Open Live Site Demo
              </Button>
            </Link>
          )}
          <Link to="/console/clients">
            <Button variant="secondary" size="sm">
              All Clients
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Snapshot Health Card */}
            <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-text uppercase tracking-wider">
                  Snapshot Version
                </span>
                <span className="text-xs font-mono font-bold text-primary">
                  {client.snapshotVersion}
                </span>
              </div>
              <div className="text-sm font-semibold text-text">{client.snapshot}</div>
              <div className="mt-3 pt-3 border-t border-border/60 text-xs text-text-2 space-y-1">
                <div className="text-text-muted font-mono text-[11px] mb-1">
                  Drift Tracking from Master:
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Custom Color Tokens:</span>
                  <span className="font-mono text-emerald-700">Clean ✓</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Custom Code Bar:</span>
                  <span className="font-mono text-emerald-700">Isolated ✓</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Pipeline Mappings:</span>
                  <span className="font-mono text-emerald-700">Locked ✓</span>
                </div>
              </div>
            </div>

            {/* Leads 30d Card */}
            <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-text uppercase tracking-wider">
                  30-Day Ingestion
                </span>
                <span className="text-xs font-mono font-bold text-accent">
                  {client.leads30d} leads
                </span>
              </div>
              <div className="text-sm font-semibold text-text">Live Funnel Telemetry</div>
              <div className="mt-3 pt-3 border-t border-border/60 text-xs text-text-2 space-y-1.5">
                <div className="flex justify-between">
                  <span>Website Form Submissions:</span>
                  <span className="font-mono font-semibold">108</span>
                </div>
                <div className="flex justify-between">
                  <span>Missed Call SMS Captures:</span>
                  <span className="font-mono font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Google Review Requests Sent:</span>
                  <span className="font-mono font-semibold">41</span>
                </div>
              </div>
            </div>

            {/* Uptime & SLA */}
            <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-text uppercase tracking-wider">
                  Uptime & Health
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {client.uptime}
                </span>
              </div>
              <div className="text-sm font-semibold text-text">Active Monitoring</div>
              <div className="mt-3 pt-3 border-t border-border/60 text-xs text-text-2 space-y-1.5">
                <div className="flex justify-between">
                  <span>SSL Expiry:</span>
                  <span className="font-mono">82 days (Auto-renews)</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Latency:</span>
                  <span className="font-mono">142ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Client MRR:</span>
                  <span className="font-mono font-semibold text-text">
                    {formatCAD(client.mrrCAD)}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Leads for this Client */}
          <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                Recent Inquiries from Website Funnel
              </h3>
              <Link to="/console/workflows" className="text-xs text-primary hover:underline">
                View Full Pipeline Board →
              </Link>
            </div>

            <div className="divide-y divide-border/60">
              {clientLeads.slice(0, 4).map((ld) => (
                <div key={ld.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-text">{ld.name}</span>
                    <span className="text-text-muted ml-2">({ld.city})</span>
                    <div className="text-[11px] text-text-2 mt-0.5">{ld.service}: {ld.details}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-primary block">
                      {formatCAD(ld.valueCAD)}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-text-muted">
                      {ld.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pages */}
      {activeTab === 'pages' && (
        <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                Pages in Snapshot Architecture
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                18 production pages deployed from {client.snapshot} {client.snapshotVersion}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded font-bold">
              100% Mobile Optimized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { path: '/', title: 'Home / Hero / Quote Funnel', score: 98, status: 'Published' },
              { path: '/services/emergency-furnace', title: 'Emergency Furnace Repair', score: 97, status: 'Published' },
              { path: '/services/water-heaters', title: 'Water Heater & Tankless Installs', score: 96, status: 'Published' },
              { path: '/services/drain-cleaning', title: 'Drain Cleaning & Hydro-Jetting', score: 98, status: 'Published' },
              { path: '/services/boilers', title: 'Boiler & Radiant Heating', score: 95, status: 'Published' },
              { path: '/service-areas/calgary-nw', title: 'Calgary NW Service Radius', score: 99, status: 'Published' },
              { path: '/book-appointment', title: 'Direct Intake Calendar Booking', score: 96, status: 'Published' },
              { path: '/privacy-casl', title: 'CASL / PIPEDA Privacy Disclosures', score: 100, status: 'Published' },
            ].map((pg) => (
              <div
                key={pg.path}
                className="p-3 bg-surface rounded-md border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-text">{pg.title}</div>
                  <div className="font-mono text-[11px] text-text-muted mt-0.5">{pg.path}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Perf {pg.score}
                  </span>
                  <button
                    disabled
                    title="The real build happens inside GoHighLevel."
                    className="text-text-muted text-[11px] hover:text-text cursor-not-allowed"
                  >
                    Edit (GHL)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Domain & SaaS Mode (PRD §14.3) */}
      {activeTab === 'domain' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Domain & SSL Verification Stepper */}
          <div className="lg:col-span-7 bg-elevated border border-border rounded-lg p-5 shadow-sh-1 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Custom Domain & SSL Verification
                </h3>
                <span className="font-mono text-xs text-primary font-semibold">
                  {client.domain}
                </span>
              </div>
              <Toggle
                checked={simulateCnameError}
                onChange={setSimulateCnameError}
                label="Simulate misconfigured CNAME"
                className="text-xs"
              />
            </div>

            <StepChecklist steps={domainSteps} />

            <div className="p-3.5 bg-surface rounded-md border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-text-muted block">
                  Required CNAME Record
                </span>
                <span className="font-mono font-semibold text-text">
                  {client.domain} &rarr; proxy.northline-ghl.ca
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={copyRecordValue}
                icon={<Copy className="w-3.5 h-3.5" />}
                className="bg-white"
              >
                Copy Target
              </Button>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleVerifyDns}
                loading={isVerifyingDomain}
              >
                Re-Verify DNS & Refresh SSL
              </Button>
            </div>
          </div>

          {/* Right Column (5 cols): SaaS Plan Matrix */}
          <div className="lg:col-span-5 bg-elevated border border-border rounded-lg p-5 shadow-sh-1 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                Agency SaaS Mode Plan
              </h3>
              <span className="font-mono text-xs font-bold text-accent">
                {saasPlan === 'Pro' ? '$349/mo CAD' : '$249/mo CAD'}
              </span>
            </div>

            {/* Segmented control */}
            <div className="grid grid-cols-2 p-1 bg-surface rounded-md border border-border text-xs">
              <button
                onClick={() => setSaasPlan('Starter')}
                className={cn(
                  'py-1.5 rounded text-center font-medium transition-colors cursor-pointer',
                  saasPlan === 'Starter'
                    ? 'bg-elevated text-primary font-semibold shadow-sm'
                    : 'text-text-muted hover:text-text'
                )}
              >
                Starter ($249)
              </button>
              <button
                onClick={() => setSaasPlan('Pro')}
                className={cn(
                  'py-1.5 rounded text-center font-medium transition-colors cursor-pointer',
                  saasPlan === 'Pro'
                    ? 'bg-elevated text-primary font-semibold shadow-sm'
                    : 'text-text-muted hover:text-text'
                )}
              >
                Pro ($349)
              </button>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2 text-xs">
              {[
                { label: 'Responsive 18-page website', starter: true, pro: true },
                { label: 'Custom Domain + Free SSL', starter: true, pro: true },
                { label: 'Website Quote Form -> CRM Pipeline', starter: true, pro: true },
                { label: 'Instant SMS Dispatch (<30s via Twilio)', starter: false, pro: true },
                { label: 'Automated 5-Star Google Review Drip', starter: false, pro: true },
                { label: 'Missed Call Text-Back Catch', starter: false, pro: true },
              ].map((ft) => {
                const isIncluded = saasPlan === 'Pro' ? ft.pro : ft.starter;
                return (
                  <div
                    key={ft.label}
                    className={cn(
                      'p-2.5 rounded flex items-center justify-between border transition-colors',
                      isIncluded
                        ? 'bg-success-bg/30 border-success/30 text-text'
                        : 'bg-surface/50 border-border text-text-muted opacity-60'
                    )}
                  >
                    <span>{ft.label}</span>
                    <span className="font-mono font-bold text-[10px]">
                      {isIncluded ? 'ENABLED ✓' : 'PRO ONLY'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Custom Code (HTML/CSS & Live Preview) (PRD §14.3) */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (6 cols): Code Editor Look Panel */}
          <div className="lg:col-span-6 bg-[#16221F] text-[#F6F3EE] rounded-lg border border-border/40 p-4 font-mono text-xs shadow-sh-2 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-white/70">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#B8613F]" />
                  <span>sticky-dial-bar.css (Custom Code Tab)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetCustomCode}
                  icon={<RotateCcw className="w-3 h-3 text-white/60" />}
                  className="text-[10px] text-white/70 hover:text-white hover:bg-white/10"
                >
                  Reset
                </Button>
              </div>

              {/* Code Snippet with Line Numbers */}
              <div className="space-y-1 text-white/80 leading-relaxed overflow-x-auto">
                <div><span className="text-white/30 mr-3">01</span><span className="text-purple-300">@media</span> (max-width: 768px) &#123;</div>
                <div><span className="text-white/30 mr-3">02</span>  <span className="text-amber-300">.ghl-sticky-call-bar</span> &#123;</div>
                <div><span className="text-white/30 mr-3">03</span>    <span className="text-cyan-300">position</span>: fixed;</div>
                <div><span className="text-white/30 mr-3">04</span>    <span className="text-cyan-300">bottom</span>: 0;</div>
                <div><span className="text-white/30 mr-3">05</span>    <span className="text-cyan-300">left</span>: 0; <span className="text-cyan-300">right</span>: 0;</div>
                <div><span className="text-white/30 mr-3">06</span>    <span className="text-cyan-300">background-color</span>: <span className="text-emerald-400 font-bold">{customCodeAccent}</span>;</div>
                <div><span className="text-white/30 mr-3">07</span>    <span className="text-cyan-300">padding</span>: 12px 16px;</div>
                <div><span className="text-white/30 mr-3">08</span>    <span className="text-cyan-300">z-index</span>: 9999;</div>
                <div><span className="text-white/30 mr-3">09</span>    <span className="text-cyan-300">box-shadow</span>: 0 -4px 16px rgba(0,0,0,0.18);</div>
                <div><span className="text-white/30 mr-3">10</span>  &#125;</div>
                <div><span className="text-white/30 mr-3">11</span>&#125;</div>
              </div>
            </div>

            {/* Live Config Controls Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-2">
                <span>Accent Color:</span>
                <input
                  type="color"
                  value={customCodeAccent}
                  onChange={(e) => setCustomCodeAccent(e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-emerald-400">{customCodeAccent}</span>
              </div>

              <Toggle
                checked={customCodeMobileOnly}
                onChange={setCustomCodeMobileOnly}
                label="Mobile Viewport Only"
                className="text-white/90 text-xs"
              />
            </div>
          </div>

          {/* Right Column (6 cols): Live Preview of Modified CSS Component */}
          <div className="lg:col-span-6 bg-elevated border border-border rounded-lg p-5 shadow-sh-1 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text">
                  Live CSS Variable Render Preview
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  200ms reactive update
                </span>
              </div>

              <p className="text-xs text-text-2 mb-6">
                Adjusting the custom CSS accent hex color above immediately modifies the floating mobile quick-call bar below without refreshing the application.
              </p>

              {/* Rendered Mock Mobile Device Frame */}
              <div className="max-w-xs mx-auto border-4 border-[#242A2E] rounded-2xl overflow-hidden shadow-sh-2 bg-[#F8F7F4] p-4 text-center relative min-h-[220px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-border-strong/50 rounded mx-auto" />
                  <div className="h-6 w-40 bg-border-strong/40 rounded mx-auto" />
                  <div className="h-3 w-32 bg-border-strong/30 rounded mx-auto" />
                </div>

                {/* The Custom Coded Component with Injected State! */}
                <div
                  className="rounded-lg p-3 text-white flex items-center justify-between shadow-md transition-colors duration-fast"
                  style={{ backgroundColor: customCodeAccent }}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-orange-300 font-bold uppercase">
                      24/7 Calgary Dispatch
                    </span>
                    <span className="text-xs font-semibold text-white">Technicians En Route</span>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-white text-text font-bold text-[11px] flex items-center gap-1 shadow-sm">
                    <Phone className="w-3 h-3 text-[#E0742B]" />
                    <span>Call Now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-text-muted text-center pt-3 border-t border-border mt-4">
              Demonstrates senior custom code competency without cluttering core snapshot templates.
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Audit Trail */}
      {activeTab === 'activity' && (
        <div className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text pb-3 mb-3 border-b border-border">
            Sub-Account Audit & Version History
          </h3>
          <div className="space-y-3 text-xs text-text-2">
            {[
              { time: '2 days ago', title: 'Hotfix applied to mobile quick-dial bar', dev: 'Alex' },
              { time: '12 days ago', title: 'Upgraded snapshot to Home Services v4.2', dev: 'Alex' },
              { time: '1 month ago', title: 'Sub-account provisioned with custom CNAME', dev: 'Alex' },
            ].map((evt, idx) => (
              <div key={idx} className="p-3 bg-surface rounded border border-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-text">{evt.title}</span>
                  <div className="text-[11px] text-text-muted mt-0.5">Executed by {evt.dev}</div>
                </div>
                <span className="text-[11px] font-mono text-text-muted">{evt.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
