import { FC } from 'react';
import { cn } from '@/lib/utils';
import { CartButton, Container, SearchInput } from '.';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
interface HeaderProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

const Header: FC<HeaderProps> = ({
  hasCart = true,
  hasSearch = true,
  className,
}) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={'/pizza.svg'} alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Trane Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">как дома</p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

export { Header };
