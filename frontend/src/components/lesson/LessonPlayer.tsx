'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Heart, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Lesson,
  Exercise,
  submitExerciseAnswer,
  submitLessonCompletion,
  getCurrentUser,
  LessonCompletionResponse,
} from '@/lib/api/client';

interface LessonPlayerProps {
  lesson: Lesson;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({ lesson }) => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);

  // Exercise input states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');

  // Status & Feedback states
  const [status, setStatus] = useState<'answering' | 'correct' | 'incorrect'>('answering');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [correctAnswerTip, setCorrectAnswerTip] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionData, setCompletionData] = useState<LessonCompletionResponse | null>(null);

  const currentExercise: Exercise = lesson.exercises[currentIndex];
  const progressPercent = (currentIndex / lesson.exercises.length) * 100;

  // Load initial hearts from backend user
  useEffect(() => {
    async function loadUser() {
      try {
        const u = await getCurrentUser();
        setHearts(u.hearts);
      } catch (err) {
        console.warn('Failed to load user hearts:', err);
      }
    }
    loadUser();
  }, []);

  // Reset exercise local state when step changes
  useEffect(() => {
    setSelectedOption(null);
    setSelectedWords([]);
    setMatchedPairs({});
    setSelectedLeft(null);
    setTypedAnswer('');
    setStatus('answering');
    setFeedbackMessage('');
    setCorrectAnswerTip(null);
  }, [currentIndex]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleWordBankTap = (word: string) => {
    if (status !== 'answering') return;
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handlePairTap = (left: string, right: string) => {
    if (status !== 'answering') return;
    setMatchedPairs((prev) => ({ ...prev, [left]: right }));
    setSelectedLeft(null);
  };

  const validateAnswer = async () => {
    if (status !== 'answering' || !currentExercise) return;

    let payload: any = {};
    const exType = currentExercise.type;

    if (exType === 'MULTIPLE_CHOICE') {
      payload = { option_id: selectedOption };
    } else if (exType === 'WORD_BANK') {
      payload = { sequence: selectedWords };
    } else if (exType === 'FILL_BLANK') {
      payload = { selected_word: selectedOption };
    } else if (exType === 'TYPE_ANSWER') {
      payload = { text: typedAnswer };
    } else if (exType === 'MATCH_PAIRS') {
      payload = {
        pairs: Object.entries(matchedPairs).map(([left, right]) => ({ left, right })),
      };
    }

    try {
      const result = await submitExerciseAnswer(lesson.id, currentExercise.id, payload);
      setHearts(result.hearts_remaining);
      setTotalAttempts((prev) => prev + 1);

      if (result.correct) {
        setStatus('correct');
        setCorrectAttempts((prev) => prev + 1);
        setFeedbackMessage(result.feedback || "Good job!");
      } else {
        setStatus('incorrect');
        setFeedbackMessage(result.feedback || "Not quite!");
        setCorrectAnswerTip(result.correct_answer || null);
      }
    } catch (err) {
      console.error('Error submitting exercise answer:', err);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < lesson.exercises.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed lesson
      try {
        const res = await submitLessonCompletion(lesson.id);
        setCompletionData(res);
      } catch (err) {
        console.error('Error completing lesson:', err);
      }
      setIsCompleted(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  };

  if (isCompleted) {
    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 100;
    const xpGained = completionData?.xp_earned ?? lesson.xp_reward;

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <h1 className="text-3xl font-extrabold text-[#ffc800] mb-2 uppercase tracking-wide">
          Lesson Complete!
        </h1>
        <p className="text-[#777] font-bold text-lg mb-8">You showed great skill!</p>

        <div className="flex gap-4 mb-12">
          <div className="bg-[#ffc800] text-white p-5 rounded-2xl border-b-4 border-[#e5a000] w-36">
            <span className="text-xs font-black uppercase tracking-wider block opacity-90">Total XP</span>
            <span className="text-3xl font-black">+{xpGained}</span>
          </div>
          <div className="bg-[#58cc02] text-white p-5 rounded-2xl border-b-4 border-[#46a302] w-36">
            <span className="text-xs font-black uppercase tracking-wider block opacity-90">Accuracy</span>
            <span className="text-3xl font-black">{accuracy}%</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/learn')}
          className="w-full max-w-sm bg-[#58cc02] text-white font-extrabold text-lg py-4 rounded-2xl border-b-4 border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wider shadow-lg"
        >
          Continue
        </button>
      </div>
    );
  }

  const exType = currentExercise?.type;
  const isCheckDisabled =
    ((exType === 'MULTIPLE_CHOICE' || exType === 'FILL_BLANK') && !selectedOption) ||
    (exType === 'WORD_BANK' && selectedWords.length === 0) ||
    (exType === 'TYPE_ANSWER' && !typedAnswer.trim()) ||
    (exType === 'MATCH_PAIRS' &&
      Object.keys(matchedPairs).length !== (currentExercise?.data?.pairs?.length || 0));

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="max-w-[1056px] w-full mx-auto px-6 py-6 flex items-center gap-6">
        <button
          onClick={() => router.push('/learn')}
          className="text-[#afafaf] hover:text-[#4b4b4b] transition-colors p-1"
        >
          <X className="w-7 h-7 stroke-[3]" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-3.5 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#58cc02] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts counter */}
        <div className="flex items-center gap-2 text-[#ff4b4b] font-bold text-lg">
          <Heart className="w-7 h-7 fill-[#ff4b4b] stroke-[#ff4b4b]" />
          <span>{hearts}</span>
        </div>
      </header>

      {/* Main Exercise Content Container */}
      <main className="max-w-[600px] w-full mx-auto px-6 flex-1 flex flex-col justify-center py-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-extrabold text-[#4b4b4b]">{currentExercise?.prompt}</h2>
          <button
            onClick={() => speakText(currentExercise.prompt)}
            className="p-2 rounded-xl bg-[#1cb0f6]/10 text-[#1cb0f6] hover:bg-[#1cb0f6]/20 transition-all"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Multiple Choice & Fill in the Blank */}
        {(exType === 'MULTIPLE_CHOICE' || exType === 'FILL_BLANK') && (
          <div className="grid grid-cols-2 gap-4">
            {currentExercise.data.options?.map((opt: any) => {
              const optId = typeof opt === 'object' ? opt.id : opt;
              const optText = typeof opt === 'object' ? opt.text : opt;
              return (
                <button
                  key={optId}
                  onClick={() => status === 'answering' && setSelectedOption(optId)}
                  className={`p-5 rounded-2xl border-2 border-b-4 font-bold text-lg text-left transition-all ${
                    selectedOption === optId
                      ? 'border-[#84d8ff] bg-[#ddf4ff] text-[#1cb0f6] border-b-[#1cb0f6]'
                      : 'border-[#e5e5e5] text-[#4b4b4b] hover:bg-[#f7f7f7]'
                  }`}
                >
                  {optText}
                </button>
              );
            })}
          </div>
        )}

        {/* Translate / Word Bank */}
        {exType === 'WORD_BANK' && (
          <div>
            {/* Selected words drop line */}
            <div className="min-h-[70px] border-b-2 border-[#e5e5e5] mb-8 flex flex-wrap gap-2 p-2 items-center">
              {selectedWords.map((word) => (
                <button
                  key={word}
                  onClick={() => handleWordBankTap(word)}
                  className="px-4 py-2 bg-white rounded-xl border-2 border-b-4 border-[#e5e5e5] font-bold text-[#4b4b4b] text-base shadow-sm"
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Word bank pool */}
            <div className="flex flex-wrap gap-3 justify-center">
              {currentExercise.data.options?.map((word: any) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <button
                    key={word}
                    disabled={isSelected}
                    onClick={() => handleWordBankTap(word)}
                    className={`px-4 py-2.5 rounded-xl border-2 border-b-4 font-bold text-base transition-all ${
                      isSelected
                        ? 'bg-[#e5e5e5] border-transparent text-transparent cursor-default'
                        : 'bg-white border-[#e5e5e5] text-[#4b4b4b] hover:bg-[#f7f7f7]'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Type Answer */}
        {exType === 'TYPE_ANSWER' && (
          <textarea
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            disabled={status !== 'answering'}
            placeholder="Type your response in English..."
            className="w-full h-36 p-4 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] outline-none font-bold text-lg text-[#4b4b4b] resize-none bg-[#f7f7f7]"
          />
        )}

        {/* Match Pairs */}
        {exType === 'MATCH_PAIRS' && (
          <div className="grid grid-cols-2 gap-4">
            {currentExercise.data.pairs?.map((pair: any) => {
              const isMatched = matchedPairs[pair.left] === pair.right;
              const isSelected = selectedLeft === pair.left;

              return (
                <React.Fragment key={pair.left}>
                  <button
                    onClick={() => setSelectedLeft(pair.left)}
                    disabled={isMatched}
                    className={`p-4 rounded-2xl border-2 border-b-4 font-bold text-base transition-all ${
                      isMatched
                        ? 'bg-[#e5e5e5] border-transparent text-[#afafaf]'
                        : isSelected
                        ? 'border-[#84d8ff] bg-[#ddf4ff] text-[#1cb0f6]'
                        : 'border-[#e5e5e5] text-[#4b4b4b] hover:bg-[#f7f7f7]'
                    }`}
                  >
                    {pair.left}
                  </button>
                  <button
                    onClick={() => selectedLeft && handlePairTap(selectedLeft, pair.right)}
                    disabled={isMatched}
                    className={`p-4 rounded-2xl border-2 border-b-4 font-bold text-base transition-all ${
                      isMatched
                        ? 'bg-[#e5e5e5] border-transparent text-[#afafaf]'
                        : 'border-[#e5e5e5] text-[#4b4b4b] hover:bg-[#f7f7f7]'
                    }`}
                  >
                    {pair.right}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </main>

      {/* Signature Sticky Bottom Feedback Footer Bar */}
      <footer
        className={`border-t-2 py-6 px-6 transition-colors duration-200 ${
          status === 'correct'
            ? 'bg-[#d7ffb8] border-[#b8f28b]'
            : status === 'incorrect'
            ? 'bg-[#ffdfe0] border-[#ffb8b8]'
            : 'bg-white border-[#e5e5e5]'
        }`}
      >
        <div className="max-w-[1056px] w-full mx-auto flex items-center justify-between">
          {/* Feedback banner info */}
          {status === 'correct' ? (
            <div className="flex items-center gap-4 text-[#58cc02]">
              <CheckCircle2 className="w-10 h-10 fill-[#58cc02] text-white" />
              <div>
                <h3 className="text-xl font-extrabold">{feedbackMessage}</h3>
                <p className="text-sm font-bold text-[#58cc02]/80">Great job!</p>
              </div>
            </div>
          ) : status === 'incorrect' ? (
            <div className="flex items-center gap-4 text-[#ff4b4b]">
              <XCircle className="w-10 h-10 fill-[#ff4b4b] text-white" />
              <div>
                <h3 className="text-xl font-extrabold">{feedbackMessage}</h3>
                {correctAnswerTip && (
                  <p className="text-base font-bold text-[#ff4b4b]">Correct answer: {correctAnswerTip}</p>
                )}
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* Action Button */}
          {status === 'answering' ? (
            <button
              disabled={isCheckDisabled}
              onClick={validateAnswer}
              className={`px-10 py-3.5 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-all border-b-4 ${
                isCheckDisabled
                  ? 'bg-[#e5e5e5] text-[#afafaf] border-transparent cursor-not-allowed'
                  : 'bg-[#58cc02] text-white border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-1 shadow-md'
              }`}
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`px-10 py-3.5 rounded-2xl font-extrabold text-base uppercase tracking-wider text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-md ${
                status === 'correct'
                  ? 'bg-[#58cc02] border-[#46a302] hover:brightness-105'
                  : 'bg-[#ff4b4b] border-[#ea2b2b] hover:brightness-105'
              }`}
            >
              Continue
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
