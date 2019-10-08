import { css } from 'emotion';
import { default as React } from 'react';

import { WHITE_COLOR } from '../../constants/theme';

const titleStyles = css({
  height: '40px',
  width: '90%',
  backgroundColor: WHITE_COLOR,
  opacity: 0.6,
  margin: '20px auto',
});

const itemStyles = css({
  height: '40px',
  width: '90%',
  background: WHITE_COLOR,
  opacity: 0.42,
  margin: '10px auto',
});

const containerStyles = css({
  marginTop: '60px',
});

export const Skeleton = () => {
  return (<div className={containerStyles}>
    <div className={titleStyles} />
    <div className={itemStyles} />
    <div className={itemStyles} />
    <div className={itemStyles} />
    <div className={itemStyles} />
  </div>);
};
