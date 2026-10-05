import React, { useState, useEffect } from 'react';
import { X, Play, Pause, ExternalLink } from 'lucide-react';
import { VideoItem } from '../../data/videos';
import { useHandoffStore } from '../../store/handoff';

interface VideoLightboxProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const { logAnalyticsEvent, markFeatureVisited } = useHandoffStore();

  useEffect(() => {
    if (video) {
      setIsPlaying(false);
      setProgress(0);
      logAnalyticsEvent('video_open', { video_id: video.id, title: video.title });
      markFeatureVisited('videoLightbox');
    }
  }, [video, logAnalyticsEvent, markFeatureVisited]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && video) onClose();
      if (e.key === ' ' && video) {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose]);

  // Simulated 6-second playback progress loop when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1.6;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-lightbox-title"
      className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-8 bg-navy-900/80 backdrop-blur-md animate-in fade-in duration-med"
    >
      <div className="relative w-full max-w-5xl bg-navy-900 rounded-md border border-line-dark shadow-2 overflow-hidden flex flex-col animate-in zoom-in-95 duration-med">
        {/* Top bar with Topic and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line-dark text-cream-100">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-300">
              {video.topic}
            </span>
            <span className="text-xs text-cream-400">·</span>
            <span className="text-xs text-cream-400">{video.duration}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video player"
            className="p-1 text-cream-400 hover:text-cream-100 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Styled Player Shell per PRD 13.3 */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-slow ${
              isPlaying ? 'opacity-40' : 'opacity-85'
            }`}
          />

          {/* Navy overlay */}
          <div className="absolute inset-0 bg-navy-900/40 pointer-events-none" />

          {/* Center Play / Pause Button */}
          <button
            onClick={() => {
              const nextState = !isPlaying;
              setIsPlaying(nextState);
              logAnalyticsEvent('video_toggle_play', {
                video_id: video.id,
                playing: nextState,
              });
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="relative z-10 w-20 h-20 rounded-full bg-cream-100/90 text-navy-900 flex items-center justify-center shadow-2 transition-all duration-fast hover:scale-105 active:scale-95 group-hover:bg-cream-100"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current text-navy-900" />
            ) : (
              <Play className="w-8 h-8 fill-current text-navy-900 ml-1" />
            )}
          </button>

          {/* Bottom Player Controls & Animated Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-900/95 to-transparent flex flex-col gap-2">
            {/* Progress line */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-cream-300">
              <span>{isPlaying ? 'Playing preview' : 'Click to play simulation'}</span>
              <span>{video.duration}</span>
            </div>
          </div>
        </div>

        {/* Bottom Details Footer */}
        <div className="p-6 bg-navy-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="video-lightbox-title" className="font-display text-xl sm:text-2xl text-cream-100 mb-1">
              {video.title}
            </h2>
            <p className="text-xs sm:text-sm text-cream-400 font-sans">
              {video.summary}
            </p>
          </div>

          <a
            href={`https://youtube.com/watch?v=${video.ytId}`}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              logAnalyticsEvent('outbound_click', {
                destination: 'YouTube',
                video_id: video.id,
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-navy-900 text-gold-300 border border-gold-500/40 hover:bg-gold-500/10 transition-colors flex-shrink-0"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
