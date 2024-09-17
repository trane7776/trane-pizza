import { FC } from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';
import Image from 'next/image';
import { Button } from '../ui/button';

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
        <div className="flex items-center gap-4">
          <Button></Button>
          <Button></Button>

          <button className="text-sm font-medium">Вход</button>
          <button className="text-sm font-medium">Регистрация</button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
