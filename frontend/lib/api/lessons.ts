import { LessonData, AnswerSubmissionResult } from '@/types/lesson';
import { mockLessons } from '@/lib/mock/lessons';
import { fetchApi } from './client';

export async function getLesson(lessonId: string): Promise<LessonData> {
  const data = await fetchApi<LessonData>(`/lessons/${lessonId}`);
  if (data) {
    return data;
  }
  return mockLessons[lessonId] || mockLessons.skill_2;
}

export async function submitExerciseAnswer(
  lessonId: string,
  exerciseId: string,
  userAnswer: unknown,
  currentHearts: number
): Promise<AnswerSubmissionResult> {
  const data = await fetchApi<AnswerSubmissionResult>(`/lessons/${lessonId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ exerciseId, userAnswer }),
  });

  if (data) {
    return data;
  }

  // Standalone Mock fallback validation
  const lesson = mockLessons[lessonId] || mockLessons.skill_2;
  const ex = lesson.exercises.find((e) => e.id === exerciseId);

  let isCorrect = false;
  let correctAnswerText = '';

  if (ex) {
    if (ex.type === 'MULTIPLE_CHOICE') {
      isCorrect = userAnswer === ex.correctOptionId;
      const correctOpt = ex.options.find((o) => o.id === ex.correctOptionId);
      correctAnswerText = correctOpt?.text || '';
    } else if (ex.type === 'WORD_BANK') {
      const arr = userAnswer as string[];
      isCorrect = JSON.stringify(arr) === JSON.stringify(ex.correctOrder);
      correctAnswerText = ex.correctOrder.join(' ');
    } else if (ex.type === 'MATCH_PAIRS') {
      isCorrect = true; // Pair matching handles state dynamically
    } else if (ex.type === 'FILL_BLANK') {
      isCorrect = (userAnswer as string).toLowerCase().trim() === ex.correctAnswer.toLowerCase().trim();
      correctAnswerText = ex.correctAnswer;
    } else if (ex.type === 'TYPE_ANSWER') {
      const str = (userAnswer as string).toLowerCase().trim();
      isCorrect = ex.correctAnswers.some((ans) => ans.toLowerCase().trim() === str);
      correctAnswerText = ex.correctAnswers[0];
    }
  }

  return {
    isCorrect,
    correctAnswerText,
    remainingHearts: isCorrect ? currentHearts : Math.max(0, currentHearts - 1),
    xpEarned: isCorrect ? 2 : 0,
  };
}
