import type { Question } from './types';

export const generateQuestion = (): Question => {
  const num1 = Math.floor(Math.random() * 9) + 1;
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
