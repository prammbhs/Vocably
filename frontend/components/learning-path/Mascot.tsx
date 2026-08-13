'use client';

import React from 'react';

interface MascotProps {
  positionOffset?: number;
}

export const Mascot: React.FC<MascotProps> = ({ positionOffset = 60 }) => {
  return (
    <div
      className="relative my-2 pointer-events-none z-10 hidden sm:flex justify-center"
      style={{ transform: `translateX(${positionOffset}px)` }}
    >
      <div className="w-20 h-20 bg-[#58CC02] rounded-[28px] border-4 border-[#58A700] shadow-[0_6px_0_0_#58A700] relative flex items-center justify-center animate-bounce">
        {/* Eye Left */}
        <div className="absolute top-4 left-4 w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#3C3C3C] rounded-full" />
        </div>

        {/* Eye Right */}
        <div className="absolute top-4 right-4 w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#3C3C3C] rounded-full" />
        </div>

        {/* Beak / Mouth */}
        <div className="absolute bottom-5 w-4 h-3 bg-[#FF9600] rounded-b-md" />

        {/* Belly Badge */}
        <div className="absolute bottom-1 w-10 h-4 bg-white/30 rounded-t-full" />
      </div>
    </div>
  );
};
