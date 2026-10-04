import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  GitBranch,
  Workflow,
  Network,
  Wrench,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import { brand } from '../../config/brand';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}> = ({ isOpen = true, onClose, className }) => {
  const { clients, requests } = useAppStore();

  const needingAttentionCount = clients.filter(
    (c) => c.status === 'Needs attention' || c.snapshotOutdated
  ).length;

  const pendingRequestsCount = requests.filter(
    (r) => r.stage === 'Requested' || r.stage === 'In progress'
  ).length;

  const navGroups = [
    {
      group: 'Operate',
      items: [
        { label: 'Overview', to: '/console', icon: <LayoutDashboard className="w-4 h-4" /> },
        {
          label: 'Client Sites',
          to: '/console/clients',
          icon: <Users className="w-4 h-4" />,
          badge: needingAttentionCount > 0 ? needingAttentionCount : undefined,
          badgeColor: 'bg-warning-bg text-warning',
        },
        { label: 'Deploy Client', to: '/console/deploy', icon: <PlusCircle className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Build',
      items: [
        { label: 'Snapshots', to: '/console/snapshots', icon: <GitBranch className="w-4 h-4" /> },
        { label: 'Workflows & Pipeline', to: '/console/workflows', icon: <Workflow className="w-4 h-4" /> },
        { label: 'Integrations & Webhooks', to: '/console/integrations', icon: <Network className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Care',
      items: [
        {
          label: 'Maintenance Queue',
          to: '/console/maintenance',
          icon: <Wrench className="w-4 h-4" />,
          badge: pendingRequestsCount,
          badgeColor: 'bg-secondary-soft text-primary',
        },
        { label: 'Growth & Capacity', to: '/console/growth', icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'w-64 bg-surface border-r border-border h-screen flex flex-col justify-between select-none z-30',
        className
      )}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Top Header / Brand */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center text-surface font-display font-medium text-sm">
              N
            </span>
            <div className="flex flex-col text-left">
              <span className="font-display font-medium text-base tracking-tight text-primary leading-tight">
                {brand.name}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted">
                Partner Console
              </span>
            </div>
          </Link>

          <Link
            to="/"
            title="Return to Public Studio Site"
            className="text-text-muted hover:text-text p-1 rounded hover:bg-secondary-soft/50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 flex flex-col gap-5 text-left">
          {navGroups.map((grp) => (
            <div key={grp.group} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-text-muted px-2.5 mb-1">
                {grp.group}
              </span>
              {grp.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/console'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-2.5 py-2 rounded-sm text-xs font-medium transition-colors relative',
                      isActive
                        ? 'bg-secondary-soft text-primary font-semibold'
                        : 'text-text-2 hover:bg-secondary-soft/40 hover:text-text'
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        'text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold',
                        item.badgeColor
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Agency Switcher & Footer User Chip */}
      <div className="p-3 border-t border-border bg-surface">
        <div className="p-2 rounded-md bg-elevated border border-border shadow-sh-1 flex items-center justify-between text-left">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-sm bg-secondary-soft flex items-center justify-center text-primary font-bold text-[10px] shrink-0">
              P&P
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-text truncate">
                {brand.agencyName}
              </span>
              <span className="text-[10px] text-text-muted truncate">
                Signed in as {brand.agencyOwner}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
