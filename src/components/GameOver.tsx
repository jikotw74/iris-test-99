import React, { useState, useEffect } from 'react';
import type { DifficultyName, QuestionMode } from '../types';
import { isFirebaseConfigured } from '../firebase';
import { checkIfTop10 } from '../services/leaderboardService';
import SubmitScore from './SubmitScore';
import Leaderboard from './Leaderboard';
import './GameOver.css';

interface Props {
  score: number;
  attempts: number;
  timeUsed: number;
  difficulty: DifficultyName;
  questionMode: QuestionMode;
  onRestart: () => void;
}

const GameOver: React.FC<Props> = ({
  score,
  attempts,
  timeUsed,
  difficulty,
  questionMode,
  onRestart,
}) => {
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 1000) / 10 : 0;
  const isPerfect = score === attempts && attempts > 0;

  const [showSubmit, setShowSubmit] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [checkingTop10, setCheckingTop10] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      if (!isPerfect || !isFirebaseConfigured()) {
        setCanSubmit(false);
        return;
      }

      setCheckingTop10(true);
      try {
        const isTop10 = await checkIfTop10(difficulty, questionMode, score, timeUsed);
        setCanSubmit(isTop10);
        if (isTop10) {
          setShowSubmit(true);
        }
      } catch (error) {
        console.error('檢查 TOP10 失敗:', error);
        setCanSubmit(false);
      } finally {
        setCheckingTop10(false);
      }
    };

    checkEligibility();
  }, [isPerfect, difficulty, questionMode, score, timeUsed]);

  const handleSubmitted = (name: string) => {
    setSubmittedName(name);
    setShowSubmit(false);
    setShowLeaderboard(true);
  };

  const handleSkip = () => {
    setShowSubmit(false);
  };

  const modeLabel = questionMode === 'basic' ? '基本計算' : '敘述題型';

  return (
    <>
      <div className="game-over">
        <h1>遊戲結束！</h1>

        <div className="game-info">
          <span className="info-badge">{difficulty}</span>
          <span className="info-badge">{modeLabel}</span>
        </div>

        <div className="final-score">
          <div className="score-label">最終分數</div>
          <div className="score-value">{score}</div>
        </div>

        <div className="accuracy">
          <div className="accuracy-label">正確率</div>
          <div className={`accuracy-value ${isPerfect ? 'perfect' : ''}`}>
            {accuracy.toFixed(1)}%
            {isPerfect && ' 🎉'}
          </div>
          <div className="accuracy-detail">({score} / {attempts} 題)</div>
        </div>

        <div className="time-used">
          <span className="time-label">用時：</span>
          <span className="time-value">{timeUsed} 秒</span>
        </div>

        {checkingTop10 && (
          <div className="checking-status">檢查排行榜資格中...</div>
        )}

        {isPerfect && canSubmit && !showSubmit && !submittedName && (
          <button className="submit-score-button" onClick={() => setShowSubmit(true)}>
            🏆 提交成績到排行榜
          </button>
        )}

        {submittedName && (
          <div className="submitted-message">
            ✅ 成績已提交！
          </div>
        )}

        <div className="action-buttons">
          <button className="restart-button" onClick={onRestart}>
            再玩一次
          </button>
          {isFirebaseConfigured() && (
            <button
              className="leaderboard-button"
              onClick={() => setShowLeaderboard(true)}
            >
              📊 排行榜
            </button>
          )}
        </div>
      </div>

      {showSubmit && (
        <SubmitScore
          score={score}
          timeUsed={timeUsed}
          difficulty={difficulty}
          questionMode={questionMode}
          onSubmitted={handleSubmitted}
          onSkip={handleSkip}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          initialDifficulty={difficulty}
          initialMode={questionMode}
          highlightName={submittedName || undefined}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </>
  );
};

export default GameOver;
