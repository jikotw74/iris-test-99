import React, { useEffect, useState } from 'react';
import type { Difficulty } from '../types';
import { DIFFICULTIES, MULTIPLICATION_TABLES } from '../types';
import './DifficultySelector.css';

const TABLE_ERROR_MESSAGE = '請先選擇題庫 (至少一個乘法表)';

interface Props {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  selectedTables: number[];
  onToggleTable: (table: number) => void;
  onResetTables: () => void;
}

const DifficultySelector: React.FC<Props> = ({
  onSelectDifficulty,
  selectedTables,
  onToggleTable,
  onResetTables,
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
      <h2>選擇難度</h2>

      <div className="table-selector">
        <h3>題庫選擇</h3>
        <p>預設全選，可取消還沒學會的乘法，例如 6 或 8。</p>
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
