import { ProductItem, Ingredient } from '@prisma/client';
import { calcPizzaPrices } from './calcPizzaPrices';
import { PizzaSize, PizzaType, mapPizzaType } from '@/constants/pizza';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcPizzaPrices(
    type,
    size,
    items,
    ingredients || [],
    selectedIngredients
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
  return { totalPrice, textDetails };
};
