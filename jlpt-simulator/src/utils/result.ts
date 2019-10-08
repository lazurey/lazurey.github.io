import { QUESTION_TYPE } from '../constants/exam-config';
import { IUserAnswer } from '../modules/test-generator/interfaces';

export const getTotalStore = (answers: IUserAnswer[]) => {
  const correct = answers.filter((answer: IUserAnswer) => answer.correctAnswer === answer.userAnswer);
  const totalScore = correct.length * 100 / answers.length;
  return {
    correct: correct.length,
    total: answers.length,
    score: totalScore.toFixed(2),
  };
};

interface IReport {
  overall: {
    correct: number;
    total: number;
    score: string;
  };
  [QUESTION_TYPE.Word]: {
    correct: number;
    total: number;
  };
  [QUESTION_TYPE.Volcabulary]: {
    correct: number;
    total: number;
  };
  [QUESTION_TYPE.Grammar]: {
    correct: number;
    total: number;
  };
}

const getSectionScore = (type: QUESTION_TYPE, answers: IUserAnswer[]) => {
  const sectionAnswers = answers.filter((answer: IUserAnswer) => answer.type === type);
  const correctAnswers = sectionAnswers.filter((a: IUserAnswer) => a.userAnswer === a.correctAnswer);
  return {
    correct: correctAnswers.length,
    total: sectionAnswers.length,
  };
};

export const generateReport = (answers: IUserAnswer[]): IReport => {
  const overall = getTotalStore(answers);
  const wordScore = getSectionScore(QUESTION_TYPE.Word, answers);
  const volcabularyScore = getSectionScore(QUESTION_TYPE.Volcabulary, answers);
  const grammarScore = getSectionScore(QUESTION_TYPE.Grammar, answers);
  return ({
    overall,
    [QUESTION_TYPE.Word]: wordScore,
    [QUESTION_TYPE.Volcabulary]: volcabularyScore,
    [QUESTION_TYPE.Grammar]: grammarScore,
  });
};
