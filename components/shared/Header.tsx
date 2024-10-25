'use client';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { CartButton, Container, SearchInput } from '.';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
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
  const searchParams = useSearchParams();
  React.useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(
        () =>
          toast.success(
            'заказ успешно оплачен💛. мы начали готовить вашу пиццу, информация отправлена по почте.'
          ),
        500
      );
    }
  }, []);
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
