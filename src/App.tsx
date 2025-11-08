import { useState, useEffect } from 'react';
import { Profiles, ProfileId, UnlockableItem, ReadingActivityResult, WordActivityResult } from './types';
import { ProfileSelection } from './screens/ProfileSelection';
import { ActivitySelection } from './screens/ActivitySelection';
import { ReadingRace } from './screens/ReadingRace';
import { WordCatcher } from './screens/WordCatcher';
import { AvatarShop } from './screens/AvatarShop';
import { saveProfiles, loadProfiles, isStorageAvailable } from './utils/storage';

type Screen = 'profile-selection' | 'activity-selection' | 'reading-race' | 'word-catcher' | 'shop';

/**
 * Load profiles from localStorage or use defaults
 */
const getInitialProfiles = (): Profiles => {
  if (isStorageAvailable()) {
    const loaded = loadProfiles();
    if (loaded) {
      return loaded;
    }
  }

  // Default profiles if nothing saved
  return {
    daughter: {
      id: 'daughter',
      name: 'Daughter',
      age: 8,
      coins: 0,
      unlockedItems: [],
      activityHistory: [],
    },
    son: {
      id: 'son',
      name: 'Son',
      age: 5,
      coins: 0,
      unlockedItems: [],
      activityHistory: [],
    },
  };
};

function App() {
  const [profiles, setProfiles] = useState<Profiles>(getInitialProfiles());

  const [currentProfileId, setCurrentProfileId] = useState<ProfileId | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile-selection');

  const currentProfile = currentProfileId ? profiles[currentProfileId] : null;

  // Auto-save to localStorage whenever profiles change
  useEffect(() => {
    if (isStorageAvailable()) {
      saveProfiles(profiles);
    }
  }, [profiles]);

  // Check storage availability on mount
  useEffect(() => {
    if (!isStorageAvailable()) {
      alert('Warning: Browser storage is not available. Progress will not be saved.');
    }
  }, []);

  const handleSelectProfile = (profileId: ProfileId) => {
    setCurrentProfileId(profileId);
    setCurrentScreen('activity-selection');
  };

  const handleChangeProfile = () => {
    setCurrentProfileId(null);
    setCurrentScreen('profile-selection');
  };

  const handleStartActivity = (activity: 'reading' | 'words') => {
    if (activity === 'reading') {
      setCurrentScreen('reading-race');
    } else {
      setCurrentScreen('word-catcher');
    }
  };

  const handleGoToShop = () => {
    setCurrentScreen('shop');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('activity-selection');
  };

  const handleReadingComplete = (coinsEarned: number, wpm: number, score: number, totalQuestions: number) => {
    if (!currentProfileId) return;

    const result: ReadingActivityResult = {
      timestamp: new Date(),
      coinsEarned,
      activityType: 'reading',
      wpm,
      score,
      totalQuestions,
    };

    setProfiles((prev) => ({
      ...prev,
      [currentProfileId]: {
        ...prev[currentProfileId],
        coins: prev[currentProfileId].coins + coinsEarned,
        activityHistory: [...prev[currentProfileId].activityHistory, result],
      },
    }));
  };

  const handleWordComplete = (coinsEarned: number, score: number, totalWords: number) => {
    if (!currentProfileId) return;

    const result: WordActivityResult = {
      timestamp: new Date(),
      coinsEarned,
      activityType: 'words',
      score,
      totalWords,
    };

    setProfiles((prev) => ({
      ...prev,
      [currentProfileId]: {
        ...prev[currentProfileId],
        coins: prev[currentProfileId].coins + coinsEarned,
        activityHistory: [...prev[currentProfileId].activityHistory, result],
      },
    }));
  };

  const handleUnlockItem = (itemId: UnlockableItem, cost: number) => {
    if (!currentProfileId) return;

    setProfiles((prev) => ({
      ...prev,
      [currentProfileId]: {
        ...prev[currentProfileId],
        coins: prev[currentProfileId].coins - cost,
        unlockedItems: [...prev[currentProfileId].unlockedItems, itemId],
      },
    }));
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'profile-selection' && (
        <ProfileSelection
          profiles={profiles}
          onSelectProfile={handleSelectProfile}
        />
      )}

      {currentScreen === 'activity-selection' && currentProfile && (
        <ActivitySelection
          profile={currentProfile}
          onStartActivity={handleStartActivity}
          onGoToShop={handleGoToShop}
          onChangeProfile={handleChangeProfile}
        />
      )}

      {currentScreen === 'reading-race' && currentProfile && (
        <ReadingRace
          currentCoins={currentProfile.coins}
          onComplete={handleReadingComplete}
          onBack={handleBackToMenu}
        />
      )}

      {currentScreen === 'word-catcher' && currentProfile && (
        <WordCatcher
          currentCoins={currentProfile.coins}
          onComplete={handleWordComplete}
          onBack={handleBackToMenu}
        />
      )}

      {currentScreen === 'shop' && currentProfile && (
        <AvatarShop
          profile={currentProfile}
          onUnlockItem={handleUnlockItem}
          onBack={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
