import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brandConfig } from '../brand.config';
import { useSeo } from '../hooks/useSeo';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';

export const Legal: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname === '/privacy';
  const isTerms = location.pathname === '/terms';
  const isDisclosures = location.pathname === '/disclosures';

  useSeo(location.pathname);

  const [activeSectionId, setActiveSectionId] = useState<string>('sec-1');

  // Scroll spy for sticky TOC per PRD 11 & 14.8
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('article h2[id]');
      const scrollPos = window.scrollY + 120;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i] as HTMLElement;
        if (scrollPos >= el.offsetTop) {
          setActiveSectionId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const privacySections = [
    { id: 'sec-1', title: 'Information We Collect' },
    { id: 'sec-2', title: 'How We Use Your Information' },
    { id: 'sec-3', title: 'Cookies and Tracking Technologies' },
    { id: 'sec-4', title: 'Data Security & Retention' },
    { id: 'sec-5', title: 'Your Rights & Contact' },
  ];

  const termsSections = [
    { id: 'sec-1', title: 'Use of This Site' },
    { id: 'sec-2', title: 'No Commitment to Lend' },
    { id: 'sec-3', title: 'Intellectual Property' },
    { id: 'sec-4', title: 'Third-Party Links & Disclaimer' },
    { id: 'sec-5', title: 'Limitation of Liability' },
  ];

  const disclosureSections = [
    { id: 'sec-1', title: 'Mortgage Licensing Disclosures' },
    { id: 'sec-2', title: 'Equal Housing Opportunity' },
    { id: 'sec-3', title: 'Business Purpose Limitation' },
    { id: 'sec-4', title: 'State Regulatory Registry' },
  ];

  const toc = isPrivacy ? privacySections : isTerms ? termsSections : disclosureSections;
  const pageTitle = isPrivacy ? 'Privacy Policy' : isTerms ? 'Terms of Use' : 'Mortgage Disclosures';

  return (
    <div id="main-content" className="w-full">
      <Section band="cream" padding="compact" className="pt-28 md:pt-36">
        <Container>
          {/* Header Banner */}
          <div className="pb-8 border-b border-line space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
              Regulatory & Legal Framework
            </span>
            <h1 className="heading-h1 text-ink-900">{pageTitle}</h1>
            <div className="p-3 bg-cream-100 border-l-2 border-gold-500 text-xs text-ink-700 font-sans max-w-2xl">
              Framework only: final language to be verified and supplied by legal compliance counsel.
            </div>
          </div>

          {/* Two-Column Layout: Sticky TOC Left, Content Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
            {/* Sticky Table of Contents (cols 1-4) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-4 p-6 bg-paper rounded-sm border border-line">
                <span className="text-xs uppercase tracking-wider font-semibold text-ink-900 block pb-2 border-b border-line">
                  Table of Contents
                </span>
                <nav className="space-y-2 text-xs">
                  {toc.map((item) => {
                    const isActive = activeSectionId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center gap-2 py-1 transition-colors ${
                          isActive
                            ? 'text-gold-700 font-semibold'
                            : 'text-ink-600 hover:text-ink-900'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isActive ? 'bg-gold-500' : 'bg-transparent'
                          }`}
                        />
                        <span>{item.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Article Content Column (cols 5-12, max 680px editorial) */}
            <article className="lg:col-span-8 max-w-[680px] space-y-12 text-sm sm:text-base text-ink-700 font-sans leading-relaxed">
              {isPrivacy && (
                <>
                  <section id="sec-1" className="space-y-3">
                    <h2 id="sec-1" className="font-display text-2xl text-ink-900 font-semibold">
                      1. Information We Collect
                    </h2>
                    <p>
                      We collect information you provide directly through inquiries, scheduling requests, and advisory applications. This includes contact details (full name, business email address, phone number), event parameters, and high-level investment property numbers.
                    </p>
                  </section>

                  <section id="sec-2" className="space-y-3">
                    <h2 id="sec-2" className="font-display text-2xl text-ink-900 font-semibold">
                      2. How We Use Your Information
                    </h2>
                    <p>
                      Your information is strictly used to evaluate proposed loan scenarios, schedule advisory discovery calls, and communicate regarding speaking engagements. We do not sell or monetize personal borrower data.
                    </p>
                  </section>

                  <section id="sec-3" className="space-y-3">
                    <h2 id="sec-3" className="font-display text-2xl text-ink-900 font-semibold">
                      3. Cookies and Tracking Technologies
                    </h2>
                    <p>
                      We use essential session cookies for navigational routing and form draft preservation. Optional analytics cookies measure anonymous visitor counts and outbound link interactions. You can adjust your preferences at any time via the cookie settings link.
                    </p>
                  </section>

                  <section id="sec-4" className="space-y-3">
                    <h2 id="sec-4" className="font-display text-2xl text-ink-900 font-semibold">
                      4. Data Security & Retention
                    </h2>
                    <p>
                      Data transmitted via inquiries is protected using industry-standard TLS encryption. Application drafts are retained locally in session storage and cleared upon submission.
                    </p>
                  </section>

                  <section id="sec-5" className="space-y-3">
                    <h2 id="sec-5" className="font-display text-2xl text-ink-900 font-semibold">
                      5. Your Rights & Contact
                    </h2>
                    <p>
                      You may request access to, correction of, or deletion of your personal contact records by contacting {brandConfig.email}.
                    </p>
                  </section>
                </>
              )}

              {isTerms && (
                <>
                  <section id="sec-1" className="space-y-3">
                    <h2 id="sec-1" className="font-display text-2xl text-ink-900 font-semibold">
                      1. Use of This Site
                    </h2>
                    <p>
                      This website is intended for residential real estate investors, event organizers, and mortgage professionals seeking information on capital programs, educational media, and speaking availability.
                    </p>
                  </section>

                  <section id="sec-2" className="space-y-3">
                    <h2 id="sec-2" className="font-display text-2xl text-ink-900 font-semibold">
                      2. No Commitment to Lend
                    </h2>
                    <p>
                      Nothing contained on this site, including the DSCR ratio check tool and sample timelines, constitutes an offer, rate lock, approval, or commitment to lend. All financing terms depend upon property underwriting, verified equity, and final guidelines.
                    </p>
                  </section>

                  <section id="sec-3" className="space-y-3">
                    <h2 id="sec-3" className="font-display text-2xl text-ink-900 font-semibold">
                      3. Intellectual Property
                    </h2>
                    <p>
                      All editorial copy, diagrams, videos, and book excerpts from <em>The DSCR Illusion</em> are the copyrighted intellectual property of {brandConfig.name} and {brandConfig.firm}.
                    </p>
                  </section>

                  <section id="sec-4" className="space-y-3">
                    <h2 id="sec-4" className="font-display text-2xl text-ink-900 font-semibold">
                      4. Third-Party Links & Disclaimer
                    </h2>
                    <p>
                      This site provides links to external services such as YouTube, Amazon, and LinkedIn. We are not responsible for the privacy practices or content of third-party platforms.
                    </p>
                  </section>

                  <section id="sec-5" className="space-y-3">
                    <h2 id="sec-5" className="font-display text-2xl text-ink-900 font-semibold">
                      5. Limitation of Liability
                    </h2>
                    <p>
                      In no event shall {brandConfig.firm} or its affiliates be liable for decisions made based on informational educational calculators or podcast commentary.
                    </p>
                  </section>
                </>
              )}

              {isDisclosures && (
                <>
                  <section id="sec-1" className="space-y-3">
                    <h2 id="sec-1" className="font-display text-2xl text-ink-900 font-semibold">
                      1. Mortgage Licensing Disclosures
                    </h2>
                    <p>
                      {brandConfig.complianceNotice}
                    </p>
                  </section>

                  <section id="sec-2" className="space-y-3">
                    <h2 id="sec-2" className="font-display text-2xl text-ink-900 font-semibold">
                      2. Equal Housing Opportunity
                    </h2>
                    <p>
                      We conduct business in full compliance with the Federal Fair Housing Act and the Equal Credit Opportunity Act. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, or age.
                    </p>
                  </section>

                  <section id="sec-3" className="space-y-3">
                    <h2 id="sec-3" className="font-display text-2xl text-ink-900 font-semibold">
                      3. Business Purpose Limitation
                    </h2>
                    <p>
                      All financing programs referenced on this site (including DSCR, Fix & Flip, and Ground-Up Construction) are commercial, business-purpose debt facilities intended for investment residential real estate. We do not originate consumer owner-occupied mortgages on primary residences.
                    </p>
                  </section>

                  <section id="sec-4" className="space-y-3">
                    <h2 id="sec-4" className="font-display text-2xl text-ink-900 font-semibold">
                      4. State Regulatory Registry (Illustrative Sample)
                    </h2>
                    <div className="overflow-x-auto border border-line rounded-sm bg-paper text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-cream-100 border-b border-line text-ink-900">
                          <tr>
                            <th className="p-3">State / Jurisdiction</th>
                            <th className="p-3">Regulatory Agency</th>
                            <th className="p-3">License Number</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line font-mono text-[11px]">
                          <tr>
                            <td className="p-3">Texas</td>
                            <td className="p-3 font-sans">TX Dept of Savings and Mortgage</td>
                            <td className="p-3">NMLS #000000</td>
                          </tr>
                          <tr>
                            <td className="p-3">Florida</td>
                            <td className="p-3 font-sans">Office of Financial Regulation</td>
                            <td className="p-3">NMLS #000000</td>
                          </tr>
                          <tr>
                            <td className="p-3">California</td>
                            <td className="p-3 font-sans">DFPI Financing Law License</td>
                            <td className="p-3">NMLS #000000</td>
                          </tr>
                          <tr>
                            <td className="p-3">Georgia</td>
                            <td className="p-3 font-sans">Dept of Banking and Finance</td>
                            <td className="p-3">NMLS #000000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </>
              )}
            </article>
          </div>
        </Container>
      </Section>
    </div>
  );
};
