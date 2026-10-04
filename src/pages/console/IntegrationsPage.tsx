import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { WebhookInspector } from '../../components/console/WebhookInspector';
import { Integration } from '../../data/webhooks';
import { Drawer } from '../../components/ui/Drawer';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { delay } from '../../lib/delay';
import {
  Network,
  Calendar,
  CreditCard,
  MessageSquare,
  FileSpreadsheet,
  Zap,
  Star,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const { integrations } = useAppStore();
  const { success } = useToast();

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleConfigure = (int: Integration) => {
    setSelectedIntegration(int);
    setDrawerOpen(true);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    await delay(1100);
    setIsTesting(false);
    success(
      'Connection Verified',
      `Health check passed for ${selectedIntegration?.name}. Bi-directional API sync active.`
    );
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-display font-medium text-text">
            Integrations &amp; Webhook Hub
          </h1>
          <p className="text-xs text-text-2 mt-0.5">
            Connect third-party tools, inspect incoming payloads, and test failure recovery.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All Gateways Connected</span>
        </div>
      </div>

      {/* Third-Party Integrations Card Grid */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text mb-3">
          Configured Third-Party Integrations ({integrations.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((int) => (
            <div
              key={int.id}
              className="bg-elevated border border-border rounded-lg p-5 shadow-sh-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-md bg-secondary-soft text-primary font-bold text-xs flex items-center justify-center font-mono">
                      {int.monogram}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-text">{int.name}</div>
                      <div className="text-[10px] text-text-muted">{int.category}</div>
                    </div>
                  </div>
                  <StatusPill status={int.status} />
                </div>

                <p className="text-xs text-text-2 leading-relaxed mb-4">
                  {int.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-text-muted">
                  Last sync: {int.lastSync}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleConfigure(int)}
                  className="text-xs font-semibold text-primary"
                >
                  Configure →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook Inspector */}
      <WebhookInspector />

      {/* Integration Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedIntegration ? selectedIntegration.name : 'Integration'}
        description="Field mapping schema and connection health diagnostics."
        width="md"
      >
        {selectedIntegration && (
          <div className="space-y-6 text-left">
            <div className="p-3.5 bg-surface rounded-md border border-border flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-text block">Connection Status</span>
                <span className="text-[11px] text-text-muted">API Token Valid · {selectedIntegration.lastSync}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleTestConnection}
                loading={isTesting}
                icon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Test Connection
              </Button>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text mb-2">
                Field Mapping Table (GHL &rarr; Destination)
              </h4>
              <div className="space-y-2">
                {selectedIntegration.mappedFields.map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-surface rounded border border-border text-xs flex items-center justify-between font-mono"
                  >
                    <span className="text-text">{f.ghlField}</span>
                    <span className="text-text-muted">&rarr;</span>
                    <span className="text-primary font-semibold">{f.destinationField}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-secondary-soft/50 rounded-md border border-primary/20 text-xs text-text-2">
              <span className="font-bold text-primary block mb-1">Fail-Safe Retry Policy</span>
              Automatic 1m, 5m, 15m exponential backoff enabled with error notification push.
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
