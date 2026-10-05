import React from 'react';
import { bookData } from '../../data/book';

interface BookCoverProps {
  className?: string;
  onClick?: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`book-stage relative cursor-pointer select-none group ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Book cover: ${bookData.title} by ${bookData.author}`}
    >
      {/* 3D Book Container */}
      <div className="book-cover-3d relative w-56 sm:w-64 h-80 sm:h-92 bg-navy-900 text-cream-100 rounded-[3px] border border-gold-500/50 p-6 flex flex-col justify-between overflow-hidden">
        {/* Book Spine Hairline Accent */}
        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-gold-500/30" />
        <div className="absolute top-0 bottom-0 left-4 w-[0.5px] bg-white/10" />

        {/* Top Header Label */}
        <div className="pl-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300 font-semibold block">
            The Definitive Framework
          </span>
        </div>

        {/* Center Title & Graphic Frame */}
        <div className="pl-4 space-y-3">
          <div className="w-12 h-[1px] bg-gold-500" />
          <h3 className="font-display text-2xl sm:text-3xl font-normal leading-tight text-cream-100 tracking-tight">
            The DSCR <br />
            <em className="font-serif italic text-gold-300">Illusion</em>
          </h3>
          <p className="text-[11px] text-cream-400 font-sans leading-relaxed">
            {bookData.subtitle}
          </p>
        </div>

        {/* Author Footer */}
        <div className="pl-4 pt-4 border-t border-gold-500/30 flex items-center justify-between">
          <span className="font-display text-sm font-medium text-cream-100">
            {bookData.author}
          </span>
          <span className="text-[10px] text-gold-500 font-mono">
            {bookData.releaseYear}
          </span>
        </div>
      </div>
    </div>
  );
};
