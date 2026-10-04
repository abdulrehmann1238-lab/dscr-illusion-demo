import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { MaintenanceRequest } from '../../data/requests';
import { RequestDrawer } from '../../components/console/RequestDrawer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { delay } from '../../lib/delay';
import {
  Wrench,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const stages: MaintenanceRequest['stage'][] = [
  'Requested',
  'In progress',
  'Review',
  'Done',
];

export const MaintenancePage: React.FC = () => {
  const { requests, addRequest, moveRequestStage, clients } = useAppStore();
  const { success, info } = useToast();

  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');

  // New Request Form state
  const [newClientId, setNewClientId] = useState('c01');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<'Content' | 'Design' | 'Automation' | 'Bug'>('Content');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [recentlyCreatedId, setRecentlyCreatedId] = useState<string | null>(null);
  const [isAutoProgressing, setIsAutoProgressing] = useState(false);

  const filteredRequests = requests.filter(
    (r) => filterType === 'All' || r.type === filterType
  );

  const handleOpenRequest = (req: MaintenanceRequest) => {
    setSelectedRequest(req);
    setDrawerOpen(true);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!newTitle.trim()) errs.title = 'Title is required';
    if (!newDescription.trim() || newDescription.length < 10) {
      errs.description = 'Please provide details of the change (min 10 characters)';
    }

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    const client = clients.find((c) => c.id === newClientId) || clients[0];

    const req: MaintenanceRequest = {
      id: `req-${Date.now()}`,
      clientId: client.id,
      clientName: client.business,
      clientMonogram: client.business.slice(0, 2).toUpperCase(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      type: newType,
      priority: newPriority,
      stage: 'Requested',
      createdAt: 'Just now',
      assignee: 'Alex',
      qaChecklist: [
        { item: 'Verify change across mobile & desktop templates', completed: false },
        { item: 'Execute regression QA check', completed: false },
      ],
      changelog: ['Ticket created by agency owner Dana Whitfield'],
      beforePreview: {
        title: 'Current Live State',
        subtitle: 'Before maintenance execution',
        tag: 'Original State',
      },
      afterPreview: {
        title: newTitle.trim(),
        subtitle: 'Staged change ready for verification',
        tag: 'Updated (QA Ready)',
      },
    };

    addRequest(req);
    setRecentlyCreatedId(req.id);
    setNewModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setFormErrors({});

    success(
      'Request Submitted',
      `Ticket "${req.title}" added to Requested queue. Click "Watch it get done" to see the cycle.`
    );
  };

  // WOW Moment 3: Auto-progress demo loop (moves card Requested -> In progress -> Review -> Done)
  const handleWatchItGetDone = async (id: string) => {
    setIsAutoProgressing(true);

    info('Advancing Ticket', 'Moving to "In progress" — Alex started code work...');
    await delay(1500);
    moveRequestStage(id, 'In progress');

    await delay(1500);
    info('QA Review Ready', 'Moving to "Review" — Before/After slider generated...');
    moveRequestStage(id, 'Review');

    await delay(1500);
    moveRequestStage(id, 'Done');
    success('Completed & Verified', 'Ticket moved to "Done" with QA checks passed!');

    setIsAutoProgressing(false);
    setRecentlyCreatedId(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-display font-medium text-text">
            Ongoing Maintenance Queue ({requests.length})
          </h1>
          <p className="text-xs text-text-2 mt-0.5">
            Transparent Kanban board for client edit requests, before/after visual QA, and rapid turnaround.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-elevated border border-border rounded px-3 py-2 text-text outline-none cursor-pointer"
          >
            <option value="All">All Request Types</option>
            <option value="Content">Content Edits</option>
            <option value="Design">Design & Styling</option>
            <option value="Automation">Automation & Workflows</option>
            <option value="Bug">Bug Hotfixes</option>
          </select>

          <Button
            variant="primary"
            size="md"
            onClick={() => setNewModalOpen(true)}
            icon={<PlusCircle className="w-4 h-4" />}
          >
            New change request
          </Button>
        </div>
      </div>

      {/* Auto-progress demo notification strip if a ticket was just created */}
      {recentlyCreatedId && (
        <div className="p-4 bg-secondary-soft border border-primary/30 rounded-lg flex items-center justify-between text-xs animate-fade-in shadow-sh-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-semibold text-primary">
              Demonstrate Maintenance Workflow:
            </span>
            <span className="text-text-2">
              Watch this new change request advance automatically through all stages.
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleWatchItGetDone(recentlyCreatedId)}
            loading={isAutoProgressing}
            icon={<Play className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Watch it get done &rarr;
          </Button>
        </div>
      )}

      {/* Kanban Board Columns (Requested -> In progress -> Review -> Done) */}
      <div className="w-full overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-[1020px] text-left">
          {stages.map((stage) => {
            const stageRequests = filteredRequests.filter((r) => r.stage === stage);

            return (
              <div
                key={stage}
                className="flex-1 bg-surface border border-border rounded-lg p-3.5 flex flex-col min-w-[240px] max-w-[280px]"
              >
                {/* Column Title */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/70">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text">{stage}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-secondary-soft text-primary font-bold">
                      {stageRequests.length}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="flex flex-col gap-3 min-h-[380px]">
                  {stageRequests.map((req) => (
                    <div
                      key={req.id}
                      onClick={() => handleOpenRequest(req)}
                      className={cn(
                        'bg-elevated border rounded-lg p-3.5 shadow-sh-1 hover:shadow-sh-2 hover:border-border-strong transition-all duration-fast cursor-pointer select-none flex flex-col justify-between',
                        req.priority === 'Urgent'
                          ? 'border-l-4 border-l-rose-600'
                          : req.priority === 'High'
                          ? 'border-l-4 border-l-amber-600'
                          : 'border-border'
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-surface border border-border text-text-muted">
                            {req.clientMonogram}
                          </span>
                          <span className="text-[10px] font-mono text-text-muted">
                            {req.createdAt}
                          </span>
                        </div>

                        <h4 className="text-xs font-semibold text-text mb-1 leading-snug line-clamp-2">
                          {req.title}
                        </h4>

                        <p className="text-[11px] text-text-2 line-clamp-2 mb-3">
                          {req.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-surface text-text-muted font-medium">
                          {req.type}
                        </span>
                        <span className="text-primary font-semibold hover:underline flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>QA Details</span>
                        </span>
                      </div>
                    </div>
                  ))}

                  {stageRequests.length === 0 && (
                    <div className="h-32 border border-dashed border-border rounded-md flex flex-col items-center justify-center text-text-muted/60 text-xs p-4 text-center">
                      <span>Nothing here.</span>
                      <span className="text-[10px] mt-0.5">That&apos;s the goal.</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Request Inspection Drawer */}
      <RequestDrawer
        request={selectedRequest}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* New Maintenance Request Modal */}
      <Modal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title="Submit New Change Request"
        description="Add a task to your partner maintenance queue for same-business-day turnaround."
      >
        <form onSubmit={handleCreateRequest} className="space-y-4 text-left">
          <Select
            label="Target Client Site"
            value={newClientId}
            onChange={(e) => setNewClientId(e.target.value)}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.business} ({c.domain})
              </option>
            ))}
          </Select>

          <Input
            label="Request Title"
            placeholder="e.g. Update emergency dispatch pricing banner"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            error={formErrors.title}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Request Category"
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
            >
              <option value="Content">Content / Copy Edit</option>
              <option value="Design">Design & Styling</option>
              <option value="Automation">Automation / Webhook</option>
              <option value="Bug">Bug Hotfix</option>
            </Select>

            <Select
              label="Priority Level"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
            >
              <option value="Low">Low (Within 48h)</option>
              <option value="Medium">Medium (Within 24h)</option>
              <option value="High">High (Same day)</option>
              <option value="Urgent">Urgent Hotfix (&lt;4h)</option>
            </Select>
          </div>

          <Textarea
            label="Detailed Scope / Copy Changes"
            placeholder="Please detail the changes required, new copy strings, or asset swap directions..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            error={formErrors.description}
            required
          />

          <div className="pt-3 border-t border-border flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setNewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Ticket &amp; Queue
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
