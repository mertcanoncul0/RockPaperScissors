import { create } from 'zustand'

type GameActionStore = {
  playerGuess: string
  cpuGuess: string
  result: {
    message: string
    score: number
  }
  setPlayerGuess: (playerGuess: string) => void
  setCpuGuess: (cpuGuess: string) => void
  setResult: ({ message, score }: { message: string; score: number }) => void
}

export const useGameActionsStore = create<GameActionStore>((set) => ({
  playerGuess: '',
  cpuGuess: '',
  result: { message: '', score: 0 },
  setPlayerGuess: (playerGuess) => set({ playerGuess }),
  setCpuGuess: (cpuGuess) => set({ cpuGuess }),
  setResult: ({ message, score }) => set({ result: { message, score } }),
}))
