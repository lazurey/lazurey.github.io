import { Component, default as React } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { Countdown } from '../components/countdown';
import { PageContainer } from '../components/layout';
import { Skeleton } from '../components/loading';
import { Question } from '../components/question';
import { SectionDesc } from '../components/section';
import PATH from '../constants/routes';
import { IViewQuestion } from '../modules/test-generator/interfaces';
import { TestSetStatus } from '../modules/test-generator/TestSet';
import { curTestSet } from '../store';

const VALID_KEYS = ['1', '2', '3', '4', 'a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'];
const KEY_MAP: any = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  'a': 'A',
  'b': 'B',
  'c': 'C',
  'd': 'D',
  'A': 'A',
  'B': 'B',
  'C': 'C',
  'D': 'D',
};

const composeQuestion = (raw: any, questionIdx: string) => ({
  stem: `${questionIdx}、${raw.stem}`,
  options: raw.options,
  questionId: questionIdx,
});

interface IExamState {
  status: 'loading' | 'ready' | 'failed';
  userAnswer: string;
  currentQuestion: IViewQuestion | null;
}

export class Exam extends Component<any, IExamState> {
  checker: any;
  constructor(props: any) {
    super(props);
    this.checker = null;
    this.state = {
      currentQuestion: null,
      userAnswer: '',
      status: 'loading',
    };
  }

  fetchQuestion = () => {
    const currentQuestionIdx = this.props.match.params.qIdx;
    curTestSet.getQuestion(currentQuestionIdx).then((question: any) => {
      this.setState({
        currentQuestion: question,
        userAnswer: '',
        status: 'ready',
      });
    }).catch((e: any) => {
      console.error(e);
      this.setState({ status: 'failed' });
    });
  }

  checkTestSetStatus = () => {
    if (curTestSet.getStatus() === TestSetStatus.READY) {
      this.fetchQuestion();
      clearInterval(this.checker);
      this.checker = null;
      this.setState({ status: 'ready' });
    } else if (curTestSet.getStatus() === TestSetStatus.INITIAT_FAILED
      || curTestSet.getStatus() === TestSetStatus.RECOVER_FAILED) {
      clearInterval(this.checker);
      this.checker = null;
      this.setState({ status: 'failed' });
    }
  }

  handleQuestionIdxUpdate = () => {
    this.setState({ status: 'loading' });
    if (this.checker === null) {
      this.checker = setInterval(this.checkTestSetStatus, 500);
    }
  }

  setUserAnswer = (userAnswer: string) => {
    const { currentQuestion } = this.state;
    if (currentQuestion === null) { return; }
    const qIdx = this.props.match.params.qIdx;
    this.setState({ userAnswer });
    curTestSet.setUserAnswer({
      type: currentQuestion.meta.type,
      userAnswer,
      qIdx,
      correctAnswer: currentQuestion.rawQuestion.answer,
    });
  }

  handleKeyboardSelect = (e: KeyboardEvent) => {
    if (VALID_KEYS.indexOf(e.key) > -1) {
      this.setUserAnswer(KEY_MAP[e.key]);
    }
  }

  componentDidUpdate(prevProps: any) {
    const currentQuestionIdx = this.props.match.params.qIdx;
    const prevQuestionIdx = prevProps.match.params.qIdx;
    if (prevQuestionIdx !== currentQuestionIdx) {
      this.handleQuestionIdxUpdate();
      this.setState({
        userAnswer: '',
        currentQuestion: null,
      });
    }
  }

  componentWillUnmount() {
    document.onkeyup = null;
  }

  componentDidMount() {
    this.handleQuestionIdxUpdate();
    document.onkeyup = this.handleKeyboardSelect;
  }

  renderNextBtn() {
    const currentQuestionIdx = this.props.match.params.qIdx;
    const hasNext = curTestSet.hasNextQuestion(currentQuestionIdx);
    const nextLink = (hasNext)
      ? `${PATH.exam}/${parseInt(currentQuestionIdx, 10) + 1}`
      : PATH.result;
    const nextLinkText = (hasNext) ? '次へ' : 'チェック';
    return (<div>
        <Button text={nextLinkText} href={nextLink} disabled={!this.state.userAnswer} />
      </div>);
  }

  renderQuestion() {
    const currentQuestionIdx = this.props.match.params.qIdx;
    const { currentQuestion, userAnswer } = this.state;
    if (currentQuestion === null) { return; }
    const question = composeQuestion(currentQuestion.rawQuestion, currentQuestionIdx);
    return (
      <div>
        <SectionDesc {...currentQuestion.meta} />
        <Question
          {...question}
          userAnswer={userAnswer}
          setUserAnswer={this.setUserAnswer}
        />
        {this.renderNextBtn()}
      </div>
    );
  }

  renderErrorMsg() {
    return (
      <div>
        <p>Recover from local storage failed, please return to <Link to={PATH.home}>homepage</Link>
        and start over again. My apologies for your inconvenience.</p>
      </div>
    );
  }

  render() {
    const { status, currentQuestion } = this.state;
    const totalTime = curTestSet.getTotalTime();
    return (<PageContainer>
      <Countdown total={parseInt(totalTime, 10)} />
      { status === 'ready' && currentQuestion !== null && this.renderQuestion() }
      { status === 'failed' && this.renderErrorMsg() }
      { (status === 'loading' || currentQuestion === null) && <Skeleton /> }
      <p><small>Tip: use 1, 2, 3, 4, or a, b, c, d to do quick select on desktop</small></p>
    </PageContainer>);
  }
}
