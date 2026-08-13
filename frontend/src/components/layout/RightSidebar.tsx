import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  return (
    <aside className="w-[368px] hidden lg:flex flex-col gap-6 pt-6 select-none pr-4">
      {/* Super Duolingo Promotion Card */}
      <div className="border-2 border-[#e5e5e5] rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#1899D6] to-[#1cb0f6] text-white shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <span className="font-black text-xl tracking-wider text-yellow-300 flex items-center gap-1.5 uppercase">
            <Sparkles className="w-5 h-5 fill-yellow-300" /> Super Vocably
          </span>
        </div>
        <p className="text-sm font-semibold text-white/90 mb-4 leading-snug">
          No ads, personalized practice, and unlimited Legendary challenges!
        </p>
        <button className="w-full bg-white text-[#1cb0f6] font-bold text-sm py-3 px-4 rounded-xl border-b-4 border-[#e5e5e5] active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wider shadow">
          Try 1 week free
        </button>
      </div>

      {/* Unlock Leaderboards Card */}
      <div className="border-2 border-[#e5e5e5] rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500 font-extrabold text-2xl border-2 border-amber-300">
            🏆
          </div>
          <div>
            <h3 className="font-extrabold text-[#4b4b4b] text-base">Unlock Leaderboards!</h3>
            <p className="text-xs font-bold text-[#777] mt-0.5">Complete 9 more lessons to compete</p>
          </div>
        </div>
      </div>

      {/* Daily Quests Card */}
      <div className="border-2 border-[#e5e5e5] rounded-2xl p-5 bg-white">
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
