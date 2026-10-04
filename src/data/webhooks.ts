import { minutesAgo } from '../lib/format';

export interface WebhookLog {
  id: string;
  clientId: string;
  clientName: string;
  timestamp: string;
  method: 'POST' | 'GET' | 'PUT';
  endpoint: string;
  status: number;
  durationMs: number;
  event: string;
  payload: Record<string, any>;
  response: Record<string, any>;
  retries?: { attempt: number; scheduledAt: string; status: 'completed' | 'pending' | 'failed' }[];
}

export interface Integration {
  id: string;
  name: string;
  monogram: string;
  category: 'Calendar' | 'Payments' | 'Messaging' | 'Accounting' | 'Automation' | 'Reviews';
  status: 'Connected' | 'Needs auth' | 'Error';
  lastSync: string;
  description: string;
  mappedFields: { ghlField: string; destinationField: string; status: 'mapped' | 'unmapped' }[];
}

export const initialIntegrations: Integration[] = [
  {
    id: 'int-01',
    name: 'Google Calendar Sync',
    monogram: 'GC',
    category: 'Calendar',
    status: 'Connected',
    lastSync: '4m ago',
    description: 'Two-way technician dispatch scheduling and customer booking availability.',
    mappedFields: [
      { ghlField: 'contact.name', destinationField: 'event.summary', status: 'mapped' },
      { ghlField: 'appointment.start_time', destinationField: 'event.start.dateTime', status: 'mapped' },
      { ghlField: 'contact.address', destinationField: 'event.location', status: 'mapped' },
    ],
  },
  {
    id: 'int-02',
    name: 'Stripe Payments',
    monogram: 'SP',
    category: 'Payments',
    status: 'Connected',
    lastSync: '12m ago',
    description: 'Instant deposit authorization and recurring maintenance invoicing in CAD.',
    mappedFields: [
      { ghlField: 'opportunity.value', destinationField: 'invoice.amount_due', status: 'mapped' },
      { ghlField: 'contact.email', destinationField: 'customer.email', status: 'mapped' },
    ],
  },
  {
    id: 'int-03',
    name: 'Twilio SMS Gateway',
    monogram: 'TW',
    category: 'Messaging',
    status: 'Connected',
    lastSync: '1m ago',
    description: 'High-deliverability 10DLC registered Canadian local numbers for dispatch SMS.',
    mappedFields: [
      { ghlField: 'contact.phone', destinationField: 'sms.to', status: 'mapped' },
      { ghlField: 'message.body', destinationField: 'sms.body', status: 'mapped' },
    ],
  },
  {
    id: 'int-04',
    name: 'QuickBooks Online',
    monogram: 'QB',
    category: 'Accounting',
    status: 'Connected',
    lastSync: '1h ago',
    description: 'Automated invoice and estimate sync on opportunity Won status.',
    mappedFields: [
      { ghlField: 'opportunity.title', destinationField: 'estimate.description', status: 'mapped' },
      { ghlField: 'contact.tax_id', destinationField: 'customer.tax_identifier', status: 'mapped' },
    ],
  },
  {
    id: 'int-05',
    name: 'Meta Lead Ads',
    monogram: 'ML',
    category: 'Automation',
    status: 'Connected',
    lastSync: '18m ago',
    description: 'Instant pipeline ingestion from Facebook & Instagram local trade campaigns.',
    mappedFields: [
      { ghlField: 'lead_ad.id', destinationField: 'source_id', status: 'mapped' },
      { ghlField: 'lead_ad.phone_number', destinationField: 'contact.phone', status: 'mapped' },
    ],
  },
  {
    id: 'int-06',
    name: 'Google Business Profile',
    monogram: 'GB',
    category: 'Reviews',
    status: 'Connected',
    lastSync: '2h ago',
    description: 'Automated review monitoring and 5-star reputation generation.',
    mappedFields: [
      { ghlField: 'review.rating', destinationField: 'crm.rating_score', status: 'mapped' },
      { ghlField: 'review.comment', destinationField: 'crm.feedback_note', status: 'mapped' },
    ],
  },
];

export const initialWebhookLogs: WebhookLog[] = [
  {
    id: 'wh-01',
    clientId: 'c01',
    clientName: 'Ridgeline Plumbing',
    timestamp: minutesAgo(3),
    method: 'POST',
    endpoint: 'https://hooks.prairiepine.example/ghl/form-submitted',
    status: 200,
    durationMs: 142,
    event: 'quote.form_submitted',
    payload: {
      contact_id: 'ghl_cnt_91823',
      first_name: 'Marcus',
      last_name: 'Tran',
      phone: '+14035550142',
      email: 'marcus.tran@example.ca',
      service_requested: 'Furnace Repair',
      postal_code: 'T2L 1K4',
      city: 'Calgary',
      source: 'website-quote-form',
      casl_consent: true,
      utm_source: 'organic-search',
    },
    response: {
      success: true,
      opportunity_id: 'opp_88192',
      stage: 'New Lead',
      sms_queued: true,
      message_id: 'msg_tw_99182',
    },
  },
  {
    id: 'wh-02',
    clientId: 'c11',
    clientName: 'Prairie Sky Roofing',
    timestamp: minutesAgo(14),
    method: 'POST',
    endpoint: 'https://api.prairieskyroofing.ca/webhooks/intake-leads',
    status: 500,
    durationMs: 820,
    event: 'contact.created',
    payload: {
      contact_id: 'ghl_cnt_91811',
      first_name: 'David',
      phone: '+12045550199',
      service: 'Roof Leak Inspection',
      roof_age_years: 18,
    },
    response: {
      error: 'InternalServerError',
      message: 'Database connection pool timed out during quote stage allocation.',
      code: 'DB_ERR_TIMEOUT',
    },
    retries: [
      { attempt: 1, scheduledAt: '1m backoff (failed)', status: 'failed' },
      { attempt: 2, scheduledAt: '5m backoff (failed)', status: 'failed' },
      { attempt: 3, scheduledAt: '15m backoff (pending)', status: 'pending' },
    ],
  },
  {
    id: 'wh-03',
    clientId: 'c02',
    clientName: 'Maple & Pine Dental',
    timestamp: minutesAgo(28),
    method: 'POST',
    endpoint: 'https://hooks.prairiepine.example/ghl/appointment-booked',
    status: 200,
    durationMs: 215,
    event: 'calendar.slot_reserved',
    payload: {
      patient_name: 'Sarah Lindqvist',
      appointment_time: '2026-10-06T14:30:00-07:00',
      operatory: 'Suite 3',
      hygienist: 'Dr. Heather Ross',
    },
    response: {
      synced_gcal: true,
      sms_reminder_scheduled: true,
    },
  },
  {
    id: 'wh-04',
    clientId: 'c08',
    clientName: 'Granite Peak Fitness',
    timestamp: minutesAgo(45),
    method: 'POST',
    endpoint: 'https://hooks.prairiepine.example/ghl/trial-pass',
    status: 200,
    durationMs: 168,
    event: 'trial.issued',
    payload: {
      contact_name: 'Cole Bennett',
      membership_type: '7-Day Unlimited Mountain Pass',
      qr_token: 'GPF_TRIAL_991823',
    },
    response: {
      delivered_sms: true,
    },
  },
];
