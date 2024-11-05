'use client'

import ActionButtonCircle from '@/components/action-button-circle'
import GameScene from '@/components/game-scene'
import Header from '@/components/header'
import Rules from '@/components/rules'
import Triangle from '@/components/triangle'
import { GameAction, gameActions } from '@/data'
import { useGameActionsStore } from '@/store/game-actions'

export default function Home() {
  const playerGuess = useGameActionsStore((state) => state.playerGuess)

  return (
    <>
      <Header />
      {!playerGuess ? <Triangle /> : <GameScene />}
      <Rules />
    </>
  )
}
