'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import toast from 'react-hot-toast';
import { FormInput, Title } from '@/components/shared';
import { registerUser } from '@/app/actions';

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('регистрация успешна 📝. подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error('неверный E-Mail или пароль', {
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
            <Title text="регистрация" size="md" className="font-bold" />
            <p className="text-gray-400">
              заполните поля для регистрации аккаунта
            </p>
          </div>
          📱
        </div>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
