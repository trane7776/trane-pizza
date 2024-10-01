'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};