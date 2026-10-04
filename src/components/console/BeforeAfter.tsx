import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronsLeftRight } from 'lucide-react';

export interface BeforeAfterProps {
  beforeTitle?: string;
  beforeSubtitle?: string;
  beforeTag?: string;
  afterTitle?: string;
  afterSubtitle?: string;
  afterTag?: string;
  className?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeTitle = 'Standard Hours: Mon-Fri 8am-5pm',
  beforeSubtitle = 'Regular office desk dispatch only',
  beforeTag = 'Before Change',
  afterTitle = 'Updated: 24/7 Victoria Day Emergency On-Call',
  afterSubtitle = 'Emergency line active with surcharge notice',
  afterTag = 'After Update (QA Verified)',
  className,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative w-full h-48 rounded-lg overflow-hidden border border-border select-none outline-none focus-visible:ring-2 focus-visible:ring-secondary',
        className
      )}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Layer (Full width in background) */}
      <div className="absolute inset-0 bg-[#E4F0E8] p-5 flex flex-col justify-between text-left">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-white">
            {afterTag}
          </span>
          <span className="text-[10px] text-emerald-800 font-semibold font-mono">100% REVISED</span>
        </div>
        <div>
          <div className="text-sm font-bold text-[#142A26]">{afterTitle}</div>
          <div className="text-xs text-[#24453F] mt-1">{afterSubtitle}</div>
        </div>
        <div className="text-[10px] text-emerald-700 font-mono">
          ✓ Verified on mobile & desktop templates
        </div>
      </div>

      {/* Before Layer (Clipped to sliderPosition) */}
      <div
        className="absolute inset-0 bg-[#FBFAF7] p-5 flex flex-col justify-between text-left border-r border-border-strong overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="flex items-center justify-between whitespace-nowrap">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-text-muted text-white">
            {beforeTag}
          </span>
        </div>
        <div className="whitespace-nowrap">
          <div className="text-sm font-semibold text-text">{beforeTitle}</div>
          <div className="text-xs text-text-muted mt-1">{beforeSubtitle}</div>
        </div>
        <div className="text-[10px] text-text-muted font-mono whitespace-nowrap">
          Previous live production state
        </div>
      </div>

      {/* Vertical Slider Handle Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-ew-resize flex items-center justify-center pointer-events-auto"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="w-7 h-7 rounded-full bg-elevated border-2 border-primary shadow-sh-2 flex items-center justify-center text-primary cursor-ew-resize">
          <ChevronsLeftRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-text-muted/60 pointer-events-none bg-elevated/70 px-1.5 py-0.5 rounded">
        Drag or use ← → keys
      </div>
    </div>
  );
};
