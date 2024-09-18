import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '.';
import Image from 'next/image';
import { Button } from '../ui';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <div className="flex items-center gap-4">
          <Image src={'/pizza.svg'} alt="logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Trane Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">как дома</p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            войти
          </Button>
          <div>
            <Button className="group relative">
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
          </div>
        </div>
      </Container>
    </header>
  );
};

export { Header };
