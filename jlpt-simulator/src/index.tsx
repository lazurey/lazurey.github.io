import { injectGlobal } from 'emotion';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer, Header, Main } from './components/layout';
import PATH from './constants/routes';
import { WARNING_COLOR } from './constants/theme';
import { AboutHelp, Answer, Exam, Home, NoMatch, Result } from './pages';

// tslint:disable
injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
    font-size: 14px;
    line-height: 1.6;
    background-color: #fff;
  }
  a {
    text-decoration: none;
    color: ${WARNING_COLOR};
  }
`;

const Routes = () => {
  return (<Switch>
    <Route exact component={Home} path={PATH.home} />
    <Route component={Exam} path={`${PATH.exam}/:qIdx`} />
    <Route component={Result} path={PATH.result} />
    <Route component={AboutHelp} path={PATH.about} />
    <Route component={Answer} path={`${PATH.answer}/:qIdx`} />
    <Route component={NoMatch} />
  </Switch>);
};

const Root = () => (
  <Main>
    <Header />
    <Routes />
    <Footer />
  </Main>
);

const App = () => {
  return (<Router>
    <Root />
  </Router>);
};

ReactDOM.render(<App />, document.getElementById('app'));
