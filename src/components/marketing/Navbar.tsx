import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { brand } from '../../config/brand';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Process', href: '/process' },
    { label: 'Console', href: '/console' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-nav transition-all duration-med',
          isScrolled
            ? 'bg-bg/95 border-b border-border shadow-sh-1 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center text-surface font-display font-medium text-sm">
              N
            </span>
            <span className="font-display text-xl font-medium tracking-tight text-primary group-hover:text-primary-hover transition-colors">
              {brand.name}
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors py-1',
                    isActive ? 'text-primary font-semibold' : 'text-text-2 hover:text-text'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/demo/site/ridgeline-plumbing">
              <Button variant="ghost" size="sm" className="text-xs">
                <span>View sample site</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-text-muted" />
              </Button>
            </Link>
            <Link to="/process">
              <Button variant="primary" size="sm" className="text-xs">
                Start the test build
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text hover:text-primary rounded-sm transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (PRD §16) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-modal md:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-[#16221F]/45"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-4/5 max-w-sm h-full bg-elevated border-l border-border p-6 flex flex-col justify-between shadow-sh-3">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="font-display text-lg font-medium text-primary">{brand.name}</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-text-muted hover:text-text cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-text hover:text-primary transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-border">
              <Link to="/demo/site/ridgeline-plumbing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full text-sm">
                  View Ridgeline Sample Site
                </Button>
              </Link>
              <Link to="/process" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full text-sm">
                  Start the Test Build
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1 text-[11px] text-text-muted mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>Canadian GoHighLevel Partner</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
