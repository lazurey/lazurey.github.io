import { css } from 'emotion';
import { default as React, useEffect, useState } from 'react';

import { AnswerList } from '../components/answer-list';
import { ScoreBar } from '../components/bar';
import { Button } from '../components/button';
import { PageContainer } from '../components/layout';
import { Skeleton } from '../components/loading';
import { QUESTION_TYPE, QUESTION_TYPE_JP } from '../constants/exam-config';
import PATH from '../constants/routes';
import { IUserAnswer } from '../modules/test-generator/interfaces';
import { curTestSet } from '../store';
import { generateReport } from '../utils/result';

const actionStyles = css({
  marginTop: '40px',
});

export const Result = () => {
  const [userAnswers, setUserAnswers] = useState([] as IUserAnswer[]);

  const checkStatus = (status: any) => {
    if (status === 'ready' && userAnswers.length === 0) {
      setUserAnswers(curTestSet.getUserAnswers());
    }
  };

  useEffect(() => {
    curTestSet.subscribeTestSetStatus(checkStatus);
    return () => {
      curTestSet.unsubscribeTestSetStatus();
    };
  });

  if (userAnswers.length === 0) {
    return <Skeleton />;
  }
  const report = generateReport(userAnswers);
  return (<PageContainer>
    <h2>点数: {report.overall.score}%</h2>
    <ScoreBar title='Overall' {...report.overall} />
    <h4>詳しいポイント</h4>
    <ScoreBar title={QUESTION_TYPE_JP[QUESTION_TYPE.Word]} {...report[QUESTION_TYPE.Word]} />
    <ScoreBar title={QUESTION_TYPE_JP[QUESTION_TYPE.Volcabulary]} {...report[QUESTION_TYPE.Volcabulary]} />
    <ScoreBar title={QUESTION_TYPE_JP[QUESTION_TYPE.Grammar]} {...report[QUESTION_TYPE.Grammar]} />
    <div className={actionStyles}>
      <AnswerList userAnswers={userAnswers} />
      <Button href={PATH.home} text='ホームページへ戻る' type='secondary' />
    </div>
  </PageContainer>);
};
