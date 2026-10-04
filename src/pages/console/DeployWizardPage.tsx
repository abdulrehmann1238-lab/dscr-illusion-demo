import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Snapshot } from '../../data/snapshots';
import { Client } from '../../data/clients';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import { Toggle } from '../../components/ui/Toggle';
import { StepChecklist, StepItem } from '../../components/console/StepChecklist';
import { LogPane } from '../../components/console/LogPane';
import { useToast } from '../../components/ui/Toast';
import { delay } from '../../lib/delay';
import {
  PlusCircle,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Layers,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { isValidPhone } from '../../lib/validators';

const canadianProvinces = [
  { value: 'AB', label: 'Alberta (AB)' },
  { value: 'BC', label: 'British Columbia (BC)' },
  { value: 'ON', label: 'Ontario (ON)' },
  { value: 'QC', label: 'Québec (QC)' },
  { value: 'SK', label: 'Saskatchewan (SK)' },
  { value: 'MB', label: 'Manitoba (MB)' },
  { value: 'NS', label: 'Nova Scotia (NS)' },
  { value: 'NB', label: 'New Brunswick (NB)' },
  { value: 'NL', label: 'Newfoundland & Labrador (NL)' },
];

const presetColors = ['#1E3A5F', '#24453F', '#784D38', '#1A365D', '#9C4221', '#0F766E'];

export const DeployWizardPage: React.FC = () => {
  const { snapshots, addClient } = useAppStore();
  const navigate = useNavigate();
  const { success, warning, error } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Snapshot selection
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(snapshots[0]?.id || 'snap-01');
  const selectedSnapshot = snapshots.find((s) => s.id === selectedSnapshotId) || snapshots[0];

  // Step 2: Client business details
  const [businessName, setBusinessName] = useState('Summit Ridge Electrical & HVAC');
  const [city, setCity] = useState('Edmonton');
  const [province, setProvince] = useState('AB');
  const [phone, setPhone] = useState('+1 (780) 555-0194');
  const [domain, setDomain] = useState('summitridge.ca');
  const [brandColor, setBrandColor] = useState('#1E3A5F');
  const [language, setLanguage] = useState<'EN' | 'FR' | 'EN+FR'>('EN');
  const [caslConsent, setCaslConsent] = useState(true);
  const [detailsErrors, setDetailsErrors] = useState<Record<string, string>>({});

  // Step 4: Deployment checklist state
  const [isDeploying, setIsDeploying] = useState(false);
  const [simulateFailStep, setSimulateFailStep] = useState(false);
  const [failedAtStep5, setFailedAtStep5] = useState(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdClient, setCreatedClient] = useState<Client | null>(null);

  const [checklistSteps, setChecklistSteps] = useState<StepItem[]>([
    { id: '1', label: '1. Create GHL Sub-Account & Tenant Record', description: 'API provisioned tenant container', state: 'pending' },
    { id: '2', label: '2. Clone & Apply Snapshot Architecture', description: `${selectedSnapshot.name} ${selectedSnapshot.version}`, state: 'pending' },
    { id: '3', label: '3. Inject Brand Assets, Palette & Copy', description: 'CSS variables and localized typography tokens', state: 'pending' },
    { id: '4', label: '4. Connect Quote Forms & Dispatch Webhooks', description: 'Instant SMS alerting & CASL disclosures', state: 'pending' },
    { id: '5', label: '5. Configure Automated CRM Pipelines & Stages', description: 'Deal stages and opportunity tags configured', state: 'pending' },
    { id: '6', label: '6. Attach Custom Domain & Issue SSL Certificate', description: 'CNAME verification and HTTPS handshake', state: 'pending' },
    { id: '7', label: '7. Run Automated 12-Point Regression QA Check', description: 'Form delivery, mobile reflow, and link audits', state: 'pending' },
  ]);

  const handleStep2Next = () => {
    const errs: Record<string, string> = {};
    if (!businessName.trim()) errs.businessName = 'Business name is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!phone.trim() || !isValidPhone(phone)) errs.phone = 'Valid Canadian phone number required';
    if (!caslConsent) errs.caslConsent = 'CASL compliance verification is mandatory';

    if (Object.keys(errs).length > 0) {
      setDetailsErrors(errs);
      return;
    }
    setDetailsErrors({});
    setStep(3);
  };

  const handleStartDeploy = async () => {
    setStep(4);
    setIsDeploying(true);
    setIsCompleted(false);
    setFailedAtStep5(false);
    setDeployLogs([
      `[00:00:00] Initializing deployment pipeline for ${businessName}...`,
      `[00:00:00] Selected snapshot: ${selectedSnapshot.name} ${selectedSnapshot.version}`,
    ]);

    for (let i = 0; i < checklistSteps.length; i++) {
      // Set current running
      setChecklistSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, state: 'running' } : s))
      );

      // Failure simulation check on Step 5 (index 4)
      if (simulateFailStep && i === 4 && !failedAtStep5) {
        await delay(900);
        setChecklistSteps((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  state: 'failed',
                  errorDetails:
                    'CRM Pipeline API Timeout: Rate-limit encountered during custom tag synchronization. Retry available.',
                }
              : s
          )
        );
        setFailedAtStep5(true);
        setIsDeploying(false);
        setDeployLogs((prev) => [
          ...prev,
          `[00:00:04] ERROR: Step 5 failed during custom tag synchronization (Simulated Error).`,
          `[00:00:04] Safety rollback complete. Ready to retry from step 5.`,
        ]);
        error('Deployment Step Paused', 'Simulated failure at step 5. Click "Retry from this step" to proceed.');
        return;
      }

      await delay(950);

      // Mark done
      setChecklistSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, state: 'done' } : s))
      );

      setDeployLogs((prev) => [
        ...prev,
        `[00:00:0${i + 1}] Completed: ${checklistSteps[i].label} — 200 OK`,
      ]);
    }

    setIsDeploying(false);
    setIsCompleted(true);

    // Create client in Zustand store!
    const newClient: Client = {
      id: `c-new-${Date.now()}`,
      business: businessName,
      shortName: businessName.split(' ')[0],
      city,
      province,
      industry: selectedSnapshot.category as any,
      snapshot: selectedSnapshot.name,
      snapshotVersion: selectedSnapshot.version,
      plan: 'Pro',
      status: 'Live',
      mrrCAD: 349,
      domain: domain || `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.ca`,
      leads30d: 0,
      uptime: '100%',
      lastChange: 'Just now',
      brandColor,
      hasPreview: true,
      phone,
    };

    addClient(newClient);
    setCreatedClient(newClient);
    success(
      'Client Successfully Deployed!',
      `${businessName} sub-account has been provisioned and added to your active portfolio.`
    );
  };

  const handleRetryFromStep5 = async () => {
    setFailedAtStep5(false);
    setIsDeploying(true);
    setDeployLogs((prev) => [
      ...prev,
      `[00:00:05] Retrying Step 5 with renewed API token...`,
    ]);

    for (let i = 4; i < checklistSteps.length; i++) {
      setChecklistSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, state: 'running' } : s))
      );

      await delay(900);

      setChecklistSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, state: 'done' } : s))
      );

      setDeployLogs((prev) => [
        ...prev,
        `[00:00:0${i + 2}] Completed: ${checklistSteps[i].label} — 200 OK`,
      ]);
    }

    setIsDeploying(false);
    setIsCompleted(true);

    const newClient: Client = {
      id: `c-new-${Date.now()}`,
      business: businessName,
      shortName: businessName.split(' ')[0],
      city,
      province,
      industry: selectedSnapshot.category as any,
      snapshot: selectedSnapshot.name,
      snapshotVersion: selectedSnapshot.version,
      plan: 'Pro',
      status: 'Live',
      mrrCAD: 349,
      domain: domain || 'summitridge.ca',
      leads30d: 0,
      uptime: '100%',
      lastChange: 'Just now',
      brandColor,
      hasPreview: true,
      phone,
    };

    addClient(newClient);
    setCreatedClient(newClient);
    success('Deployment Completed', 'Recovery successful. Site is live!');
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Wizard Progress Stepper Rail */}
      <div className="bg-elevated border border-border rounded-lg p-4 shadow-sh-1 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted font-bold block">
            Step {step} of 4
          </span>
          <h1 className="text-lg font-display font-medium text-text">
            {step === 1 && '1. Select Foundation Snapshot'}
            {step === 2 && '2. Business Details & Brand Configuration'}
            {step === 3 && '3. Pre-Deployment Architecture Review'}
            {step === 4 && '4. Automated Sub-Account Provisioning'}
          </h1>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-colors',
                s === step
                  ? 'bg-primary scale-125'
                  : s < step
                  ? 'bg-emerald-600'
                  : 'bg-border-strong'
              )}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Snapshot Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {snapshots.map((snap) => {
              const isSelected = snap.id === selectedSnapshotId;
              return (
                <div
                  key={snap.id}
                  onClick={() => setSelectedSnapshotId(snap.id)}
                  className={cn(
                    'p-5 rounded-lg border text-left transition-all duration-fast cursor-pointer flex flex-col justify-between',
                    isSelected
                      ? 'bg-secondary-soft/50 border-primary shadow-sh-2 ring-2 ring-primary'
                      : 'bg-elevated border-border hover:border-border-strong'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border font-bold text-text-2">
                        {snap.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-primary">
                        {snap.version}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-text mb-1.5">{snap.name}</h3>
                    <p className="text-xs text-text-2 leading-relaxed mb-4">
                      {snap.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border text-[11px] font-mono text-text-muted flex items-center justify-between">
                    <span>{snap.pageCount} Pages</span>
                    <span>{snap.workflowCount} Workflows</span>
                    <span>{snap.subAccountsCount} Live Sites</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              icon={<ArrowRight className="w-4 h-4 ml-1.5" />}
            >
              Continue to Details
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Client Details */}
      {step === 2 && (
        <div className="bg-elevated border border-border rounded-lg p-6 shadow-sh-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Canadian Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              error={detailsErrors.businessName}
              required
            />

            <Input
              label="Phone Number (+1 Standard Format)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={detailsErrors.phone}
              hint="Required for Twilio SMS dispatch verification."
              required
            />

            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={detailsErrors.city}
              required
            />

            <Select
              label="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              {canadianProvinces.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>

            <Input
              label="Custom Domain (Optional)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              hint="e.g. summitridge.ca"
            />

            <Select
              label="Language Variant"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
            >
              <option value="EN">English (Standard)</option>
              <option value="FR">French (Québec Market)</option>
              <option value="EN+FR">Bilingual Toggle (EN + FR)</option>
            </Select>
          </div>

          {/* Primary Brand Color Swatches */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-semibold text-text uppercase tracking-wider block">
              Primary Brand Accent Color
            </label>
            <div className="flex items-center gap-3">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setBrandColor(color)}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-transform cursor-pointer',
                    brandColor === color
                      ? 'scale-110 border-text shadow-md'
                      : 'border-transparent hover:scale-105'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
              <span className="font-mono text-xs text-text-muted">{brandColor}</span>
            </div>
          </div>

          {/* CASL Verification Checkbox */}
          <Checkbox
            checked={caslConsent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaslConsent(e.target.checked)}
            label="CASL & CRTC Compliance Guarantee"
            description="Ensure all deployed lead intake forms include explicit opt-in checkboxes and Canadian contact disclosures."
            error={detailsErrors.caslConsent}
          />

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleStep2Next}
              icon={<ArrowRight className="w-4 h-4 ml-1.5" />}
            >
              Review Architecture
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Architecture Review */}
      {step === 3 && (
        <div className="bg-elevated border border-border rounded-lg p-6 shadow-sh-1 space-y-6">
          <div className="p-4 bg-surface rounded-md border border-border flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
              {businessName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-semibold text-text">{businessName}</h3>
              <p className="text-xs text-text-muted">
                {city}, {province} · {phone} · {domain || 'Pending CNAME'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text uppercase tracking-wider mb-3">
              What Will Be Automated &amp; Created:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded bg-surface border border-border">
                <span className="font-bold text-primary font-mono text-lg block">
                  {selectedSnapshot.pageCount}
                </span>
                <span className="text-text-2">Responsive Pages</span>
              </div>
              <div className="p-3 rounded bg-surface border border-border">
                <span className="font-bold text-accent font-mono text-lg block">
                  {selectedSnapshot.workflowCount}
                </span>
                <span className="text-text-2">Automated Workflows</span>
              </div>
              <div className="p-3 rounded bg-surface border border-border">
                <span className="font-bold text-secondary font-mono text-lg block">1</span>
                <span className="text-text-2">CRM Pipeline Board</span>
              </div>
              <div className="p-3 rounded bg-surface border border-border">
                <span className="font-bold text-emerald-700 font-mono text-lg block">1</span>
                <span className="text-text-2">Technician Calendar</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-secondary-soft/50 rounded-md border border-primary/20 text-xs text-text-2 flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>12-Point Regression QA Check will execute automatically upon completion.</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartDeploy}
              icon={<Sparkles className="w-4 h-4 ml-1.5" />}
            >
              Start Automated Deployment
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Live Automated Deployment & Branded Preview */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
              Automated Sub-Account Provisioning Pipeline
            </h3>
            <Toggle
              checked={simulateFailStep}
              onChange={setSimulateFailStep}
              label="Simulate a failed step (resilience demo)"
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Checklist */}
            <div className="lg:col-span-6 bg-elevated border border-border rounded-lg p-5 shadow-sh-1 space-y-4">
              <StepChecklist steps={checklistSteps} />

              {failedAtStep5 && (
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleRetryFromStep5}
                    icon={<RotateCcw className="w-4 h-4" />}
                  >
                    Retry from Step 5
                  </Button>
                </div>
              )}
            </div>

            {/* Log Pane */}
            <div className="lg:col-span-6">
              <LogPane logs={deployLogs} title="Provisioning Terminal Stream" />
            </div>
          </div>

          {/* WOW Moment: Post-Deploy Branded Live Preview Slide-in */}
          {isCompleted && createdClient && (
            <div className="p-6 bg-elevated border-2 border-emerald-600 rounded-lg shadow-sh-3 space-y-4 animate-fade-in text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-1">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-medium text-text">
                Sub-Account Provisioning Complete!
              </h3>
              <p className="text-xs text-text-2 max-w-md mx-auto">
                <strong className="text-text">{businessName}</strong> has been cloned from {selectedSnapshot.name}, wired to your CRM, and verified against 12 QA tests.
              </p>

              {/* Mini Branded Result Card */}
              <div
                className="max-w-md mx-auto p-4 rounded-lg text-white text-left shadow-md flex items-center justify-between"
                style={{ backgroundColor: brandColor }}
              >
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/80">
                    Live Sub-Account Active
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">{businessName}</div>
                  <div className="text-xs text-white/90">{city}, {province} · {domain}</div>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-mono font-bold">
                  v4.2 PRO
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/console/clients">
                  <Button variant="primary" size="md">
                    <span>View in Clients List</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link to="/console/workflows">
                  <Button variant="secondary" size="md">
                    Inspect CRM Workflows
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
