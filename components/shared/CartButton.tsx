import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <Button className={cn(className, 'group relative')}>
      <b>520 ₽</b>
      <span className="h-full w-[1px] bg-white/30 mx-3"></span>
      <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
        <ShoppingCart size={16} className="relative" strokeWidth={2} />
        <b>3</b>
      </div>
      <ArrowRight
        size={20}
        className="absolute right-5 transition duration-300 -translate-x-2 invisible group-hover:visible group-hover:translate-x-0"
      />
    </Button>
  );
};
