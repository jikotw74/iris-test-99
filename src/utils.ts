import type { Question } from './types';
import { MULTIPLICATION_TABLES } from './types';

export const generateQuestion = (allowedTables: number[] = [...MULTIPLICATION_TABLES]): Question => {
  const pool = allowedTables.length ? allowedTables : [...MULTIPLICATION_TABLES];
  const num1 = pool[Math.floor(Math.random() * pool.length)];
  const num2 = pool[Math.floor(Math.random() * pool.length)];
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
