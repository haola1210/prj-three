import React from 'react';
import type { FullScreenContainerProps } from './types'

import "./FullScreenContainer.scss"
function FullScreenContainer({ children } : FullScreenContainerProps) {
  return (
    <div className='container'>
      { children }
    </div>
  );
}

export default FullScreenContainer;