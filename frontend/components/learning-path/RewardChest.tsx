'use client';

import React, { useState } from 'react';
import { Gift, Sparkles, X } from 'lucide-react';

interface RewardChestProps {
  positionOffset?: number;
  isUnlocked?: boolean;
}

export const RewardChest: React.FC<RewardChestProps> = ({
  positionOffset = 0,
  isUnlocked = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center my-4 z-10 cursor-pointer"
        style={{ transform: `translateX(${positionOffset}px)` }}
        onClick={() => setIsOpen(true)}
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center border-4 shadow-[0_5px_0_0] transition-transform active:translate-y-1 ${
            isUnlocked
              ? 'bg-[#FFC800] border-[#E5A000] shadow-[#E5A000] text-white hover:brightness-105'
              : 'bg-[#D7D7D7] border-[#B5B5B5] shadow-[#B5B5B5] text-[#AFAFAF]'
          }`}
        >
          <Gift className="w-9 h-9 drop-shadow-xs" />
        </div>
      </div>

      {/* Reward Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-[#E5E5E5] flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-[#FFC800]/20 flex items-center justify-center text-[#FFC800]">
              <Sparkles className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-[#3C3C3C]">Chest Unlocked!</h3>
            <p className="text-sm font-extrabold text-[#777777]">
              You earned +50 Gems and 1 Streak Freeze!
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-3d btn-green w-full h-12 text-sm mt-2"
            >
              Claim Reward
            </button>
          </div>
        </div>
      )}
    </>
  );
};
