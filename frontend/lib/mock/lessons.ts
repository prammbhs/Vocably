import { LessonData } from '@/types/lesson';

export const mockLessons: Record<string, LessonData> = {
  skill_2: {
    id: 'lesson_2_1',
    skillId: 'skill_2',
    title: 'Basics 1 - Lesson 3',
    totalExercises: 5,
    xpReward: 10,
    exercises: [
      {
        id: 'ex_1',
        type: 'MULTIPLE_CHOICE',
        prompt: 'Select the correct word for "Hello"',
        options: [
          { id: 'opt_1', text: 'Hello' },
          { id: 'opt_2', text: 'Goodbye' },
          { id: 'opt_3', text: 'Water' },
          { id: 'opt_4', text: 'Apple' },
        ],
        correctOptionId: 'opt_1',
      },
      {
        id: 'ex_2',
        type: 'WORD_BANK',
        prompt: 'Translate this sentence into English',
        sentencePrompt: 'Bonjour, comment ça va ?',
        words: ['Hello', 'how', 'are', 'you', 'goodbye', 'fine', 'apple'],
        correctOrder: ['Hello', 'how', 'are', 'you'],
      },
      {
        id: 'ex_3',
        type: 'MATCH_PAIRS',
        prompt: 'Tap the matching pairs',
        pairs: [
          { left: 'Water', right: 'Eau' },
          { left: 'Bread', right: 'Pain' },
          { left: 'Apple', right: 'Pomme' },
          { left: 'Coffee', right: 'Café' },
        ],
      },
      {
        id: 'ex_4',
        type: 'FILL_BLANK',
        prompt: 'Complete the sentence',
        sentenceTokens: [
          { text: 'I would like an', isBlank: false },
          { text: '', isBlank: true },
          { text: 'please.', isBlank: false },
        ],
        options: ['apple', 'running', 'blue', 'sleep'],
        correctAnswer: 'apple',
      },
      {
        id: 'ex_5',
        type: 'TYPE_ANSWER',
        prompt: 'Type the English translation for "Merci beaucoup"',
        sentencePrompt: 'Merci beaucoup',
        correctAnswers: ['Thank you very much', 'Thanks a lot', 'Thank you so much'],
      },
    ],
  },
};
