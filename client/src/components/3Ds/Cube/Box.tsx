import React, { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { BoxProps } from './types';

function Box({ color, size, rotate, position } : BoxProps) {
  const ref = useRef<Mesh>(null)
  useEffect(() => {
    if(rotate && ref.current){
      ref.current.rotateZ(Math.PI/4)
      ref.current.rotateX(Math.PI/6)
    }
    if(ref.current && position){
      ref.current.position.set(...position)
    }
  }, [])

  return (
    <mesh ref={ref}>
      <boxGeometry args={size ? size : [1, 1, 1]}/>
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default Box;