import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Trophy, Target, User, MoreHorizontal } from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'LEARN', href: '/learn', icon: Home, activeColor: 'text-[#58cc02]' },
    { name: 'PRACTICE', href: '/practice', icon: Dumbbell, activeColor: 'text-[#1cb0f6]' },
    { name: 'LEADERBOARD', href: '/leaderboard', icon: Trophy, activeColor: 'text-[#ffc800]' },
    { name: 'QUESTS', href: '/quests', icon: Target, activeColor: 'text-[#ff9600]' },
    { name: 'PROFILE', href: '/profile', icon: User, activeColor: 'text-[#ff4b4b]' },
  ];

  return (
    <aside className="w-[256px] border-r-2 border-[#e5e5e5] h-screen sticky top-0 bg-white flex flex-col justify-between p-4 pt-6 select-none z-30 hidden md:flex">
      <div>
        {/* Brand Logo */}
        <Link href="/learn" className="px-4 mb-8 block">
          <span className="text-[32px] font-extrabold tracking-wide text-[#58cc02] font-sans">
            vocably
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/learn' && pathname === '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-bold tracking-wider transition-all duration-150 border-2 ${
                  isActive
                    ? 'border-[#84d8ff] bg-[#ddf4ff] text-[#1cb0f6]'
                    : 'border-transparent text-[#777] hover:bg-[#f7f7f7]'
                }`}
              >
                <Icon className={`w-7 h-7 stroke-[2.5] ${isActive ? 'text-[#1cb0f6]' : 'text-[#afaFAF]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 text-xs font-semibold text-[#afafaf] uppercase tracking-wider">
        Vocably Next.js v16
      </div>
    </aside>
  );
};
