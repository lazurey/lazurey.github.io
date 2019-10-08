import { Component, default as React } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { PageContainer } from '../components/layout';
import { Skeleton } from '../components/loading';
import { QuestionWithAnswer } from '../components/question';
import { SectionDesc } from '../components/section';
import PATH from '../constants/routes';
import { IViewQuestion } from '../modules/test-generator/interfaces';
import { TestSetStatus } from '../modules/test-generator/TestSet';
import { curTestSet } from '../store';

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

export class Answer extends Component<any, IExamState> {
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
        userAnswer: curTestSet.getUserAnswerByQidx(currentQuestionIdx),
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

  componentDidUpdate(prevProps: any) {
    const currentQuestionIdx = this.props.match.params.qIdx;
    const prevQuestionIdx = prevProps.match.params.qIdx;
    if (prevQuestionIdx !== currentQuestionIdx) {
      this.handleQuestionIdxUpdate();
    }
  }

  componentDidMount() {
    this.handleQuestionIdxUpdate();
  }

  renderQuestion() {
    const currentQuestionIdx = this.props.match.params.qIdx;
    const { currentQuestion, userAnswer } = this.state;
    if (currentQuestion === null) { return; }
    const question = composeQuestion(currentQuestion.rawQuestion, currentQuestionIdx);
    return (
      <div>
        <SectionDesc {...currentQuestion.meta} />
        <QuestionWithAnswer
          {...question}
          userAnswer={userAnswer}
          correctAnswer={currentQuestion.rawQuestion.answer}
        />
      </div>
    );
  }

  renderErrorMsg() {
    return (
      <div>
        <p>Recover from local storage failed, please return to <Link to={PATH.result}>Result page</Link>
        and start over again. My apologies for your inconvenience.</p>
      </div>
    );
  }

  render() {
    const { status, currentQuestion } = this.state;

    return (<PageContainer>
      { status === 'ready' && currentQuestion !== null && this.renderQuestion() }
      { status === 'failed' && this.renderErrorMsg() }
      { (status === 'loading' || currentQuestion === null) && <Skeleton /> }
      <Button href={PATH.result} text='戻る' />
    </PageContainer>);
  }
}
