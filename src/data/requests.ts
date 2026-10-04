import { daysAgo, hoursAgo } from '../lib/format';

export interface MaintenanceRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientMonogram: string;
  title: string;
  description: string;
  type: 'Content' | 'Design' | 'Automation' | 'Bug';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  stage: 'Requested' | 'In progress' | 'Review' | 'Done';
  createdAt: string;
  assignee: string;
  qaChecklist: { item: string; completed: boolean }[];
  changelog: string[];
  beforePreview?: { title: string; subtitle: string; tag: string };
  afterPreview?: { title: string; subtitle: string; tag: string };
}

export const initialRequests: MaintenanceRequest[] = [
  // Requested
  {
    id: 'req-01',
    clientId: 'c01',
    clientName: 'Ridgeline Plumbing',
    clientMonogram: 'RP',
    title: 'Update holiday hours — Victoria Day weekend',
    description: 'Adjust emergency dispatch banner and footer office hours for Victoria Day statutory holiday. Keep 24/7 on-call dispatch active with emergency surcharge notice.',
    type: 'Content',
    priority: 'Medium',
    stage: 'Requested',
    createdAt: hoursAgo(2),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Verify hours across desktop and mobile footers', completed: false },
      { item: 'Ensure 24/7 emergency dispatch phone link remains unaffected', completed: false },
      { item: 'Test automatic banner expiration date', completed: false },
    ],
    changelog: [
      'Drafted holiday hours banner text',
      'Configured scheduled removal for Tuesday 8am MST',
    ],
    beforePreview: {
      title: 'Regular Hours: Mon-Fri 7am-6pm',
      subtitle: 'Weekend dispatch by appointment only',
      tag: 'Standard Schedule',
    },
    afterPreview: {
      title: 'Victoria Day Weekend: On-Call 24/7',
      subtitle: 'Office closed Monday May 18. Emergency team active.',
      tag: 'Updated Schedule',
    },
  },
  {
    id: 'req-02',
    clientId: 'c05',
    clientName: 'Northern Lights Physio',
    clientMonogram: 'NL',
    title: 'Add direct billing insurance badge grid',
    description: 'Add Sun Life, Canada Life, and Manulife direct billing accepted badges to the booking hero section.',
    type: 'Design',
    priority: 'Low',
    stage: 'Requested',
    createdAt: hoursAgo(5),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'SVG icon optimization under 15KB', completed: false },
      { item: 'Mobile wrapping test on 375px screens', completed: false },
    ],
    changelog: ['Sourced crisp vector insurer logos in grayscale'],
  },
  {
    id: 'req-03',
    clientId: 'c06',
    clientName: 'Cedar Row Law',
    clientMonogram: 'CR',
    title: 'Add new commercial real estate associate bio',
    description: 'New partner joined the firm. Add bio card, call-to-action calendar, and update practice group page.',
    type: 'Content',
    priority: 'Medium',
    stage: 'Requested',
    createdAt: daysAgo(1),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Photo optimized in WebP with proper aspect ratio', completed: false },
      { item: 'Direct booking calendar route tested', completed: false },
    ],
    changelog: ['Prepared associate bio markdown and headshot placeholder'],
  },

  // In progress
  {
    id: 'req-04',
    clientId: 'c08',
    clientName: 'Granite Peak Fitness',
    clientMonogram: 'GP',
    title: 'Swap hero photo with new Canmore mountain studio crew shot',
    description: 'Client sent high-res team photography. Need to replace the hero background image, adjust scrim opacity for contrast, and check LCP load time.',
    type: 'Design',
    priority: 'Medium',
    stage: 'In progress',
    createdAt: daysAgo(1),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Compress image from 8.2MB to <110KB WebP', completed: true },
      { item: 'Verify text contrast ratio > 4.5:1 against image', completed: true },
      { item: 'Check responsive crop on mobile viewport', completed: false },
    ],
    changelog: [
      'Processed new hero asset with WebP multi-resolution srcset',
      'Adjusted dark gradient scrim to 40% opacity',
    ],
    beforePreview: {
      title: 'Old Stock Studio Interior',
      subtitle: 'Generic gym equipment, 1.4MB load weight',
      tag: 'Before Update',
    },
    afterPreview: {
      title: 'New Canmore Team Photography',
      subtitle: 'Real local trainers, 88KB WebP, crisp contrast',
      tag: 'In Progress',
    },
  },
  {
    id: 'req-05',
    clientId: 'c02',
    clientName: 'Maple & Pine Dental',
    clientMonogram: 'MP',
    title: 'Add pediatric sedation dentistry landing page',
    description: 'New specialized service sub-page linked from main treatments menu with dedicated intake form.',
    type: 'Content',
    priority: 'High',
    stage: 'In progress',
    createdAt: daysAgo(2),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'H1 and meta tags set for Kelowna local SEO', completed: true },
      { item: 'Intake form linked to pediatric CRM tag', completed: false },
    ],
    changelog: ['Duplicated treatment page layout from snapshot', 'Drafted pediatric copy with FAQ accordion'],
  },

  // Review
  {
    id: 'req-06',
    clientId: 'c04',
    clientName: 'Boréal Coiffure',
    clientMonogram: 'BC',
    title: 'Deploy French/English bilingual language switcher',
    description: 'Full bilingual toggle on navbar and booking steps for Montréal market compliance. Preserves selected service state when switching languages.',
    type: 'Automation',
    priority: 'High',
    stage: 'Review',
    createdAt: daysAgo(2),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'All 8 pages verified in both French & English', completed: true },
      { item: 'CASL opt-in checkbox translated correctly', completed: true },
      { item: 'No page reload flickers when toggling language', completed: true },
      { item: 'Mobile menu supports instant switch', completed: true },
    ],
    changelog: [
      'Implemented clean client-side language state provider',
      'Configured Québec French localized string table',
      'Tested form submission in French language mode',
    ],
    beforePreview: {
      title: 'English-only layout (Unilingual)',
      subtitle: 'Missing required French Québec localized options',
      tag: 'Previous State',
    },
    afterPreview: {
      title: 'Bilingual FR / EN instant switcher',
      subtitle: 'Conformes aux normes québécoises · 100% sans recharge',
      tag: 'Ready for Approval',
    },
  },
  {
    id: 'req-07',
    clientId: 'c07',
    clientName: 'Tidewater Landscaping',
    clientMonogram: 'TL',
    title: 'Spring irrigation start-up seasonal promo package',
    description: 'Add spring package card ($189 backflow test & line recharge) to services grid with 1-click booking.',
    type: 'Content',
    priority: 'Medium',
    stage: 'Review',
    createdAt: daysAgo(3),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Pricing card styled with copper highlight tag', completed: true },
      { item: 'Calendar booking slot wired to irrigation route', completed: true },
    ],
    changelog: ['Created seasonal package card', 'Connected to spring booking tag'],
  },

  // Done
  {
    id: 'req-08',
    clientId: 'c11',
    clientName: 'Prairie Sky Roofing',
    clientMonogram: 'PS',
    title: 'Fix: phone number tel: link syntax broken on mobile',
    description: 'Mobile header tap-to-call had a malformed href string causing error on iOS Safari.',
    type: 'Bug',
    priority: 'Urgent',
    stage: 'Done',
    createdAt: daysAgo(3),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Fixed tel:+12045550199 URI encoding', completed: true },
      { item: 'Tested on iOS Safari and Android Chrome', completed: true },
      { item: 'Logged QA verification to agency owner', completed: true },
    ],
    changelog: ['Fixed URI syntax in mobile template', 'Deployed hotfix in 22 minutes from ticket report'],
  },
  {
    id: 'req-09',
    clientId: 'c01',
    clientName: 'Ridgeline Plumbing',
    clientMonogram: 'RP',
    title: 'Add "24/7 Emergency Service" sticky quick-call bar',
    description: 'Sticky mobile bar with direct phone button that floats smoothly at the bottom of the viewport.',
    type: 'Design',
    priority: 'High',
    stage: 'Done',
    createdAt: daysAgo(4),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Safe-area-inset-bottom respected for notched phones', completed: true },
      { item: 'Zero layout shift (CLS < 0.01)', completed: true },
      { item: 'Verified Google Analytics event trigger on tap', completed: true },
    ],
    changelog: [
      'Crafted custom CSS sticky bar with safe-area variables',
      'Configured tap tracking event in GHL tag system',
    ],
  },
  {
    id: 'req-10',
    clientId: 'c03',
    clientName: 'Harbourlight Realty',
    clientMonogram: 'HR',
    title: 'Update neighborhood guide for Halifax North End',
    description: 'Updated average home sale prices and school catchment information for Q1 2026.',
    type: 'Content',
    priority: 'Low',
    stage: 'Done',
    createdAt: daysAgo(5),
    assignee: 'Alex',
    qaChecklist: [
      { item: 'Updated infographic table with new statistics', completed: true },
      { item: 'Verified PDF download lead gate', completed: true },
    ],
    changelog: ['Refreshed market stats from Halifax Real Estate Board data'],
  },
];
