import React, { useEffect } from 'react';
import type { Question } from '../types';
import './PenaltyModal.css';

interface Props {
  question: Question;
  sequence: string[];
  input: string;
  error: string;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
}

const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const PenaltyModal: React.FC<Props> = ({
  question,
  sequence,
  input,
  error,
  onDigit,
  onBackspace,
}) => {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
        onDigit(event.key);
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        onBackspace();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onDigit, onBackspace]);

  return (
    <div className="penalty-modal-overlay" role="dialog" aria-modal="true">
      <div className="penalty-modal">
        <h3>答錯囉！先跟著輸入一次正確算式</h3>
        <div className="penalty-equation">
          {question.num1} × {question.num2} = {question.answer}
        </div>
        <div className="penalty-instruction">
          依序輸入：{sequence.join(' ')}
        </div>

        <div className="penalty-boxes">
          {sequence.map((_, index) => {
            const filled = index < input.length;
            return (
              <div
                key={`penalty-box-${index}`}
                className={`penalty-box ${filled ? 'filled' : ''}`}
              >
                {filled ? input[index] : ''}
              </div>
            );
          })}
        </div>

        {error && <div className="penalty-error">{error}</div>}

        <div className="penalty-keypad">
          {keypadNumbers.map((num) => (
            <button
              key={num}
              type="button"
              className="penalty-key"
              onClick={() => onDigit(num)}
            >
              {num}
            </button>
          ))}
          <button type="button" className="penalty-key backspace" onClick={onBackspace}>
            ← 清除
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenaltyModal;
