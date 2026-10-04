import React, { useState } from 'react';
import { WebhookLog, Integration } from '../../data/webhooks';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { useToast } from '../ui/Toast';
import { cn } from '../../lib/utils';
import {
  Send,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { delay } from '../../lib/delay';

export const WebhookInspector: React.FC = () => {
  const {
    webhookLogs,
    addWebhookLog,
    simulateWebhookFailure,
    replayWebhookLog,
  } = useAppStore();
  const { success, warning, info } = useToast();

  const [selectedLogId, setSelectedLogId] = useState<string>(
    webhookLogs[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<'request' | 'response' | 'retries'>('request');
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const selectedLog =
    webhookLogs.find((l) => l.id === selectedLogId) || webhookLogs[0];

  const handleCopyJSON = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    info('Copied', 'JSON payload copied to clipboard.');
  };

  const handleSendTestPayload = async () => {
    setIsSending(true);
    await delay(600);
    const newLog: WebhookLog = {
      id: `wh-${Date.now()}`,
      clientId: 'c01',
      clientName: 'Ridgeline Plumbing',
      timestamp: 'Just now',
      method: 'POST',
      endpoint: 'https://hooks.prairiepine.example/ghl/form-submitted',
      status: 200,
      durationMs: 128,
      event: 'quote.form_submitted',
      payload: {
        contact_id: `ghl_cnt_${Math.floor(10000 + Math.random() * 90000)}`,
        first_name: 'Test',
        last_name: 'Customer',
        phone: '+14035550199',
        source: 'inspector-test-runner',
        casl_consent: true,
        created_at: new Date().toISOString(),
      },
      response: {
        success: true,
        opportunity_created: true,
        pipeline_stage: 'New Lead',
        dispatched_sms: true,
      },
    };

    addWebhookLog(newLog);
    setSelectedLogId(newLog.id);
    setIsSending(false);
    success('Webhook 200 OK', 'Test payload successfully received and processed by GHL endpoint.');
  };

  const handleSimulateFailure = () => {
    simulateWebhookFailure('Prairie Sky Roofing');
    setSelectedLogId(webhookLogs[0]?.id || '');
    warning(
      'Simulated 500 Outage',
      'Webhook failed with HTTP 500. Automatic backoff retries scheduled (1m, 5m, 15m).'
    );
  };

  const handleReplay = (id: string) => {
    replayWebhookLog(id);
    success('Webhook Replayed', 'Endpoint re-triggered manually and responded with 200 OK.');
  };

  return (
    <div className="bg-elevated border border-border rounded-lg overflow-hidden shadow-sh-1 flex flex-col text-left">
      {/* Top Header / Actions Bar */}
      <div className="p-4 sm:p-5 border-b border-border bg-surface flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-text">Webhook Inspector & API Logs</h3>
          <p className="text-xs text-text-muted mt-0.5">
            Real-time payload inspection, failure diagnosis, and retry scheduling.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSimulateFailure}
            icon={<AlertTriangle className="w-3.5 h-3.5 text-warning" />}
            className="text-xs"
          >
            Simulate failure (500)
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSendTestPayload}
            loading={isSending}
            icon={<Send className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Send test payload
          </Button>
        </div>
      </div>

      {/* Two Column Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border min-h-[460px]">
        {/* Left Column: Webhook Log Stream List (5 cols) */}
        <div className="lg:col-span-5 overflow-y-auto max-h-[520px] p-2 flex flex-col gap-1">
          {webhookLogs.map((log) => {
            const isSelected = log.id === selectedLog?.id;
            const is200 = log.status >= 200 && log.status < 300;

            return (
              <button
                key={log.id}
                onClick={() => setSelectedLogId(log.id)}
                className={cn(
                  'w-full p-3 rounded-md border text-left transition-all duration-fast cursor-pointer select-none flex flex-col gap-1',
                  isSelected
                    ? 'bg-secondary-soft/50 border-primary shadow-sh-1'
                    : 'bg-surface/50 border-border hover:bg-surface hover:border-border-strong'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded',
                        is200 ? 'bg-success-bg text-success' : 'bg-error-bg text-error'
                      )}
                    >
                      {log.status} {log.method}
                    </span>
                    <span className="text-xs font-semibold text-text truncate max-w-[150px]">
                      {log.clientName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">{log.timestamp}</span>
                </div>

                <div className="text-[11px] font-mono text-text-2 truncate">{log.endpoint}</div>

                <div className="flex items-center justify-between text-[10px] text-text-muted pt-1 border-t border-border/40">
                  <span>Event: {log.event}</span>
                  <span className="font-mono">{log.durationMs}ms</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Payload & Response Detail Pane (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-bg/40 p-4 sm:p-5">
          {selectedLog ? (
            <div>
              {/* Detail Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-xs font-mono font-bold px-2 py-0.5 rounded',
                      selectedLog.status === 200
                        ? 'bg-success-bg text-success'
                        : 'bg-error-bg text-error'
                    )}
                  >
                    HTTP {selectedLog.status}
                  </span>
                  <span className="text-xs font-semibold text-text">{selectedLog.event}</span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedLog.status !== 200 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleReplay(selectedLog.id)}
                      icon={<RotateCcw className="w-3.5 h-3.5" />}
                      className="text-xs bg-white"
                    >
                      Replay Request
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleCopyJSON(
                        activeTab === 'request'
                          ? selectedLog.payload
                          : selectedLog.response
                      )
                    }
                    icon={
                      copied ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                    className="text-xs"
                  >
                    {copied ? 'Copied' : 'Copy JSON'}
                  </Button>
                </div>
              </div>

              {/* Sub-tabs: Request / Response / Retries */}
              <div className="flex gap-2 mb-3">
                {[
                  { id: 'request', label: 'Request Payload' },
                  { id: 'response', label: 'Server Response' },
                  {
                    id: 'retries',
                    label: `Retries (${selectedLog.retries?.length || 0})`,
                  },
                ].map((tb) => (
                  <button
                    key={tb.id}
                    onClick={() => setActiveTab(tb.id as any)}
                    className={cn(
                      'px-3 py-1.5 rounded-sm text-xs font-medium transition-colors cursor-pointer',
                      activeTab === tb.id
                        ? 'bg-primary text-white font-semibold'
                        : 'bg-surface text-text-2 hover:bg-secondary-soft/50'
                    )}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* Payload Body Box */}
              {activeTab === 'request' && (
                <div className="bg-[#16221F] text-emerald-300 p-4 rounded-md font-mono text-xs overflow-x-auto max-h-80 text-left">
                  <pre>{JSON.stringify(selectedLog.payload, null, 2)}</pre>
                </div>
              )}

              {activeTab === 'response' && (
                <div
                  className={cn(
                    'p-4 rounded-md font-mono text-xs overflow-x-auto max-h-80 text-left',
                    selectedLog.status === 200
                      ? 'bg-[#16221F] text-emerald-300'
                      : 'bg-[#2A1616] text-rose-300'
                  )}
                >
                  <pre>{JSON.stringify(selectedLog.response, null, 2)}</pre>
                </div>
              )}

              {activeTab === 'retries' && (
                <div className="p-4 bg-elevated rounded-md border border-border flex flex-col gap-3">
                  <div className="text-xs font-semibold text-text">
                    Exponential Backoff Retry Schedule
                  </div>
                  {selectedLog.retries && selectedLog.retries.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {selectedLog.retries.map((r) => (
                        <div
                          key={r.attempt}
                          className="flex items-center justify-between p-2.5 rounded bg-surface border border-border text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-secondary-soft flex items-center justify-center font-mono font-bold text-[10px]">
                              {r.attempt}
                            </span>
                            <span className="font-mono text-text">{r.scheduledAt}</span>
                          </div>
                          <span
                            className={cn(
                              'text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold',
                              r.status === 'completed'
                                ? 'bg-success-bg text-success'
                                : r.status === 'failed'
                                ? 'bg-error-bg text-error'
                                : 'bg-warning-bg text-warning'
                            )}
                          >
                            {r.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-text-muted">
                      No retry attempts needed. Request succeeded on initial dispatch.
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-text-muted text-center py-12">
              Select a webhook event from the stream to view its JSON payload.
            </div>
          )}

          {/* Endpoint Reference Footer */}
          {selectedLog && (
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-text-muted font-mono">
              <span className="truncate max-w-sm">{selectedLog.endpoint}</span>
              <span>ID: {selectedLog.id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
