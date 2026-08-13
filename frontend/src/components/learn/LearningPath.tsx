'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Star, Lock, Check, Gift } from 'lucide-react';
import { Unit, Skill } from '@/lib/api/client';

interface LearningPathProps {
  units: Unit[];
}

export const LearningPath: React.FC<LearningPathProps> = ({ units }) => {
  // S-curve lateral offsets for nodes to replicate Duolingo tree
  const offsets = [0, 45, 75, 45, 0, -45, -75, -45];

  return (
    <div className="flex-1 max-w-[592px] w-full mx-auto pb-24 pt-4 px-4 select-none">
      {units.map((unit) => (
        <div key={unit.id} className="mb-12">
          {/* Unit Banner Header matching Figma design */}
          <div className="bg-[#58cc02] text-white rounded-2xl p-5 mb-8 flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-xl font-extrabold tracking-wide uppercase">{unit.title}</h2>
              <p className="text-sm font-semibold opacity-90 mt-1">{unit.description}</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm backdrop-blur transition-all border border-white/20">
              <BookOpen className="w-4 h-4" />
              <span>Guidebook</span>
            </button>
          </div>

          {/* Skill Tree Nodes Path */}
          <div className="flex flex-col items-center gap-6 py-4 relative">
            {unit.skills.map((skill, index) => {
              const xOffset = offsets[index % offsets.length];
              const isStartNode = index === 0 && (skill.status === 'NOT_STARTED' || skill.status === 'IN_PROGRESS');
              const isAvailable = skill.status !== 'LOCKED';
              const isCompleted = skill.status === 'COMPLETED';
              const activeLessonId = skill.lessons.find((l) => l.status !== 'LOCKED')?.id || skill.lessons[0]?.id || 1;

              return (
                <div
                  key={skill.id}
                  className="relative flex flex-col items-center"
                  style={{ transform: `translateX(${xOffset}px)` }}
                >
                  {/* Floating START tooltip matching Figma (Hindi 'शुरू करें') */}
                  {isStartNode && (
                    <div className="absolute -top-12 bg-white text-[#58cc02] font-black text-sm px-4 py-1.5 rounded-2xl shadow-md border-2 border-[#e5e5e5] z-10 flex items-center gap-1">
                      <span>शुरू करें</span>
                      <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#e5e5e5] rotate-45" />
                    </div>
                  )}

                  {/* Standing Mascot Bird beside chest/middle node as shown in image */}
                  {index === 2 && (
                    <div className="absolute left-32 -top-4 flex flex-col items-center select-none z-10 pointer-events-none">
                      <div className="w-24 h-24 rounded-full bg-[#58cc02] border-4 border-white shadow-xl flex items-center justify-center text-5xl animate-bounce">
                        🦉
                      </div>
                      <div className="w-20 h-4 bg-black/10 rounded-full blur-xs mt-1" />
                    </div>
                  )}

                  {/* Node Button */}
                  {skill.icon === 'chest' ? (
                    /* Chest milestone node */
                    <div className="w-20 h-20 bg-amber-100 border-4 border-amber-300 rounded-2xl flex items-center justify-center text-3xl shadow-md cursor-pointer hover:scale-105 transition-transform">
                      🎁
                    </div>
                  ) : (
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
                  <span className="mt-2 text-xs font-extrabold text-[#4b4b4b] uppercase tracking-wider text-center">
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
