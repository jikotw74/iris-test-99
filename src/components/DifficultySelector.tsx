import React from 'react';
import type { Difficulty } from '../types';
import { DIFFICULTIES } from '../types';
import './DifficultySelector.css';

interface Props {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<Props> = ({ onSelectDifficulty }) => {
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
    </div>
  );
};

export default DifficultySelector;
