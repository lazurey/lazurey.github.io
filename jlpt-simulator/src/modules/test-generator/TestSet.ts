import { ITestSetConfig, TEST_LEVEL,
  TEST_TIME, TEST_TIME_CONFIG } from '../../constants/exam-config';
import { BrowserStorage } from '../storage';
import { IUserAnswer, IViewQuestion } from './interfaces';
import { fetchQuestionByTypeAndId, generateRandom, getQuestionMeta } from './utils';

const MY_UNIQUE_KEY = 'akiraDaisuki';

export enum TestSetStatus {
  READY = 'ready',
  RECOVERING = 'recovering',
  RECOVER_FAILED = 'recover failed',
  INITIATING = 'initiating',
  INITIAT_FAILED = 'initiate failed',
  NOT_SET = 'not set',
}

export class TestSet {
  word: any[];
  volcabulary: any[];
  grammar: any[];
  questionList: any[];

  testConfig: ITestSetConfig;
  level: TEST_LEVEL;
  time: TEST_TIME;
  testBankStatus: ITestSetConfig;
  testBankStatusAllLevels: any;
  status: string;
  userAnswers: {
    [key: string]: IUserAnswer;
  };
  completed: boolean;
  subscribers: Array<(status: string) => void>;
  totalTime: number;

  constructor(testBankStatus: any) {
    this.word = [];
    this.volcabulary = [];
    this.grammar = [];
    this.questionList = [];
    this.testConfig = TEST_TIME_CONFIG[TEST_TIME.QUICK];
    this.level = TEST_LEVEL.N2;
    this.time = TEST_TIME.QUICK;
    this.testBankStatusAllLevels = testBankStatus;
    this.testBankStatus = testBankStatus[this.level];
    this.status = TestSetStatus.NOT_SET;
    this.userAnswers = {};
    this.completed = false;
    this.subscribers = [];
    this.recoverFromLocalStorage();
    this.totalTime = 600;
  }

  setTestSet = ({
    wordQuestions,
    volcabularyQuestions,
    grammarQuestions,
  }: any) => {
    this.word = wordQuestions;
    this.volcabulary = volcabularyQuestions;
    this.grammar = grammarQuestions;
    this.questionList = [
      ...this.word,
      ...this.volcabulary,
      ...this.grammar,
    ];
  }

  setTestSetStatus = (status: TestSetStatus) => {
    this.status = status;
    this.subscribers.forEach(cb => {
      console.log(typeof cb);
      cb(status);
    });
  }

  recoverFromLocalStorage = () => {
    this.setTestSetStatus(TestSetStatus.RECOVERING);
    BrowserStorage.getItem(MY_UNIQUE_KEY).then((savedTestSet: any) => {
      if (!!savedTestSet) {
        try {
          const { word, volcabulary, grammar, questionList,
                  testConfig,
                  level,
                  time,
                  // testBankStatus,
                  completed,
                  userAnswers,
          } = savedTestSet;
          this.word = word;
          this.volcabulary = volcabulary;
          this.grammar = grammar;
          this.questionList = questionList;
          this.testConfig = testConfig;
          this.level = level;
          this.time = time;
          // this.testBankStatus = testBankStatus;
          this.completed = completed;
          this.userAnswers = userAnswers;
          this.setTestSetStatus(TestSetStatus.READY);
        } catch (e) {
          console.log(e);
          console.log('recover from local storage failed, will jump to homepage');
        }
      } else {
        console.log('recover from local storage failed');
      }
    });
  }

  saveTestSetToLocalStorage = () => {
    BrowserStorage.setItem(MY_UNIQUE_KEY, {
      word: this.word,
      volcabulary: this.volcabulary,
      grammar: this.grammar,
      questionList: this.questionList,
      testConfig: this.testConfig,
      level: this.level,
      time: this.time,
      testBankStatus: this.testBankStatus,
      completed: false,
      userAnswers: this.userAnswers,
    });
  }

  initTest = (time: TEST_TIME, level: TEST_LEVEL) => {
    this.setTestSetStatus(TestSetStatus.INITIATING);
    this.setTestBankStatus(level);
    this.setTestConfig(time);
    this.setLevel(level);
    this.userAnswers = {};
    const wordQuestions = generateRandom(this.testBankStatus.word, this.testConfig.word);
    const volcabularyQuestions = generateRandom(this.testBankStatus.volcabulary, this.testConfig.volcabulary);
    const grammarQuestions = generateRandom(this.testBankStatus.grammar, this.testConfig.grammar);
    this.setTestSet({
      wordQuestions, volcabularyQuestions, grammarQuestions,
    });
    this.setTestSetStatus(TestSetStatus.READY);
    this.saveTestSetToLocalStorage();
  }

  getStatus = () => {
    return this.status;
  }

  setTestConfig = (time: TEST_TIME) => {
    this.time = time;
    this.testConfig = TEST_TIME_CONFIG[time];
  }

  setLevel = (level: TEST_LEVEL) => {
    this.level = level;
  }

  setTestBankStatus = (level: TEST_LEVEL) => {
    this.testBankStatus = this.testBankStatusAllLevels[level];
  }

  getQuestion = (questionIdx: string): Promise<IViewQuestion> => {
    const idx = parseInt(questionIdx, 10);
    const id = this.questionList[idx - 1];
    const meta = getQuestionMeta(this.testConfig, idx);
    return fetchQuestionByTypeAndId(meta.type, id, this.level).then((rawQuestion) => {
      return {
        meta,
        id,
        rawQuestion,
      };
    });
  }

  getTestDesc = () => {
    return ({
      time: this.time,
      level: this.level,
    });
  }

  hasNextQuestion = (curIdx: string) => {
    return parseInt(curIdx, 10) < this.questionList.length;
  }

  setUserAnswer = (userAnswerObj: IUserAnswer) => {
    this.userAnswers[userAnswerObj.qIdx] = userAnswerObj;
    if (parseInt(userAnswerObj.qIdx, 10) === this.questionList.length) {
      this.completed = true;
    }
    this.saveTestSetToLocalStorage();
  }

  getUserAnswers = () => {
    return Object.values(this.userAnswers);
  }

  getUserAnswerByQidx = (qIdx: string) => {
    return this.userAnswers[qIdx].userAnswer;
  }

  getTotalTime = () => {
    return this.time;
  }

  subscribeTestSetStatus = (callback: (status: string) => void) => {
    if (this.status === TestSetStatus.READY) {
      callback(this.status);
    }
    this.subscribers.push(callback);
  }
  unsubscribeTestSetStatus = () => {
    this.subscribers.pop();
    return;
  }
}
