'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Volume2, Sparkles, Target, Globe, Info } from 'lucide-react';
import { getUserProfile } from '@/lib/api/user';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { mockUser } from '@/lib/mock/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

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
        <h1 className="text-3xl font-black text-[#3C3C3C]">Settings</h1>

        <Card className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-[#1CB0F6]" />
              <span className="font-extrabold text-[#3C3C3C]">Sound Effects</span>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-6 h-6 accent-[#58CC02] cursor-pointer"
            />
          </div>

          <hr className="border-[#E5E5E5]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#FFC800]" />
              <span className="font-extrabold text-[#3C3C3C]">Animations</span>
            </div>
            <input
              type="checkbox"
              checked={animationsEnabled}
              onChange={(e) => setAnimationsEnabled(e.target.checked)}
              className="w-6 h-6 accent-[#58CC02] cursor-pointer"
            />
          </div>

          <hr className="border-[#E5E5E5]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#58CC02]" />
              <span className="font-extrabold text-[#3C3C3C]">Course Language</span>
            </div>
            <span className="font-extrabold text-[#1CB0F6]">English 🇺🇸</span>
          </div>

          <hr className="border-[#E5E5E5]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-[#777777]" />
              <span className="font-extrabold text-[#3C3C3C]">About Vocably</span>
            </div>
            <span className="font-extrabold text-[#777777]">v1.0.0</span>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
