import { ICartItem } from '@/store/cart';
import { Cart } from '@prisma/client';

interface ReturnProps {
  items: ICartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: Cart) => {};
