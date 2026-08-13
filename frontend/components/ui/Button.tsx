'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'blue' | 'white' | 'gray';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'green',
  fullWidth = false,
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'btn-3d flex items-center justify-center gap-2 cursor-pointer font-extrabold uppercase tracking-wider rounded-2xl transition-transform active:translate-y-1 select-none';

  const sizeClasses = {
    sm: 'h-10 px-4 text-xs shadow-[0_3px_0_0]',
    md: 'h-12 px-6 text-sm shadow-[0_4px_0_0]',
    lg: 'h-14 px-8 text-base shadow-[0_5px_0_0]',
  };

  const variantClasses = {
    green: disabled ? 'bg-[#D7D7D7] text-[#AFAFAF] border-[#B5B5B5] shadow-[#B5B5B5] cursor-not-allowed' : 'bg-[#58CC02] text-white border-[#58A700] shadow-[#58A700] hover:brightness-105',
    blue: disabled ? 'bg-[#D7D7D7] text-[#AFAFAF] border-[#B5B5B5] shadow-[#B5B5B5] cursor-not-allowed' : 'bg-[#1CB0F6] text-white border-[#1899D6] shadow-[#1899D6] hover:brightness-105',
    white: disabled ? 'bg-[#F7F7F7] text-[#AFAFAF] border-[#E5E5E5] shadow-[#E5E5E5] cursor-not-allowed' : 'bg-white text-[#3C3C3C] border-[#E5E5E5] shadow-[#E5E5E5] hover:bg-[#F7F7F7]',
    gray: 'bg-[#D7D7D7] text-[#777777] border-[#B5B5B5] shadow-[#B5B5B5] cursor-not-allowed',
  };

  return (
    <button
      disabled={disabled}
      className={twMerge(
        clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};
