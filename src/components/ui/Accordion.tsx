import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-line border-t border-b border-line ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-2">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full py-4 flex items-center justify-between text-left group"
            >
              <span className="font-display text-lg md:text-xl text-ink-900 group-hover:text-gold-700 transition-colors duration-fast pr-6">
                {item.question}
              </span>
              <span className="flex-shrink-0 text-ink-600 group-hover:text-ink-900 transition-colors">
                {isOpen ? (
                  <Minus className="w-5 h-5 text-gold-700" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </span>
            </button>

            {/* Smooth CSS grid transition per PRD 13.2 (grid-template-rows: 0fr to 1fr) */}
            <div
              className={`grid transition-[grid-template-rows] duration-med ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm md:text-base text-ink-600 leading-relaxed max-w-3xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
