import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { WorkflowGraph } from '../../components/console/WorkflowGraph';
import { PipelineBoard } from '../../components/console/PipelineBoard';
import { Tabs } from '../../components/ui/Tabs';
import { Toggle } from '../../components/ui/Toggle';
import { Button } from '../../components/ui/Button';
import { Zap, Workflow as WorkflowIcon, Layers, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

export const WorkflowsPage: React.FC = () => {
  const { clients, workflows } = useAppStore();

  const [selectedClientId, setSelectedClientId] = useState('c01');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('wf-01');
  const [activeTab, setActiveTab] = useState<'workflows' | 'pipeline'>('workflows');

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];
  const clientWorkflows = workflows.filter((w) => w.clientId === selectedClientId);
  const activeWorkflow =
    workflows.find((w) => w.id === selectedWorkflowId) || clientWorkflows[0] || workflows[0];

  const mainTabs = [
    { id: 'workflows', label: 'Workflows & Node Graphs', count: clientWorkflows.length },
    { id: 'pipeline', label: 'Opportunity Pipeline Board' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Client Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-display font-medium text-text">
            Automations, Workflows &amp; CRM
          </h1>
          <p className="text-xs text-text-2 mt-0.5">
            Visualize triggers, test lead payloads, and inspect CRM deal allocations in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-text-muted">Target Client:</span>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="text-xs bg-elevated border border-border rounded px-3 py-1.5 font-semibold text-text outline-none cursor-pointer"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.business} ({c.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Primary Tab Switcher */}
      <Tabs tabs={mainTabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />

      {/* Tab 1: Workflows & Node Graph */}
      {activeTab === 'workflows' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (4 cols): Workflows List */}
          <div className="lg:col-span-4 bg-elevated border border-border rounded-lg p-4 shadow-sh-1 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-border mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              <span>Active Workflows</span>
              <span>Success Rate</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {clientWorkflows.map((wf) => {
                const isSelected = wf.id === activeWorkflow.id;

                return (
                  <button
                    key={wf.id}
                    onClick={() => setSelectedWorkflowId(wf.id)}
                    className={cn(
                      'w-full p-3 rounded-md border text-left transition-all duration-fast cursor-pointer select-none flex flex-col gap-1',
                      isSelected
                        ? 'bg-secondary-soft/50 border-primary shadow-sh-1 ring-1 ring-primary'
                        : 'bg-surface/50 border-border hover:bg-surface hover:border-border-strong'
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-text truncate">
                        {wf.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {wf.successRate}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border/40">
                      <span>{wf.nodes.length} Nodes configured</span>
                      <span>{wf.runs30d} runs (30d)</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (8 cols): Interactive Node Graph & Run Stream */}
          <div className="lg:col-span-8">
            <WorkflowGraph workflow={activeWorkflow} />
          </div>
        </div>
      )}

      {/* Tab 2: CRM Pipeline Board */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-elevated border border-border rounded-lg text-xs text-text-2">
            <span>
              Showing live deal cards for <strong className="text-text">{selectedClient.business}</strong>. Drag cards between stages or use the card menu.
            </span>
            <span className="font-mono text-emerald-700 font-bold">
              CRM Sync Active
            </span>
          </div>

          <PipelineBoard />
        </div>
      )}
    </div>
  );
};
