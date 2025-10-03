import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().min(1, 'Le nom est requis').max(100, 'Le nom est trop long'),
})

export const updateUserSchema = z.object({
  id: z.string().cuid('ID invalide'),
  email: z.string().email('Email invalide').optional(),
  name: z.string().min(1, 'Le nom est requis').max(100, 'Le nom est trop long').optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>