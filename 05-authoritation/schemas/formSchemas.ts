import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(1, 'Password requerido'),
  username: z.string().min(3, 'Username requerido'),
});

export const registerSchema = z
  .object({
    username: z.string().min(3).max(20),
    email: z.email().max(100),
    password: z.string().regex(/^[a-zA-Z0-9]{8,16}$/, 'Password must be 8-16 characters long'),
    // confirmPassword: z.string(),
  })
  // .refine(data => data.password === data.confirmPassword, {
  //   message: 'Passwords do not match',
  //   path: ['confirmPassword'],
  // });

