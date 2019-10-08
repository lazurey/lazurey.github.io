import { QUESTION_TYPE } from '../../constants/exam-config';

export interface IQuestionMeta {
  type: QUESTION_TYPE;
  sectionProgress: string;
  totalProgress: string;
}

interface IRawQuestion {
  stem: string;
  options: any[];
  answer: string;
}

export interface IViewQuestion {
  id: string;
  meta: IQuestionMeta;
  rawQuestion: IRawQuestion;
}

export interface IUserAnswer {
  userAnswer: string;
  qIdx: string;
  correctAnswer: string;
  type: QUESTION_TYPE;
}
