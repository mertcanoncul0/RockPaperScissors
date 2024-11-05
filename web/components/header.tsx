'use client'

import { useGameActionsStore } from '@/store/game-actions'

export default function Header() {
  const { result } = useGameActionsStore((state) => state)
  return (
    <header
      className={`p-6 border-4 border-white/25 rounded-2xl w-full flex items-center justify-between max-w-[700px]`}
    >
      <h1 className='text-white font-bold text-3xl sm:text-4xl leading-8 max-w-28 lg:max-w-40 uppercase'>
        Rock Paper Scissors
      </h1>
      <div className='bg-white py-4 px-12 rounded-lg text-center'>
        <span className='text-score tracking-widest text-base font-semibold uppercase'>
          Score
        </span>
        <br />
        <span className='font-bold text-6xl text-score-number'>
          {result.score}
        </span>
      </div>
    </header>
  )
}
