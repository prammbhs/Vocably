'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Trophy, ShoppingBag, User } from 'lucide-react';
import { clsx } from 'clsx';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/learn', icon: <Home className="w-6 h-6" />, label: 'Learn' },
    { href: '/practice', icon: <Dumbbell className="w-6 h-6" />, label: 'Practice' },
    { href: '/leaderboard', icon: <Trophy className="w-6 h-6" />, label: 'Leaderboard' },
    { href: '/shop', icon: <ShoppingBag className="w-6 h-6" />, label: 'Shop' },
    { href: '/profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[76px] bg-white border-t-2 border-[#E5E5E5] flex items-center justify-around px-2 z-40">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href === '/learn' && pathname === '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors',
              isActive
                ? 'text-[#1CB0F6] bg-[#E5F6FF] border-2 border-[#84D8FF]'
                : 'text-[#777777] hover:text-[#3C3C3C]'
            )}
          >
            {item.icon}
            <span className="text-[10px] font-bold tracking-tight uppercase mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
