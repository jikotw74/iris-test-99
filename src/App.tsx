import { useState, useEffect, useRef, useCallback } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Game from './components/Game';
import GameOver from './components/GameOver';
import type { Difficulty, Question } from './types';
import { MULTIPLICATION_TABLES } from './types';
import { generateQuestion, checkAnswer } from './utils';
import './App.css';

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
  const questionTimerRef = useRef<number | null>(null);
  const questionDeadlineRef = useRef<number | null>(null);

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
    setTimeRemaining(selectedDifficulty.timeLimit);
    setIsPlaying(true);
    setIsGameOver(false);
    setUserInput('');
    setQuestionCountdownMs(selectedDifficulty.questionSpeed);
  };

  const handleSubmit = () => {
    if (!currentQuestion || !userInput) return;

    if (checkAnswer(currentQuestion, userInput)) {
      setScore((prev) => prev + 1);
    }

    advanceQuestion();
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
    <Game
      question={currentQuestion}
      userInput={userInput}
      score={score}
      timeRemaining={timeRemaining}
      onInputChange={setUserInput}
      onSubmit={handleSubmit}
      questionCountdownMs={questionCountdownMs}
      questionIntervalMs={difficulty.questionSpeed}
    />
  );
}

export default App;
