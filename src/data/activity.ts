import { hoursAgo, daysAgo, minutesAgo } from '../lib/format';

export interface ActivityItem {
  id: string;
  clientId?: string;
  clientName?: string;
  type: 'deploy' | 'lead' | 'webhook' | 'maintenance' | 'snapshot' | 'domain';
  title: string;
  description: string;
  timestamp: string;
  timeGroup: 'Today' | 'Yesterday' | 'Earlier this week';
  status: 'success' | 'warning' | 'error' | 'info';
}

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-01',
    clientId: 'c01',
    clientName: 'Ridgeline Plumbing',
    type: 'lead',
    title: 'New quote lead routed',
    description: 'Marcus Tran submitted quote request for Furnace Repair · Tagged & SMS sent',
    timestamp: minutesAgo(8),
    timeGroup: 'Today',
    status: 'success',
  },
  {
    id: 'act-02',
    clientId: 'c13',
    clientName: 'Wolf Willow Vet Clinic',
    type: 'deploy',
    title: 'Sub-account deploy completed',
    description: 'Snapshot applied, 14 pages published, 7 workflows configured, SSL active',
    timestamp: hoursAgo(2),
    timeGroup: 'Today',
    status: 'success',
  },
  {
    id: 'act-03',
    clientId: 'c11',
    clientName: 'Prairie Sky Roofing',
    type: 'webhook',
    title: 'Webhook delivery warning',
    description: 'Intake webhook returned 500 status · Exponential retry schedule initiated',
    timestamp: hoursAgo(4),
    timeGroup: 'Today',
    status: 'warning',
  },
  {
    id: 'act-04',
    clientId: 'c04',
    clientName: 'Boréal Coiffure',
    type: 'maintenance',
    title: 'Bilingual switcher submitted for review',
    description: 'Alex finalized French/English toggle implementation with QA checklist complete',
    timestamp: hoursAgo(7),
    timeGroup: 'Today',
    status: 'info',
  },
  {
    id: 'act-05',
    clientId: 'c08',
    clientName: 'Granite Peak Fitness',
    type: 'maintenance',
    title: 'Change request moved to In Progress',
    description: 'Hero photography replacement in progress · WebP optimization passed',
    timestamp: daysAgo(1),
    timeGroup: 'Yesterday',
    status: 'info',
  },
  {
    id: 'act-06',
    clientId: 'c09',
    clientName: 'Lakehead Auto Care',
    type: 'domain',
    title: 'DNS record detected',
    description: 'CNAME record propagated for lakeheadauto.ca · SSL certificate generation pending',
    timestamp: daysAgo(1),
    timeGroup: 'Yesterday',
    status: 'info',
  },
  {
    id: 'act-07',
    clientId: 'c01',
    clientName: 'Ridgeline Plumbing',
    type: 'maintenance',
    title: 'Hotfix verified & approved',
    description: 'Sticky mobile quick-dial bar deployed and tested on iOS & Android devices',
    timestamp: daysAgo(2),
    timeGroup: 'Earlier this week',
    status: 'success',
  },
  {
    id: 'act-08',
    clientId: 'c02',
    clientName: 'Maple & Pine Dental',
    type: 'snapshot',
    title: 'Snapshot upgrade applied',
    description: 'Updated from Clinic v3.0 to Clinic v3.1 with automated intake form sync',
    timestamp: daysAgo(3),
    timeGroup: 'Earlier this week',
    status: 'success',
  },
];
