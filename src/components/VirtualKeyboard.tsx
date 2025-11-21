import React from 'react';
import './VirtualKeyboard.css';

interface Props {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}

const VirtualKeyboard: React.FC<Props> = ({ onNumberClick, onBackspace, onSubmit }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="virtual-keyboard">
      <div className="keyboard-grid">
        {numbers.map((num) => (
          <button
            key={num}
            className="keyboard-button"
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="keyboard-button backspace"
          onClick={onBackspace}
        >
          ← 刪除
        </button>
        <button
          className="keyboard-button submit"
          onClick={onSubmit}
        >
          ✓ 送出
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
