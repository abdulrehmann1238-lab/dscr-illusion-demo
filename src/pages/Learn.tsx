import React, { useState, useEffect } from 'react';
import { Search, Play, BookOpen, ExternalLink, RotateCcw } from 'lucide-react';
import { brandConfig } from '../brand.config';
import { videos, videoTopics, VideoItem } from '../data/videos';
import { bookData } from '../data/book';
import { api } from '../mock/api';
import { useSeo } from '../hooks/useSeo';
import { useHandoffStore } from '../store/handoff';
import { useToastStore } from '../store/toasts';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { Counter } from '../components/motion/Counter';
import { VideoCard } from '../components/media/VideoCard';
import { BookCover } from '../components/media/BookCover';
import { VideoLightbox } from '../components/overlays/VideoLightbox';
import { ExcerptDrawer } from '../components/overlays/ExcerptDrawer';

export const Learn: React.FC = () => {
  useSeo('/learn');
  const { logAnalyticsEvent } = useHandoffStore();
  const { addToast } = useToastStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'newest' | 'views'>('newest');
  const [limit, setLimit] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [displayedVideos, setDisplayedVideos] = useState<VideoItem[]>([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Overlays
  const [lightboxVideo, setLightboxVideo] = useState<VideoItem | null>(null);
  const [excerptDrawerOpen, setExcerptDrawerOpen] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .listVideos({
        topic: selectedTopic,
        q: searchQuery,
        sort: sortOption,
        limit,
      })
      .then((res) => {
        if (active) {
          setDisplayedVideos(res.items);
          setTotalMatches(res.total);
          setHasMore(res.hasMore);
        }
      });
    return () => {
      active = false;
    };
  }, [selectedTopic, searchQuery, sortOption, limit]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLimit((l) => l + 6);
      setIsLoadingMore(false);
      logAnalyticsEvent('video_load_more');
    }, 450);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All');
    setSortOption('newest');
  };

  const handleSubscribeClick = () => {
    logAnalyticsEvent('outbound_click', { destination: 'YouTube Subscribe' });
    addToast({
      message: 'Opening Marcus Hale YouTube Channel in a new tab.',
      type: 'info',
    });
    window.open(brandConfig.socials.youtube, '_blank', 'noopener,noreferrer');
  };

  const handleAmazonClick = () => {
    logAnalyticsEvent('outbound_click', { destination: 'Amazon - The DSCR Illusion' });
    addToast({
      message: 'Opening Amazon in a new tab.',
      type: 'info',
    });
    window.open(brandConfig.bookAmazonUrl, '_blank', 'noopener,noreferrer');
  };

  const latestVideo = videos[0];

  return (
    <div id="main-content" className="w-full">
      {/* 1. Header (Cream) */}
      <Section band="cream" padding="compact" className="pt-28 md:pt-36">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-line">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
                Education & Media
              </span>
              <h1 className="heading-h1 text-ink-900">
                Education that doesn't oversimplify.
              </h1>
              <p
                data-editable="true"
                data-original-text="Weekly video breakdowns on investor financing mechanics, plus a book that explains why DSCR calculations are far more nuanced than standard debt service formulas."
                className="body-lede text-ink-600 max-w-xl font-sans"
              >
                Weekly video breakdowns on investor financing mechanics, plus a book that explains why DSCR calculations are far more nuanced than standard debt service formulas.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setLightboxVideo(latestVideo)}
                >
                  <Play className="w-4 h-4 fill-current mr-2" />
                  <span>Watch the latest lesson</span>
                </Button>

                <a
                  href="#book"
                  className="editorial-link text-sm font-semibold uppercase tracking-wider text-ink-900"
                >
                  Get The DSCR Illusion ↓
                </a>
              </div>
            </div>

            {/* Latest Video Player Facade (cols 8-12) */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setLightboxVideo(latestVideo)}
                role="button"
                tabIndex={0}
                className="group relative aspect-video rounded-sm overflow-hidden bg-navy-900 border border-line shadow-2 cursor-pointer"
              >
                <img
                  src={latestVideo.thumbnail}
                  alt={latestVideo.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-slow"
                />
                <div className="absolute inset-0 bg-navy-900/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 text-navy-900 flex items-center justify-center shadow-1 group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-navy-900/85 backdrop-blur-sm rounded-sm text-xs text-cream-100 flex items-center justify-between">
                  <span className="font-semibold truncate max-w-[200px]">
                    {latestVideo.title}
                  </span>
                  <span className="font-mono text-gold-300">{latestVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Channel Stats Row */}
      <Section band="cream" padding="none" className="py-6 border-b border-line bg-paper">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="font-display text-3xl font-normal text-ink-900">
                <Counter value={12} suffix="K+" />
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-600 font-semibold border-l border-line pl-6">
                Active YouTube Subscribers
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSubscribeClick}
              icon="arrow-up-right"
            >
              Subscribe on YouTube
            </Button>
          </div>
        </Container>
      </Section>

      {/* 3. Video Library (Cream-100) */}
      <Section band="cream-100" id="library" aria-labelledby="library-heading">
        <Container>
          {/* Library Toolbar */}
          <div className="space-y-6 pb-10 border-b border-line">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
                  Masterclass Catalog
                </span>
                <h2 id="library-heading" className="heading-h2 text-ink-900">
                  Video Library
                </h2>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics or titles..."
                  className="w-full h-11 pl-10 pr-4 bg-paper text-ink-900 border border-line rounded-sm text-xs font-sans placeholder-ink-400 focus:outline-none focus:border-navy-900"
                />
                <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Filter Chips & Sort Select */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {videoTopics.map((topic) => (
                  <Chip
                    key={topic}
                    size="sm"
                    label={topic}
                    selected={selectedTopic === topic}
                    onClick={() => setSelectedTopic(topic)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-600 self-end sm:self-auto">
                <span>Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-paper border border-line rounded px-2.5 py-1 text-xs text-ink-900 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="views">Most Watched</option>
                </select>
              </div>
            </div>
          </div>

          {/* Videos Grid Area */}
          <div className="pt-10">
            {displayedVideos.length === 0 ? (
              // Empty Search State per PRD 13.3 & 16
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center mx-auto text-ink-400 border border-line">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-ink-900">
                  No videos match "{searchQuery}".
                </h3>
                <p className="text-xs text-ink-600 font-sans">
                  Try a broader keyword, or clear your active topic filters.
                </p>
                <div className="pt-2">
                  <Button variant="secondary" size="sm" onClick={handleClearFilters}>
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    <span>Clear filters</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {displayedVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onSelect={(v) => setLightboxVideo(v)}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="pt-12 text-center">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleLoadMore}
                  isLoading={isLoadingMore}
                >
                  Load more videos ({totalMatches - displayedVideos.length} remaining)
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 4. The DSCR Illusion Book Panel (Navy) */}
      <Section band="navy" id="book" aria-labelledby="book-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 3D Book Cover Left (cols 1-5) */}
            <div className="lg:col-span-5 flex justify-center">
              <BookCover onClick={() => setExcerptDrawerOpen(true)} />
            </div>

            {/* Book Details Right (cols 6-12) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block mb-2">
                  Now Available on Amazon
                </span>
                <h2 id="book-heading" className="heading-h1 text-cream-100">
                  {bookData.title}
                </h2>
                <p className="text-sm sm:text-base text-cream-300 font-sans mt-2">
                  {bookData.subtitle}
                </p>
              </div>

              {/* 3 Ruled Bullets per PRD 13.3 */}
              <div className="p-6 bg-navy-700/60 rounded-sm border border-line-dark space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
                  Core Lessons Covered
                </span>
                <ul className="space-y-3 text-xs sm:text-sm text-cream-200">
                  {bookData.learnings.map((l, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold-500 font-mono font-bold mt-0.5">
                        0{i + 1}
                      </span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  variant="gold-on-navy"
                  size="lg"
                  onClick={handleAmazonClick}
                  icon="arrow-up-right"
                >
                  Buy on Amazon
                </Button>
                <Button
                  variant="ghost-dark"
                  size="lg"
                  onClick={() => setExcerptDrawerOpen(true)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Look inside (Excerpt)</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lightbox & Drawer */}
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
