'use client';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutSidebar, Container, Title } from '@/components/shared';
import { useCart } from '@/hooks';
import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutPersonal,
} from '@/components/shared/checkout-components';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/components/shared/checkout-components/checkout-form-schema';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success('заказ успешно оформлен.👍 переход на оплату...)', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.error(error);
      toast.error('не удалось создать заказ', {
        icon: '❌',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-5">
      <Title
        text="оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonal
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              <CheckoutAddress
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            {/* Правая часть */}

            <div className="w-[450px]">
              <CheckoutSidebar
                submitting={submitting}
                totalAmount={totalAmount}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
