import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface LineChartProps {
  allSitesData: number[];
  selectedSiteData: number[];
  selectedSiteName?: string;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  allSitesData,
  selectedSiteData,
  selectedSiteName = 'Ridgeline Plumbing',
  className,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 640;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 35 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...allSitesData, 100);

  const getPoints = (data: number[]) => {
    return data.map((val, idx) => {
      const x = padding.left + (idx / (data.length - 1)) * chartW;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      return { x, y, val };
    });
  };

  const pointsAll = getPoints(allSitesData);
  const pointsSelected = getPoints(selectedSiteData);

  const polylineAll = pointsAll.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const polylineSelected = pointsSelected.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className={cn('relative w-full overflow-hidden select-none', className)}>
      {/* Chart Legend */}
      <div className="flex items-center justify-between pb-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
            <span className="font-semibold text-text">Portfolio Total (14 sites)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
            <span className="font-medium text-text-2">{selectedSiteName}</span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-text-muted">Last 30 Days</span>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible cursor-crosshair"
        onMouseLeave={() => setHoverIndex(null)}
      >
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padding.top + chartH * (1 - pct);
          const labelVal = Math.round(maxVal * pct);
          return (
            <g key={pct}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="var(--border)"
                strokeDasharray="2 3"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[10px] fill-text-muted font-mono"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Series 1: Portfolio Total Line */}
        <polyline
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylineAll}
        />

        {/* Series 2: Selected Client Line */}
        <polyline
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="4 2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylineSelected}
        />

        {/* Hover interaction points */}
        {pointsAll.map((p, idx) => (
          <rect
            key={idx}
            x={p.x - chartW / (pointsAll.length * 2)}
            y={padding.top}
            width={chartW / pointsAll.length}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => setHoverIndex(idx)}
          />
        ))}

        {/* Crosshair indicator on hover */}
        {hoverIndex !== null && pointsAll[hoverIndex] && (
          <g>
            <line
              x1={pointsAll[hoverIndex].x}
              y1={padding.top}
              x2={pointsAll[hoverIndex].x}
              y2={padding.top + chartH}
              stroke="var(--text-muted)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
            {/* Dot 1 */}
            <circle
              cx={pointsAll[hoverIndex].x}
              cy={pointsAll[hoverIndex].y}
              r="4"
              className="fill-primary stroke-white stroke-2"
            />
            {/* Dot 2 */}
            <circle
              cx={pointsSelected[hoverIndex].x}
              cy={pointsSelected[hoverIndex].y}
              r="4"
              className="fill-accent stroke-white stroke-2"
            />
          </g>
        )}
      </svg>

      {/* Floating Hover Card */}
      {hoverIndex !== null && (
        <div
          className="absolute z-20 top-8 pointer-events-none bg-elevated border border-border rounded-md p-2 shadow-sh-2 text-left text-xs min-w-[140px]"
          style={{
            left: `${(pointsAll[hoverIndex].x / width) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-[10px] text-text-muted font-mono mb-1">
            Day -{30 - hoverIndex}
          </div>
          <div className="flex items-center justify-between gap-3 text-primary font-semibold">
            <span>Portfolio:</span>
            <span>{pointsAll[hoverIndex].val} leads</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-accent font-semibold">
            <span>Selected:</span>
            <span>{pointsSelected[hoverIndex].val} leads</span>
          </div>
        </div>
      )}
    </div>
  );
};
