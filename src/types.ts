export type ProfileId = 'daughter' | 'son';

export type UnlockableItem = 'hat' | 'glasses' | 'cape';

export interface Profile {
  id: ProfileId;
  name: string;
  age: number;
  coins: number;
  unlockedItems: UnlockableItem[];
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
