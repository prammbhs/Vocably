'use client';

import React from 'react';
import { MultipleChoiceExercise } from '@/types/exercise';

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  exercise,
  selectedOptionId,
  onSelectOption,
  disabled,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-black text-[#3C3C3C]">
        {exercise.prompt}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exercise.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              disabled={disabled}
              onClick={() => onSelectOption(option.id)}
              className={`p-5 rounded-2xl border-2 border-b-4 text-left font-extrabold text-lg transition-all flex items-center gap-4 cursor-pointer ${
                isSelected
                  ? 'bg-[#E5F6FF] border-[#1CB0F6] border-b-[#1899D6] text-[#1CB0F6]'
                  : 'bg-white border-[#E5E5E5] border-b-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7]'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center text-sm ${
                  isSelected
                    ? 'border-[#1CB0F6] text-[#1CB0F6] bg-white'
                    : 'border-[#E5E5E5] text-[#777777]'
                }`}
              >
                {index + 1}
              </span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
