import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Snapshot } from '../../data/snapshots';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { useToast } from '../../components/ui/Toast';
import {
  GitBranch,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { delay } from '../../lib/delay';

export const SnapshotsPage: React.FC = () => {
  const { snapshots, clients, rolloutSnapshotToClients } = useAppStore();
  const { success } = useToast();

  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rolloutModalOpen, setRolloutModalOpen] = useState(false);
  const [isRollingOut, setIsRollingOut] = useState(false);
  const [runQaToggle, setRunQaToggle] = useState(true);

  // Clients that could be upgraded to Home Services v4.2
  const candidateClients = clients.filter(
    (c) => c.snapshot === 'Home Services' && c.snapshotVersion !== 'v4.2'
  );
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>(
    candidateClients.map((c) => c.id)
  );

  const handleOpenSnapshot = (snap: Snapshot) => {
    setSelectedSnapshot(snap);
    setDrawerOpen(true);
  };

  const handleRollout = async () => {
    if (!selectedSnapshot) return;
    setIsRollingOut(true);
    await delay(1200);

    rolloutSnapshotToClients(
      selectedSnapshot.id,
      selectedClientIds.length > 0 ? selectedClientIds : ['c12', 'c09']
    );

    setIsRollingOut(false);
    setRolloutModalOpen(false);
    setDrawerOpen(false);

    success(
      'Snapshot Rolled Out',
      `Upgraded candidate sub-accounts to ${selectedSnapshot.version} with 12/12 QA checks passed.`
    );
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-display font-medium text-text">
            GoHighLevel Snapshot Library ({snapshots.length})
          </h1>
          <p className="text-xs text-text-2 mt-0.5">
            Strict snapshot version control, drift tracking, and portfolio-wide regression rollouts.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => handleOpenSnapshot(snapshots[0])}
          icon={<GitBranch className="w-3.5 h-3.5" />}
        >
          Inspect Trades v4.2 Diff
        </Button>
      </div>

      {/* Snapshot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snapshots.map((snap) => (
          <div
            key={snap.id}
            onClick={() => handleOpenSnapshot(snap)}
            className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1 hover:shadow-sh-2 hover:border-border-strong transition-all duration-fast cursor-pointer flex flex-col justify-between"
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

              <h3 className="text-base font-semibold text-text mb-1.5">{snap.name}</h3>
              <p className="text-xs text-text-2 leading-relaxed mb-4">{snap.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-border">
              {/* Drift indicator */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Sub-accounts active:</span>
                <span className="font-semibold text-text font-mono">
                  {snap.subAccountsCount} sites
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Drift status:</span>
                <span
                  className={cn(
                    'font-mono text-[11px] font-semibold px-2 py-0.2 rounded',
                    snap.modifiedCount > 0
                      ? 'bg-warning-bg text-amber-900'
                      : 'bg-success-bg text-emerald-800'
                  )}
                >
                  {snap.modifiedCount > 0
                    ? `${snap.modifiedCount} modified`
                    : '100% in sync'}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-text-muted font-mono">
                <span>{snap.pageCount} Pages · {snap.workflowCount} Workflows</span>
                <span className="text-primary font-semibold hover:underline">
                  View Diff &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail & Diff Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedSnapshot ? `${selectedSnapshot.name} (${selectedSnapshot.version})` : 'Snapshot'}
        description="Version diff, architectural changes, and sub-account upgrade rollout."
        width="lg"
      >
        {selectedSnapshot && (
          <div className="space-y-6 text-left">
            {/* Action Bar */}
            <div className="p-4 rounded-md bg-secondary-soft/50 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-primary block">
                  Version {selectedSnapshot.version} Production Build
                </span>
                <span className="text-[11px] text-text-2">
                  Last updated {selectedSnapshot.lastUpdated} · Verified on 14 sub-accounts
                </span>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setRolloutModalOpen(true)}
                icon={<GitBranch className="w-3.5 h-3.5" />}
              >
                Roll out to Sites
              </Button>
            </div>

            {/* Version Diff List (Added / Changed / Removed) */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text mb-3">
                Architectural Changes in {selectedSnapshot.version}
              </h4>
              <div className="space-y-2.5">
                {selectedSnapshot.diffs.map((diff, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 rounded-md border text-xs flex flex-col gap-1',
                      diff.type === 'added'
                        ? 'border-l-4 border-l-emerald-600 bg-success-bg/20'
                        : diff.type === 'changed'
                        ? 'border-l-4 border-l-amber-600 bg-warning-bg/20'
                        : 'border-l-4 border-l-rose-600 bg-error-bg/20'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-text">{diff.item}</span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-surface border border-border">
                        {diff.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-2">{diff.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Changelog History */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text mb-2">
                Release Changelog
              </h4>
              <div className="space-y-3">
                {selectedSnapshot.changelog.map((c) => (
                  <div key={c.version} className="p-3 bg-surface rounded border border-border text-xs">
                    <div className="flex items-center justify-between font-mono font-bold text-text mb-1">
                      <span>{c.version}</span>
                      <span className="text-text-muted font-normal text-[11px]">{c.date}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-text-2 text-[11px]">
                      {c.changes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Rollout Confirmation Modal */}
      <Modal
        isOpen={rolloutModalOpen}
        onClose={() => setRolloutModalOpen(false)}
        title="Roll Out Snapshot Update"
        description="Select target client sub-accounts to update to this snapshot version."
      >
        <div className="space-y-4 text-xs text-text-2 text-left">
          <p>
            Upgrading snapshots will update core funnel pages, forms, and workflow node definitions while preserving individual client custom CSS variables and custom domain bindings.
          </p>

          <div className="p-3 bg-surface rounded border border-border space-y-2">
            <span className="font-bold text-text block">Candidate Sub-Accounts:</span>
            {clients.slice(0, 4).map((c) => (
              <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedClientIds.includes(c.id)}
                  onChange={() =>
                    setSelectedClientIds((prev) =>
                      prev.includes(c.id) ? prev.filter((x) => x !== c.id) : [...prev, c.id]
                    )
                  }
                  className="rounded accent-primary"
                />
                <span className="text-text font-medium">{c.business}</span>
                <span className="text-text-muted">({c.snapshotVersion})</span>
              </label>
            ))}
          </div>

          <Toggle
            checked={runQaToggle}
            onChange={setRunQaToggle}
            label="Run automated QA regression test after rollout"
            description="Verifies all form endpoints, Twilio SMS triggers, and custom CNAME records."
          />

          <div className="pt-3 border-t border-border flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setRolloutModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              loading={isRollingOut}
              onClick={handleRollout}
            >
              Start Rollout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
