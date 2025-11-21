import React, { useState } from 'react';
import type { Difficulty } from '../types';
import { DIFFICULTIES } from '../types';
import './DifficultySelector.css';

interface Props {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<Props> = ({ onSelectDifficulty }) => {
  const [customTime, setCustomTime] = useState('60');
  const [customInterval, setCustomInterval] = useState('5');
  const [error, setError] = useState('');

  const handleCustomSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const totalSeconds = Number(customTime);
    const intervalSeconds = Number(customInterval);

    if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
      setError('請輸入有效的總時間 (秒)');
      return;
    }

    if (!Number.isFinite(intervalSeconds) || intervalSeconds <= 0) {
      setError('請輸入有效的換題時間 (秒)');
      return;
    }

    if (intervalSeconds > totalSeconds) {
      setError('換題時間必須小於或等於總時間');
      return;
    }

    setError('');
    onSelectDifficulty({
      name: '自訂',
      timeLimit: Math.floor(totalSeconds),
      questionSpeed: Math.floor(intervalSeconds * 1000),
    });
  };

  return (
    <div className="difficulty-selector">
      <h1>99 乘法表測驗</h1>
      <h2>選擇難度</h2>
      <div className="difficulty-buttons">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty.name}
            onClick={() => onSelectDifficulty(difficulty)}
            className="difficulty-button"
          >
            <div className="difficulty-name">{difficulty.name}</div>
            <div className="difficulty-info">
              時間: {difficulty.timeLimit} 秒<br />
              題目速度: {difficulty.questionSpeed / 1000} 秒/題
            </div>
          </button>
        ))}
      </div>

      <div className="custom-difficulty">
        <h3>或自訂挑戰</h3>
        <form onSubmit={handleCustomSubmit} className="custom-form">
          <label>
            總時間 (秒)
            <input
              type="number"
              min={5}
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              required
            />
          </label>
          <label>
            幾秒換題
            <input
              type="number"
              min={1}
              value={customInterval}
              onChange={(e) => setCustomInterval(e.target.value)}
              required
            />
          </label>
          {error && <div className="custom-error">{error}</div>}
          <button type="submit" className="custom-submit">開始挑戰</button>
        </form>
      </div>
    </div>
  );
};

export default DifficultySelector;
