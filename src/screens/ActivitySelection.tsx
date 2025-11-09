import React, { useState } from 'react';
import { Profile } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { CoinDisplay } from '../components/CoinDisplay';
import { SIGHT_WORD_SETS } from '../data/content';

interface ActivitySelectionProps {
  profile: Profile;
  onStartActivity: (activity: 'reading' | 'words', wordSetId?: number) => void;
  onGoToShop: () => void;
  onShowProgress: () => void;
  onChangeProfile: () => void;
}

export const ActivitySelection: React.FC<ActivitySelectionProps> = ({
  profile,
  onStartActivity,
  onGoToShop,
  onShowProgress,
  onChangeProfile,
}) => {
  // State for word set selection (default to profile's current word set or 1)
  const [selectedWordSet, setSelectedWordSet] = useState(profile.currentWordSet || 1);

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

                  {/* Word Set Selector */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Choose Word Set:
                    </label>
                    <div className="flex gap-2 flex-wrap justify-center">
                      {SIGHT_WORD_SETS.map(set => {
                        const isCompleted = profile.completedWordSets?.includes(set.id);
                        const isCurrent = set.id === (profile.currentWordSet || 1);

                        return (
                          <button
                            key={set.id}
                            onClick={() => setSelectedWordSet(set.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                              selectedWordSet === set.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Set {set.id}
                            {isCompleted && <span className="ml-1">✅</span>}
                            {isCurrent && !isCompleted && <span className="ml-1">📍</span>}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-text-secondary mt-2">
                      {SIGHT_WORD_SETS.find(s => s.id === selectedWordSet)?.description}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {SIGHT_WORD_SETS.find(s => s.id === selectedWordSet)?.level} • {SIGHT_WORD_SETS.find(s => s.id === selectedWordSet)?.words.length} words
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => onStartActivity('words', selectedWordSet)}
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

            {/* Progress Dashboard Button */}
            <Card hoverable onClick={onShowProgress}>
              <div className="text-center space-y-4">
                <div className="text-6xl">📊</div>
                <h2 className="text-2xl font-bold text-primary">View Progress</h2>
                <p className="text-lg text-textSecondary">
                  See your stats and achievements
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
