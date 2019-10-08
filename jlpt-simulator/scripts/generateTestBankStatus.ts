import * as fs from 'fs';
import { QUESTION_TYPE, TEST_LEVEL } from '../src/constants/exam-config';

const FILE_DIR = './start/test-bank/';

let status = {} as any;

const readTypeFolder = (level: string, type: string) => {
  return  new Promise((resolve, reject) => {
    return fs.readdir(`${FILE_DIR}${level}/${type}/`, { encoding: 'utf8' }, (err: any, data: any) => {
      if (err) {
        console.error(err);
        reject();
      }
      status[level][type] = data.length;
      resolve();
    });
  });
}

const iterateLevels = () => {
  const levels = Object.values(TEST_LEVEL);
  const types = Object.values(QUESTION_TYPE);
  const readPromises = [] as Promise<any>[];
  levels.forEach((level: any) => {
    console.log(`Level: ${level}`);
    status[level] = {} as any;
    types.forEach((type: any) => {
      console.log(`Type: ${type}`);
      readPromises.push(readTypeFolder(level, type));
    })
  });
  return Promise.all(readPromises);
}

const writeStatusFile = (data: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${FILE_DIR}status.json`, JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        console.log(err);
        reject();
      }
      resolve();
    })
  })
}

const generateStatus = () => {
  iterateLevels().then(() => {
    console.log(status);
    writeStatusFile(status);
  });
}

generateStatus();
