export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'WORD_BANK'
  | 'MATCH_PAIRS'
  | 'FILL_BLANK'
  | 'TYPE_ANSWER';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  subPrompt?: string;
  audioUrl?: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'MULTIPLE_CHOICE';
  options: { id: string; text: string; image?: string }[];
  correctOptionId: string;
}

export interface WordBankExercise extends BaseExercise {
  type: 'WORD_BANK';
  sentencePrompt: string;
  words: string[];
  correctOrder: string[];
}

export interface MatchPairsExercise extends BaseExercise {
  type: 'MATCH_PAIRS';
  pairs: { left: string; right: string }[];
}

export interface FillBlankExercise extends BaseExercise {
  type: 'FILL_BLANK';
  sentenceTokens: { text: string; isBlank: boolean }[];
  options: string[];
  correctAnswer: string;
}

export interface TypeAnswerExercise extends BaseExercise {
  type: 'TYPE_ANSWER';
  sentencePrompt: string;
  correctAnswers: string[]; // Accepts variations
}

export type Exercise =
  | MultipleChoiceExercise
  | WordBankExercise
  | MatchPairsExercise
  | FillBlankExercise
  | TypeAnswerExercise;
