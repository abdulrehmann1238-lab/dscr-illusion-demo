import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { StatusPill } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import {
  Search,
  PlusCircle,
  LayoutGrid,
  List,
  Filter,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { formatCAD } from '../../lib/format';
import { cn } from '../../lib/utils';

export const ClientsPage: React.FC = () => {
  const { clients, rolloutSnapshotToClients } = useAppStore();
  const navigate = useNavigate();
  const { success } = useToast();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        c.business.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.domain.toLowerCase().includes(search.toLowerCase());
      const matchStatus = selectedStatus === 'All' || c.status === selectedStatus;
      const matchIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
      return matchSearch && matchStatus && matchIndustry;
    });
  }, [clients, search, selectedStatus, selectedIndustry]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredClients.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkUpgrade = () => {
    rolloutSnapshotToClients('snap-01', selectedIds);
    setUpgradeModalOpen(false);
    setSelectedIds([]);
    success('Snapshot Upgraded', `Successfully updated ${selectedIds.length} sub-accounts to Home Services v4.2.`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-display font-medium text-text">
            Client Sub-Accounts ({clients.length})
          </h1>
          <p className="text-xs text-text-2 mt-0.5">
            Manage your agency&apos;s active local-business websites, snapshots, and uptime health.
          </p>
        </div>

        <Link to="/console/deploy">
          <Button variant="primary" size="md" icon={<PlusCircle className="w-4 h-4" />}>
            Deploy new client
          </Button>
        </Link>
      </div>

      {/* Filter and View Toggle Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-elevated border border-border rounded-lg shadow-sh-1">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search business, city, or domain..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-sm outline-none focus:border-primary"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-surface border border-border rounded-sm px-2.5 py-1.5 text-text outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Live">Live</option>
            <option value="Needs attention">Needs Attention</option>
            <option value="Domain pending">Domain Pending</option>
            <option value="Onboarding">Onboarding</option>
          </select>

          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="text-xs bg-surface border border-border rounded-sm px-2.5 py-1.5 text-text outline-none cursor-pointer"
          >
            <option value="All">All Industries</option>
            <option value="Trades">Trades</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Real estate">Real Estate</option>
            <option value="Salon">Salon</option>
            <option value="Legal">Legal</option>
            <option value="Fitness">Fitness</option>
            <option value="Auto">Auto</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Services">Services</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-border rounded-sm p-0.5 bg-surface">
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              'p-1.5 rounded-sm text-text-muted hover:text-text cursor-pointer',
              viewMode === 'table' && 'bg-elevated text-primary shadow-sm'
            )}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-1.5 rounded-sm text-text-muted hover:text-text cursor-pointer',
              viewMode === 'grid' && 'bg-elevated text-primary shadow-sm'
            )}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Action Bar (when rows are selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-secondary-soft border border-primary/40 rounded-lg flex items-center justify-between shadow-sh-1 text-xs animate-fade-in">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <span>{selectedIds.length} sub-accounts selected</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setUpgradeModalOpen(true)}
              icon={<GitBranch className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Batch Upgrade Snapshot
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds([])}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-elevated border border-border rounded-lg overflow-hidden shadow-sh-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface border-b border-border text-text-muted font-mono text-[11px]">
                <tr>
                  <th className="p-3 w-8">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === filteredClients.length &&
                        filteredClients.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded accent-primary cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-2 font-medium">Business & Location</th>
                  <th className="py-3 px-2 font-medium">Industry</th>
                  <th className="py-3 px-2 font-medium">Snapshot & Version</th>
                  <th className="py-3 px-2 font-medium">Status</th>
                  <th className="py-3 px-2 font-medium">Leads (30d)</th>
                  <th className="py-3 px-2 font-medium">Uptime</th>
                  <th className="py-3 px-2 font-medium">Client Plan</th>
                  <th className="py-3 px-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredClients.map((client) => {
                  const isSelected = selectedIds.includes(client.id);

                  return (
                    <tr
                      key={client.id}
                      className={cn(
                        'hover:bg-surface/50 transition-colors',
                        isSelected && 'bg-secondary-soft/20'
                      )}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(client.id)}
                          className="rounded accent-primary cursor-pointer"
                        />
                      </td>

                      <td
                        className="py-3 px-2 cursor-pointer font-medium text-text"
                        onClick={() => navigate(`/console/clients/${client.id}`)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-sm flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                            style={{ backgroundColor: client.brandColor || '#24453F' }}
                          >
                            {client.business.slice(0, 2).toUpperCase()}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-text hover:underline">
                              {client.business}
                            </span>
                            <span className="text-[11px] text-text-muted">
                              {client.city}, {client.province} · {client.domain}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-2 text-text-2">{client.industry}</td>

                      <td className="py-3 px-2 font-mono">
                        <span className="text-text font-medium">{client.snapshot}</span>{' '}
                        <span className="text-text-muted">{client.snapshotVersion}</span>
                        {client.snapshotOutdated && (
                          <span className="ml-1 text-[10px] text-amber-700 bg-amber-100 px-1 py-0.2 rounded font-bold">
                            Outdated
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-2">
                        <StatusPill status={client.status} />
                      </td>

                      <td className="py-3 px-2 font-mono font-semibold text-text">
                        {client.leads30d}
                      </td>

                      <td className="py-3 px-2 font-mono text-text-2">{client.uptime}</td>

                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded bg-surface border border-border text-[11px] font-mono">
                          {client.plan} (${client.mrrCAD}/mo)
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {client.hasPreview && (
                            <Link
                              to="/demo/site/ridgeline-plumbing"
                              className="text-accent hover:underline text-[11px] font-semibold"
                            >
                              Live Site →
                            </Link>
                          )}
                          <Link
                            to={`/console/clients/${client.id}`}
                            className="text-primary hover:underline font-semibold text-xs"
                          >
                            Manage
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1 hover:shadow-sh-2 hover:border-border-strong transition-all flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-sm flex items-center justify-center text-white font-bold text-[9px]"
                      style={{ backgroundColor: client.brandColor || '#24453F' }}
                    >
                      {client.business.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-text truncate max-w-[140px]">
                      {client.business}
                    </span>
                  </div>
                  <StatusPill status={client.status} />
                </div>

                <div className="text-xs text-text-muted mb-2">
                  {client.city}, {client.province} · {client.industry}
                </div>

                <div className="p-2.5 bg-surface rounded border border-border text-xs font-mono space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Snapshot:</span>
                    <span className="text-text">
                      {client.snapshot} {client.snapshotVersion}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">30d Leads:</span>
                    <span className="font-bold text-primary">{client.leads30d} routed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Domain:</span>
                    <span className="text-text-2 truncate max-w-[130px]">{client.domain}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                <span className="font-mono text-text-muted">
                  Client MRR: {formatCAD(client.mrrCAD)}
                </span>
                <Link
                  to={`/console/clients/${client.id}`}
                  className="font-semibold text-primary hover:underline"
                >
                  Manage →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Upgrade Confirmation Modal */}
      <Modal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Roll Out Snapshot Upgrade"
        description={`Apply Home Services v4.2 to ${selectedIds.length} selected client sub-accounts.`}
      >
        <div className="space-y-4 text-xs text-text-2 text-left">
          <div className="p-3 rounded bg-secondary-soft/50 border border-primary/30">
            <span className="font-bold text-primary block mb-1">
              Included in Home Services v4.2 Release:
            </span>
            <ul className="list-disc pl-4 space-y-1">
              <li>CASL / PIPEDA Explicit Consent Checkbox on all quote forms</li>
              <li>Mobile tap-to-call floating bar with CSS variables</li>
              <li>Updated Twilio instant SMS dispatch sequence</li>
            </ul>
          </div>

          <p>
            An automated 12-point regression test will be executed on each site to verify that all form endpoints, pipeline mappings, and custom domains remain intact.
          </p>

          <div className="pt-3 border-t border-border flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setUpgradeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleBulkUpgrade}>
              Confirm Upgrade ({selectedIds.length} sites)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
