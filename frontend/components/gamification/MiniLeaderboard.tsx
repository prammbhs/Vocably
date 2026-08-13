'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Trophy, Shield } from 'lucide-react';
import { LeaderboardEntry } from '@/types/user';

interface MiniLeaderboardProps {
  entries: LeaderboardEntry[];
  userLeague?: string;
}

export const MiniLeaderboard: React.FC<MiniLeaderboardProps> = ({
  entries,
  userLeague = 'Bronze League',
}) => {
  const safeEntries = Array.isArray(entries) ? entries : [];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFC800]" />
          <h3 className="font-extrabold text-[#3C3C3C] text-lg">{userLeague}</h3>
        </div>
        <Link
          href="/leaderboard"
          className="text-xs font-bold text-[#1CB0F6] uppercase hover:underline"
        >
          View League
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {safeEntries.slice(0, 3).map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between p-2 rounded-xl text-sm font-bold ${
              entry.isCurrentUser ? 'bg-[#E5F6FF] text-[#1CB0F6]' : 'hover:bg-[#F7F7F7]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 text-center font-extrabold text-[#777777]">
                {entry.rank}
              </span>
              <Shield className="w-6 h-6 text-[#1CB0F6]" />
              <span className="truncate max-w-[120px] text-[#3C3C3C]">
                {entry.name}
              </span>
            </div>
            <span className="text-[#777777]">{entry.xp} XP</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
