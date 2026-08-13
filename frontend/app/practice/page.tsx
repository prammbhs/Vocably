'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dumbbell, Heart, Sparkles } from 'lucide-react';
import { getUserProfile } from '@/lib/api/user';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { mockUser } from '@/lib/mock/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';

export default function PracticePage() {
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
        <h1 className="text-3xl font-black text-[#3C3C3C]">Practice Hub</h1>

        <Card className="flex flex-col gap-4 p-6 bg-gradient-to-br from-[#1CB0F6]/10 to-[#58CC02]/10 border-[#1CB0F6]/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1CB0F6] text-white flex items-center justify-center shrink-0 shadow-md">
              <Dumbbell className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#3C3C3C]">Unlimited Practice</h2>
              <p className="text-xs font-extrabold text-[#777777]">
                Practice previous skills without risking hearts to earn XP and regain health.
              </p>
            </div>
          </div>

          <Link href="/lesson/skill_2">
            <Button variant="blue" size="lg" fullWidth>
              Start Practice Session
            </Button>
          </Link>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="flex items-center gap-4 p-4">
            <Heart className="w-10 h-10 text-[#FF4B4B] fill-[#FF4B4B]" />
            <div className="flex flex-col">
              <span className="font-extrabold text-[#3C3C3C]">Earn Hearts</span>
              <span className="text-xs text-[#777777] font-semibold">
                Complete practice lessons to restore lost hearts
              </span>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-4">
            <Sparkles className="w-10 h-10 text-[#FFC800]" />
            <div className="flex flex-col">
              <span className="font-extrabold text-[#3C3C3C]">Mistakes Review</span>
              <span className="text-xs text-[#777777] font-semibold">
                Target words you recently missed
              </span>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
