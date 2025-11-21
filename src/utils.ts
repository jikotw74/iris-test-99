import type { Question } from './types';
import { MULTIPLICATION_TABLES } from './types';

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

export const checkAnswer = (question: Question, userAnswer: string): boolean => {
  const answer = parseInt(userAnswer, 10);
  return !isNaN(answer) && answer === question.answer;
};
