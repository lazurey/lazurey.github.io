import { IQuestionOption } from '../components/question/Question';
import { IRadioOption } from '../components/select/RadioGroup';

export const convertToSelectOptions = (questionOptions: IQuestionOption[]): IRadioOption[] => (
  questionOptions.map((questionOption) => ({
      value: questionOption.id,
      displayText: questionOption.content,
    }))
);
