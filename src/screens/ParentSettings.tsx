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
