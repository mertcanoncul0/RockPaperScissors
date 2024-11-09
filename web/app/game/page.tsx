'use client'

import GameScene from '@/components/game-scene'
import Header from '@/components/header'
import Rules from '@/components/rules'
import Triangle from '@/components/triangle'
import { useGameActionsStore } from '@/store/game-actions'
import { useEffect } from 'react'

export default function Home() {
  const playerGuess = useGameActionsStore((state) => state.playerGuess)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r') {
        useGameActionsStore.setState({ playerGuess: 'rock' })
      } else if (e.key === 'p') {
        useGameActionsStore.setState({ playerGuess: 'paper' })
      } else if (e.key === 's') {
        useGameActionsStore.setState({ playerGuess: 'scissors' })
      } else if (e.key === 'Escape') {
        useGameActionsStore.setState({ playerGuess: '', cpuGuess: '' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <Header />
      {!playerGuess ? <Triangle /> : <GameScene />}
      <Rules />
    </>
  )
}
