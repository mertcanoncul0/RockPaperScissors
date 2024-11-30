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
