'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { getLesson, Lesson } from '@/lib/api/client';

export default function LessonPage() {
  const params = useParams();
  const lessonId = Number(params?.id) || 1;
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    async function loadLesson() {
      const data = await getLesson(lessonId);
      setLesson(data);
    }
    loadLesson();
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-extrabold text-[#1cb0f6] text-xl">
        Loading lesson...
      </div>
    );
  }

  return <LessonPlayer lesson={lesson} />;
}
