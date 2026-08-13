'use client';

import React from 'react';
import { ListFilter } from 'lucide-react';

interface CourseHeaderProps {
  sectionNumber: number;
  unitNumber: number;
  title: string;
  description?: string;
  bannerColor?: string;
  darkColor?: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  sectionNumber,
  unitNumber,
  title,
  bannerColor = '#58CC02',
  darkColor = '#58A700',
}) => {
  return (
    <div className="w-full mb-8">
      <div
        className="w-full rounded-[20px] p-5 text-white flex items-center justify-between shadow-md relative overflow-hidden"
        style={{
          backgroundColor: bannerColor,
          borderBottom: `6px solid ${darkColor}`,
        }}
      >
        {/* Left Text Block */}
        <div className="flex flex-col gap-1 z-10">
          <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-white/90">
            Section {sectionNumber}, Unit {unitNumber}
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight drop-shadow-xs">
            {title}
          </h2>
        </div>

        {/* Right Guide Icon with Divider */}
        <div className="flex items-center gap-4 z-10">
          <div className="h-10 w-[2px] bg-white/30 rounded-full" />
          <button
            className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer border border-white/20 active:scale-95"
            aria-label="Unit guidebook"
          >
            <ListFilter className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
