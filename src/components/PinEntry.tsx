import React, { useState } from 'react';
import { Card } from './ui/Card';

interface PinEntryProps {
  onCorrectPin: () => void;
  onCancel: () => void;
}

const PARENT_PIN = '1234'; // Default PIN - could be configurable in future

export const PinEntry: React.FC<PinEntryProps> = ({ onCorrectPin, onCancel }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleNumberClick = (num: number) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      // Auto-check when 4 digits entered
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === PARENT_PIN) {
            onCorrectPin();
          } else {
            setError(true);
            setPin('');
          }
        }, 200);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">🔒 Parent Settings</h2>
            <p className="text-text-secondary">Enter PIN to continue</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl font-bold ${
                  error
                    ? 'border-error bg-error-light'
                    : pin.length > index
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {pin.length > index && '•'}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-error font-medium">❌ Incorrect PIN. Try again.</p>
          )}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="h-16 text-2xl font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="h-16 text-lg font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => handleNumberClick(0)}
              className="h-16 text-2xl font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
            >
              0
            </button>
            <button
              onClick={onCancel}
              className="h-16 text-lg font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-text-secondary">
            Default PIN: 1234 (Can be changed in v1.6)
          </p>
        </div>
      </Card>
    </div>
  );
};
