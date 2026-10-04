import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';

interface CityPoint {
  id: string;
  name: string;
  business: string;
  industry: string;
  snapshot: string;
  x: number;
  y: number;
}

const cityPoints: CityPoint[] = [
  { id: 'c07', name: 'Victoria', business: 'Tidewater Landscaping', industry: 'Trades', snapshot: 'Home Services v4.2', x: 120, y: 350 },
  { id: 'van', name: 'Vancouver', business: 'Pacific Ridge Dental', industry: 'Healthcare', snapshot: 'Clinic v3.1', x: 140, y: 340 },
  { id: 'c02', name: 'Kelowna', business: 'Maple & Pine Dental', industry: 'Healthcare', snapshot: 'Clinic v3.1', x: 185, y: 335 },
  { id: 'c01', name: 'Calgary', business: 'Ridgeline Plumbing & Heating', industry: 'Trades', snapshot: 'Home Services v4.2', x: 235, y: 320 },
  { id: 'c08', name: 'Canmore', business: 'Granite Peak Fitness', industry: 'Fitness', snapshot: 'Studio v2.3', x: 218, y: 310 },
  { id: 'c13', name: 'Edmonton', business: 'Wolf Willow Vet Clinic', industry: 'Healthcare', snapshot: 'Clinic v3.0', x: 245, y: 275 },
  { id: 'c05', name: 'Saskatoon', business: 'Northern Lights Physio', industry: 'Healthcare', snapshot: 'Clinic v3.1', x: 310, y: 295 },
  { id: 'c11', name: 'Winnipeg', business: 'Prairie Sky Roofing', industry: 'Trades', snapshot: 'Home Services v4.2', x: 410, y: 325 },
  { id: 'c09', name: 'Thunder Bay', business: 'Lakehead Auto Care', industry: 'Auto', snapshot: 'Home Services v4.2', x: 500, y: 350 },
  { id: 'c06', name: 'Toronto', business: 'Cedar Row Law', industry: 'Legal', snapshot: 'Professional v1.8', x: 630, y: 405 },
  { id: 'c12', name: 'Ottawa', business: 'Capital City Cleaners', industry: 'Services', snapshot: 'Home Services v4.1', x: 675, y: 375 },
  { id: 'c04', name: 'Montréal', business: 'Boréal Coiffure', industry: 'Salon', snapshot: 'Salon v2.0', x: 710, y: 365 },
  { id: 'c10', name: 'Québec City', business: 'Rue Saint-Jean Bistro', industry: 'Restaurant', snapshot: 'Hospitality v1.4', x: 745, y: 340 },
  { id: 'c03', name: 'Halifax', business: 'Harbourlight Realty', industry: 'Real estate', snapshot: 'Realty v2.6', x: 840, y: 355 },
  { id: 'c14', name: "St. John's", business: 'Fogo Island Outfitters', industry: 'Retail', snapshot: 'Retail v1.2', x: 915, y: 295 },
];

export const CanadaMap: React.FC<{ onClientClick?: (id: string) => void }> = ({ onClientClick }) => {
  const navigate = useNavigate();
  const [activeDotIndex, setActiveDotIndex] = useState(3); // Start with Calgary (c01)
  const [hoveredPoint, setHoveredPoint] = useState<CityPoint | null>(null);
  const [sitesLiveCounter, setSitesLiveCounter] = useState(12);
  const [leadsRoutedToday, setLeadsRoutedToday] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDotIndex((prev) => (prev + 1) % cityPoints.length);
      setLeadsRoutedToday((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const activePoint = cityPoints[activeDotIndex];

  const handlePointClick = (point: CityPoint) => {
    if (point.id.startsWith('c')) {
      if (onClientClick) {
        onClientClick(point.id);
      } else {
        navigate(`/console/clients/${point.id}`);
      }
    } else {
      navigate('/console/clients');
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] max-w-[680px] mx-auto select-none">
      {/* SVG Map of Canada (clean geometric contours) */}
      <svg
        viewBox="0 0 960 540"
        className="w-full h-full stroke-border-strong fill-none overflow-visible"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Simplified high-aesthetic Canada outline paths */}
        {/* West Coast / BC */}
        <path d="M 70 210 L 95 240 L 115 280 L 110 320 L 130 355 L 145 345 L 155 380 L 175 390 L 195 390" />
        {/* Pacific Rim Island (Vancouver Island) */}
        <path d="M 105 340 Q 120 375 130 365 Q 115 330 105 340 Z" strokeDasharray="2 2" />
        {/* Yukon / NWT / Nunavut Northern Perimeter */}
        <path d="M 70 210 L 110 140 L 160 110 L 220 90 L 290 85 L 340 70 L 400 95 L 430 125 L 490 120 L 530 85 L 610 90 L 660 135 L 720 180" />
        {/* Arctic Archipelago accents */}
        <path d="M 270 50 Q 320 40 370 60 Q 330 75 270 50 Z" opacity="0.6" />
        <path d="M 440 45 Q 490 35 530 65 Q 480 80 440 45 Z" opacity="0.6" />
        <path d="M 590 70 Q 640 65 670 110 Q 620 120 590 70 Z" opacity="0.6" />
        {/* Hudson Bay Basin */}
        <path d="M 430 125 C 470 160 480 230 460 260 C 440 285 410 295 440 305 C 480 320 520 280 540 240 C 560 200 550 150 530 140" />
        {/* Southern 49th Parallel border (WA/ID/MT/ND/MN) */}
        <path d="M 145 355 L 435 355" strokeDasharray="3 3" opacity="0.5" />
        {/* Great Lakes & St. Lawrence */}
        <path d="M 435 355 C 480 365 520 395 560 380 C 600 370 620 425 650 425 C 675 425 680 395 720 370 L 760 330 L 800 310" />
        {/* Atlantic Provinces & Maritimes */}
        <path d="M 720 180 C 760 220 780 260 830 285 C 870 300 920 280 940 310 C 950 330 920 345 890 355 L 850 370 C 820 380 810 355 830 340 L 760 330" />
        {/* Newfoundland Island */}
        <path d="M 890 280 Q 935 270 945 310 Q 910 335 885 305 Z" />

        {/* City Dots & Interactive Nodes */}
        {cityPoints.map((point) => {
          const isActive = point.id === activePoint?.id;
          const isHovered = point.id === hoveredPoint?.id;

          return (
            <g
              key={point.id}
              className="cursor-pointer group"
              onClick={() => handlePointClick(point)}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Pulse ripple ring on active cycle */}
              {isActive && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="12"
                  className="stroke-accent fill-none animate-ping opacity-60"
                  strokeWidth="1.5"
                />
              )}

              {/* Halo circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? 8 : 6}
                className="fill-bg stroke-border-strong transition-all duration-med"
                strokeWidth="1"
              />

              {/* Core active dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? 4.5 : isActive ? 4 : 3}
                className={`transition-all duration-fast ${
                  isActive || isHovered
                    ? 'fill-accent'
                    : 'fill-primary'
                }`}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating active label chip */}
      {activePoint && !hoveredPoint && (
        <div
          className="absolute z-10 pointer-events-none transition-all duration-slow"
          style={{
            left: `${(activePoint.x / 960) * 100}%`,
            top: `${(activePoint.y / 540) * 100}%`,
            transform: 'translate(-50%, -140%)',
          }}
        >
          <div className="bg-elevated/95 backdrop-blur-sm border border-border shadow-sh-2 rounded-full px-3 py-1 flex items-center gap-1.5 whitespace-nowrap animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-text">{activePoint.business}</span>
            <span className="text-[10px] text-text-muted">· {activePoint.name} · live</span>
          </div>
        </div>
      )}

      {/* Hover tooltip card */}
      {hoveredPoint && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${(hoveredPoint.x / 960) * 100}%`,
            top: `${(hoveredPoint.y / 540) * 100}%`,
            transform: 'translate(-50%, -125%)',
          }}
        >
          <div className="bg-elevated border border-border shadow-sh-3 rounded-md p-2.5 text-left min-w-[200px] pointer-events-auto">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-text">{hoveredPoint.business}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-success-bg text-success font-medium">
                Live
              </span>
            </div>
            <div className="text-[11px] text-text-2 flex items-center justify-between">
              <span>{hoveredPoint.name}, Canada</span>
              <span className="text-text-muted">{hoveredPoint.industry}</span>
            </div>
            <div className="mt-1 pt-1 border-t border-border/50 text-[10px] text-primary font-mono flex items-center justify-between">
              <span>{hoveredPoint.snapshot}</span>
              <span className="underline">View in console →</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Sample Agency Metrics Counter Card (PRD §8.2) */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-elevated/95 border border-border shadow-sh-2 rounded-md p-3 flex flex-col gap-2 max-w-[210px] text-left">
        <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
          <span className="text-[11px] font-semibold text-text-2 uppercase tracking-wider">Agency Sites</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div>
            <div className="text-lg font-semibold font-display text-primary font-mono leading-none">
              {sitesLiveCounter}
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">Active sites</div>
          </div>
          <div>
            <div className="text-lg font-semibold font-display text-accent font-mono leading-none">
              {leadsRoutedToday}
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">Leads today</div>
          </div>
        </div>
        <div className="text-[9px] text-text-muted/80 pt-1 border-t border-border/40">
          Sample agency portfolio
        </div>
      </div>
    </div>
  );
};
