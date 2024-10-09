'use client';
import React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem } from './CartDrawerItem';
import { getCartItemDetails } from '@/lib';
import { useCartStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { updateItemQuantity } from '@/services/cart';
interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const [totalAmount, fetchCartItems, updateItemQuantity, items] = useCartStore(
    useShallow((state) => [
      state.totalAmount,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.items,
    ])
  );

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between
      pb-0 bg-[#f4f1ee]
      "
      >
        <SheetHeader>
          <SheetTitle>
            в корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto  flex-1">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize,
                        item.ingredients
                      )
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                итого
                <div
                  className="flex-1 border-b border-dashed
                 border-b-neutral-200 relative -top-1 mx-2"
                />
              </span>
              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>
            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base font-bold">
                оформить заказ <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
