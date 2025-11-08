import React from 'react';

interface CoinDisplayProps {
  coins: number;
  size?: 'sm' | 'md' | 'lg';
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins, size = 'md' }) => {
  const sizeStyles = {
    sm: 'text-base px-3 py-1',
    md: 'text-xl px-4 py-2',
    lg: 'text-2xl px-6 py-3',
  };

  return (
    <div className={`${sizeStyles[size]} bg-secondary text-white font-bold rounded-full inline-flex items-center gap-2 shadow-md`}>
      <span>🪙</span>
      <span>{coins}</span>
    </div>
  );
};
