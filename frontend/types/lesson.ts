import { Exercise } from './exercise';

export type LessonState =
  | 'ANSWERING'
  | 'SUBMITTING'
  | 'FEEDBACK_CORRECT'
  | 'FEEDBACK_INCORRECT'
  | 'COMPLETED'
  | 'OUT_OF_HEARTS';

export interface LessonData {
  id: string;
  skillId: string;
  title: string;
  totalExercises: number;
  exercises: Exercise[];
  xpReward: number;
}

export interface AnswerSubmissionResult {
  isCorrect: boolean;
  correctAnswerText?: string;
  explanation?: string;
  remainingHearts: number;
  xpEarned?: number;
}
