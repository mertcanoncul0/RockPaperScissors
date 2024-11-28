'use client'

import { Spinner } from '@nextui-org/react'
import { useAuth } from './provider/auth-provider'
import { usePathname } from 'next/navigation'
import { StepBack } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const { user, options, isLoading, game } = useAuth()
  const pathname = usePathname()
  const isGamePage = pathname.startsWith('/game')

  return (
    <header
      className={`p-4 border-4 w-[90%] lmd:p-8 lmd:w-full border-white/25 rounded-2xl flex items-center justify-between max-w-[700px] mx-auto mb-10`}
    >
      <h1 className="text-white font-bold text-2xl lmd:text-4xl leading-8 max-w-28 lmd:max-w-40 uppercase">
        {isGamePage && (
          <Link href="/" title="Go Back">
            <StepBack size={24} color="white" className="mb-2" />
          </Link>
        )}
        Rock Paper Scissors
        <br />
        {options.moves && options.moves.length > 3 && (
          <span className="text-primary">Lizard Spock</span>
        )}
      </h1>
      <div className="rounded-md bg-white py-2 psm:py-3 lmd:py-4 px-4 pmd:px-8 lmd:px-12 rounded-lmd text-center">
        <span className="block ml-2 text-score tracking-widest text-2xl font-semibold uppercase">
          Score
        </span>
        {!isGamePage && isLoading ? (
          <Spinner color="secondary" />
        ) : (
          <div className="flex items-center gap-2 psm:gap-4">
            <span className="font-bold text-3xl pmd:text-5xl lmd:text-6xl text-score-number flex items-center gap-2">
              <span className="text-base psm:text-xl">User</span>
              {isGamePage ? game?.user : user.score}
            </span>
            <span className="font-bold text-3xl pmd:text-5xl lmd:text-6xl text-score-number flex items-center gap-2">
              {isGamePage ? game?.gpu : user.score}
              <span className="text-base psm:text-xl">GPU</span>
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
