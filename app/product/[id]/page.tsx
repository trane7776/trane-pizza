import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import {
  Container,
  ProductImage,
  Title,
  GroupVariants,
} from '@/components/shared';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="mx-auto flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40} className="" />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <GroupVariants
            items={[
              { name: 'маленькая', value: '1' },
              { name: 'средняя', value: '2' },
              { name: 'большая', value: '3', disabled: true },
            ]}
            selectedValue="2"
          />
        </div>
      </div>
    </Container>
  );
}
