import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";
import type { CubeProps } from "./types"
import Box from "./Box";
import { useMatchContext, useSocketContext, useUserContext } from "@/hooks";
import { useParams } from "react-router-dom";

function Cube({ position, color, size } : CubeProps) {
  const [hovering, setHover] = useState(false)
  const [x, y] = position
  const socket = useSocketContext()
  const userCtx = useUserContext()
  const [isAvailable, setIsAvailable] = useState(true)
  const match = useMatchContext()
  
  if(position[0] === 1 && position[1] === 1){
    console.log(socket)
    console.log(match)
    console.log(userCtx?.user)
  }

  const handleClick = () => {
    if(isAvailable && userCtx?.user.id === match.current?.currentTurn){
      console.log('click')
      socket?.emit('user-attack', {
        userId : userCtx?.user.id,
        position : { x, y },
        matchId : match.current?.id
      })
    }
  }
  
  useEffect(() => {
    socket?.on('user-attack-feedback', (data) => {
      if(data.status === 'ok'){
        if(x === data.position.x && y === data.position.y){
          setIsAvailable(false)
        }
      }
    })
  })

  return (
    <group 
      position={position}
      onPointerEnter={(e : ThreeEvent<PointerEvent>) => {
        if(isAvailable && 
        userCtx?.user.id === match.current?.currentTurn){
          setHover(prev => true)
        }
        e.stopPropagation()
      }}
      onPointerLeave={(e : ThreeEvent<PointerEvent>) => {
        if(isAvailable && 
        userCtx?.user.id === match.current?.currentTurn ){
          setHover(prev => false)
        }
        e.stopPropagation()
      }}
      onClick={(e : ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        handleClick()
      }}
    >
      <Box color={hovering? "orange" : color ? color : "gray"} size={size} />
    </group>
  );
}

export default Cube;