'use client';

import React, { useEffect, useState } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getCurrentUser, getQuests, claimQuest, User, Quest } from '@/lib/api/client';
import { Target, CheckCircle2, Sparkles } from 'lucide-react';

export default function QuestsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  async function loadData() {
    try {
      const [u, qData] = await Promise.all([getCurrentUser(), getQuests()]);
      setUser(u);
      setQuests(qData.quests);
    } catch (err) {
      console.error('Failed to load quests data:', err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleClaim = async (questId: number) => {
    try {
      setClaimingId(questId);
      const res = await claimQuest(questId);
      setToastMessage(res.message);
      await loadData();
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err: any) {
      alert(err?.message || 'Failed to claim quest');
    } finally {
      setClaimingId(null);
    }
  };

  const getQuestIcon = (id: number) => {
    switch (id) {
      case 1:
        return '⚡';
      case 2:
        return '🎯';
      case 3:
        return '🔥';
      default:
        return '🎁';
    }
  };

  const getQuestColor = (id: number) => {
    switch (id) {
      case 1:
        return 'bg-amber-400';
      case 2:
        return 'bg-[#58cc02]';
      case 3:
        return 'bg-[#ff9600]';
      default:
        return 'bg-[#1cb0f6]';
    }
  };

  return (
    <div className="min-h-screen bg-white flex pb-16 md:pb-0">
      <LeftSidebar />
      <div className="flex-1 flex flex-col items-center w-full">
        <TopBar user={user} />

        {/* Claim Success Toast */}
        {toastMessage && (
          <div className="fixed top-20 z-50 bg-[#58cc02] text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2 animate-bounce font-black text-sm">
            <Sparkles className="w-5 h-5 fill-white stroke-none" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="flex w-full max-w-[1056px] justify-between p-4 sm:p-6">
          <div className="flex-1 max-w-[592px] select-none mx-auto lg:mx-0">
            {/* Quest Header Banner */}
            <div className="bg-gradient-to-r from-[#ff9600] to-[#ffb800] text-white rounded-3xl p-6 mb-8 text-center shadow-lg shadow-[#ff9600]/20 border border-white/20">
              <Target className="w-16 h-16 mx-auto mb-2 text-white/90" />
              <h1 className="text-2xl font-black uppercase tracking-wider">Daily Quests</h1>
              <p className="text-sm font-bold opacity-90 mt-1">Complete quests every day to earn rewards!</p>
            </div>

            {/* Quest Items */}
            <div className="space-y-4">
              {quests.map((q) => {
                const isCompleted = q.current >= q.total;
                const percent = Math.min(100, Math.round((q.current / q.total) * 100));

                return (
                  <div
                    key={q.id}
                    className={`border-2 rounded-3xl p-5 bg-white flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-200 ${
                      q.claimed
                        ? 'border-[#e5e5e5] opacity-75 bg-[#f7f7f7]'
                        : isCompleted
                        ? 'border-[#58cc02] shadow-md shadow-[#58cc02]/10 ring-2 ring-[#58cc02]/20'
                        : 'border-[#e5e5e5]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl p-3 bg-amber-50 rounded-2xl border-2 border-amber-200 flex-shrink-0">
                        {getQuestIcon(q.id)}
                      </div>
                      <div className="flex-1 sm:hidden">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-extrabold text-[#4b4b4b] text-base">{q.title}</h3>
                          <span className="text-xs font-black text-[#1cb0f6] bg-[#ddf4ff] px-2.5 py-1 rounded-xl uppercase">
                            {q.reward}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="hidden sm:flex justify-between items-center mb-1">
                        <h3 className="font-extrabold text-[#4b4b4b] text-base">{q.title}</h3>
                        <span className="text-xs font-black text-[#1cb0f6] bg-[#ddf4ff] px-2.5 py-1 rounded-xl uppercase">
                          {q.reward}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#777] mb-3">{q.description}</p>

                      {/* Progress Bar & Claim Button */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-4 bg-[#e5e5e5] rounded-full overflow-hidden relative">
                          <div
                            className={`h-full ${getQuestColor(q.id)} transition-all duration-500 rounded-full`}
                            style={{ width: `${percent}%` }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#4b4b4b]">
                            {q.current} / {q.total}
                          </span>
                        </div>

                        {/* Action / Claim Button */}
                        {q.claimed ? (
                          <div className="flex items-center gap-1 text-[#58cc02] font-black text-xs px-3 py-1.5 bg-[#e8f8d8] rounded-xl border border-[#58cc02]/30">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>CLAIMED</span>
                          </div>
                        ) : isCompleted ? (
                          <button
                            onClick={() => handleClaim(q.id)}
                            disabled={claimingId === q.id}
                            className="bg-[#58cc02] text-white font-extrabold text-xs uppercase px-4 py-2 rounded-xl border-b-4 border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                          >
                            {claimingId === q.id ? 'Claiming...' : 'Claim'}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <RightSidebar />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
