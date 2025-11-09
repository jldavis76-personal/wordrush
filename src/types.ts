export type ProfileId = 'daughter' | 'son';

export type UnlockableItem = 'hat' | 'glasses' | 'cape';

export type ActivityType = 'reading' | 'words';

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
  passageId: string; // Track which passage was completed
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
  activityHistory: ActivityResult[];
  currentWordSet: number; // Track which word set they're on (1-5)
  completedWordSets: number[]; // Track which sets they've mastered
  unlockedBadges: UnlockedBadge[];  // Achievement badges earned
  lastActivityDate?: Date;  // For streak tracking
  streakDays: number;  // Consecutive days with activity
}

export interface Profiles {
  daughter: Profile;
  son: Profile;
}

export interface ShopItem {
  id: UnlockableItem;
  name: string;
  emoji: string;
  cost: number;
}

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  category: 'fiction' | 'non-fiction';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: ComprehensionQuestion[];
}
