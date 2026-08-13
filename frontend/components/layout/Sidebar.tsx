'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Trophy, Target, ShoppingBag, User, MoreHorizontal } from 'lucide-react';
import { NavItem } from '../navigation/NavItem';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/learn', icon: <Home className="w-6 h-6" />, label: 'LEARN' },
    { href: '/practice', icon: <Dumbbell className="w-6 h-6" />, label: 'PRACTICE' },
    { href: '/leaderboard', icon: <Trophy className="w-6 h-6" />, label: 'LEADERBOARD' },
    { href: '/goals', icon: <Target className="w-6 h-6" />, label: 'GOALS' },
    { href: '/shop', icon: <ShoppingBag className="w-6 h-6" />, label: 'SHOP' },
    { href: '/profile', icon: <User className="w-6 h-6" />, label: 'PROFILE' },
    { href: '/settings', icon: <MoreHorizontal className="w-6 h-6" />, label: 'MORE' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[256px] h-screen sticky top-0 bg-white border-r-2 border-[#E5E5E5] px-4 py-6 z-30 justify-between">
      <div>
        {/* Vocably Wordmark Logo */}
        <div className="px-4 mb-8">
          <span className="text-3xl font-black tracking-tight text-[#58CC02] lowercase select-none">
            vocably
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href === '/learn' && pathname === '/');
            return (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
              />
            );
          })}
        </nav>
      </div>

      <div className="px-4 text-xs text-[#777777] font-semibold">
        © 2026 Vocably Inc.
      </div>
    </aside>
  );
};
