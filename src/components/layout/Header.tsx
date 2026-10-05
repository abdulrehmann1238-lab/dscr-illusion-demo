import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { brandConfig } from '../../brand.config';
import { Button } from '../ui/Button';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useBand } from '../../hooks/useBand';
import { useBookingStore } from '../../store/booking';
import { useHandoffStore } from '../../store/handoff';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollDirection, isScrolled } = useScrollDirection();
  const currentBand = useBand();
  const location = useLocation();
  const { openBooking } = useBookingStore();
  const { logAnalyticsEvent } = useHandoffStore();

  const isHomeHero = location.pathname === '/' && !isScrolled;
  const isDarkBand = isHomeHero || currentBand === 'navy' || currentBand === 'charcoal';

  // Navigation Links (5 links; logo handles Home per PRD 14.1)
  const NAV_ITEMS = [
    { to: '/financing', label: 'Financing' },
    { to: '/learn', label: 'Learn' },
    { to: '/speaking', label: 'Speaking' },
    { to: '/advisory', label: 'Advisory' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      {/* Skip to Content for full accessibility per PRD 14.1 & 17.2 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-loader px-4 py-2 bg-navy-900 text-gold-300 border border-gold-500 rounded-sm text-sm font-medium"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-nav transition-all duration-med ease-out ${
          scrollDirection === 'down' && isScrolled
            ? '-translate-y-full'
            : 'translate-y-0'
        } ${
          isScrolled
            ? 'h-16 md:h-20 bg-cream-50/95 backdrop-blur-sm border-b border-line shadow-1'
            : 'h-20 md:h-24 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Wordmark (Monogram + Name in Newsreader 1.25rem per PRD 14.1) */}
          <Link
            to="/"
            onClick={() => logAnalyticsEvent('nav_logo_click')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={`${brandConfig.name} Home`}
          >
            <span
              className={`font-display text-lg font-bold px-2 py-0.5 rounded-[2px] transition-colors duration-fast ${
                isScrolled
                  ? 'bg-navy-900 text-gold-300'
                  : isDarkBand
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                  : 'bg-navy-900 text-gold-300'
              }`}
            >
              {brandConfig.monogram}
            </span>
            <span
              className={`font-display text-xl font-normal tracking-tight transition-colors duration-fast ${
                isScrolled
                  ? 'text-ink-900'
                  : isDarkBand
                  ? 'text-cream-100'
                  : 'text-ink-900'
              }`}
            >
              {brandConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => logAnalyticsEvent('nav_click', { destination: item.label })}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium tracking-wide transition-colors duration-fast group ${
                    isScrolled
                      ? isActive
                        ? 'text-ink-900 font-semibold'
                        : 'text-ink-600 hover:text-ink-900'
                      : isDarkBand
                      ? isActive
                        ? 'text-gold-300 font-semibold'
                        : 'text-cream-400 hover:text-cream-100'
                      : isActive
                      ? 'text-ink-900 font-semibold'
                      : 'text-ink-600 hover:text-ink-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {/* Active or Hover gold underline per PRD 14.1 */}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gold-500 transition-all duration-med ease-out origin-left ${
                        isActive
                          ? 'w-full scale-x-100'
                          : 'w-full scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Book a call CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant={isScrolled ? 'primary' : isDarkBand ? 'gold-on-navy' : 'primary'}
              size="sm"
              onClick={() => {
                logAnalyticsEvent('cta_click', { label: 'Book a call (Header)' });
                openBooking();
              }}
            >
              Book a call
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-sm transition-colors focus:outline-none ${
              isScrolled
                ? 'text-ink-900'
                : isDarkBand
                ? 'text-cream-100'
                : 'text-ink-900'
            }`}
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-current transition-transform duration-med" />
              <span className="w-full h-0.5 bg-current transition-transform duration-med" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
