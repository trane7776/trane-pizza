import {
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from '@/components/shared';
import { Input, Textarea } from '@/components/ui';

export default function CheckoutPage() {
  return (
    <Container className="mt-5">
      <Title
        text="оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        {/* Левая часть */}
        <div className="flex flex-col gap-10 flex-1 ">
          <WhiteBlock title="1. корзина">oskdopakdpodaokdopakdop</WhiteBlock>

          <WhiteBlock title="2. персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="фамилия"
              />
              <Input name="email" className="text-base" placeholder="e-mail" />
              <Input
                name="phone"
                className="text-base"
                placeholder="номер телефона"
              />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="введите адресс..."
              />
              <Textarea
                className="text-base"
                rows={5}
                placeholder="комментарий к заказу"
              />
            </div>
          </WhiteBlock>
        </div>

        {/* Правая часть */}

        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">итого:</span>
              <span className="text-4xl font-extrabold">3600 ₽</span>
            </div>
            <CheckoutItemDetails title="стоимость товаров:" value="3000 ₽" />
            <CheckoutItemDetails title="налоги:" value="3000 ₽" />
            <CheckoutItemDetails title="доставка:" value="3000 ₽" />
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
