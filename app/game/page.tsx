'use client'
import ActionCircle from '@/components/action-circle'
import { useAuth } from '@/components/provider/auth-provider'
import { gameActions } from '@/constants'
import { playedMatch, scoreUpdate } from '@/service/score'
import Image from 'next/image'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GamePage() {
  const { isAuthenticated, setUser, user, options, game, setGame } = useAuth()

  const handleAction = (action: string) => {
    const moves = options.moves
    const gpuMove = moves[Math.floor(Math.random() * moves.length)]
    const actionUserMove = gameActions.find((a) => a.name === action)
    const actionGpuMove = gameActions.find((a) => a.name === gpuMove)

    setGame({ ...game, gpuMove, userMove: action })
    setTimeout(() => {
      setGame({
        ...game,
        user: actionUserMove?.beats === gpuMove ? game.user + 1 : game.user,
        gpu: actionGpuMove?.beats === action ? game.gpu + 1 : game.gpu,
        userMove: '',
        gpuMove: '',
      })
    }, 100)
  }

  useEffect(() => {
    if (game.user >= options.winningScore || game.gpu >= options.winningScore) {
      setGame({ ...game, isGameOver: true })
    }
  }, [game.gpu, game.user])

  useEffect(() => {
    if (isAuthenticated && game.isGameOver) {
      playedMatch()
      game.user > game.gpu && scoreUpdate(options.winningScore)
    }
  }, [game.isGameOver])

  if (game.isGameOver) {
    return (
      <div className="max-w-max mx-auto mt-32">
        <h1 className="text-white text-4xl font-bold">Game Over</h1>
        <p className="text-white text-2xl font-semibold">
          {game.user > game.gpu ? 'Kazandın' : 'Kaybettin'}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-white text-black rounded-md font-semibold"
          onClick={() => {
            setGame({ ...game, user: 0, gpu: 0, isGameOver: false })
            game.user > game.gpu &&
              setUser({ ...user, score: user.score + options.winningScore })
          }}
        >
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        'max-w-max mx-auto relative mt-32',
        game.gpuMove && 'max-w-full mt-16'
      )}
    >
      {game.gpuMove ? (
        <div className="w-full flex items-center justify-between p-8">
          <div className="flex flex-col gap-2 justify-center items-center text-white text-xl font-bold">
            <ActionCircle src={`/${game.userMove}.svg`} alt={game.userMove} />
            <p>Senin Seçimin</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center text-white text-xl font-bold">
            <ActionCircle src={`/${game.gpuMove}.svg`} alt={game.gpuMove} />
            <p>GPU Seçimi</p>
          </div>
        </div>
      ) : (
        <>
          <Image
            src="/triangle.svg"
            alt="hello"
            className="w-60 h-60 psm:w-72 psm:h-72"
            width={240}
            height={240}
          />
          <ActionCircle
            src="/rock.svg"
            alt="Rock"
            className="absolute -bottom-2 left-16 psm:bottom-0 psm:left-20 pmd:-bottom-4 pmd:left-[74px]"
            action={() => handleAction('rock')}
          />
          <ActionCircle
            src="/paper.svg"
            alt="Paper"
            className="absolute -top-10 -left-4 pmd:-left-8"
            action={() => handleAction('paper')}
          />
          <ActionCircle
            src="/scissors.svg"
            alt="Scissors"
            className="absolute -top-10 -right-4 pmd:-right-8"
            action={() => handleAction('scissors')}
          />
        </>
      )}
    </div>
  )
}
