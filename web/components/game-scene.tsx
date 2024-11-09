'use client'

import { GameAction, gameActions } from '@/data'
import { useGameActionsStore } from '@/store/game-actions'
import ResultButtonCircle from '@/components/result-button-circle'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GameScene() {
  const score = useGameActionsStore((state) => state.result.score)
  const {
    result,
    setResult,
    playerGuess,
    cpuGuess,
    setCpuGuess,
    setPlayerGuess,
  } = useGameActionsStore((state) => state)

  useEffect(() => {
    const actions = gameActions.map((x) => x.name)
    const randomIndex = Math.floor(
      (Math.random() * Date.now() * actions.length) % actions.length
    )
    const randomAction = actions[randomIndex]

    setCpuGuess(randomAction)
  }, [playerGuess])

  useEffect(() => {
    if (cpuGuess && playerGuess) {
      const player = gameActions.find((x) => x.name === playerGuess)
      const cpu = gameActions.find((x) => x.name === cpuGuess)

      if (player?.name === cpu?.name) {
        return setResult({ message: 'Draw', score: score })
      } else if (player?.beats === cpu?.name) {
        return setResult({ message: 'You Win', score: score + 1 })
      } else if (player?.losesTo === cpu?.name) {
        return setResult({
          message: 'You Lose',
          score: score <= 0 ? 0 : score - 1,
        })
      }
    }
  }, [cpuGuess])

  const playAgain = () => {
    setCpuGuess('')
    setPlayerGuess('')
    setResult({ message: '', score: score })
  }

  return (
    <>
      <div
        className={twMerge(
          'relative flex items-center justify-between mt-24 gap-8 lg:mt-20 w-full px-4 lg:px-8',
          cpuGuess ? 'lg:w-[960px]' : 'lg:w-[700px]'
        )}
      >
        <div className='flex flex-col items-center justify-between h-[200px] lg:h-[400px]'>
          <h3 className='text-white text-lg lg:text-2xl font-bold tracking-widest'>
            YOUR PICKED
          </h3>

          <ResultButtonCircle
            winner={result.message === 'You Win'}
            {...(gameActions.find((x) => x.name === playerGuess) as GameAction)}
          />
        </div>

        {cpuGuess && (
          <div className='flex-col justify-center items-center mt-16 gap-4 text-center hidden sm:flex'>
            <h2 className='text-white text-5xl lg:text-6xl font-bold tracking-widest uppercase'>
              {result.message}
            </h2>
            <button
              onClick={playAgain}
              className='border border-white rounded-lg text-black px-9 py-2 text-lg font-bold tracking-widest uppercase bg-white hover:bg-black hover:text-white transition-colors hover:border-black'
            >
              play again
            </button>
          </div>
        )}

        <div
          className='flex flex-col items-center justify-between h-[200px] lg:h-[400px]'
          data-result={result.message}
        >
          <h3 className='text-white text-lg lg:text-2xl font-bold tracking-widest'>
            THE HOUSE PICKED
          </h3>
          {cpuGuess ? (
            <ResultButtonCircle
              looser={result.message === 'You Lose'}
              {...(gameActions.find((x) => x.name === cpuGuess) as GameAction)}
            />
          ) : (
            <div className='w-56 h-56 rounded-full bg-black/10 mb-6'></div>
          )}
        </div>
      </div>

      {cpuGuess && (
        <div className='flex-col justify-center items-center mt-16 gap-4 text-center flex sm:hidden'>
          <h2 className='text-white text-5xl lg:text-6xl font-bold tracking-widest uppercase'>
            {result.message}
          </h2>
          <button
            onClick={playAgain}
            className='border border-white rounded-xl text-black px-20 py-3 text-lg font-bold tracking-widest uppercase bg-white hover:bg-black hover:text-white transition-colors hover:border-black'
          >
            play again
          </button>
        </div>
      )}
    </>
  )
}
