'use client';

import React from 'react';
import { Exercise } from '@/types/exercise';
import { MultipleChoice } from '../exercises/MultipleChoice';
import { WordBank } from '../exercises/WordBank';
import { MatchPairs } from '../exercises/MatchPairs';
import { FillBlank } from '../exercises/FillBlank';
import { TypeAnswer } from '../exercises/TypeAnswer';

interface ExerciseRendererProps {
  exercise: Exercise;
  userAnswer: unknown;
  onChangeUserAnswer: (answer: unknown) => void;
  disabled?: boolean;
}

export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  userAnswer,
  onChangeUserAnswer,
  disabled,
}) => {
  switch (exercise.type) {
    case 'MULTIPLE_CHOICE':
      return (
        <MultipleChoice
          exercise={exercise}
          selectedOptionId={(userAnswer as string) || null}
          onSelectOption={onChangeUserAnswer}
          disabled={disabled}
        />
      );

    case 'WORD_BANK':
      return (
        <WordBank
          exercise={exercise}
          selectedWords={(userAnswer as string[]) || []}
          onChangeSelectedWords={onChangeUserAnswer}
          disabled={disabled}
        />
      );

    case 'MATCH_PAIRS':
      return (
        <MatchPairs
          exercise={exercise}
          matchedPairs={(userAnswer as string[]) || []}
          onChangeMatchedPairs={onChangeUserAnswer}
          disabled={disabled}
        />
      );

    case 'FILL_BLANK':
      return (
        <FillBlank
          exercise={exercise}
          selectedOption={(userAnswer as string) || null}
          onSelectOption={onChangeUserAnswer}
          disabled={disabled}
        />
      );

    case 'TYPE_ANSWER':
      return (
        <TypeAnswer
          exercise={exercise}
          typedAnswer={(userAnswer as string) || ''}
          onChangeTypedAnswer={onChangeUserAnswer}
          disabled={disabled}
        />
      );

    default:
      return <div>Unknown exercise type</div>;
  }
};
