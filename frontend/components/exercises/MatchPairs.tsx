'use client';

import React, { useState } from 'react';
import { MatchPairsExercise } from '@/types/exercise';

interface MatchPairsProps {
  exercise: MatchPairsExercise;
  matchedPairs: string[]; // Store left values of solved pairs
  onChangeMatchedPairs: (matched: string[]) => void;
  disabled?: boolean;
}

export const MatchPairs: React.FC<MatchPairsProps> = ({
  exercise,
  matchedPairs,
  onChangeMatchedPairs,
  disabled,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const leftItems = exercise.pairs.map((p) => p.left);
  // Deterministic shuffle for right items
  const rightItems = exercise.pairs.map((p) => p.right);

  const handleLeftClick = (item: string) => {
    if (disabled || matchedPairs.includes(item)) return;
    setSelectedLeft(item);

    if (selectedRight) {
      checkPairMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item: string) => {
    if (disabled) return;
    setSelectedRight(item);

    if (selectedLeft) {
      checkPairMatch(selectedLeft, item);
    }
  };

  const checkPairMatch = (left: string, right: string) => {
    const pair = exercise.pairs.find((p) => p.left === left && p.right === right);
    if (pair) {
      const updated = [...matchedPairs, left];
      onChangeMatchedPairs(updated);
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-black text-[#3C3C3C]">
        {exercise.prompt}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {leftItems.map((item) => {
            const isMatched = matchedPairs.includes(item);
            const isSelected = selectedLeft === item;
            return (
              <button
                key={item}
                disabled={disabled || isMatched}
                onClick={() => handleLeftClick(item)}
                className={`p-4 rounded-2xl border-2 border-b-4 font-extrabold text-base transition-all text-center ${
                  isMatched
                    ? 'bg-[#E5E5E5] border-[#D7D7D7] text-[#AFAFAF] cursor-default'
                    : isSelected
                    ? 'bg-[#E5F6FF] border-[#1CB0F6] text-[#1CB0F6]'
                    : 'bg-white border-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {rightItems.map((item) => {
            const isMatched = exercise.pairs.some(
              (p) => p.right === item && matchedPairs.includes(p.left)
            );
            const isSelected = selectedRight === item;
            return (
              <button
                key={item}
                disabled={disabled || isMatched}
                onClick={() => handleRightClick(item)}
                className={`p-4 rounded-2xl border-2 border-b-4 font-extrabold text-base transition-all text-center ${
                  isMatched
                    ? 'bg-[#E5E5E5] border-[#D7D7D7] text-[#AFAFAF] cursor-default'
                    : isSelected
                    ? 'bg-[#E5F6FF] border-[#1CB0F6] text-[#1CB0F6]'
                    : 'bg-white border-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
