import { css } from 'emotion';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { CODE_REPO } from '../../constants/common';
import PATH from '../../constants/routes';
import { TEXT_SEC_COLOR } from '../../constants/theme';

const footerStyles = css({
  lineHeight: '60px',
  borderTop: `1px solid ${TEXT_SEC_COLOR}`,
  margin: '10px 20px 0',
  textAlign: 'center',
  fontSize: '12px',
  color: TEXT_SEC_COLOR,
});

export const Footer = () => (
  <footer className={footerStyles}>
    &copy; 2019 <a target='_blank' href='https://github.com/lazurey'>@lazurey</a>
    <span> - </span> <Link to={PATH.about}>Help</Link> <span> | </span>
    <a href={`${CODE_REPO}/issues`} target='_blank'>Report an issue</a>
  </footer>
);
