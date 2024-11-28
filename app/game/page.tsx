'use client'
import ActionCircle from '@/components/action-circle'
import { useAuth } from '@/components/provider/auth-provider'
import Image from 'next/image'

export default function GamePage() {
  const { isAuthenticated, user, options } = useAuth()
  console.log(isAuthenticated, options, user)

  const handleAction = () => {
    console.log('action')
  }

  return (
    <div className="max-w-max mx-auto relative mt-32">
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
        className="absolute -bottom-6 left-14 psm:bottom-0 psm:left-20"
        action={handleAction}
      />
      <ActionCircle
        src="/paper.svg"
        alt="Paper"
        className="absolute -top-10 -left-8"
        action={handleAction}
      />
      <ActionCircle
        src="/scissors.svg"
        alt="Scissors"
        className="absolute -top-10 -right-8"
        action={handleAction}
      />
    </div>
  )
}
