import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from '../ui/CommandPalette';
import { GuidedTour } from '../marketing/GuidedTour';

export const ConsoleShell: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-text">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Off-Canvas Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#16221F]/45"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-surface shadow-sh-3">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar onMobileMenuToggle={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>

          {/* Quiet disclaimer per PRD §3 */}
          <footer className="mt-12 pt-6 border-t border-border/60 text-center text-[11px] text-text-muted select-none">
            Interactive demo · sample agency operations data · No real GoHighLevel connection
          </footer>
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Persistent Guided Tour Pill */}
      <GuidedTour />
    </div>
  );
};
