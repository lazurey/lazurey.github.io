import { default as React } from 'react';

import { RadioGroup } from '../select';
import { convertToReadOnlyOptions } from './utils';

export interface IQuestionOption {
  id: string;
  content: string;
}

interface IQuestionWithAnswer {
  stem: string;
  options: IQuestionOption[];
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
}

export const QuestionWithAnswer = (props: IQuestionWithAnswer) => {
  const { stem, options, questionId, userAnswer, correctAnswer } = props;
  const selectOptions = convertToReadOnlyOptions(options, userAnswer, correctAnswer);
  return (<div>
    <RadioGroup
      selectedValue={userAnswer}
      groupName={questionId}
      mode='vertical'
      options={selectOptions}
      htmlLabel={stem} />
  </div>);
};
