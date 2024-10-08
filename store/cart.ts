import { getCartDetails } from '@/lib';
import { CartStateItem } from '@/lib/getCartDetails';
import { API } from '@/services/api-client';
import { create } from 'zustand/react';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* запрос на добавление товара в корзину */
  // TODO: нужно типизировать
  addCartItem: (values: unknown) => Promise<void>;

  /* запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.fetchCart();

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {},
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: unknown) => {},
}));
