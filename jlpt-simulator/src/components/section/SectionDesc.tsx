import { css } from 'emotion';
import { default as React } from 'react';

import { QUESTION_TYPE_JP } from '../../constants/exam-config';
import { TEXT_SEC_COLOR } from '../../constants/theme';
import { IQuestionMeta } from '../../modules/test-generator/interfaces';

const containerStyles = css({
  color: TEXT_SEC_COLOR,
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
});

export const SectionDesc = (props: IQuestionMeta) => {
  const { type, totalProgress } = props;
  return (<div className={containerStyles}>
    <span>{QUESTION_TYPE_JP[type]}</span>
    <span>{totalProgress}</span>
  </div>);
};
