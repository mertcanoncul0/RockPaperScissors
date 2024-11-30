'use client'
import ActionCircle from '@/components/action-circle'
import { useAuth } from '@/components/provider/auth-provider'
import { gameActions } from '@/constants'
import { playedMatch, scoreUpdate } from '@/service/score'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GamePage() {
  const { isAuthenticated, setUser, user, options, game, setGame } = useAuth()
  const [pick, setPick] = useState<boolean>(false)

  const handleAction = (action: string) => {
    const moves = options.moves
    const gpuMove = moves[Math.floor(Math.random() * moves.length)]
    const actionUserMove = gameActions.find((a) => a.name === action)
    const actionGpuMove = gameActions.find((a) => a.name === gpuMove)

    setGame({ ...game, gpuMove, userMove: action })
    setPick(true)
    setGame({
      ...game,
      user: actionUserMove?.beats === gpuMove ? game.user + 1 : game.user,
      gpu: actionGpuMove?.beats === action ? game.gpu + 1 : game.gpu,
      lastGpuMove: gpuMove,
      lastUserMove: action,
      userMove: '',
      gpuMove: '',
    })
    setTimeout(() => {
      setPick(false)
    }, 600)
  }

  useEffect(() => {
    if (game.user >= options.winningScore || game.gpu >= options.winningScore) {
      setGame({ ...game, isGameOver: true })
    }
  }, [game.gpu, game.user])

  useEffect(() => {
    if (isAuthenticated && game.isGameOver) {
      playedMatch()
      if (game.user > game.gpu) scoreUpdate(options.winningScore)
    }
  }, [game.isGameOver])

  if (game.isGameOver || pick) {
    const lastUserMove = gameActions.find((a) => a.name === game.lastUserMove)

    return (
      <div className="max-w-max mx-auto mt-16 pmd:mt-32">
        <h1 className="text-white text-center text-6xl font-bold">
          {game.isGameOver
            ? game.user > game.gpu
              ? 'Kazandın'
              : 'Kaybettin'
            : lastUserMove?.beats === game.lastGpuMove
            ? 'Turu Kazandın'
            : 'Turu Kaybettin'}
        </h1>

        <div className="w-full flex items-center justify-between gap-4 p-4">
          <div className="flex flex-col gap-2 justify-center items-center text-white text-xl font-bold">
            <ActionCircle
              src={`/${game.lastUserMove}.svg`}
              alt={`${game.lastUserMove}`}
            />
            <p>Senin Seçimin</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center text-white text-xl font-bold">
            <ActionCircle
              src={`/${game.lastGpuMove}.svg`}
              alt={`${game.lastGpuMove}`}
            />
            <p>İşlemci Seçimi</p>
          </div>
        </div>

        <button
          className={twMerge(
            'mt-4 px-4 py-4 text-2xl uppercase tracking-widest bg-white text-black rounded-md font-medium w-full invisible pointer-events-none opacity-0 transition-all',
            !pick && 'opacity-100 visible pointer-events-auto'
          )}
          onClick={() => {
            setGame({ ...game, user: 0, gpu: 0, isGameOver: false })
            if (game.user > game.gpu)
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
        game.gpuMove && 'max-w-full mt-16',
        options.moves.length > 3 && 'mt-24 pmd:mt-32'
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
          {options.moves.length > 3 ? (
            <>
              <Image
                src="/pentagon.svg"
                alt="Pentagon"
                className="w-64 h-64 psm:w-72 psm:h-72 pmd:*w-80 pmd:h-80"
                width={260}
                height={260}
              />

              <ActionCircle
                src="/scissors.svg"
                alt="Scissors"
                className="absolute -top-16 left-[74px] psm:left-20 pmd:left-[74px] pmd:-top-20"
                action={() => handleAction('scissors')}
              />

              <ActionCircle
                src="/paper.svg"
                alt="Paper"
                className="absolute top-10 -right-6 psm:top-12 psm:-right-8 pmd:top-12"
                action={() => handleAction('paper')}
              />

              <ActionCircle
                src="/spock.svg"
                alt="Spock"
                className="absolute top-10 -left-6 psm:top-12 psm:-left-8"
                action={() => handleAction('spock')}
              />

              <ActionCircle
                src="/lizard.svg"
                alt="Lizard"
                className="absolute -bottom-10 left-0 psm:-bottom-12 psm:-left-4 pmd:-bottom-12 pmd:-left-6"
                action={() => handleAction('lizard')}
              />

              <ActionCircle
                src="/rock.svg"
                alt="Rock"
                className="absolute -bottom-10 right-0 psm:-bottom-12 psm:-right-4 pmd:-right-6"
                action={() => handleAction('rock')}
              />
            </>
          ) : (
            <>
              <Image
                src="/triangle.svg"
                alt="Triangle"
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
        </>
      )}
    </div>
  )
}
