'use client';

import React from 'react';

interface LessonProgressProps {
  current: number;
  total: number;
}

export const LessonProgress: React.FC<LessonProgressProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="flex-1 h-4 bg-[#E5E5E5] rounded-full overflow-hidden relative mx-4">
      <div
        className="h-full bg-[#58CC02] rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      >
        <div className="w-full h-1/3 bg-white/20 rounded-t-full" />
      </div>
    </div>
  );
};
