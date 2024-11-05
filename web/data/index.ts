export const gameActions = [
  {
    id: 1,
    name: 'scissors',
    beats: 'paper',
    losesTo: 'rock',
    src: '/scissors.svg',
    alt: 'Scissors',
  },
  {
    id: 2,
    name: 'rock',
    beats: 'scissors',
    losesTo: 'paper',
    src: '/rock.svg',
    alt: 'Rock',
  },
  {
    id: 3,
    name: 'paper',
    beats: 'rock',
    losesTo: 'scissors',
    src: '/paper.svg',
    alt: 'Paper',
  },
]

export type GameAction = {
  id: number
  name: string
  beats: string
  losesTo: string
  src: string
  alt: string
}
