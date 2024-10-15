'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
  };

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      addCartItem({
        productItemId,
        ingredientsId: ingredients,
      });

      toast.success('Пицца добавлена в корзину');
    } catch (error) {
      console.error(error);
      toast.error('Не удалось добавить пиццу в корзину');
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
            onSubmit={onAddPizza}
            items={product.items}
          />
        ) : (
          <ChooseProductForm
            onSubmit={onAddProduct}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
