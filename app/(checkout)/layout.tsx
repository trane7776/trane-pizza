import { Container, Header } from '@/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trane Pizza | Оформление заказа',
  description: 'Trane Pizza | Оформление заказа',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Container>
        <Header
          hasSearch={false}
          hasCart={false}
          className="border-b-gray-200"
        />
        {children}
      </Container>
    </main>
  );
}
