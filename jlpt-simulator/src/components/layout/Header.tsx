import { css } from 'emotion';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../constants/theme';

const headerStyles = css({
  backgroundColor: PRIMARY_COLOR,
  height: '40px',
  lineHeight: '40px',
  display: 'flex',
  justifyContent: 'center',
  boxShadow: '0 2px 8px #f0f1f2',
  ' a': {
    color: WHITE_COLOR,
    textDecoration: 'none',
    fontSize: '16px',
  },
  ' small': {
    fontSize: '12px',
    opacity: .6,
  },
});

export const Header = () => (
  <header className={headerStyles}>
    <Link to='/'>JLPT 模擬試験 <small>→ home</small></Link>
  </header>
);
