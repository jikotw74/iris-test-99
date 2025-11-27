export interface Difficulty {
  name: string;
  timeLimit: number; // seconds
  questionSpeed: number; // milliseconds per question
}

// 題型選擇
export type QuestionMode = 'basic' | 'narrative';

export interface Question {
  num1: number;
  num2: number;
  answer: number;
}

// 敘述題型問題
export interface NarrativeQuestion extends Question {
  narrative: string; // 完整的敘述文字
  unit: string; // 答案單位
  templateId: number; // 模板 ID
}

export const MULTIPLICATION_TABLES = [2, 3, 4, 5, 6, 7, 8, 9] as const;
export type MultiplicationTable = (typeof MULTIPLICATION_TABLES)[number];

export interface GameState {
  difficulty: Difficulty | null;
  score: number;
  timeRemaining: number;
  currentQuestion: Question | NarrativeQuestion | null;
  isPlaying: boolean;
  isGameOver: boolean;
  userInput: string;
  questionMode: QuestionMode;
}

// 類型守衛：判斷是否為敘述題
export const isNarrativeQuestion = (
  question: Question | NarrativeQuestion
): question is NarrativeQuestion => {
  return 'narrative' in question;
}

export const DIFFICULTIES: Difficulty[] = [
  { name: '簡單', timeLimit: 120, questionSpeed: 15000 },
  { name: '普通', timeLimit: 90, questionSpeed: 10000 },
  { name: '困難', timeLimit: 60, questionSpeed: 5000 },
];
