import { ThreeEvent } from "@react-three/fiber";
import { useState } from "react";
import type { CubeProps } from "./types"

function Cube({ position, color, size } : CubeProps) {
  const [hovering, setHover] = useState(false)

  return (
    <mesh 
      position={position}
      onPointerEnter={(e : ThreeEvent<PointerEvent>) => {
        setHover(prev => true)
        e.stopPropagation()
      }}
      onPointerLeave={(e : ThreeEvent<PointerEvent>) => {
        setHover(prev => false)
        e.stopPropagation()
      }}
    >
      <boxGeometry args={size}/>
      <meshBasicMaterial color={hovering? "orange" : color ? color : "gray"} />
    </mesh>
  );
}

export default Cube;