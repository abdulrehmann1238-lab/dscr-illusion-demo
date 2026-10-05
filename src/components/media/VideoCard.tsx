import React from 'react';
import { Play } from 'lucide-react';
import { VideoItem } from '../../data/videos';
import { formatNumber } from '../../lib/format';

interface VideoCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect, className = '' }) => {
  return (
    <article
      onClick={() => onSelect(video)}
      className={`group cursor-pointer flex flex-col bg-paper rounded-sm border border-line hover:border-gold-500 transition-all duration-fast shadow-sm hover:shadow-1 overflow-hidden ${className}`}
    >
      {/* 16:9 Thumbnail Mask with hover scale 1.03 and play badge */}
      <div className="relative aspect-video w-full overflow-hidden bg-navy-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-slow ease-out group-hover:scale-103"
        />

        {/* Navy subtle overlay for consistent grade */}
        <div className="absolute inset-0 bg-navy-900/15 pointer-events-none" />

        {/* Hover Play Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-fast bg-navy-900/30">
          <div className="w-12 h-12 rounded-full bg-cream-100 text-navy-900 flex items-center justify-center shadow-1">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration Chip Bottom-Right per PRD 13.3 */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-[2px] bg-navy-900/85 text-cream-100 text-[11px] font-mono tracking-wider">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gold-700 block mb-2">
            {video.topic}
          </span>
          <h4 className="font-ui font-semibold text-base text-ink-900 line-clamp-2 leading-snug group-hover:text-navy-900 transition-colors">
            {video.title}
          </h4>
        </div>

        <div className="pt-4 mt-4 border-t border-line/60 flex items-center justify-between text-xs text-ink-600 font-sans">
          <span>{video.publishedAt}</span>
          <span className="tabular-nums">{formatNumber(video.views)} views</span>
        </div>
      </div>
    </article>
  );
};
