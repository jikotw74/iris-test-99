import { useState, useEffect, useRef, useCallback } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Game from './components/Game';
import GameOver from './components/GameOver';
import PenaltyModal from './components/PenaltyModal';
import type { Difficulty, Question } from './types';
import { MULTIPLICATION_TABLES } from './types';
import { generateQuestion, checkAnswer } from './utils';
import './App.css';

interface PenaltyState {
  question: Question;
  sequence: string[];
  input: string;
}

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [questionCountdownMs, setQuestionCountdownMs] = useState(0);
  const [selectedTables, setSelectedTables] = useState<number[]>(() => [...MULTIPLICATION_TABLES]);
  const [penaltyState, setPenaltyState] = useState<PenaltyState | null>(null);
  const [penaltyError, setPenaltyError] = useState('');
  const questionTimerRef = useRef<number | null>(null);
  const questionDeadlineRef = useRef<number | null>(null);
  const isPenaltyActive = Boolean(penaltyState);

  const handleToggleTable = (table: number) => {
    setSelectedTables((prev) => {
      if (prev.includes(table)) {
        return prev.filter((value) => value !== table);
      }
      return [...prev, table].sort((a, b) => a - b);
    });
  };

  const handleResetTables = () => {
    setSelectedTables([...MULTIPLICATION_TABLES]);
  };

  const clearQuestionTimer = useCallback(() => {
    if (questionTimerRef.current) {
      clearTimeout(questionTimerRef.current);
      questionTimerRef.current = null;
    }
  }, []);

  const resetQuestionCountdown = useCallback(() => {
    if (!difficulty) return;
    questionDeadlineRef.current = Date.now() + difficulty.questionSpeed;
    setQuestionCountdownMs(difficulty.questionSpeed);
  }, [difficulty]);

  const advanceQuestion = useCallback(function advanceQuestionImpl() {
    setCurrentQuestion(generateQuestion(selectedTables));
    setUserInput('');

    if (!difficulty || !isPlaying) {
      clearQuestionTimer();
      questionDeadlineRef.current = null;
      setQuestionCountdownMs(0);
      return;
    }

    resetQuestionCountdown();

    clearQuestionTimer();
    questionTimerRef.current = window.setTimeout(() => {
      advanceQuestionImpl();
    }, difficulty.questionSpeed);
  }, [difficulty, isPlaying, resetQuestionCountdown, clearQuestionTimer, selectedTables]);

  const startPenalty = useCallback((question: Question) => {
    const sequence = `${question.num1}${question.num2}${question.answer}`.split('');
    setPenaltyState({ question, sequence, input: '' });
    setPenaltyError('');
    setUserInput('');
    clearQuestionTimer();
    questionDeadlineRef.current = null;
    setQuestionCountdownMs(0);
  }, [clearQuestionTimer]);

  const finishPenalty = useCallback(() => {
    setPenaltyState(null);
    setPenaltyError('');
    advanceQuestion();
  }, [advanceQuestion]);

  const handlePenaltyDigit = useCallback((digit: string) => {
    if (!/^[0-9]$/.test(digit)) return;
    let shouldFinish = false;
    setPenaltyState((prev) => {
      if (!prev) return prev;
      const expected = prev.sequence[prev.input.length];
      if (digit !== expected) {
        setPenaltyError('輸入錯誤，請依順序輸入正確算式');
        return prev;
      }
      const nextInput = prev.input + digit;
      setPenaltyError('');
      if (nextInput.length === prev.sequence.length) {
        shouldFinish = true;
      }
      return { ...prev, input: nextInput };
    });
    if (shouldFinish) {
      finishPenalty();
    }
  }, [finishPenalty]);

  const handlePenaltyBackspace = useCallback(() => {
    setPenaltyState((prev) => {
      if (!prev || prev.input.length === 0) return prev;
      return { ...prev, input: prev.input.slice(0, -1) };
    });
    setPenaltyError('');
  }, []);

  useEffect(() => {
    if (!isPlaying || timeRemaining <= 0 || isPenaltyActive) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining, isPenaltyActive]);

  useEffect(() => {
    if (!isPlaying || !difficulty) {
      clearQuestionTimer();
      questionDeadlineRef.current = null;
      setQuestionCountdownMs(0);
      return;
    }

    advanceQuestion();

    return () => {
      clearQuestionTimer();
    };
  }, [isPlaying, difficulty, advanceQuestion, clearQuestionTimer]);

  useEffect(() => {
    if (!isPlaying || !difficulty || isPenaltyActive) return;

    const intervalId = window.setInterval(() => {
      if (!questionDeadlineRef.current) return;
      const remaining = Math.max(0, questionDeadlineRef.current - Date.now());
      setQuestionCountdownMs(remaining);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, difficulty, isPenaltyActive]);

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    if (selectedTables.length === 0) {
      return;
    }
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeRemaining(selectedDifficulty.timeLimit);
    setIsPlaying(true);
    setIsGameOver(false);
    setUserInput('');
    setQuestionCountdownMs(selectedDifficulty.questionSpeed);
    setPenaltyState(null);
    setPenaltyError('');
  };

  const handleSubmit = () => {
    if (!currentQuestion || !userInput || isPenaltyActive) return;

    if (checkAnswer(currentQuestion, userInput)) {
      setScore((prev) => prev + 1);
      advanceQuestion();
      return;
    }

    startPenalty(currentQuestion);
  };

  const handleRestart = () => {
    setDifficulty(null);
    setScore(0);
    setTimeRemaining(0);
    setCurrentQuestion(null);
    setIsPlaying(false);
    setIsGameOver(false);
    setUserInput('');
    setQuestionCountdownMs(0);
    questionDeadlineRef.current = null;
    clearQuestionTimer();
    setPenaltyState(null);
    setPenaltyError('');
  };

  if (isGameOver) {
    return <GameOver score={score} onRestart={handleRestart} />;
  }

  if (!isPlaying || !currentQuestion || !difficulty) {
    return (
      <DifficultySelector
        onSelectDifficulty={handleSelectDifficulty}
        selectedTables={selectedTables}
        onToggleTable={handleToggleTable}
        onResetTables={handleResetTables}
      />
    );
  }

  return (
    <>
      <Game
        question={currentQuestion}
        userInput={userInput}
        score={score}
        timeRemaining={timeRemaining}
        onInputChange={setUserInput}
        onSubmit={handleSubmit}
        questionCountdownMs={questionCountdownMs}
        questionIntervalMs={difficulty.questionSpeed}
        isPenaltyActive={isPenaltyActive}
      />
      {penaltyState && (
        <PenaltyModal
          question={penaltyState.question}
          sequence={penaltyState.sequence}
          input={penaltyState.input}
          error={penaltyError}
          onDigit={handlePenaltyDigit}
          onBackspace={handlePenaltyBackspace}
        />
      )}
    </>
  );
}

export default App;
