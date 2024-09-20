import {
  Container,
  Filters,
  Title,
  TopBar,
  ProductCard,
  ProductsGroupList,
} from '@/components/shared';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-8 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="пиццы"
                items={[
                  {
                    id: 1,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="закуски"
                items={[
                  {
                    id: 1,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
