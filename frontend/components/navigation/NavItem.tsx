'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-base transition-all duration-150 border-2 select-none uppercase tracking-wide',
          isActive
            ? 'bg-[#E5F6FF] text-[#1CB0F6] border-[#84D8FF]'
            : 'bg-transparent text-[#777777] border-transparent hover:bg-[#F7F7F7] hover:text-[#3C3C3C]'
        )
      )}
    >
      <div className={clsx('w-6 h-6 flex items-center justify-center', isActive ? 'text-[#1CB0F6]' : 'text-[#777777]')}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};
