import React from 'react';
import type { FullScreenContainerProps } from './types'

import "./FullScreenContainer.scss"
function FullScreenContainer({ children, style } : FullScreenContainerProps) {
  return (
    <div className='container' style={style ? style : {}}>
      { children }
    </div>
  );
}

export default FullScreenContainer;