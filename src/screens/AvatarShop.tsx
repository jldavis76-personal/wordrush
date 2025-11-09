import React, { useState } from 'react';
import { Profile, UnlockableItem } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { CoinDisplay } from '../components/CoinDisplay';
import { SHOP_ITEMS } from '../data/content';
import { soundManager } from '../utils/soundManager';

interface AvatarShopProps {
  profile: Profile;
  onUnlockItem: (itemId: UnlockableItem, cost: number) => void;
  onBack: () => void;
}

export const AvatarShop: React.FC<AvatarShopProps> = ({
  profile,
  onUnlockItem,
  onBack,
}) => {
  const [justUnlocked, setJustUnlocked] = useState<UnlockableItem | null>(null);

  const handleUnlock = (itemId: UnlockableItem, cost: number) => {
    // Play purchase sound
    soundManager.play('purchase');

    onUnlockItem(itemId, cost);
    setJustUnlocked(itemId);

    // Clear animation after a moment
    setTimeout(() => {
      setJustUnlocked(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={onBack}>
          🏠 Back to Profile
        </Button>
        <CoinDisplay coins={profile.coins} size="lg" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center">
        <div className="max-w-4xl w-full space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-primary mb-2">🛍️ Avatar Shop</h1>
            <p className="text-xl text-textSecondary">
              Unlock cool items for your avatar!
            </p>
          </div>

          {/* Avatar Preview */}
          <Card>
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-textPrimary">Your Avatar</h2>
              <Avatar unlockedItems={profile.unlockedItems} size="lg" />
              {justUnlocked && (
                <div className="text-4xl animate-bounce-small">
                  🎉 Item Unlocked! 🎉
                </div>
              )}
            </div>
          </Card>

          {/* Shop Items */}
          <div className="grid md:grid-cols-3 gap-6">
            {SHOP_ITEMS.map((item) => {
              const isUnlocked = profile.unlockedItems.includes(item.id);
              const canAfford = profile.coins >= item.cost;

              return (
                <Card key={item.id} className={isUnlocked ? 'opacity-75' : ''}>
                  <div className="text-center space-y-4">
                    <div className="text-7xl">{item.emoji}</div>
                    <h3 className="text-2xl font-bold text-textPrimary">
                      {item.name}
                    </h3>

                    {isUnlocked ? (
                      <div className="space-y-2">
                        <div className="text-3xl text-success">✅</div>
                        <p className="text-lg font-semibold text-success">
                          Unlocked!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-bold text-secondary">
                            {item.cost}
                          </span>
                          <span className="text-3xl">🪙</span>
                        </div>

                        {canAfford ? (
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            onClick={() => handleUnlock(item.id, item.cost)}
                          >
                            🔓 Unlock
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="md"
                            className="w-full"
                            disabled
                          >
                            Need {item.cost - profile.coins} more 🪙
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Encouragement Message */}
          {profile.unlockedItems.length === 0 && (
            <Card className="bg-primary text-white">
              <div className="text-center">
                <p className="text-xl font-semibold">
                  💡 Play activities to earn more coins and unlock awesome items!
                </p>
              </div>
            </Card>
          )}

          {profile.unlockedItems.length === SHOP_ITEMS.length && (
            <Card className="bg-success text-white">
              <div className="text-center space-y-2">
                <div className="text-5xl">🏆</div>
                <p className="text-2xl font-bold">
                  Amazing! You've unlocked everything!
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
