'use client';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import React from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';
import { ChoosePizzaForm, ChooseProductForm } from '.';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const [addCartItem, loading] = useCartStore(
    useShallow((state) => [state.addCartItem, state.loading])
  );
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
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
      toast.error('Не удалось добавить продукт в корзину');
      console.error(error);
    } finally {
      toast.success('Продукт добавлен в корзину');

      if (_onSubmit) {
        _onSubmit();
      }
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        onSubmit={onSubmit}
        items={product.items}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      onSubmit={onSubmit}
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      loading={loading}
    />
  );
};
