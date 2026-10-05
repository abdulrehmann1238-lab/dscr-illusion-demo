import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';

export const NotFound: React.FC = () => {
  useSeo('/404');

  const links = [
    { to: '/', label: 'Home (Brand & Four Paths)' },
    { to: '/financing', label: 'Financing & DSCR Calculator' },
    { to: '/learn', label: 'Learn & Video Library' },
    { to: '/speaking', label: 'Speaking & Keynotes' },
    { to: '/advisory', label: 'Video Content Advisory' },
    { to: '/about', label: 'About & Credentials' },
  ];

  return (
    <div id="main-content" className="w-full">
      <Section band="cream" className="pt-32 pb-24 min-h-[80vh] flex items-center">
        <Container size="narrow" className="text-center space-y-8">
          <div>
            <span className="font-display text-7xl sm:text-8xl text-gold-700 block font-light">
              404
            </span>
            <h1 className="heading-h2 text-ink-900 mt-2">
              This page isn't on the map.
            </h1>
            <p className="text-sm text-ink-600 font-sans mt-2 max-w-md mx-auto">
              The link you followed may have moved or no longer exists. Return to one of the main sections below:
            </p>
          </div>

          <div className="p-6 bg-paper rounded-sm border border-line divide-y divide-line text-left text-sm">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-3 flex items-center justify-between group hover:text-gold-700 transition-colors"
              >
                <span className="font-medium text-ink-900 group-hover:text-gold-700">
                  {link.label}
                </span>
                <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-gold-700 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
