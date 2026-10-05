import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  X,
  FileText,
  Sliders,
  Sparkles,
  Search,
  Activity,
  Shield,
  HelpCircle,
  CheckCircle2,
  Circle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useHandoffStore, HandoffTab } from '../../store/handoff';
import { SEO_METADATA } from '../../hooks/useSeo';
import { Button } from '../ui/Button';

export const HandoffPanel: React.FC = () => {
  const {
    isOpen,
    activeTab,
    closeHandoff,
    openHandoff,
    setTab,
    isEditMode,
    toggleEditMode,
    resetAllEdits,
    visitedChecklist,
    events,
    clearAnalyticsEvents,
    isPillDismissed,
    dismissPill,
  } = useHandoffStore();

  const location = useLocation();
  const [showPill, setShowPill] = useState(false);

  // Keyboard shortcut Shift + H per PRD Section 8 & 14.5
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        if (isOpen) {
          closeHandoff();
        } else {
          openHandoff();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        closeHandoff();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, openHandoff, closeHandoff]);

  // Pill delay appearance after 8 seconds per PRD 14.5
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPill(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const currentSeo = SEO_METADATA[location.pathname] || SEO_METADATA['/'];

  return (
    <>
      {/* Floating Pill Trigger at bottom-left */}
      {!isOpen && !isPillDismissed && showPill && (
        <aside
          aria-label="Demo notes notification"
          className="fixed bottom-6 left-6 z-modal flex items-center gap-2 p-1.5 pl-3 pr-2 bg-paper text-ink-900 border border-line-strong rounded-pill shadow-2 text-xs animate-in fade-in slide-in-from-bottom-2 duration-med"
        >
          <button
            onClick={() => openHandoff('overview')}
            className="flex items-center gap-2 font-medium hover:text-gold-700 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span>Demo notes (Shift + H)</span>
          </button>
          <button
            onClick={dismissPill}
            aria-label="Dismiss demo notes badge"
            className="p-1 text-ink-400 hover:text-ink-900 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Floating Edit Mode Active Bar */}
      {isEditMode && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-toast flex items-center gap-4 py-2 px-5 bg-navy-900 text-cream-100 border border-gold-500 rounded-pill shadow-2 text-xs font-medium animate-in fade-in duration-fast">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            <span>Edit mode active. Click any headline or text to edit.</span>
          </div>
          <button
            onClick={resetAllEdits}
            className="flex items-center gap-1 text-gold-300 hover:text-gold-100 underline underline-offset-2 ml-2"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset text</span>
          </button>
          <button
            onClick={toggleEditMode}
            className="text-cream-400 hover:text-cream-100 ml-2"
          >
            ✕ Exit
          </button>
        </div>
      )}

      {/* Slide-over Handoff Drawer (480px desktop, full-screen mobile) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="handoff-drawer-title"
          className="fixed inset-0 z-drawer flex justify-end bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-med"
        >
          <div className="w-full sm:w-[500px] h-full bg-paper text-ink-900 border-l border-line shadow-2 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-med">
            {/* Drawer Header */}
            <div className="p-6 border-b border-line flex items-center justify-between bg-cream-50">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold block">
                  Proposal & Technical Proof
                </span>
                <h2 id="handoff-drawer-title" className="font-display text-xl font-semibold">
                  Handoff & Client Notes
                </h2>
              </div>
              <button
                onClick={closeHandoff}
                aria-label="Close handoff drawer"
                className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-line bg-cream-100/50 overflow-x-auto scrollbar-none text-xs font-medium">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'platform', label: 'Platform', icon: Sliders },
                { id: 'edit-mode', label: 'Edit Mode', icon: Sparkles },
                { id: 'seo', label: 'SEO', icon: Search },
                { id: 'analytics', label: 'Analytics', icon: Activity },
                { id: 'spam-privacy', label: 'Spam & Trust', icon: Shield },
                { id: 'test-scripts', label: 'Test Scenarios', icon: HelpCircle },
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id as HandoffTab)}
                    className={`flex items-center gap-1.5 py-3 px-3.5 whitespace-nowrap border-b-2 transition-all ${
                      isSelected
                        ? 'border-gold-500 text-ink-900 font-semibold bg-paper'
                        : 'border-transparent text-ink-600 hover:text-ink-900'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-base font-semibold mb-2">
                      Client Proof Strategy
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed font-sans">
                      This demo proves taste, editorial structure, and domain rigor for Marcus Hale. The design avoids mortgage clichés (no handshakes or keys-in-hand stock photography) and unites four distinct audiences cleanly.
                    </p>
                  </div>

                  {/* 5-Item Interactive Checklist */}
                  <div className="p-4 bg-cream-50 rounded-sm border border-line space-y-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-ink-900 block">
                      Interactive Feature Checklist
                    </span>
                    <ul className="space-y-2 text-xs">
                      {[
                        { key: 'dscrCalculator', label: 'Used signature DSCR ratio calculator' },
                        { key: 'calendlyBooking', label: 'Tested Calendly-style booking & .ics download' },
                        { key: 'videoLightbox', label: 'Tested YouTube video filtering & lightbox' },
                        { key: 'formSubmitted', label: 'Submitted inquiry or advisory application' },
                        { key: 'editModeTried', label: 'Toggled live Edit Mode to rewrite copy' },
                      ].map((item) => {
                        const done = visitedChecklist[item.key as keyof typeof visitedChecklist];
                        return (
                          <li key={item.key} className="flex items-center gap-2.5">
                            {done ? (
                              <CheckCircle2 className="w-4 h-4 text-ok flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-ink-400 flex-shrink-0" />
                            )}
                            <span className={done ? 'text-ink-900 font-medium' : 'text-ink-600'}>
                              {item.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Stand-in Assets Table */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-ink-900 block">
                      Swappable Stand-In Identity
                    </span>
                    <p className="text-xs text-ink-600">
                      Defined in <code>brand.config.ts</code> and <code>assets/manifest.ts</code>:
                    </p>
                    <div className="p-3 bg-cream-100 rounded-sm border border-line font-mono text-[11px] space-y-1">
                      <div>Name: "Marcus Hale" (Placeholder)</div>
                      <div>Firm: "Hale Capital Lending"</div>
                      <div>NMLS: "#000000 (Placeholder)"</div>
                      <div>Subscribers: "12K+" (Per brief)</div>
                      <div>Book: "The DSCR Illusion" (Per brief)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PLATFORM RECOMMENDATION */}
              {activeTab === 'platform' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-gold-700 block mb-1">
                      Recommended Production Platform
                    </span>
                    <h3 className="font-display text-xl font-semibold mb-3">
                      Webflow + Native CMS
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed font-sans mb-4">
                      Why Webflow is recommended for this 6-page editorial site over Next.js or WordPress:
                    </p>
                    <ul className="space-y-2.5 text-xs text-ink-700 list-disc pl-4">
                      <li>
                        <strong>Direct Client Editing:</strong> The client can edit headlines, descriptions, and book details directly inside Webflow Editor without hiring a developer.
                      </li>
                      <li>
                        <strong>Dynamic CMS Collections:</strong> Seamless CMS collections for YouTube videos, conference speaking topics, testimonials, and FAQ accordions.
                      </li>
                      <li>
                        <strong>Superior Typography Control:</strong> Complete typographic precision over Newsreader variable optical sizing, letter spacing, and line clamps.
                      </li>
                      <li>
                        <strong>Turnstile & Native Forms:</strong> Built-in anti-spam form routing without external serverless functions or maintenance vulnerabilities.
                      </li>
                      <li>
                        <strong>Why not Next.js?</strong> Headless architectures add unnecessary monthly infrastructure costs and require code commits for simple copy edits.
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-cream-50 rounded-sm border border-line text-xs text-ink-600">
                    <strong>Alternative:</strong> Framer is viable for modern motion, but has a weaker CMS structure and less reliable long-term compliance form options for mortgage disclosures.
                  </div>
                </div>
              )}

              {/* TAB 3: EDIT MODE */}
              {activeTab === 'edit-mode' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Live "Easy Editing" Simulation
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed font-sans mb-4">
                      One of the client's biggest fears is being stuck with a website they cannot modify after launch. Toggle Edit Mode below to test inline editing directly on this demo.
                    </p>
                  </div>

                  <div className="p-4 bg-cream-50 rounded-sm border border-line flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">Inline Edit Mode</div>
                      <div className="text-xs text-ink-600">Enables contenteditable on headlines & text</div>
                    </div>
                    <Button
                      size="sm"
                      variant={isEditMode ? 'primary' : 'secondary'}
                      onClick={toggleEditMode}
                    >
                      {isEditMode ? 'Disable' : 'Enable'}
                    </Button>
                  </div>

                  {isEditMode && (
                    <div className="space-y-3 p-4 bg-gold-100/50 rounded-sm border border-gold-500/40 text-xs">
                      <p className="font-medium text-ink-900">
                        Edit mode is ON! Hover over any headline or body paragraph on the page to see the gold dotted outline, click, and type your own words.
                      </p>
                      <Button size="sm" variant="secondary" onClick={resetAllEdits}>
                        Reset to Default Copy
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SEO */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Route SEO & Structured Data
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed font-sans mb-4">
                      Each route sets strict title tags, meta descriptions, and JSON-LD schemas:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-cream-50 rounded-sm border border-line space-y-1.5 text-xs">
                      <div className="font-semibold text-ink-900">Current Route: {location.pathname}</div>
                      <div>
                        <strong className="text-ink-600">Title:</strong> {currentSeo.title}
                      </div>
                      <div>
                        <strong className="text-ink-600">Description:</strong> {currentSeo.description}
                      </div>
                      <div>
                        <strong className="text-ink-600">Schema Types:</strong> {currentSeo.schemaType}
                      </div>
                      <div>
                        <strong className="text-ink-600">Canonical:</strong> {currentSeo.canonical}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ANALYTICS LOG */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold">
                        GA4 Event Telemetry
                      </h3>
                      <span className="text-xs text-ink-600">Consent-aware mock event stream</span>
                    </div>
                    <Button size="sm" variant="secondary" onClick={clearAnalyticsEvents}>
                      Clear
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-2.5 bg-cream-100 rounded-sm border border-line text-[11px] font-mono space-y-1"
                      >
                        <div className="flex items-center justify-between text-ink-900 font-semibold">
                          <span className="text-gold-700">{ev.name}</span>
                          <span className="text-[10px] text-ink-400">{ev.ts}</span>
                        </div>
                        <div className="text-ink-600 truncate">
                          {JSON.stringify(ev.params)}
                        </div>
                        <div className="text-[10px] text-ink-400">
                          Consent granted: {ev.consent ? 'YES' : 'PENDING'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SPAM & TRUST */}
              {activeTab === 'spam-privacy' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Spam Protection & Regulatory Framework
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed font-sans mb-4">
                      How lead intake and disclosures comply with mortgage and web standards:
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-cream-50 rounded-sm border border-line">
                      <div className="font-semibold text-ink-900 mb-1">Invisible Honeypot & Time-to-Fill</div>
                      <p className="text-ink-600">
                        Hidden website input dropped silently if filled by bots; submissions under 2 seconds rejected.
                      </p>
                    </div>

                    <div className="p-3 bg-cream-50 rounded-sm border border-line">
                      <div className="font-semibold text-ink-900 mb-1">Cloudflare Turnstile Verification</div>
                      <p className="text-ink-600">
                        A frictionless human verification check simulated via a 600ms micro-state during submit.
                      </p>
                    </div>

                    <div className="p-3 bg-cream-50 rounded-sm border border-line">
                      <div className="font-semibold text-ink-900 mb-1">Mortgage Disclosures Compliance</div>
                      <p className="text-ink-600">
                        Mandatory Equal Housing Opportunity emblem, NMLS identifiers, and non-commitment to lend disclaimers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: TEST SCRIPTS */}
              {activeTab === 'test-scripts' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Demo QA Test Scripts
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed font-sans mb-4">
                      Quick steps to verify edge-cases and error handling:
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-cream-50 rounded-sm border border-line">
                      <div className="font-semibold text-ink-900 mb-1">Test Form Failure Banner</div>
                      <p className="text-ink-600 mb-2">
                        On either the Speaking or Advisory form, type the exact name <code>Error Test</code>.
                      </p>
                      <span className="text-[11px] text-gold-700">Triggers simulated 503 error banner.</span>
                    </div>

                    <div className="p-3 bg-cream-50 rounded-sm border border-line">
                      <div className="font-semibold text-ink-900 mb-1">Test Empty Video Search</div>
                      <p className="text-ink-600 mb-2">
                        On the Learn page video search bar, type <code>zzz</code>.
                      </p>
                      <span className="text-[11px] text-gold-700">Triggers empty state with "Clear filters" action.</span>
                    </div>

                    <div className="p-3 bg-cream-50 rounded-sm border border-line">
                      <div className="font-semibold text-ink-900 mb-1">Test Fully Booked Day</div>
                      <p className="text-ink-600 mb-2">
                        In the "Book a call" modal, select Day 3 on the date strip.
                      </p>
                      <span className="text-[11px] text-gold-700">Shows "Fully booked" with "Next available" button.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Notice */}
            <div className="p-4 border-t border-line bg-cream-50 text-[11px] text-ink-400 text-center">
              Built for Marcus Hale proposal · Press <kbd className="px-1 py-0.5 bg-paper border border-line rounded">Shift + H</kbd> to toggle
            </div>
          </div>
        </div>
      )}
    </>
  );
};
