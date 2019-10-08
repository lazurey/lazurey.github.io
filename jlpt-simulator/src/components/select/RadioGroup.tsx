import { css, cx } from 'emotion';
import { Component, default as React } from 'react';

import { RadioOption } from './RadioOption';

export interface IRadioOption {
  value: string;
  displayText: string;
  clz?: string;
}

interface IRadioGroup {
  label?: string;
  htmlLabel?: string;
  desc?: string;
  groupName: string;
  options: IRadioOption[];
  mode?: 'horizontal' | 'vertical';
  onSelect?: (args: any) => void;
  selectedValue?: string;
}

const groupStyles = css({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '10px 0',
  marginBottom: '10px',
  ' > .label': {
    width: '80px',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '40px',
  },
  ' .options': {
    width: '100%',
  },
});

const verticalStyles = css({
  flexDirection: 'column',
  ' > .label': {
    width: '100%',
    marginBottom: '20px',
  },
});

export class RadioGroup extends Component<IRadioGroup, any> {
  render() {
    const {
      label, htmlLabel, desc, options,
      groupName, mode = 'horizontal',
      onSelect,
      selectedValue,
    } = this.props;
    return (
      <div className={cx(groupStyles, { [verticalStyles] : mode === 'vertical' })}>
        <div className='label'>
          { label && (<label>{label}</label>) }
          { htmlLabel && (<label dangerouslySetInnerHTML={{ __html: htmlLabel }} />) }
          { desc && (<p><small>{desc}</small></p>) }
        </div>
        <div className='options'>
          {
            options.map((option) => (<RadioOption
              key={option.value}
              clz={option.clz}
              onChange={onSelect}
              groupName={groupName}
              selectedValue={selectedValue}
              displayText={option.displayText}
              value={option.value} />))
          }
        </div>
      </div>
    );
  }
}
