import Cube from "@components/3Ds/Cube"
import { useMemo } from "react"

function useGround(size : number, color1: string, color2: string, pad: number){
  
  const ground : Array<JSX.Element> = []
    for(let x = 1; x <= size; x++){
      for(let y = 1; y <= size; y++){
        ground.push(
          <Cube
            key={`x-${x};y-${y}`} 
            position={[x, y, 0]} 
            color={(x+y) % 2 === 1 ? color1 : color2} 
            size={[1-pad, 1-pad, 0.5]}
          />
        )
      }
    }
  return ground
}

export default useGround