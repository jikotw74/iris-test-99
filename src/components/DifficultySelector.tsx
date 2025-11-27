import React, { useEffect, useState } from 'react';
import type { Difficulty, QuestionMode } from '../types';
import { DIFFICULTIES, MULTIPLICATION_TABLES } from '../types';
import './DifficultySelector.css';

const TABLE_ERROR_MESSAGE = '請先選擇題庫 (至少一個乘法表)';

interface Props {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  selectedTables: number[];
  onToggleTable: (table: number) => void;
  onResetTables: () => void;
  questionMode: QuestionMode;
  onSelectMode: (mode: QuestionMode) => void;
}

const DifficultySelector: React.FC<Props> = ({
  onSelectDifficulty,
  selectedTables,
  onToggleTable,
  onResetTables,
  questionMode,
  onSelectMode,
}) => {
  const [customTime, setCustomTime] = useState('60');
  const [customInterval, setCustomInterval] = useState('5');
  const [error, setError] = useState('');

  const hasTableSelection = selectedTables.length > 0;

  useEffect(() => {
    if (hasTableSelection && error === TABLE_ERROR_MESSAGE) {
      setError('');
    }
  }, [hasTableSelection, error]);

  const handleDifficultyClick = (difficulty: Difficulty) => {
    if (!hasTableSelection) {
      return;
    }
    onSelectDifficulty(difficulty);
  };

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

    if (!hasTableSelection) {
      setError(TABLE_ERROR_MESSAGE);
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

      <div className="mode-selector">
        <h3>題型選擇</h3>
        <div className="mode-buttons">
          <button
            type="button"
            className={`mode-button ${questionMode === 'basic' ? 'active' : ''}`}
            onClick={() => onSelectMode('basic')}
          >
            <span className="mode-label">A</span>
            <span className="mode-name">基本計算</span>
            <span className="mode-desc">直接顯示乘法算式</span>
          </button>
          <button
            type="button"
            className={`mode-button ${questionMode === 'narrative' ? 'active' : ''}`}
            onClick={() => onSelectMode('narrative')}
          >
            <span className="mode-label">B</span>
            <span className="mode-name">敘述題型</span>
            <span className="mode-desc">生活情境應用題</span>
          </button>
        </div>
      </div>

      <h2>選擇難度</h2>

      <div className="table-selector">
        <h3>題庫選擇</h3>
        <p>
          此處僅限制第一個數字 (第幾的乘法)，預設 2～9 全選；例如取消 3 就不會出現 3×5。
          1 的乘法不在題庫列表。
        </p>
        <div className="table-grid">
          {MULTIPLICATION_TABLES.map((table) => {
            const checked = selectedTables.includes(table);
            return (
              <label key={table} className={`table-option ${checked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleTable(table)}
                />
                <span>{table} 的乘法</span>
              </label>
            );
          })}
        </div>
        {!hasTableSelection && (
          <div className="table-error">請至少選擇一個乘法題庫</div>
        )}
        {hasTableSelection && selectedTables.length !== MULTIPLICATION_TABLES.length && (
          <button type="button" className="table-reset" onClick={onResetTables}>
            全部勾選
          </button>
        )}
      </div>

      <div className="difficulty-buttons">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty.name}
            onClick={() => handleDifficultyClick(difficulty)}
            className="difficulty-button"
            disabled={!hasTableSelection}
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
          <button type="submit" className="custom-submit" disabled={!hasTableSelection}>
            開始挑戰
          </button>
        </form>
      </div>
    </div>
  );
};

export default DifficultySelector;
