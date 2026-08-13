'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Flame, Gem, Trophy, Star, Calendar, ShieldCheck } from 'lucide-react';
import { getUserProfile } from '@/lib/api/user';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { mockUser } from '@/lib/mock/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';

export default function ProfilePage() {
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
        {/* Profile Card Header */}
        <Card className="flex items-center gap-5 p-6">
          <div className="w-20 h-20 rounded-full bg-[#58CC02] text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-md">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-[#3C3C3C]">{user.name}</h1>
            <p className="text-sm font-extrabold text-[#777777]">@{user.username}</p>
            <div className="flex items-center gap-2 mt-2 text-xs font-extrabold text-[#777777]">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinedDate}</span>
            </div>
          </div>
        </Card>

        {/* Statistics Grid */}
        <h2 className="text-xl font-black text-[#3C3C3C]">Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex items-center gap-3 p-4">
            <Flame className="w-8 h-8 text-[#FF9600] fill-[#FF9600]" />
            <div className="flex flex-col">
              <span className="text-xl font-black">{user.streak}</span>
              <span className="text-xs font-extrabold text-[#777777]">Day Streak</span>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4">
            <Star className="w-8 h-8 text-[#FFC800] fill-[#FFC800]" />
            <div className="flex flex-col">
              <span className="text-xl font-black">{user.xp}</span>
              <span className="text-xs font-extrabold text-[#777777]">Total XP</span>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4">
            <Trophy className="w-8 h-8 text-[#1CB0F6]" />
            <div className="flex flex-col">
              <span className="text-xl font-black">{user.league}</span>
              <span className="text-xs font-extrabold text-[#777777]">Current League</span>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4">
            <ShieldCheck className="w-8 h-8 text-[#58CC02]" />
            <div className="flex flex-col">
              <span className="text-xl font-black">{user.lessonsCompleted}</span>
              <span className="text-xs font-extrabold text-[#777777]">Lessons Done</span>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
