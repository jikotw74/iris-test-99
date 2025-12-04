import React, { useState, useEffect, useCallback } from 'react';
import type { LeaderboardEntry, DifficultyName, QuestionMode } from '../types';
import { getLeaderboard } from '../services/leaderboardService';
import { isFirebaseConfigured } from '../firebase';
import './Leaderboard.css';

interface Props {
  initialDifficulty?: DifficultyName;
  initialMode?: QuestionMode;
  highlightName?: string;
  onClose: () => void;
}

const DIFFICULTIES: DifficultyName[] = ['簡單', '普通', '困難'];
const MODES: { value: QuestionMode; label: string }[] = [
  { value: 'basic', label: '基本計算' },
  { value: 'narrative', label: '敘述題型' },
];

const Leaderboard: React.FC<Props> = ({
  initialDifficulty = '簡單',
  initialMode = 'basic',
  highlightName,
  onClose,
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyName>(initialDifficulty);
  const [questionMode, setQuestionMode] = useState<QuestionMode>(initialMode);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入排行榜
  const fetchLeaderboard = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      setError('排行榜功能尚未啟用');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getLeaderboard(difficulty, questionMode);
      setEntries(data);
    } catch (err) {
      setError('載入排行榜失敗，請稍後再試');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [difficulty, questionMode]);

  useEffect(() => {
    fetchLeaderboard();
  }, [difficulty, questionMode, fetchLeaderboard]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}秒`;
  };

  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const getRankEmoji = (rank: number): string => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  const formatTables = (tables: number[]): string => {
    if (!tables || tables.length === 0) return '-';
    if (tables.length === 8) return '全部';
    return tables.join(', ');
  };

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-modal">
        <button className="leaderboard-close" onClick={onClose}>✕</button>

        <h2 className="leaderboard-title">排行榜</h2>

        <div className="leaderboard-filters">
          <div className="filter-group">
            <label>難度</label>
            <div className="filter-buttons">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  className={`filter-btn ${difficulty === d ? 'active' : ''}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>題型</label>
            <div className="filter-buttons">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  className={`filter-btn ${questionMode === m.value ? 'active' : ''}`}
                  onClick={() => setQuestionMode(m.value)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="leaderboard-content">
          {loading && (
            <div className="leaderboard-loading">載入中...</div>
          )}

          {error && (
            <div className="leaderboard-error">{error}</div>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="leaderboard-empty">
              目前還沒有記錄<br />成為第一個上榜的玩家吧！
            </div>
          )}

          {!loading && !error && entries.length > 0 && (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="col-rank">名次</th>
                  <th className="col-name">玩家</th>
                  <th className="col-score">分數</th>
                  <th className="col-tables">題庫</th>
                  <th className="col-time">用時</th>
                  <th className="col-date">日期</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={highlightName && entry.name === highlightName ? 'highlight' : ''}
                  >
                    <td className="col-rank">{getRankEmoji(index + 1)}</td>
                    <td className="col-name">{entry.name}</td>
                    <td className="col-score">{entry.score}</td>
                    <td className="col-tables">{formatTables(entry.selectedTables)}</td>
                    <td className="col-time">{formatTime(entry.timeUsed)}</td>
                    <td className="col-date">{formatDate(entry.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
