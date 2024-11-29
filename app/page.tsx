'use client'

import UserListModal from '@/components/modal/user-list-modal'
import { useAuth } from '@/components/provider/auth-provider'
import UserDropdown from '@/components/user/user-dropdown'
import { gameMoves, gameWinningScores } from '@/constants'
import { Card, CardBody, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  const { options, setOptions, game, setGame } = useAuth()

  return (
    <Card
      shadow="lg"
      className="w-[320px] psm:w-[350px] pmd:w-96 lmd:w-[600px] pb-8 pt-2 px-6 md:pb-14 md:pt-4 md:px-14 mx-auto"
    >
      <CardBody className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
          Oyun Modunu Seçin
          <div className="flex items-center gap-1">
            <UserDropdown />
            <UserListModal />
          </div>
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <Tooltip
            content="Çevrimici oyun modu henüz aktif değil"
            className="text-lg font-semibold"
            color="secondary"
            placement="bottom"
          >
            <button className="rounded-lg bg-[#BCCED9] hover:bg-[#6395B8] transition-colors cursor-not-allowed text-2xl font-bold text-white w-full px-18 py-2">
              Çevrim içi
            </button>
          </Tooltip>
          <button className="rounded-lg bg-button-gradient text-2xl font-bold text-white w-full px-18 py-2">
            Çevrim dışı
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Oyun Hareketlerini Seç</h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() =>
              setOptions({
                ...options,
                moves: gameMoves['default'].values,
              })
            }
            className={twMerge(
              'rounded-lg text-2xl font-bold text-white w-full px-18 py-2 bg-[#BCCED9] hover:bg-[#6395B8]',
              options.moves?.join(' ') ===
                gameMoves['default'].values?.join(' ') &&
                'bg-button-gradient hover:brightness-150'
            )}
          >
            {gameMoves['default'].title}
          </button>
          <button
            onClick={() =>
              setOptions({
                ...options,
                moves: gameMoves['extra'].values,
              })
            }
            className={twMerge(
              'rounded-lg text-2xl font-bold text-white w-full px-18 py-2 bg-[#BCCED9] hover:bg-[#6395B8]',
              options.moves?.join(' ') ===
                gameMoves['extra'].values?.join(' ') &&
                'bg-button-gradient hover:brightness-150'
            )}
          >
            {gameMoves['extra'].title}
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Kazanma Adetini Seç</h2>

        <div className="flex items-center justify-center gap-4">
          {gameWinningScores &&
            gameWinningScores.map((score: number) => (
              <button
                key={score}
                onClick={() => setOptions({ ...options, winningScore: score })}
                className={twMerge(
                  'rounded-lg text-2xl font-bold text-white w-full px-18 py-2 bg-[#BCCED9] hover:bg-[#6395B8]',
                  options.winningScore === score &&
                    'bg-button-gradient hover:brightness-150'
                )}
              >
                {score}
              </button>
            ))}
        </div>
      </CardBody>

      <Link
        href="/game"
        onClick={() => setGame({ ...game, user: 0, gpu: 0, isGameOver: false })}
        className="bg-button-gradient text-center hover:brightness-150 text-white text-2xl font-bold w-full px-18 py-2 rounded-lg"
      >
        Oyuna Başla
      </Link>
    </Card>
  )
}
