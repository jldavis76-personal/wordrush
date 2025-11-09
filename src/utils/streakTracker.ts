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
