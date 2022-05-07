import React, { useEffect, useRef, useState } from 'react';
import Ground from './Ground';
import { GroundProps } from './types';
import { Group as GroupType } from "three"
import { Box } from "@components/3Ds/Cube"
import { useSocketContext } from '@/hooks';

function Board(props : GroundProps) {

  const ref = useRef<GroupType>(null)
  const [chesses, addChess] = useState<Array<JSX.Element>>([])
  const socket = useSocketContext()

  useEffect(() => {
    socket?.on('user-attack-feedback', data => {
      if(data.status === "ok"){
        addChess(prev => [
          ...prev,
          <Box 
            key={`chess_x-${data.position.x}-y-${data.position.y}`}
            color={data.color}  
            size={[0.6, 0.6, 0.6]}
            position={[data.position.x, data.position.y, 0.6]}
          />]
        )
      }
    })
  }, [])

  useEffect(() => {
    if(ref.current){
      ref.current.position.x = -(props.size/2)
      ref.current.position.y = -(props.size/2)

      ref.current.rotateX(-Math.PI/4)
    }
  }, [])


  return (
    <group ref={ref}>
      { chesses }
      <Ground { ...props } />
    </group>
  );
}

export default Board;