'use client'
import { useDisclosure } from '@nextui-org/react'

import { HelpCircle } from 'lucide-react'
import RulesModal from './modal/rules-modal'

export default function RulesButton() {
  const { onOpen, isOpen } = useDisclosure()
  return (
    <>
      <button
        onClick={onOpen}
        className="py-2 px-8 font-semibold fixed bottom-12 lmd:right-4 left-1/2 tracking-widest text-lg -translate-x-1/2 p-2 max-w-32 rounded-lg border text-white hover:brightness-150"
      >
        RULES
      </button>
      <RulesModal isOpen={isOpen} onOpenChange={onOpen} />
    </>
  )
}
