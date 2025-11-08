import React from 'react';
import { Profile } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { CoinDisplay } from '../components/CoinDisplay';

interface ActivitySelectionProps {
  profile: Profile;
  onStartActivity: (activity: 'reading' | 'words') => void;
  onGoToShop: () => void;
  onChangeProfile: () => void;
}

export const ActivitySelection: React.FC<ActivitySelectionProps> = ({
  profile,
  onStartActivity,
  onGoToShop,
  onChangeProfile,
}) => {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={onChangeProfile}>
          🔙 Change Profile
        </Button>
        <CoinDisplay coins={profile.coins} size="lg" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <Avatar unlockedItems={profile.unlockedItems} size="md" />
            <h1 className="text-4xl font-bold text-primary">
              Welcome, {profile.name}!
            </h1>
            <p className="text-xl text-textSecondary">
              What would you like to do today?
            </p>
          </div>

          {/* Activity Cards */}
          <div className="space-y-6">
            {profile.id === 'daughter' && (
              <Card>
                <div className="text-center space-y-4">
                  <div className="text-6xl">📚</div>
                  <h2 className="text-3xl font-bold text-primary">Reading Race</h2>
                  <p className="text-lg text-textSecondary">
                    Read a passage and answer questions
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => onStartActivity('reading')}
                  >
                    🚀 Start Reading!
                  </Button>
                </div>
              </Card>
            )}

            {profile.id === 'son' && (
              <Card>
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎯</div>
                  <h2 className="text-3xl font-bold text-primary">Word Catcher</h2>
                  <p className="text-lg text-textSecondary">
                    Match sight words and earn coins
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => onStartActivity('words')}
                  >
                    🎮 Play Game!
                  </Button>
                </div>
              </Card>
            )}

            {/* Shop Button */}
            <Card hoverable onClick={onGoToShop}>
              <div className="text-center space-y-4">
                <div className="text-6xl">🛍️</div>
                <h2 className="text-2xl font-bold text-secondary">Avatar Shop</h2>
                <p className="text-lg text-textSecondary">
                  Unlock cool items for your avatar
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
