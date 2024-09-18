import { Container, Title, Categories } from '@/components/shared';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="все пиццы" size="lg" className="font-extrabold" />
        <Categories />
      </Container>
    </>
  );
}
