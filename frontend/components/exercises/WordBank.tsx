'use client';

import React from 'react';
import { WordBankExercise } from '@/types/exercise';

interface WordBankProps {
  exercise: WordBankExercise;
  selectedWords: string[];
  onChangeSelectedWords: (words: string[]) => void;
  disabled?: boolean;
}

export const WordBank: React.FC<WordBankProps> = ({
  exercise,
  selectedWords,
  onChangeSelectedWords,
  disabled,
}) => {
  const handleSelectWord = (word: string, index: number) => {
    if (disabled) return;
    onChangeSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (disabled) return;
    const next = [...selectedWords];
    next.splice(index, 1);
    onChangeSelectedWords(next);
  };

  // Track remaining word counts for words bank
  const wordCounts: Record<string, number> = {};
  exercise.words.forEach((w) => {
    wordCounts[w] = (wordCounts[w] || 0) + 1;
  });

  selectedWords.forEach((w) => {
    if (wordCounts[w]) {
      wordCounts[w]--;
    }
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-black text-[#3C3C3C]">
        {exercise.prompt}
      </h1>

      {/* Target Sentence Prompt */}
      <div className="p-4 rounded-2xl bg-[#F7F7F7] border-2 border-[#E5E5E5] text-lg font-bold text-[#3C3C3C]">
        {exercise.sentencePrompt}
      </div>

      {/* Selected Words Answer Area */}
      <div className="min-h-[90px] p-4 rounded-2xl border-2 border-b-4 border-[#E5E5E5] bg-white flex flex-wrap items-center gap-2">
        {selectedWords.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            disabled={disabled}
            onClick={() => handleRemoveWord(idx)}
            className="px-4 py-2.5 rounded-xl bg-white border-2 border-b-4 border-[#E5E5E5] border-b-[#D7D7D7] font-extrabold text-base text-[#3C3C3C] hover:bg-[#F7F7F7] active:translate-y-0.5 cursor-pointer shadow-xs"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word Bank Pool */}
      <div className="flex flex-wrap gap-2.5 pt-4 justify-center">
        {exercise.words.map((word, idx) => {
          const isUsed = (wordCounts[word] || 0) <= 0;
          return (
            <button
              key={`${word}-${idx}`}
              disabled={disabled || isUsed}
              onClick={() => handleSelectWord(word, idx)}
              className={`px-4 py-2.5 rounded-xl border-2 border-b-4 font-extrabold text-base transition-all select-none ${
                isUsed
                  ? 'bg-[#E5E5E5] border-[#D7D7D7] border-b-[#D7D7D7] text-transparent cursor-not-allowed'
                  : 'bg-white border-[#E5E5E5] border-b-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7] active:translate-y-0.5 cursor-pointer shadow-xs'
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
};
