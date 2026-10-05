import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
}) => {
  const maxClass = {
    narrow: 'max-w-[680px]', // Editorial single-column measure per PRD 7.3
    default: 'max-w-[1280px]', // Standard 1280px container
    wide: 'max-w-[1440px]',
  }[size];

  return (
    <div className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${maxClass} ${className}`}>
      {children}
    </div>
  );
};
