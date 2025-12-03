import React, { useState } from 'react';
import type { DifficultyName, QuestionMode } from '../types';
import { submitScore } from '../services/leaderboardService';
import './SubmitScore.css';

interface Props {
  score: number;
  timeUsed: number;
  difficulty: DifficultyName;
  questionMode: QuestionMode;
  onSubmitted: (name: string) => void;
  onSkip: () => void;
}

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;

const SubmitScore: React.FC<Props> = ({
  score,
  timeUsed,
  difficulty,
  questionMode,
  onSubmitted,
  onSkip,
}) => {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_NAME_LENGTH);
    setName(value);
    setError(null);
  };

  const validateName = (): boolean => {
    const trimmed = name.trim();
    if (trimmed.length < MIN_NAME_LENGTH) {
      setError(`名稱至少需要 ${MIN_NAME_LENGTH} 個字元`);
      return false;
    }
    if (trimmed.length > MAX_NAME_LENGTH) {
      setError(`名稱最多 ${MAX_NAME_LENGTH} 個字元`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateName()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitScore({
        name: name.trim(),
        score,
        timeUsed,
        difficulty,
        questionMode,
      });
      onSubmitted(name.trim());
    } catch (err) {
      setError('提交失敗，請稍後再試');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const modeLabel = questionMode === 'basic' ? '基本計算' : '敘述題型';

  return (
    <div className="submit-score-overlay">
      <div className="submit-score-modal">
        <div className="submit-score-header">
          <div className="congrats-emoji">🎉</div>
          <h2>恭喜！100% 正確率！</h2>
          <p className="submit-score-info">
            難度：{difficulty} | 題型：{modeLabel}<br />
            分數：{score} 題 | 時間：{timeUsed} 秒
          </p>
        </div>

        <form onSubmit={handleSubmit} className="submit-score-form">
          <label htmlFor="player-name">輸入你的名字上排行榜</label>
          <input
            id="player-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder={`${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} 個字元`}
            disabled={submitting}
            autoFocus
            autoComplete="off"
          />
          <div className="name-length">{name.length}/{MAX_NAME_LENGTH}</div>

          {error && <div className="submit-error">{error}</div>}

          <div className="submit-actions">
            <button
              type="button"
              className="skip-btn"
              onClick={onSkip}
              disabled={submitting}
            >
              跳過
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting || name.trim().length < MIN_NAME_LENGTH}
            >
              {submitting ? '提交中...' : '提交成績'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitScore;
