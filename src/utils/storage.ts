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
