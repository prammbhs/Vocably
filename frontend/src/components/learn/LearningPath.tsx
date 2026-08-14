'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Star, Lock, Check, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { Unit, Quest, claimQuest } from '@/lib/api/client';

interface LearningPathProps {
  units: Unit[];
  quests?: Quest[];
  onRefreshData?: () => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({ units, quests = [], onRefreshData }) => {
  // S-curve lateral offsets for nodes to replicate Duolingo tree (aligned so index 2 is centered)
  const offsets = [0, 45, 0, -45, 0, 45, 0, -45];

  const [activeModalQuest, setActiveModalQuest] = useState<Quest | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);

  // Determine current active unit index (first unit containing non-completed skills)
  const currentActiveUnitIndex = units.findIndex((u) => u.skills.some((s) => s.status !== 'COMPLETED'));
  const defaultUnitId = currentActiveUnitIndex !== -1 ? units[currentActiveUnitIndex].id : (units[0]?.id || 1);

  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  // Active unit being viewed
  const activeViewUnitId = selectedUnitId ?? defaultUnitId;

  // Check if ALL skills across all units are COMPLETED
  const allSkills = units.flatMap((u) => u.skills);
  const isCourseFullyCompleted = allSkills.length > 0 && allSkills.every((s) => s.status === 'COMPLETED');

  // Filter units to display: show only the active unit on main view
  const visibleUnits = units.filter((u) => u.id === activeViewUnitId);

  const getChestQuestForUnit = (unitId: number) => {
    // Unit 1 -> Quest #1 ("Unit 1 Treasure Chest")
    // Unit 2 -> Quest #2 ("Unit 2 Treasure Chest")
    const questId = unitId === 2 ? 2 : 1;
    return quests.find((q) => q.id === questId) || quests[0];
  };

  const handleChestClick = (isAvailable: boolean, unitId: number) => {
    const q = getChestQuestForUnit(unitId);
    if (isAvailable && q) {
      setActiveModalQuest(q);
    }
  };

  const handleClaimChestQuest = async (questToClaim: Quest) => {
    if (!questToClaim || claiming) return;
    try {
      setClaiming(true);
      const res = await claimQuest(questToClaim.id);
      setToastMessage(res.message);
      if (onRefreshData) {
        onRefreshData();
      }
      setTimeout(() => setToastMessage(null), 3500);
      setActiveModalQuest(null);
    } catch (err: any) {
      alert(err?.message || 'Failed to claim chest quest');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="flex-1 max-w-[592px] w-full mx-auto pb-24 pt-4 px-4 sm:px-6 select-none overflow-x-hidden [--node-scale:0.55] min-[400px]:[--node-scale:0.75] sm:[--node-scale:1]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 z-50 left-1/2 -translate-x-1/2 bg-[#58cc02] text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2 animate-bounce font-black text-sm">
          <Sparkles className="w-5 h-5 fill-white stroke-none" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Course Completed Congratulatory Banner */}
      {isCourseFullyCompleted && (
        <div className="bg-gradient-to-r from-[#ffc800] via-[#ff9600] to-[#ff4b4b] text-white rounded-3xl p-6 mb-8 text-center shadow-xl border-4 border-amber-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="text-6xl mb-3 animate-bounce">🏆</div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider mb-2">
            Course Mastered!
          </h2>
          <p className="text-sm font-bold opacity-95 max-w-md mx-auto mb-4">
            Congratulations! You have completed all the lessons for Hindi. You showed amazing dedication!
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-xs font-black uppercase tracking-wider">
            <span>🎉 All 4 Units Completed</span>
          </div>
        </div>
      )}

      {/* Guidebook Modal: Lists all units to navigate between unlocked units */}
      {isGuidebookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border-4 border-[#e5e5e5] shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div className="flex items-center gap-2 text-[#4b4b4b]">
                <BookOpen className="w-6 h-6 text-[#58cc02]" />
                <h3 className="text-xl font-black uppercase tracking-wide">Course Guidebook</h3>
              </div>
              <button
                onClick={() => setIsGuidebookOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-extrabold text-sm uppercase px-2 py-1"
              >
                Close
              </button>
            </div>

            <p className="text-xs font-bold text-[#777] mb-4">
              Select any unlocked unit to view its learning path:
            </p>

            <div className="flex flex-col gap-3">
              {units.map((u, idx) => {
                const isUnitCompleted = u.skills.length > 0 && u.skills.every((s) => s.status === 'COMPLETED');
                const isUnitUnlocked = u.skills.some((s) => s.status !== 'LOCKED');
                const isCurrentView = u.id === activeViewUnitId;

                return (
                  <button
                    key={u.id}
                    disabled={!isUnitUnlocked}
                    onClick={() => {
                      setSelectedUnitId(u.id);
                      setIsGuidebookOpen(false);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                      isCurrentView
                        ? 'border-[#58cc02] bg-[#e8f8d8] shadow-md'
                        : isUnitUnlocked
                        ? 'border-[#e5e5e5] hover:border-[#1cb0f6] bg-white'
                        : 'border-[#e5e5e5] bg-[#f7f7f7] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-[#1cb0f6]">{u.title}</span>
                        {isUnitCompleted && (
                          <span className="text-[10px] font-black bg-[#58cc02] text-white px-2 py-0.5 rounded-full uppercase">
                            Completed
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-[#4b4b4b] text-sm mt-0.5">{u.description}</h4>
                    </div>

                    <div>
                      {isUnitUnlocked ? (
                        <span className="text-xs font-black text-[#58cc02] uppercase bg-white border border-[#58cc02]/30 px-3 py-1.5 rounded-xl shadow-xs">
                          {isCurrentView ? 'Viewing' : 'Open'}
                        </span>
                      ) : (
                        <Lock className="w-5 h-5 text-[#afafaf]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quest Chest Modal */}
      {activeModalQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border-4 border-[#e5e5e5] shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-5xl mb-4 shadow-inner">
              {activeModalQuest.claimed ? '🧰' : '🎁'}
            </div>

            <h3 className="text-xl font-black text-[#4b4b4b] uppercase tracking-wider mb-1">
              Treasure Chest Quest
            </h3>
            <span className="text-xs font-black text-[#1cb0f6] bg-[#ddf4ff] px-3 py-1 rounded-xl uppercase mb-3">
              Reward: {activeModalQuest.reward}
            </span>

            <h4 className="font-extrabold text-[#4b4b4b] text-base mb-1">{activeModalQuest.title}</h4>
            <p className="text-xs font-bold text-[#777] mb-4">{activeModalQuest.description}</p>

            {/* Quest Progress Bar */}
            <div className="w-full h-4 bg-[#e5e5e5] rounded-full overflow-hidden relative mb-6">
              <div
                className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((activeModalQuest.current / activeModalQuest.total) * 100))}%`,
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#4b4b4b]">
                {activeModalQuest.current} / {activeModalQuest.total}
              </span>
            </div>

            {/* Action Buttons */}
            {activeModalQuest.claimed ? (
              <div className="w-full py-3 bg-[#e8f8d8] text-[#58cc02] font-black text-sm uppercase rounded-2xl border-2 border-[#58cc02]/30 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>CLAIMED</span>
              </div>
            ) : activeModalQuest.current >= activeModalQuest.total ? (
              <button
                onClick={() => handleClaimChestQuest(activeModalQuest)}
                disabled={claiming}
                className="w-full py-3.5 bg-[#58cc02] text-white font-extrabold text-base uppercase rounded-2xl border-b-4 border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{claiming ? 'CLAIMING...' : 'CLAIM REWARD'}</span>
              </button>
            ) : (
              <div className="w-full py-3 bg-[#f7f7f7] text-[#afafaf] font-black text-xs uppercase rounded-2xl border-2 border-[#e5e5e5]">
                IN PROGRESS - KEEP LEARNING!
              </div>
            )}

            <button
              onClick={() => setActiveModalQuest(null)}
              className="mt-3 text-xs font-bold text-[#afafaf] hover:text-[#777] uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {visibleUnits.map((unit) => (
        <div key={unit.id} className="mb-12">
          {/* Unit Banner Header matching Apple translucent depth style */}
          <div className="bg-gradient-to-r from-[#58cc02] to-[#4bbd00] text-white rounded-2xl p-5 mb-8 flex items-center justify-between shadow-lg shadow-[#58cc02]/20 border border-white/20 backdrop-blur-md active:scale-[0.99] transition-transform duration-200">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase">{unit.title}</h2>
              <p className="text-xs sm:text-sm font-semibold opacity-90 mt-1">{unit.description}</p>
            </div>
            <button
              onClick={() => setIsGuidebookOpen(true)}
              className="bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl flex items-center gap-2 text-xs sm:text-sm backdrop-blur-lg transition-all border border-white/25 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden min-[400px]:inline">Guidebook</span>
            </button>
          </div>

          {/* Skill Tree Nodes Path */}
          <div className="flex flex-col items-center gap-6 py-4 relative">
            {unit.skills.map((skill, index) => {
              const rawOffset = offsets[index % offsets.length];
              const isAvailable = skill.status !== 'LOCKED';
              const isCompleted = skill.status === 'COMPLETED';
              const activeLessonId = skill.lessons.find((l) => l.status !== 'LOCKED')?.id || skill.lessons[0]?.id || 1;
              const isChest = skill.icon === 'chest';

              // Backend authority: Active skill is the first non-completed skill returned by backend
              const activeSkillIndex = unit.skills.findIndex((s) => s.status !== 'COMPLETED');
              const isCurrentActive = (activeSkillIndex !== -1 ? index === activeSkillIndex : index === 0);

              // Floating start banner and mascot sit on the active node (if course not fully completed)
              const isStartNode = !isCourseFullyCompleted && isCurrentActive && !isChest && isAvailable;
              const isMascotNode = !isCourseFullyCompleted && isCurrentActive;

              return (
                <div
                  key={skill.id}
                  className="relative flex flex-col items-center transition-transform duration-300"
                  style={{
                    transform: `translateX(calc(${rawOffset}px * var(--node-scale, 1)))`,
                  }}
                >
                  {/* Floating START tooltip on active playable lesson node */}
                  {isStartNode && (
                    <div className="absolute -top-12 bg-white text-[#58cc02] font-black text-sm px-4 py-1.5 rounded-2xl shadow-md border-2 border-[#e5e5e5] z-10 flex items-center gap-1 animate-bounce">
                      <span>शुरू करें</span>
                      <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#e5e5e5] rotate-45" />
                    </div>
                  )}

                  {/* Responsive Mascot Bird beside active node */}
                  {isMascotNode && (
                    <div className="absolute -right-24 sm:-right-28 -top-6 sm:-top-4 flex flex-col items-center select-none z-10 pointer-events-none transition-all duration-300">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#61e002] to-[#58cc02] border-4 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl md:text-5xl animate-bounce">
                        🦉
                      </div>
                      <div className="w-12 sm:w-16 md:w-20 h-3 bg-black/10 rounded-full blur-xs mt-1" />
                    </div>
                  )}

                  {/* Node Button */}
                  {isChest ? (() => {
                    const chestQuest = getChestQuestForUnit(unit.id);
                    return (
                      /* Chest milestone node linked to quest */
                      <button
                        onClick={() => handleChestClick(isAvailable, unit.id)}
                        disabled={!isAvailable}
                        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-150 active:scale-95 border-b-8 ${
                          chestQuest?.claimed
                            ? 'bg-amber-50 border-amber-200 text-amber-600/60 opacity-80'
                            : chestQuest?.current && chestQuest.current >= chestQuest.total
                            ? 'bg-amber-300 border-amber-500 ring-8 ring-amber-300/30 animate-pulse cursor-pointer'
                            : isAvailable
                            ? 'bg-amber-200 border-amber-400 ring-8 ring-amber-300/20 cursor-pointer'
                            : 'bg-amber-100 border-amber-300 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        {chestQuest?.claimed ? '🧰' : '🎁'}

                        {/* Chest Quest Progress Pill */}
                        {chestQuest && (
                          <span
                            className={`absolute -bottom-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border shadow-sm ${
                              chestQuest.claimed
                                ? 'bg-gray-100 text-gray-500 border-gray-300'
                                : chestQuest.current >= chestQuest.total
                                ? 'bg-[#58cc02] text-white border-[#46a302] animate-bounce'
                                : 'bg-white text-[#ff9600] border-amber-200'
                            }`}
                          >
                            {chestQuest.claimed
                              ? 'CLAIMED'
                              : chestQuest.current >= chestQuest.total
                              ? 'CLAIM!'
                              : `${chestQuest.current}/${chestQuest.total}`}
                          </span>
                        )}
                      </button>
                    );
                  })() : (
                    /* Skill Node Button */
                    <Link
                      href={isAvailable ? `/lesson/${activeLessonId}` : '#'}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-150 shadow-lg ${
                        isCompleted
                          ? 'bg-[#ffc800] border-b-8 border-[#e5a000] text-white hover:brightness-105 active:border-b-0 active:translate-y-2'
                          : isAvailable
                          ? 'bg-[#58cc02] border-b-8 border-[#46a302] text-white hover:brightness-105 active:border-b-0 active:translate-y-2 ring-8 ring-[#58cc02]/20 ring-offset-2'
                          : 'bg-[#e5e5e5] border-b-8 border-[#afafaf] text-[#afafaf] cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-10 h-10 stroke-[3]" />
                      ) : isAvailable ? (
                        <Star className="w-10 h-10 fill-white stroke-none" />
                      ) : (
                        <Lock className="w-8 h-8 stroke-[2.5]" />
                      )}
                    </Link>
                  )}

                  {/* Skill Label */}
                  <span className="mt-2.5 text-xs font-extrabold text-[#4b4b4b] uppercase tracking-wider text-center">
                    {skill.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
