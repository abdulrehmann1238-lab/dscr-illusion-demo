import React, { useState } from 'react';
import { ArrowRight, Download, Users, FileText } from 'lucide-react';
import { talkTopics, TalkTopic } from '../data/talks';
import { assetManifest } from '../assets/manifest';
import { useSeo } from '../hooks/useSeo';
import { useToastStore } from '../store/toasts';
import { useHandoffStore } from '../store/handoff';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Segmented';
import { ImageUnveil } from '../components/motion/ImageUnveil';
import { SpeakingForm } from '../components/features/SpeakingForm';

export const Speaking: React.FC = () => {
  useSeo('/speaking');
  const { addToast } = useToastStore();
  const { logAnalyticsEvent } = useHandoffStore();

  const [audience, setAudience] = useState<'mortgage' | 'real-estate'>('mortgage');
  const [preselectedTopic, setPreselectedTopic] = useState<string | undefined>(undefined);

  const currentTopics = talkTopics.filter((t) => t.audience === audience);

  const handleDownloadOneSheet = () => {
    logAnalyticsEvent('speaking_download_onesheet');
    addToast({
      message: 'Speaker one-sheet will be provided at handoff.',
      type: 'info',
    });
  };

  const handleInquireTopic = (topicTitle: string) => {
    setPreselectedTopic(topicTitle);
    const formEl = document.getElementById('inquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="main-content" className="w-full">
      {/* 1. Header (Navy) */}
      <Section band="navy" padding="compact" className="pt-28 md:pt-36">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-line-dark">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
                Conference Keynotes & Workshops
              </span>
              <h1 className="heading-h1 text-cream-100">
                Practical sessions, delivered like a conversation.
              </h1>
              <p
                data-editable="true"
                data-original-text="I speak at national mortgage symposiums, state broker associations, and private real estate investment clubs. Every session is grounded in live deal data and consumer-direct audience psychology."
                className="body-lede text-cream-300 max-w-xl font-sans"
              >
                I speak at national mortgage symposiums, state broker associations, and private real estate investment clubs. Every session is grounded in live deal data and consumer-direct audience psychology.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#inquiry-form">
                  <Button variant="gold-on-navy" size="lg" icon="arrow-right">
                    Send a speaking inquiry
                  </Button>
                </a>
                <Button
                  variant="ghost-dark"
                  size="lg"
                  onClick={handleDownloadOneSheet}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download speaker one-sheet</span>
                </Button>
              </div>
            </div>

            {/* Speaking Photograph */}
            <div className="lg:col-span-5">
              <ImageUnveil
                src={assetManifest.speaking.hero}
                alt="Marcus Hale speaking on stage at a mortgage conference"
                aspectRatio="aspect-[4/3] sm:aspect-[4/5]"
                delayMs={200}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Audience Switcher & Topics (Cream) */}
      <Section band="cream" id="topics" aria-labelledby="topics-heading">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
                Customized Presentation Tracks
              </span>
              <h2 id="topics-heading" className="heading-h2 text-ink-900">
                Select your audience profile.
              </h2>
            </div>

            <Segmented<'mortgage' | 'real-estate'>
              value={audience}
              onChange={setAudience}
              options={[
                { value: 'mortgage', label: 'Mortgage Audiences' },
                { value: 'real-estate', label: 'Real Estate Audiences' },
              ]}
            />
          </div>

          {/* Topics Ruled List per PRD 13.4 */}
          <div className="divide-y divide-line pt-4 animate-in fade-in duration-med" key={audience}>
            {currentTopics.map((topic) => (
              <div
                key={topic.id}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
              >
                <div className="lg:col-span-8 space-y-3">
                  <h3 className="heading-h3 text-ink-900 group-hover:text-gold-700 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-600 leading-relaxed font-sans max-w-2xl">
                    {topic.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {topic.formats.map((fmt, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-pill bg-cream-100 border border-line text-[11px] font-mono text-ink-700"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 lg:text-right pt-2">
                  <button
                    type="button"
                    onClick={() => handleInquireTopic(topic.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-900 hover:text-gold-700 transition-colors"
                  >
                    <span>Inquire about this topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. How It Works (Cream-100 Stepper) */}
      <Section band="cream-100" aria-label="Event Coordination Process">
        <Container>
          <div className="pb-10 border-b border-line text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-2">
              From Inquiry to Stage
            </span>
            <h2 className="heading-h2 text-ink-900">
              How we coordinate a speaking engagement.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {[
              {
                step: '01',
                title: 'Inquire',
                desc: 'Submit your dates, audience size, and target session objectives below.',
              },
              {
                step: '02',
                title: 'Fit Call',
                desc: 'A 15-minute briefing call with event leadership to align on exact themes.',
              },
              {
                step: '03',
                title: 'Customize',
                desc: 'I tailor scripts, slides, and local market case studies to your event tone.',
              },
              {
                step: '04',
                title: 'Deliver',
                desc: 'Engaging, conversational delivery with actionable frameworks attendees remember.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-6 bg-paper rounded-sm border border-line space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 text-xs font-mono font-bold flex items-center justify-center border border-gold-500/40">
                  {st.step}
                </div>
                <h3 className="font-display text-lg text-ink-900">{st.title}</h3>
                <p className="text-xs sm:text-sm text-ink-600 font-sans leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Speaking Inquiry Form Section (Cream, Two-Column) */}
      <Section band="cream" id="inquiry-form" aria-labelledby="form-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Explanatory Column (cols 1-5) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
                Booking Inquiries
              </span>
              <h2 id="form-heading" className="heading-h2 text-ink-900">
                Let's make your next event memorable.
              </h2>
              <p className="text-sm sm:text-base text-ink-600 leading-relaxed font-sans">
                Whether you need an opening keynote for 500 mortgage professionals or an intensive breakout for residential real estate operators, fill out the details on the right to receive availability.
              </p>

              <div className="p-6 bg-paper rounded-sm border border-line space-y-4 text-xs font-sans text-ink-700">
                <div className="font-semibold text-ink-900 text-sm">
                  What Event Organizers Receive:
                </div>
                <ul className="space-y-2 list-disc pl-4 text-ink-600">
                  <li>Direct access for pre-event planning calls</li>
                  <li>Complimentary attendee slides & workbook PDFs</li>
                  <li>Optional live Q&A or moderated panel participation</li>
                  <li>Prompt travel logistics and clear contracts</li>
                </ul>
              </div>
            </div>

            {/* Right Multi-Field Form Column (cols 6-12) */}
            <div className="lg:col-span-7">
              <SpeakingForm
                initialAudience={audience}
                preselectedTopic={preselectedTopic}
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
