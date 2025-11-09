import React from 'react';
import { Profile } from '../types';
import { getAllBadges } from '../data/badges';
import { getBadgeProgress } from '../utils/badgeChecker';
import { Card } from './ui/Card';

interface BadgeCollectionProps {
  profile: Profile;
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({ profile }) => {
  const allBadges = getAllBadges();
  const unlockedIds = new Set(profile.unlockedBadges.map(b => b.badgeId));

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 border-gray-400 text-gray-700';
      case 'rare':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      case 'epic':
        return 'bg-purple-100 border-purple-400 text-purple-700';
      case 'legendary':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare':
        return 'shadow-blue-300';
      case 'epic':
        return 'shadow-purple-300';
      case 'legendary':
        return 'shadow-yellow-300';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🏆 Badge Collection</h2>
        <p className="text-text-secondary">
          {profile.unlockedBadges.length} / {allBadges.length} badges earned
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBadges.map(badge => {
          const isUnlocked = unlockedIds.has(badge.id);
          const progress = getBadgeProgress(profile, badge.id);

          return (
            <Card
              key={badge.id}
              className={`relative ${isUnlocked ? getRarityColor(badge.rarity) : 'bg-gray-50 opacity-50'
                } border-2 transition-all hover:scale-105`}
            >
              <div className="text-center space-y-2">
                {/* Badge Icon */}
                <div
                  className={`text-6xl ${isUnlocked && badge.rarity !== 'common' ? 'animate-bounce-small' : ''
                    } ${isUnlocked && badge.rarity === 'legendary' ? getRarityGlow(badge.rarity) : ''
                    }`}
                >
                  {isUnlocked ? badge.icon : '🔒'}
                </div>

                {/* Badge Name */}
                <h3 className="font-bold text-sm">
                  {isUnlocked ? badge.name : '???'}
                </h3>

                {/* Badge Description */}
                <p className="text-xs text-text-secondary min-h-[2.5rem]">
                  {isUnlocked ? badge.description : badge.requirement}
                </p>

                {/* Rarity Label */}
                {isUnlocked && (
                  <div className="text-xs font-medium uppercase tracking-wide">
                    {badge.rarity}
                  </div>
                )}

                {/* Progress Bar (for locked badges) */}
                {!isUnlocked && progress.percentage > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{progress.current}/{progress.required}</span>
                      <span>{Math.round(progress.percentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Unlock Date (for unlocked badges) */}
                {isUnlocked && (
                  <div className="text-xs text-text-secondary mt-2">
                    {new Date(
                      profile.unlockedBadges.find(b => b.badgeId === badge.id)!.unlockedAt
                    ).toLocaleDateString()}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
