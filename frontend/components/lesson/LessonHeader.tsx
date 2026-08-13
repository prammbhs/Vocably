'use client';

import React from 'react';
import Link from 'next/link';
import { X, Heart } from 'lucide-react';
import { LessonProgress } from './LessonProgress';

interface LessonHeaderProps {
  currentExercise: number;
  totalExercises: number;
  hearts: number;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  currentExercise,
  totalExercises,
  hearts,
}) => {
  return (
    <header className="w-full max-w-4xl flex items-center justify-between py-6 px-4 mx-auto">
      {/* Close Button X */}
      <Link
        href="/learn"
        className="w-10 h-10 rounded-xl hover:bg-[#F7F7F7] flex items-center justify-center text-[#777777] hover:text-[#3C3C3C] transition-colors"
        aria-label="Exit lesson"
      >
        <X className="w-7 h-7" />
      </Link>

      {/* Lesson Progress Bar */}
      <LessonProgress current={currentExercise} total={totalExercises} />

      {/* Hearts Counter */}
      <div className="flex items-center gap-1.5 font-extrabold text-lg text-[#FF4B4B]">
        <Heart className="w-7 h-7 fill-[#FF4B4B] text-[#FF4B4B]" />
        <span>{hearts}</span>
      </div>
    </header>
  );
};
