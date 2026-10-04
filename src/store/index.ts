import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialClients, Client } from '../data/clients';
import { initialSnapshots, Snapshot } from '../data/snapshots';
import { initialWorkflows, Workflow } from '../data/workflows';
import { initialLeads, Lead } from '../data/leads';
import { initialIntegrations, initialWebhookLogs, Integration, WebhookLog } from '../data/webhooks';
import { initialRequests, MaintenanceRequest } from '../data/requests';
import { initialActivities, ActivityItem } from '../data/activity';
import { hoursAgo, minutesAgo } from '../lib/format';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'lead' | 'warning' | 'deploy' | 'maintenance' | 'system';
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Lead: Marcus Tran',
    message: 'Ridgeline Plumbing quote form received ($450 est.)',
    time: '8m ago',
    read: false,
    type: 'lead',
  },
  {
    id: 'notif-2',
    title: 'Webhook Error Alert',
    message: 'Prairie Sky Roofing webhook returned 500 status',
    time: '14m ago',
    read: false,
    type: 'warning',
  },
  {
    id: 'notif-3',
    title: 'Sub-account Deployed',
    message: 'Wolf Willow Vet Clinic snapshot successfully provisioned',
    time: '2h ago',
    read: true,
    type: 'deploy',
  },
  {
    id: 'notif-4',
    title: 'Change Request in Review',
    message: 'Boréal Coiffure French/English toggle ready for approval',
    time: '7h ago',
    read: true,
    type: 'maintenance',
  },
  {
    id: 'notif-5',
    title: 'Snapshot Update Available',
    message: 'Home Services v4.2 is ready to roll out to 3 sites',
    time: '1d ago',
    read: true,
    type: 'system',
  },
];

interface AppState {
  // Data
  clients: Client[];
  snapshots: Snapshot[];
  workflows: Workflow[];
  leads: Lead[];
  integrations: Integration[];
  webhookLogs: WebhookLog[];
  requests: MaintenanceRequest[];
  activities: ActivityItem[];
  notifications: NotificationItem[];

  // UI state
  commandPaletteOpen: boolean;
  selectedClientId: string;
  tourActive: boolean;
  tourStep: number;
  previewDevice: 'desktop' | 'tablet' | 'phone';
  customCodeAccent: string;
  customCodeMobileOnly: boolean;

  // Actions
  setCommandPaletteOpen: (open: boolean) => void;
  setSelectedClientId: (id: string) => void;
  setTourActive: (active: boolean) => void;
  setTourStep: (step: number) => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'phone') => void;
  setCustomCodeAccent: (color: string) => void;
  setCustomCodeMobileOnly: (val: boolean) => void;
  resetCustomCode: () => void;

  // Data Actions
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  addLead: (lead: Lead) => void;
  moveLeadStage: (id: string, stage: Lead['stage']) => void;
  addRequest: (req: MaintenanceRequest) => void;
  moveRequestStage: (id: string, stage: MaintenanceRequest['stage']) => void;
  updateRequest: (id: string, updates: Partial<MaintenanceRequest>) => void;
  approveRequest: (id: string) => void;
  rolloutSnapshotToClients: (snapshotId: string, clientIds: string[]) => void;
  addWebhookLog: (log: WebhookLog) => void;
  simulateWebhookFailure: (clientName: string) => void;
  replayWebhookLog: (id: string) => void;
  addActivity: (activity: ActivityItem) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'read' | 'time'>) => void;

  // Global reset
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      clients: initialClients,
      snapshots: initialSnapshots,
      workflows: initialWorkflows,
      leads: initialLeads,
      integrations: initialIntegrations,
      webhookLogs: initialWebhookLogs,
      requests: initialRequests,
      activities: initialActivities,
      notifications: initialNotifications,

      commandPaletteOpen: false,
      selectedClientId: 'c01',
      tourActive: false,
      tourStep: 0,
      previewDevice: 'desktop',
      customCodeAccent: '#1E3A5F',
      customCodeMobileOnly: true,

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setSelectedClientId: (id) => set({ selectedClientId: id }),
      setTourActive: (active) => set({ tourActive: active }),
      setTourStep: (step) => set({ tourStep: step }),
      nextTourStep: () => set((state) => ({ tourStep: state.tourStep + 1 })),
      prevTourStep: () => set((state) => ({ tourStep: Math.max(0, state.tourStep - 1) })),
      setPreviewDevice: (device) => set({ previewDevice: device }),
      setCustomCodeAccent: (color) => set({ customCodeAccent: color }),
      setCustomCodeMobileOnly: (val) => set({ customCodeMobileOnly: val }),
      resetCustomCode: () => set({ customCodeAccent: '#1E3A5F', customCodeMobileOnly: true }),

      addClient: (client) => {
        set((state) => ({
          clients: [client, ...state.clients],
          activities: [
            {
              id: `act-${Date.now()}`,
              clientId: client.id,
              clientName: client.business,
              type: 'deploy',
              title: 'New client deployed',
              description: `Sub-account created with ${client.snapshot} ${client.snapshotVersion}`,
              timestamp: 'Just now',
              timeGroup: 'Today',
              status: 'success',
            },
            ...state.activities,
          ],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: 'Sub-account Deployed',
              message: `${client.business} has been provisioned and added to your portfolio`,
              time: 'Just now',
              read: false,
              type: 'deploy',
            },
            ...state.notifications,
          ],
        }));
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },

      addLead: (lead) => {
        set((state) => ({
          leads: [lead, ...state.leads],
          activities: [
            {
              id: `act-${Date.now()}`,
              clientId: lead.clientId,
              clientName: 'Ridgeline Plumbing',
              type: 'lead',
              title: `New quote lead: ${lead.name}`,
              description: `${lead.service} (${lead.city}) · $${lead.valueCAD} estimated value`,
              timestamp: 'Just now',
              timeGroup: 'Today',
              status: 'success',
            },
            ...state.activities,
          ],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: `New Lead: ${lead.name}`,
              message: `Ridgeline Plumbing quote received for ${lead.service} ($${lead.valueCAD})`,
              time: 'Just now',
              read: false,
              type: 'lead',
            },
            ...state.notifications,
          ],
        }));
      },

      moveLeadStage: (id, stage) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, stage } : l)),
        }));
      },

      addRequest: (req) => {
        set((state) => ({
          requests: [req, ...state.requests],
          activities: [
            {
              id: `act-${Date.now()}`,
              clientId: req.clientId,
              clientName: req.clientName,
              type: 'maintenance',
              title: 'New maintenance request',
              description: `${req.title} · Priority: ${req.priority}`,
              timestamp: 'Just now',
              timeGroup: 'Today',
              status: 'info',
            },
            ...state.activities,
          ],
        }));
      },

      moveRequestStage: (id, stage) => {
        set((state) => ({
          requests: state.requests.map((r) => (r.id === id ? { ...r, stage } : r)),
        }));
      },

      updateRequest: (id, updates) => {
        set((state) => ({
          requests: state.requests.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }));
      },

      approveRequest: (id) => {
        const req = get().requests.find((r) => r.id === id);
        set((state) => ({
          requests: state.requests.map((r) => (r.id === id ? { ...r, stage: 'Done' } : r)),
          activities: [
            {
              id: `act-${Date.now()}`,
              clientId: req?.clientId,
              clientName: req?.clientName,
              type: 'maintenance',
              title: 'Change request approved & deployed',
              description: `${req?.title || 'Request'} marked Done with QA checks passed`,
              timestamp: 'Just now',
              timeGroup: 'Today',
              status: 'success',
            },
            ...state.activities,
          ],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: 'Change Request Approved',
              message: `${req?.title || 'Request'} deployed to ${req?.clientName || 'site'}`,
              time: 'Just now',
              read: false,
              type: 'maintenance',
            },
            ...state.notifications,
          ],
        }));
      },

      rolloutSnapshotToClients: (snapshotId, clientIds) => {
        const snapshot = get().snapshots.find((s) => s.id === snapshotId);
        set((state) => ({
          clients: state.clients.map((c) =>
            clientIds.includes(c.id)
              ? {
                  ...c,
                  snapshotVersion: snapshot?.version || c.snapshotVersion,
                  snapshotOutdated: false,
                  lastChange: 'Just now',
                }
              : c
          ),
          activities: [
            {
              id: `act-${Date.now()}`,
              type: 'snapshot',
              title: `Snapshot ${snapshot?.version || ''} rolled out`,
              description: `Upgraded ${clientIds.length} sub-accounts with full QA regression verification`,
              timestamp: 'Just now',
              timeGroup: 'Today',
              status: 'success',
            },
            ...state.activities,
          ],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: 'Snapshot Rollout Complete',
              message: `Successfully updated ${clientIds.length} client sites to ${snapshot?.version}`,
              time: 'Just now',
              read: false,
              type: 'system',
            },
            ...state.notifications,
          ],
        }));
      },

      addWebhookLog: (log) => {
        set((state) => ({
          webhookLogs: [log, ...state.webhookLogs],
        }));
      },

      simulateWebhookFailure: (clientName) => {
        const failedLog: WebhookLog = {
          id: `wh-${Date.now()}`,
          clientId: 'c11',
          clientName: clientName || 'Prairie Sky Roofing',
          timestamp: 'Just now',
          method: 'POST',
          endpoint: 'https://api.prairieskyroofing.ca/webhooks/intake-leads',
          status: 500,
          durationMs: 910,
          event: 'contact.created',
          payload: {
            contact_id: 'ghl_cnt_test_500',
            first_name: 'Test Lead',
            phone: '+14035559999',
            error_simulated: true,
          },
          response: {
            error: 'InternalServerError',
            message: 'Endpoint returned HTTP 500 Internal Server Error (simulated test).',
            code: 'SIMULATED_FAIL',
          },
          retries: [
            { attempt: 1, scheduledAt: '1m backoff (pending)', status: 'pending' },
            { attempt: 2, scheduledAt: '5m backoff (pending)', status: 'pending' },
            { attempt: 3, scheduledAt: '15m backoff (pending)', status: 'pending' },
          ],
        };

        set((state) => ({
          webhookLogs: [failedLog, ...state.webhookLogs],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: 'Webhook 500 Failure Alert',
              message: `Delivery failed for ${clientName}. Backoff retries queued.`,
              time: 'Just now',
              read: false,
              type: 'warning',
            },
            ...state.notifications,
          ],
          activities: [
            {
              id: `act-${Date.now()}`,
              clientName,
              type: 'webhook',
              title: 'Webhook failure (500)',
              description: 'Endpoint returned 500 status · Automatic backoff retry sequence initiated',
              timestamp: 'Just now',
              timeGroup: 'Today',
              status: 'error',
            },
            ...state.activities,
          ],
        }));
      },

      replayWebhookLog: (id) => {
        set((state) => ({
          webhookLogs: state.webhookLogs.map((log) =>
            log.id === id
              ? {
                  ...log,
                  status: 200,
                  timestamp: 'Just now (replayed)',
                  durationMs: 135,
                  response: { success: true, replayed: true, status: 'synced_ok' },
                  retries: [
                    { attempt: 1, scheduledAt: 'Immediate manual replay', status: 'completed' },
                  ],
                }
              : log
          ),
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: 'Webhook Replay Succeeded',
              message: `Endpoint replayed successfully with 200 OK.`,
              time: 'Just now',
              read: false,
              type: 'system',
            },
            ...state.notifications,
          ],
        }));
      },

      addActivity: (activity) => {
        set((state) => ({
          activities: [activity, ...state.activities],
        }));
      },

      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      addNotification: (notif) => {
        set((state) => ({
          notifications: [
            {
              id: `notif-${Date.now()}`,
              ...notif,
              time: 'Just now',
              read: false,
            },
            ...state.notifications,
          ],
        }));
      },

      resetDemoData: () => {
        set({
          clients: initialClients,
          snapshots: initialSnapshots,
          workflows: initialWorkflows,
          leads: initialLeads,
          integrations: initialIntegrations,
          webhookLogs: initialWebhookLogs,
          requests: initialRequests,
          activities: initialActivities,
          notifications: initialNotifications,
          selectedClientId: 'c01',
          customCodeAccent: '#1E3A5F',
          customCodeMobileOnly: true,
          previewDevice: 'desktop',
          tourStep: 0,
        });
      },
    }),
    {
      name: 'northline_demo_store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
