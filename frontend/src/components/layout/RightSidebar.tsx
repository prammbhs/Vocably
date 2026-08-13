import React from 'react';
import Link from 'next/link';

export const RightSidebar: React.FC = () => {
  return (
    <aside className="w-[368px] hidden lg:flex flex-col gap-6 pt-6 select-none pr-4">
      {/* Unlock Leaderboards Card */}
      <div className="border-2 border-[#e5e5e5] rounded-3xl p-5 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500 font-extrabold text-2xl border-2 border-amber-300">
            🏆
          </div>
          <div>
            <h3 className="font-extrabold text-[#4b4b4b] text-base">Unlock Leaderboards!</h3>
            <p className="text-xs font-bold text-[#777] mt-0.5">Complete lessons to rank up</p>
          </div>
        </div>
      </div>

      {/* Daily Quests Card */}
      <div className="border-2 border-[#e5e5e5] rounded-3xl p-5 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-[#4b4b4b] text-base">Daily Quests</h3>
          <Link href="/quests" className="text-xs font-bold text-[#1cb0f6] uppercase hover:underline">
            View all
          </Link>
        </div>

        {/* Quest Item */}
        <div className="flex items-center gap-4">
          <div className="text-3xl">⚡</div>
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-[#4b4b4b] mb-1.5">
              <span>Earn 10 XP</span>
              <span className="text-[#afafaf]">0 / 10</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-3.5 bg-[#e5e5e5] rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-[#ffc800] rounded-full transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-[#afafaf] px-2">
        <Link href="#" className="hover:underline">ABOUT</Link>
        <Link href="#" className="hover:underline">CAREERS</Link>
        <Link href="#" className="hover:underline">TERMS</Link>
        <Link href="#" className="hover:underline">PRIVACY</Link>
      </div>
    </aside>
  );
};
