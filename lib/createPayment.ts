import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      // одностадийная оплата, false - двустадийная (с холдом денег на карте)
      capture: true,
      description: details.description,
      metadata: {
        // данные возвращаемые в результате успешного платежа
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.NEXT_PUBLIC_YOOKASSA_CALLBACK as string,
      },
    },
    {
      auth: {
        username: process.env.NEXT_PUBLIC_YOOKASSA_STORE_ID as string,
        password: process.env.NEXT_PUBLIC_YOOKASSA as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).slice(2),
      },
    }
  );
  return data;
}
