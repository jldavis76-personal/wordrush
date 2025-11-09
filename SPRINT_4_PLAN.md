# Sprint 4: Polish & Production Readiness
**Duration:** Week 4 of v1.5 Development
**Sprint Goal:** Add final polish, parent controls, audio feedback, and testing to make WordRush production-ready
**Total Estimated Hours:** 24 hours

---

## Sprint Objectives

By the end of Sprint 4, WordRush will:
1. Have a password-protected Parent Settings screen with controls
2. Include sound effects and audio feedback for all major actions
3. Have 40%+ test coverage with Vitest and React Testing Library
4. Be validated through QA testing with target age children (5 & 8 year olds)
5. Be production-ready with all critical bugs fixed

---

## Sprint Backlog

### TASK 1: Create Parent Settings Screen
**Priority:** 🔴 Critical
**Estimated Time:** 5 hours
**Assignee:** Developer

#### User Story
```
As a parent
I want a password-protected settings screen
So that I can manage profiles and control app behavior without my children changing settings
```

#### Current State
- No settings screen exists
- No password/PIN protection
- No way to reset progress or manage profiles
- No data export capability
- No control over sound/audio settings

#### Acceptance Criteria
- [ ] Settings screen accessible from Activity Selection
- [ ] PIN/password protection (4-digit code)
- [ ] Ability to reset individual profile progress
- [ ] Ability to add/edit/delete profiles
- [ ] Toggle sound effects on/off
- [ ] Export profile data as JSON
- [ ] Import profile data from JSON
- [ ] Clear cache/storage option
- [ ] View app version and info
- [ ] Child-proof (can't be accessed without PIN)

#### Technical Requirements

**1. Create ParentSettings Component**

Create new file `src/screens/ParentSettings.tsx`:

```typescript
import React, { useState } from 'react';
import { Profiles, ProfileId } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { exportData, importData, clearStorage } from '../utils/storage';

interface ParentSettingsProps {
  profiles: Profiles;
  onUpdateProfiles: (profiles: Profiles) => void;
  onBack: () => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
}

export const ParentSettings: React.FC<ParentSettingsProps> = ({
  profiles,
  onUpdateProfiles,
  onBack,
  soundEnabled,
  onToggleSound,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'profiles' | 'data'>('general');

  // Handle profile reset
  const handleResetProfile = (profileId: ProfileId) => {
    const confirmed = window.confirm(
      `Are you sure you want to reset ${profiles[profileId].name}'s progress? This cannot be undone.`
    );

    if (confirmed) {
      const updatedProfiles = {
        ...profiles,
        [profileId]: {
          ...profiles[profileId],
          coins: 0,
          unlockedItems: [],
          activityHistory: [],
          completedWordSets: [],
          currentWordSet: 1,
          unlockedBadges: [],
          streakDays: 0,
          lastActivityDate: undefined,
        },
      };
      onUpdateProfiles(updatedProfiles);
      alert('Profile reset successfully!');
    }
  };

  // Handle data export
  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordrush-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
  };

  // Handle data import
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonString = event.target?.result as string;
        const success = importData(jsonString);

        if (success) {
          alert('Data imported successfully! Please refresh the page.');
          window.location.reload();
        }
      };
      reader.readAsText(file);
    };

    input.click();
  };

  // Handle clear all data
  const handleClearAll = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete ALL data? This will reset everything and cannot be undone.'
    );

    if (confirmed) {
      const doubleConfirm = window.confirm(
        'This is your last chance! Really delete all progress?'
      );

      if (doubleConfirm) {
        clearStorage();
        alert('All data cleared. Refreshing app...');
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-background">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">⚙️ Parent Settings</h1>
              <p className="text-text-secondary">Manage WordRush settings and profiles</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Card>
          <div className="flex gap-2 border-b pb-2 mb-4">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-t font-medium transition-colors ${
                activeTab === 'general'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-4 py-2 rounded-t font-medium transition-colors ${
                activeTab === 'profiles'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Profiles
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-2 rounded-t font-medium transition-colors ${
                activeTab === 'data'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Data
            </button>
          </div>

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Audio Settings</h2>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Sound Effects</div>
                    <div className="text-sm text-text-secondary">
                      Play sounds for coins, correct answers, and badges
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleSound(!soundEnabled)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      soundEnabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        soundEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">About</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2">
                    <span className="text-text-secondary">Version:</span>
                    <span className="font-medium">1.5.0</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-text-secondary">Storage Used:</span>
                    <span className="font-medium">
                      {(new Blob([exportData()]).size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profiles Tab */}
          {activeTab === 'profiles' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Profile Management</h2>

              {Object.values(profiles).map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-bold text-lg">{profile.name}</div>
                    <div className="text-sm text-text-secondary">
                      Age {profile.age} • {profile.coins} coins • {profile.activityHistory.length} activities
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResetProfile(profile.id)}
                  >
                    Reset Progress
                  </Button>
                </div>
              ))}

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Note:</strong> Profile editing (add/edit names) will be added in v1.6.
                  Currently, you can only reset existing profiles.
                </p>
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Backup & Restore</h2>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleExport}
                    className="w-full"
                  >
                    📥 Export Data (Backup)
                  </Button>
                  <p className="text-sm text-text-secondary">
                    Save all progress to a file on your device
                  </p>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleImport}
                    className="w-full"
                  >
                    📤 Import Data (Restore)
                  </Button>
                  <p className="text-sm text-text-secondary">
                    Restore progress from a backup file
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4 text-error">Danger Zone</h2>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleClearAll}
                  className="w-full border-error text-error hover:bg-error hover:text-white"
                >
                  🗑️ Clear All Data
                </Button>
                <p className="text-sm text-text-secondary mt-2">
                  ⚠️ This will permanently delete all profiles, progress, and badges
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
```

**2. Create PIN Entry Component**

Create `src/components/PinEntry.tsx`:

```typescript
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface PinEntryProps {
  onCorrectPin: () => void;
  onCancel: () => void;
}

const PARENT_PIN = '1234'; // Default PIN - could be configurable in future

export const PinEntry: React.FC<PinEntryProps> = ({ onCorrectPin, onCancel }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleNumberClick = (num: number) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      // Auto-check when 4 digits entered
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === PARENT_PIN) {
            onCorrectPin();
          } else {
            setError(true);
            setPin('');
          }
        }, 200);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">🔒 Parent Settings</h2>
            <p className="text-text-secondary">Enter PIN to continue</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl font-bold ${
                  error
                    ? 'border-error bg-error-light'
                    : pin.length > index
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {pin.length > index && '•'}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-error font-medium">❌ Incorrect PIN. Try again.</p>
          )}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="h-16 text-2xl font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="h-16 text-lg font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => handleNumberClick(0)}
              className="h-16 text-2xl font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
            >
              0
            </button>
            <button
              onClick={onCancel}
              className="h-16 text-lg font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-text-secondary">
            Default PIN: 1234 (Can be changed in v1.6)
          </p>
        </div>
      </Card>
    </div>
  );
};
```

**3. Update App.tsx to Include Settings**

Add to screen types:
```typescript
type Screen =
  | 'profile-selection'
  | 'activity-selection'
  | 'passage-selection'
  | 'reading-race'
  | 'word-catcher'
  | 'avatar-shop'
  | 'progress-dashboard'
  | 'parent-settings'; // NEW
```

Add state for sound settings:
```typescript
const [soundEnabled, setSoundEnabled] = useState(() => {
  const stored = localStorage.getItem('wordrush_sound_enabled');
  return stored !== null ? JSON.parse(stored) : true;
});

// Save sound preference
useEffect(() => {
  localStorage.setItem('wordrush_sound_enabled', JSON.stringify(soundEnabled));
}, [soundEnabled]);
```

Add PIN entry state:
```typescript
const [showPinEntry, setShowPinEntry] = useState(false);
```

Add navigation handlers:
```typescript
const handleShowSettings = () => {
  setShowPinEntry(true);
};

const handlePinCorrect = () => {
  setShowPinEntry(false);
  setCurrentScreen('parent-settings');
};
```

Add to render:
```typescript
{showPinEntry && (
  <PinEntry
    onCorrectPin={handlePinCorrect}
    onCancel={() => setShowPinEntry(false)}
  />
)}

{currentScreen === 'parent-settings' && (
  <ParentSettings
    profiles={profiles}
    onUpdateProfiles={setProfiles}
    onBack={handleBackToMenu}
    soundEnabled={soundEnabled}
    onToggleSound={setSoundEnabled}
  />
)}
```

**4. Update ActivitySelection to Add Settings Button**

Add settings button:
```typescript
<Button
  variant="outline"
  size="sm"
  onClick={onShowSettings}
  className="mt-4"
>
  ⚙️ Parent Settings
</Button>
```

Update interface:
```typescript
interface ActivitySelectionProps {
  profile: Profile;
  onSelectActivity: (activity: 'reading-race' | 'word-catcher' | 'avatar-shop') => void;
  onShowProgress: () => void;
  onShowSettings: () => void; // NEW
  onBack: () => void;
}
```

#### Testing Checklist

**PIN Entry:**
- [ ] PIN entry modal appears when settings clicked
- [ ] Correct PIN (1234) grants access
- [ ] Incorrect PIN shows error and clears
- [ ] Cancel button works
- [ ] Keyboard input disabled (number pad only)

**General Settings:**
- [ ] Sound toggle works
- [ ] Sound preference persists
- [ ] App version displays correctly
- [ ] Storage size calculates correctly

**Profile Management:**
- [ ] All profiles listed with stats
- [ ] Reset profile works
- [ ] Confirmation dialog appears
- [ ] Profile resets to default state
- [ ] Progress erased properly

**Data Management:**
- [ ] Export creates valid JSON file
- [ ] Export filename includes date
- [ ] Import accepts valid backup files
- [ ] Import rejects invalid files
- [ ] Clear all data works with double confirmation
- [ ] Page refreshes after import/clear

**Security:**
- [ ] Settings not accessible without PIN
- [ ] Children can't bypass PIN screen
- [ ] Back button exits without changes if PIN not entered

#### Dependencies
- Requires existing storage.ts utility functions

#### Definition of Done
- ✅ ParentSettings component created
- ✅ PIN entry system implemented
- ✅ All tabs functional (General, Profiles, Data)
- ✅ Sound toggle integrated
- ✅ Profile reset works correctly
- ✅ Data export/import working
- ✅ Clear all data with confirmations
- ✅ Accessible from Activity Selection
- ✅ All testing checklist items pass
- ✅ Code committed to branch

---

### TASK 2: Implement Sound Effects & Audio Feedback
**Priority:** 🔴 Critical
**Estimated Time:** 4 hours
**Assignee:** Developer

#### User Story
```
As a child user
I want to hear sounds when I earn coins and answer questions
So that the app feels more engaging and fun
```

#### Current State
- No audio files in project
- No sound effects implementation
- Silent user experience
- Missing auditory feedback for actions

#### Acceptance Criteria
- [ ] Sound effects added for:
  - Coin collection (cha-ching)
  - Correct answer (positive chime)
  - Wrong answer (gentle buzz)
  - Badge unlock (celebration)
  - Item purchase (success sound)
  - Activity start (encouraging sound)
- [ ] Sounds respect parent settings (mute toggle)
- [ ] Sounds are kid-friendly (not scary or harsh)
- [ ] Sound files are optimized (small file size)
- [ ] No audio overlap issues
- [ ] Works across all major browsers

#### Technical Requirements

**1. Add Audio Files to Project**

Create `public/sounds/` directory with these files:

```bash
mkdir -p public/sounds
```

**Required sound files:**
- `coin.mp3` - Coin collection (short, 0.5s)
- `correct.mp3` - Correct answer (positive, 0.8s)
- `wrong.mp3` - Wrong answer (gentle, 0.6s)
- `badge.mp3` - Badge unlock (celebration, 1.5s)
- `purchase.mp3` - Item purchase (success, 1s)
- `start.mp3` - Activity start (encouraging, 0.7s)

**Free sound sources:**
- https://pixabay.com/sound-effects/
- https://freesound.org/
- https://mixkit.co/free-sound-effects/

**2. Create Sound Hook Utility**

Create `src/hooks/useSound.ts`:

```typescript
import { useRef, useEffect } from 'react';

export type SoundType = 'coin' | 'correct' | 'wrong' | 'badge' | 'purchase' | 'start';

interface UseSoundOptions {
  enabled: boolean;
  volume?: number;
}

export const useSound = (soundType: SoundType, options: UseSoundOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { enabled, volume = 0.5 } = options;

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(`/sounds/${soundType}.mp3`);
    audioRef.current.volume = volume;

    // Preload
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundType, volume]);

  const play = () => {
    if (!enabled || !audioRef.current) return;

    // Reset to start if already playing
    audioRef.current.currentTime = 0;

    // Play with error handling
    audioRef.current.play().catch((error) => {
      console.warn('Sound play failed:', error);
    });
  };

  return { play };
};
```

**3. Create Global Sound Manager**

Create `src/utils/soundManager.ts`:

```typescript
export type SoundType = 'coin' | 'correct' | 'wrong' | 'badge' | 'purchase' | 'start';

class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    // Preload all sounds
    const soundTypes: SoundType[] = ['coin', 'correct', 'wrong', 'badge', 'purchase', 'start'];

    soundTypes.forEach((type) => {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = this.volume;
      audio.load();
      this.sounds.set(type, audio);
    });

    // Load sound preference
    const stored = localStorage.getItem('wordrush_sound_enabled');
    this.enabled = stored !== null ? JSON.parse(stored) : true;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem('wordrush_sound_enabled', JSON.stringify(enabled));
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((audio) => {
      audio.volume = this.volume;
    });
  }

  play(type: SoundType) {
    if (!this.enabled) return;

    const audio = this.sounds.get(type);
    if (!audio) return;

    // Reset to start
    audio.currentTime = 0;

    // Play with error handling
    audio.play().catch((error) => {
      console.warn(`Failed to play ${type} sound:`, error);
    });
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
```

**4. Integrate Sounds into Components**

**In App.tsx:**
```typescript
import { soundManager } from './utils/soundManager';

// Update sound toggle to use sound manager
const handleToggleSound = (enabled: boolean) => {
  setSoundEnabled(enabled);
  soundManager.setEnabled(enabled);
};

// Initialize sound manager
useEffect(() => {
  soundManager.setEnabled(soundEnabled);
}, []);
```

**In ReadingRace.tsx:**
```typescript
import { soundManager } from '../utils/soundManager';

// Play start sound when activity begins
useEffect(() => {
  soundManager.play('start');
}, []);

// Play sound on answer
const handleAnswer = (selectedIndex: number) => {
  const correct = selectedIndex === currentQuestion.correctIndex;

  if (correct) {
    soundManager.play('correct');
    setCorrectCount((prev) => prev + 1);
  } else {
    soundManager.play('wrong');
  }

  // ... rest of logic
};

// Play coin sound on completion
const handleFinish = () => {
  // ... calculate coins
  soundManager.play('coin');
  onComplete(earned, wpm, correctCount, currentPassage.questions.length, currentPassage.id);
};
```

**In WordCatcher.tsx:**
```typescript
import { soundManager } from '../utils/soundManager';

// Play start sound
useEffect(() => {
  soundManager.play('start');
}, []);

// Play sound on word selection
const handleAnswer = (selectedWord: string) => {
  const correct = selectedWord === SIGHT_WORD_SETS[currentWordSet - 1].words[currentWordIndex];

  if (correct) {
    soundManager.play('correct');
    setCorrectCount((prev) => prev + 1);
  } else {
    soundManager.play('wrong');
  }

  // ... rest of logic
};

// Play coin sound on finish
if (currentWordIndex === currentWordSet.words.length - 1) {
  soundManager.play('coin');
  onComplete(/* ... */);
}
```

**In AvatarShop.tsx:**
```typescript
import { soundManager } from '../utils/soundManager';

// Play sound on purchase
const handlePurchase = (item: UnlockableItem) => {
  // ... purchase logic
  soundManager.play('purchase');
  onPurchase(item);
};
```

**In BadgeUnlockNotification.tsx:**
```typescript
import { soundManager } from '../utils/soundManager';

// Play celebration sound when badge notification appears
useEffect(() => {
  soundManager.play('badge');
}, []);
```

**5. Add Mute Button to Header**

Create `src/components/SoundToggle.tsx`:

```typescript
import React from 'react';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className="fixed top-4 right-4 z-40 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      title={enabled ? 'Mute sounds' : 'Unmute sounds'}
    >
      <span className="text-2xl">{enabled ? '🔊' : '🔇'}</span>
    </button>
  );
};
```

Add to App.tsx:
```typescript
import { SoundToggle } from './components/SoundToggle';

// In render, add outside main content:
<SoundToggle enabled={soundEnabled} onToggle={handleToggleSound} />
```

#### Testing Checklist

**Sound Playback:**
- [ ] Coin sound plays on activity completion
- [ ] Correct answer sound plays
- [ ] Wrong answer sound plays
- [ ] Badge unlock sound plays
- [ ] Purchase sound plays in shop
- [ ] Start sound plays when activity begins
- [ ] Sounds play at appropriate volume
- [ ] No sound overlap or distortion

**Sound Control:**
- [ ] Mute button works globally
- [ ] Parent settings toggle works
- [ ] Sound preference persists across sessions
- [ ] Sounds respect mute state immediately

**Browser Compatibility:**
- [ ] Works in Chrome/Edge
- [ ] Works in Safari (iOS)
- [ ] Works in Firefox
- [ ] Works on tablets/mobile devices

**Edge Cases:**
- [ ] Sounds work after page refresh
- [ ] Sounds don't play multiple times rapidly
- [ ] Sounds work in incognito mode
- [ ] Graceful fallback if sound files missing

#### Implementation Notes

**Sound Selection Guidelines:**
- Keep sounds under 100KB each
- Use MP3 format for best compatibility
- Ensure sounds are cheerful and encouraging
- Avoid loud or startling sounds
- Test volume levels with children

**Audio File Optimization:**
```bash
# Recommended settings for audio export:
# Format: MP3
# Bitrate: 128 kbps
# Sample rate: 44.1 kHz
# Mono (not stereo) to reduce size
```

#### Dependencies
- Task 1 (Parent Settings) should be completed first for sound toggle integration

#### Definition of Done
- ✅ All 6 sound files added to project
- ✅ SoundManager utility created
- ✅ Sounds integrated in all components
- ✅ Mute toggle button working
- ✅ Parent settings sound toggle working
- ✅ Sound preference persists
- ✅ All testing checklist items pass
- ✅ Works across major browsers
- ✅ Code committed to branch

---

### TASK 3: Set Up Testing Infrastructure
**Priority:** 🔴 Critical
**Estimated Time:** 8 hours
**Assignee:** Developer

#### User Story
```
As a developer
I want automated tests for critical functionality
So that I can refactor with confidence and prevent regressions
```

#### Current State
- Zero test files exist
- No testing framework installed
- No test scripts in package.json
- 0% test coverage
- Manual testing only

#### Acceptance Criteria
- [ ] Vitest and React Testing Library installed
- [ ] Test scripts added to package.json
- [ ] Test utilities (storage, badgeChecker, streakTracker) covered
- [ ] Critical components (Avatar, CoinDisplay, BadgeCollection) tested
- [ ] Activity completion flows tested
- [ ] 40-50% code coverage achieved
- [ ] All tests passing
- [ ] CI-ready test configuration

#### Technical Requirements

**1. Install Testing Dependencies**

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**2. Configure Vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '*.config.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**3. Create Test Setup File**

Create `src/test/setup.ts`:

```typescript
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

global.localStorage = localStorageMock as any;

// Mock Audio API
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn(),
  pause: vi.fn(),
  load: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  volume: 0.5,
  currentTime: 0,
}));

// Mock SpeechSynthesis
global.speechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => []),
  speaking: false,
  pending: false,
  paused: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => true),
} as any;
```

**4. Add Test Scripts to package.json**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

**5. Write Utility Tests**

Create `src/utils/__tests__/storage.test.ts`:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveProfiles, loadProfiles, clearStorage, isStorageAvailable } from '../storage';
import { Profiles } from '../../types';

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockProfiles: Profiles = {
    daughter: {
      id: 'daughter',
      name: 'Daughter',
      age: 8,
      coins: 50,
      unlockedItems: [],
      activityHistory: [],
      currentWordSet: 1,
      completedWordSets: [],
      unlockedBadges: [],
      streakDays: 0,
    },
    son: {
      id: 'son',
      name: 'Son',
      age: 5,
      coins: 30,
      unlockedItems: [],
      activityHistory: [],
      currentWordSet: 1,
      completedWordSets: [],
      unlockedBadges: [],
      streakDays: 0,
    },
  };

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isStorageAvailable()).toBe(true);
    });
  });

  describe('saveProfiles', () => {
    it('should save profiles to localStorage', () => {
      const result = saveProfiles(mockProfiles);

      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'wordrush_data',
        expect.stringContaining('daughter')
      );
    });

    it('should include version and timestamp', () => {
      saveProfiles(mockProfiles);

      const savedData = JSON.parse(
        (localStorage.setItem as any).mock.calls[0][1]
      );

      expect(savedData).toHaveProperty('version');
      expect(savedData).toHaveProperty('lastUpdated');
      expect(savedData).toHaveProperty('profiles');
    });
  });

  describe('loadProfiles', () => {
    it('should load profiles from localStorage', () => {
      const data = {
        version: 1,
        profiles: mockProfiles,
        lastUpdated: new Date().toISOString(),
      };

      (localStorage.getItem as any).mockReturnValue(JSON.stringify(data));

      const loaded = loadProfiles();

      expect(loaded).toEqual(mockProfiles);
    });

    it('should return null when no data exists', () => {
      (localStorage.getItem as any).mockReturnValue(null);

      const loaded = loadProfiles();

      expect(loaded).toBeNull();
    });
  });

  describe('clearStorage', () => {
    it('should clear localStorage', () => {
      clearStorage();

      expect(localStorage.removeItem).toHaveBeenCalledWith('wordrush_data');
    });
  });
});
```

Create `src/utils/__tests__/badgeChecker.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { checkForNewBadges, getBadgeProgress } from '../badgeChecker';
import { Profile, BadgeId } from '../../types';

describe('badgeChecker utilities', () => {
  const baseProfile: Profile = {
    id: 'test',
    name: 'Test User',
    age: 8,
    coins: 0,
    unlockedItems: [],
    activityHistory: [],
    currentWordSet: 1,
    completedWordSets: [],
    unlockedBadges: [],
    streakDays: 0,
  };

  describe('checkForNewBadges', () => {
    it('should unlock first-steps badge after first activity', () => {
      const profile: Profile = {
        ...baseProfile,
        activityHistory: [
          {
            timestamp: new Date(),
            coinsEarned: 10,
            activityType: 'reading',
            wpm: 50,
            score: 2,
            totalQuestions: 2,
            passageId: 'test-passage',
          },
        ],
      };

      const newBadges = checkForNewBadges(profile);

      expect(newBadges).toContain('first-steps');
    });

    it('should unlock coin-collector at 50 coins', () => {
      const profile: Profile = {
        ...baseProfile,
        coins: 50,
      };

      const newBadges = checkForNewBadges(profile);

      expect(newBadges).toContain('coin-collector');
    });

    it('should unlock speed-reader at 100+ WPM', () => {
      const profile: Profile = {
        ...baseProfile,
        activityHistory: [
          {
            timestamp: new Date(),
            coinsEarned: 20,
            activityType: 'reading',
            wpm: 105,
            score: 2,
            totalQuestions: 2,
            passageId: 'test-passage',
          },
        ],
      };

      const newBadges = checkForNewBadges(profile);

      expect(newBadges).toContain('speed-reader');
    });

    it('should not unlock badge twice', () => {
      const profile: Profile = {
        ...baseProfile,
        coins: 60,
        unlockedBadges: [
          {
            badgeId: 'coin-collector',
            unlockedAt: new Date(),
          },
        ],
      };

      const newBadges = checkForNewBadges(profile);

      expect(newBadges).not.toContain('coin-collector');
    });
  });

  describe('getBadgeProgress', () => {
    it('should calculate coin-collector progress', () => {
      const profile: Profile = {
        ...baseProfile,
        coins: 25,
      };

      const progress = getBadgeProgress(profile, 'coin-collector');

      expect(progress).toEqual({
        current: 25,
        required: 50,
        percentage: 50,
      });
    });

    it('should cap percentage at 100', () => {
      const profile: Profile = {
        ...baseProfile,
        coins: 100,
      };

      const progress = getBadgeProgress(profile, 'coin-collector');

      expect(progress.percentage).toBe(100);
    });
  });
});
```

Create `src/utils/__tests__/streakTracker.test.ts`:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { updateStreak, getStreakMessage, isStreakAtRisk } from '../streakTracker';
import { Profile } from '../../types';

describe('streakTracker utilities', () => {
  const baseProfile: Profile = {
    id: 'test',
    name: 'Test User',
    age: 8,
    coins: 0,
    unlockedItems: [],
    activityHistory: [],
    currentWordSet: 1,
    completedWordSets: [],
    unlockedBadges: [],
    streakDays: 0,
  };

  describe('updateStreak', () => {
    it('should set streak to 1 on first activity', () => {
      const updated = updateStreak(baseProfile);

      expect(updated.streakDays).toBe(1);
      expect(updated.lastActivityDate).toBeDefined();
    });

    it('should increment streak on consecutive day', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const profile: Profile = {
        ...baseProfile,
        streakDays: 1,
        lastActivityDate: yesterday,
      };

      const updated = updateStreak(profile);

      expect(updated.streakDays).toBe(2);
    });

    it('should maintain streak on same day', () => {
      const today = new Date();

      const profile: Profile = {
        ...baseProfile,
        streakDays: 3,
        lastActivityDate: today,
      };

      const updated = updateStreak(profile);

      expect(updated.streakDays).toBe(3);
    });

    it('should reset streak when day is skipped', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const profile: Profile = {
        ...baseProfile,
        streakDays: 5,
        lastActivityDate: threeDaysAgo,
      };

      const updated = updateStreak(profile);

      expect(updated.streakDays).toBe(1);
    });
  });

  describe('getStreakMessage', () => {
    it('should return encouraging messages for different streak lengths', () => {
      expect(getStreakMessage(0)).toContain('Start');
      expect(getStreakMessage(1)).toContain('Great start');
      expect(getStreakMessage(3)).toContain('fire');
      expect(getStreakMessage(7)).toContain('Amazing');
    });
  });

  describe('isStreakAtRisk', () => {
    it('should return false for same-day activity', () => {
      const profile: Profile = {
        ...baseProfile,
        lastActivityDate: new Date(),
        streakDays: 3,
      };

      expect(isStreakAtRisk(profile)).toBe(false);
    });

    it('should return true for yesterday activity', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const profile: Profile = {
        ...baseProfile,
        lastActivityDate: yesterday,
        streakDays: 3,
      };

      expect(isStreakAtRisk(profile)).toBe(true);
    });
  });
});
```

**6. Write Component Tests**

Create `src/components/__tests__/CoinDisplay.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CoinDisplay } from '../CoinDisplay';

describe('CoinDisplay', () => {
  it('should render coin count', () => {
    render(<CoinDisplay coins={50} size="md" />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should render coin emoji', () => {
    render(<CoinDisplay coins={100} size="md" />);

    expect(screen.getByText('🪙')).toBeInTheDocument();
  });

  it('should apply size classes', () => {
    const { container } = render(<CoinDisplay coins={50} size="lg" />);

    expect(container.querySelector('.text-3xl')).toBeInTheDocument();
  });
});
```

Create `src/components/__tests__/BadgeCollection.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadgeCollection } from '../BadgeCollection';
import { Profile } from '../../types';

describe('BadgeCollection', () => {
  const mockProfile: Profile = {
    id: 'test',
    name: 'Test User',
    age: 8,
    coins: 100,
    unlockedItems: [],
    activityHistory: [],
    currentWordSet: 1,
    completedWordSets: [1],
    unlockedBadges: [
      {
        badgeId: 'first-steps',
        unlockedAt: new Date('2025-01-01'),
      },
    ],
    streakDays: 0,
  };

  it('should render badge collection header', () => {
    render(<BadgeCollection profile={mockProfile} />);

    expect(screen.getByText(/Badge Collection/i)).toBeInTheDocument();
  });

  it('should show correct badge count', () => {
    render(<BadgeCollection profile={mockProfile} />);

    expect(screen.getByText(/1 \/ 12 badges earned/i)).toBeInTheDocument();
  });

  it('should show unlocked badge with icon', () => {
    render(<BadgeCollection profile={mockProfile} />);

    expect(screen.getByText('First Steps')).toBeInTheDocument();
  });

  it('should show locked badges as locked', () => {
    render(<BadgeCollection profile={mockProfile} />);

    const lockedBadges = screen.getAllByText('🔒');
    expect(lockedBadges.length).toBeGreaterThan(0);
  });
});
```

**7. Write Integration Test**

Create `src/test/integration/activity-flow.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

describe('Activity completion flow', () => {
  it('should complete reading activity and earn coins', async () => {
    render(<App />);

    // Select profile
    const daughterButton = screen.getByText(/daughter/i);
    fireEvent.click(daughterButton);

    // Verify we're on activity selection
    await waitFor(() => {
      expect(screen.getByText(/reading race/i)).toBeInTheDocument();
    });

    // Check initial coin count is 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
```

#### Testing Checklist

**Test Setup:**
- [ ] Vitest installed and configured
- [ ] React Testing Library installed
- [ ] Test setup file created
- [ ] Test scripts added to package.json
- [ ] Mocks configured (localStorage, Audio, SpeechSynthesis)

**Utility Tests:**
- [ ] storage.ts tests passing
- [ ] badgeChecker.ts tests passing
- [ ] streakTracker.ts tests passing
- [ ] soundManager.ts tests passing

**Component Tests:**
- [ ] CoinDisplay tests passing
- [ ] Avatar tests passing
- [ ] BadgeCollection tests passing
- [ ] Button/Card UI tests passing

**Integration Tests:**
- [ ] Activity completion flow tested
- [ ] Profile selection flow tested
- [ ] Badge unlock flow tested

**Coverage:**
- [ ] 40%+ overall coverage achieved
- [ ] Critical utilities at 80%+ coverage
- [ ] Test coverage report generated

#### Dependencies
- None (can start immediately)

#### Definition of Done
- ✅ Vitest and testing libraries installed
- ✅ Test configuration complete
- ✅ 15-20 tests written
- ✅ All tests passing
- ✅ 40-50% code coverage
- ✅ Coverage report generated
- ✅ Test documentation added to README
- ✅ Code committed to branch

---

### TASK 4: QA Testing with Target Age Groups
**Priority:** 🟡 High
**Estimated Time:** 3 hours
**Assignee:** Developer / QA Tester

#### User Story
```
As a developer
I want to validate the app with real children
So that I can identify usability issues and ensure age-appropriateness
```

#### Current State
- App has not been tested with target users (5 & 8 year olds)
- Unknown usability issues
- Assumptions about difficulty and engagement not validated
- No documented user feedback

#### Acceptance Criteria
- [ ] Test with at least one 5-year-old using Word Catcher
- [ ] Test with at least one 8-year-old using Reading Race
- [ ] Document observations and feedback
- [ ] Identify critical bugs or UX issues
- [ ] Measure engagement and completion rates
- [ ] Create prioritized list of improvements
- [ ] Validate content difficulty levels

#### Technical Requirements

**1. Create QA Test Plan**

Create `QA_TESTING_PLAN.md`:

```markdown
# WordRush v1.5 QA Testing Plan

## Test Sessions

### Session 1: 5-Year-Old (Son Profile)
**Duration:** 15-20 minutes
**Focus:** Word Catcher activity

**Test Scenarios:**
1. Profile selection (can child recognize their name/avatar?)
2. Word Catcher Set 1 (Pre-K words)
3. Understanding text-to-speech
4. Clicking correct/incorrect words
5. Completion and coin earning
6. Avatar shop interaction

**Observation Checklist:**
- [ ] Child can select their profile independently
- [ ] Child understands word pronunciation
- [ ] Child can identify correct word from options
- [ ] Child understands coin reward system
- [ ] Child shows engagement/enjoyment
- [ ] Child can use "Repeat" button effectively
- [ ] Child can navigate back to menu
- [ ] UI elements are large enough for small hands
- [ ] No frustration or confusion observed

### Session 2: 8-Year-Old (Daughter Profile)
**Duration:** 20-30 minutes
**Focus:** Reading Race activity

**Test Scenarios:**
1. Profile selection
2. Passage selection (easy, medium, hard)
3. Reading passage independently
4. Answering comprehension questions
5. Understanding WPM score
6. Completion and coin earning
7. Badge unlock (if applicable)
8. Progress dashboard review

**Observation Checklist:**
- [ ] Child can select and filter passages
- [ ] Child reads passage at appropriate speed
- [ ] Child comprehends passage content
- [ ] Child can answer questions without hints
- [ ] Child understands performance feedback
- [ ] Child shows interest in progress tracking
- [ ] Child motivated by badges/coins
- [ ] Difficulty levels are appropriate
- [ ] No confusion with UI navigation

### Session 3: Parent Review
**Duration:** 10-15 minutes
**Focus:** Parent settings and progress tracking

**Test Scenarios:**
1. Access parent settings with PIN
2. Review progress dashboard
3. Test sound toggle
4. Export/import data
5. Reset profile test

**Observation Checklist:**
- [ ] PIN entry is intuitive
- [ ] Progress dashboard provides useful insights
- [ ] Settings are clear and functional
- [ ] Export/import works as expected
- [ ] Parent feels in control of app

## Bug Tracking Template

For each bug found:
- **Severity:** Critical / High / Medium / Low
- **Description:** What happened?
- **Steps to Reproduce:** How to recreate the bug?
- **Expected Behavior:** What should happen?
- **Actual Behavior:** What actually happened?
- **Screenshot/Video:** If applicable
- **Device/Browser:** Testing environment

## Feedback Collection

**Child Feedback Questions:**
- What did you like most?
- What was confusing or hard?
- Would you play this again?
- What would make it more fun?

**Parent Feedback Questions:**
- Is the app easy for your child to use?
- Do you feel you can track their progress?
- Are the difficulty levels appropriate?
- What concerns do you have?
- What features would you like to see?
```

**2. Create Bug Report Template**

Create `BUG_REPORT_TEMPLATE.md`:

```markdown
# Bug Report

## Bug ID: [AUTO-INCREMENT]
**Date Found:** [DATE]
**Reported By:** [NAME]
**Severity:** [ ] Critical [ ] High [ ] Medium [ ] Low

## Description
[Clear description of what went wrong]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [...]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happened]

## Environment
- **Device:** [PC / Tablet / iPad / etc.]
- **Browser:** [Chrome / Safari / Firefox / etc.]
- **Screen Size:** [Desktop / Tablet / Mobile]
- **User Profile:** [Daughter / Son]
- **Activity:** [Reading Race / Word Catcher / etc.]

## Screenshots/Video
[Attach if applicable]

## Notes
[Any additional context]

## Status
[ ] Open
[ ] In Progress
[ ] Fixed
[ ] Won't Fix
[ ] Duplicate
```

**3. Document Testing Results**

Create `QA_TESTING_RESULTS.md`:

```markdown
# WordRush v1.5 QA Testing Results

## Executive Summary
**Test Date:** [DATE]
**Testers:** [NAMES]
**Overall Result:** [ ] Pass [ ] Pass with Issues [ ] Fail

## Test Session Results

### Session 1: 5-Year-Old Test
**Participant:** [Name/Pseudonym]
**Duration:** [TIME]
**Completion:** [ ] Full [ ] Partial [ ] Did not complete

**Observations:**
- [Key observation 1]
- [Key observation 2]
- [...]

**Issues Found:**
1. [Issue description] - Severity: [X]
2. [Issue description] - Severity: [X]

**Positive Feedback:**
- [What worked well]
- [What they enjoyed]

**Areas for Improvement:**
- [Suggested improvement]
- [Confusion points]

### Session 2: 8-Year-Old Test
[Similar structure as above]

### Session 3: Parent Review
[Similar structure as above]

## Bugs Found

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| 1  | High     | [Description] | Open |
| 2  | Medium   | [Description] | Fixed |

## Usability Issues

| Issue | Impact | Priority | Recommendation |
|-------|--------|----------|----------------|
| [Issue 1] | High | Must Fix | [Recommendation] |
| [Issue 2] | Low | Nice to Have | [Recommendation] |

## Performance Metrics
- **Average session time:** [TIME]
- **Completion rate:** [X]%
- **Return interest:** [X]/[X] would play again
- **Parent satisfaction:** [RATING]/5

## Recommendations for v1.6
1. [Priority 1 recommendation]
2. [Priority 2 recommendation]
3. [...]

## Conclusion
[Overall assessment of production readiness]
```

**4. Conduct Testing Sessions**

**Preparation:**
- Clear browser cache and localStorage
- Test on actual tablet/iPad if possible
- Prepare observation notebook
- Record screen if permitted
- Have backup device ready

**During Testing:**
- Observe without intervening unless stuck
- Note time stamps for issues
- Capture exact wording of confusions
- Record facial expressions and engagement
- Let child explore freely

**After Testing:**
- Document immediately while fresh
- Review recordings if available
- Categorize findings by severity
- Create bug reports for issues found

#### Testing Checklist

**Pre-Test Preparation:**
- [ ] QA test plan created
- [ ] Bug report template ready
- [ ] Test device prepared
- [ ] Testers scheduled
- [ ] Recording setup (if used)
- [ ] Consent obtained (if required)

**Test Execution:**
- [ ] 5-year-old session completed
- [ ] 8-year-old session completed
- [ ] Parent review completed
- [ ] Observations documented
- [ ] Bugs logged

**Post-Test Analysis:**
- [ ] Results documented
- [ ] Bugs prioritized
- [ ] Feedback analyzed
- [ ] Recommendations created
- [ ] Critical issues identified

#### Dependencies
- Tasks 1-3 should be complete to test full feature set

#### Definition of Done
- ✅ QA test plan created
- ✅ At least 2 test sessions conducted (5yo and 8yo)
- ✅ Parent review completed
- ✅ Results documented
- ✅ Bugs logged with severity
- ✅ Recommendations for improvements created
- ✅ Critical bugs identified for Task 5
- ✅ Documentation committed to repo

---

### TASK 5: Bug Fixes & Final Polish
**Priority:** 🔴 Critical
**Estimated Time:** 4 hours
**Assignee:** Developer

#### User Story
```
As a user
I want a stable, polished app
So that I have a great experience without frustration
```

#### Current State
- Bugs discovered during QA testing
- Minor UI/UX polish needed
- Performance optimizations possible
- Edge cases may need handling

#### Acceptance Criteria
- [ ] All critical bugs from QA fixed
- [ ] All high-priority bugs from QA fixed
- [ ] Medium-priority bugs fixed (if time permits)
- [ ] UI polish applied (spacing, alignment, colors)
- [ ] Loading states added where needed
- [ ] Error messages are user-friendly
- [ ] Performance optimized (no lag or stuttering)
- [ ] Final regression testing passed

#### Technical Requirements

**1. Create Bug Fix Tracking**

Create `BUG_FIXES.md`:

```markdown
# Sprint 4 Bug Fixes

## Critical Bugs (Must Fix)

### Bug #1: [Title]
**Severity:** Critical
**Description:** [Description]
**Root Cause:** [Analysis]
**Fix:** [Solution implemented]
**Commit:** [Commit hash]
**Verified:** [ ] Yes [ ] No

## High Priority Bugs (Should Fix)

### Bug #2: [Title]
[Same structure as above]

## Medium Priority Bugs (Nice to Fix)

### Bug #3: [Title]
[Same structure as above]

## UI Polish Items

1. [ ] Adjust button spacing in Activity Selection
2. [ ] Improve loading states for passage selection
3. [ ] Add transition animations to screens
4. [ ] Polish badge unlock animation
5. [ ] Improve coin display animation
6. [ ] Add subtle hover effects
7. [ ] Ensure consistent spacing throughout

## Performance Optimizations

1. [ ] Optimize large component re-renders
2. [ ] Add React.memo where appropriate
3. [ ] Lazy load heavy components
4. [ ] Optimize badge checking logic
5. [ ] Debounce rapid state updates

## Accessibility Improvements (If Time)

1. [ ] Add ARIA labels to interactive elements
2. [ ] Ensure keyboard navigation works
3. [ ] Test with screen reader (basic)
4. [ ] Improve focus indicators
```

**2. Common Bug Fixes**

**Fix: Prevent Rapid Button Clicking**
```typescript
// Add to buttons that trigger state changes
const [isProcessing, setIsProcessing] = useState(false);

const handleClick = async () => {
  if (isProcessing) return;

  setIsProcessing(true);
  try {
    // Your logic here
  } finally {
    setTimeout(() => setIsProcessing(false), 500);
  }
};
```

**Fix: Add Loading States**
```typescript
// For async operations
const [loading, setLoading] = useState(false);

{loading ? (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin text-4xl">⏳</div>
    <p className="ml-4">Loading...</p>
  </div>
) : (
  // Normal content
)}
```

**Fix: Graceful Error Handling**
```typescript
// Wrap risky operations
try {
  // Operation
} catch (error) {
  console.error('Error:', error);
  alert('Oops! Something went wrong. Please try again.');
}
```

**Fix: Optimize Performance**
```typescript
import React, { memo, useMemo, useCallback } from 'react';

// Memoize expensive calculations
const stats = useMemo(() => {
  return calculateStats(profile);
}, [profile]);

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency]);

// Memoize components
export const ExpensiveComponent = memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

**3. UI Polish Enhancements**

**Add Smooth Transitions:**
```css
/* Add to index.css */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Add Loading Skeletons:**
```typescript
export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};
```

**Improve Button Feedback:**
```typescript
<button className="... active:scale-95 transition-transform">
  Click Me
</button>
```

**4. Final Regression Testing**

Create checklist for final validation:

```markdown
# Final Regression Test Checklist

## Core Functionality
- [ ] Profile selection works
- [ ] Reading Race completes successfully
- [ ] Word Catcher completes successfully
- [ ] Coins earned correctly
- [ ] Progress persists across refresh
- [ ] Badges unlock correctly
- [ ] Streak tracking works
- [ ] Avatar shop purchases work

## Settings & Controls
- [ ] PIN entry works
- [ ] Sound toggle works
- [ ] Profile reset works
- [ ] Data export works
- [ ] Data import works

## Audio
- [ ] All sounds play correctly
- [ ] Mute button works
- [ ] Sounds respect settings

## UI/UX
- [ ] No visual glitches
- [ ] Smooth animations
- [ ] Responsive on mobile/tablet
- [ ] No broken layouts
- [ ] Loading states show

## Performance
- [ ] No lag or stuttering
- [ ] Page loads quickly
- [ ] Smooth transitions
- [ ] No memory leaks

## Edge Cases
- [ ] Works with 0 activities
- [ ] Works with 100+ activities
- [ ] Works in incognito mode
- [ ] Works after clear cache
- [ ] Handles missing data gracefully
```

#### Testing Checklist

**Bug Fixes:**
- [ ] All critical bugs fixed
- [ ] All high-priority bugs fixed
- [ ] Fixes tested and verified
- [ ] No regressions introduced

**UI Polish:**
- [ ] Consistent spacing applied
- [ ] Smooth transitions added
- [ ] Loading states implemented
- [ ] Error messages improved
- [ ] Visual consistency achieved

**Performance:**
- [ ] Components optimized
- [ ] No unnecessary re-renders
- [ ] Fast page loads
- [ ] Smooth animations

**Final Validation:**
- [ ] Full regression test passed
- [ ] Works on multiple devices
- [ ] Works on multiple browsers
- [ ] Ready for production

#### Dependencies
- Task 4 (QA Testing) must be complete to know which bugs to fix

#### Definition of Done
- ✅ All critical and high bugs fixed
- ✅ UI polish applied
- ✅ Performance optimized
- ✅ Final regression testing passed
- ✅ No known critical issues
- ✅ Production-ready
- ✅ Bug fixes documented
- ✅ Code committed to branch

---

## Sprint 4 Schedule

### Recommended Order

**Day 1 (Monday):**
- 🏃 Task 1: Parent Settings Screen (5h)
  - Create ParentSettings component
  - Create PIN entry component
  - Integrate with App
  - Test functionality

**Day 2 (Tuesday):**
- 🏃 Task 2: Sound Effects & Audio (4h)
  - Add sound files
  - Create sound manager
  - Integrate sounds into components
  - Add mute toggle
  - Test audio playback

**Day 3 (Wednesday):**
- 🏃 Task 3: Testing Infrastructure (8h)
  - Install Vitest and testing libraries
  - Configure test environment
  - Write utility tests
  - Write component tests
  - Generate coverage report

**Day 4 (Thursday):**
- 🏃 Task 4: QA Testing (3h)
  - Conduct 5-year-old test session
  - Conduct 8-year-old test session
  - Parent review session
  - Document results and bugs
- 🏃 Task 5: Begin bug fixes (2h)
  - Fix critical bugs discovered

**Day 5 (Friday):**
- 🏃 Task 5: Complete Bug Fixes & Polish (2h)
  - Fix remaining high-priority bugs
  - Apply UI polish
  - Performance optimization
  - Final regression testing
- ✅ Sprint Review (1h)
  - Demo all Sprint 4 features
  - Review v1.5 completion
- ✅ Sprint Retrospective (0.5h)
  - Discuss what went well
  - Plan for v1.6

**Total Hours:** 24 hours

---

## Testing Strategy

### Automated Testing (Day 3)
- Unit tests for utilities (storage, badges, streaks)
- Component tests for UI elements
- Integration tests for key flows
- Target: 40-50% coverage

### QA Testing (Day 4)
- Real-world testing with children
- Parent usability testing
- Bug identification and logging
- Feedback collection

### Regression Testing (Day 5)
- Full app walkthrough
- Cross-browser testing
- Mobile/tablet testing
- Edge case validation

---

## Definition of Done (Sprint Level)

Sprint 4 is complete when:

- [ ] Parent Settings screen implemented with PIN protection
- [ ] Sound effects playing on all major actions
- [ ] 40%+ test coverage achieved
- [ ] QA testing completed with children
- [ ] All critical bugs fixed
- [ ] All high-priority bugs fixed
- [ ] UI polish applied
- [ ] TypeScript builds with zero errors
- [ ] No console errors during normal use
- [ ] Final regression testing passed
- [ ] Code pushed to git branch
- [ ] Documentation updated
- [ ] **v1.5 PRODUCTION READY** 🎉

---

## Risk Management

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Sound files too large (performance) | Low | Medium | Use compressed MP3s at 128kbps, keep under 100KB each |
| Can't access children for QA testing | Medium | Medium | Test with placeholder users, document for later validation, use videos of prior testing |
| Testing setup takes longer than expected | Low | Low | Use standard Vitest config, minimal customization, defer advanced tests to v1.6 |
| QA reveals major usability issues | Low | High | Prioritize critical fixes only, defer nice-to-haves to v1.6, focus on production blockers |
| Bug fixes introduce new bugs | Medium | High | Write tests before fixing, run full regression after each fix, test incrementally |

---

## Success Metrics

At the end of Sprint 4, we should achieve:

- **Completeness:** 100% of v1.5 roadmap features implemented
- **Quality:** 40%+ test coverage, 0 critical bugs
- **Polish:** Professional UI/UX, smooth audio feedback
- **Validation:** Tested with real children, parent-approved
- **Production Ready:** Deployable with confidence

---

## Sprint Retrospective Questions

To discuss at end of Sprint 4:

1. **What went well?**
   - Which features were easier than expected?
   - What testing approach worked best?
   - How effective was the QA process?

2. **What could be improved?**
   - Which tasks took longer than estimated?
   - What blockers did we encounter?
   - What would we do differently next sprint?

3. **v1.5 Overall Assessment:**
   - Did we meet the production-ready goal?
   - What's the most impactful feature we built?
   - What's the biggest risk remaining?

4. **Action items for v1.6:**
   - Priority improvements from QA feedback
   - Technical debt to address
   - New features to consider

---

## Next Steps: v1.6 Preview

**Focus Areas for v1.6 (Next 4 Weeks):**

### High Priority:
1. **Difficulty Levels** - Add easy/medium/hard passage selection
2. **Customizable Profiles** - Edit names, ages, add new profiles
3. **Additional Content** - 5-10 more passages, new word sets
4. **Parent Dashboard Enhancements** - Charts, graphs, trends over time

### Medium Priority:
5. **Accessibility** - WCAG 2.1 AA compliance
6. **PWA Features** - Offline support, install prompt
7. **Performance Optimizations** - Lazy loading, code splitting
8. **Enhanced Animations** - Confetti effects, celebrations

### Low Priority:
9. **New Activity Type** - Story sequencing game
10. **Advanced Analytics** - Reading level assessment, recommendations
11. **Multi-device Sync** - Cloud save with account system
12. **Multiplayer** - Sibling competition mode

---

## Production Deployment Checklist

**Before deploying v1.5 to production:**

### Technical Preparation:
- [ ] All tests passing
- [ ] Build succeeds without errors
- [ ] Environment variables configured
- [ ] Assets optimized (images, audio)
- [ ] Lighthouse score > 90
- [ ] Security headers configured

### Content Validation:
- [ ] All 12 passages reviewed
- [ ] All 52 sight words verified
- [ ] Badge descriptions proofread
- [ ] No placeholder text remaining

### Testing Validation:
- [ ] Tested on Chrome
- [ ] Tested on Safari (iOS)
- [ ] Tested on tablet (iPad)
- [ ] Tested with real children
- [ ] Parent review completed

### Documentation:
- [ ] README updated
- [ ] CHANGELOG.md created for v1.5
- [ ] Setup instructions verified
- [ ] Known issues documented

### Backup & Rollback:
- [ ] Backup of v1.0 available
- [ ] Rollback plan documented
- [ ] Data migration tested
- [ ] Recovery process validated

---

## Appendix: Sound File Recommendations

### Recommended Free Sound Libraries:
1. **Pixabay Sound Effects** - https://pixabay.com/sound-effects/
   - License: Free for commercial use
   - Quality: High
   - Variety: Excellent

2. **Freesound.org** - https://freesound.org/
   - License: Creative Commons
   - Quality: Variable (check reviews)
   - Variety: Huge library

3. **Mixkit** - https://mixkit.co/free-sound-effects/
   - License: Free
   - Quality: Professional
   - Variety: Good selection

### Specific Sound Suggestions:
- **Coin:** "Coin pickup", "Cash register", "Cha-ching"
- **Correct:** "Success bell", "Positive chime", "Victory sound"
- **Wrong:** "Gentle buzz", "Soft error", "Oops sound"
- **Badge:** "Achievement unlock", "Fanfare", "Celebration"
- **Purchase:** "Purchase success", "Unlock sound", "Level up"
- **Start:** "Game start", "Ready go", "Begin sound"

### Audio Optimization Tips:
```bash
# Convert to MP3 and compress (using FFmpeg)
ffmpeg -i input.wav -b:a 128k -ar 44100 -ac 1 output.mp3

# Trim silence from start/end
ffmpeg -i input.mp3 -af silenceremove=1:0:-50dB output.mp3

# Normalize volume
ffmpeg -i input.mp3 -af "volume=0.5" output.mp3
```

---

## Appendix: PIN Code Security Notes

**Current Implementation:**
- Default PIN: 1234
- Hardcoded in component
- No encryption
- Client-side only

**Limitations:**
- PIN can be viewed in browser DevTools
- Not secure against determined users
- Suitable for child protection only (not security)

**Future Enhancements (v1.6+):**
- Allow custom PIN setting
- Store PIN hash (not plaintext)
- Add PIN reset mechanism
- Consider biometric unlock (Touch ID / Face ID)
- Add timeout (require PIN every N minutes)

**Current Use Case:**
The current PIN implementation is designed to:
- Prevent accidental access by young children
- Provide peace of mind for parents
- Be simple and memorable

It is NOT designed to:
- Protect sensitive data (no PII stored)
- Prevent access by tech-savvy users
- Meet security compliance standards

---

*Document Version: 1.0*
*Created: 2025-11-09*
*Sprint Start: TBD*
*Sprint End: TBD*
*Sprint Duration: 1 Week*
*Sprint Goal: Make WordRush v1.5 Production Ready*
