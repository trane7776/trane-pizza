import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'минимальная длина пароля 4 символа' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'некорректный email' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(3, { message: 'минимальная длина 3 символа' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'пароли не совпадают',
    path: ['confirmPassword'],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;

// email
// full_name
// password
// confirm_password
