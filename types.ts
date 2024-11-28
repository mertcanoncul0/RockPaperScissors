export type GameAction = {
  id: number
  name: string
  beats: string
  losesTo: string
  src: string
  alt: string
}

export type ActionCircleProps = {
  className?: string
  action: () => void
  src: string
  alt: string
  w?: number
  h?: number
}
