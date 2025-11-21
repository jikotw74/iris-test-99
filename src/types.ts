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

export const MULTIPLICATION_TABLES = [2, 3, 4, 5, 6, 7, 8, 9] as const;
export type MultiplicationTable = (typeof MULTIPLICATION_TABLES)[number];

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
  { name: '簡單', timeLimit: 120, questionSpeed: 15000 },
  { name: '普通', timeLimit: 90, questionSpeed: 10000 },
  { name: '困難', timeLimit: 60, questionSpeed: 5000 },
];
