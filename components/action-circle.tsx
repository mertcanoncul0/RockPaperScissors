import { ActionCircleProps } from '@/types'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export default function ActionCircle({
  className,
  src,
  alt,
  action = () => {},
}: ActionCircleProps) {
  return (
    <div
      onClick={action}
      className={twMerge(
        'w-28 h-28 psm:w-32 psm:h-32 pmd:w-36 pmd:h-36 bg-white rounded-full flex items-center justify-center',
        className
      )}
    >
      <Image src={src} alt={alt} width={56} height={70} />
    </div>
  )
}
