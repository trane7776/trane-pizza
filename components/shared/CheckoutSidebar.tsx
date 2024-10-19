import React from 'react';
import { CheckoutItemDetails, WhiteBlock } from '.';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';

interface Props {
  totalAmount: number;
}

const VAT = 5;
const DELIVERY_PRICE = 150;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount }) => {
  const vatPrice = (totalAmount * VAT) / 100;

  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">итого:</span>
        <span className="text-4xl font-extrabold">{totalPrice} ₽</span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            стоимость продуктов:
          </div>
        }
        value={`${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" />
            сборы:
          </div>
        }
        value={`${vatPrice} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            доставка:
          </div>
        }
        value={`${DELIVERY_PRICE} ₽`}
      />

      <Button
        type="submit"
        className="w-full h-14
    rounded-2xl mt-6 text-base font-bold"
      >
        перейти к оплате
        <ArrowRight className="ml-2 w-5" />
      </Button>
    </WhiteBlock>
  );
};
