'use client';
import React from 'react';
import { Title } from './Title';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';
import { useIngredients, useFilters, useQueryFilters } from '@/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: { priceFrom: number; priceTo: number }) => {
    filters.setPrices('priceFrom', prices.priceFrom);
    filters.setPrices('priceTo', prices.priceTo);
  };

  return (
    <div className={className}>
      <Title text="фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="тип пиццы"
        onClickCheckbox={filters.setPizzaTypes}
        selectedIds={filters.pizzaTypes}
        items={[
          { text: 'тонкое', value: '1' },
          { text: 'традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="размеры"
        onClickCheckbox={filters.setSizes}
        selectedIds={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />
      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="30000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={([from, to]) =>
            updatePrices({ priceFrom: from, priceTo: to })
          }
        />
      </div>
      <CheckboxFiltersGroup
        title="ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={(id) => filters.setIngredients(id)}
        selectedIds={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
