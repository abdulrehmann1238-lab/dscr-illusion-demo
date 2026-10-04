export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'wait' | 'condition';
  title: string;
  subtitle: string;
  config?: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'failed';
  errorDetails?: string;
}

export interface Workflow {
  id: string;
  clientId: string;
  name: string;
  status: boolean; // active or paused
  runs30d: number;
  successRate: number;
  description: string;
  nodes: WorkflowNode[];
}

export const initialWorkflows: Workflow[] = [
  {
    id: 'wf-01',
    clientId: 'c01',
    name: 'New Lead — Quote Request',
    status: true,
    runs30d: 142,
    successRate: 99.3,
    description: 'Fires instantly when website quote form is submitted. Creates CRM contact, sends 30-second SMS, tags lead, creates pipeline card, and alerts technician on call.',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        title: 'Form Submitted',
        subtitle: 'Source: Website Quote Request (Ridgeline)',
      },
      {
        id: 'node-2',
        type: 'action',
        title: 'Add Contact Tag',
        subtitle: 'Tag: lead-web · lead-plumbing',
      },
      {
        id: 'node-3',
        type: 'action',
        title: 'Send Instant SMS (<30s)',
        subtitle: '"Hi {{first_name}}, Ridgeline team received your request. On it now!"',
      },
      {
        id: 'node-4',
        type: 'action',
        title: 'Create CRM Opportunity',
        subtitle: 'Stage: New Lead · Value: Est. $450 · Priority: High',
      },
      {
        id: 'node-5',
        type: 'action',
        title: 'Notify On-Call Technician',
        subtitle: 'Internal SMS & Push alert with service description',
      },
      {
        id: 'node-6',
        type: 'wait',
        title: 'Wait 15 Minutes',
        subtitle: 'Simulated wait timer (checks for technician response)',
      },
      {
        id: 'node-7',
        type: 'condition',
        title: 'Has Lead Been Contacted?',
        subtitle: 'If no contact logged: escalate alert to Dispatch Manager',
      },
    ],
  },
  {
    id: 'wf-02',
    clientId: 'c01',
    name: 'Missed Call Text-Back',
    status: true,
    runs30d: 68,
    successRate: 98.5,
    description: 'Captures after-hours or busy line calls by instantly texting caller with dispatch booking link.',
    nodes: [
      { id: 'mc-1', type: 'trigger', title: 'Call Status: Missed', subtitle: 'Phone system event' },
      { id: 'mc-2', type: 'wait', title: 'Wait 20 Seconds', subtitle: 'Allows caller to hang up' },
      { id: 'mc-3', type: 'action', title: 'Send SMS', subtitle: '"Sorry we missed you! How can Ridgeline help today?"' },
      { id: 'mc-4', type: 'action', title: 'Tag: missed-call-followup', subtitle: 'Add to CRM pipeline' },
    ],
  },
  {
    id: 'wf-03',
    clientId: 'c01',
    name: 'Appointment Reminder (24h + 2h)',
    status: true,
    runs30d: 94,
    successRate: 100,
    description: 'Sends automated calendar confirmation 24 hours prior and a 2-hour dispatch notice with technician ETA.',
    nodes: [
      { id: 'ar-1', type: 'trigger', title: 'Appointment Scheduled', subtitle: 'Calendar slot booked' },
      { id: 'ar-2', type: 'wait', title: 'Wait Until 24h Before', subtitle: 'Scheduled delivery' },
      { id: 'ar-3', type: 'action', title: 'Send 24h Reminder SMS', subtitle: 'Include technician arrival window' },
      { id: 'ar-4', type: 'wait', title: 'Wait Until 2h Before', subtitle: 'Final dispatch ping' },
      { id: 'ar-5', type: 'action', title: 'Send "Technician En Route"', subtitle: 'SMS confirmation' },
    ],
  },
  {
    id: 'wf-04',
    clientId: 'c01',
    name: 'Review Request (Google 5-Star)',
    status: true,
    runs30d: 76,
    successRate: 98.7,
    description: 'Triggers 3 days after job completion in pipeline. Generates direct Google Business review link.',
    nodes: [
      { id: 'rr-1', type: 'trigger', title: 'Pipeline Stage -> Completed', subtitle: 'Job completed by technician' },
      { id: 'rr-2', type: 'wait', title: 'Wait 3 Days', subtitle: 'Let customer experience the fix' },
      { id: 'rr-3', type: 'action', title: 'Send Review Request SMS', subtitle: '"How was Marcus\'s work today? Leave a review:"' },
    ],
  },
  {
    id: 'wf-05',
    clientId: 'c01',
    name: 'Invoice Paid -> Pipeline "Won"',
    status: true,
    runs30d: 82,
    successRate: 100,
    description: 'Moves CRM deal to Won stage and triggers accounting receipt.',
    nodes: [
      { id: 'ip-1', type: 'trigger', title: 'Payment Webhook Succeeded', subtitle: 'Payment gateway hook' },
      { id: 'ip-2', type: 'action', title: 'Move to "Won"', subtitle: 'Update pipeline opportunity' },
      { id: 'ip-3', type: 'action', title: 'Send Thank You Email', subtitle: 'Includes PDF receipt link' },
    ],
  },
  {
    id: 'wf-06',
    clientId: 'c01',
    name: 'Quote Follow-Up (Day 2, 5, 10)',
    status: true,
    runs30d: 49,
    successRate: 97.9,
    description: 'Multi-touch automated nurturing sequence for open estimates.',
    nodes: [
      { id: 'qf-1', type: 'trigger', title: 'Quote Sent to Customer', subtitle: 'Estimate generated' },
      { id: 'qf-2', type: 'wait', title: 'Wait 48 Hours', subtitle: 'Check if accepted' },
      { id: 'qf-3', type: 'condition', title: 'Quote Accepted?', subtitle: 'If unaccepted: proceed with follow-up' },
      { id: 'qf-4', type: 'action', title: 'Send Gentle Check-in SMS', subtitle: '"Any questions on the furnace quote?"' },
    ],
  },
];
