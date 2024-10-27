import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@/components/shared/Title';
import { FormInput } from '@/components/shared/form-components';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
  className?: string;
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('вы успешно вошли в аккаунт', {
        icon: '✅',
      });
      onClose?.();
    } catch (error) {
      console.error('Error [login]', error);
      toast.error('Ошибка входа в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              введите свою почту для входа в аккаунт
            </p>
          </div>
          📱
        </div>
        <FormInput name="email" label="почта" required />
        <FormInput name="password" type="password" label="пароль" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {form.formState.isSubmitting ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
    </FormProvider>
  );
};
