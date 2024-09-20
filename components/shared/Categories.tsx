'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { FC } from 'react';

interface CategoriesProps {
  className?: string;
}

const categories = [
  { id: 1, name: 'пиццы' },
  { id: 2, name: 'комбо' },
  { id: 3, name: 'закуски' },
  { id: 4, name: 'коктейли' },
  { id: 5, name: 'кофе' },
  { id: 6, name: 'напитки' },
  { id: 7, name: 'десерты' },
  { id: 8, name: 'соусы' },
];

export const Categories: FC<CategoriesProps> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {categories.map(({ id, name }, index) => (
        <a
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
