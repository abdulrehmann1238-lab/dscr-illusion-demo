import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building, ArrowRight, PlusCircle, Play, FileText, CheckCircle2, X } from 'lucide-react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, clients } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const staticActions = [
    {
      id: 'act-deploy',
      category: 'Actions',
      title: 'Deploy new client from snapshot',
      subtitle: 'Run 6-step provisioning wizard',
      icon: <PlusCircle className="w-4 h-4 text-primary" />,
      action: () => navigate('/console/deploy'),
    },
    {
      id: 'act-lead',
      category: 'Actions',
      title: 'Send test lead simulation',
      subtitle: 'Trigger workflow nodes & pipeline card',
      icon: <Play className="w-4 h-4 text-accent" />,
      action: () => navigate('/console/workflows?trigger=test'),
    },
    {
      id: 'act-req',
      category: 'Actions',
      title: 'Submit new maintenance request',
      subtitle: 'Add change ticket to queue',
      icon: <FileText className="w-4 h-4 text-secondary" />,
      action: () => navigate('/console/maintenance?new=true'),
    },
    {
      id: 'nav-overview',
      category: 'Pages',
      title: 'Console: Overview & Pulse',
      subtitle: 'KPIs, needs attention, lead volume chart',
      icon: <ArrowRight className="w-4 h-4 text-text-muted" />,
      action: () => navigate('/console'),
    },
    {
      id: 'nav-clients',
      category: 'Pages',
      title: 'Console: All Clients (30-50 Sites)',
      subtitle: 'Status, snapshots, uptime, MRR',
      icon: <ArrowRight className="w-4 h-4 text-text-muted" />,
      action: () => navigate('/console/clients'),
    },
    {
      id: 'nav-workflows',
      category: 'Pages',
      title: 'Console: Workflows & CRM Pipeline',
      subtitle: 'Node graph builder & draggable deal stages',
      icon: <ArrowRight className="w-4 h-4 text-text-muted" />,
      action: () => navigate('/console/workflows'),
    },
    {
      id: 'nav-integrations',
      category: 'Pages',
      title: 'Console: Integrations & Webhook Inspector',
      subtitle: 'Payload logs, failure simulation & backoff retries',
      icon: <ArrowRight className="w-4 h-4 text-text-muted" />,
      action: () => navigate('/console/integrations'),
    },
    {
      id: 'nav-maintenance',
      category: 'Pages',
      title: 'Console: Maintenance Queue',
      subtitle: 'Kanban board, before/after slider & QA sign-off',
      icon: <ArrowRight className="w-4 h-4 text-text-muted" />,
      action: () => navigate('/console/maintenance'),
    },
    {
      id: 'nav-growth',
      category: 'Pages',
      title: 'Console: Capacity & Recurring Growth Model',
      subtitle: 'Scale to 30-50 clients with predictable maintenance load',
      icon: <ArrowRight className="w-4 h-4 text-text-muted" />,
      action: () => navigate('/console/growth'),
    },
    {
      id: 'nav-sample-site',
      category: 'Sample Sites',
      title: 'Ridgeline Plumbing & Heating (Live Demo)',
      subtitle: 'Conversion-focused site with responsive device toggle',
      icon: <CheckCircle2 className="w-4 h-4 text-success" />,
      action: () => navigate('/demo/site/ridgeline-plumbing'),
    },
  ];

  const clientResults = clients.map((c) => ({
    id: `client-${c.id}`,
    category: 'Clients',
    title: c.business,
    subtitle: `${c.city}, ${c.province} · ${c.industry} · ${c.snapshot} ${c.snapshotVersion}`,
    icon: <Building className="w-4 h-4 text-secondary" />,
    action: () => navigate(`/console/clients/${c.id}`),
  }));

  const allItems = [...staticActions, ...clientResults];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (index: number) => {
    const item = filtered[index];
    if (item) {
      setCommandPaletteOpen(false);
      item.action();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-modal flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-[#16221F]/45"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-elevated border border-border shadow-sh-3 rounded-lg overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface/50">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search clients, workflows, requests or actions..."
                className="w-full bg-transparent text-sm text-text placeholder:text-text-muted/60 outline-none"
              />
              <span className="text-[11px] font-mono text-text-muted px-1.5 py-0.5 rounded border border-border-strong bg-bg shrink-0">
                ESC
              </span>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-0.5">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-text-muted">
                  No match found. Try a Canadian business name, snapshot, or &ldquo;deploy&rdquo;.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'w-full flex items-center justify-between p-2.5 rounded-sm text-left transition-colors cursor-pointer select-none',
                        isSelected ? 'bg-secondary-soft/70 text-text' : 'hover:bg-surface text-text-2'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-sm bg-bg border border-border flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-text truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-text-muted truncate">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted ml-3 shrink-0">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface text-[11px] text-text-muted">
              <span>Navigate with <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd></span>
              <span>Press <kbd className="font-mono">ENTER</kbd> to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
