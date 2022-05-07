type CubeProps = {
  position : [number, number, number]
  color: string,
  size? : CubeProps['position']
  rotate? : boolean
}

type BoxProps = Omit<CubeProps, 'position'> & { position? : CubeProps['position'] }

export type {
  CubeProps,
  BoxProps
}