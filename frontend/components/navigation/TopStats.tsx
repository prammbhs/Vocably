'use client';

import React from 'react';
import { Flame, Gem, Heart } from 'lucide-react';
import { UserProfile } from '@/types/user';

interface TopStatsProps {
  user: UserProfile;
}

export const TopStats: React.FC<TopStatsProps> = ({ user }) => {
  const isStreakActive = user.streak > 0;

  return (
    <div className="flex items-center justify-between gap-4 md:gap-6 bg-white px-4 py-2.5 rounded-2xl border-2 border-[#E5E5E5] shadow-xs">
      {/* Language Selector */}
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-2xl" role="img" aria-label="English">
          🇺🇸
        </span>
      </div>

      {/* Streak */}
      <div
        className={`flex items-center gap-1.5 font-extrabold text-base ${
          isStreakActive ? 'text-[#FF9600]' : 'text-[#AFAFAF]'
        }`}
      >
        <Flame
          className={`w-6 h-6 ${
            isStreakActive ? 'fill-[#FF9600] text-[#FF9600]' : 'fill-[#AFAFAF] text-[#AFAFAF]'
          }`}
        />
        <span>{user.streak}</span>
      </div>

      {/* Gems */}
      <div className="flex items-center gap-1.5 font-extrabold text-base text-[#1CB0F6]">
        <Gem className="w-6 h-6 fill-[#1CB0F6] text-[#1CB0F6]" />
        <span>{user.gems}</span>
      </div>

      {/* Hearts */}
      <div className="flex items-center gap-1.5 font-extrabold text-base text-[#FF4B4B]">
        <Heart className="w-6 h-6 fill-[#FF4B4B] text-[#FF4B4B]" />
        <span>{user.hearts}</span>
      </div>
    </div>
  );
};
