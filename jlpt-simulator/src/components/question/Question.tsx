import { default as React } from 'react';

import { convertToSelectOptions } from '../../utils/question';
import { RadioGroup } from '../select';

export interface IQuestionOption {
  id: string;
  content: string;
}

interface IQuestion {
  stem: string;
  options: IQuestionOption[];
  questionId: string;
  userAnswer?: string;
  setUserAnswer: (userAnswer: string) => void;
}

export const Question = (props: IQuestion) => {
  const { stem, options, questionId, setUserAnswer, userAnswer } = props;
  const selectOptions = convertToSelectOptions(options);
  return (<div>
    <RadioGroup
      onSelect={setUserAnswer}
      selectedValue={userAnswer}
      groupName={questionId}
      mode='vertical'
      options={selectOptions}
      htmlLabel={stem} />
  </div>);
};
