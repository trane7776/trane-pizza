import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { PizzaImage, Title } from '.';
interface Props {
  imageUrl: string;
  name: string;
  ingredients?: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 1000;
  const size = 30;
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#fcfcfc] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
