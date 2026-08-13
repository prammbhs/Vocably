'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { LessonState } from '@/types/lesson';

interface FeedbackBarProps {
  lessonState: LessonState;
  hasAnswer: boolean;
  correctAnswerText?: string;
  onCheck: () => void;
  onContinue: () => void;
}

export const FeedbackBar: React.FC<FeedbackBarProps> = ({
  lessonState,
  hasAnswer,
  correctAnswerText,
  onCheck,
  onContinue,
}) => {
  const isCorrect = lessonState === 'FEEDBACK_CORRECT';
  const isIncorrect = lessonState === 'FEEDBACK_INCORRECT';

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-0 left-0 right-0 py-6 px-4 border-t-2 transition-colors duration-200 z-50 ${
        isCorrect
          ? 'bg-[#d7ffb8] border-[#b8f28b]'
          : isIncorrect
          ? 'bg-[#ffdfe0] border-[#ffb3b5]'
          : 'bg-white border-[#E5E5E5]'
      }`}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Feedback Messages */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {isCorrect && (
            <>
              <div className="w-12 h-12 rounded-full bg-[#58CC02] flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#58A700]">Great job!</span>
                <span className="text-sm font-bold text-[#58A700]">You got it right.</span>
              </div>
            </>
          )}

          {isIncorrect && (
            <>
              <div className="w-12 h-12 rounded-full bg-[#FF4B4B] flex items-center justify-center text-white shrink-0">
                <XCircle className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#EA2B2B]">Not quite</span>
                {correctAnswerText && (
                  <span className="text-sm font-extrabold text-[#EA2B2B]">
                    Correct answer: <span className="underline">{correctAnswerText}</span>
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="w-full md:w-48">
          {isCorrect || isIncorrect ? (
            <Button
              variant={isCorrect ? 'green' : 'red' as any}
              size="lg"
              fullWidth
              onClick={onContinue}
              className={isIncorrect ? 'bg-[#FF4B4B] border-[#EA2B2B] shadow-[#EA2B2B]' : ''}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="green"
              size="lg"
              fullWidth
              disabled={!hasAnswer || lessonState === 'SUBMITTING'}
              onClick={onCheck}
            >
              Check
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
