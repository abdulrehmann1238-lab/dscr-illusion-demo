import React, { useState } from 'react';
import { Loader } from '../components/marketing/Loader';
import { Navbar } from '../components/marketing/Navbar';
import { Hero } from '../components/marketing/Hero';
import { ProblemStory } from '../components/marketing/ProblemStory';
import { ConsoleTeaser } from '../components/marketing/ConsoleTeaser';
import { WorkCard, selectedBuilds } from '../components/marketing/WorkCard';
import { TimelineStrip } from '../components/marketing/TimelineStrip';
import { GrowthTeaser } from '../components/marketing/GrowthTeaser';
import { Footer } from '../components/marketing/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}

      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProblemStory />
        <ConsoleTeaser />

        {/* Selected Builds Section (PRD §8.5) */}
        <section className="py-20 sm:py-28 bg-surface border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-sm bg-secondary-soft/50 border border-secondary/20 inline-block mb-3">
                  Production Work
                </span>
                <h2 className="type-h2 text-text">
                  Original GHL builds that look and convert like a studio.
                </h2>
                <p className="type-body text-text-2 mt-2 max-w-xl">
                  Clean responsive typography, zero AI clutter, and instant lead capture pipelines built on proven snapshot architectures.
                </p>
              </div>

              <Link to="/work">
                <Button variant="secondary" size="md" className="shrink-0">
                  <span>View all 3 case studies</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedBuilds.map((build) => (
                <WorkCard key={build.id} build={build} />
              ))}
            </div>
          </div>
        </section>

        <TimelineStrip />
        <GrowthTeaser />
      </main>

      <Footer />
    </div>
  );
};
