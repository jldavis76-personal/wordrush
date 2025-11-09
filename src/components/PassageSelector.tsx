import React, { useState } from 'react';
import { ReadingPassage } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface PassageSelectorProps {
  passages: ReadingPassage[];
  completedPassageIds: string[];
  onSelect: (passage: ReadingPassage) => void;
  onRandom: () => void;
  onBack: () => void;
}

export const PassageSelector: React.FC<PassageSelectorProps> = ({
  passages,
  completedPassageIds,
  onSelect,
  onRandom,
  onBack,
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Filter passages based on selections
  const filteredPassages = passages.filter(passage => {
    if (difficultyFilter && passage.difficulty !== difficultyFilter) return false;
    if (categoryFilter && passage.category !== categoryFilter) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">📚 Choose Your Story</h1>
          <p className="text-text-secondary">Pick a story to read, or let us surprise you!</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty:</label>
            <div className="flex gap-2">
              <Button
                variant={difficultyFilter === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter(null)}
              >
                All
              </Button>
              <Button
                variant={difficultyFilter === 'easy' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('easy')}
              >
                Easy
              </Button>
              <Button
                variant={difficultyFilter === 'medium' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('medium')}
              >
                Medium
              </Button>
              <Button
                variant={difficultyFilter === 'hard' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('hard')}
              >
                Hard
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Type:</label>
            <div className="flex gap-2">
              <Button
                variant={categoryFilter === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter(null)}
              >
                All
              </Button>
              <Button
                variant={categoryFilter === 'fiction' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('fiction')}
              >
                Fiction
              </Button>
              <Button
                variant={categoryFilter === 'non-fiction' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('non-fiction')}
              >
                Non-Fiction
              </Button>
            </div>
          </div>
        </div>

        {/* Random Option */}
        <div className="mb-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={onRandom}
            className="w-full"
          >
            🎲 Surprise Me! (Random Story)
          </Button>
        </div>

        {/* Passage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto mb-6">
          {filteredPassages.map(passage => {
            const isCompleted = completedPassageIds.includes(passage.id);

            return (
              <button
                key={passage.id}
                onClick={() => onSelect(passage)}
                className="text-left p-4 border-2 rounded-lg hover:border-primary hover:bg-primary-light transition-all relative"
              >
                {isCompleted && (
                  <div className="absolute top-2 right-2 text-2xl">✅</div>
                )}

                <h3 className="font-bold text-lg mb-2">{passage.title}</h3>

                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(passage.difficulty)}`}>
                    {passage.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                    {passage.category}
                  </span>
                </div>

                <p className="text-sm text-text-secondary">
                  {passage.wordCount} words • {passage.questions.length} questions
                </p>
              </button>
            );
          })}
        </div>

        {filteredPassages.length === 0 && (
          <p className="text-center text-text-secondary py-8">
            No stories match your filters. Try different options!
          </p>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <Button variant="outline" onClick={onBack} className="w-full">
            ← Back to Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};
