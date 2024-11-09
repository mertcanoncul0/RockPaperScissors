'use client'

import { Spinner } from '@nextui-org/react'
import { useAuth } from './provider/auth-provider'

export default function Header() {
  const { user, isLoading } = useAuth()

  return (
    <header
      className={`p-4 border-4 w-[90%] lg:p-8 lg:w-full border-white/25 rounded-2xl flex items-center justify-between max-w-[700px] mx-auto mb-10`}
    >
      <h1 className='text-white font-bold text-2xl lg:text-4xl leading-8 max-w-28 lg:max-w-40 uppercase'>
        Rock Paper Scissors
      </h1>
      <div className='bg-white py-3 lg:py-4 px-8 lg:px-12 rounded-lg text-center'>
        <span className='text-score tracking-widest text-base font-semibold uppercase'>
          Score
        </span>
        <br />
        {isLoading ? (
          <Spinner color='secondary' />
        ) : (
          <span className='font-bold text-5xl lg:text-6xl text-score-number'>
            {user.score}
          </span>
        )}
      </div>
    </header>
  )
}
