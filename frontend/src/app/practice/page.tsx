'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getCurrentUser, practiceHeartRefill, User } from '@/lib/api/client';
import { Heart, Dumbbell, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PracticePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);

  useEffect(() => {
    async function loadData() {
      const u = await getCurrentUser();
      setUser(u);
    }
    loadData();
  }, []);

  const handleRefillHeart = async () => {
    setIsPracticing(true);
    try {
      const res = await practiceHeartRefill();
      setMessage(res.message);
      // Reload user hearts
      const updatedUser = await getCurrentUser();
      setUser(updatedUser);
    } catch (err) {
      console.error('Error refilling hearts:', err);
    } finally {
      setIsPracticing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex pb-16 md:pb-0">
      <LeftSidebar />
      <div className="flex-1 flex flex-col items-center w-full">
        <TopBar user={user} />

        <div className="flex w-full max-w-[1056px] justify-between p-6">
          <div className="flex-1 max-w-[592px] select-none">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1cb0f6] to-[#0099e6] text-white rounded-3xl p-6 mb-8 text-center shadow-md">
              <Dumbbell className="w-16 h-16 mx-auto mb-2 text-white/90" />
              <h1 className="text-2xl font-black uppercase tracking-wider">Practice Hub</h1>
              <p className="text-sm font-bold opacity-90 mt-1">Review weak words & refill your hearts!</p>
            </div>

            {/* Heart Refill Card */}
            <div className="border-2 border-[#e5e5e5] rounded-3xl p-6 mb-6 bg-white flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-12 h-12 fill-[#ff4b4b] stroke-[#ff4b4b] animate-bounce" />
                <span className="text-4xl font-black text-[#4b4b4b]">{user?.hearts ?? 5} / 5</span>
              </div>
              <h2 className="text-xl font-extrabold text-[#4b4b4b] mb-2">Practice to Earn Hearts</h2>
              <p className="text-sm font-bold text-[#777] max-w-md mb-6">
                Complete a quick review session to restore 1 heart for free!
              </p>

              {message && (
                <div className="bg-[#ddf4ff] border-2 border-[#84d8ff] text-[#1cb0f6] font-bold p-3 rounded-2xl mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{message}</span>
                </div>
              )}

              <button
                disabled={isPracticing || (user?.hearts ?? 5) >= 5}
                onClick={handleRefillHeart}
                className={`w-full max-w-sm py-4 rounded-2xl font-extrabold text-base uppercase tracking-wider border-b-4 transition-all ${
                  (user?.hearts ?? 5) >= 5
                    ? 'bg-[#e5e5e5] text-[#afafaf] border-transparent cursor-not-allowed'
                    : 'bg-[#1cb0f6] text-white border-[#0099e6] hover:brightness-105 active:border-b-0 active:translate-y-1 shadow-md'
                }`}
              >
                {(user?.hearts ?? 5) >= 5 ? 'Hearts Full!' : isPracticing ? 'Practicing...' : 'Start Practice Session (+1 ❤️)'}
              </button>
            </div>

            {/* Quick Review Card */}
            <div className="border-2 border-[#e5e5e5] rounded-3xl p-6 bg-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <h3 className="font-extrabold text-[#4b4b4b] text-base">Mistakes Review</h3>
                  <p className="text-xs font-bold text-[#777]">Target words you recently missed</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/lesson/1')}
                className="bg-[#58cc02] text-white font-bold py-2.5 px-4 rounded-xl border-b-4 border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-wider"
              >
                Review
              </button>
            </div>
          </div>

          <RightSidebar />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
