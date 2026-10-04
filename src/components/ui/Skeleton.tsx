import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  circle = false,
}) => {
  return (
    <div
      style={{ width, height }}
      className={cn(
        'bg-secondary-soft/50 animate-pulse',
        circle ? 'rounded-full' : 'rounded-sm',
        className
      )}
    />
  );
};
