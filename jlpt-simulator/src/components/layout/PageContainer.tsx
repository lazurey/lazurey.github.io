import { css } from 'emotion';
import * as React from 'react';

const containerStyles = css({
  padding: '20px 3.2%',
  position: 'relative',
});

export const PageContainer = ({ children }: { children: any}) => (
  <div className={containerStyles}>
    { children }
  </div>
);
