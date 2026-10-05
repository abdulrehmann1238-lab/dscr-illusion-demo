import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { bookData } from '../../data/book';
import { brandConfig } from '../../brand.config';

interface ExcerptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcerptDrawer: React.FC<ExcerptDrawerProps> = ({ isOpen, onClose }) => {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if (e.key === 'ArrowRight' && isOpen) {
        setCurrentPageIdx((p) => Math.min(bookData.excerpts.length - 1, p + 1));
      }
      if (e.key === 'ArrowLeft' && isOpen) {
        setCurrentPageIdx((p) => Math.max(0, p - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const page = bookData.excerpts[currentPageIdx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="excerpt-drawer-title"
      className="fixed inset-0 z-drawer flex justify-end bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-med"
    >
      <div
        className="w-full sm:w-[500px] h-full bg-cream-50 text-ink-900 border-l border-line shadow-2 flex flex-col justify-between p-6 sm:p-10 overflow-y-auto animate-in slide-in-from-right duration-med"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <div className="flex items-center gap-2 text-gold-700">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                Look Inside: Sample Excerpt
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close excerpt preview"
              className="p-1 text-ink-600 hover:text-ink-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6">
            <h2 id="excerpt-drawer-title" className="font-display text-2xl font-normal text-ink-900 mb-1">
              {bookData.title}
            </h2>
            <div className="text-xs text-ink-600">
              By {brandConfig.name} · {page.chapterTitle}
            </div>
          </div>

          {/* Book Excerpt Text Spread */}
          <div className="bg-paper p-6 sm:p-8 rounded-sm border border-line shadow-1 space-y-4">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-ink-400 pb-3 border-b border-line/60">
              <span>{bookData.title}</span>
              <span>Page {page.pageNumber}</span>
            </div>

            <div className="space-y-4 font-display text-base sm:text-lg leading-relaxed text-ink-900">
              {page.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Page Navigation */}
        <div className="pt-6 border-t border-line flex items-center justify-between text-xs text-ink-600">
          <span className="font-sans">
            Page {currentPageIdx + 1} of {bookData.excerpts.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPageIdx === 0}
              onClick={() => setCurrentPageIdx((p) => p - 1)}
              className="p-2 border border-line rounded-sm hover:bg-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPageIdx === bookData.excerpts.length - 1}
              onClick={() => setCurrentPageIdx((p) => p + 1)}
              className="p-2 border border-line rounded-sm hover:bg-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
