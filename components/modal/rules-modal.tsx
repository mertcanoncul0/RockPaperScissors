import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { Gamepad2 } from 'lucide-react'

export default function RulesModal({ isOpen, onOpenChange }: any) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      className="text-lg"
      placement="center"
    >
      <ModalContent>helloworld</ModalContent>
    </Modal>
  )
}
