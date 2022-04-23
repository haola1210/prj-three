type CubeProps = {
  position : [number, number, number]
  color: string,
  size? : CubeProps['position']
}

type BoxProps = Omit<CubeProps, 'position'>

export type {
  CubeProps,
  BoxProps
}