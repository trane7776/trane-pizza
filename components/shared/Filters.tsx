import { FC } from 'react';
import { Title } from './Title';
import { FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="можно купить в ресторане" value="1" />
        <FilterCheckbox text="новинки" value="2" />
      </div>
      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={30000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={30000} placeholder="30000" />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>
      <CheckboxFiltersGroup
        title="ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={[
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'моццарелла',
            value: '2',
          },
          {
            text: 'чеснок',
            value: '3',
          },
          {
            text: 'малосольные огурчики',
            value: '4',
          },
          {
            text: 'красный лук',
            value: '5',
          },
          {
            text: 'томаты',
            value: '6',
          },
        ]}
        items={[
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'моццарелла',
            value: '2',
          },
          {
            text: 'чеснок',
            value: '3',
          },
          {
            text: 'малосольные огурчики',
            value: '4',
          },
          {
            text: 'красный лук',
            value: '5',
          },
          {
            text: 'томаты',
            value: '6',
          },
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'моццарелла',
            value: '2',
          },
          {
            text: 'чеснок',
            value: '3',
          },
          {
            text: 'малосольные огурчики',
            value: '4',
          },
          {
            text: 'красный лук',
            value: '5',
          },
          {
            text: 'томаты',
            value: '6',
          },
        ]}
      />
    </div>
  );
};
