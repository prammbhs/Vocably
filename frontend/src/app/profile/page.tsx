'use client';

import React, { useEffect, useState } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getCurrentUser, User } from '@/lib/api/client';
import { Flame, Zap, Award, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadData() {
      const userData = await getCurrentUser();
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
            {/* User Header Profile Card */}
            <div className="border-2 border-[#e5e5e5] rounded-3xl p-6 mb-8 flex items-center gap-6 bg-white">
              <div className="w-24 h-24 rounded-full bg-[#1cb0f6]/20 border-4 border-[#1cb0f6] flex items-center justify-center font-black text-4xl text-[#1cb0f6]">
                {user?.username.charAt(0) || 'D'}
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#4b4b4b]">{user?.display_name || user?.username || 'DuoLearner'}</h1>
                <p className="text-sm font-bold text-[#afafaf] mt-0.5">Joined August 2026</p>
              </div>
            </div>

            {/* Statistics Grid */}
            <h2 className="text-xl font-extrabold text-[#4b4b4b] mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-2 border-[#e5e5e5] rounded-2xl p-4 flex items-center gap-4">
                <Flame className="w-8 h-8 text-[#ff9600] fill-[#ff9600]" />
                <div>
                  <span className="text-xl font-black text-[#4b4b4b] block">{user?.current_streak ?? 0}</span>
                  <span className="text-xs font-bold text-[#afafaf] uppercase">Day streak</span>
                </div>
              </div>

              <div className="border-2 border-[#e5e5e5] rounded-2xl p-4 flex items-center gap-4">
                <Zap className="w-8 h-8 text-[#ffc800] fill-[#ffc800]" />
                <div>
                  <span className="text-xl font-black text-[#4b4b4b] block">{user?.total_xp ?? 0}</span>
                  <span className="text-xs font-bold text-[#afafaf] uppercase">Total XP</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <h2 className="text-xl font-extrabold text-[#4b4b4b] mb-4">Achievements</h2>
            <div className="border-2 border-[#e5e5e5] rounded-3xl divide-y-2 divide-[#e5e5e5] bg-white">
              <div className="p-4 flex items-center gap-4">
                <Award className="w-10 h-10 text-[#ffc800]" />
                <div>
                  <h3 className="font-extrabold text-[#4b4b4b]">Wildfire</h3>
                  <p className="text-xs font-bold text-[#afafaf]">Reach a 7 day streak</p>
                </div>
              </div>

              <div className="p-4 flex items-center gap-4">
                <Calendar className="w-10 h-10 text-[#58cc02]" />
                <div>
                  <h3 className="font-extrabold text-[#4b4b4b]">Sage</h3>
                  <p className="text-xs font-bold text-[#afafaf]">Earn 500 XP in total</p>
                </div>
              </div>
            </div>
          </div>

          <RightSidebar />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
