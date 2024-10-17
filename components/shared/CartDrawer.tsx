'use client';
import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem } from './CartDrawerItem';
import { getCartItemDetails } from '@/lib';
import { useCartStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Title } from './Title';
import { cn } from '@/lib/utils';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [
    totalAmount,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    items,
  ] = useCartStore(
    useShallow((state) => [
      state.totalAmount,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.removeCartItem,
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
        <div
          className={cn('flex flex-col h-full', {
            'justify-center': !totalAmount,
          })}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                в корзине{' '}
                <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <img
                src="/empty-box.svg"
                alt="empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="корзина пуста("
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                добавьте хотя бы одну пиццу для совершения заказа
              </p>
              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  камбэк
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
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
                      disabled={item.disabled}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
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
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-bold"
                    >
                      оформить заказ <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
