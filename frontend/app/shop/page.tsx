'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Heart, Shield, Gem } from 'lucide-react';
import { getUserProfile } from '@/lib/api/user';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { mockUser } from '@/lib/mock/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';

export default function ShopPage() {
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#3C3C3C]">Shop</h1>
          <div className="flex items-center gap-1.5 font-extrabold text-[#1CB0F6] bg-[#1CB0F6]/10 px-4 py-2 rounded-2xl">
            <Gem className="w-5 h-5 fill-[#1CB0F6]" />
            <span>{user.gems} Gems</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <Heart className="w-10 h-10 text-[#FF4B4B] fill-[#FF4B4B]" />
              <div className="flex flex-col">
                <span className="font-black text-[#3C3C3C] text-lg">Heart Refill</span>
                <span className="text-xs text-[#777777] font-semibold">
                  Refill your hearts to maximum (5/5)
                </span>
              </div>
            </div>
            <Button variant="blue" size="sm">
              <Gem className="w-4 h-4 fill-white" /> 350
            </Button>
          </Card>

          <Card className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-[#1CB0F6] fill-[#1CB0F6]" />
              <div className="flex flex-col">
                <span className="font-black text-[#3C3C3C] text-lg">Streak Freeze</span>
                <span className="text-xs text-[#777777] font-semibold">
                  Protect your streak if you miss a day of learning
                </span>
              </div>
            </div>
            <Button variant="blue" size="sm">
              <Gem className="w-4 h-4 fill-white" /> 200
            </Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
