export interface Difficulty {
  name: string;
  timeLimit: number; // seconds
  questionSpeed: number; // milliseconds per question
}

export interface Question {
  num1: number;
  num2: number;
  answer: number;
}

export interface GameState {
  difficulty: Difficulty | null;
  score: number;
  timeRemaining: number;
  currentQuestion: Question | null;
  isPlaying: boolean;
  isGameOver: boolean;
  userInput: string;
}

export const DIFFICULTIES: Difficulty[] = [
  { name: '簡單', timeLimit: 120, questionSpeed: 5000 },
  { name: '普通', timeLimit: 90, questionSpeed: 3000 },
  { name: '困難', timeLimit: 60, questionSpeed: 2000 },
];
