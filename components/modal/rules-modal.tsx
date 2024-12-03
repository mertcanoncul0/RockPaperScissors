'use client'
import { Modal, ModalContent } from '@nextui-org/react'
import Image from 'next/image'
import { useAuth } from '../provider/auth-provider'

export default function RulesModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: () => void
}) {
  const { options } = useAuth()

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      className="text-lg"
      placement="center"
    >
      <ModalContent className="flex items-center justify-center p-12">
        {options.moves && options.moves.length > 3 ? (
          <Image
            src="/rules-pentagon.png"
            alt="Rules of the game"
            width={300}
            height={300}
            className="w-[300px]"
          />
        ) : (
          <Image
            src="/rules.png"
            alt="Rules of the game"
            width={300}
            height={300}
            className="w-[300px]"
          />
        )}
      </ModalContent>
    </Modal>
  )
}
