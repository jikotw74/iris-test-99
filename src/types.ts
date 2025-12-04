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

// 難度名稱類型
export type DifficultyName = '簡單' | '普通' | '困難';

// 排行榜項目
export interface LeaderboardEntry {
  id?: string;
  name: string;           // 玩家名稱 (2-20字)
  score: number;          // 答對題數
  timeUsed: number;       // 使用時間(秒)
  difficulty: DifficultyName;  // 難度
  questionMode: QuestionMode;  // 題型
  selectedTables: number[];    // 選擇的題庫 (2-9 的子集)
  timestamp: Date;        // 記錄時間
}

// 遊戲結果（用於提交排行榜）
export interface GameResult {
  score: number;
  attempts: number;
  timeUsed: number;
  difficulty: Difficulty;
  questionMode: QuestionMode;
}
