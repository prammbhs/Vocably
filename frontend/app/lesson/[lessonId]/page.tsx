'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { ExerciseRenderer } from '@/components/lesson/ExerciseRenderer';
import { FeedbackBar } from '@/components/lesson/FeedbackBar';
import { LessonCompletion } from '@/components/lesson/LessonCompletion';
import { OutOfHeartsModal } from '@/components/lesson/OutOfHeartsModal';
import { getLesson, submitExerciseAnswer } from '@/lib/api/lessons';
import { getUserProfile } from '@/lib/api/user';
import { LessonData, LessonState } from '@/types/lesson';
import { UserProfile } from '@/types/user';
import { mockLessons } from '@/lib/mock/lessons';
import { mockUser } from '@/lib/mock/user';

export default function LessonPage() {
  const params = useParams();
  const lessonId = (params?.lessonId as string) || 'skill_2';

  const [lesson, setLesson] = useState<LessonData>(mockLessons.skill_2);
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<unknown>(null);
  const [lessonState, setLessonState] = useState<LessonState>('ANSWERING');
  const [correctAnswerText, setCorrectAnswerText] = useState<string>('');

  useEffect(() => {
    async function init() {
      const [lData, uData] = await Promise.all([getLesson(lessonId), getUserProfile()]);
      if (lData) setLesson(lData);
      if (uData) setUser(uData);
    }
    init();
  }, [lessonId]);

  const currentExercise = lesson.exercises[currentIndex];

  const handleCheckAnswer = async () => {
    if (!currentExercise || !userAnswer) return;

    setLessonState('SUBMITTING');
    const result = await submitExerciseAnswer(
      lesson.id,
      currentExercise.id,
      userAnswer,
      user.hearts
    );

    if (result.isCorrect) {
      setLessonState('FEEDBACK_CORRECT');
      setUser((prev) => ({ ...prev, xp: prev.xp + (result.xpEarned || 2) }));
    } else {
      const newHearts = Math.max(0, user.hearts - 1);
      setUser((prev) => ({ ...prev, hearts: newHearts }));
      setCorrectAnswerText(result.correctAnswerText || '');

      if (newHearts <= 0) {
        setLessonState('OUT_OF_HEARTS');
      } else {
        setLessonState('FEEDBACK_INCORRECT');
      }
    }
  };

  const handleContinue = () => {
    if (currentIndex + 1 >= lesson.exercises.length) {
      setLessonState('COMPLETED');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer(null);
      setCorrectAnswerText('');
      setLessonState('ANSWERING');
    }
  };

  if (lessonState === 'COMPLETED') {
    return <LessonCompletion xpEarned={lesson.xpReward} streak={user.streak} progress={90} />;
  }

  if (lessonState === 'OUT_OF_HEARTS') {
    return <OutOfHeartsModal />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Top Header */}
      <LessonHeader
        currentExercise={currentIndex + 1}
        totalExercises={lesson.exercises.length}
        hearts={user.hearts}
      />

      {/* Main Exercise Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {currentExercise && (
          <ExerciseRenderer
            exercise={currentExercise}
            userAnswer={userAnswer}
            onChangeUserAnswer={setUserAnswer}
            disabled={lessonState !== 'ANSWERING'}
          />
        )}
      </main>

      {/* Bottom Feedback / Action Bar */}
      <FeedbackBar
        lessonState={lessonState}
        hasAnswer={userAnswer !== null && userAnswer !== ''}
        correctAnswerText={correctAnswerText}
        onCheck={handleCheckAnswer}
        onContinue={handleContinue}
      />
    </div>
  );
}
