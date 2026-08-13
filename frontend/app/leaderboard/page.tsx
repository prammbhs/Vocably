'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Trophy, Shield } from 'lucide-react';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { getUserProfile } from '@/lib/api/user';
import { LeaderboardEntry, UserProfile } from '@/types/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';
import { mockUser } from '@/lib/mock/user';

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [user, setUser] = useState<UserProfile>(mockUser);

  useEffect(() => {
    async function loadData() {
      const [lData, uData] = await Promise.all([getLeaderboard(), getUserProfile()]);
      if (Array.isArray(lData)) setEntries(lData);
      if (uData) setUser(uData);
    }
    loadData();
  }, []);

  const safeEntries = Array.isArray(entries) ? entries : mockLeaderboard;

  return (
    <AppShell user={user} leaderboard={safeEntries}>
      <div className="flex flex-col gap-6">
        {/* Banner Header */}
        <div className="bg-[#FFC800] rounded-3xl p-6 text-white flex items-center justify-between border-b-4 border-[#E5A000]">
          <div>
            <h1 className="text-3xl font-black">{user.league}</h1>
            <p className="text-sm font-extrabold text-white/90 mt-1">
              Top 3 learners advance to the Silver League next week!
            </p>
          </div>
          <Trophy className="w-16 h-16 text-white shrink-0 drop-shadow-md" />
        </div>

        {/* Standings List */}
        <Card className="flex flex-col p-2 gap-1">
          {safeEntries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-2xl transition-colors font-extrabold ${
                entry.isCurrentUser
                  ? 'bg-[#E5F6FF] text-[#1CB0F6] border-2 border-[#84D8FF]'
                  : 'hover:bg-[#F7F7F7] text-[#3C3C3C]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center text-lg font-black">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#1CB0F6]/10 flex items-center justify-center text-[#1CB0F6]">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base">{entry.name}</span>
                  <span className="text-xs text-[#777777] font-semibold">@{entry.username}</span>
                </div>
              </div>
              <span className="text-base font-black text-[#58CC02]">{entry.xp} XP</span>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}
