'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { TopStats } from '@/components/navigation/TopStats';
import { LearningPath } from '@/components/learning-path/LearningPath';
import { getLearningPath } from '@/lib/api/course';
import { getUserProfile } from '@/lib/api/user';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { CourseData } from '@/types/course';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { mockCourse } from '@/lib/mock/course';
import { mockUser } from '@/lib/mock/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';

export default function LearnPage() {
  const [course, setCourse] = useState<CourseData>(mockCourse);
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);

  useEffect(() => {
    async function loadData() {
      const [cData, uData, lData] = await Promise.all([
        getLearningPath(),
        getUserProfile(),
        getLeaderboard(),
      ]);
      if (cData) setCourse(cData);
      if (uData) setUser(uData);
      if (lData) setLeaderboard(lData);
    }
    loadData();
  }, []);

  return (
    <AppShell user={user} leaderboard={leaderboard}>
      <div className="flex flex-col gap-6">
        {/* Top Status Bar */}
        <TopStats user={user} />

        {/* Vertical Winding Learning Path */}
        <LearningPath course={course} />
      </div>
    </AppShell>
  );
}
