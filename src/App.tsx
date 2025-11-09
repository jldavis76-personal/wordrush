import { useState, useEffect } from 'react';
import { Profiles, ProfileId, UnlockableItem, ReadingActivityResult, WordActivityResult, ReadingPassage } from './types';
import { ProfileSelection } from './screens/ProfileSelection';
import { ActivitySelection } from './screens/ActivitySelection';
import { ReadingRace } from './screens/ReadingRace';
import { WordCatcher } from './screens/WordCatcher';
import { AvatarShop } from './screens/AvatarShop';
import { PassageSelector } from './components/PassageSelector';
import { saveProfiles, loadProfiles, isStorageAvailable } from './utils/storage';
import { READING_PASSAGES } from './data/content';

type Screen = 'profile-selection' | 'activity-selection' | 'passage-selection' | 'reading-race' | 'word-catcher' | 'shop';

/**
 * Load profiles from localStorage or use defaults
 */
const getInitialProfiles = (): Profiles => {
  if (isStorageAvailable()) {
    const loaded = loadProfiles();
    if (loaded) {
      console.log('[App] Loaded profiles from storage:', loaded);
      return loaded;
    }
  }

  console.log('[App] Using default profiles');
  // Default profiles if nothing saved
  return {
    daughter: {
      id: 'daughter',
      name: 'Daughter',
      age: 8,
      coins: 0,
      unlockedItems: [],
      activityHistory: [],
      currentWordSet: 1,
      completedWordSets: [],
    },
    son: {
      id: 'son',
      name: 'Son',
      age: 5,
      coins: 0,
      unlockedItems: [],
      activityHistory: [],
      currentWordSet: 1,
      completedWordSets: [],
    },
  };
};

function App() {
  const [profiles, setProfiles] = useState<Profiles>(getInitialProfiles);

  const [currentProfileId, setCurrentProfileId] = useState<ProfileId | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile-selection');
  const [selectedWordSet, setSelectedWordSet] = useState<number>(1);
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);

  const currentProfile = currentProfileId ? profiles[currentProfileId] : null;

  // Auto-save to localStorage whenever profiles change
  useEffect(() => {
    if (isStorageAvailable()) {
      console.log('[App] Auto-saving profiles:', profiles);
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

  const handleStartActivity = (activity: 'reading' | 'words', wordSetId?: number) => {
    if (activity === 'reading') {
      setCurrentScreen('passage-selection');
    } else {
      // Set the selected word set if provided, otherwise use profile's current word set or default to 1
      const wordSet = wordSetId || currentProfile?.currentWordSet || 1;
      setSelectedWordSet(wordSet);
      setCurrentScreen('word-catcher');
    }
  };

  const handleGoToShop = () => {
    setCurrentScreen('shop');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('activity-selection');
  };

  const handlePassageSelect = (passage: ReadingPassage) => {
    setSelectedPassage(passage);
    setCurrentScreen('reading-race');
  };

  const handleRandomPassage = () => {
    const randomIndex = Math.floor(Math.random() * READING_PASSAGES.length);
    setSelectedPassage(READING_PASSAGES[randomIndex]);
    setCurrentScreen('reading-race');
  };

  const getCompletedPassageIds = (): string[] => {
    if (!currentProfile) return [];

    return currentProfile.activityHistory
      .filter(activity => activity.activityType === 'reading')
      .map(activity => (activity as ReadingActivityResult).passageId)
      .filter((id, index, self) => id && self.indexOf(id) === index); // unique IDs
  };

  const handleReadingComplete = (coinsEarned: number, wpm: number, score: number, totalQuestions: number, passageId: string) => {
    if (!currentProfileId) return;

    const result: ReadingActivityResult = {
      timestamp: new Date(),
      coinsEarned,
      activityType: 'reading',
      wpm,
      score,
      totalQuestions,
      passageId,
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

    // Check if they got 80%+ correct (mastery)
    const masteryThreshold = 0.8;
    const percentCorrect = score / totalWords;

    setProfiles((prev) => {
      const profile = prev[currentProfileId];
      const currentSet = profile.currentWordSet || 1;
      const completed = profile.completedWordSets || [];

      // If mastered and not already in completed list
      const newCompleted = percentCorrect >= masteryThreshold && !completed.includes(currentSet)
        ? [...completed, currentSet]
        : completed;

      // Auto-advance to next set if mastered
      const nextSet = percentCorrect >= masteryThreshold && currentSet < 5
        ? currentSet + 1
        : currentSet;

      return {
        ...prev,
        [currentProfileId]: {
          ...profile,
          coins: profile.coins + coinsEarned,
          activityHistory: [...profile.activityHistory, result],
          currentWordSet: nextSet,
          completedWordSets: newCompleted,
        },
      };
    });
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

      {currentScreen === 'passage-selection' && (
        <PassageSelector
          passages={READING_PASSAGES}
          completedPassageIds={getCompletedPassageIds()}
          onSelect={handlePassageSelect}
          onRandom={handleRandomPassage}
          onBack={handleBackToMenu}
        />
      )}

      {currentScreen === 'reading-race' && currentProfile && selectedPassage && (
        <ReadingRace
          currentCoins={currentProfile.coins}
          onComplete={handleReadingComplete}
          onBack={handleBackToMenu}
          passage={selectedPassage}
        />
      )}

      {currentScreen === 'word-catcher' && currentProfile && (
        <WordCatcher
          currentCoins={currentProfile.coins}
          onComplete={handleWordComplete}
          onBack={handleBackToMenu}
          wordSetId={selectedWordSet}
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
