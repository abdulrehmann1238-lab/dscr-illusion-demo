import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ExternalLink, ShieldCheck, Mail, Youtube, Linkedin, Instagram, Twitter } from 'lucide-react';
import { brandConfig } from '../brand.config';
import { assetManifest } from '../assets/manifest';
import { pillars } from '../data/pillars';
import { useSeo } from '../hooks/useSeo';
import { useBookingStore } from '../store/booking';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { ImageUnveil } from '../components/motion/ImageUnveil';
import { Tooltip } from '../components/ui/Tooltip';

export const About: React.FC = () => {
  useSeo('/about');
  const { openBooking } = useBookingStore();

  const [expandedJourneyIdx, setExpandedJourneyIdx] = useState<number | null>(0);

  const JOURNEY = [
    {
      year: '2016',
      title: 'First Loan Officer Role & Consumer Realization',
      summary: 'Started in retail mortgage lending and quickly noticed that conventional guidelines forced experienced property investors to jump through absurd personal debt hoops.',
      detail: 'After watching dozens of strong rental deals get killed by rigid W-2 underwriting formulas, I transitioned entirely to non-QM and business-purpose commercial investor capital.',
    },
    {
      year: '2019',
      title: 'Hale Capital Lending Founded',
      summary: 'Launched an independent private lending practice structured exclusively for residential real estate investors, fix-and-flippers, and ground-up builders.',
      detail: 'Built direct relationships with Wall Street secondary market loan buyers and private debt funds, allowing programmatic approvals based purely on property cash flow.',
    },
    {
      year: '2022',
      title: 'YouTube Channel & The DSCR Masterclasses',
      summary: 'Started recording weekly whiteboard breakdowns explaining debt yields, Form 1007 market rent schedules, and capital stack management.',
      detail: 'The channel quickly crossed 12,000 active subscribers, turning into a nationwide community of thoughtful investors and commercial mortgage brokers.',
    },
    {
      year: '2025',
      title: 'Publication of The DSCR Illusion',
      summary: 'Wrote and published the premier handbook dissecting why surface-level cash flow formulas mislead borrowers when taxes reassess or interest rates cycle.',
      detail: 'The book established a new standard for conservative debt sizing and is now referenced across real estate masterminds and institutional conferences.',
    },
    {
      year: '2026',
      title: 'Advisory Practice & Industry Speaking',
      summary: 'Expanded into direct video advisory for forward-thinking mortgage professionals while keynote speaking at major national symposiums.',
      detail: 'Helping other producing loan officers transform technical underwriting knowledge into consumer-direct authority channels that generate sustainable inbound business.',
    },
  ];

  return (
    <div id="main-content" className="w-full">
      {/* 1. Header (Cream, Asymmetric Story) */}
      <Section band="cream" padding="compact" className="pt-28 md:pt-36">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-line">
            {/* Left Large Portrait (cols 1-5) */}
            <div className="lg:col-span-5">
              <ImageUnveil
                src={assetManifest.about.portraitLarge}
                alt={`${brandConfig.name} in office consultation`}
                aspectRatio="aspect-[4/5]"
                delayMs={200}
              />
            </div>

            {/* Right Story (cols 6-12) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
                The Human Behind The Practice
              </span>
              <h1 className="heading-h1 text-ink-900">
                I started with one question: why do good investors get bad financing advice?
              </h1>

              <div className="space-y-4 text-sm sm:text-base text-ink-600 leading-relaxed font-sans">
                <p
                  data-editable="true"
                  data-original-text="For years, residential property investors were treated like ordinary homebuyers. Brokers tried to cram complex multi-unit portfolios and LLC holding entities into conventional tax-return boxes, resulting in months of underwriting headaches and killed deals."
                >
                  For years, residential property investors were treated like ordinary homebuyers. Brokers tried to cram complex multi-unit portfolios and LLC holding entities into conventional tax-return boxes, resulting in months of underwriting headaches and killed deals.
                </p>
                <p
                  data-editable="true"
                  data-original-text="I built Hale Capital Lending on a completely different thesis: a real estate loan should be qualified on the asset itself. Does the property produce sufficient income to service its debt? Is there a conservative margin of safety? If yes, the financing should be straightforward and fast."
                >
                  I built Hale Capital Lending on a completely different thesis: a real estate loan should be qualified on the asset itself. Does the property produce sufficient income to service its debt? Is there a conservative margin of safety? If yes, the financing should be straightforward and fast.
                </p>
                <p
                  data-editable="true"
                  data-original-text="Today, between structuring loans, recording weekly YouTube breakdowns, keynote speaking, and advising other mortgage professionals, my work remains centered on one mission: total clarity on capital."
                >
                  Today, between structuring loans, recording weekly YouTube breakdowns, keynote speaking, and advising other mortgage professionals, my work remains centered on one mission: total clarity on capital.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button variant="primary" size="md" onClick={() => openBooking()}>
                  Book a conversation
                </Button>
                <a
                  href="#credentials"
                  className="editorial-link text-xs font-semibold uppercase tracking-wider text-ink-900 inline-flex items-center"
                >
                  View credentials & licensing ↓
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Four Roles Compact Entries (Cream-100) */}
      <Section band="cream-100" aria-label="The Four Practices">
        <Container>
          <div className="pb-8 border-b border-line">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
              Architecture of the Practice
            </span>
            <h2 className="heading-h2 text-ink-900">
              Four distinct roles, one standard of rigor.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                to={pillar.route}
                className="p-6 bg-paper rounded-sm border border-line hover:border-gold-500 transition-colors space-y-3 group"
              >
                <span className="text-xs uppercase tracking-wider text-gold-700 font-mono font-semibold">
                  {pillar.number}
                </span>
                <h3 className="font-display text-lg text-ink-900 group-hover:text-gold-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-ink-600 font-sans leading-relaxed">
                  {pillar.description}
                </p>
                <div className="pt-2 text-xs font-semibold text-ink-900 group-hover:text-gold-700 inline-flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Journey Timeline (Navy, Expandable on click) */}
      <Section band="navy" aria-labelledby="journey-heading">
        <Container size="narrow">
          <div className="pb-10 border-b border-line-dark text-center">
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block mb-2">
              Career Milestones
            </span>
            <h2 id="journey-heading" className="heading-h2 text-cream-100">
              The Path to Hale Capital
            </h2>
            <p className="text-xs sm:text-sm text-cream-400 mt-2">
              Click any milestone to view background details.
            </p>
          </div>

          <div className="pt-10 space-y-6">
            {JOURNEY.map((item, idx) => {
              const isExpanded = expandedJourneyIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setExpandedJourneyIdx(isExpanded ? null : idx)}
                  role="button"
                  tabIndex={0}
                  className="p-6 bg-navy-700/60 rounded-sm border border-line-dark hover:border-gold-500/50 transition-colors cursor-pointer space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gold-300 px-2 py-0.5 rounded bg-navy-900">
                      {item.year}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-cream-400 transition-transform ${
                        isExpanded ? 'rotate-180 text-gold-300' : ''
                      }`}
                    />
                  </div>

                  <h3 className="font-display text-lg text-cream-100 group-hover:text-gold-100">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300 font-sans leading-relaxed">
                    {item.summary}
                  </p>

                  {isExpanded && (
                    <div className="pt-3 border-t border-line-dark text-xs text-cream-400 leading-relaxed font-sans animate-in fade-in duration-fast">
                      {item.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Credentials & Licensing (Cream) */}
      <Section band="cream" id="credentials" aria-labelledby="credentials-heading">
        <Container size="narrow">
          <div className="pb-8 border-b border-line text-center">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              Regulatory Standing
            </span>
            <h2 id="credentials-heading" className="heading-h2 text-ink-900">
              Licensing & Credentials
            </h2>
          </div>

          <div className="p-8 bg-paper rounded-sm border border-line space-y-4 my-8">
            <ul className="divide-y divide-line text-sm text-ink-900 font-sans">
              <li className="py-3 flex justify-between items-center">
                <span className="font-medium">Individual Originator NMLS</span>
                <span className="font-mono text-gold-700">{brandConfig.nmlsIndividual}</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="font-medium">Company Entity NMLS</span>
                <span className="font-mono text-gold-700">{brandConfig.nmlsCompany}</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="font-medium">National Affiliations</span>
                <span className="text-ink-600">AAMB, Mortgage Bankers Assoc (MBA)</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="font-medium">Business Capital Footprint</span>
                <span className="text-ink-600">Commercial / Non-QM in 45+ States</span>
              </li>
            </ul>

            <div className="text-[11px] text-ink-400 pt-3 border-t border-line text-center">
              Note: Credentials above represent stand-in placeholders to be verified and supplied by the client at production handoff.
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Photo Mosaic (Cream) */}
      <Section band="cream-100" id="mosaic" aria-labelledby="mosaic-heading">
        <Container>
          <div className="pb-10 border-b border-line">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
              Field Work & Media
            </span>
            <h2 id="mosaic-heading" className="heading-h2 text-ink-900">
              Moments from the practice.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {assetManifest.about.mosaic.map((item) => (
              <div
                key={item.id}
                className="bg-paper p-3 rounded-sm border border-line shadow-sm space-y-2 group"
              >
                <div className={`overflow-hidden rounded-[2px] bg-navy-900 ${item.aspect}`}>
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-slow"
                  />
                </div>
                <p className="text-xs text-ink-600 font-sans px-1">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Connect Social Row (Charcoal) */}
      <Section band="charcoal" aria-label="Social Profiles and Direct Connect">
        <Container size="narrow" className="text-center space-y-8">
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
            Direct Channels
          </span>
          <h2 className="heading-h2 text-cream-100">
            Connect directly across the web.
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
            <Tooltip label="YouTube (12K+ Subscribers)">
              <a
                href={brandConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-navy-900 rounded-full border border-line-dark text-cream-100 hover:text-gold-300 hover:border-gold-500 transition-all duration-fast"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </Tooltip>

            <Tooltip label="LinkedIn Profile">
              <a
                href={brandConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-navy-900 rounded-full border border-line-dark text-cream-100 hover:text-gold-300 hover:border-gold-500 transition-all duration-fast"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Tooltip>

            <Tooltip label="Instagram @marcushale">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-navy-900 rounded-full border border-line-dark text-cream-100 hover:text-gold-300 hover:border-gold-500 transition-all duration-fast"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </Tooltip>

            <Tooltip label="Direct Inquiries Email">
              <a
                href={`mailto:${brandConfig.email}`}
                className="p-3.5 bg-navy-900 rounded-full border border-line-dark text-cream-100 hover:text-gold-300 hover:border-gold-500 transition-all duration-fast"
                aria-label="Email Marcus Hale"
              >
                <Mail className="w-5 h-5" />
              </a>
            </Tooltip>
          </div>
        </Container>
      </Section>
    </div>
  );
};
