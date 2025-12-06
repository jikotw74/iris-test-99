import React, { useCallback } from 'react';
import './VirtualKeyboard.css';

interface Props {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const VirtualKeyboard: React.FC<Props> = ({ onNumberClick, onBackspace, onSubmit, disabled }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // 使用 onPointerDown 替代 onClick，減少手機觸控延遲
  const handlePointerDown = useCallback((e: React.PointerEvent, callback: () => void) => {
    e.preventDefault(); // 防止觸發後續的 click 事件和觸控延遲
    if (!disabled) {
      callback();
    }
  }, [disabled]);

  return (
    <div className="virtual-keyboard">
      <div className="keyboard-layout">
        {/* 左側數字區 */}
        <div className="keyboard-numpad">
          <div className="numpad-grid">
            {numbers.map((num) => (
              <button
                key={num}
                className="keyboard-button"
                onPointerDown={(e) => handlePointerDown(e, () => onNumberClick(num))}
                disabled={disabled}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="numpad-bottom">
            <button
              className="keyboard-button backspace action"
              onPointerDown={(e) => handlePointerDown(e, onBackspace)}
              disabled={disabled}
            >
              ← 刪除
            </button>
            <button
              className="keyboard-button zero"
              onPointerDown={(e) => handlePointerDown(e, () => onNumberClick('0'))}
              disabled={disabled}
            >
              0
            </button>
          </div>
        </div>
        {/* 右側送出按鈕 */}
        <button
          className="keyboard-button submit-large"
          onPointerDown={(e) => handlePointerDown(e, onSubmit)}
          disabled={disabled}
        >
          <span className="submit-icon">✓</span>
          <span className="submit-text">送出</span>
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
