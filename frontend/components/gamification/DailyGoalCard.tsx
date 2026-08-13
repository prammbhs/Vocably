'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Flame, Gift } from 'lucide-react';
import { UserProfile } from '@/types/user';

interface DailyGoalCardProps {
  user: UserProfile;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ user }) => {
  const percentage = Math.round((user.dailyXpEarned / user.dailyXpGoal) * 100);

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-[#3C3C3C] text-lg">Daily Goal</h3>
        <span className="text-xs font-bold text-[#1CB0F6] uppercase cursor-pointer hover:underline">
          View All
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF9600]/10 flex items-center justify-center text-[#FF9600]">
          <Flame className="w-6 h-6 fill-[#FF9600]" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center text-sm font-extrabold text-[#3C3C3C] mb-1">
            <span>Earn {user.dailyXpGoal} XP</span>
            <span>
              {user.dailyXpEarned} / {user.dailyXpGoal} XP
            </span>
          </div>
          <ProgressBar progress={percentage} color="#FF9600" height={12} />
        </div>
        <div className="w-8 h-8 rounded-full bg-[#FFC800]/20 flex items-center justify-center text-[#FFC800]">
          <Gift className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};
