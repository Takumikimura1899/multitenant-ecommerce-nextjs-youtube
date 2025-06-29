import z from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(63, 'Username must be less than 63 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .refine(
      (val) => !val.includes('--'),
      'Username cannot contain consecutive hyphens'
    )
    .transform((val) => val.toLowerCase()),
});
