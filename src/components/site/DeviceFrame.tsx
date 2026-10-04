import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ArrowLeft, ShieldCheck, Gauge } from 'lucide-react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';

export const DeviceFrame: React.FC<{
  children: React.ReactNode;
  siteName?: string;
  siteDomain?: string;
}> = ({
  children,
  siteName = 'Ridgeline Plumbing & Heating',
  siteDomain = 'ridgelineplumbing.ca',
}) => {
  const { previewDevice, setPreviewDevice } = useAppStore();

  const frameWidths = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] mx-auto shadow-sh-3 rounded-lg overflow-hidden border border-border my-6',
    phone: 'w-[390px] mx-auto shadow-sh-3 rounded-[32px] overflow-hidden border-[8px] border-[#242A2E] my-6',
  };

  return (
    <div className="min-h-screen bg-[#EBE7DF] flex flex-col">
      {/* Top Device Viewer Control Bar */}
      <div className="h-12 bg-elevated border-b border-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 select-none">
        {/* Left: Back Link & Site Label */}
        <div className="flex items-center gap-3">
          <Link
            to="/console"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Console</span>
          </Link>
          <span className="text-border-strong hidden sm:inline">|</span>
          <span className="text-xs font-mono text-text-muted truncate max-w-[200px]">
            {siteDomain}
          </span>
        </div>

        {/* Center: Device Toggle Buttons */}
        <div className="flex items-center bg-surface border border-border rounded-md p-0.5">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={cn(
              'px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
              previewDevice === 'desktop'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text'
            )}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>

          <button
            onClick={() => setPreviewDevice('tablet')}
            className={cn(
              'px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
              previewDevice === 'tablet'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text'
            )}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>

          <button
            onClick={() => setPreviewDevice('phone')}
            className={cn(
              'px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
              previewDevice === 'phone'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text'
            )}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Performance Chips (PRD §14.10) */}
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-1 text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            <Gauge className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mobile 97 · Desktop 99</span>
          </div>
        </div>
      </div>

      {/* Viewport Frame Container */}
      <div className="flex-1 transition-all duration-med ease-out overflow-y-auto">
        <div className={cn('transition-all duration-med', frameWidths[previewDevice])}>
          {children}
        </div>
      </div>
    </div>
  );
};
