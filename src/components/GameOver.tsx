import React from 'react';
import './GameOver.css';

interface Props {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<Props> = ({ score, onRestart }) => {
  return (
    <div className="game-over">
      <h1>遊戲結束！</h1>
      <div className="final-score">
        <div className="score-label">最終分數</div>
        <div className="score-value">{score}</div>
      </div>
      <button className="restart-button" onClick={onRestart}>
        再玩一次
      </button>
    </div>
  );
};

export default GameOver;
