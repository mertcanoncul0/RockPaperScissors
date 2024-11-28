'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../provider/auth-provider'
import { useState } from 'react'
import { EyeClosedIcon, LucideEye } from 'lucide-react'
import { toast } from 'sonner'

type SignUpModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onOpenSign: () => void
  handleSignUpChange: () => void
}

export const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
})

export default function SignUpModal({
  isOpen,
  onOpenChange,
  onOpenSign,
  handleSignUpChange,
}: SignUpModalProps) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { setUser, setAuthenticated } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const user = await response.json()
      setUser(user)
      onOpenChange(false)
      onOpenSign()
      toast.success('Kayıt Başarılı', { duration: 1000 })
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Rock Paper Scissors'a Kayıt Ol</ModalHeader>
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                label="Username"
                variant="underlined"
                placeholder="Enter your username"
                size="lg"
                {...register('username')}
              />
              <p className="text-red-500 text-base">
                {errors.username?.message}
              </p>
              <Input
                type="email"
                label="Email"
                variant="underlined"
                placeholder="Enter your email"
                size="lg"
                {...register('email')}
              />
              <p className="text-red-500 text-base">{errors.email?.message}</p>
              <Input
                label="Password"
                variant="underlined"
                placeholder="Enter your password"
                size="lg"
                endContent={
                  <button
                    className="focus:outline-none "
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <LucideEye className="w-5 h-5 text-default-400 pointer-events-none" />
                    ) : (
                      <EyeClosedIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                {...register('password')}
              />
              <p className="text-red-500 text-base">
                {errors.password?.message}
              </p>
              <ModalFooter className="flex items-center justify-between">
                <button type="button">
                  you have a already account!{' '}
                  <span
                    onClick={handleSignUpChange}
                    className="text-primary-600 cursor-pointer hover:underline"
                  >
                    Sign In
                  </span>
                </button>
                <div className="flex items-center gap-1">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="text-base"
                  >
                    Close
                  </Button>
                  <Button color="primary" type="submit" className="text-base">
                    Kayıt Ol
                  </Button>
                </div>
              </ModalFooter>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
