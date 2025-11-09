import { Profile, BadgeId, ReadingActivityResult } from '../types';
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
  if (!isUnlocked('word-wizard') && profile.completedWordSets.includes(1)) {
    newBadges.push('word-wizard');
  }

  // Vocabulary Master - Complete all 5 word sets
  if (!isUnlocked('vocabulary-master') && profile.completedWordSets.length === 5) {
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
      const hasSet1 = profile.completedWordSets.includes(1) ? 1 : 0;
      return { current: hasSet1, required: 1, percentage: hasSet1 * 100 };
    }

    case 'vocabulary-master': {
      const completedSets = profile.completedWordSets.length;
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
