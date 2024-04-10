import * as z from 'zod'

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' })
})
