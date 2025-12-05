import React, { useEffect, useState } from 'react';
import type { Difficulty, QuestionMode } from '../types';
import { DIFFICULTIES, MULTIPLICATION_TABLES } from '../types';
import './DifficultySelector.css';

const TABLE_ERROR_MESSAGE = '請先選擇題庫 (至少一個乘法表)';

export type FontSize = 'normal' | 'large' | 'extra-large';

interface Props {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  selectedTables: number[];
  onToggleTable: (table: number) => void;
  onResetTables: () => void;
  questionMode: QuestionMode;
  onSelectMode: (mode: QuestionMode) => void;
  onShowLeaderboard?: () => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
}

const DifficultySelector: React.FC<Props> = ({
  onSelectDifficulty,
  selectedTables,
  onToggleTable,
  onResetTables,
  questionMode,
  onSelectMode,
  onShowLeaderboard,
  fontSize,
  onFontSizeChange,
}) => {
  const [customTime, setCustomTime] = useState('60');
  const [customInterval, setCustomInterval] = useState('5');
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const getDifficultyColor = (name: string) => {
    switch (name) {
      case '簡單': return 'easy';
      case '普通': return 'normal';
      case '困難': return 'hard';
      default: return '';
    }
  };

  return (
    <div className="difficulty-selector">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">
          <span className="hero-icon">✕</span>
          99 乘法表
        </h1>
        <p className="hero-subtitle">挑戰你的數學能力，成為乘法大師！</p>
        {onShowLeaderboard && (
          <button
            type="button"
            className="hero-leaderboard-btn"
            onClick={onShowLeaderboard}
          >
            🏆 排行榜
          </button>
        )}
      </header>

      {/* Step 1: 題型選擇 */}
      <section className="step-section">
        <div className="step-header">
          <span className="step-number">1</span>
          <h2 className="step-title">選擇題型</h2>
        </div>
        <div className="mode-buttons">
          <button
            type="button"
            className={`mode-card ${questionMode === 'basic' ? 'active' : ''}`}
            onClick={() => onSelectMode('basic')}
          >
            <div className="mode-icon">🔢</div>
            <div className="mode-content">
              <span className="mode-name">基本計算</span>
              <span className="mode-desc">直接顯示乘法算式</span>
            </div>
          </button>
          <button
            type="button"
            className={`mode-card ${questionMode === 'narrative' ? 'active' : ''}`}
            onClick={() => onSelectMode('narrative')}
          >
            <div className="mode-icon">📖</div>
            <div className="mode-content">
              <span className="mode-name">敘述題型</span>
              <span className="mode-desc">生活情境應用題</span>
            </div>
          </button>
        </div>
      </section>

      {/* Step 2: 題庫選擇 */}
      <section className="step-section">
        <div className="step-header">
          <span className="step-number">2</span>
          <h2 className="step-title">選擇題庫</h2>
          <span className="step-hint">
            已選 {selectedTables.length}/{MULTIPLICATION_TABLES.length} 個
          </span>
        </div>
        <div className="table-grid">
          {MULTIPLICATION_TABLES.map((table) => {
            const checked = selectedTables.includes(table);
            return (
              <button
                key={table}
                type="button"
                className={`table-chip ${checked ? 'checked' : ''}`}
                onClick={() => onToggleTable(table)}
              >
                {table} 的乘法
              </button>
            );
          })}
        </div>
        <div className="table-actions">
          {!hasTableSelection && (
            <div className="table-error">請至少選擇一個乘法題庫</div>
          )}
          {hasTableSelection && selectedTables.length !== MULTIPLICATION_TABLES.length && (
            <button type="button" className="table-reset" onClick={onResetTables}>
              全部勾選
            </button>
          )}
        </div>
      </section>

      {/* Step 3: 難度選擇 */}
      <section className="step-section">
        <div className="step-header">
          <span className="step-number">3</span>
          <h2 className="step-title">選擇難度並開始</h2>
        </div>
        <div className="difficulty-grid">
          {DIFFICULTIES.map((difficulty) => (
            <button
              key={difficulty.name}
              onClick={() => handleDifficultyClick(difficulty)}
              className={`difficulty-card ${getDifficultyColor(difficulty.name)}`}
              disabled={!hasTableSelection}
            >
              <div className="difficulty-name">{difficulty.name}</div>
              <div className="difficulty-stats">
                <div className="stat">
                  <span className="stat-icon">⏱️</span>
                  <span>{difficulty.timeLimit} 秒</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">⚡</span>
                  <span>{difficulty.questionSpeed / 1000} 秒/題</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 進階選項 - 可折疊 */}
      <section className="advanced-section">
        <button
          type="button"
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>進階設定</span>
          <span className={`toggle-arrow ${showAdvanced ? 'open' : ''}`}>▼</span>
        </button>

        {showAdvanced && (
          <div className="advanced-content">
            <form onSubmit={handleCustomSubmit} className="custom-form">
              <div className="form-row">
                <label className="form-field">
                  <span className="field-label">總時間</span>
                  <div className="input-group">
                    <input
                      type="number"
                      min={5}
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      required
                    />
                    <span className="input-suffix">秒</span>
                  </div>
                </label>
                <label className="form-field">
                  <span className="field-label">換題時間</span>
                  <div className="input-group">
                    <input
                      type="number"
                      min={1}
                      value={customInterval}
                      onChange={(e) => setCustomInterval(e.target.value)}
                      required
                    />
                    <span className="input-suffix">秒</span>
                  </div>
                </label>
              </div>
              {error && <div className="custom-error">{error}</div>}
              <button type="submit" className="custom-submit" disabled={!hasTableSelection}>
                自訂挑戰
              </button>
            </form>
          </div>
        )}
      </section>

      {/* 字體大小設定 */}
      <section className="font-size-section">
        <div className="font-size-label">字體大小</div>
        <div className="font-size-controls">
          <button
            type="button"
            className={`font-size-btn ${fontSize === 'normal' ? 'active' : ''}`}
            onClick={() => onFontSizeChange('normal')}
          >
            標準
          </button>
          <button
            type="button"
            className={`font-size-btn ${fontSize === 'large' ? 'active' : ''}`}
            onClick={() => onFontSizeChange('large')}
          >
            大字
          </button>
          <button
            type="button"
            className={`font-size-btn ${fontSize === 'extra-large' ? 'active' : ''}`}
            onClick={() => onFontSizeChange('extra-large')}
          >
            特大
          </button>
        </div>
      </section>
    </div>
  );
};

export default DifficultySelector;
