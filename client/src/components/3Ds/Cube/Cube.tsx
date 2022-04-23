import { ThreeEvent } from "@react-three/fiber";
import { useState } from "react";
import type { CubeProps } from "./types"
import Box from "./Box";

function Cube({ position, color, size } : CubeProps) {
  const [hovering, setHover] = useState(false)
 
  return (
    <group 
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
      <Box color={hovering? "orange" : color ? color : "gray"} size={size} />
    </group>
  );
}

export default Cube;