export type ProfileId = 'daughter' | 'son';

export type UnlockableItem = 'hat' | 'glasses' | 'cape';

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
  activityHistory: ActivityResult[];
  currentWordSet?: number; // Track which word set they're on (1-5)
  completedWordSets?: number[]; // Track which sets they've mastered
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
