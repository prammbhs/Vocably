'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { DailyGoalCard } from '@/components/gamification/DailyGoalCard';
import { Target, Trophy, Flame } from 'lucide-react';
import { getUserProfile } from '@/lib/api/user';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { mockUser } from '@/lib/mock/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';

export default function GoalsPage() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);

  useEffect(() => {
    async function loadData() {
      const [uData, lData] = await Promise.all([getUserProfile(), getLeaderboard()]);
      if (uData) setUser(uData);
      if (lData) setLeaderboard(lData);
    }
    loadData();
  }, []);

  return (
    <AppShell user={user} leaderboard={leaderboard}>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-black text-[#3C3C3C]">Goals & Quests</h1>

        <DailyGoalCard user={user} />

        <h2 className="text-xl font-black text-[#3C3C3C] mt-2">Active Quests</h2>

        <div className="flex flex-col gap-4">
          <Card className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <Flame className="w-8 h-8 text-[#FF9600] fill-[#FF9600]" />
              <div className="flex flex-col">
                <span className="font-extrabold text-[#3C3C3C]">Maintain a 7-Day Streak</span>
                <span className="text-xs text-[#777777] font-semibold">Current: 8 Days</span>
              </div>
            </div>
            <span className="text-xs font-black text-[#58CC02] bg-[#58CC02]/10 px-3 py-1 rounded-full uppercase">
              Completed
            </span>
          </Card>

          <Card className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-[#FFC800]" />
              <div className="flex flex-col">
                <span className="font-extrabold text-[#3C3C3C]">Earn 500 Total XP</span>
                <span className="text-xs text-[#777777] font-semibold">Current: {user.xp} / 500 XP</span>
              </div>
            </div>
            <span className="text-xs font-black text-[#1CB0F6] bg-[#1CB0F6]/10 px-3 py-1 rounded-full uppercase">
              90%
            </span>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
