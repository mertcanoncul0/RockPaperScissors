import { signInSchema } from '@/components/modal/sign-in-modal'
import { signUpSchema } from '@/components/modal/sign-up-modal'
import { z } from 'zod'

export const signUp = async (
  data: z.infer<typeof signUpSchema>
): Promise<Response> =>
  await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

export const signIn = async (
  data: z.infer<typeof signInSchema>
): Promise<Response> =>
  await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
