import React, { useEffect, useCallback } from 'react';
import type { Question } from '../types';
import VirtualKeyboard from './VirtualKeyboard';
import './Game.css';

interface Props {
  question: Question;
  userInput: string;
  score: number;
  timeRemaining: number;
  onInputChange: (input: string) => void;
  onSubmit: () => void;
}

const Game: React.FC<Props> = ({
  question,
  userInput,
  score,
  timeRemaining,
  onInputChange,
  onSubmit,
}) => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      onInputChange(userInput + e.key);
    } else if (e.key === 'Backspace') {
      onInputChange(userInput.slice(0, -1));
    } else if (e.key === 'Enter') {
      onSubmit();
    }
  }, [userInput, onInputChange, onSubmit]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleNumberClick = (num: string) => {
    onInputChange(userInput + num);
  };

  const handleBackspace = () => {
    onInputChange(userInput.slice(0, -1));
  };

  return (
    <div className="game">
      <div className="game-header">
        <div className="score">分數: {score}</div>
        <div className="timer">剩餘時間: {timeRemaining}秒</div>
      </div>
      
      <div className="question-display">
        <div className="question">
          {question.num1} × {question.num2} = ?
        </div>
        <div className="answer-input">
          {userInput || '_'}
        </div>
      </div>

      <VirtualKeyboard
        onNumberClick={handleNumberClick}
        onBackspace={handleBackspace}
        onSubmit={onSubmit}
      />

      <div className="hint">
        使用鍵盤輸入數字，按 Enter 送出答案
      </div>
    </div>
  );
};

export default Game;
