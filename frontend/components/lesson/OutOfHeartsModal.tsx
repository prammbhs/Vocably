'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { HeartOff } from 'lucide-react';

export const OutOfHeartsModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-[#E5E5E5] flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 rounded-full bg-[#FF4B4B]/20 flex items-center justify-center text-[#FF4B4B]">
          <HeartOff className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-black text-[#3C3C3C]">Out of Hearts!</h3>
        <p className="text-sm font-extrabold text-[#777777]">
          You need hearts to start new lessons. Practice to regain hearts or refill them in the shop.
        </p>

        <div className="flex flex-col gap-2.5 w-full mt-2">
          <Link href="/practice" className="w-full">
            <Button variant="blue" size="md" fullWidth>
              Practice to Earn Hearts
            </Button>
          </Link>
          <Link href="/learn" className="w-full">
            <Button variant="white" size="md" fullWidth>
              Return to Learn
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
