import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CoinDisplay } from '../components/CoinDisplay';
import { SIGHT_WORD_SETS, SightWordSet } from '../data/content';
import { soundManager } from '../utils/soundManager';

interface WordCatcherProps {
  currentCoins: number;
  onComplete: (coinsEarned: number, score: number, totalWords: number) => void;
  onBack: () => void;
  wordSetId?: number; // Optional word set ID (defaults to 1)
}

type GameState = 'playing' | 'feedback' | 'results';

export const WordCatcher: React.FC<WordCatcherProps> = ({
  currentCoins,
  onComplete,
  onBack,
  wordSetId = 1,
}) => {
  // Get the current word set
  const [currentWordSet] = useState<SightWordSet>(() => {
    const setId = wordSetId || 1;
    return SIGHT_WORD_SETS.find(set => set.id === setId) || SIGHT_WORD_SETS[0];
  });

  const [gameState, setGameState] = useState<GameState>('playing');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean>(false);
  const [coinsEarned, setCoinsEarned] = useState<number>(0);
  const [speechAvailable, setSpeechAvailable] = useState<boolean>(true);

  // Helper function to speak a word with error handling
  const speakWord = (word: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not available in this browser');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.lang = 'en-US';

      // Handle speech errors
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to speak word:', error);
    }
  };

  // Generate random options for current word
  const generateOptions = (correctWord: string) => {
    const wrongWords = currentWordSet.words.filter(w => w !== correctWord);
    const randomWrong: string[] = [];

    while (randomWrong.length < 2 && wrongWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * wrongWords.length);
      const word = wrongWords[randomIndex];
      if (!randomWrong.includes(word)) {
        randomWrong.push(word);
      }
      wrongWords.splice(randomIndex, 1);
    }

    const allOptions = [correctWord, ...randomWrong];
    // Shuffle options
    return allOptions.sort(() => Math.random() - 0.5);
  };

  // Check speech availability on mount and play start sound
  useEffect(() => {
    setSpeechAvailable('speechSynthesis' in window);
    soundManager.play('start');
  }, []);

  // Initialize options when component mounts or word changes
  useEffect(() => {
    if (currentWordIndex < currentWordSet.words.length) {
      setOptions(generateOptions(currentWordSet.words[currentWordIndex]));
      speakWord(currentWordSet.words[currentWordIndex]);
    }
  }, [currentWordIndex]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleAnswer = (selectedWord: string) => {
    const correct = selectedWord === currentWordSet.words[currentWordIndex];
    setLastAnswerCorrect(correct);

    // Play sound based on correctness
    soundManager.play(correct ? 'correct' : 'wrong');

    if (correct) {
      setCorrectCount(correctCount + 1);
    }

    setGameState('feedback');

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentWordIndex < currentWordSet.words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setGameState('playing');
      } else {
        // Game complete
        const finalScore = correctCount + (correct ? 1 : 0);
        const earned = finalScore * 3; // 3 coins per correct answer
        setCoinsEarned(earned);

        // Play coin sound on completion
        soundManager.play('coin');

        setGameState('results');
        onComplete(earned, finalScore, currentWordSet.words.length);
      }
    }, 1500);
  };

  const repeatWord = () => {
    speakWord(currentWordSet.words[currentWordIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={onBack}>
          🔙 Back
        </Button>
        <CoinDisplay coins={currentCoins} size="lg" />
      </div>

      {/* Playing State */}
      {gameState === 'playing' && (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-2xl w-full">
            <div className="space-y-8">
              {/* Speech Not Available Warning */}
              {!speechAvailable && (
                <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    🔇 Text-to-speech is not available in your browser.
                    You can still play, but words won't be spoken aloud.
                  </p>
                </div>
              )}

              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">🎯 Word Catcher</h1>
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-primary-light rounded-full text-sm font-medium">
                    {currentWordSet.name} - {currentWordSet.level}
                  </span>
                  <p className="text-xs text-text-secondary mt-1">
                    {currentWordSet.description}
                  </p>
                </div>
                <p className="text-2xl text-textSecondary">
                  Word {currentWordIndex + 1} of {currentWordSet.words.length}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-border rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-300"
                  style={{ width: `${((currentWordIndex + 1) / currentWordSet.words.length) * 100}%` }}
                />
              </div>

              {/* Current Word Display */}
              <div className="bg-primary text-white rounded-lg p-12 text-center">
                <p className="text-7xl font-bold mb-4">
                  {currentWordSet.words[currentWordIndex]}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={repeatWord}
                >
                  🔊 Hear Again
                </Button>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <p className="text-2xl font-semibold text-center">
                  Find the word:
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {options.map((option, idx) => (
                    <Button
                      key={idx}
                      variant="primary"
                      size="lg"
                      className="w-full text-3xl py-8"
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Feedback State */}
      {gameState === 'feedback' && (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-2xl w-full">
            <div className="text-center space-y-8">
              {lastAnswerCorrect ? (
                <>
                  <div className="text-9xl animate-bounce-small">✅</div>
                  <h2 className="text-5xl font-bold text-success">Correct!</h2>
                  <p className="text-3xl">Great job! 🎉</p>
                </>
              ) : (
                <>
                  <div className="text-9xl">❌</div>
                  <h2 className="text-5xl font-bold text-error">Try again next time!</h2>
                  <p className="text-3xl">
                    The word was: <span className="font-bold text-primary">{currentWordSet.words[currentWordIndex]}</span>
                  </p>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Results State */}
      {gameState === 'results' && (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-2xl w-full">
            <div className="text-center space-y-8">
              <div className="text-7xl animate-bounce-small">🎉</div>
              <h1 className="text-5xl font-bold text-primary">Great Job!</h1>

              <div className="space-y-4">
                <p className="text-4xl font-semibold">
                  You got <span className="text-success">{correctCount}/{currentWordSet.words.length}</span> correct!
                </p>

                <div className="text-6xl">
                  {'⭐'.repeat(Math.min(correctCount, 3))}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-bold text-secondary">
                    You earned {coinsEarned} coins!
                  </span>
                  <span className="text-4xl">🪙</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setGameState('playing');
                    setCurrentWordIndex(0);
                    setCorrectCount(0);
                  }}
                >
                  ⭐ Play Again
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={onBack}>
                  🏠 Back to Menu
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
