import React from 'react';
import { BoxProps } from './types';

function Box({ color, size } : BoxProps) {
  return (
    <mesh>
      <boxGeometry args={size ? size : [1, 1, 1]}/>
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default Box;