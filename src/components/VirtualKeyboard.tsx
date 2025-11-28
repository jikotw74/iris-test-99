import React from 'react';
import './VirtualKeyboard.css';

interface Props {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  onMultiply?: () => void;
  showMultiply?: boolean;
  disabled?: boolean;
}

const VirtualKeyboard: React.FC<Props> = ({
  onNumberClick,
  onBackspace,
  onSubmit,
  onMultiply,
  showMultiply = false,
  disabled
}) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="virtual-keyboard">
      <div className={`keyboard-grid ${showMultiply ? 'with-multiply' : ''}`}>
        {numbers.map((num) => (
          <button
            key={num}
            className="keyboard-button"
            onClick={() => onNumberClick(num)}
            disabled={disabled}
          >
            {num}
          </button>
        ))}
        <button
          className="keyboard-button backspace action"
          onClick={onBackspace}
          disabled={disabled}
        >
          ← 刪除
        </button>
        <button
          className="keyboard-button zero"
          onClick={() => onNumberClick('0')}
          disabled={disabled}
        >
          0
        </button>
        {showMultiply ? (
          <button
            className="keyboard-button multiply action"
            onClick={onMultiply}
            disabled={disabled}
          >
            ×
          </button>
        ) : null}
        <button
          className="keyboard-button submit action"
          onClick={onSubmit}
          disabled={disabled}
        >
          ✓ 送出
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
