import { css, cx } from 'emotion';
import { default as React } from 'react';
import { Link } from 'react-router-dom';

import { ERROR_COLOR,
  PRIMARY_COLOR,
  PRIMARY_COLOR_RGB,
  PRIMARY_SEC_COLOR,
  TEXT_SEC_COLOR,
  WHITE_COLOR } from '../../constants/theme';

interface IButton {
  type?: 'primary' | 'secondary' | 'error';
  size?: 'large' | 'default' | 'small' | 'round';
  href?: string;
  text: string;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

const btnStyles = css({
  textDecoration: 'none',
  border: 'none',
  boxShadow: 'none',
  display: 'block',
  textAlign: 'center',
  height: '40px',
  borderRadius: '20px',
  minWidth: '120px',
  lineHeight: '40px',
  '&:hover': {
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
  },
  '&.btn-primary': {
    color: WHITE_COLOR,
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    fontSize: '16px',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: PRIMARY_SEC_COLOR,
    },
  },
  '&.btn-secondary': {
    color: PRIMARY_COLOR,
    border: `2px solid ${PRIMARY_COLOR}`,
    '&:hover': {
      color: PRIMARY_SEC_COLOR,
      borderColor: PRIMARY_SEC_COLOR,
      backgroundColor: `rgba(${PRIMARY_COLOR_RGB}, 0.1)`,
    },
  },
  '&.btn-error': {
    backgroundColor: ERROR_COLOR,
    color: WHITE_COLOR,
    '&:hover': {
      opacity: 0.9,
    },
  },
  '&.btn-disabled': {
    backgroundColor: TEXT_SEC_COLOR,
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: TEXT_SEC_COLOR,
      boxShadow: 'none',
    },
  },
  '&.btn-round': {
    minWidth: '50px',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    borderRadius: '100%',
    marginBottom: 0,
  },
});

export const Button = (props: IButton) => {
  const handleClick = (e: any) => {
    const { disabled = false, onClick } = props;
    if (!disabled) {
      if (typeof onClick === 'function') {
        onClick();
      }
    } else {
      e.preventDefaultProps();
    }
  };
  const { type = 'primary',
          size = 'default', href, text,
          className = '' }  = props;
  const isDisabled = props.disabled || false;
  const finalClassName = cx(btnStyles, `btn-${type}`, `btn-${size}`, { 'btn-disabled': isDisabled }, className);
  return (href && !isDisabled) ? (<Link className={finalClassName} to={href} onClick={handleClick}>{text}</Link>)
  : (<button onClick={handleClick} className={finalClassName} disabled={isDisabled}>{text}</button>);
};
