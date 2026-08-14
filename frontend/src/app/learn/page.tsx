'use client';

import React, { useEffect, useState } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { LearningPath } from '@/components/learn/LearningPath';
import { getCoursePath, getCurrentUser, getQuests, Unit, User } from '@/lib/api/client';

export default function LearnPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [quests, setQuests] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const [pathData, userData, questsData] = await Promise.all([
        getCoursePath(),
        getCurrentUser(),
        getQuests(),
      ]);
      setUnits(pathData.units);
      setUser(userData);
      setQuests(questsData.quests);
    } catch (err) {
      console.error('Failed to load learn page data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex pb-16 md:pb-0">
      {/* Desktop Left Navigation */}
      <LeftSidebar />

      {/* Center & Right Body */}
      <div className="flex-1 flex flex-col items-center w-full">
        <TopBar user={user} />

        <div className="flex w-full max-w-[1056px] justify-between">
          <LearningPath units={units} quests={quests} onRefreshData={loadData} />
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
