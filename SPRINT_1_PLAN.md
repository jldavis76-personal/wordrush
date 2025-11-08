# Sprint 1: Foundation & Critical Fixes
**Duration:** Week 1 of v1.5 Development
**Sprint Goal:** Establish stable foundation with data persistence, fix critical bugs, and begin content expansion
**Total Estimated Hours:** 16.5 hours

---

## Sprint Objectives

By the end of Sprint 1, WordRush will:
1. ✅ Build successfully with zero TypeScript errors
2. ✅ Persist user data between browser sessions
3. ✅ Track comprehensive activity metrics (WPM, scores)
4. ✅ Have no memory leaks or stability issues
5. ✅ Have 5+ new reading passages for content variety

---

## Sprint Backlog

### TASK 1: Install Dependencies & Verify Build
**Priority:** 🔴 Critical
**Estimated Time:** 0.5 hours
**Assignee:** Developer

#### User Story
```
As a developer
I want to install all npm dependencies and verify the build process
So that I can begin development with proper tooling and error checking
```

#### Current State
- `/home/user/wordrush/node_modules/` does not exist
- `npm install` has never been run
- Build will fail due to missing dependencies
- TypeScript type checking is not active

#### Acceptance Criteria
- [ ] All npm dependencies installed successfully
- [ ] `npm run dev` starts development server without errors
- [ ] `npm run build` completes successfully
- [ ] TypeScript compilation runs without errors
- [ ] ESLint runs without configuration errors
- [ ] Dev server accessible at `localhost:5173`

#### Technical Requirements

**Commands to Execute:**
```bash
cd /home/user/wordrush
npm install
npm run dev  # Test dev server (Ctrl+C to stop)
npm run build  # Test production build
npm run lint  # Test ESLint
```

**Expected Output:**
- `node_modules/` directory created (~120MB)
- `package-lock.json` updated
- Dev server starts on port 5173
- Build creates `dist/` directory
- No build errors or warnings

#### Dependencies
- None (blocking task)

#### Definition of Done
- ✅ All dependencies installed
- ✅ Development server runs
- ✅ Production build succeeds
- ✅ Documentation updated in README if needed

---

### TASK 2: Fix Type Signature Bug
**Priority:** 🔴 Critical
**Estimated Time:** 1 hour
**Assignee:** Developer

#### User Story
```
As a developer
I want activity completion callbacks to properly pass all metrics
So that we can track performance data (WPM, scores) for analytics
```

#### Current State
**Type Mismatch Found:**

**App.tsx:60** - Parent expects:
```typescript
const handleActivityComplete = (coinsEarned: number) => {
  // Only accepts coinsEarned
}
```

**ReadingRace.tsx:9** - Child sends:
```typescript
onComplete: (coinsEarned: number, wpm: number, score: number) => void
```

**WordCatcher.tsx:9** - Child sends:
```typescript
onComplete: (coinsEarned: number, score: number) => void
```

**Problem:** Extra parameters (wpm, score) are passed but ignored, losing valuable data.

#### Acceptance Criteria
- [ ] `handleActivityComplete` accepts all activity metrics
- [ ] New TypeScript types added for activity results
- [ ] Activity history stored in app state
- [ ] Reading activities track: coinsEarned, wpm, score, timestamp, activityType
- [ ] Word activities track: coinsEarned, score, timestamp, activityType
- [ ] No TypeScript errors after changes
- [ ] All existing functionality continues to work

#### Technical Requirements

**1. Update types.ts**

Add new interfaces:
```typescript
// Add to src/types.ts

export type ActivityType = 'reading' | 'words';

export interface BaseActivityResult {
  timestamp: Date;
  coinsEarned: number;
  activityType: ActivityType;
}

export interface ReadingActivityResult extends BaseActivityResult {
  activityType: 'reading';
  wpm: number;
  score: number;
  totalQuestions: number;
}

export interface WordActivityResult extends BaseActivityResult {
  activityType: 'words';
  score: number;
  totalWords: number;
}

export type ActivityResult = ReadingActivityResult | WordActivityResult;

export interface Profile {
  id: ProfileId;
  name: string;
  age: number;
  coins: number;
  unlockedItems: UnlockableItem[];
  activityHistory: ActivityResult[];  // NEW FIELD
}
```

**2. Update App.tsx**

Modify state initialization:
```typescript
// Add activityHistory to initial profile state
const [profiles, setProfiles] = useState<Profiles>({
  daughter: {
    id: 'daughter',
    name: 'Daughter',
    age: 8,
    coins: 0,
    unlockedItems: [],
    activityHistory: [],  // NEW
  },
  son: {
    id: 'son',
    name: 'Son',
    age: 5,
    coins: 0,
    unlockedItems: [],
    activityHistory: [],  // NEW
  },
});
```

Update callback handlers:
```typescript
// Replace handleActivityComplete with two specific handlers

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
```

Update JSX to use new handlers:
```typescript
{currentScreen === 'reading-race' && currentProfile && (
  <ReadingRace
    currentCoins={currentProfile.coins}
    onComplete={handleReadingComplete}  // NEW HANDLER
    onBack={handleBackToMenu}
  />
)}

{currentScreen === 'word-catcher' && currentProfile && (
  <WordCatcher
    currentCoins={currentProfile.coins}
    onComplete={handleWordComplete}  // NEW HANDLER
    onBack={handleBackToMenu}
  />
)}
```

**3. Update ReadingRace.tsx**

Fix onComplete call (line 64):
```typescript
// Update to pass totalQuestions
onComplete(earned, wpm, correctCount, COMPREHENSION_QUESTIONS.length);
```

Update interface:
```typescript
interface ReadingRaceProps {
  currentCoins: number;
  onComplete: (coinsEarned: number, wpm: number, score: number, totalQuestions: number) => void;
  onBack: () => void;
}
```

**4. Update WordCatcher.tsx**

Fix onComplete call (line 80):
```typescript
// Update to pass totalWords
onComplete(earned, correctCount + (correct ? 1 : 0), SIGHT_WORDS.length);
```

Update interface:
```typescript
interface WordCatcherProps {
  currentCoins: number;
  onComplete: (coinsEarned: number, score: number, totalWords: number) => void;
  onBack: () => void;
}
```

#### Testing Checklist
- [ ] Start dev server - no TypeScript errors
- [ ] Complete Reading Race activity
- [ ] Check browser console - activityHistory logged correctly
- [ ] Complete Word Catcher activity
- [ ] Check browser console - activityHistory logged correctly
- [ ] Verify coins still increment properly
- [ ] Verify shop still works
- [ ] Switch profiles and test activities again

#### Dependencies
- Task 1 (Install dependencies) must be completed first

#### Definition of Done
- ✅ Type signatures match across all components
- ✅ Activity history captured in Profile state
- ✅ No TypeScript compilation errors
- ✅ All existing features work as before
- ✅ Console logs show activity data being captured

---

### TASK 3: Implement LocalStorage Persistence
**Priority:** 🔴 Critical
**Estimated Time:** 6 hours
**Assignee:** Developer

#### User Story
```
As a child user
I want my progress to be saved automatically
So that I don't lose my coins and achievements when I close the browser
```

#### Current State
- All data stored only in React state
- Page refresh resets everything
- Users lose all progress between sessions
- No persistence layer exists

#### Acceptance Criteria
- [ ] Profile data persists across browser sessions
- [ ] Data loads automatically on app startup
- [ ] Data saves automatically after every change
- [ ] Version migration system in place for future updates
- [ ] LocalStorage space usage is monitored
- [ ] Graceful fallback if localStorage is unavailable
- [ ] Data corruption handled with error recovery
- [ ] Export/import functionality for data backup

#### Technical Requirements

**1. Create localStorage utility module**

Create `src/utils/storage.ts`:

```typescript
import { Profiles } from '../types';

const STORAGE_KEY = 'wordrush_data';
const STORAGE_VERSION = 1;

interface StorageData {
  version: number;
  profiles: Profiles;
  lastUpdated: string;
}

/**
 * Save profiles to localStorage
 */
export const saveProfiles = (profiles: Profiles): boolean => {
  try {
    const data: StorageData = {
      version: STORAGE_VERSION,
      profiles,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('[Storage] Profiles saved successfully');
    return true;
  } catch (error) {
    console.error('[Storage] Failed to save profiles:', error);

    // Check if quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please export your data and clear old history.');
    }

    return false;
  }
};

/**
 * Load profiles from localStorage
 */
export const loadProfiles = (): Profiles | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      console.log('[Storage] No saved data found');
      return null;
    }

    const data: StorageData = JSON.parse(stored);

    // Version migration (future-proofing)
    if (data.version !== STORAGE_VERSION) {
      console.log(`[Storage] Migrating from v${data.version} to v${STORAGE_VERSION}`);
      return migrateData(data);
    }

    console.log('[Storage] Profiles loaded successfully');
    return data.profiles;
  } catch (error) {
    console.error('[Storage] Failed to load profiles:', error);

    // Data corruption - offer recovery
    const shouldClear = window.confirm(
      'Failed to load saved data. It may be corrupted. Clear and start fresh?'
    );

    if (shouldClear) {
      clearStorage();
    }

    return null;
  }
};

/**
 * Clear all stored data
 */
export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[Storage] Data cleared');
  } catch (error) {
    console.error('[Storage] Failed to clear storage:', error);
  }
};

/**
 * Export data as JSON string
 */
export const exportData = (): string => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored || '{}';
};

/**
 * Import data from JSON string
 */
export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);

    // Validate data structure
    if (!data.profiles || !data.version) {
      throw new Error('Invalid data format');
    }

    localStorage.setItem(STORAGE_KEY, jsonString);
    console.log('[Storage] Data imported successfully');
    return true;
  } catch (error) {
    console.error('[Storage] Failed to import data:', error);
    alert('Invalid data format. Please check the import file.');
    return false;
  }
};

/**
 * Get storage usage info
 */
export const getStorageInfo = (): { used: number; available: number } => {
  try {
    const data = localStorage.getItem(STORAGE_KEY) || '';
    const used = new Blob([data]).size;

    // Most browsers allow 5-10MB for localStorage
    const available = 5 * 1024 * 1024; // 5MB conservative estimate

    return { used, available };
  } catch (error) {
    console.error('[Storage] Failed to get storage info:', error);
    return { used: 0, available: 0 };
  }
};

/**
 * Migrate data between versions (future use)
 */
const migrateData = (data: StorageData): Profiles | null => {
  // For now, just return profiles
  // In future versions, add migration logic here

  switch (data.version) {
    case 1:
      // v1 -> v2 migration (future)
      return data.profiles;
    default:
      console.error('[Storage] Unknown version:', data.version);
      return null;
  }
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.error('[Storage] localStorage not available:', error);
    return false;
  }
};
```

**2. Update App.tsx to use localStorage**

Add imports:
```typescript
import { useEffect } from 'react';
import { saveProfiles, loadProfiles, isStorageAvailable } from './utils/storage';
```

Modify initial state:
```typescript
// Load from localStorage or use defaults
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

const [profiles, setProfiles] = useState<Profiles>(getInitialProfiles());
```

Add auto-save effect:
```typescript
// Auto-save to localStorage whenever profiles change
useEffect(() => {
  if (isStorageAvailable()) {
    saveProfiles(profiles);
  }
}, [profiles]);
```

Add storage warning on mount:
```typescript
// Check storage availability on mount
useEffect(() => {
  if (!isStorageAvailable()) {
    alert('Warning: Browser storage is not available. Progress will not be saved.');
  }
}, []);
```

**3. Add storage info to dev tools**

Optional: Add button to view storage info (for debugging):
```typescript
// In ActivitySelection.tsx or a debug menu
const handleViewStorage = () => {
  const { used, available } = getStorageInfo();
  const usedKB = (used / 1024).toFixed(2);
  const availableMB = (available / 1024 / 1024).toFixed(2);
  const percent = ((used / available) * 100).toFixed(1);

  console.log(`Storage: ${usedKB} KB used of ${availableMB} MB (${percent}%)`);
};
```

#### Testing Checklist

**Basic Functionality:**
- [ ] Complete an activity and earn coins
- [ ] Refresh the page - coins should persist
- [ ] Unlock an avatar item
- [ ] Refresh the page - item should still be unlocked
- [ ] Complete multiple activities
- [ ] Refresh - all activity history should persist

**Cross-Session Testing:**
- [ ] Close browser completely
- [ ] Reopen browser and navigate to app
- [ ] Verify all progress is restored

**Error Handling:**
- [ ] Open dev tools console
- [ ] Manually corrupt localStorage data: `localStorage.setItem('wordrush_data', 'invalid')`
- [ ] Refresh page - should show error recovery dialog
- [ ] Clear data and start fresh

**Storage Limits:**
- [ ] Check console for storage usage logs
- [ ] Create multiple profiles with lots of activity history
- [ ] Monitor storage size (should stay under 100KB for typical use)

**Incognito Mode:**
- [ ] Open app in incognito/private window
- [ ] Complete activities (should work but may show warning)
- [ ] Close and reopen incognito window
- [ ] Depending on browser, data may or may not persist

**Browser Compatibility:**
- [ ] Test on Chrome/Edge (primary target)
- [ ] Test on Safari (iOS target)
- [ ] Test on Firefox (if available)

#### Implementation Notes

**Storage Size Considerations:**
- Profile data: ~500 bytes per profile
- Activity history: ~150 bytes per activity
- 100 activities = ~15KB total
- Well under 5MB localStorage limit

**Data Structure Example:**
```json
{
  "version": 1,
  "profiles": {
    "daughter": {
      "id": "daughter",
      "name": "Daughter",
      "age": 8,
      "coins": 45,
      "unlockedItems": ["hat", "glasses"],
      "activityHistory": [
        {
          "timestamp": "2025-11-08T10:30:00.000Z",
          "coinsEarned": 20,
          "activityType": "reading",
          "wpm": 85,
          "score": 2,
          "totalQuestions": 2
        }
      ]
    },
    "son": { /* ... */ }
  },
  "lastUpdated": "2025-11-08T10:30:05.123Z"
}
```

**Future Enhancements (v1.6+):**
- Add data compression for large histories
- Implement auto-cleanup of old activity history (keep last 100)
- Add cloud sync with backend
- Implement conflict resolution for multiple devices

#### Dependencies
- Task 2 (Type signatures) must be completed first
- Profile type must include activityHistory field

#### Definition of Done
- ✅ localStorage utility functions implemented
- ✅ App loads data on startup
- ✅ App saves data automatically
- ✅ Error handling for storage issues
- ✅ All tests pass
- ✅ Documentation updated
- ✅ Works across browser sessions
- ✅ Works in incognito mode (with warning)

---

### TASK 4: Fix Memory Leak & Add Error Handling
**Priority:** 🟡 High
**Estimated Time:** 3 hours
**Assignee:** Developer

#### User Story
```
As a user
I want the app to be stable and not crash
So that I can use it reliably without errors
```

#### Current State
**Issues Identified:**
1. **Memory Leak in ReadingRace.tsx:74-82**
   - `setInterval` created but cleanup function doesn't properly clear it
   - Interval variable is typed as `number` but TypeScript returns `NodeJS.Timer`
   - Interval continues running after component unmounts

2. **No Error Boundaries**
   - Unhandled errors crash entire app
   - No user-friendly error messages

3. **Unhandled Web Speech API Errors**
   - speechSynthesis may not be available
   - No fallback when voice unavailable

4. **No Loading States**
   - Activities start immediately with no feedback

#### Acceptance Criteria
- [ ] Timer cleanup properly clears interval in ReadingRace
- [ ] Error boundary catches and displays errors gracefully
- [ ] Web Speech API has try-catch and fallback UI
- [ ] No memory leaks detected in React DevTools Profiler
- [ ] App recovers gracefully from errors
- [ ] User sees helpful error messages

#### Technical Requirements

**1. Fix ReadingRace Timer Memory Leak**

In `src/screens/ReadingRace.tsx`, update the useEffect (lines 74-82):

```typescript
// BEFORE (buggy):
useEffect(() => {
  let interval: number;  // WRONG TYPE
  if (startTime && !endTime) {
    interval = setInterval(() => {
      // Force re-render to update timer
    }, 1000);
  }
  return () => clearInterval(interval);  // interval might be undefined
}, [startTime, endTime]);

// AFTER (fixed):
useEffect(() => {
  if (startTime && !endTime) {
    // Use window.setInterval for browser compatibility
    const interval = window.setInterval(() => {
      // Trigger re-render by updating a dummy state
      // (This is a hacky solution - consider using state instead)
    }, 1000);

    // Cleanup function always clears the interval
    return () => {
      window.clearInterval(interval);
    };
  }

  // Return empty cleanup if not started
  return () => {};
}, [startTime, endTime]);
```

**Better Solution - Use State for Timer:**
```typescript
// Add state for current time
const [currentTime, setCurrentTime] = useState<number>(Date.now());

// Update effect
useEffect(() => {
  if (startTime && !endTime) {
    const interval = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }
}, [startTime, endTime]);

// Update getElapsedTime to use currentTime if needed
const getElapsedTime = () => {
  if (!startTime) return 0;
  const now = endTime || currentTime;
  return Math.floor((now - startTime) / 1000);
};
```

**2. Create Error Boundary Component**

Create `src/components/ErrorBoundary.tsx`:

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-2xl w-full">
            <div className="text-center space-y-6">
              <div className="text-6xl">😕</div>
              <h1 className="text-3xl font-bold text-error">Oops! Something went wrong</h1>
              <p className="text-xl text-text-secondary">
                Don't worry, your progress is saved! Let's try to fix this.
              </p>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>

              {/* Show error details in development */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm text-text-secondary">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**3. Update main.tsx to Use Error Boundary**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
```

**4. Add Error Handling to Web Speech API**

In `src/screens/WordCatcher.tsx`, update the speech functions:

```typescript
// Update useEffect (lines 47-58)
useEffect(() => {
  if (currentWordIndex < SIGHT_WORDS.length) {
    setOptions(generateOptions(SIGHT_WORDS[currentWordIndex]));
    speakWord(SIGHT_WORDS[currentWordIndex]);
  }
}, [currentWordIndex]);

// Create helper function for speaking
const speakWord = (word: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech not available in this browser');
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    utterance.lang = 'en-US';

    // Handle speech errors
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Failed to speak word:', error);
  }
};

// Update repeatWord function (lines 85-91)
const repeatWord = () => {
  speakWord(SIGHT_WORDS[currentWordIndex]);
};

// Add cleanup on unmount
useEffect(() => {
  return () => {
    // Cancel speech when component unmounts
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };
}, []);
```

**5. Add Speech Not Available Warning**

In WordCatcher, add a warning banner if speech is unavailable:

```typescript
const [speechAvailable, setSpeechAvailable] = useState(true);

useEffect(() => {
  setSpeechAvailable('speechSynthesis' in window);
}, []);

// In JSX, add banner:
{!speechAvailable && (
  <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
    <p className="text-sm text-yellow-800">
      🔇 Text-to-speech is not available in your browser.
      You can still play, but words won't be spoken aloud.
    </p>
  </div>
)}
```

#### Testing Checklist

**Memory Leak Testing:**
- [ ] Open React DevTools Profiler
- [ ] Start Reading Race activity
- [ ] Wait for timer to run (~30 seconds)
- [ ] Click Back before finishing
- [ ] Record memory snapshot
- [ ] Repeat 10 times
- [ ] Check memory usage - should not increase significantly

**Error Boundary Testing:**
- [ ] Add temporary button that throws error: `<button onClick={() => { throw new Error('Test') }}>Break</button>`
- [ ] Click button - should show error boundary UI
- [ ] Click "Try Again" - should recover
- [ ] Remove test button after verification

**Speech API Testing:**
- [ ] Open WordCatcher with console open
- [ ] Verify no errors in console during speech
- [ ] Test "Repeat" button multiple times rapidly
- [ ] Navigate away mid-speech - should cancel cleanly
- [ ] Test in browser without speech support (if available)

**Edge Cases:**
- [ ] Open multiple tabs with app
- [ ] Close tab during activity
- [ ] Kill browser process during activity
- [ ] Reopen - should recover gracefully

#### Dependencies
- None (can be done in parallel with other tasks)

#### Definition of Done
- ✅ No memory leaks detected in profiler
- ✅ Error boundary catches and displays errors
- ✅ Web Speech API has proper error handling
- ✅ All intervals and timers properly cleaned up
- ✅ Console shows no errors during normal use
- ✅ App recovers from errors without data loss

---

### TASK 5: Begin Reading Passage Content Creation
**Priority:** 🟡 High
**Estimated Time:** 6 hours
**Assignee:** Content Creator / Developer

#### User Story
```
As a child user
I want to read different stories each time I play
So that I stay engaged and excited about reading
```

#### Current State
- Only 1 reading passage: "The Tortoise and the Hare"
- No variety after 2-3 playthroughs
- Kills replayability
- Content structure supports only single passage

#### Sprint 1 Goal
Create **5 additional reading passages** (6 total) to provide variety for Sprint 1 testing.
Full target of 10-15 passages will be completed in Sprint 2.

#### Acceptance Criteria
- [ ] 5 new reading passages created and tested
- [ ] Mix of fiction (3) and non-fiction (2)
- [ ] Age-appropriate for 8-year-olds (Grade 2-3 level)
- [ ] Each passage 150-200 words
- [ ] Each passage has 2-3 comprehension questions
- [ ] Questions test understanding, not memorization
- [ ] Content data structure supports multiple passages
- [ ] Passage selection logic implemented
- [ ] All passages reviewed for age-appropriateness

#### Technical Requirements

**1. Update Data Structure in content.ts**

Transform single passage to array:

```typescript
// BEFORE (single passage):
export const READING_PASSAGE = {
  title: "The Tortoise and the Hare",
  text: "Once upon a time...",
  wordCount: 150,
};

// AFTER (array of passages):
export interface ReadingPassage {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  category: 'fiction' | 'non-fiction';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: ComprehensionQuestion[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'tortoise-hare',
    title: "The Tortoise and the Hare",
    text: `Once upon a time...`,
    wordCount: 150,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "What did the Hare think about himself?",
        options: [
          "He was the fastest runner",
          "He was very slow",
          "He needed more practice"
        ],
        correctIndex: 0
      },
      {
        question: "Why did the Hare lose the race?",
        options: [
          "He hurt his leg",
          "He stopped to take a nap",
          "The Tortoise cheated"
        ],
        correctIndex: 1
      }
    ]
  },
  // ... more passages
];
```

**2. Create 5 New Reading Passages**

**Passage 2 - Fiction: "The Lost Puppy" (180 words)**
```
Category: Fiction
Difficulty: Medium
Theme: Kindness and helping others

Story: A young girl named Maya finds a lost puppy in the park. The puppy has
a collar but no tag. Maya decides to help find the puppy's owner...

Questions:
1. Where did Maya find the puppy?
2. What did Maya do to help the puppy?
3. How did the story make you feel?
```

**Passage 3 - Non-Fiction: "How Bees Make Honey" (165 words)**
```
Category: Non-Fiction
Difficulty: Medium
Theme: Nature and science

Story: Bees are amazing insects that make sweet honey. First, bees fly to
flowers and collect nectar. They store the nectar in a special stomach...

Questions:
1. What do bees collect from flowers?
2. Where do bees store honey?
3. Why are bees important?
```

**Passage 4 - Fiction: "The Magic Paintbrush" (175 words)**
```
Category: Fiction
Difficulty: Medium
Theme: Creativity and imagination

Story: Lin received a special paintbrush for her birthday. When she painted
with it, whatever she drew came to life! First, she painted a butterfly...

Questions:
1. What was special about Lin's paintbrush?
2. What did Lin paint first?
3. What would you paint if you had a magic paintbrush?
```

**Passage 5 - Non-Fiction: "Penguins of Antarctica" (170 words)**
```
Category: Non-Fiction
Difficulty: Medium
Theme: Animals and habitats

Story: Penguins are birds that cannot fly, but they are excellent swimmers.
They live in Antarctica, the coldest place on Earth...

Questions:
1. Can penguins fly?
2. Where do penguins live?
3. How do penguins stay warm?
```

**Passage 6 - Fiction: "The Friendship Garden" (160 words)**
```
Category: Fiction
Difficulty: Medium
Theme: Friendship and cooperation

Story: Three friends - Alex, Maya, and Tom - decided to plant a garden
together. Each person planted their favorite thing...

Questions:
1. How many friends worked on the garden?
2. What did they plant?
3. What did the friends learn?
```

**3. Update ReadingRace Component**

Add passage selection logic:

```typescript
// Add to ReadingRace.tsx

import { READING_PASSAGES } from '../data/content';
import { useState } from 'react';

export const ReadingRace: React.FC<ReadingRaceProps> = ({...}) => {
  // Select random passage or allow choosing
  const [currentPassage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * READING_PASSAGES.length);
    return READING_PASSAGES[randomIndex];
  });

  // Update all references to use currentPassage
  // Example:
  const calculatedWpm = Math.round(
    (currentPassage.wordCount / seconds) * 60
  );

  // Update question rendering:
  currentPassage.questions.map((q, idx) => (
    // ... render question
  ))
};
```

**4. Content Guidelines**

Each passage should:
- **Word Count:** 150-200 words (2-3 minute read for 8-year-olds)
- **Reading Level:** Flesch-Kincaid Grade 2-3
- **Sentence Length:** 8-12 words average
- **Vocabulary:** Common words + some new words with context clues
- **Themes:** Age-appropriate, positive, educational
- **Diversity:** Mix of characters, settings, topics
- **Formatting:** Clear paragraphs, proper punctuation

**Content Review Checklist:**
- [ ] No scary or inappropriate content
- [ ] Positive messages
- [ ] Diverse representation
- [ ] Educational value
- [ ] Engaging for kids
- [ ] Accurate information (for non-fiction)

**Question Guidelines:**
- **Types:** Who, what, where, why, how
- **Difficulty:** Answerable by reading passage
- **Mix:** 1 literal, 1 inferential, 1 opinion/connection
- **Distractors:** Plausible but clearly wrong
- **No Tricks:** Fair and clear questions

#### Testing Checklist

**Content Quality:**
- [ ] Read each passage aloud - does it sound natural?
- [ ] Check readability score (Grade 2-3 level)
- [ ] Verify word count accuracy
- [ ] Ensure questions are answerable from text

**Technical Testing:**
- [ ] All passages render correctly
- [ ] Questions display properly
- [ ] Correct answers marked correctly
- [ ] Random selection works (refresh multiple times)
- [ ] WPM calculation works for all passages

**User Testing (if possible):**
- [ ] Have 8-year-old read one passage
- [ ] Note difficulty level
- [ ] Note comprehension question accuracy
- [ ] Ask for feedback on interest level

#### Content Creation Tools

**AI Assistance:**
- Use Claude or ChatGPT to draft passages
- Prompt: "Write a 170-word story for 8-year-olds about [topic] at a Grade 2-3 reading level"
- Always review and edit AI-generated content

**Readability Checkers:**
- [Hemingway Editor](http://hemingwayapp.com/) - Target Grade 3
- [Readable.com](https://readable.com/) - Flesch-Kincaid score
- Word count: Use built-in text editor counter

**Free Story Sources (for inspiration):**
- Aesop's Fables (public domain)
- Short folk tales
- Educational websites for kids
- Science magazines for children

#### Deliverables

**Files to Update:**
1. `src/data/content.ts` - Add passage array and new passages
2. `src/screens/ReadingRace.tsx` - Update to use passage array
3. `src/types.ts` - Add ReadingPassage interface if needed

**Documentation:**
Create `CONTENT_GUIDELINES.md`:
- How to add new passages
- Content standards
- Question writing tips
- Review process

#### Dependencies
- Task 2 (Type signatures) should be done first
- Can be done in parallel with Task 3 and 4

#### Definition of Done
- ✅ 5 new passages created (6 total)
- ✅ All passages meet quality standards
- ✅ Questions written and tested
- ✅ Technical implementation complete
- ✅ ReadingRace works with new passages
- ✅ Content guidelines documented
- ✅ Passages reviewed for appropriateness

---

## Sprint 1 Schedule

### Recommended Order

**Day 1 (Monday):**
- ✅ Task 1: Install Dependencies (0.5h)
- ✅ Task 2: Fix Type Signature Bug (1h)
- 🏃 Task 3: Begin LocalStorage Implementation (3h)

**Day 2 (Tuesday):**
- 🏃 Task 3: Complete LocalStorage (3h)
- 🏃 Task 5: Start Content Creation (3h)

**Day 3 (Wednesday):**
- 🏃 Task 5: Complete Content Creation (3h)
- 🏃 Task 4: Memory Leak Fixes (3h)

**Day 4 (Thursday):**
- 🏃 Integration Testing (2h)
- 🏃 Bug Fixes from Testing (2h)
- 🏃 Documentation Updates (1h)

**Day 5 (Friday):**
- 🏃 Final QA Testing (1.5h)
- ✅ Sprint Review (1h)
- ✅ Sprint Retrospective (0.5h)

---

## Testing Strategy

### Unit Testing (Deferred to Week 4)
- LocalStorage utilities
- Passage selection logic
- Scoring calculations

### Integration Testing (Day 4)
- Complete full user flow
- Test profile persistence
- Test all passages
- Test error scenarios

### Manual Testing (Throughout Sprint)
- Test after each task completion
- Cross-browser testing
- Mobile device testing
- Accessibility spot checks

---

## Definition of Done (Sprint Level)

Sprint 1 is complete when:

- [x] All 5 tasks completed
- [x] All acceptance criteria met
- [x] TypeScript builds with zero errors
- [x] No console errors during normal use
- [x] Data persists across sessions
- [x] All existing features still work
- [x] 6 reading passages available
- [x] Code pushed to git branch
- [x] Documentation updated
- [x] Demo prepared for stakeholder
- [x] Sprint retrospective completed

---

## Risk Management

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content creation takes longer than estimated | Medium | Medium | Start early, use AI tools, accept 4-5 passages if needed |
| LocalStorage has browser compatibility issues | Low | High | Test multiple browsers, add graceful fallbacks |
| Memory leak testing takes longer | Low | Low | Use React DevTools, automate with testing library later |
| Type signature changes break existing code | Medium | Medium | Thorough testing, keep old callback signature working temporarily |

---

## Success Metrics

At the end of Sprint 1, we should achieve:

- ✅ **Build Success:** 100% TypeScript compilation success
- ✅ **Data Persistence:** 100% of users retain progress across sessions
- ✅ **Content Variety:** 6 passages available (500% increase)
- ✅ **Stability:** Zero critical bugs
- ✅ **Performance:** No memory leaks detected

---

## Sprint Retrospective Questions

To discuss at end of Sprint 1:

1. **What went well?**
   - Which tasks were easier than expected?
   - What processes worked well?

2. **What could be improved?**
   - Which tasks took longer than estimated?
   - What blockers did we encounter?

3. **Action items for Sprint 2:**
   - Process improvements
   - Technical debt to address
   - Estimation adjustments

---

## Next Sprint Preview

**Sprint 2: Content Expansion**
- Complete 10-15 total reading passages
- Expand sight words to 52 words
- Add passage selection UI
- Test with target age groups

---

*Document Version: 1.0*
*Created: 2025-11-08*
*Sprint Start: TBD*
*Sprint End: TBD*
*Sprint Duration: 1 Week*
