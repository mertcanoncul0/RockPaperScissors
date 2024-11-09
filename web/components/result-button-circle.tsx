'use client'
import { GameAction } from '@/data'
import Image from 'next/image'

export default function ResultButtonCircle({
  winner,
  looser,
  name,
  src,
  alt,
}: GameAction & { winner?: boolean; looser?: boolean }) {
  return (
    <div
      className={`result-${name} ${winner ? 'winner' : ''} ${
        looser ? 'looser' : ''
      }`}
    >
      <div className='relative w-full h-full circle-image'>
        <div className='relative w-full h-full circle-image'>
          <div className='relative w-full h-full circle-image flex justify-center'>
            <Image
              src={src}
              alt={alt}
              width={198}
              height={203}
              className='w-32 h-32 lg:w-72 lg:h-72'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
