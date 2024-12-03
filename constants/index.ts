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
    beats: ['paper', 'lizard'],
    losesTo: ['rock', 'spock'],
    src: '/scissors.svg',
    alt: 'Scissors',
  },
  {
    id: 2,
    name: 'rock',
    beats: ['scissors', 'lizard'],
    losesTo: ['paper', 'spock'],
    src: '/rock.svg',
    alt: 'Rock',
  },
  {
    id: 3,
    name: 'paper',
    beats: ['rock', 'spock'],
    losesTo: ['scissors', 'lizard'],
    src: '/paper.svg',
    alt: 'Paper',
  },
  {
    id: 4,
    name: 'lizard',
    beats: ['spock', 'paper'],
    losesTo: ['rock', 'scissors'],
    src: '/lizard.svg',
    alt: 'Lizard',
  },
  {
    id: 5,
    name: 'spock',
    beats: ['scissors', 'rock'],
    losesTo: ['paper', 'lizard'],
    src: '/spock.svg',
    alt: 'Spock',
  },
];
