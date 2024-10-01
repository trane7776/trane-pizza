import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { GroupVariants, PizzaImage, Title } from '.';
import { PizzaSize, pizzaSizes, PizzaType } from '@/constants/pizza';
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
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 1000;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#fcfcfc] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants
          items={pizzaSizes}
          selectedValue={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
