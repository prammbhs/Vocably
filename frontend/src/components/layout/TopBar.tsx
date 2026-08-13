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
    <header className="sticky top-0 bg-white/95 backdrop-blur border-b-2 border-[#e5e5e5] h-[64px] px-6 flex items-center justify-between z-20 w-full max-w-[1056px] mx-auto select-none">
      {/* Course Flag Selector */}
      <button className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-[#f7f7f7] border-2 border-transparent hover:border-[#e5e5e5] transition-all">
        <span className="text-2xl">🇮🇳</span>
        <span className="font-bold text-[#777] text-sm uppercase tracking-wider">Hindi</span>
      </button>

      {/* Stats indicators */}
      <div className="flex items-center gap-6 font-bold text-[15px]">
        {/* Streak */}
        <div className="flex items-center gap-2 text-[#ff9600] cursor-pointer hover:opacity-80 transition-opacity">
          <Flame className="w-6 h-6 fill-[#ff9600] stroke-[#ff9600]" />
          <span>{streak}</span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-2 text-[#1cb0f6] cursor-pointer hover:opacity-80 transition-opacity">
          <Gem className="w-6 h-6 fill-[#1cb0f6] stroke-[#1cb0f6]" />
          <span>{gems}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-2 text-[#ff4b4b] cursor-pointer hover:opacity-80 transition-opacity">
          <Heart className="w-6 h-6 fill-[#ff4b4b] stroke-[#ff4b4b]" />
          <span>{hearts}</span>
        </div>
      </div>
    </header>
  );
};
