import { useGround } from "@/hooks";
import { memo, useEffect } from "react";
import { GroundProps } from "./types";

function Ground({ size, color1, color2, pad } : GroundProps ) {
  const ground = useGround(size, color1, color2, pad)
  console.log('render ground')
  return (
    <group>
      {
        ground
      }
    </group>
  );
}

export default memo(Ground);