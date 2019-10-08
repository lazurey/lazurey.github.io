import { css, cx } from 'emotion';
import { default as React } from 'react';

import { PRIMARY_SEC_COLOR,
  WHITE_COLOR,
 } from '../../constants/theme';

interface IScoreBar {
  title: string;
  total: number;
  correct: number;
}

const barStyles = css({
  width: '100%',
  height: '40px',
  backgroundColor: WHITE_COLOR,
  position: 'relative',
  textAlign: 'center',
  zIndex: 2,
  marginBottom: '20px',
  ' > .label': {
    zIndex: 1,
    lineHeight: '40px',
  },
});

const progressStyles = css({
  backgroundColor: PRIMARY_SEC_COLOR,
  top: '0px',
  left: '0px',
  position: 'absolute',
  height: '40px',
  minWidth: '10px',
  zIndex: -1,
});

const getWidth = (correct: number, total: number) => {
  const rate = correct * 100 / total;
  return `${rate.toFixed(2)}%`;
};

export const ScoreBar = (props: IScoreBar) => {
  const { title, total, correct } = props;
  return (<div className={barStyles}>
    <div className={cx(progressStyles, css({
      width: getWidth(correct, total),
    }))} />
    <div className='label'>{title} ({correct} / {total})</div>
  </div>);
};
