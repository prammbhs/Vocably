'use client';

import React from 'react';
import { FillBlankExercise } from '@/types/exercise';

interface FillBlankProps {
  exercise: FillBlankExercise;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  disabled?: boolean;
}

export const FillBlank: React.FC<FillBlankProps> = ({
  exercise,
  selectedOption,
  onSelectOption,
  disabled,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-black text-[#3C3C3C]">
        {exercise.prompt}
      </h1>

      {/* Sentence with Blank Space */}
      <div className="p-6 rounded-2xl bg-[#F7F7F7] border-2 border-[#E5E5E5] text-xl font-extrabold text-[#3C3C3C] flex flex-wrap items-center gap-2 min-h-[100px]">
        {exercise.sentenceTokens.map((token, idx) => (
          <React.Fragment key={idx}>
            {token.isBlank ? (
              <span className="inline-block border-b-4 border-[#1CB0F6] px-4 py-1 min-w-[100px] text-center text-[#1CB0F6]">
                {selectedOption || '___'}
              </span>
            ) : (
              <span>{token.text}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Option Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        {exercise.options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={option}
              disabled={disabled}
              onClick={() => onSelectOption(option)}
              className={`p-4 rounded-2xl border-2 border-b-4 font-extrabold text-base transition-all text-center ${
                isSelected
                  ? 'bg-[#E5F6FF] border-[#1CB0F6] text-[#1CB0F6]'
                  : 'bg-white border-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7]'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
