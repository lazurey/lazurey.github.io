import testBankStatus from '../start/test-bank/status.json';
import { TestSet } from './modules/test-generator/TestSet';

const curTestSet = new TestSet(testBankStatus);

export { curTestSet };
