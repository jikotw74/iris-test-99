import { useState, useEffect, useRef, useCallback } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Game from './components/Game';
import GameOver from './components/GameOver';
import PenaltyModal from './components/PenaltyModal';
import type { Difficulty, Question, NarrativeQuestion, QuestionMode } from './types';
import { MULTIPLICATION_TABLES } from './types';
import { generateQuestion, generateNarrativeQuestion, checkAnswer, checkNarrativeAnswer } from './utils';
import { isNarrativeQuestion } from './types';
import './App.css';

interface PenaltyState {
  question: Question | NarrativeQuestion;
  sequence: string[];
  input: string;
  isSequenceComplete: boolean;
}

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | NarrativeQuestion | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [questionCountdownMs, setQuestionCountdownMs] = useState(0);
  const [selectedTables, setSelectedTables] = useState<number[]>(() => [...MULTIPLICATION_TABLES]);
  const [penaltyState, setPenaltyState] = useState<PenaltyState | null>(null);
  const [penaltyError, setPenaltyError] = useState('');
  const [questionMode, setQuestionMode] = useState<QuestionMode>('basic');
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
    // 根據題型生成不同的問題
    if (questionMode === 'narrative') {
      setCurrentQuestion(generateNarrativeQuestion(selectedTables));
    } else {
      setCurrentQuestion(generateQuestion(selectedTables));
    }
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
  }, [difficulty, isPlaying, resetQuestionCountdown, clearQuestionTimer, selectedTables, questionMode]);

  const startPenalty = useCallback((question: Question | NarrativeQuestion) => {
    const sequence = `${question.num1}${question.num2}${question.answer}`.split('');
    setPenaltyState({ question, sequence, input: '', isSequenceComplete: false });
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
    setPenaltyState((prev) => {
      if (!prev || prev.isSequenceComplete) return prev;
      const expected = prev.sequence[prev.input.length];
      if (digit !== expected) {
        setPenaltyError('輸入錯誤，請依順序輸入正確算式');
        return prev;
      }
      const nextInput = prev.input + digit;
      setPenaltyError('');
      const isSequenceComplete = nextInput.length === prev.sequence.length;
      return { ...prev, input: nextInput, isSequenceComplete };
    });
  }, []);

  const handlePenaltyBackspace = useCallback(() => {
    setPenaltyState((prev) => {
      if (!prev || prev.input.length === 0) return prev;
      const nextInput = prev.input.slice(0, -1);
      return { ...prev, input: nextInput, isSequenceComplete: nextInput.length === prev.sequence.length };
    });
    setPenaltyError('');
  }, []);

  const handlePenaltySubmit = useCallback(() => {
    if (!penaltyState) return;
    if (!penaltyState.isSequenceComplete) {
      setPenaltyError('請先完成整段輸入');
      return;
    }
    finishPenalty();
  }, [finishPenalty, penaltyState]);

  useEffect(() => {
    if (!isPlaying || timeRemaining <= 0) return;

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
  }, [isPlaying, timeRemaining]);

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
    if (!isPlaying || !difficulty) return;

    const intervalId = window.setInterval(() => {
      if (!questionDeadlineRef.current) return;
      const remaining = Math.max(0, questionDeadlineRef.current - Date.now());
      setQuestionCountdownMs(remaining);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, difficulty]);

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    if (selectedTables.length === 0) {
      return;
    }
    setDifficulty(selectedDifficulty);
    setScore(0);
    setAttempts(0);
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

    setAttempts((prev) => prev + 1);

    // 敘述題使用算式驗證，基本計算題使用答案驗證
    const isCorrect = questionMode === 'narrative' && isNarrativeQuestion(currentQuestion)
      ? checkNarrativeAnswer(currentQuestion, userInput)
      : checkAnswer(currentQuestion, userInput);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      advanceQuestion();
      return;
    }

    startPenalty(currentQuestion);
  };

  const handleRestart = () => {
    setDifficulty(null);
    setScore(0);
    setAttempts(0);
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
    return <GameOver score={score} attempts={attempts} onRestart={handleRestart} />;
  }

  if (!isPlaying || !currentQuestion || !difficulty) {
    return (
      <DifficultySelector
        onSelectDifficulty={handleSelectDifficulty}
        selectedTables={selectedTables}
        onToggleTable={handleToggleTable}
        onResetTables={handleResetTables}
        questionMode={questionMode}
        onSelectMode={setQuestionMode}
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
        questionMode={questionMode}
      />
      {penaltyState && (
        <PenaltyModal
          question={penaltyState.question}
          sequence={penaltyState.sequence}
          input={penaltyState.input}
          error={penaltyError}
          canSubmit={penaltyState.isSequenceComplete}
          onDigit={handlePenaltyDigit}
          onBackspace={handlePenaltyBackspace}
          onSubmit={handlePenaltySubmit}
        />
      )}
    </>
  );
}

export default App;
