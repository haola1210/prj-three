type ShareProps = {
  size: number
}

type GroundProps = {
  color1:  string
  color2:  string
  pad:  number
} & ShareProps

export type {
  ShareProps,
  GroundProps
}