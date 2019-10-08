import { css, cx } from 'emotion';
import { Component, default as React } from 'react';

import { ERROR_SEC_COLOR, WHITE_COLOR } from '../../constants/theme';
import { formatTime } from './util';

const styles = css({
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  position: 'absolute',
  width: '50px',
  height: '50px',
  borderRadius: '100%',
  top: '-25px',
  right: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const overtimeStyles = css({
  backgroundColor: ERROR_SEC_COLOR,
  color: WHITE_COLOR,
});

interface ICountdown {
  total: number;
}

interface ICountdownState {
  current: number;
  overtime: boolean;
}

export class Countdown extends Component<ICountdown, ICountdownState> {
  private intervalId: any;

  constructor(props: ICountdown) {
    super(props);
    this.state = {
      current: props.total,
      overtime: false,
    };
  }

  countdown = () => {
    const { current } = this.state;
    if (current > 0) {
      this.setState({
        current: current - 1,
      });
    } else {
      this.setState({
        overtime: true,
      });
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidCatch() {
    clearInterval(this.intervalId);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.countdown, 1000);
  }

  render() {
    const { current, overtime } = this.state;
    return (<div className={cx(styles, { [overtimeStyles]: overtime })}>
      <span>{formatTime(current)}</span>
    </div>);
  }
}
