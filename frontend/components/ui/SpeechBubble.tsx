'use client';

import React from 'react';

interface SpeechBubbleProps {
  text: string;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="bg-white text-[#58CC02] border-2 border-[#E5E5E5] px-4 py-1.5 rounded-xl font-extrabold text-sm tracking-wider uppercase shadow-md flex items-center justify-center">
        {text}
      </div>
      {/* Downward pointing triangle arrow */}
      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white z-10" />
      <div className="absolute left-1/2 -bottom-[10px] -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-[#E5E5E5] z-0" />
    </div>
  );
};
