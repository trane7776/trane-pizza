import { CartStateItem } from '@/lib/getCartDetails';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { useCartStore } from '@/store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(useShallow((state) => state));

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
