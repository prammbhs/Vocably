'use client';

import React from 'react';

interface PathConnectorProps {
  startX: number;
  endX: number;
  isCompleted?: boolean;
}

export const PathConnector: React.FC<PathConnectorProps> = ({
  startX,
  endX,
  isCompleted = false,
}) => {
  const width = 200;
  const height = 40;
  const strokeColor = isCompleted ? '#58CC02' : '#E5E5E5';

  const x1 = 100 + startX;
  const x2 = 100 + endX;
  const y1 = 0;
  const y2 = height;
  const cp1y = height / 2;
  const cp2y = height / 2;

  const pathData = `M ${x1} ${y1} C ${x1} ${cp1y}, ${x2} ${cp2y}, ${x2} ${y2}`;

  return (
    <div className="w-full flex justify-center -my-2 z-0 pointer-events-none">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
