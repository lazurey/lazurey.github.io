import {
  generateRandom,
  getQuestionMeta,
  getQuestionTypeByIdx,
  shuffle,
} from '../utils';

describe('# test generator utils', () => {
  const testConfig = {
    word: 3,
    volcabulary: 3,
    grammar: 3,
  };
  it('should generate a random array based on max number and total', () => {
    const result = generateRandom(10, 5);
    expect(result).toHaveLength(5);
    result.forEach((value: number) => {
      expect(value).toBeLessThanOrEqual(10);
    });
  });
  it('should shuffle an array', () => {
    const arr = [1, 2, 3, 4];
    expect(shuffle(arr)).not.toEqual([1, 2, 3, 4]);
  });
  it('should return question type by the index', () => {
    expect(getQuestionTypeByIdx(testConfig, 2)).toBe('word');
    expect(getQuestionTypeByIdx(testConfig, 4)).toBe('volcabulary');
    expect(getQuestionTypeByIdx(testConfig, 9)).toBe('grammar');
  });
  it('should return question meta info by index', () => {
    expect(getQuestionMeta(testConfig, 1)).toEqual({
      type: 'word',
      sectionProgress: '1 / 3',
      totalProgress: '1 / 9',
    });
  });
});
