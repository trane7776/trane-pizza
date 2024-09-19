import { cn } from '@/lib/utils';
import { FC } from 'react';

interface CategoriesProps {
  className?: string;
}

const categories = [
  'пиццы',
  'комбо',
  'закуски',
  'коктейли',
  'кофе',
  'напитки',
  'десерты',
  'соусы',
];
const activeIndex = 0;
export const Categories: FC<CategoriesProps> = ({ className }) => {
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {categories.map((category, index) => (
        <a
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === index &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href=""
        >
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
};
