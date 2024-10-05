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

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
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
            в корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto  flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>

          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(1, 20, [
                { name: 'моцарелла' },
                { name: 'сыр' },
              ])}
              name="Пепперони фреш"
              price={400}
              quantity={1}
            />
          </div>
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
              <span className="font-bold text-lg">500 ₽</span>
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