import React from 'react';
import { useInView } from '../../hooks/useInView';

interface LineRevealProps {
  lines: Array<{
    text: string;
    italicWord?: string;
    emphasized?: boolean;
  }>;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3';
  startDelay?: number;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  lines,
  className = '',
  tag: Tag = 'h1',
  startDelay = 0,
}) => {
  const { ref, inView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });

  return (
    <Tag ref={ref} className={`${className} overflow-hidden`}>
      {lines.map((line, idx) => {
        const parts = line.italicWord
          ? line.text.split(new RegExp(`(${line.italicWord})`, 'gi'))
          : [line.text];

        return (
          <span key={idx} className="block overflow-hidden pb-1">
            <span
              className={`block transition-transform duration-slow ease-editorial ${
                inView ? 'translate-y-0' : 'translate-y-full'
              }`}
              style={{
                transitionDelay: `${startDelay + idx * 90}ms`,
                transitionDuration: '900ms',
              }}
            >
              {parts.map((p, pIdx) =>
                line.italicWord && p.toLowerCase() === line.italicWord.toLowerCase() ? (
                  <em key={pIdx} className="italic font-display font-normal">
                    {p}
                  </em>
                ) : (
                  <span key={pIdx}>{p}</span>
                )
              )}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};
