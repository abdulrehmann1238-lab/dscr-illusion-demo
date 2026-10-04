import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface WorkBuild {
  id: string;
  slug: string;
  title: string;
  industry: string;
  location: string;
  snapshot: string;
  headline: string;
  outcome: string;
  color: string;
  stats: { label: string; value: string }[];
  accentBorder?: string;
  isLiveDemo?: boolean;
}

export const selectedBuilds: WorkBuild[] = [
  {
    id: 'c01',
    slug: 'ridgeline-plumbing',
    title: 'Ridgeline Plumbing & Heating',
    industry: 'Trades & Home Services',
    location: 'Calgary, AB',
    snapshot: 'Home Services v4.2',
    headline: 'Emergency plumbing & HVAC funnel that captures after-hours dispatch in <30 seconds.',
    outcome: 'Quote form -> SMS dispatch -> booked emergency job in 90 seconds',
    color: '#1E3A5F',
    accentBorder: 'border-l-4 border-l-[#1E3A5F]',
    isLiveDemo: true,
    stats: [
      { label: 'Mobile Conversion', value: '+38%' },
      { label: 'Avg Lead Response', value: '28 sec' },
      { label: 'Google 5★ Reviews', value: '312' },
    ],
  },
  {
    id: 'c02',
    slug: 'maple-and-pine-dental',
    title: 'Maple & Pine Dental',
    industry: 'Healthcare & Clinical',
    location: 'Kelowna, BC',
    snapshot: 'Clinic v3.1',
    headline: 'Clean patient acquisition engine with two-way calendar sync and insurance provider check.',
    outcome: 'New patient intake calendar directly connected to chair availability',
    color: '#2B4C3F',
    accentBorder: 'border-l-4 border-l-[#2B4C3F]',
    stats: [
      { label: 'Intake Completion', value: '94%' },
      { label: 'Show-up Rate', value: '98.5%' },
      { label: 'HIPAA/PIPEDA', value: '100% compliant' },
    ],
  },
  {
    id: 'c03',
    slug: 'harbourlight-realty',
    title: 'Harbourlight Realty',
    industry: 'Real Estate & Property',
    location: 'Halifax, NS',
    snapshot: 'Realty v2.6',
    headline: 'Instant property valuation calculator with automated localized market report drip.',
    outcome: 'Address submitted -> instant valuation PDF -> automated agent follow-up',
    color: '#1A365D',
    accentBorder: 'border-l-4 border-l-[#1A365D]',
    stats: [
      { label: 'Listing Inquiries', value: '64 / mo' },
      { label: 'Email Open Rate', value: '52%' },
      { label: 'Pipeline Velocity', value: '14 days' },
    ],
  },
];

export const WorkCard: React.FC<{ build: WorkBuild }> = ({ build }) => {
  return (
    <div className="group relative bg-elevated border border-border rounded-lg overflow-hidden shadow-sh-1 hover:shadow-sh-2 transition-all duration-med hover:-translate-y-1 flex flex-col justify-between text-left">
      <div>
        {/* CSS Mock Browser Preview Banner */}
        <div
          className="w-full aspect-[16/10] p-4 flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: build.color }}
        >
          {/* Subtle noise and card texture */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Top preview bar */}
          <div className="relative z-10 flex items-center justify-between text-white/90">
            <span className="text-[11px] font-mono uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/20">
              {build.snapshot}
            </span>
            {build.isLiveDemo && (
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/90 text-white px-2 py-0.5 rounded-sm">
                Interactive Site
              </span>
            )}
          </div>

          {/* Middle aesthetic graphic */}
          <div className="relative z-10 flex flex-col gap-1 text-white">
            <span className="text-xl sm:text-2xl font-display font-medium text-white drop-shadow-sm">
              {build.title}
            </span>
            <span className="text-xs text-white/80">{build.location}</span>
          </div>

          {/* Bottom stats row inside preview */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-white/20 text-white text-left">
            {build.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xs sm:text-sm font-semibold font-mono text-white">
                  {s.value}
                </div>
                <div className="text-[9px] text-white/70 truncate">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {build.industry}
            </span>
            <span className="text-xs font-mono text-text-muted">{build.location}</span>
          </div>

          <h3 className="text-base font-semibold text-text mb-2 line-clamp-2">
            {build.headline}
          </h3>

          <p className="text-xs text-text-2 mb-4 leading-relaxed flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            <span>{build.outcome}</span>
          </p>
        </div>
      </div>

      {/* Card Footer / Action Links */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-border/50">
        <Link
          to={`/work/${build.slug}`}
          className="text-xs font-semibold text-primary hover:text-primary-hover underline underline-offset-4"
        >
          View Case Study
        </Link>
        {build.isLiveDemo ? (
          <Link
            to="/demo/site/ridgeline-plumbing"
            className="inline-flex items-center text-xs font-semibold text-accent hover:text-accent-hover group/link"
          >
            <span>Launch Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        ) : (
          <Link
            to={`/console/clients/${build.id}`}
            className="inline-flex items-center text-xs text-text-muted hover:text-text"
          >
            <span>Console Record</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};
