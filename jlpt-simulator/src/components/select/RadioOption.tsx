import { css, cx } from 'emotion';
import { Component, default as React } from 'react';
import { ERROR_COLOR_RGB, PRIMARY_COLOR_RGB } from '../../constants/theme';

interface IRadioOptionComp {
  value: string;
  displayText: string;
  clz?: string;
  groupName: string;
  selectedValue?: string;
  onChange?: (args: any) => void;
}

const optionStyles = css({
  backgroundColor: '#fff',
  padding: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '10px',
  borderRadius: '3px',
  cursor: 'pointer',
  ' input': {
    width: '30px',
  },
  '&:hover': {
    backgroundColor: `rgba(${PRIMARY_COLOR_RGB}, 0.26)`,
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
  },
  '&.bg-correct': {
    backgroundColor: `rgba(${PRIMARY_COLOR_RGB}, 0.6)`,
  },
  '&.bg-wrong': {
    backgroundColor: `rgba(${ERROR_COLOR_RGB}, 0.6)`,
  },
});

const checkedStyles = css({
  backgroundColor: `rgba(${PRIMARY_COLOR_RGB}, 0.1)`,
});

export class RadioOption extends Component<IRadioOptionComp, any> {
  onClick = () => {
    const { onChange, value } = this.props;
    if (onChange && typeof onChange === 'function') {
      onChange(value);
    }
  }

  render() {
    const { value, displayText, groupName, selectedValue, clz } = this.props;
    const checked = (selectedValue === value);
    return (<div className={cx(optionStyles, { [checkedStyles] : checked }, `bg-${clz}`)} onClick={this.onClick}>
      <input
        type='radio' name={groupName}
        checked={checked}
        value={value} onChange={this.onClick} />
      <label>{displayText}</label>
    </div>);
  }
}
