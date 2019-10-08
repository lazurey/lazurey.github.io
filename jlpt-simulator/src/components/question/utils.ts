import { IQuestionOption } from '../question/Question';
import { IRadioOption } from '../select/RadioGroup';

export const convertToReadOnlyOptions =
  (options: IQuestionOption[], userAnswer: string, correctAnswer: string): IRadioOption[] => {
  return options.map((option) => ({
    value: option.id,
    displayText: option.content,
    clz: (correctAnswer === option.id)
      ? 'correct'
      : (userAnswer === option.id)
        ? 'wrong'
        : 'not-set',
  }));
};
