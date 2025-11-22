import React from 'react';
import './GameOver.css';

interface Props {
  score: number;
  attempts: number;
  onRestart: () => void;
}

const GameOver: React.FC<Props> = ({ score, attempts, onRestart }) => {
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 1000) / 10 : 0;

  return (
    <div className="game-over">
      <h1>遊戲結束！</h1>
      <div className="final-score">
        <div className="score-label">最終分數</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="accuracy">
        <div className="accuracy-label">正確率</div>
        <div className="accuracy-value">{accuracy.toFixed(1)}%</div>
        <div className="accuracy-detail">({score} / {attempts} 題)</div>
      </div>
      <button className="restart-button" onClick={onRestart}>
        再玩一次
      </button>
    </div>
  );
};

export default GameOver;
