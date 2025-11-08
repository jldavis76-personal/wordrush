import React from 'react';
import { UnlockableItem } from '../types';

interface AvatarProps {
  unlockedItems: UnlockableItem[];
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ unlockedItems, size = 'md' }) => {
  const sizeStyles = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-32 h-32 text-6xl',
    lg: 'w-48 h-48 text-8xl',
  };

  const itemSizes = {
    sm: { hat: 'text-2xl -mt-8', glasses: 'text-xl', cape: 'text-3xl -ml-12 -mt-2' },
    md: { hat: 'text-5xl -mt-16', glasses: 'text-3xl', cape: 'text-6xl -ml-24 -mt-4' },
    lg: { hat: 'text-7xl -mt-24', glasses: 'text-5xl', cape: 'text-8xl -ml-36 -mt-6' },
  };

  return (
    <div className="relative inline-block">
      {/* Cape (behind) */}
      {unlockedItems.includes('cape') && (
        <div className={`absolute ${itemSizes[size].cape} z-0`}>
          🦸
        </div>
      )}

      {/* Main face */}
      <div className={`${sizeStyles[size]} bg-secondary rounded-full flex items-center justify-center relative z-10`}>
        😊
      </div>

      {/* Glasses (on face) */}
      {unlockedItems.includes('glasses') && (
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${itemSizes[size].glasses} z-20`}>
          🕶️
        </div>
      )}

      {/* Hat (on top) */}
      {unlockedItems.includes('hat') && (
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${itemSizes[size].hat} z-20`}>
          🎩
        </div>
      )}
    </div>
  );
};
