import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CoinDisplay } from '../components/CoinDisplay';
import { READING_PASSAGE, COMPREHENSION_QUESTIONS } from '../data/content';

interface ReadingRaceProps {
  currentCoins: number;
  onComplete: (coinsEarned: number, wpm: number, score: number) => void;
  onBack: () => void;
}

type GameState = 'reading' | 'questions' | 'results';

export const ReadingRace: React.FC<ReadingRaceProps> = ({
  currentCoins,
  onComplete,
  onBack,
}) => {
  const [gameState, setGameState] = useState<GameState>('reading');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [coinsEarned, setCoinsEarned] = useState<number>(0);

  const startReading = () => {
    setStartTime(Date.now());
  };

  const finishReading = () => {
    if (startTime) {
      const end = Date.now();
      setEndTime(end);
      const seconds = (end - startTime) / 1000;
      const calculatedWpm = Math.round((READING_PASSAGE.wordCount / seconds) * 60);
      setWpm(calculatedWpm);
      setGameState('questions');
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < COMPREHENSION_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      newAnswers.forEach((answer, idx) => {
        if (answer === COMPREHENSION_QUESTIONS[idx].correctIndex) {
          correctCount++;
        }
      });
      setScore(correctCount);

      // Calculate coins: 10 base + 5 per correct answer
      const earned = 10 + (correctCount * 5);
      setCoinsEarned(earned);
      setGameState('results');
      onComplete(earned, wpm, correctCount);
    }
  };

  const getElapsedTime = () => {
    if (!startTime) return 0;
    const now = endTime || Date.now();
    return Math.floor((now - startTime) / 1000);
  };

  useEffect(() => {
    let interval: number;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        // Force re-render to update timer
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={onBack}>
          🔙 Back
        </Button>
        <CoinDisplay coins={currentCoins} size="lg" />
      </div>

      {/* Reading State */}
      {gameState === 'reading' && (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-3xl w-full">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">📚 Reading Race</h1>
                {startTime && (
                  <div className="text-2xl font-bold text-secondary">
                    ⏱️ {getElapsedTime()}s
                  </div>
                )}
              </div>

              <div className="bg-background p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">
                  {READING_PASSAGE.title}
                </h2>
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {READING_PASSAGE.text}
                </p>
              </div>

              <div className="text-center">
                {!startTime ? (
                  <Button variant="primary" size="lg" onClick={startReading}>
                    🚀 Start Reading!
                  </Button>
                ) : (
                  <Button variant="success" size="lg" onClick={finishReading}>
                    ✅ Finished Reading
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Questions State */}
      {gameState === 'questions' && (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-2xl w-full">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Question {currentQuestion + 1} of {COMPREHENSION_QUESTIONS.length}
                </h2>
                <p className="text-xl text-textSecondary">
                  You read at {wpm} words per minute! 🎉
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-center">
                  {COMPREHENSION_QUESTIONS[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {COMPREHENSION_QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="lg"
                      className="w-full text-left"
                      onClick={() => handleAnswer(idx)}
                    >
                      {String.fromCharCode(97 + idx)}) {option}
                    </Button>
                  ))}
                </div>
              </div>
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
              <h1 className="text-5xl font-bold text-primary">Amazing!</h1>

              <div className="space-y-4">
                <p className="text-3xl font-semibold">
                  You read at <span className="text-primary">{wpm} WPM</span>!
                </p>

                <p className="text-3xl font-semibold">
                  Score: <span className="text-success">{score}/{COMPREHENSION_QUESTIONS.length}</span>{' '}
                  {'⭐'.repeat(score)}
                </p>

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
                    setGameState('reading');
                    setStartTime(null);
                    setEndTime(null);
                    setAnswers([]);
                    setCurrentQuestion(0);
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
