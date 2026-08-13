export interface User {
  id: number;
  username: string;
  display_name: string;
  avatar_url?: string;
  total_xp: number;
  weekly_xp: number;
  hearts: number;
  current_streak: number;
  longest_streak: number;
  daily_goal: number;
  gems?: number;
}

export interface ExerciseOption {
  id: string;
  text: string;
}

export interface ExercisePair {
  left: string;
  right: string;
}

export interface ExerciseData {
  options?: (ExerciseOption | string)[];
  correct_option?: string;
  prompt_translation?: string;
  correct_sequence?: string[];
  pairs?: ExercisePair[];
  sentence_with_blank?: string;
  accepted_answers?: string[];
}

export interface Exercise {
  id: number;
  lesson_id: number;
  type: 'MULTIPLE_CHOICE' | 'WORD_BANK' | 'MATCH_PAIRS' | 'FILL_BLANK' | 'TYPE_ANSWER';
  prompt: string;
  data: ExerciseData;
  order_index: number;
}

export interface Lesson {
  id: number;
  skill_id: number;
  title: string;
  description?: string;
  order_index: number;
  xp_reward: number;
  status: string;
  exercises: Exercise[];
}

export interface Skill {
  id: number;
  unit_id: number;
  title: string;
  description?: string;
  icon?: string;
  order_index: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'LOCKED';
  total_lessons: number;
  completed_lessons: number;
  lessons: Lesson[];
}

export interface Unit {
  id: number;
  course_id: number;
  title: string;
  description: string;
  order_index: number;
  skills: Skill[];
}

export interface CoursePath {
  id: number;
  name: string;
  language: string;
  description?: string;
  image_url?: string;
  units: Unit[];
}

export interface LeaderboardUser {
  rank: number;
  user_id: number;
  username: string;
  display_name: string;
  avatar_url?: string;
  weekly_xp: number;
  total_xp: number;
  is_current_user: boolean;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
  user_rank: number | null;
}

export interface AnswerFeedbackResponse {
  correct: boolean;
  feedback: string;
  correct_answer?: string | null;
  hearts_remaining: number;
}

export interface LessonCompletionResponse {
  lesson_completed: boolean;
  xp_earned: number;
  total_xp: number;
  weekly_xp: number;
  daily_xp: number;
  daily_goal: number;
  daily_goal_completed: boolean;
  streak: number;
  longest_streak: number;
  skill_progress: number;
  skill_status: string;
  next_skill_unlocked: boolean;
}

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');
const API_BASE_URL = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}

// 1. User details
export async function getCurrentUser(): Promise<User> {
  return await fetchAPI<User>('/users/me');
}

// 2. Course Path (Tree of Units, Skills, Lessons with progression)
export async function getCoursePath(): Promise<CoursePath> {
  return await fetchAPI<CoursePath>('/course/path');
}

// 3. Lesson details with exercises
export async function getLesson(lessonId: number): Promise<Lesson> {
  return await fetchAPI<Lesson>(`/lessons/${lessonId}`);
}

// 4. Verify answer to exercise via backend algorithm
export async function submitExerciseAnswer(
  lessonId: number,
  exerciseId: number,
  answerPayload: any
): Promise<AnswerFeedbackResponse> {
  return await fetchAPI<AnswerFeedbackResponse>(`/lessons/${lessonId}/exercises/${exerciseId}/answer`, {
    method: 'POST',
    body: JSON.stringify({ answer: answerPayload }),
  });
}

// 5. Complete lesson via backend
export async function submitLessonCompletion(lessonId: number): Promise<LessonCompletionResponse> {
  return await fetchAPI<LessonCompletionResponse>(`/lessons/${lessonId}/complete`, {
    method: 'POST',
  });
}

// 6. Leaderboard endpoint
export async function getLeaderboard(): Promise<LeaderboardResponse> {
  return await fetchAPI<LeaderboardResponse>('/leaderboard');
}

// 7. Practice Heart Refill endpoint
export async function practiceHeartRefill(): Promise<{ message: string; hearts_restored: number; hearts_remaining: number }> {
  return await fetchAPI<{ message: string; hearts_restored: number; hearts_remaining: number }>('/practice', {
    method: 'POST',
  });
}
