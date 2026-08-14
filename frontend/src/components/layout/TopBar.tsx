import React from 'react';
import { Flame, Heart, Gem } from 'lucide-react';
import { User } from '@/lib/api/client';

interface TopBarProps {
  user?: User | null;
}

export const TopBar: React.FC<TopBarProps> = ({ user }) => {
  const streak = user?.current_streak ?? 0;
  const xp = user?.total_xp ?? 0;
  const hearts = user?.hearts ?? 5;
  const gems = user?.gems ?? 500;

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#e5e5e5]/80 h-[60px] sm:h-[64px] px-3 sm:px-6 flex items-center justify-between z-20 w-full max-w-[1056px] mx-auto select-none transition-all">
      {/* Course Flag Selector */}
      <button className="flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 rounded-xl hover:bg-[#f7f7f7] active:scale-95 border border-transparent hover:border-[#e5e5e5] transition-all">
        <span className="text-xl sm:text-2xl">🇮🇳</span>
        <span className="font-bold text-[#777] text-xs sm:text-sm uppercase tracking-wider">Hindi</span>
      </button>

      {/* Stats indicators */}
      <div className="flex items-center gap-3 sm:gap-6 font-bold text-xs sm:text-[15px]">
        {/* Streak */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#ff9600] cursor-pointer px-2 py-1 rounded-xl hover:bg-[#fff7eb] active:scale-95 transition-all">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff9600] stroke-[#ff9600]" />
          <span>{streak}</span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#1cb0f6] cursor-pointer px-2 py-1 rounded-xl hover:bg-[#f0f9ff] active:scale-95 transition-all">
          <Gem className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1cb0f6] stroke-[#1cb0f6]" />
          <span>{gems}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#ff4b4b] cursor-pointer px-2 py-1 rounded-xl hover:bg-[#fff0f0] active:scale-95 transition-all">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff4b4b] stroke-[#ff4b4b]" />
          <span>{hearts}</span>
        </div>
      </div>
    </header>
  );
};
