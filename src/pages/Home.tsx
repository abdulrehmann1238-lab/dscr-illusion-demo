import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowRight, Play, BookOpen, ChevronRight } from 'lucide-react';
import { brandConfig } from '../brand.config';
import { assetManifest } from '../assets/manifest';
import { pillars } from '../data/pillars';
import { videos } from '../data/videos';
import { bookData } from '../data/book';
import { useSeo } from '../hooks/useSeo';
import { useBookingStore } from '../store/booking';
import { useHandoffStore } from '../store/handoff';
import { useToastStore } from '../store/toasts';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { LineReveal } from '../components/motion/LineReveal';
import { Reveal } from '../components/motion/Reveal';
import { ImageUnveil } from '../components/motion/ImageUnveil';
import { RuleDraw } from '../components/motion/RuleDraw';
import { Counter } from '../components/motion/Counter';
import { PinnedStatements } from '../components/motion/PinnedStatements';
import { BookCover } from '../components/media/BookCover';
import { VideoLightbox } from '../components/overlays/VideoLightbox';
import { ExcerptDrawer } from '../components/overlays/ExcerptDrawer';

export const Home: React.FC = () => {
  useSeo('/');
  const { openBooking } = useBookingStore();
  const { logAnalyticsEvent } = useHandoffStore();
  const { addToast } = useToastStore();

  // Active pillar preview image state (cols 8-12)
  const [activePillarIdx, setActivePillarIdx] = useState(0);

  // Modals / Lightbox state
  const [lightboxVideo, setLightboxVideo] = useState<typeof videos[0] | null>(null);
  const [excerptDrawerOpen, setExcerptDrawerOpen] = useState(false);

  const featuredVideo = videos[0];

  const handleAmazonClick = () => {
    logAnalyticsEvent('outbound_click', { destination: 'Amazon - The DSCR Illusion' });
    addToast({
      message: 'Opening Amazon in a new tab.',
      type: 'info',
    });
    window.open(brandConfig.bookAmazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="main-content" className="w-full">
      {/* ============================================================== */}
      {/* 1. HERO SECTION (Navy with ambient video & portrait) */}
      {/* ============================================================== */}
      <section
        data-band="navy"
        className="relative min-h-[92vh] sm:min-h-screen flex items-center bg-navy-900 text-cream-100 on-navy pt-24 pb-16 overflow-hidden"
        aria-label="Introduction"
      >
        {/* Ambient Video Background Layer with Poster Fallback */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={assetManifest.hero.videoPoster}
            className="w-full h-full object-cover scale-105"
          >
            <source src={assetManifest.hero.videoWebm} type="video/webm" />
            <source src={assetManifest.hero.videoMp4} type="video/mp4" />
          </video>
          {/* Graded navy overlay for legible text per PRD 13.1 */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/60" />
        </div>

        <Container className="relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & Action Column (cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="animate-in fade-in duration-med">
                <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold font-ui">
                  {brandConfig.tagline}
                </span>
              </div>

              {/* Masked Line-by-Line Headline per PRD 10 & 13.1 */}
              <LineReveal
                tag="h1"
                className="display-hero text-cream-100 max-w-2xl"
                lines={[
                  { text: 'Financing that reads the' },
                  { text: 'deal the way an investor does.', italicWord: 'investor' },
                ]}
              />

              {/* Lede Text */}
              <Reveal delayMs={200}>
                <p
                  data-editable="true"
                  data-original-text={brandConfig.ledeHero}
                  className="body-lede text-cream-300 max-w-xl font-sans"
                >
                  {brandConfig.ledeHero}
                </p>
              </Reveal>

              {/* Buttons */}
              <Reveal delayMs={350}>
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <Button
                    variant="gold-on-navy"
                    size="lg"
                    onClick={() => {
                      logAnalyticsEvent('cta_click', { label: 'Book a call (Hero)' });
                      openBooking();
                    }}
                    icon="arrow-right"
                  >
                    Book a call
                  </Button>

                  <a
                    href="#four-paths"
                    onClick={() => logAnalyticsEvent('nav_click', { destination: 'Four Paths' })}
                    className="group inline-flex items-center gap-2 text-sm text-cream-300 hover:text-gold-300 transition-colors"
                  >
                    <span>Explore the four paths</span>
                    <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Portrait & Offset Gold Frame (cols 8-12) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* 1px Gold offset frame line per PRD 13.1 */}
                <div
                  className="hidden sm:block absolute -inset-4 border border-gold-500/40 rounded-sm pointer-events-none animate-in fade-in duration-slow delay-700"
                  aria-hidden="true"
                />

                <ImageUnveil
                  src={assetManifest.hero.portrait}
                  alt={assetManifest.hero.portraitAlt}
                  aspectRatio="aspect-[4/5]"
                  delayMs={300}
                />

                {/* Hero Detail Card: Latest on the channel (bottom-right) */}
                <div
                  onClick={() => setLightboxVideo(featuredVideo)}
                  role="button"
                  tabIndex={0}
                  className="absolute -bottom-6 -left-4 sm:-left-8 z-10 p-3.5 bg-cream-50 text-ink-900 rounded-sm shadow-2 border border-line flex items-center gap-3.5 max-w-[280px] sm:max-w-xs cursor-pointer group hover:border-gold-500 transition-all duration-fast"
                >
                  <div className="relative w-14 h-14 rounded-sm bg-navy-900 flex-shrink-0 overflow-hidden">
                    <img
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-navy-900/30 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-cream-100 text-cream-100" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold block">
                      Latest on the Channel · {featuredVideo.duration}
                    </span>
                    <div className="text-xs font-semibold text-ink-900 line-clamp-1 group-hover:text-gold-700">
                      {featuredVideo.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Cue Vertical Indicator */}
          <div className="hidden lg:flex flex-col items-center justify-center pt-16">
            <span className="text-[10px] uppercase tracking-widest text-gold-500/80 mb-2">Scroll</span>
            <div className="w-[1px] h-10 bg-gold-500/40 relative overflow-hidden">
              <div className="w-full h-3 bg-gold-300 animate-pulse" />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================== */}
      {/* 2. FOUR PATHS (Cream band, numbered rows with sticky preview) */}
      {/* ============================================================== */}
      <Section id="four-paths" band="cream" aria-labelledby="paths-heading">
        <Container>
          <div className="pb-12 border-b border-line">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              Four ways to work with me
            </span>
            <h2 id="paths-heading" className="heading-h2 text-ink-900 max-w-2xl">
              One practice, built around how investors actually grow.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
            {/* Left 4 Ruled Rows (cols 1-7) */}
            <div className="lg:col-span-7 divide-y divide-line">
              {pillars.map((pillar, idx) => {
                const isActive = activePillarIdx === idx;
                return (
                  <Link
                    key={pillar.id}
                    to={pillar.route}
                    onMouseEnter={() => setActivePillarIdx(idx)}
                    onFocus={() => setActivePillarIdx(idx)}
                    className="group block py-8 transition-colors"
                  >
                    {/* Tablet/mobile: 16:9 thumbnail shown directly */}
                    <div className="lg:hidden mb-4 rounded-sm overflow-hidden aspect-video bg-navy-900">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold font-mono">
                            {pillar.number}
                          </span>
                          <h3 className="heading-h3 text-ink-900 group-hover:text-gold-700 transition-colors">
                            {pillar.title}
                          </h3>
                        </div>
                        <p className="text-sm text-ink-600 leading-relaxed font-sans max-w-lg">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-2 text-ink-400 group-hover:text-gold-700 transition-transform duration-fast group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right Sticky 4:5 Image Preview (cols 8-12 desktop) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-28 aspect-[4/5] rounded-md overflow-hidden bg-navy-900 border border-line shadow-1">
                {pillars.map((p, idx) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt={p.imageAlt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-med ${
                      activePillarIdx === idx ? 'opacity-90' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-navy-900/15 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-paper/95 backdrop-blur-sm rounded-sm border border-line text-xs font-sans flex items-center justify-between">
                  <span className="text-ink-900 font-medium">
                    {pillars[activePillarIdx]?.title}
                  </span>
                  <span className="text-gold-700 font-mono">
                    {pillars[activePillarIdx]?.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================== */}
      {/* 3. WHAT I BELIEVE (Navy band, 300vh pinned statements) */}
      {/* ============================================================== */}
      <PinnedStatements />

      {/* ============================================================== */}
      {/* 4. FINANCING PREVIEW (Cream band, 3 columns with oversize numerals) */}
      {/* ============================================================== */}
      <Section band="cream" aria-labelledby="financing-preview-heading">
        <Container>
          <div className="pb-12 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
                Capital Programs
              </span>
              <h2 id="financing-preview-heading" className="heading-h2 text-ink-900">
                Three ways I finance investment property.
              </h2>
            </div>
            <Link
              to="/financing"
              className="text-xs uppercase tracking-wider font-semibold text-gold-700 hover:text-ink-900 inline-flex items-center gap-1.5"
            >
              <span>Explore all financing programs</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              {
                numeral: 'DSCR',
                label: 'Long-Term Rentals',
                desc: '30-year fixed loans qualified on rental income rather than personal W-2 debt-to-income.',
                anchor: '/financing#dscr',
              },
              {
                numeral: 'Fix & Flip',
                label: 'Short-Term Value Add',
                desc: '12 to 24 month interest-only capital with 100% financed rehab holdbacks and 48hr draw releases.',
                anchor: '/financing#fix-and-flip',
              },
              {
                numeral: 'Ground-Up',
                label: 'New Construction',
                desc: 'Infill residential build financing for experienced general contractors and portfolio developers.',
                anchor: '/financing#ground-up',
              },
            ].map((col, idx) => (
              <div
                key={idx}
                className="group p-8 bg-paper rounded-sm border border-line hover:border-gold-500 transition-all duration-fast space-y-4"
              >
                <div className="font-display text-4xl sm:text-5xl text-gold-700 font-light group-hover:text-navy-900 transition-colors">
                  {col.numeral}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-ink-600">
                  {col.label}
                </div>
                <p className="text-sm text-ink-600 leading-relaxed font-sans">
                  {col.desc}
                </p>
                <div className="pt-2">
                  <Link
                    to={col.anchor}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-900 group-hover:text-gold-700 transition-colors"
                  >
                    <span>See how it works</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================== */}
      {/* 5. LEARN PREVIEW (Charcoal band #26292E, video left, book right) */}
      {/* ============================================================== */}
      <Section band="charcoal" aria-labelledby="learn-preview-heading">
        <Container>
          <div className="pb-12 border-b border-line-dark flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block mb-2">
                Education & Media
              </span>
              <h2 id="learn-preview-heading" className="heading-h2 text-cream-100">
                Education that doesn't oversimplify.
              </h2>
            </div>
            <Link
              to="/learn"
              className="text-xs uppercase tracking-wider font-semibold text-gold-300 hover:text-cream-100 inline-flex items-center gap-1.5"
            >
              <span>View full video library</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
            {/* Left Featured Video (cols 1-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div
                onClick={() => setLightboxVideo(featuredVideo)}
                role="button"
                tabIndex={0}
                className="group relative aspect-video rounded-sm overflow-hidden bg-navy-900 border border-line-dark shadow-2 cursor-pointer"
              >
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-slow"
                />
                <div className="absolute inset-0 bg-navy-900/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 text-navy-900 flex items-center justify-center shadow-1 group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-[2px] bg-navy-900/90 text-cream-100 text-xs font-mono">
                  {featuredVideo.duration}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold">
                  Featured Lesson · {featuredVideo.topic}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-cream-100 mt-1">
                  {featuredVideo.title}
                </h3>
              </div>
            </div>

            {/* Right The DSCR Illusion Book Panel (cols 8-12) */}
            <div className="lg:col-span-5 p-8 bg-navy-900/60 rounded-sm border border-line-dark flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
              <BookCover onClick={() => setExcerptDrawerOpen(true)} />

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
                  Author & Publication
                </span>
                <h3 className="font-display text-2xl text-cream-100">
                  {bookData.title}
                </h3>
                <p className="text-xs sm:text-sm text-cream-400 font-sans leading-relaxed">
                  {bookData.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="gold-on-navy"
                  size="md"
                  onClick={handleAmazonClick}
                  icon="arrow-up-right"
                >
                  Buy on Amazon
                </Button>
                <Button
                  variant="ghost-dark"
                  size="md"
                  onClick={() => setExcerptDrawerOpen(true)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Look inside</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================== */}
      {/* 6. PROOF STRIP (Cream band, 3 counters + pull quote) */}
      {/* ============================================================== */}
      <Section band="cream" padding="compact" aria-label="Audience and Track Record Proof">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-line text-center md:text-left">
            <div>
              <div className="text-4xl sm:text-5xl font-display text-ink-900 font-normal">
                <Counter value={12} suffix="K+" />
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-600 font-semibold mt-1">
                YouTube Subscribers
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-display text-ink-900 font-normal">
                <Counter value={1} suffix=" Book" />
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-600 font-semibold mt-1">
                Published on DSCR Underwriting
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-display text-ink-900 font-normal">
                <Counter value={3} suffix=" Programs" />
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-600 font-semibold mt-1">
                Dedicated Capital Lending Lines
              </div>
            </div>
          </div>

          <div className="pt-12 max-w-3xl mx-auto text-center space-y-4">
            <blockquote className="pull-quote text-ink-900">
              "Marcus looks at the debt structure through an operator's eyes. We closed our 4-unit refinance in 20 days with zero underwriting friction."
            </blockquote>
            <cite className="block text-xs uppercase tracking-widest text-gold-700 font-semibold not-italic font-sans">
              David R. · Portfolio Investor, Dallas TX (Sample layout testimonial)
            </cite>
          </div>
        </Container>
      </Section>

      {/* ============================================================== */}
      {/* 7. SPEAKING AND ADVISORY (Split: cream-100 / navy-700) */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2" aria-label="Speaking and Advisory">
        {/* Speaking Panel (Cream-100) */}
        <div className="p-10 sm:p-16 lg:p-20 bg-cream-100 text-ink-900 flex flex-col justify-between border-t md:border-r border-line group">
          <div className="space-y-4 max-w-md">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
              Conference & Event Speaking
            </span>
            <h3 className="heading-h2 text-ink-900">
              Practical sessions, delivered like a conversation.
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed font-sans">
              Sessions for mortgage teams and real estate audiences, built from real transaction data and organic video marketing experience.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/speaking"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-900 group-hover:text-gold-700 transition-colors"
            >
              <span>Explore speaking topics</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Advisory Panel (Navy-700) */}
        <div className="p-10 sm:p-16 lg:p-20 bg-navy-700 text-cream-100 on-navy flex flex-col justify-between border-t border-line-dark group">
          <div className="space-y-4 max-w-md">
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
              Strategic Video Advisory
            </span>
            <h3 className="heading-h2 text-cream-100">
              A video strategy built for how borrowers choose.
            </h3>
            <p className="text-sm text-cream-400 leading-relaxed font-sans">
              Private one-on-one consulting and selective small cohorts for mortgage professionals building a consumer-direct pipeline.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/advisory"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-300 group-hover:text-cream-100 transition-colors"
            >
              <span>Apply for advisory</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. CLOSING INVITATION (Navy) */}
      {/* ============================================================== */}
      <Section band="navy" padding="compact" aria-label="Closing Invitation">
        <Container className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="heading-h2 text-cream-100">
            Let's look at your next deal.
          </h2>
          <p className="text-sm sm:text-base text-cream-300 font-sans leading-relaxed">
            Thirty minutes. No pitch, just a clear read on what's possible.
          </p>
          <div className="pt-2">
            <Button
              variant="gold-on-navy"
              size="lg"
              onClick={() => {
                logAnalyticsEvent('cta_click', { label: 'Book a call (Closing)' });
                openBooking();
              }}
            >
              Book a call
            </Button>
          </div>
        </Container>
      </Section>

      {/* Overlays */}
      <VideoLightbox
        video={lightboxVideo}
        onClose={() => setLightboxVideo(null)}
      />
      <ExcerptDrawer
        isOpen={excerptDrawerOpen}
        onClose={() => setExcerptDrawerOpen(false)}
      />
    </div>
  );
};
