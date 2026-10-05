import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { brandConfig } from '../../brand.config';
import { Button } from '../ui/Button';
import { useBookingStore } from '../../store/booking';
import { useHandoffStore } from '../../store/handoff';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { to: '/', label: 'Home', numeral: '00' },
  { to: '/financing', label: 'Financing', numeral: '01' },
  { to: '/learn', label: 'Learn', numeral: '02' },
  { to: '/speaking', label: 'Speaking', numeral: '03' },
  { to: '/advisory', label: 'Advisory', numeral: '04' },
  { to: '/about', label: 'About', numeral: '05' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { openBooking } = useBookingStore();
  const { logAnalyticsEvent } = useHandoffStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className={`fixed inset-0 z-nav bg-navy-900 text-cream-100 flex flex-col justify-between p-6 sm:p-10 transition-transform duration-slow ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Header Row with Monogram & Close button */}
      <div className="flex items-center justify-between border-b border-line-dark pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-bold text-gold-300">
            {brandConfig.monogram}
          </span>
          <span className="font-display text-lg tracking-tight">
            {brandConfig.name}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="p-2 text-cream-100 hover:text-gold-300 transition-colors"
        >
          <span className="text-sm uppercase tracking-widest font-semibold">Close ✕</span>
        </button>
      </div>

      {/* Main Nav Links (Large Newsreader serif with gold numerals per PRD 14.1) */}
      <nav aria-label="Mobile Navigation" className="my-auto py-8">
        <ul className="space-y-5">
          {NAV_LINKS.map((link, idx) => (
            <li
              key={link.to}
              style={{
                transitionDelay: isOpen ? `${idx * 60}ms` : '0ms',
              }}
              className={`transition-all duration-med ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <NavLink
                to={link.to}
                onClick={() => {
                  logAnalyticsEvent('nav_click', { destination: link.label });
                  onClose();
                }}
                className={({ isActive }) =>
                  `group flex items-baseline gap-4 py-1 text-2xl sm:text-3xl font-display transition-colors ${
                    isActive ? 'text-gold-300' : 'text-cream-100 hover:text-gold-100'
                  }`
                }
              >
                <span className="text-xs uppercase tracking-widest text-gold-500 font-sans font-semibold">
                  {link.numeral}
                </span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions: Book a call and Socials */}
      <div className="pt-6 border-t border-line-dark space-y-6">
        <Button
          variant="gold-on-navy"
          fullWidth
          size="lg"
          onClick={() => {
            onClose();
            openBooking();
          }}
        >
          Book a call
        </Button>

        <div className="flex items-center justify-between text-xs text-cream-400">
          <span>{brandConfig.firm}</span>
          <div className="flex gap-4">
            <a
              href={brandConfig.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-300 transition-colors"
            >
              YouTube
            </a>
            <a
              href={brandConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
