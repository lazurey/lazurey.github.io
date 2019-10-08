import { css } from 'emotion';
import { Component, default as React } from 'react';

import { Button } from '../components/button';
import { PageContainer } from '../components/layout';
import { RadioGroup } from '../components/select';
import { TEST_LEVEL, TEST_LEVEL_OPTIONS,
  TEST_SIZE_OPTIONS, TEST_TIME } from '../constants/exam-config';
import PATH from '../constants/routes';
import { TEXT_SEC_COLOR } from '../constants/theme';
import { curTestSet } from '../store';

const noteStyles = css({
  textAlign: 'center',
  color: TEXT_SEC_COLOR,
});

export class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      time: TEST_TIME.QUICK,
      level: TEST_LEVEL.N2,
    };
  }

  initTest = () => {
    curTestSet.initTest(this.state.time, this.state.level);
  }

  setTestTime = (time: any) => {
    this.setState({
      time,
    });
  }

  setTestLevel = (level: any) => {
    this.setState({
      level,
    });
  }

  render() {
    return (<PageContainer>
      <RadioGroup
        label='時間'
        options={TEST_SIZE_OPTIONS}
        groupName='time'
        onSelect={this.setTestTime}
        selectedValue={this.state.time}
      />
      <RadioGroup
        label='レベル'
        options={TEST_LEVEL_OPTIONS}
        groupName='level'
        onSelect={this.setTestLevel}
        selectedValue={this.state.level}
      />
      <Button text='スタート' href={`${PATH.exam}/1`} onClick={this.initTest} />
      <p className={noteStyles}><small>Note: only N2 level available for now.</small></p>
    </PageContainer>);
  }
}
