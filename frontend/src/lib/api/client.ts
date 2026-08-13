export interface User {
  id: number;
  username: string;
  email: string;
  streak_count: number;
  xp_total: number;
  hearts: number;
  gems: number;
  current_course_id?: number;
}

export interface Exercise {
  id: number;
  lesson_id: number;
  order_index: number;
  type: 'multiple_choice' | 'translate' | 'match_pairs' | 'fill_in_blank' | 'type_answer';
  prompt: string;
  options?: string[]; // for multiple choice & word bank
  pairs?: { left: string; right: string }[]; // for match pairs
  correct_answer: string;
  audio_url?: string;
}

export interface Lesson {
  id: number;
  skill_id: number;
  title: string;
  order_index: number;
  is_completed: boolean;
  exercises: Exercise[];
}

export interface Skill {
  id: number;
  unit_id: number;
  title: string;
  icon?: string;
  order_index: number;
  status: 'completed' | 'active' | 'locked';
  total_lessons: number;
  completed_lessons: number;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  order_index: number;
  skills: Skill[];
}

export interface LeaderboardEntry {
  rank: number;
  user_id: number;
  username: string;
  avatar_url?: string;
  xp: number;
  is_current_user?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
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
  } catch (err) {
    console.warn(`Falling back for endpoint ${endpoint}:`, err);
    throw err;
  }
}

// Fallback mock data when backend endpoints are offline or returning 404
export const mockUser: User = {
  id: 1,
  username: 'DuoLearner',
  email: 'learner@duolingo.com',
  streak_count: 5,
  xp_total: 350,
  hearts: 5,
  gems: 420,
  current_course_id: 1,
};

export const mockUnits: Unit[] = [
  {
    id: 1,
    title: 'SECTION 1, UNIT 1',
    description: 'Form basic sentences, introduce yourself, and greet people',
    order_index: 1,
    skills: [
      { id: 101, unit_id: 1, title: 'Basics 1', icon: 'start', order_index: 1, status: 'active', total_lessons: 5, completed_lessons: 2 },
      { id: 102, unit_id: 1, title: 'Greetings', icon: 'chat', order_index: 2, status: 'locked', total_lessons: 4, completed_lessons: 0 },
      { id: 103, unit_id: 1, title: 'Travel', icon: 'plane', order_index: 3, status: 'locked', total_lessons: 5, completed_lessons: 0 },
      { id: 104, unit_id: 1, title: 'Chest 1', icon: 'chest', order_index: 4, status: 'locked', total_lessons: 1, completed_lessons: 0 },
      { id: 105, unit_id: 1, title: 'Food', icon: 'apple', order_index: 5, status: 'locked', total_lessons: 4, completed_lessons: 0 },
    ],
  },
  {
    id: 2,
    title: 'SECTION 1, UNIT 2',
    description: 'Talk about food, order at restaurants, and describe things',
    order_index: 2,
    skills: [
      { id: 201, unit_id: 2, title: 'Food & Drink', icon: 'coffee', order_index: 1, status: 'locked', total_lessons: 5, completed_lessons: 0 },
      { id: 202, unit_id: 2, title: 'Plurals', icon: 'book', order_index: 2, status: 'locked', total_lessons: 4, completed_lessons: 0 },
      { id: 203, unit_id: 2, title: 'Chest 2', icon: 'chest', order_index: 3, status: 'locked', total_lessons: 1, completed_lessons: 0 },
    ],
  },
];

export const mockExercises: Exercise[] = [
  {
    id: 1,
    lesson_id: 1,
    order_index: 1,
    type: 'multiple_choice',
    prompt: 'Which one of these is "the apple"?',
    options: ['el agua', 'la manzana', 'el niño', 'la mujer'],
    correct_answer: 'la manzana',
  },
  {
    id: 2,
    lesson_id: 1,
    order_index: 2,
    type: 'translate',
    prompt: 'Translate this sentence: "The boy eats bread"',
    options: ['El', 'niño', 'come', 'pan', 'la', 'manzana', 'bebe', 'agua'],
    correct_answer: 'El niño come pan',
  },
  {
    id: 3,
    lesson_id: 1,
    order_index: 3,
    type: 'match_pairs',
    prompt: 'Tap the matching pairs',
    pairs: [
      { left: 'Apple', right: 'Manzana' },
      { left: 'Boy', right: 'Niño' },
      { left: 'Water', right: 'Agua' },
      { left: 'Bread', right: 'Pan' },
    ],
    correct_answer: 'matched_all',
  },
  {
    id: 4,
    lesson_id: 1,
    order_index: 4,
    type: 'fill_in_blank',
    prompt: 'Complete the sentence: "Yo _____ agua"',
    options: ['bebo', 'comes', 'es', 'son'],
    correct_answer: 'bebo',
  },
  {
    id: 5,
    lesson_id: 1,
    order_index: 5,
    type: 'type_answer',
    prompt: 'Type in Spanish: "Good morning"',
    correct_answer: 'Buenos días',
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user_id: 101, username: 'Sofia_ES', xp: 1240, avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sofia' },
  { rank: 2, user_id: 102, username: 'Marco_Polo', xp: 980, avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Marco' },
  { rank: 3, user_id: 1, username: 'DuoLearner', xp: 350, is_current_user: true, avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Duo' },
  { rank: 4, user_id: 104, username: 'Elena_V', xp: 310, avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Elena' },
  { rank: 5, user_id: 105, username: 'Alex_Dev', xp: 220, avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex' },
];

export async function getCurrentUser(): Promise<User> {
  try {
    return await fetchAPI<User>('/users/me');
  } catch {
    return mockUser;
  }
}

export async function getCourseTree(): Promise<Unit[]> {
  try {
    return await fetchAPI<Unit[]>('/courses/active/tree');
  } catch {
    return mockUnits;
  }
}

export async function getLesson(lessonId: number): Promise<Lesson> {
  try {
    return await fetchAPI<Lesson>(`/lessons/${lessonId}`);
  } catch {
    return {
      id: lessonId,
      skill_id: 101,
      title: 'Basics 1 - Lesson 1',
      order_index: 1,
      is_completed: false,
      exercises: mockExercises,
    };
  }
}

export async function submitLessonCompletion(lessonId: number, xpEarned: number): Promise<{ success: boolean; new_xp: number; new_streak: number }> {
  try {
    return await fetchAPI<{ success: boolean; new_xp: number; new_streak: number }>(`/lessons/${lessonId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ xp_earned: xpEarned }),
    });
  } catch {
    return { success: true, new_xp: mockUser.xp_total + xpEarned, new_streak: mockUser.streak_count };
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    return await fetchAPI<LeaderboardEntry[]>('/leaderboard');
  } catch {
    return mockLeaderboard;
  }
}
