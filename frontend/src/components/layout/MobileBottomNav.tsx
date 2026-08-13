import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Trophy, Target, User, MoreHorizontal } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Learn', href: '/learn', icon: Home, activeColor: 'text-[#58cc02]' },
    { name: 'Practice', href: '/practice', icon: Dumbbell, activeColor: 'text-[#1cb0f6]' },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy, activeColor: 'text-[#ffc800]' },
    { name: 'Quests', href: '/quests', icon: Target, activeColor: 'text-[#ff9600]' },
    { name: 'Profile', href: '/profile', icon: User, activeColor: 'text-[#ff4b4b]' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t-2 border-[#e5e5e5] flex items-center justify-around z-40 md:hidden select-none px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === '/learn' && pathname === '/');
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-[#1cb0f6]' : 'text-[#afafaf] hover:text-[#777]'
            }`}
          >
            <Icon className={`w-6 h-6 stroke-[2.5] ${isActive ? item.activeColor : ''}`} />
          </Link>
        );
      })}
    </nav>
  );
};
