'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import { useCartStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, items, loading] = useCartStore(
    useShallow((state) => [state.totalAmount, state.items, state.loading])
  );
  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn(className, { 'w-[105px]': loading }, 'group relative')}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 invisible group-hover:visible group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
