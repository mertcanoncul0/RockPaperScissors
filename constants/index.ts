import { GameAction } from '@/types'

export const gameWinningScores: number[] = [3, 5, 7, 10]
export const gameMoves = {
  default: {
    values: ['rock', 'paper', 'scissors'],
    title: 'Rock, Paper, Scissors',
  },
  extra: {
    values: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    title: '..., Lizard, Spock',
  },
}
export const gameActions: GameAction[] = [
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
  {
    id: 4,
    name: 'lizard',
    beats: 'spock',
    losesTo: 'rock',
    src: '/lizard.svg',
    alt: 'Lizard',
  },
  {
    id: 5,
    name: 'spock',
    beats: 'scissors',
    losesTo: 'paper',
    src: '/spock.svg',
    alt: 'Spock',
  },
]
