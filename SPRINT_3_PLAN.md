# Sprint 3: Progress Tracking & Motivation
**Duration:** Week 3 of v1.5 Development
**Sprint Goal:** Add visibility and motivation systems to track progress and encourage continued engagement
**Total Estimated Hours:** 19 hours

---

## Sprint Objectives

By the end of Sprint 3, WordRush will:
1. Have a comprehensive Progress Dashboard showing stats and activity history
2. Implement an achievement badges system with 8-10 badges
3. Track daily streaks to encourage consistent usage
4. Provide visual charts and graphs for parent visibility
5. Celebrate milestones to increase motivation

---

## Sprint Backlog

### TASK 1: Build Progress Dashboard Screen
**Priority:** 🔴 Critical
**Estimated Time:** 7 hours
**Assignee:** Developer

#### User Story
```
As a parent
I want to see my child's reading progress over time
So that I can track their learning and celebrate achievements
```

#### Current State
- Activity history stored in `activityHistory` array on Profile
- Data includes: timestamp, coinsEarned, activityType, wpm (reading), score, passageId
- No visualization or dashboard exists
- Parents can't see progress trends
- No way to view historical performance

#### Acceptance Criteria
- [ ] New "Progress" screen accessible from Activity Selection menu
- [ ] Shows overview statistics (total activities, total coins, best WPM)
- [ ] Displays activity history (last 10-20 activities with details)
- [ ] Simple visual charts for progress over time
- [ ] Separate stats for Reading Race and Word Catcher activities
- [ ] Shows reading speed trends (WPM over time)
- [ ] Shows accuracy trends (% correct over time)
- [ ] Mobile responsive design
- [ ] Clean, kid-friendly UI that parents can also read

#### Technical Requirements

**1. Create ProgressDashboard Component**

Create new file `src/screens/ProgressDashboard.tsx`:

```typescript
import React, { useMemo } from 'react';
import { Profile, ActivityResult, ReadingActivityResult, WordActivityResult } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { CoinDisplay } from '../components/CoinDisplay';

interface ProgressDashboardProps {
  profile: Profile;
  onBack: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  profile,
  onBack,
}) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const readingActivities = profile.activityHistory.filter(
      (a): a is ReadingActivityResult => a.activityType === 'reading'
    );
    const wordActivities = profile.activityHistory.filter(
      (a): a is WordActivityResult => a.activityType === 'words'
    );

    // Overall stats
    const totalActivities = profile.activityHistory.length;
    const totalCoins = profile.coins;

    // Reading stats
    const totalReadingActivities = readingActivities.length;
    const avgWpm = readingActivities.length > 0
      ? Math.round(
          readingActivities.reduce((sum, a) => sum + a.wpm, 0) / readingActivities.length
        )
      : 0;
    const bestWpm = readingActivities.length > 0
      ? Math.max(...readingActivities.map(a => a.wpm))
      : 0;
    const readingAccuracy = readingActivities.length > 0
      ? Math.round(
          (readingActivities.reduce((sum, a) => sum + (a.score / a.totalQuestions), 0) /
            readingActivities.length) *
            100
        )
      : 0;

    // Word stats
    const totalWordActivities = wordActivities.length;
    const wordsLearned = profile.completedWordSets?.length || 0;
    const wordAccuracy = wordActivities.length > 0
      ? Math.round(
          (wordActivities.reduce((sum, a) => sum + (a.score / a.totalWords), 0) /
            wordActivities.length) *
            100
        )
      : 0;

    // Unique passages read
    const uniquePassages = new Set(readingActivities.map(a => a.passageId)).size;

    return {
      totalActivities,
      totalCoins,
      totalReadingActivities,
      totalWordActivities,
      avgWpm,
      bestWpm,
      readingAccuracy,
      wordAccuracy,
      wordsLearned,
      uniquePassages,
    };
  }, [profile]);

  // Get recent activities (last 10)
  const recentActivities = useMemo(() => {
    return [...profile.activityHistory]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [profile.activityHistory]);

  // Format date
  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format time
  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-background">
      <div className="max-w-6xl w-full space-y-6">
        {/* Header */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar
                unlocked={profile.unlockedItems}
                size="md"
              />
              <div>
                <h1 className="text-3xl font-bold">{profile.name}'s Progress</h1>
                <p className="text-text-secondary">Age {profile.age}</p>
              </div>
            </div>
            <CoinDisplay coins={profile.coins} size="lg" />
          </div>
        </Card>

        {/* Overview Statistics */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">📊 Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary-light rounded-lg">
              <div className="text-3xl font-bold text-primary">{stats.totalActivities}</div>
              <div className="text-sm text-text-secondary mt-1">Total Activities</div>
            </div>
            <div className="text-center p-4 bg-success-light rounded-lg">
              <div className="text-3xl font-bold text-success">{stats.totalCoins}</div>
              <div className="text-sm text-text-secondary mt-1">Coins Earned</div>
            </div>
            <div className="text-center p-4 bg-secondary-light rounded-lg">
              <div className="text-3xl font-bold text-secondary">{stats.totalReadingActivities}</div>
              <div className="text-sm text-text-secondary mt-1">Stories Read</div>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{stats.totalWordActivities}</div>
              <div className="text-sm text-text-secondary mt-1">Word Games</div>
            </div>
          </div>
        </Card>

        {/* Reading Statistics */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">📖 Reading Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-primary-light rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Average Speed</div>
              <div className="text-2xl font-bold text-primary">{stats.avgWpm} WPM</div>
            </div>
            <div className="p-4 border-2 border-success-light rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Best Speed</div>
              <div className="text-2xl font-bold text-success">{stats.bestWpm} WPM</div>
            </div>
            <div className="p-4 border-2 border-secondary-light rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Comprehension</div>
              <div className="text-2xl font-bold text-secondary">{stats.readingAccuracy}%</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-text-secondary mb-2">Unique Stories Read</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all"
                  style={{ width: `${Math.min((stats.uniquePassages / 12) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium">{stats.uniquePassages}/12</span>
            </div>
          </div>
        </Card>

        {/* Word Catcher Statistics */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">🎯 Word Catcher Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-primary-light rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Word Sets Mastered</div>
              <div className="text-2xl font-bold text-primary">{stats.wordsLearned}/5</div>
            </div>
            <div className="p-4 border-2 border-success-light rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-success">{stats.wordAccuracy}%</div>
            </div>
          </div>
          {profile.currentWordSet && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Current Word Set</div>
              <div className="text-lg font-bold text-blue-600">Set {profile.currentWordSet} of 5</div>
            </div>
          )}
        </Card>

        {/* Recent Activity History */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">📜 Recent Activities</h2>
          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              <p className="text-lg">No activities yet!</p>
              <p className="text-sm mt-2">Start playing to see your progress here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {activity.activityType === 'reading' ? '📖' : '🎯'}
                    </div>
                    <div>
                      <div className="font-medium">
                        {activity.activityType === 'reading' ? 'Reading Race' : 'Word Catcher'}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {activity.activityType === 'reading' && (
                      <div className="text-right">
                        <div className="text-sm text-text-secondary">Speed</div>
                        <div className="font-bold text-primary">
                          {(activity as ReadingActivityResult).wpm} WPM
                        </div>
                      </div>
                    )}
                    <div className="text-right">
                      <div className="text-sm text-text-secondary">Score</div>
                      <div className="font-bold text-success">
                        {activity.activityType === 'reading'
                          ? `${(activity as ReadingActivityResult).score}/${(activity as ReadingActivityResult).totalQuestions}`
                          : `${(activity as WordActivityResult).score}/${(activity as WordActivityResult).totalWords}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-text-secondary">Earned</div>
                      <div className="font-bold text-secondary">{activity.coinsEarned} 🪙</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg" onClick={onBack}>
            ← Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};
```

**2. Update App.tsx to Include Progress Screen**

Add to screen types:
```typescript
type Screen =
  | 'profile-selection'
  | 'activity-selection'
  | 'passage-selection'
  | 'reading-race'
  | 'word-catcher'
  | 'avatar-shop'
  | 'progress-dashboard'; // NEW
```

Add navigation handler:
```typescript
const handleShowProgress = () => {
  setCurrentScreen('progress-dashboard');
};
```

Add to render section:
```typescript
{currentScreen === 'progress-dashboard' && currentProfile && (
  <ProgressDashboard
    profile={currentProfile}
    onBack={handleBackToMenu}
  />
)}
```

**3. Update ActivitySelection to Add Progress Button**

In `src/screens/ActivitySelection.tsx`, add a new button:

```typescript
<Button
  variant="secondary"
  size="lg"
  onClick={onShowProgress}
  className="w-full"
>
  📊 View Progress
</Button>
```

Update interface:
```typescript
interface ActivitySelectionProps {
  profile: Profile;
  onSelectActivity: (activity: 'reading-race' | 'word-catcher' | 'avatar-shop') => void;
  onShowProgress: () => void; // NEW
  onBack: () => void;
}
```

**4. Add Progress Chart Component (Optional Enhancement)**

For visual progress over time, create `src/components/ProgressChart.tsx`:

```typescript
import React from 'react';
import { ActivityResult, ReadingActivityResult } from '../types';

interface ProgressChartProps {
  activities: ActivityResult[];
  type: 'wpm' | 'accuracy';
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ activities, type }) => {
  const readingActivities = activities.filter(
    (a): a is ReadingActivityResult => a.activityType === 'reading'
  );

  if (readingActivities.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No reading data yet
      </div>
    );
  }

  // Get last 10 activities
  const recentActivities = readingActivities.slice(-10);

  // Calculate values based on type
  const values = recentActivities.map(a =>
    type === 'wpm' ? a.wpm : (a.score / a.totalQuestions) * 100
  );

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 h-48">
        {values.map((value, index) => {
          const percentage = ((value - minValue) / (maxValue - minValue || 1)) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-medium text-text-secondary">
                {Math.round(value)}
              </div>
              <div
                className="w-full bg-primary rounded-t transition-all hover:bg-primary-dark"
                style={{ height: `${Math.max(percentage, 5)}%` }}
                title={`${Math.round(value)} ${type === 'wpm' ? 'WPM' : '%'}`}
              />
              <div className="text-xs text-text-secondary">
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-text-secondary">
        Last {values.length} reading activities
      </div>
    </div>
  );
};
```

#### Testing Checklist

**Data Display:**
- [ ] All statistics calculate correctly
- [ ] Empty state shows when no activities
- [ ] Recent activities sorted by date (newest first)
- [ ] Activity history shows correct details
- [ ] WPM calculations accurate
- [ ] Accuracy percentages correct
- [ ] Unique passages count accurate

**UI/UX:**
- [ ] Dashboard is visually appealing
- [ ] Mobile responsive (works on tablets)
- [ ] Back button works
- [ ] Stats cards are readable
- [ ] Activity list is scrollable if long
- [ ] No layout shifts or overflow

**Integration:**
- [ ] Progress button accessible from Activity Selection
- [ ] Navigation works correctly
- [ ] Profile data displayed correctly
- [ ] Updates reflect after completing activities

**Edge Cases:**
- [ ] Handles zero activities gracefully
- [ ] Handles very large numbers (>999 coins)
- [ ] Handles decimal WPM values
- [ ] Handles activities with 0 score

#### Dependencies
- Requires Profile.activityHistory to be populated (Sprint 1/2 complete)

#### Definition of Done
- ✅ ProgressDashboard component created and styled
- ✅ Statistics calculated accurately
- ✅ Recent activity history displayed
- ✅ Visual charts/graphs implemented
- ✅ Mobile responsive
- ✅ Accessible from Activity Selection
- ✅ All testing checklist items pass
- ✅ Code committed to branch

---

### TASK 2: Implement Achievement Badges System
**Priority:** 🔴 Critical
**Estimated Time:** 7 hours
**Assignee:** Developer

#### User Story
```
As a child user
I want to earn badges for my achievements
So that I feel proud and motivated to keep learning
```

#### Current State
- Only coins as rewards
- No milestone celebrations
- No achievement tracking
- No visual representation of accomplishments
- Missing gamification elements

#### Acceptance Criteria
- [ ] Badge system data structure defined
- [ ] 8-10 achievement badges created
- [ ] Badge unlock logic implemented
- [ ] Badges persist in profile data
- [ ] Badge unlock animations/notifications
- [ ] Badges displayed on dashboard
- [ ] Mix of easy, medium, and hard badges to unlock
- [ ] Badges track reading, words, coins, and streaks

#### Technical Requirements

**1. Define Badge Types and Data Structure**

Update `src/types.ts`:

```typescript
export type BadgeId =
  | 'first-steps'        // Complete first activity
  | 'coin-collector'     // Earn 50 coins
  | 'coin-master'        // Earn 200 coins
  | 'speed-reader'       // Achieve 100+ WPM
  | 'bookworm'           // Read 5 different passages
  | 'library-master'     // Read all 12 passages
  | 'word-wizard'        // Complete Word Set 1
  | 'vocabulary-master'  // Complete all 5 word sets
  | 'perfect-score'      // Get 100% on any activity
  | 'dedicated-learner'  // Complete 3-day streak
  | 'fashion-icon'       // Unlock all avatar items
  | 'super-star';        // Earn all other badges

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UnlockedBadge {
  badgeId: BadgeId;
  unlockedAt: Date;
}

// Update Profile interface
export interface Profile {
  id: ProfileId;
  name: string;
  age: number;
  coins: number;
  unlockedItems: UnlockableItem[];
  activityHistory: ActivityResult[];
  currentWordSet?: number;
  completedWordSets?: number[];
  unlockedBadges: UnlockedBadge[];  // NEW
  lastActivityDate?: Date;  // NEW - for streak tracking
  streakDays: number;  // NEW - consecutive days
}
```

**2. Create Badge Definitions**

Create new file `src/data/badges.ts`:

```typescript
import { Badge, BadgeId } from '../types';

export const BADGES: Record<BadgeId, Badge> = {
  'first-steps': {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first activity!',
    icon: '👣',
    requirement: 'Complete 1 activity',
    rarity: 'common',
  },
  'coin-collector': {
    id: 'coin-collector',
    name: 'Coin Collector',
    description: 'Earn your first 50 coins',
    icon: '🪙',
    requirement: 'Earn 50 coins',
    rarity: 'common',
  },
  'coin-master': {
    id: 'coin-master',
    name: 'Coin Master',
    description: 'Become rich with 200 coins!',
    icon: '💰',
    requirement: 'Earn 200 coins',
    rarity: 'rare',
  },
  'speed-reader': {
    id: 'speed-reader',
    name: 'Speed Reader',
    description: 'Read at 100 words per minute!',
    icon: '⚡',
    requirement: 'Achieve 100+ WPM',
    rarity: 'rare',
  },
  'bookworm': {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Read 5 different stories',
    icon: '🐛',
    requirement: 'Read 5 unique passages',
    rarity: 'common',
  },
  'library-master': {
    id: 'library-master',
    name: 'Library Master',
    description: 'Read every story in the library!',
    icon: '📚',
    requirement: 'Read all 12 passages',
    rarity: 'epic',
  },
  'word-wizard': {
    id: 'word-wizard',
    name: 'Word Wizard',
    description: 'Master your first word set',
    icon: '🧙',
    requirement: 'Complete Word Set 1',
    rarity: 'common',
  },
  'vocabulary-master': {
    id: 'vocabulary-master',
    name: 'Vocabulary Master',
    description: 'Master all 5 word sets!',
    icon: '📖',
    requirement: 'Complete all word sets',
    rarity: 'epic',
  },
  'perfect-score': {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on any activity',
    icon: '⭐',
    requirement: 'Score 100% correct',
    rarity: 'rare',
  },
  'dedicated-learner': {
    id: 'dedicated-learner',
    name: 'Dedicated Learner',
    description: 'Practice 3 days in a row',
    icon: '🔥',
    requirement: '3-day streak',
    rarity: 'rare',
  },
  'fashion-icon': {
    id: 'fashion-icon',
    name: 'Fashion Icon',
    description: 'Collect all avatar items',
    icon: '👔',
    requirement: 'Unlock all items',
    rarity: 'epic',
  },
  'super-star': {
    id: 'super-star',
    name: 'Super Star',
    description: 'Earn every other badge!',
    icon: '🌟',
    requirement: 'Unlock all badges',
    rarity: 'legendary',
  },
};

export const getBadgesByRarity = (rarity: Badge['rarity']): Badge[] => {
  return Object.values(BADGES).filter(badge => badge.rarity === rarity);
};

export const getAllBadges = (): Badge[] => {
  return Object.values(BADGES);
};
```

**3. Create Badge Checking Utility**

Create `src/utils/badgeChecker.ts`:

```typescript
import { Profile, BadgeId, UnlockedBadge, ReadingActivityResult } from '../types';
import { BADGES } from '../data/badges';

/**
 * Check which new badges should be unlocked based on current profile state
 * Returns array of newly unlocked badge IDs
 */
export const checkForNewBadges = (profile: Profile): BadgeId[] => {
  const newBadges: BadgeId[] = [];
  const unlockedIds = new Set(profile.unlockedBadges.map(b => b.badgeId));

  // Helper to check if badge is already unlocked
  const isUnlocked = (badgeId: BadgeId) => unlockedIds.has(badgeId);

  // First Steps - Complete first activity
  if (!isUnlocked('first-steps') && profile.activityHistory.length >= 1) {
    newBadges.push('first-steps');
  }

  // Coin Collector - Earn 50 coins
  if (!isUnlocked('coin-collector') && profile.coins >= 50) {
    newBadges.push('coin-collector');
  }

  // Coin Master - Earn 200 coins
  if (!isUnlocked('coin-master') && profile.coins >= 200) {
    newBadges.push('coin-master');
  }

  // Speed Reader - Achieve 100+ WPM
  const readingActivities = profile.activityHistory.filter(
    (a): a is ReadingActivityResult => a.activityType === 'reading'
  );
  const hasHighWpm = readingActivities.some(a => a.wpm >= 100);
  if (!isUnlocked('speed-reader') && hasHighWpm) {
    newBadges.push('speed-reader');
  }

  // Bookworm - Read 5 unique passages
  const uniquePassages = new Set(readingActivities.map(a => a.passageId));
  if (!isUnlocked('bookworm') && uniquePassages.size >= 5) {
    newBadges.push('bookworm');
  }

  // Library Master - Read all 12 passages
  if (!isUnlocked('library-master') && uniquePassages.size >= 12) {
    newBadges.push('library-master');
  }

  // Word Wizard - Complete Word Set 1
  if (!isUnlocked('word-wizard') && profile.completedWordSets?.includes(1)) {
    newBadges.push('word-wizard');
  }

  // Vocabulary Master - Complete all 5 word sets
  if (!isUnlocked('vocabulary-master') && profile.completedWordSets?.length === 5) {
    newBadges.push('vocabulary-master');
  }

  // Perfect Score - Get 100% on any activity
  const hasPerfectScore = profile.activityHistory.some(a => {
    if (a.activityType === 'reading') {
      const ra = a as ReadingActivityResult;
      return ra.score === ra.totalQuestions;
    } else {
      return a.score === a.totalWords;
    }
  });
  if (!isUnlocked('perfect-score') && hasPerfectScore) {
    newBadges.push('perfect-score');
  }

  // Dedicated Learner - 3 day streak
  if (!isUnlocked('dedicated-learner') && profile.streakDays >= 3) {
    newBadges.push('dedicated-learner');
  }

  // Fashion Icon - Unlock all avatar items
  if (!isUnlocked('fashion-icon') && profile.unlockedItems.length === 3) {
    newBadges.push('fashion-icon');
  }

  // Super Star - Earn all other badges
  const allOtherBadges = Object.keys(BADGES).filter(id => id !== 'super-star') as BadgeId[];
  const hasAllOtherBadges = allOtherBadges.every(id =>
    unlockedIds.has(id) || newBadges.includes(id)
  );
  if (!isUnlocked('super-star') && hasAllOtherBadges) {
    newBadges.push('super-star');
  }

  return newBadges;
};

/**
 * Get badge progress for a specific badge
 * Returns current/required values for progress tracking
 */
export const getBadgeProgress = (profile: Profile, badgeId: BadgeId): { current: number; required: number; percentage: number } => {
  const readingActivities = profile.activityHistory.filter(
    (a): a is ReadingActivityResult => a.activityType === 'reading'
  );

  switch (badgeId) {
    case 'first-steps':
      return { current: Math.min(profile.activityHistory.length, 1), required: 1, percentage: profile.activityHistory.length >= 1 ? 100 : 0 };

    case 'coin-collector':
      return { current: profile.coins, required: 50, percentage: Math.min((profile.coins / 50) * 100, 100) };

    case 'coin-master':
      return { current: profile.coins, required: 200, percentage: Math.min((profile.coins / 200) * 100, 100) };

    case 'speed-reader': {
      const bestWpm = readingActivities.length > 0 ? Math.max(...readingActivities.map(a => a.wpm)) : 0;
      return { current: bestWpm, required: 100, percentage: Math.min((bestWpm / 100) * 100, 100) };
    }

    case 'bookworm': {
      const uniquePassages = new Set(readingActivities.map(a => a.passageId)).size;
      return { current: uniquePassages, required: 5, percentage: Math.min((uniquePassages / 5) * 100, 100) };
    }

    case 'library-master': {
      const uniquePassages = new Set(readingActivities.map(a => a.passageId)).size;
      return { current: uniquePassages, required: 12, percentage: Math.min((uniquePassages / 12) * 100, 100) };
    }

    case 'word-wizard': {
      const hasSet1 = profile.completedWordSets?.includes(1) ? 1 : 0;
      return { current: hasSet1, required: 1, percentage: hasSet1 * 100 };
    }

    case 'vocabulary-master': {
      const completedSets = profile.completedWordSets?.length || 0;
      return { current: completedSets, required: 5, percentage: Math.min((completedSets / 5) * 100, 100) };
    }

    case 'perfect-score': {
      const hasPerfect = profile.activityHistory.some(a => {
        if (a.activityType === 'reading') {
          return (a as ReadingActivityResult).score === (a as ReadingActivityResult).totalQuestions;
        } else {
          return a.score === a.totalWords;
        }
      });
      return { current: hasPerfect ? 1 : 0, required: 1, percentage: hasPerfect ? 100 : 0 };
    }

    case 'dedicated-learner':
      return { current: profile.streakDays, required: 3, percentage: Math.min((profile.streakDays / 3) * 100, 100) };

    case 'fashion-icon':
      return { current: profile.unlockedItems.length, required: 3, percentage: Math.min((profile.unlockedItems.length / 3) * 100, 100) };

    case 'super-star': {
      const allOtherBadges = Object.keys(BADGES).filter(id => id !== 'super-star');
      const unlockedCount = allOtherBadges.filter(id =>
        profile.unlockedBadges.some(b => b.badgeId === id)
      ).length;
      return { current: unlockedCount, required: allOtherBadges.length, percentage: Math.min((unlockedCount / allOtherBadges.length) * 100, 100) };
    }

    default:
      return { current: 0, required: 1, percentage: 0 };
  }
};
```

**4. Update App.tsx to Check for Badges**

Add badge checking after activity completion:

```typescript
import { checkForNewBadges } from './utils/badgeChecker';
import { BADGES } from './data/badges';

// Add state for badge notifications
const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<BadgeId[]>([]);

// Update activity completion handlers to check for badges
const handleReadingComplete = (
  coinsEarned: number,
  wpm: number,
  score: number,
  totalQuestions: number,
  passageId: string
) => {
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

  setProfiles((prev) => {
    const updatedProfile = {
      ...prev[currentProfileId],
      coins: prev[currentProfileId].coins + coinsEarned,
      activityHistory: [...prev[currentProfileId].activityHistory, result],
    };

    // Check for new badges
    const newBadges = checkForNewBadges(updatedProfile);

    if (newBadges.length > 0) {
      // Add newly unlocked badges
      updatedProfile.unlockedBadges = [
        ...updatedProfile.unlockedBadges,
        ...newBadges.map(badgeId => ({
          badgeId,
          unlockedAt: new Date(),
        })),
      ];

      // Show notification
      setNewlyUnlockedBadges(newBadges);
    }

    return {
      ...prev,
      [currentProfileId]: updatedProfile,
    };
  });
};

// Similar update for handleWordComplete
```

**5. Initialize Badge Fields in Default Profiles**

Update default profile initialization:

```typescript
const getInitialProfiles = (): Profiles => {
  if (isStorageAvailable()) {
    const loaded = loadProfiles();
    if (loaded) {
      return loaded;
    }
  }

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
      unlockedBadges: [],  // NEW
      streakDays: 0,  // NEW
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
      unlockedBadges: [],  // NEW
      streakDays: 0,  // NEW
    },
  };
};
```

**6. Update Storage Utility for Backwards Compatibility**

Update `src/utils/storage.ts` to handle missing fields:

```typescript
export const loadProfiles = (): Profiles | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      console.log('[Storage] No saved data found');
      return null;
    }

    const data: StorageData = JSON.parse(stored);

    // Ensure backward compatibility - add missing fields
    Object.keys(data.profiles).forEach(profileId => {
      const profile = data.profiles[profileId as ProfileId];

      // Add new fields if missing
      if (!profile.unlockedBadges) {
        profile.unlockedBadges = [];
      }
      if (profile.streakDays === undefined) {
        profile.streakDays = 0;
      }
      if (!profile.completedWordSets) {
        profile.completedWordSets = [];
      }
      if (!profile.currentWordSet) {
        profile.currentWordSet = 1;
      }
    });

    console.log('[Storage] Profiles loaded successfully');
    return data.profiles;
  } catch (error) {
    console.error('[Storage] Failed to load profiles:', error);

    const shouldClear = window.confirm(
      'Failed to load saved data. It may be corrupted. Clear and start fresh?'
    );

    if (shouldClear) {
      clearStorage();
    }

    return null;
  }
};
```

#### Testing Checklist

**Badge Logic:**
- [ ] Each badge unlocks correctly when requirements met
- [ ] Badges don't unlock twice
- [ ] Badge progress calculates correctly
- [ ] Badge checking doesn't impact performance
- [ ] All 12 badges have valid definitions

**Data Persistence:**
- [ ] Unlocked badges save to localStorage
- [ ] Unlocked badges load on app restart
- [ ] Backward compatibility works (old profiles load)

**Edge Cases:**
- [ ] Handles zero activities
- [ ] Handles multiple badges unlocking at once
- [ ] Super Star badge only unlocks after all others
- [ ] Badge timestamps are accurate

#### Dependencies
- Task 1 (Progress Dashboard) should be started first
- Requires Profile.activityHistory to be populated

#### Definition of Done
- ✅ Badge type definitions complete
- ✅ All 12 badges defined with icons and descriptions
- ✅ Badge checking logic implemented
- ✅ Badges unlock correctly
- ✅ Badges persist in localStorage
- ✅ Backward compatibility maintained
- ✅ All testing checklist items pass
- ✅ Code committed to branch

---

### TASK 3: Add Badge Display UI
**Priority:** 🔴 Critical
**Estimated Time:** 2 hours
**Assignee:** Developer

#### User Story
```
As a child user
I want to see my badges displayed beautifully
So that I can show off my achievements and feel proud
```

#### Current State
- Badges exist in data but no UI to display them
- No visual representation of achievements
- No badge collection view
- No badge unlock notifications

#### Acceptance Criteria
- [ ] Badge collection screen showing all badges
- [ ] Locked vs unlocked state clearly visible
- [ ] Badge rarity indicated with colors/styling
- [ ] Progress bars for in-progress badges
- [ ] Badge unlock notification/celebration
- [ ] Badges accessible from Progress Dashboard
- [ ] Responsive design for mobile

#### Technical Requirements

**1. Create BadgeCollection Component**

Create `src/components/BadgeCollection.tsx`:

```typescript
import React from 'react';
import { Profile, BadgeId } from '../types';
import { BADGES, getAllBadges } from '../data/badges';
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
```

**2. Create Badge Unlock Notification Component**

Create `src/components/BadgeUnlockNotification.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
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
```

**3. Add Badge Display to Progress Dashboard**

Update `src/screens/ProgressDashboard.tsx`:

```typescript
import { BadgeCollection } from '../components/BadgeCollection';

// Add inside the dashboard, after Recent Activities:
<Card>
  <BadgeCollection profile={profile} />
</Card>
```

**4. Add Badge Notifications to App.tsx**

```typescript
import { BadgeUnlockNotification } from './components/BadgeUnlockNotification';

// In the render section, add before closing div:
{newlyUnlockedBadges.length > 0 && (
  <BadgeUnlockNotification
    badgeIds={newlyUnlockedBadges}
    onClose={() => setNewlyUnlockedBadges([])}
  />
)}
```

**5. Add Badge Summary to Activity Selection**

Update `src/screens/ActivitySelection.tsx`:

```typescript
// Add badge count display
<div className="flex items-center justify-center gap-2 mb-4">
  <span className="text-2xl">🏆</span>
  <span className="text-lg font-medium">
    {profile.unlockedBadges.length} badges earned
  </span>
</div>
```

#### Testing Checklist

**Badge Display:**
- [ ] All badges render in collection
- [ ] Locked badges show lock icon
- [ ] Unlocked badges show correct icon
- [ ] Rarity colors display correctly
- [ ] Progress bars show for locked badges
- [ ] Unlock dates show for unlocked badges

**Badge Notifications:**
- [ ] Notification appears after unlocking
- [ ] Multiple badges show in sequence
- [ ] Animation is smooth and celebratory
- [ ] Close button works
- [ ] Notification doesn't block gameplay

**UI/UX:**
- [ ] Badge collection is responsive
- [ ] Badges are clickable/hoverable
- [ ] Layout doesn't break with 0 or 12 badges
- [ ] Colors are kid-friendly
- [ ] Text is readable

#### Dependencies
- Task 2 (Badge System) must be complete

#### Definition of Done
- ✅ BadgeCollection component created
- ✅ Badge unlock notifications implemented
- ✅ Badges display on Progress Dashboard
- ✅ Locked/unlocked states clearly visible
- ✅ Progress indicators working
- ✅ Mobile responsive
- ✅ All testing checklist items pass
- ✅ Code committed to branch

---

### TASK 4: Create Streak Tracking Logic
**Priority:** 🟡 High
**Estimated Time:** 3 hours
**Assignee:** Developer

#### User Story
```
As a parent
I want to see if my child is practicing consistently
So that I can encourage daily reading habits
```

#### Current State
- No tracking of consecutive days
- No reminder to practice daily
- No streak-based rewards
- `lastActivityDate` and `streakDays` fields added to Profile but no logic

#### Acceptance Criteria
- [ ] Streak increments when activity completed on consecutive days
- [ ] Streak resets if a day is skipped
- [ ] Streak persists across sessions
- [ ] Streak displayed on dashboard
- [ ] Streak badge unlocks at 3 days
- [ ] Visual indicator of current streak
- [ ] Encouragement messages for streaks

#### Technical Requirements

**1. Create Streak Tracking Utility**

Create `src/utils/streakTracker.ts`:

```typescript
import { Profile } from '../types';

/**
 * Check if two dates are on the same day
 */
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Check if two dates are consecutive days
 */
const isConsecutiveDay = (date1: Date, date2: Date): boolean => {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  return diffDays === 1;
};

/**
 * Update streak based on activity completion
 * Returns updated profile with new streak data
 */
export const updateStreak = (profile: Profile): Profile => {
  const now = new Date();
  const lastActivity = profile.lastActivityDate ? new Date(profile.lastActivityDate) : null;

  // First activity ever
  if (!lastActivity) {
    return {
      ...profile,
      lastActivityDate: now,
      streakDays: 1,
    };
  }

  // Activity on the same day - no change to streak
  if (isSameDay(now, lastActivity)) {
    return {
      ...profile,
      lastActivityDate: now,
    };
  }

  // Activity on consecutive day - increment streak
  if (isConsecutiveDay(now, lastActivity)) {
    return {
      ...profile,
      lastActivityDate: now,
      streakDays: profile.streakDays + 1,
    };
  }

  // Streak broken - reset to 1
  return {
    ...profile,
    lastActivityDate: now,
    streakDays: 1,
  };
};

/**
 * Get streak status message
 */
export const getStreakMessage = (streakDays: number): string => {
  if (streakDays === 0) {
    return 'Start your streak today!';
  }
  if (streakDays === 1) {
    return 'Great start! Come back tomorrow!';
  }
  if (streakDays === 2) {
    return 'Two days in a row! Keep it up!';
  }
  if (streakDays === 3) {
    return '🔥 3-day streak! You\'re on fire!';
  }
  if (streakDays >= 7) {
    return `🌟 Amazing! ${streakDays}-day streak!`;
  }
  return `🔥 ${streakDays}-day streak! Keep going!`;
};

/**
 * Check if streak is at risk (last activity was yesterday or earlier)
 */
export const isStreakAtRisk = (profile: Profile): boolean => {
  if (!profile.lastActivityDate) return false;

  const now = new Date();
  const lastActivity = new Date(profile.lastActivityDate);

  // If same day, streak is safe
  if (isSameDay(now, lastActivity)) {
    return false;
  }

  // If yesterday, streak is at risk
  return isConsecutiveDay(now, lastActivity);
};
```

**2. Update Activity Completion Handlers**

Update `src/App.tsx` to call streak tracker:

```typescript
import { updateStreak } from './utils/streakTracker';

const handleReadingComplete = (
  coinsEarned: number,
  wpm: number,
  score: number,
  totalQuestions: number,
  passageId: string
) => {
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

  setProfiles((prev) => {
    let updatedProfile = {
      ...prev[currentProfileId],
      coins: prev[currentProfileId].coins + coinsEarned,
      activityHistory: [...prev[currentProfileId].activityHistory, result],
    };

    // Update streak
    updatedProfile = updateStreak(updatedProfile);

    // Check for new badges (including streak badges)
    const newBadges = checkForNewBadges(updatedProfile);

    if (newBadges.length > 0) {
      updatedProfile.unlockedBadges = [
        ...updatedProfile.unlockedBadges,
        ...newBadges.map(badgeId => ({
          badgeId,
          unlockedAt: new Date(),
        })),
      ];

      setNewlyUnlockedBadges(newBadges);
    }

    return {
      ...prev,
      [currentProfileId]: updatedProfile,
    };
  });
};

// Similar update for handleWordComplete
```

**3. Add Streak Display to Progress Dashboard**

Update `src/screens/ProgressDashboard.tsx`:

```typescript
import { getStreakMessage, isStreakAtRisk } from '../utils/streakTracker';

// Add streak card in the render:
<Card>
  <h2 className="text-2xl font-bold mb-4">🔥 Daily Streak</h2>
  <div className="text-center space-y-4">
    <div className="text-6xl font-bold text-primary">
      {profile.streakDays}
    </div>
    <div className="text-xl font-medium">
      {profile.streakDays === 1 ? 'Day' : 'Days'}
    </div>
    <p className="text-lg text-text-secondary">
      {getStreakMessage(profile.streakDays)}
    </p>

    {isStreakAtRisk(profile) && (
      <div className="p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-sm text-yellow-800">
          ⚠️ Practice today to keep your streak alive!
        </p>
      </div>
    )}
  </div>
</Card>
```

**4. Add Streak Indicator to Activity Selection**

Update `src/screens/ActivitySelection.tsx`:

```typescript
// Add streak display near the top
{profile.streakDays > 0 && (
  <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-primary-light rounded-lg">
    <span className="text-2xl">🔥</span>
    <span className="font-bold text-lg">
      {profile.streakDays} Day Streak!
    </span>
  </div>
)}
```

**5. Initialize Streak Fields**

Ensure default profiles have streak fields:

```typescript
// In getInitialProfiles():
daughter: {
  // ... other fields
  streakDays: 0,
  lastActivityDate: undefined,
},
```

#### Testing Checklist

**Streak Logic:**
- [ ] Streak increments on consecutive days
- [ ] Streak stays same on multiple activities same day
- [ ] Streak resets when day is skipped
- [ ] Streak persists across sessions
- [ ] First activity sets streak to 1

**UI Display:**
- [ ] Streak shows on dashboard
- [ ] Streak shows on activity selection
- [ ] Streak messages are encouraging
- [ ] At-risk warning shows correctly

**Edge Cases:**
- [ ] Handles timezone changes gracefully
- [ ] Handles clock changes (daylight savings)
- [ ] Works across midnight boundary
- [ ] Handles very long streaks (100+ days)

**Integration:**
- [ ] Streak badge unlocks at 3 days
- [ ] Badge checking includes streak
- [ ] Data saves to localStorage

#### Dependencies
- Task 2 (Badge System) should be in progress
- Requires Profile fields from Task 2

#### Definition of Done
- ✅ Streak tracking utility created
- ✅ Streak updates on activity completion
- ✅ Streak displays on dashboard
- ✅ Streak displays on activity selection
- ✅ Encouraging messages implemented
- ✅ At-risk warnings working
- ✅ All testing checklist items pass
- ✅ Code committed to branch

---

## Sprint 3 Schedule

### Recommended Order

**Day 1 (Monday):**
- 🏃 Task 1: Build Progress Dashboard (4h)
- 🏃 Task 2: Start Badge System - types & definitions (3h)

**Day 2 (Tuesday):**
- 🏃 Task 2: Complete Badge System - logic & checking (4h)
- 🏃 Task 4: Implement Streak Tracking (3h)

**Day 3 (Wednesday):**
- 🏃 Task 1: Complete Progress Dashboard (3h)
- 🏃 Task 3: Badge Display UI (2h)
- 🏃 Integration Testing (2h)

**Day 4 (Thursday):**
- 🏃 Bug Fixes from Testing (2h)
- 🏃 Polish and refinements (2h)
- 🏃 Documentation updates (1h)

**Day 5 (Friday):**
- 🏃 Final QA Testing (1.5h)
- ✅ Sprint Review (1h)
- ✅ Sprint Retrospective (0.5h)

---

## Testing Strategy

### Unit Testing (Optional - defer to Sprint 4 if needed)
- Badge checking logic
- Streak calculation logic
- Statistics calculations

### Integration Testing (Day 3)
- Complete activity → check badges unlock
- Complete activity → verify streak updates
- View progress dashboard → all stats accurate
- Badge collection displays correctly
- Data persists across sessions

### User Acceptance Testing (Day 4)
- Complete activities and verify progress tracking
- Earn badges and verify notifications
- Build streak over multiple days
- Review dashboard with parent perspective

---

## Definition of Done (Sprint Level)

Sprint 3 is complete when:

- [x] Progress Dashboard implemented with all statistics
- [x] 12 achievement badges defined and unlockable
- [x] Badge display UI implemented with collection view
- [x] Streak tracking working correctly
- [x] Badge unlock notifications appear
- [x] All data persists in localStorage
- [x] TypeScript builds with zero errors
- [x] No console errors during normal use
- [x] Mobile responsive design verified
- [x] Code pushed to git branch
- [x] Documentation updated
- [x] Ready for Sprint 4 (Polish & Testing)

---

## Risk Management

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Badge logic becomes complex and time-consuming | Medium | Medium | Start with simple badge checks, can enhance logic in Sprint 4 |
| Streak tracking has timezone edge cases | Low | Medium | Use simple date comparison, test across days |
| Dashboard charts take longer than expected | Low | Low | Use simple CSS progress bars initially, defer fancy charts to v1.6 |
| Badge notification UX needs iteration | Medium | Low | Start with simple modal, can enhance animations later |

---

## Success Metrics

At the end of Sprint 3, we should achieve:

- **Visibility:** Parents can see detailed progress and statistics
- **Motivation:** 12 badges available to unlock
- **Engagement:** Streak tracking encourages daily practice
- **Polish:** Professional-looking dashboard and badge displays
- **Data Quality:** All activity data tracked and visualized

---

## Sprint Retrospective Questions

To discuss at end of Sprint 3:

1. **What went well?**
   - Was badge system implementation smooth?
   - Did dashboard design meet expectations?
   - Were time estimates accurate?

2. **What could be improved?**
   - Any badge logic that was too complex?
   - Dashboard stats that were confusing?
   - Performance issues with large datasets?

3. **Action items for Sprint 4:**
   - UI/UX improvements from testing
   - Additional badges to add?
   - Dashboard enhancements needed?

---

## Next Sprint Preview

**Sprint 4: Polish & Production Readiness**
- Parent Settings screen with controls
- Sound effects and audio feedback
- Basic test coverage (Vitest)
- QA testing with children
- Bug fixes and refinements
- Production deployment preparation

---

## Appendix: Badge Design Guidelines

### Badge Rarity Distribution
- **Common (5 badges):** Easy to unlock, encourage early engagement
- **Rare (4 badges):** Medium difficulty, reward consistent effort
- **Epic (2 badges):** Challenging, celebrate major milestones
- **Legendary (1 badge):** Ultimate achievement, unlock all others

### Badge Icon Guidelines
- Use emoji for consistency across platforms
- Choose recognizable, kid-friendly icons
- Avoid scary or confusing imagery
- Test visibility on different screen sizes

### Badge Naming Conventions
- Short, memorable names (2-3 words)
- Positive, encouraging tone
- Avoid educational jargon
- Appeal to both kids and parents

---

*Document Version: 1.0*
*Created: 2025-11-09*
*Sprint Start: TBD*
*Sprint End: TBD*
*Sprint Duration: 1 Week*
