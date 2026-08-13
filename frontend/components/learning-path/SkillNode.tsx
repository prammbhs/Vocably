'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Lock, Crown, Check } from 'lucide-react';
import { SpeechBubble } from '../ui/SpeechBubble';
import { SkillStatus } from '@/types/course';

interface SkillNodeProps {
  id: string;
  title: string;
  status: SkillStatus;
  positionOffset?: number;
}

export const SkillNode: React.FC<SkillNodeProps> = ({
  id,
  title,
  status,
  positionOffset = 0,
}) => {
  const isCompleted = status === 'COMPLETED';
  const isInProgress = status === 'IN_PROGRESS';
  const isLocked = status === 'LOCKED';

  // Transform offset for winding path
  const transformStyle = {
    transform: `translateX(${positionOffset}px)`,
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center my-4 z-10 transition-transform"
      style={transformStyle}
    >
      {/* Floating START Speech Bubble for Active Node */}
      {isInProgress && (
        <div className="absolute -top-11 z-20 animate-bounce">
          <SpeechBubble text="START" />
        </div>
      )}

      {/* Outer Pulse Ring for Active Node */}
      {isInProgress && (
        <div className="absolute w-24 h-24 rounded-full border-4 border-[#58CC02]/30 active-skill-pulse -z-10" />
      )}

      {/* Skill Node Button */}
      {isLocked ? (
        <div
          className="w-[74px] h-[74px] md:w-[82px] md:h-[82px] rounded-full bg-[#D7D7D7] border-4 border-[#B5B5B5] shadow-[0_6px_0_0_#B5B5B5] flex items-center justify-center cursor-not-allowed select-none"
          title={title}
        >
          <Lock className="w-8 h-8 text-[#AFAFAF]" />
        </div>
      ) : (
        <Link
          href={`/lesson/${id}`}
          className={`w-[74px] h-[74px] md:w-[82px] md:h-[82px] rounded-full flex items-center justify-center transition-transform active:translate-y-1 select-none ${
            isCompleted
              ? 'bg-[#FFC800] border-4 border-[#E5A000] shadow-[0_6px_0_0_#E5A000] hover:brightness-105'
              : 'bg-[#58CC02] border-4 border-[#46A302] shadow-[0_6px_0_0_#58A700] hover:brightness-105'
          }`}
          title={title}
        >
          {isCompleted ? (
            <Crown className="w-9 h-9 text-white fill-white drop-shadow-xs" />
          ) : (
            <Star className="w-9 h-9 text-white fill-white drop-shadow-xs" />
          )}
        </Link>
      )}

      {/* Skill Title Badge */}
      <span className="mt-2 text-xs md:text-sm font-extrabold text-[#3C3C3C] tracking-wide text-center bg-white px-2.5 py-0.5 rounded-lg border border-[#E5E5E5] shadow-xs">
        {title}
      </span>
    </div>
  );
};
