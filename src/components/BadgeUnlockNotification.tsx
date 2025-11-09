import React, { useState } from 'react';
import { BadgeId } from '../types';
import { BADGES } from '../data/badges';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface BadgeUnlockNotificationProps {
  badgeIds: BadgeId[];
  onClose: () => void;
}

export const BadgeUnlockNotification: React.FC<BadgeUnlockNotificationProps> = ({
  badgeIds,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (badgeIds.length === 0) return null;

  const badge = BADGES[badgeIds[currentIndex]];

  const handleNext = () => {
    if (currentIndex < badgeIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full animate-bounce-small">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-success">🎉 Badge Unlocked! 🎉</h2>

          <div className="text-8xl animate-pulse">{badge.icon}</div>

          <div>
            <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>
            <p className="text-text-secondary mb-2">{badge.description}</p>
            <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium uppercase">
              {badge.rarity}
            </span>
          </div>

          <div className="flex gap-3 justify-center">
            {badgeIds.length > 1 && (
              <div className="text-sm text-text-secondary">
                Badge {currentIndex + 1} of {badgeIds.length}
              </div>
            )}
          </div>

          <Button variant="primary" size="lg" onClick={handleNext} className="w-full">
            {currentIndex < badgeIds.length - 1 ? 'Next Badge →' : 'Awesome!'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
