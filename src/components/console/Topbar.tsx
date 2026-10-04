import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Menu,
  ChevronRight,
  Sparkles,
  User,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { brand } from '../../config/brand';
import { cn } from '../../lib/utils';
import { useToast } from '../ui/Toast';

export const Topbar: React.FC<{ onMobileMenuToggle?: () => void }> = ({
  onMobileMenuToggle,
}) => {
  const {
    setCommandPaletteOpen,
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    resetDemoData,
  } = useAppStore();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { info } = useToast();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Format breadcrumbs from pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbMap: Record<string, string> = {
    console: 'Console',
    clients: 'Clients',
    deploy: 'Deploy Wizard',
    snapshots: 'Snapshots',
    workflows: 'Workflows & CRM',
    integrations: 'Integrations & Webhooks',
    maintenance: 'Maintenance Queue',
    growth: 'Capacity & Growth',
  };

  const handleResetDemo = () => {
    resetDemoData();
    setUserMenuOpen(false);
    info('Demo reset', 'All sample clients, leads, and webhooks restored to initial state.');
  };

  return (
    <header className="h-14 border-b border-border bg-elevated/80 backdrop-blur-sm px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3 text-left">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 rounded text-text hover:bg-secondary-soft/50 cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          <Link to="/console" className="text-text-muted hover:text-text font-medium">
            Console
          </Link>
          {pathParts.length > 1 && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="font-semibold text-text">
                {breadcrumbMap[pathParts[1]] || pathParts[1]}
              </span>
            </>
          )}
          {pathParts.length > 2 && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="font-mono text-text-2">{pathParts[2]}</span>
            </>
          )}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Command Palette Trigger Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border bg-surface text-text-muted hover:text-text hover:border-border-strong text-xs transition-colors cursor-pointer select-none"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quick search...</span>
          <kbd className="hidden sm:inline font-mono text-[10px] bg-bg px-1 py-0.2 rounded border border-border">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-sm text-text-muted hover:text-text hover:bg-secondary-soft/50 relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-elevated border border-border shadow-sh-3 rounded-lg overflow-hidden z-50 text-left">
              <div className="flex items-center justify-between p-3 border-b border-border bg-surface">
                <span className="text-xs font-semibold uppercase tracking-wider text-text">
                  Notifications ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-primary hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-border/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-text-muted">
                    No new notifications.
                  </div>
                ) : (
                  notifications.slice(0, 6).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={cn(
                        'p-3 hover:bg-surface/50 transition-colors cursor-pointer text-xs flex items-start gap-2.5',
                        !notif.read && 'bg-secondary-soft/20 font-medium'
                      )}
                    >
                      <span className="mt-0.5">
                        {notif.type === 'lead' ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                        ) : notif.type === 'warning' ? (
                          <span className="w-2 h-2 rounded-full bg-amber-500 block" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-primary block" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-text truncate">{notif.title}</span>
                          <span className="text-[10px] text-text-muted font-mono">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-text-2 mt-0.5 leading-snug">{notif.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu with Reset Demo Action */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-sm border border-border hover:bg-surface transition-colors cursor-pointer text-xs"
          >
            <span className="w-5 h-5 rounded-full bg-primary text-surface font-semibold text-[10px] flex items-center justify-center">
              DW
            </span>
            <span className="hidden sm:inline font-medium text-text">{brand.agencyOwner}</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-elevated border border-border shadow-sh-3 rounded-lg overflow-hidden z-50 text-left p-1 text-xs">
              <div className="p-2.5 border-b border-border">
                <div className="font-semibold text-text">{brand.agencyOwner}</div>
                <div className="text-[11px] text-text-muted">{brand.agencyName}</div>
                <div className="text-[10px] text-primary mt-1 font-mono">Role: Agency Owner (Demo)</div>
              </div>

              <div className="py-1">
                <button
                  onClick={handleResetDemo}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-rose-700 hover:bg-rose-50 rounded-sm cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
