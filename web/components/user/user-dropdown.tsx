import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
import { useAuth } from '../provider/auth-provider'
import { User, UserRound } from 'lucide-react'
import SignUpModal from '../modal/sign-up-modal'
import SignInModal from '../modal/sign-in-modal'
import { toast } from 'sonner'

export default function UserDropdown() {
  const { isAuthenticated, isLoading, user, setAuthenticated, setUser } =
    useAuth()
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const {
    isOpen: signOpen,
    onOpenChange: signChange,
    onOpen: signOnOpen,
    onClose: signClose,
  } = useDisclosure()

  const handleSignInChange = () => {
    signClose()
    onOpen()
  }

  const handleSignUpChange = () => {
    onClose()
    signOnOpen()
  }

  if (isLoading) {
    return <Spinner color='secondary' />
  }

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={onOpen}
          className='cursor-pointer rounded-lg bg-button-gradient p-2 text-white hover:brightness-150'
        >
          <UserRound className='hover:brightness-150' size={32} />
        </button>

        <SignUpModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onOpenSign={signOnOpen}
          handleSignUpChange={handleSignUpChange}
        />
        <SignInModal
          isOpen={signOpen}
          onOpenChange={signChange}
          handleSignInChange={handleSignInChange}
        />
      </>
    )
  }

  async function handleLogout() {
    const res = await fetch('/api/auth/sign-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (res.ok) {
      setAuthenticated(false)
      setUser({
        id: '',
        email: '',
        username: '',
        score: 0,
      })
      toast.error('Çıkış Yapıldı', { duration: 1000 })
    }
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button className='cursor-pointer rounded-lg bg-button-gradient p-2 text-white h-12 w-12 hover:brightness-150'>
            {user.username.charAt(0).toUpperCase()}
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Action event example'>
          <DropdownItem>{user.username}</DropdownItem>
          <DropdownItem
            onClick={handleLogout}
            className='text-danger'
            color='danger'
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
