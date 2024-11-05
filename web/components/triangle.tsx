'use client'

import { GameAction, gameActions } from '@/data'
import ActionButtonCircle from './action-button-circle'

export default function Triangle() {
  return (
    <div className='relative bg-mobile-triangle lg:bg-triangle bg-no-repeat w-[188px] lg:w-[306px] h-[166px] lg:h-[286px] mx-auto mt-40'>
      {gameActions.map((x: GameAction) => (
        <ActionButtonCircle key={x.id} {...x} />
      ))}
    </div>
  )
}
