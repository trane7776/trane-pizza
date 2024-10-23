import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>заказ #{orderId}</h1>
    <p>
      оплатите заказ на сумму {totalAmount} ₽. перейдите по{' '}
      <a href={paymentUrl}>этой ссылке</a> для оплаты заказа
    </p>
  </div>
);
