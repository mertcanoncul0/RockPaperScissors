import { toast } from 'sonner'

export const myToast = (
  message: string,
  type: 'success' | 'error',
  duration: number
) => {
  toast[type](message, {
    duration,
  })
}
