type CubeProps = {
  position : [number, number, number]
  color: string,
  size : CubeProps['position']
}

export type {
  CubeProps
}