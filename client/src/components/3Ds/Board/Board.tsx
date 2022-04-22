import React, { useEffect, useRef } from 'react';
import Ground from './Ground';
import { GroundProps } from './types';
import { Group as GroupType } from "three"

function Board(props : GroundProps) {

  const ref = useRef<GroupType>(null)

  useEffect(() => {
    if(ref.current){
      ref.current.position.x = -(props.size/2)
      ref.current.position.y = -(props.size/2)

      ref.current.rotateX(-Math.PI/4)
    }
  }, [])


  return (
    <group ref={ref}>
      <Ground { ...props } />
    </group>
  );
}

export default Board;