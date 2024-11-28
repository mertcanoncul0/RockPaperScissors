import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import LeaderTable from '../table'
import { Gamepad2 } from 'lucide-react'

export default function UserListModal() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  return (
    <>
      <button
        onClick={onOpen}
        className="cursor-pointer rounded-lg bg-[#BCCED9] hover:bg-button-gradient p-2 text-green-600 hover:text-white"
      >
        <Gamepad2 className="hover:brightness-150 " size={32} />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="text-lg"
        placement="center"
      >
        <ModalContent>
          <LeaderTable />
        </ModalContent>
      </Modal>
    </>
  )
}
