'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { UserProfile, LeaderboardEntry } from '@/types/user';

interface AppShellProps {
  children: React.ReactNode;
  user: UserProfile;
  leaderboard: LeaderboardEntry[];
  showRightSidebar?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  user,
  leaderboard,
  showRightSidebar = true,
}) => {
  return (
    <div className="min-h-screen bg-white text-[#3C3C3C] flex justify-center">
      <div className="w-full max-w-[1440px] flex justify-between relative">
        {/* Desktop Left Sidebar */}
        <Sidebar />

        {/* Central Content Area */}
        <main className="flex-1 max-w-[600px] min-h-screen pb-24 lg:pb-12 px-4 md:px-6 pt-4 mx-auto">
          {children}
        </main>

        {/* Desktop Right Sidebar */}
        {showRightSidebar && <RightSidebar user={user} leaderboard={leaderboard} />}

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
