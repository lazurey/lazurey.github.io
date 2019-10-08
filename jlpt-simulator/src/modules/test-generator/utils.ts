import { AxiosResponse } from 'axios';
import { apiClient } from '../../constants/common';
import { ITestSetConfig, QUESTION_TYPE, TEST_LEVEL } from '../../constants/exam-config';

export const generateRandom = (max: number, total: number) => {
  const tempArr = new Array(max);
  const qArr = tempArr.fill(0).map((_, i) => i + 1);
  const shuffled = shuffle(qArr);
  return shuffled.slice(0, total);
};

export const shuffle = (originalArr: number[]) => {
  let currentIndex = originalArr.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = originalArr[currentIndex];
    originalArr[currentIndex] = originalArr[randomIndex];
    originalArr[randomIndex] = temporaryValue;
  }
  return originalArr;
};

export const getQuestionTypeByIdx = (confg: ITestSetConfig, idx: number) => {
  if (idx <= confg.word) {
    return QUESTION_TYPE.Word;
  } else if (idx <= confg.volcabulary + confg.word) {
    return QUESTION_TYPE.Volcabulary;
  } else {
    return QUESTION_TYPE.Grammar;
  }
};

export const getQuestionMeta = (config: ITestSetConfig, idx: number) => {
  const type = getQuestionTypeByIdx(config, idx);
  const totalQuestions = Object.values(config).reduce((acc, cur) => acc + cur, 0);
  return {
    type,
    sectionProgress: `${idx} / ${config[type]}`,
    totalProgress: `${idx} / ${totalQuestions}`,
  };
};

export const fetchQuestionByTypeAndId = (type: QUESTION_TYPE, id: string, level: TEST_LEVEL) => {
  const filePath = `/test-bank/${level}/${type}/${id}.json`;
  return apiClient.get(filePath).then((response: AxiosResponse) => {
    return response.data;
  });
};
