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
