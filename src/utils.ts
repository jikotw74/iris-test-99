import type { Question, NarrativeQuestion } from './types';
import { MULTIPLICATION_TABLES } from './types';
import { NARRATIVE_TEMPLATES, getRandomTemplate } from './narrativeProblems';

export const generateQuestion = (allowedTables: number[] = [...MULTIPLICATION_TABLES]): Question => {
  const firstNumberPool = allowedTables.length ? allowedTables : [...MULTIPLICATION_TABLES];
  const num1 = firstNumberPool[Math.floor(Math.random() * firstNumberPool.length)];
  const num2 = Math.floor(Math.random() * 9) + 1;
  return {
    num1,
    num2,
    answer: num1 * num2,
  };
};

// 生成敘述題
export const generateNarrativeQuestion = (
  allowedTables: number[] = [...MULTIPLICATION_TABLES],
  categories?: string[]
): NarrativeQuestion => {
  const firstNumberPool = allowedTables.length ? allowedTables : [...MULTIPLICATION_TABLES];
  const num1 = firstNumberPool[Math.floor(Math.random() * firstNumberPool.length)];
  const num2 = Math.floor(Math.random() * 9) + 1;
  const answer = num1 * num2;

  // 獲取隨機模板
  const template = getRandomTemplate(categories);

  // 填充模板
  const narrative = template.template
    .replace(/{num1}/g, String(num1))
    .replace(/{num2}/g, String(num2));

  return {
    num1,
    num2,
    answer,
    narrative,
    unit: template.unit,
    templateId: template.id,
  };
};

// 獲取所有敘述題分類
export const getNarrativeCategories = (): string[] => {
  return [...new Set(NARRATIVE_TEMPLATES.map((t) => t.category))];
};

export const checkAnswer = (question: Question | NarrativeQuestion, userAnswer: string): boolean => {
  const answer = parseInt(userAnswer, 10);
  return !isNaN(answer) && answer === question.answer;
};

// 驗證敘述題的乘法算式答案
// 用戶依序輸入兩個數字（例如輸入 "35" 表示 3×5）
export const checkNarrativeAnswer = (question: NarrativeQuestion, userAnswer: string): boolean => {
  // 需要剛好兩個數字
  if (userAnswer.length !== 2) return false;

  const inputNum1 = parseInt(userAnswer[0], 10);
  const inputNum2 = parseInt(userAnswer[1], 10);

  // 檢查兩個數字相乘是否等於正確答案
  return inputNum1 * inputNum2 === question.answer;
};
