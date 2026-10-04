import { daysAgo, hoursAgo } from '../lib/format';

export interface Lead {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  details: string;
  valueCAD: number;
  stage: 'New Lead' | 'Contacted' | 'Quote Sent' | 'Booked' | 'Completed';
  source: 'Website Quote Form' | 'Phone Call' | 'Google Ads' | 'Referral';
  createdAt: string;
  tag?: string;
  urgent?: boolean;
}

export const initialLeads: Lead[] = [
  // New Lead column
  {
    id: 'lead-01',
    clientId: 'c01',
    name: 'Marcus Tran',
    phone: '+1 (403) 555-0142',
    email: 'marcus.tran@example.ca',
    city: 'Calgary NW (Brentwood)',
    service: 'Furnace Repair',
    details: 'Furnace not igniting, fan blowing cold air. Urgent winter service.',
    valueCAD: 450,
    stage: 'New Lead',
    source: 'Website Quote Form',
    createdAt: hoursAgo(1),
    tag: 'urgent-winter',
    urgent: true,
  },
  {
    id: 'lead-02',
    clientId: 'c01',
    name: 'Priya Nair',
    phone: '+1 (403) 555-0198',
    email: 'pnair.yyc@example.ca',
    city: 'Airdrie',
    service: 'Water Heater Replacement',
    details: '50-gallon tank leaking at bottom valve. Looking for tankless upgrade.',
    valueCAD: 2800,
    stage: 'New Lead',
    source: 'Website Quote Form',
    createdAt: hoursAgo(3),
    tag: 'tankless-quote',
  },
  {
    id: 'lead-03',
    clientId: 'c01',
    name: 'Gordon Alvarez',
    phone: '+1 (403) 555-0117',
    email: 'g.alvarez@example.ca',
    city: 'Cochrane',
    service: 'Basement Rough-in',
    details: 'Rough-in for new 3-piece bathroom in unfinished basement.',
    valueCAD: 6400,
    stage: 'New Lead',
    source: 'Google Ads',
    createdAt: hoursAgo(6),
    tag: 'renovation',
  },
  {
    id: 'lead-04',
    clientId: 'c01',
    name: 'Emily Bouchard',
    phone: '+1 (403) 555-0163',
    email: 'emily.b@example.ca',
    city: 'Calgary SW (Killarney)',
    service: 'Drain Cleaning',
    details: 'Kitchen sink backing up into dishwasher line.',
    valueCAD: 275,
    stage: 'New Lead',
    source: 'Website Quote Form',
    createdAt: hoursAgo(9),
  },

  // Contacted column
  {
    id: 'lead-05',
    clientId: 'c01',
    name: 'Liam Henderson',
    phone: '+1 (403) 555-0185',
    email: 'liam.h@example.ca',
    city: 'Calgary SE (Mahogany)',
    service: 'AC Inspection & Tune-up',
    details: 'Pre-season heat pump inspection and refrigerant top-up.',
    valueCAD: 320,
    stage: 'Contacted',
    source: 'Website Quote Form',
    createdAt: daysAgo(1),
  },
  {
    id: 'lead-06',
    clientId: 'c01',
    name: 'Dave MacIntyre',
    phone: '+1 (403) 555-0124',
    email: 'dave.mac@example.ca',
    city: 'Calgary NW (Tuscany)',
    service: 'Boiler Service',
    details: 'Pressure relief valve dripping intermittently.',
    valueCAD: 580,
    stage: 'Contacted',
    source: 'Phone Call',
    createdAt: daysAgo(1),
  },
  {
    id: 'lead-07',
    clientId: 'c01',
    name: 'Sarah Tremblay',
    phone: '+1 (403) 555-0176',
    email: 'sarah.t@example.ca',
    city: 'Calgary NE',
    service: 'Garburator Replacement',
    details: 'Motor humming but jammed.',
    valueCAD: 390,
    stage: 'Contacted',
    source: 'Website Quote Form',
    createdAt: daysAgo(2),
  },

  // Quote Sent column
  {
    id: 'lead-08',
    clientId: 'c01',
    name: 'Darren Falk',
    phone: '+1 (403) 555-0138',
    email: 'dfalk@example.ca',
    city: 'Okotoks',
    service: 'Commercial Rooftop HVAC',
    details: 'Annual rooftop unit maintenance agreement estimate.',
    valueCAD: 3800,
    stage: 'Quote Sent',
    source: 'Referral',
    createdAt: daysAgo(2),
  },
  {
    id: 'lead-09',
    clientId: 'c01',
    name: 'Chloe Morrison',
    phone: '+1 (403) 555-0149',
    email: 'cmorrison@example.ca',
    city: 'Calgary SW (Altadore)',
    service: 'Full PEX Re-pipe',
    details: 'Poly-B replacement throughout 2-story home.',
    valueCAD: 8500,
    stage: 'Quote Sent',
    source: 'Website Quote Form',
    createdAt: daysAgo(3),
  },

  // Booked column
  {
    id: 'lead-10',
    clientId: 'c01',
    name: 'Jonathan Roy',
    phone: '+1 (403) 555-0182',
    email: 'jroy@example.ca',
    city: 'Calgary NW (Silver Springs)',
    service: 'Main Sewer Hydro-jetting',
    details: 'Tree roots in main stack. Scheduled dispatch for tomorrow morning.',
    valueCAD: 650,
    stage: 'Booked',
    source: 'Website Quote Form',
    createdAt: daysAgo(2),
  },
  {
    id: 'lead-11',
    clientId: 'c01',
    name: 'Elena Rostova',
    phone: '+1 (403) 555-0191',
    email: 'elena.r@example.ca',
    city: 'Airdrie (Bayside)',
    service: 'High-Efficiency Furnace Install',
    details: 'Two-stage variable speed furnace upgrade with rebate filing.',
    valueCAD: 5200,
    stage: 'Booked',
    source: 'Website Quote Form',
    createdAt: daysAgo(4),
  },

  // Completed column
  {
    id: 'lead-12',
    clientId: 'c01',
    name: 'Keith Campbell',
    phone: '+1 (403) 555-0168',
    email: 'kcampbell@example.ca',
    city: 'Calgary SW',
    service: 'Emergency Water Shutoff Valve',
    details: 'Replaced seized gate valve with quarter-turn brass ball valve.',
    valueCAD: 340,
    stage: 'Completed',
    source: 'Phone Call',
    createdAt: daysAgo(5),
  },
  {
    id: 'lead-13',
    clientId: 'c01',
    name: 'Sunita Patel',
    phone: '+1 (403) 555-0153',
    email: 'sunita.p@example.ca',
    city: 'Chestermere',
    service: 'Sump Pump with Battery Backup',
    details: 'Installed 1/2 HP submersible sump pump with AGM battery backup.',
    valueCAD: 1450,
    stage: 'Completed',
    source: 'Website Quote Form',
    createdAt: daysAgo(7),
  },
];
