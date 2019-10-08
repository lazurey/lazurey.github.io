import { default as React } from 'react';
import { Link } from 'react-router-dom';

import PATH from '../constants/routes';

export const NoMatch = () => (<div>
  <h1>404</h1>
  <Link to={PATH.home}>Return to home</Link>
</div>);
