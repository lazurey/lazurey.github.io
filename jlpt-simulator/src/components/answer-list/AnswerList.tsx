import { css } from 'emotion';
import { default as React } from 'react';

import PATH from '../../constants/routes';
import { IUserAnswer } from '../../modules/test-generator/interfaces';
import { Button } from '../button';

const listStyles = css({
  listStyle: 'none',
  padding: 0,
  margin: '20px 0',
  display: 'flex',
  flexWrap: 'wrap',
  ' li': {
    padding: '10px',
  },
});

export const AnswerList = ({ userAnswers }: { userAnswers: IUserAnswer[] }) => {
  return (
    <ul className={listStyles}>
      {
        userAnswers.map((answer: IUserAnswer) => {
          const btnType = (answer.correctAnswer === answer.userAnswer)
            ? 'primary' : 'error';
          return (<li key={answer.qIdx}>
            <Button text={answer.qIdx} href={`${PATH.answer}/${answer.qIdx}`}
              type={btnType} size='round' />
          </li>);
        })
      }
    </ul>
  );
};
