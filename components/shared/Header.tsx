'use client';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import {
  AuthModal,
  CartButton,
  Container,
  ProfileButton,
  SearchInput,
} from '.';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();
  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage =
        'заказ успешно оплачен💛. мы начали готовить вашу пиццу, информация отправлена по почте.';
    }
    if (searchParams.has('verified')) {
      toastMessage =
        'почта успешно подтверждена. вы можете спокойно ❤️ войти в аккаунт';
    }

    if (toastMessage) {
      router.replace('/');
      setTimeout(() => toast.success(toastMessage, { duration: 3000 }), 500);
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
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

export { Header };
