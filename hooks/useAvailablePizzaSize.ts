import { Variant } from '@/components/shared/GroupVariants';
import { PizzaSize } from '@/constants/pizza';
import React from 'react';

export const useAvailablePizzaSize = (
  size: PizzaSize,
  availableSizes: Variant[]
) => {
  React.useEffect(() => {
    const isDisabledSize = availableSizes?.find(
      (item) => Number(item.value) === size && item.disabled
    );

    const availableSize = availableSizes?.find((item) => !item.disabled);
    if (isDisabledSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);
};
