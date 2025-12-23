import type { Question, NarrativeQuestion } from './types';
import { MULTIPLICATION_TABLES } from './types';
import { NARRATIVE_TEMPLATES, getRandomTemplate } from './narrativeProblems';

export const generateQuestion = (allowedTables: number[] = [...MULTIPLICATION_TABLES]): Question => {
  const firstNumberPool = allowedTables.length ? allowedTables : [...MULTIPLICATION_TABLES];
  const num1 = firstNumberPool[Math.floor(Math.random() * firstNumberPool.length)];
  const num2 = Math.floor(Math.random() * 8) + 2; // 2-9，排除 1
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

  // 獲取隨機模板
  const template = getRandomTemplate(categories);
  const templateType = template.type || 'standard';

  let num2: number;
  let narrative: string;

  if (templateType === 'comparison') {
    // 倍數比較題：{num1}的{larger}倍比{num1}的{smaller}倍多多少
    // num2 = larger - smaller，答案 = num1 × num2
    num2 = Math.floor(Math.random() * 8) + 2; // 差值為 2-9
    // 生成 smaller (2 到 9-num2，確保 larger <= 9)
    const maxSmaller = 9 - num2;
    const smaller = Math.floor(Math.random() * (maxSmaller - 1)) + 2; // 2 到 maxSmaller
    const larger = smaller + num2;

    narrative = template.template
      .replace(/{num1}/g, String(num1))
      .replace(/{larger}/g, String(larger))
      .replace(/{smaller}/g, String(smaller));
  } else if (templateType === 'combination') {
    // 相同數量合併題：多個相同數量合併
    // num2 由模板指定（fixedNum2），答案 = num1 × num2
    num2 = template.fixedNum2 || 2;

    narrative = template.template
      .replace(/{num1}/g, String(num1));
  } else {
    // 標準題型：num1 × num2 = answer
    num2 = Math.floor(Math.random() * 8) + 2; // 2-9，排除 1

    narrative = template.template
      .replace(/{num1}/g, String(num1))
      .replace(/{num2}/g, String(num2));
  }

  const answer = num1 * num2;

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
// 用戶依序輸入兩個乘數和答案（例如輸入 "3515" 表示 3×5=15）
export const checkNarrativeAnswer = (question: NarrativeQuestion, userAnswer: string): boolean => {
  // 需要至少 3 個字符（兩個乘數 + 至少 1 位答案）
  if (userAnswer.length < 3) return false;

  const inputNum1 = parseInt(userAnswer[0], 10);
  const inputNum2 = parseInt(userAnswer[1], 10);
  const inputAnswer = parseInt(userAnswer.slice(2), 10);

  // 檢查乘法算式正確且答案正確
  return inputNum1 * inputNum2 === question.answer && inputAnswer === question.answer;
};
