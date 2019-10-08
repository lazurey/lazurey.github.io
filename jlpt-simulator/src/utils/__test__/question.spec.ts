import { convertToSelectOptions } from '../question';

describe('# Question convertor', () => {
  it('should convert question option to select option', () => {
    const rawQuestions = [{
      id: 'A',
      content: 'abcdefg',
    }];
    const selectOptions = [{
      value: 'A',
      displayText: 'abcdefg',
    }];
    expect(convertToSelectOptions(rawQuestions)).toEqual(selectOptions);
  });
});
