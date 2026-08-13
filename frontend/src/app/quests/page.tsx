'use client';

import React, { useEffect, useState } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getCurrentUser, User } from '@/lib/api/client';
import { Target, Zap, Flame, Trophy } from 'lucide-react';

export default function QuestsPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadData() {
      const u = await getCurrentUser();
      setUser(u);
    }
    loadData();
  }, []);

  const quests = [
    {
      id: 1,
      title: 'Earn 10 XP',
      description: 'Complete lessons to earn XP',
      current: user?.total_xp ? Math.min(10, user.total_xp) : 0,
      total: 10,
      reward: '50 Gems',
      icon: '⚡',
      color: 'bg-amber-400',
    },
    {
      id: 2,
      title: 'Complete 1 Lesson',
      description: 'Finish any lesson in Hindi Essentials',
      current: user?.total_xp && user.total_xp > 0 ? 1 : 0,
      total: 1,
      reward: '1 Heart',
      icon: '🎯',
      color: 'bg-[#58cc02]',
    },
    {
      id: 3,
      title: 'Maintain a 1 Day Streak',
      description: 'Practice every day to keep your streak alive',
      current: user?.current_streak ? Math.min(1, user.current_streak) : 0,
      total: 1,
      reward: '100 Gems',
      icon: '🔥',
      color: 'bg-[#ff9600]',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex pb-16 md:pb-0">
      <LeftSidebar />
      <div className="flex-1 flex flex-col items-center w-full">
        <TopBar user={user} />

        <div className="flex w-full max-w-[1056px] justify-between p-6">
          <div className="flex-1 max-w-[592px] select-none">
            {/* Quest Header Banner */}
            <div className="bg-gradient-to-r from-[#ff9600] to-[#ffb800] text-white rounded-3xl p-6 mb-8 text-center shadow-md">
              <Target className="w-16 h-16 mx-auto mb-2 text-white/90" />
              <h1 className="text-2xl font-black uppercase tracking-wider">Daily Quests</h1>
              <p className="text-sm font-bold opacity-90 mt-1">Complete quests every day to earn rewards!</p>
            </div>

            {/* Quest Items */}
            <div className="space-y-4">
              {quests.map((q) => {
                const percent = Math.min(100, Math.round((q.current / q.total) * 100));

                return (
                  <div key={q.id} className="border-2 border-[#e5e5e5] rounded-3xl p-5 bg-white flex items-center gap-4">
                    <div className="text-4xl p-3 bg-amber-50 rounded-2xl border-2 border-amber-200">{q.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-extrabold text-[#4b4b4b] text-base">{q.title}</h3>
                        <span className="text-xs font-black text-[#1cb0f6] bg-[#ddf4ff] px-2.5 py-1 rounded-xl uppercase">
                          {q.reward}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#777] mb-3">{q.description}</p>

                      {/* Progress Bar */}
                      <div className="w-full h-4 bg-[#e5e5e5] rounded-full overflow-hidden relative">
                        <div
                          className={`h-full ${q.color} transition-all duration-500 rounded-full`}
                          style={{ width: `${percent}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#4b4b4b]">
                          {q.current} / {q.total}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <RightSidebar />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
