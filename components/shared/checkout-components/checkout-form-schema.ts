import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, 'имя должно содержать не менее 2 символов'),
  lastName: z.string().min(2, 'фамилия должна содержать не менее 2 символов'),
  email: z.string().email('введите корректный email'),
  phone: z.string().min(10, 'введите корректный номер телефона'),
  address: z.string().min(5, 'введите корректный адрес'),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
