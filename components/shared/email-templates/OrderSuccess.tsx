import { CartItemDTO } from '@/services/dto/cart.dto';
import * as React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку</h1>

    <hr />

    <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          {index + 1}. {item.productItem.product.name} |{' '}
          {item.productItem.price} ₽ x {item.quantity} шт. ={' '}
          {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
