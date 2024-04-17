import { z } from 'zod';

export const userSchema = z.object({
    email: z.string({ required_error: 'Please enter a valid email' }),
    password: z.string({ required_error: 'Please enter a valid password' })
})



