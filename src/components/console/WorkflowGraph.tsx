import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, Clock, Filter, Zap, ArrowDown, ShieldAlert } from 'lucide-react';
import { Workflow, WorkflowNode } from '../../data/workflows';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';
import { delay } from '../../lib/delay';
import { useToast } from '../ui/Toast';

export const WorkflowGraph: React.FC<{ workflow: Workflow }> = ({ workflow }) => {
  const { addLead, addActivity, addNotification } = useAppStore();
  const { success, warning } = useToast();

  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [failedNodeIndex, setFailedNodeIndex] = useState<number | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const handleRunTestLead = async () => {
    setIsRunning(true);
    setActiveNodeIndex(null);
    setFailedNodeIndex(null);
    setExecutionLogs([
      `[00:00:00] Ingesting test lead payload: Marcus Tran (Calgary NW)`,
      `[00:00:00] Trigger: Website Quote Form submitted`,
    ]);

    for (let i = 0; i < workflow.nodes.length; i++) {
      const node = workflow.nodes[i];
      setActiveNodeIndex(i);

      if (simulateFailure && i === 2) {
        // Step 2 is the SMS delivery
        await delay(600);
        setFailedNodeIndex(i);
        setIsRunning(false);
        setExecutionLogs((prev) => [
          ...prev,
          `[00:00:01] ERROR: Carrier rejected SMS. Destination phone +1 (403) 555-0142 flagged as landline or unreachable.`,
          `[00:00:01] Alerting on-call dispatcher via fallback email. Automatic retry scheduled in 3 minutes.`,
        ]);
        warning('Workflow Step Failed', 'SMS carrier rejected delivery. Fallback alert triggered.');
        return;
      }

      const nodeDuration = node.type === 'wait' ? 800 : 500;
      await delay(nodeDuration);

      const timestamp = new Date().toLocaleTimeString('en-CA', { hour12: false });
      setExecutionLogs((prev) => [
        ...prev,
        `[${timestamp}] Executed: ${node.title} — status 200 OK`,
      ]);
    }

    setIsRunning(false);
    setActiveNodeIndex(null);

    // Create realistic new lead in pipeline!
    const testLead = {
      id: `lead-test-${Date.now()}`,
      clientId: 'c01',
      name: 'Marcus Tran (Live Test)',
      phone: '+1 (403) 555-0142',
      email: 'marcus.test@example.ca',
      city: 'Calgary NW (Brentwood)',
      service: 'Furnace Repair',
      details: 'Furnace fan blowing cold air. Urgent diagnostic call booked.',
      valueCAD: 450,
      stage: 'New Lead' as const,
      source: 'Website Quote Form' as const,
      createdAt: 'Just now',
      urgent: true,
      tag: 'test-run-verified',
    };

    addLead(testLead);
    success('Lead Created in Pipeline', 'Marcus Tran card dropped into "New Lead" stage with SMS sent.');
  };

  const handleReset = () => {
    setActiveNodeIndex(null);
    setFailedNodeIndex(null);
    setIsRunning(false);
    setExecutionLogs([]);
  };

  const getNodeIcon = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger':
        return <Zap className="w-4 h-4 text-accent" />;
      case 'action':
        return <CheckCircle2 className="w-4 h-4 text-primary" />;
      case 'wait':
        return <Clock className="w-4 h-4 text-secondary" />;
      case 'condition':
        return <Filter className="w-4 h-4 text-amber-700" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left/Center 7 cols: Vertical Node Graph */}
      <div className="lg:col-span-7 bg-elevated border border-border rounded-lg p-5 sm:p-6 shadow-sh-1 text-left flex flex-col">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border mb-6">
          <div>
            <h3 className="text-sm font-semibold text-text">{workflow.name}</h3>
            <p className="text-xs text-text-muted mt-0.5">{workflow.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <Toggle
              checked={simulateFailure}
              onChange={setSimulateFailure}
              label="Break SMS step"
              className="text-xs"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleRunTestLead}
              loading={isRunning}
              icon={<Play className="w-3.5 h-3.5" />}
            >
              Send test lead
            </Button>
            {executionLogs.length > 0 && !isRunning && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Vertical Nodes Container */}
        <div className="flex flex-col items-center">
          {workflow.nodes.map((node, idx) => {
            const isActive = activeNodeIndex === idx;
            const isFailed = failedNodeIndex === idx;
            const isPast = activeNodeIndex !== null && activeNodeIndex > idx && !failedNodeIndex;

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div
                  className={cn(
                    'w-full max-w-md p-4 rounded-md border transition-all duration-med relative',
                    isFailed
                      ? 'bg-error-bg border-error shadow-sh-2 ring-2 ring-error'
                      : isActive
                      ? 'bg-secondary-soft/70 border-primary shadow-sh-2 scale-[1.02] ring-2 ring-primary'
                      : isPast
                      ? 'bg-success-bg/30 border-success/40'
                      : 'bg-surface border-border'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border',
                        isFailed
                          ? 'bg-error text-white border-error'
                          : isActive
                          ? 'bg-primary text-white border-primary animate-pulse'
                          : 'bg-elevated border-border'
                      )}
                    >
                      {isFailed ? <ShieldAlert className="w-4 h-4" /> : getNodeIcon(node.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-text-muted">
                          {node.type}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono font-bold text-primary animate-pulse">
                            EXECUTING...
                          </span>
                        )}
                        {isFailed && (
                          <span className="text-[10px] font-mono font-bold text-error">
                            FAILED (SIMULATED)
                          </span>
                        )}
                        {isPast && (
                          <span className="text-[10px] font-mono font-bold text-success">
                            PASS ✓
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-text mt-0.5">{node.title}</div>
                      <div className="text-[11px] text-text-2 mt-0.5">{node.subtitle}</div>
                    </div>
                  </div>
                </div>

                {/* Connecting Arrow Line */}
                {idx < workflow.nodes.length - 1 && (
                  <div className="h-6 w-0.5 bg-border-strong relative my-1 flex items-center justify-center">
                    <ArrowDown className="w-3 h-3 text-border-strong absolute -bottom-1" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Right 5 cols: Real-Time Execution Run Log */}
      <div className="lg:col-span-5 bg-[#16221F] text-[#F6F3EE] rounded-lg border border-border/40 p-4 font-mono text-xs text-left h-full min-h-[460px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-white/70">
            <span className="text-xs uppercase font-bold tracking-wider">Workflow Run Stream</span>
            <span className="text-[10px] text-emerald-400">
              {isRunning ? '● ACTIVE RUN' : 'READY'}
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto">
            {executionLogs.length === 0 ? (
              <div className="text-white/40 text-xs py-8 text-center">
                Click &ldquo;Send test lead&rdquo; to simulate a live customer submission through this node graph.
              </div>
            ) : (
              executionLogs.map((log, i) => (
                <div
                  key={i}
                  className={cn(
                    'leading-relaxed text-[11px]',
                    log.includes('ERROR') ? 'text-rose-400 font-semibold' : 'text-emerald-300'
                  )}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-[10px] text-white/50 flex items-center justify-between">
          <span>Target sub-account: Ridgeline (c01)</span>
          <span>Lead &rarr; Pipeline CRM</span>
        </div>
      </div>
    </div>
  );
};
