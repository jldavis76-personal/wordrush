import React, { useMemo } from 'react';
import { Profile, ReadingActivityResult, WordActivityResult } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { CoinDisplay } from '../components/CoinDisplay';
import { BadgeCollection } from '../components/BadgeCollection';

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
                unlockedItems={profile.unlockedItems}
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
        {profile.id === 'daughter' && (
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
        )}

        {/* Word Catcher Statistics */}
        {profile.id === 'son' && (
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
        )}

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

        {/* Badge Collection */}
        <Card>
          <BadgeCollection profile={profile} />
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
