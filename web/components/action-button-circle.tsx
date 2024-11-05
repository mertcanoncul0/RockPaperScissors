'use client'
import { GameAction } from '@/data'
import { useGameActionsStore } from '@/store/game-actions'
import Image from 'next/image'

export default function ActionButtonCircle({ name, src, alt }: GameAction) {
  const { setPlayerGuess } = useGameActionsStore((state) => state)

  return (
    <div className={name} onClick={() => setPlayerGuess(name)}>
      <div className='relative w-[130px] h-[133px] lg:w-[198px] lg:h-[203px] circle-image'>
        <Image src={src} alt={alt} width={198} height={203} />
      </div>
    </div>
  )
}
