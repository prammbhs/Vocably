'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number; // Percentage 0 to 100
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#58CC02',
  height = 16,
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="w-full bg-[#E5E5E5] rounded-full overflow-hidden relative"
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${normalizedProgress}%`,
          backgroundColor: color,
        }}
      >
        {/* Subtle highlight overlay */}
        <div className="w-full h-1/3 bg-white/20 rounded-t-full" />
      </div>
    </div>
  );
};
