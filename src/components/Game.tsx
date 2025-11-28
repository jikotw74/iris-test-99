import React, { useEffect, useCallback } from 'react';
import type { Question, NarrativeQuestion, QuestionMode } from '../types';
import { isNarrativeQuestion } from '../types';
import VirtualKeyboard from './VirtualKeyboard';
import './Game.css';

interface Props {
  question: Question | NarrativeQuestion;
  userInput: string;
  score: number;
  timeRemaining: number;
  onInputChange: (input: string) => void;
  onSubmit: () => void;
  questionCountdownMs: number;
  questionIntervalMs: number;
  isPenaltyActive: boolean;
  questionMode: QuestionMode;
}

const Game: React.FC<Props> = ({
  question,
  userInput,
  score,
  timeRemaining,
  onInputChange,
  onSubmit,
  questionCountdownMs,
  questionIntervalMs,
  isPenaltyActive,
  questionMode,
}) => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (isPenaltyActive) return;
    if (e.key >= '0' && e.key <= '9') {
      onInputChange(userInput + e.key);
    } else if (e.key === 'Backspace') {
      onInputChange(userInput.slice(0, -1));
    } else if (e.key === 'Enter') {
      onSubmit();
    }
  }, [userInput, onInputChange, onSubmit, isPenaltyActive]);

  useEffect(() => {
    if (isPenaltyActive) return;
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, isPenaltyActive]);

  const handleNumberClick = (num: string) => {
    onInputChange(userInput + num);
  };

  const handleBackspace = () => {
    onInputChange(userInput.slice(0, -1));
  };

  const countdownSeconds = Math.max(0, Math.ceil(questionCountdownMs / 1000));
  const progressPercent = questionIntervalMs
    ? Math.min(100, Math.max(0, (questionCountdownMs / questionIntervalMs) * 100))
    : 0;

  return (
    <div className="game">
      <div className="game-header">
        <div className="score">分數: {score}</div>
        <div className="timer">剩餘時間: {timeRemaining}秒</div>
      </div>

      <div className="question-display">
        {questionMode === 'narrative' && isNarrativeQuestion(question) ? (
          <>
            <div className="narrative-question">
              {question.narrative}
            </div>
            <div className="narrative-hint">
              請依序輸入乘法算式和答案
            </div>
            <div className="narrative-formula-boxes">
              <div className={`formula-box ${userInput.length >= 1 ? 'filled' : ''}`}>
                {userInput[0] || ''}
              </div>
              <span className="formula-operator">×</span>
              <div className={`formula-box ${userInput.length >= 2 ? 'filled' : ''}`}>
                {userInput[1] || ''}
              </div>
              <span className="formula-operator">=</span>
              <div className={`formula-box answer-box ${userInput.length >= 3 ? 'filled' : ''}`}>
                {userInput.slice(2) || ''}
              </div>
              <span className="answer-unit">{question.unit}</span>
            </div>
          </>
        ) : (
          <>
            <div className="question">
              {question.num1} × {question.num2} = ?
            </div>
            <div className="answer-input">
              {userInput || '_'}
            </div>
          </>
        )}
        <div className="question-progress">
          <div className="progress-label">下題倒數 {countdownSeconds} 秒</div>
          <div className="progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <VirtualKeyboard
        onNumberClick={handleNumberClick}
        onBackspace={handleBackspace}
        onSubmit={onSubmit}
        disabled={isPenaltyActive}
      />

      <div className="hint">
        使用鍵盤輸入數字，按 Enter 送出答案
      </div>
    </div>
  );
};

export default Game;
