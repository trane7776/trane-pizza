import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { GroupVariants, PizzaImage, Title, IngredientItem } from '.';
import { Ingredient, ProductItem } from '@prisma/client';
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/constants/pizza';
import { useSet } from 'react-use';
import { calcPizzaPrices, getAvailablePizzaSizes } from '@/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients?: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const totalPrice = calcPizzaPrices(
    type,
    size,
    items,
    ingredients || [],
    selectedIngredients
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredients,
    });
  };

  const availablePizzaSizes = getAvailablePizzaSizes(type, items);

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#fcfcfc] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients?.map((item) => (
              <IngredientItem
                imageUrl={item.imageUrl}
                name={item.name}
                key={item.id}
                price={item.price}
                onClick={() => addIngredient(item.id)}
                active={selectedIngredients.has(item.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
