'use client';

import React from 'react';
import { TypeAnswerExercise } from '@/types/exercise';

interface TypeAnswerProps {
  exercise: TypeAnswerExercise;
  typedAnswer: string;
  onChangeTypedAnswer: (text: string) => void;
  disabled?: boolean;
}

export const TypeAnswer: React.FC<TypeAnswerProps> = ({
  exercise,
  typedAnswer,
  onChangeTypedAnswer,
  disabled,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-black text-[#3C3C3C]">
        {exercise.prompt}
      </h1>

      <div className="p-4 rounded-2xl bg-[#F7F7F7] border-2 border-[#E5E5E5] text-lg font-bold text-[#3C3C3C]">
        {exercise.sentencePrompt}
      </div>

      <textarea
        disabled={disabled}
        value={typedAnswer}
        onChange={(e) => onChangeTypedAnswer(e.target.value)}
        placeholder="Type in English..."
        rows={3}
        className="w-full p-4 rounded-2xl border-2 border-b-4 border-[#E5E5E5] focus:border-[#1CB0F6] outline-none text-lg font-extrabold text-[#3C3C3C] resize-none bg-white transition-colors"
      />
    </div>
  );
};
