'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-2xl p-5 border-2 border-[#E5E5E5] shadow-sm',
          variant === 'bordered' && 'border-b-4 border-b-[#E5E5E5]',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
