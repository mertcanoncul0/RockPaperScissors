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
import { scoreUpdate } from '@/service/score'
import { getSecureData } from '@/actions/localstorage'
import { myToast } from '@/lib/helper'

type SignInModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  handleSignInChange: () => void
}

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function SignInModal({
  isOpen,
  onOpenChange,
  handleSignInChange,
}: SignInModalProps) {
  const { setUser, setAuthenticated } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    values: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const user = await response.json()

      if (Number(user.score) === 0) {
        user.score = Number(getSecureData('score')) || 0
        scoreUpdate(Number(user.score), true)
      }

      setUser(user)
      setAuthenticated(true)
      onOpenChange(false)
      myToast('Giriş Başarılı', 'success', 1300)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Rock Paper Scissors&apos;a Giriş Yap</ModalHeader>
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
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
              <ModalFooter className="flex justify-between items-center">
                <button className="text-base" onClick={() => { }}>
                  You don&apos;t have an account?{' '}
                  <span
                    className="text-primary-600 cursor-pointer hover:underline"
                    onClick={handleSignInChange}
                  >
                    Sign Up
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
                    Giriş Yap
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
