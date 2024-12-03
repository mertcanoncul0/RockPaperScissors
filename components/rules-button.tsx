'use client'
import { useDisclosure } from '@nextui-org/react'

import RulesModal from './modal/rules-modal'

export default function RulesButton() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  return (
    <div className="flex justify-center">
      <button
        aria-label="Oyun kuralları"
        onClick={onOpen}
        className="py-2 px-8 my-12 font-semibold p-2 max-w-32 rounded-lg border text-white hover:brightness-150"
      >
        RULES
      </button>
      <RulesModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}
