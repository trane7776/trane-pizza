'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore(
    useShallow((state) => [state.addCartItem, state.loading])
  );

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm && productItemId && ingredients) {
        await addCartItem({
          productItemId,
          ingredientsId: ingredients,
        });
      } else {
        await addCartItem({
          productItemId: firstItem.id,
        });
      }
    } catch (error) {
      toast.success('Не удалось добавить продукт в корзину');
      console.error(error);
    } finally {
      toast.success('Продукт добавлен в корзину');
      router.back();
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            onSubmit={onSubmit}
            items={product.items}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            onSubmit={onSubmit}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
