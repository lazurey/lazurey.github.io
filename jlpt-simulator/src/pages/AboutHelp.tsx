import { css } from 'emotion';
import { default as React } from 'react';
import { PageContainer } from '../components/layout';
import { CODE_REPO } from '../constants/common';

const tableStyles = css({
  width: '100%',
  ' td, th': {
    borderBottom: '1px solid #cdcdcd',
    padding: '5px',
  },
});

export const AboutHelp = () => {
  return (<PageContainer>
    <h3>Contribute</h3>
    <ul>
      <li>
        <a href={CODE_REPO} target='_blank'>
        Source code</a>
      </li>
      <li>
        <a href={`${CODE_REPO}/docs/contribute-test-bank.md`}
        target='_blank'>Contribute to the test bank</a>
      </li>
      <li>
        <a href={`${CODE_REPO}/issues`} target='_blank'>Report an issue</a>
      </li>
    </ul>
    <h3>Browser Support</h3>
    <table className={tableStyles}>
      <thead>
        <tr>
          <th>Browser</th>
          <th>Support version</th>
        </tr>
        <tr>
          <td>Chrome on Win/Mac</td>
          <td>Latest</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Safari on iOS</td>
          <td>Latest</td>
        </tr>
        <tr>
          <td>Firefox / IE</td>
          <td>Latest</td>
        </tr>
        <tr>
          <td>Other</td>
          <td>x</td>
        </tr>
      </tbody>
    </table>
  </PageContainer>);
};
