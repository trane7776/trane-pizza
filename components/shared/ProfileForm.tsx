'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  formRegisterSchema,
  TFormRegisterValues,
} from './modals/auth-modal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container, FormInput, Title } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
  className?: string;
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('профиль обновлен', {
        icon: '🚀',
      });
    } catch (error) {
      console.error('Error [ProfileForm]', error);
      return toast.error('ошибка при обновлении профиля', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className={cn('my-10', className)}>
      <Title text={`профиль / #${data.id}`} size="lg" className="font-bold" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="e-mail" required />
          <FormInput name="fullName" label="полное имя" required />

          <FormInput
            type="password"
            name="password"
            label="новый пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="повторите пароль"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            выйти из аккаунта
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
