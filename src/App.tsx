import { useState, useEffect, useRef } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Game from './components/Game';
import GameOver from './components/GameOver';
import type { Difficulty, Question } from './types';
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
  const questionTimerRef = useRef<number | null>(null);

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
    if (!isPlaying || !difficulty) return;

    const nextQuestion = () => {
      setCurrentQuestion(generateQuestion());
      setUserInput('');
    };

    nextQuestion();

    questionTimerRef.current = setInterval(nextQuestion, difficulty.questionSpeed);

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
    };
  }, [isPlaying, difficulty]);

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeRemaining(selectedDifficulty.timeLimit);
    setIsPlaying(true);
    setIsGameOver(false);
    setUserInput('');
  };

  const handleSubmit = () => {
    if (!currentQuestion || !userInput) return;

    if (checkAnswer(currentQuestion, userInput)) {
      setScore((prev) => prev + 1);
    }

    setCurrentQuestion(generateQuestion());
    setUserInput('');
  };

  const handleRestart = () => {
    setDifficulty(null);
    setScore(0);
    setTimeRemaining(0);
    setCurrentQuestion(null);
    setIsPlaying(false);
    setIsGameOver(false);
    setUserInput('');
  };

  if (isGameOver) {
    return <GameOver score={score} onRestart={handleRestart} />;
  }

  if (!isPlaying || !currentQuestion || !difficulty) {
    return <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />;
  }

  return (
    <Game
      question={currentQuestion}
      userInput={userInput}
      score={score}
      timeRemaining={timeRemaining}
      onInputChange={setUserInput}
      onSubmit={handleSubmit}
    />
  );
}

export default App;
