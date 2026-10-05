import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { brandConfig } from '../../brand.config';
import { Button } from '../ui/Button';
import { useBookingStore } from '../../store/booking';
import { useHandoffStore } from '../../store/handoff';
import { useToastStore } from '../../store/toasts';

export const Footer: React.FC = () => {
  const { openBooking } = useBookingStore();
  const { openHandoff, openCookieModal, logAnalyticsEvent } = useHandoffStore();
  const { addToast } = useToastStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAmazonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logAnalyticsEvent('outbound_click', { destination: 'Amazon - The DSCR Illusion' });
    addToast({
      message: 'Opening Amazon in a new tab.',
      type: 'info',
    });
    window.open(brandConfig.bookAmazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer
      data-band="navy"
      className="bg-navy-900 text-cream-100 on-navy border-t border-line-dark pt-20 md:pt-28 pb-12"
      aria-label="Site Footer"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Closing Call to Action Row */}
        <div className="pb-16 md:pb-24 border-b border-line-dark flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-4 block">
              Direct Advisory & Lending
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
              Your next deal deserves a clear answer.
            </h2>
          </div>
          <div>
            <Button
              variant="gold-on-navy"
              size="lg"
              onClick={() => {
                logAnalyticsEvent('cta_click', { label: 'Book a call (Footer)' });
                openBooking();
              }}
            >
              Book a call
            </Button>
          </div>
        </div>

        {/* 4 Column Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-line-dark text-sm">
          {/* Col 1: Work with me */}
          <div>
            <h3 className="font-display text-base text-cream-100 mb-4 font-semibold tracking-wide">
              Work With Me
            </h3>
            <ul className="space-y-3 text-cream-400">
              <li>
                <Link to="/financing" className="hover:text-gold-300 transition-colors">
                  Investor Financing
                </Link>
              </li>
              <li>
                <Link to="/financing#dscr-calculator" className="hover:text-gold-300 transition-colors">
                  DSCR Ratio Calculator
                </Link>
              </li>
              <li>
                <Link to="/advisory" className="hover:text-gold-300 transition-colors">
                  Video Content Advisory
                </Link>
              </li>
              <li>
                <Link to="/speaking" className="hover:text-gold-300 transition-colors">
                  Speaking & Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Learn */}
          <div>
            <h3 className="font-display text-base text-cream-100 mb-4 font-semibold tracking-wide">
              Learn & Read
            </h3>
            <ul className="space-y-3 text-cream-400">
              <li>
                <Link to="/learn" className="hover:text-gold-300 transition-colors">
                  Video Masterclasses
                </Link>
              </li>
              <li>
                <Link to="/learn#book" className="hover:text-gold-300 transition-colors">
                  The DSCR Illusion Book
                </Link>
              </li>
              <li>
                <button
                  onClick={handleAmazonClick}
                  className="inline-flex items-center gap-1 hover:text-gold-300 transition-colors text-left"
                >
                  <span>Amazon Storefront</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: About */}
          <div>
            <h3 className="font-display text-base text-cream-100 mb-4 font-semibold tracking-wide">
              About & Trust
            </h3>
            <ul className="space-y-3 text-cream-400">
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  Marcus's Story
                </Link>
              </li>
              <li>
                <Link to="/about#credentials" className="hover:text-gold-300 transition-colors">
                  Licensing & Credentials
                </Link>
              </li>
              <li>
                <Link to="/about#mosaic" className="hover:text-gold-300 transition-colors">
                  Practice Gallery
                </Link>
              </li>
              <li>
                <Link to="/disclosures" className="hover:text-gold-300 transition-colors">
                  Mortgage Disclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h3 className="font-display text-base text-cream-100 mb-4 font-semibold tracking-wide">
              Connect
            </h3>
            <ul className="space-y-3 text-cream-400">
              <li>
                <a
                  href={brandConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold-300 transition-colors"
                >
                  <span>YouTube (12K+)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold-300 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold-300 transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brandConfig.email}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {brandConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Designed Mortgage Compliance Block per PRD 14.2 */}
        <div className="py-10 border-b border-line-dark flex flex-col md:flex-row gap-6 items-start">
          {/* Equal Housing Opportunity SVG Emblem */}
          <div
            className="flex-shrink-0 p-2.5 rounded bg-navy-700/60 border border-line-dark text-gold-300"
            title="Equal Housing Opportunity"
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="8" y1="15" x2="16" y2="15" />
            </svg>
          </div>

          <div className="space-y-4">
            <p className="text-[13px] leading-relaxed text-cream-400 font-sans">
              {brandConfig.complianceNotice}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream-400">
              <Link to="/disclosures" className="hover:text-gold-300 underline underline-offset-4 decoration-line-dark">
                Full disclosures & state licensing
              </Link>
              <Link to="/privacy" className="hover:text-gold-300 underline underline-offset-4 decoration-line-dark">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gold-300 underline underline-offset-4 decoration-line-dark">
                Terms of Use
              </Link>
              <button
                type="button"
                onClick={openCookieModal}
                className="hover:text-gold-300 underline underline-offset-4 decoration-line-dark"
              >
                Cookie preferences
              </button>
              <button
                type="button"
                onClick={() => openHandoff('overview')}
                className="text-gold-300 hover:text-gold-100 font-semibold underline underline-offset-4 decoration-gold-500/50"
              >
                Handoff notes (Shift + H)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <div>
            © {new Date().getFullYear()} {brandConfig.firm}. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
