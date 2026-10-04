export interface SnapshotDiff {
  type: 'added' | 'changed' | 'removed';
  item: string;
  category: 'Pages' | 'Workflows' | 'Custom Code' | 'Forms';
  description: string;
}

export interface Snapshot {
  id: string;
  name: string;
  version: string;
  category: string;
  pageCount: number;
  workflowCount: number;
  pipelineStages: number;
  subAccountsCount: number;
  modifiedCount: number;
  lastUpdated: string;
  description: string;
  diffs: SnapshotDiff[];
  changelog: { version: string; date: string; changes: string[] }[];
}

export const initialSnapshots: Snapshot[] = [
  {
    id: 'snap-01',
    name: 'Home Services — Trades Master',
    version: 'v4.2',
    category: 'Trades',
    pageCount: 18,
    workflowCount: 9,
    pipelineStages: 5,
    subAccountsCount: 6,
    modifiedCount: 3,
    lastUpdated: '12 days ago',
    description: 'High-converting conversion engine for plumbing, HVAC, roofing, electrical and landscaping businesses with multi-step quote form and automated SMS response.',
    diffs: [
      { type: 'added', item: 'CASL / PIPEDA Explicit Consent Checkbox', category: 'Forms', description: 'Updated for Canadian federal privacy compliance on all quote submission forms.' },
      { type: 'added', item: 'Sticky Mobile Quick-Dial Bar', category: 'Custom Code', description: 'Lightweight CSS bottom call bar that only triggers on mobile viewport (<768px).' },
      { type: 'changed', item: 'Missed Call Text-Back Workflow', category: 'Workflows', description: 'Reduced delay from 60s to 30s with Canadian carrier routing safeguards.' },
      { type: 'removed', item: 'Legacy Unformatted Review Modal', category: 'Pages', description: 'Replaced with direct Google Business Profile deep-link SMS sequence.' },
    ],
    changelog: [
      {
        version: 'v4.2',
        date: 'March 2026',
        changes: ['Added CASL consent footer to all contact hooks', 'Mobile tap-to-call floating bar with CSS variables', 'Speed test optimization: lazy SVG assets'],
      },
      {
        version: 'v4.1',
        date: 'January 2026',
        changes: ['Enhanced emergency booking calendar slots', 'Postal code validation for Alberta and Ontario service radiuses'],
      },
      {
        version: 'v4.0',
        date: 'November 2025',
        changes: ['Full snapshot architecture overhaul: modular CSS tokens and clean CRM pipeline mappings'],
      },
    ],
  },
  {
    id: 'snap-02',
    name: 'Clinic & Allied Healthcare',
    version: 'v3.1',
    category: 'Healthcare',
    pageCount: 14,
    workflowCount: 7,
    pipelineStages: 4,
    subAccountsCount: 3,
    modifiedCount: 1,
    lastUpdated: '3 weeks ago',
    description: 'Patient acquisition and intake for dental, physio, and chiropractic clinics with HIPAA/PIPEDA respectful intake logic.',
    diffs: [
      { type: 'added', item: 'Direct Intake Calendar Embed', category: 'Pages', description: 'Clean slot picker with insurance provider check.' },
      { type: 'changed', item: 'Appointment 24h & 2h Reminder Sequence', category: 'Workflows', description: 'Bilingual reminder tags and confirmation branch.' },
    ],
    changelog: [
      { version: 'v3.1', date: 'February 2026', changes: ['Intake confirmation webhook with provider calendar syncing'] },
      { version: 'v3.0', date: 'December 2025', changes: ['Initial allied health clinical build'] },
    ],
  },
  {
    id: 'snap-03',
    name: 'Realty & Property Showcase',
    version: 'v2.6',
    category: 'Real estate',
    pageCount: 12,
    workflowCount: 8,
    pipelineStages: 6,
    subAccountsCount: 2,
    modifiedCount: 0,
    lastUpdated: '1 month ago',
    description: 'Lead magnets for free home valuations, buyer guides, and instant MLS listing request automations.',
    diffs: [
      { type: 'changed', item: 'Valuation Estimator Webhook', category: 'Workflows', description: 'Formatted lead payload with neighborhood and postal code parsing.' },
    ],
    changelog: [
      { version: 'v2.6', date: 'February 2026', changes: ['Neighborhood landing page templates and mortgage calculator'] },
    ],
  },
  {
    id: 'snap-04',
    name: 'Salon & Spa Studio (Bilingual FR/EN)',
    version: 'v2.0',
    category: 'Salon',
    pageCount: 10,
    workflowCount: 6,
    pipelineStages: 4,
    subAccountsCount: 1,
    modifiedCount: 0,
    lastUpdated: '2 months ago',
    description: 'High-aesthetic appointment booking for Québec and bilingual metropolitan salons with dual French/English language routing.',
    diffs: [
      { type: 'added', item: 'French / English Toggle Component', category: 'Custom Code', description: 'Instant language switcher without page reload.' },
    ],
    changelog: [
      { version: 'v2.0', date: 'January 2026', changes: ['Full bilingual French language bundle for Québec CASL compliance'] },
    ],
  },
  {
    id: 'snap-05',
    name: 'Professional & Legal Services',
    version: 'v1.8',
    category: 'Legal',
    pageCount: 11,
    workflowCount: 5,
    pipelineStages: 4,
    subAccountsCount: 1,
    modifiedCount: 1,
    lastUpdated: '2 months ago',
    description: 'Discreet consultation intake with conflict-check stage and retainer deposit notifications.',
    diffs: [
      { type: 'changed', item: 'Confidentiality Intake Step', category: 'Forms', description: 'Encrypted document intake staging.' },
    ],
    changelog: [
      { version: 'v1.8', date: 'December 2025', changes: ['Added practice-area dynamic accordions'] },
    ],
  },
  {
    id: 'snap-06',
    name: 'Fitness & Boutique Studio',
    version: 'v2.3',
    category: 'Fitness',
    pageCount: 9,
    workflowCount: 6,
    pipelineStages: 4,
    subAccountsCount: 1,
    modifiedCount: 0,
    lastUpdated: '3 months ago',
    description: 'Class schedule display, 7-day trial pass funnel, and membership conversion drip.',
    diffs: [
      { type: 'added', item: 'Free Trial Pass SMS Trigger', category: 'Workflows', description: 'Immediate QR pass generation via SMS.' },
    ],
    changelog: [
      { version: 'v2.3', date: 'November 2025', changes: ['Class schedule dynamic list integration'] },
    ],
  },
];
