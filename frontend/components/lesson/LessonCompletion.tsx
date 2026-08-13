'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Sparkles, Flame, Crown } from 'lucide-react';

interface LessonCompletionProps {
  xpEarned: number;
  streak: number;
  progress: number;
}

export const LessonCompletion: React.FC<LessonCompletionProps> = ({
  xpEarned,
  streak,
  progress,
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95">
      {/* Celebration Icon */}
      <div className="w-28 h-28 rounded-full bg-[#FFC800]/20 flex items-center justify-center text-[#FFC800] mb-6 animate-bounce">
        <Sparkles className="w-16 h-16" />
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-[#3C3C3C] mb-2">
        LESSON COMPLETE!
      </h1>
      <p className="text-base font-extrabold text-[#777777] mb-8">
        You are making great progress!
      </p>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
        <div className="p-4 rounded-2xl border-2 border-b-4 border-[#E5E5E5] bg-[#FFF9E6] flex flex-col items-center gap-1">
          <span className="text-xs font-extrabold text-[#FFC800] uppercase">Total XP</span>
          <span className="text-2xl font-black text-[#FF9600]">+{xpEarned} XP</span>
        </div>

        <div className="p-4 rounded-2xl border-2 border-b-4 border-[#E5E5E5] bg-[#FFF0E6] flex flex-col items-center gap-1">
          <span className="text-xs font-extrabold text-[#FF9600] uppercase">Streak</span>
          <div className="flex items-center gap-1">
            <Flame className="w-6 h-6 text-[#FF9600] fill-[#FF9600]" />
            <span className="text-2xl font-black text-[#FF9600]">{streak} Days</span>
          </div>
        </div>
      </div>

      {/* Skill Progress Bar */}
      <div className="w-full max-w-sm bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center text-sm font-extrabold text-[#3C3C3C]">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#FFC800]" />
            <span>Skill Progress</span>
          </div>
          <span>{progress}%</span>
        </div>
        <ProgressBar progress={progress} color="#58CC02" height={14} />
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-sm">
        <Link href="/learn">
          <Button variant="green" size="lg" fullWidth>
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};
