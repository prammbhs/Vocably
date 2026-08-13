'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DailyGoalCard } from '../gamification/DailyGoalCard';
import { MiniLeaderboard } from '../gamification/MiniLeaderboard';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { ShieldAlert } from 'lucide-react';

interface RightSidebarProps {
  user: UserProfile;
  leaderboard: LeaderboardEntry[];
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ user, leaderboard }) => {
  return (
    <aside className="hidden xl:flex flex-col w-[360px] h-screen sticky top-0 px-4 py-6 gap-5 overflow-y-auto">
      {/* Card 1: Unlock League preview */}
      <Card className="flex items-center gap-4 bg-gradient-to-r from-[#1CB0F6]/10 to-[#CE82FF]/10 border-[#1CB0F6]/30">
        <div className="w-12 h-12 rounded-2xl bg-[#1CB0F6] flex items-center justify-center text-white shrink-0">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div>
          <h4 className="font-extrabold text-[#3C3C3C] text-base">Unlock League</h4>
          <p className="text-xs text-[#777777] font-semibold mt-0.5">
            Complete 3 more lessons to compete with others!
          </p>
        </div>
      </Card>

      {/* Card 2: Daily Goal Card */}
      <DailyGoalCard user={user} />

      {/* Card 3: Mini Leaderboard */}
      <MiniLeaderboard entries={leaderboard} userLeague={user.league} />

      {/* Card 4: Profile Prompt Card */}
      <Card className="flex flex-col gap-3">
        <h4 className="font-extrabold text-[#3C3C3C] text-base">
          Create a profile to save your progress
        </h4>
        <p className="text-xs text-[#777777] font-semibold">
          Sync your learning path across all your devices and join global leaderboards.
        </p>
        <div className="flex flex-col gap-2 mt-1">
          <Button variant="green" size="md" fullWidth>
            Create Profile
          </Button>
          <Button variant="white" size="md" fullWidth>
            Sign In
          </Button>
        </div>
      </Card>
    </aside>
  );
};
