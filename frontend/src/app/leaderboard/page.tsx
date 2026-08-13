'use client';

import React, { useEffect, useState } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getLeaderboard, LeaderboardEntry, getCurrentUser, User } from '@/lib/api/client';
import { Trophy, ShieldAlert } from 'lucide-react';

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadData() {
      const [lbData, userData] = await Promise.all([getLeaderboard(), getCurrentUser()]);
      setEntries(lbData);
      setUser(userData);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex pb-16 md:pb-0">
      <LeftSidebar />
      <div className="flex-1 flex flex-col items-center w-full">
        <TopBar user={user} />

        <div className="flex w-full max-w-[1056px] justify-between p-6">
          <div className="flex-1 max-w-[592px] select-none">
            {/* Header League Banner */}
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-3xl p-6 mb-8 text-center shadow-md relative overflow-hidden">
              <Trophy className="w-20 h-20 mx-auto mb-2 text-yellow-100 opacity-90 animate-pulse" />
              <h1 className="text-2xl font-black uppercase tracking-wider">Bronze League</h1>
              <p className="text-sm font-bold opacity-90 mt-1">Top 10 advance to the next league!</p>
            </div>

            {/* Ladder list */}
            <div className="border-2 border-[#e5e5e5] rounded-3xl overflow-hidden bg-white divide-y-2 divide-[#e5e5e5]">
              {entries.map((entry) => (
                <div
                  key={entry.user_id}
                  className={`flex items-center justify-between p-4 px-6 transition-colors ${
                    entry.is_current_user ? 'bg-[#ddf4ff]' : 'hover:bg-[#f7f7f7]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-black text-lg w-6 ${
                        entry.rank === 1
                          ? 'text-[#ffc800]'
                          : entry.rank === 2
                          ? 'text-[#afafaf]'
                          : entry.rank === 3
                          ? 'text-amber-700'
                          : 'text-[#777]'
                      }`}
                    >
                      {entry.rank}
                    </span>

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-[#e5e5e5] flex items-center justify-center font-bold text-lg text-[#777] overflow-hidden border-2 border-white shadow-sm">
                      {entry.username.charAt(0)}
                    </div>

                    <span className="font-extrabold text-[#4b4b4b] text-base">{entry.username}</span>
                  </div>

                  <span className="font-extrabold text-[#777] text-sm">{entry.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          <RightSidebar />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
